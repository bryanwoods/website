// Outside the window: the backyard, the porch roof under the window, the siding round it, and, high over them, the real valley from
// Google's 3D tiles. The tiles come only when you float up off the roof, and only with a key: each load starts a Map Tiles session,
// which Google bills. Up close Google's 3D map of this road is melted blobs, so the roof itself keeps the backyard photo.
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js';
import { WINDOW } from './room.js';
import { shingles, siding } from './textures.js';

const KEY = 'AIzaSyCVxEUGeTsiodO-oEu_6eK8W30jLTvQ7Nw';   // Map Tiles API key, restricted to www.bryanwoods4e.com and 127.0.0.1:8732
const HOUSE = { lat: 42.1633121, lon: -76.8099452, floor: 240, heading: 129 };   // the room's floor centre (height above the ellipsoid) and where the window looks, in degrees from north
const LIB = 'https://cdn.jsdelivr.net/npm/3d-tiles-renderer@0.5.3/build/';

const GROUND = -2.7, LENS = 1.7;   // the lawn, under the bedroom floor; how high the backyard photo was taken above its own lawn
const OUT = WINDOW.z - 0.12, PITCH = Math.atan(4 / 12);   // the wall's outside face; a 4-in-12 porch roof
const ROOF = { top: WINDOW.y0 - 0.3, x0: -3, x1: 10, depth: 2.8 };   // as long and as deep as the real one
const roofY = z => ROOF.top - (OUT - z) * Math.tan(PITCH);
export const SEAT = [new THREE.Vector3(0.75, roofY(OUT - 0.8) + 0.8, OUT - 0.8), new THREE.Vector3(0.4, -0.2, -9)];   // sat on the shingles an arm's length from the wall, looking out over the yard
export const AIR = [new THREE.Vector3(0, 110, 120), new THREE.Vector3(0, 0, -40)];   // high behind the house, looking down over it and the back yard to the hills
const at = (lat, lon, y) => {   // a point in the room's frame; at a kilometre or two a flat map is close enough
  const D = THREE.MathUtils.DEG2RAD, n = (lat - HOUSE.lat) * 111132, e = (lon - HOUSE.lon) * 111320 * Math.cos(HOUSE.lat * D), h = HOUSE.heading * D;
  return new THREE.Vector3(Math.cos(h) * e - Math.sin(h) * n, y, -Math.sin(h) * e - Math.cos(h) * n);
};
const HANOVER = [42.1676236, -76.8208288], HALL = [42.4481763, -79.3381109], ROOM328 = [42.448416, -79.337874];   // Hanover Square in Horseheads; Chautauqua
// Hall, a dorm at SUNY Fredonia; and the middle of the hall's north face, where room 328's window looks out at Nixon Hall
const HOLD = 1.2, DIVE = 6, SLOW = 10, K = 5.1, CLIMB = 0.2, DOWN = 300, LAND = 185;   // seconds to Hanover Square; how hard the long leg speeds up; metres up per metre from
// either end of it; metres short of Chautauqua Hall where the descent starts; a first guess at the ground there, above the ellipsoid
const ease = x => (x = Math.min(1, Math.max(0, x))) * x * (3 - 2 * x);

// The evening, shared by everything out there: the photo yard's sky, the sky over the map, and the map. uNight goes 0 to 1 with the dusk.
// In June the full moon comes up in the southeast as the sun goes down in the northwest, so it rises right outside this window.
const NIGHT = { uNight: { value: 0 }, uTime: { value: 0 }, uMoon: { value: new THREE.Vector3(0, 0, -1) }, uGlow: { value: new THREE.Vector2(0, 1) } };
const dir = (az, el) => { const D = THREE.MathUtils.DEG2RAD, a = (az - HOUSE.heading) * D; return new THREE.Vector3(Math.sin(a) * Math.cos(el * D), Math.sin(el * D), -Math.cos(a) * Math.cos(el * D)); };
NIGHT.uGlow.value.set(dir(302, 0).x, dir(302, 0).z);   // where the sun went down
const HASH = 'float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }\n';
const SKY = `uniform float uNight, uTime; uniform vec3 uMoon; uniform vec2 uGlow;\n${HASH}
vec3 skyAt(vec3 d) {   // by how high you look: the day's blue, then a dusk going orange at the horizon, then night, stars, and the moon
  float e = max(asin(clamp(d.y, -1., 1.)), 0.), n = uNight;
  vec3 day = e < .251 ? mix(vec3(.91, 1.03, 1.13), vec3(.37, .62, 1.), e / .251) : mix(vec3(.37, .62, 1.), vec3(.07, .21, .62), (e - .251) / 1.32);
  vec3 dusk = mix(vec3(.95, .42, .22), vec3(.05, .07, .2), pow(min(1., e / .4), .5)), dark = mix(vec3(.018, .024, .05), vec3(.002, .003, .012), pow(min(1., e / .8), .5));
  vec3 c = mix(mix(day, dusk, smoothstep(.15, .55, n)), dark, smoothstep(.55, .95, n));
  c += vec3(.9, .35, .1) * pow(max(0., dot(normalize(d.xz + 1e-5), uGlow)), 4.) * exp(-e * 7.) * smoothstep(.2, .5, n) * (1. - smoothstep(.75, 1., n));
  float N = 700., lat = asin(clamp(d.y, -1., 1.)), j = floor(lat * N / 6.2832), nl = max(1., floor(N * cos((j + .5) * 6.2832 / N)));   // a star in one cell in forty
  vec2 at = vec2((atan(d.z, d.x) + 3.1416) / 6.2832 * nl, lat * N / 6.2832), cell = floor(at);
  float star = step(.975, hash(cell + 3.3)) * smoothstep(.13, 0., length(fract(at) - .2 - .6 * vec2(hash(cell), hash(cell + 7.1))));
  c += star * (.3 + 1.6 * pow(hash(cell + 1.9), 3.)) * (.75 + .25 * sin(uTime * 3. + hash(cell) * 60.)) * smoothstep(.75, 1., n) * smoothstep(.02, .15, e);
  float m = dot(d, uMoon);
  c += vec3(1., .96, .88) * (3. * smoothstep(.99995, .99996, m) + .2 * pow(max(m, 0.), 400.)) * smoothstep(.45, .85, n);
  return c;
}
`;

// The map at night: the daylight photo goes dark and moonlit, and where it is grey and flat (roads, roofs, car parks) a light comes on in
// most 24 m squares, a sodium orange or a warm white. Far off, the lights are drawn bigger, so a town far below runs together into a glow.
function nightTile(mat) {
  mat.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, NIGHT);
    sh.vertexShader = 'varying vec3 vWorld;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvWorld = (modelMatrix * vec4(transformed, 1.)).xyz;');
    sh.fragmentShader = `uniform float uNight;\nvarying vec3 vWorld;\n${HASH}` + sh.fragmentShader
      .replace('#include <map_fragment>', `#include <map_fragment>
        float hi = max(max(diffuseColor.r, diffuseColor.g), diffuseColor.b), lum = dot(diffuseColor.rgb, vec3(.2126, .7152, .0722));
        float town = smoothstep(.3, .12, (hi - min(min(diffuseColor.r, diffuseColor.g), diffuseColor.b)) / (hi + 1e-4)) * smoothstep(.06, .15, lum);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(lum), .5 * uNight) * mix(vec3(1.), vec3(.07, .09, .16), uNight);`)
      .replace('#include <opaque_fragment>', `vec2 cell = floor(vWorld.xz / 24.), lamp = (cell + .25 + .5 * vec2(hash(cell), hash(cell + 9.1))) * 24.;
        float r = max(1.4, distance(cameraPosition, vWorld) * .0013), level = smoothstep(.75, .9, abs(normalize(cross(dFdx(vWorld), dFdy(vWorld))).y));   // on roads and roofs, not up the sides of trees
        outgoingLight += mix(vec3(1., .55, .2), vec3(1., .85, .6), hash(cell + 5.3)) * step(1. - .8 * town * level, hash(cell + 3.7)) * smoothstep(r, r * .3, distance(vWorld.xz, lamp)) * 2. * smoothstep(.6, 1., uNight);
        #include <opaque_fragment>`);
  };
  mat.customProgramCacheKey = () => 'night-tile';
  mat.needsUpdate = true;
}

export function buildOutside(scene, camera, renderer) {
  const g = new THREE.Group(), trim = new THREE.MeshStandardMaterial({ color: '#cfcdc6', roughness: 0.5 });
  const box = (w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.receiveShadow = true; g.add(m); return m; };

  const slope = ROOF.depth / Math.cos(PITCH), sh = shingles();
  sh.repeat.set(ROOF.x1 - ROOF.x0, -slope);   // each course's shadow on its lower edge, down the slope
  const roof = box(ROOF.x1 - ROOF.x0, 0.04, slope, new THREE.MeshStandardMaterial({ map: sh, bumpMap: sh, bumpScale: 3, roughness: 0.95 }),
    (ROOF.x0 + ROOF.x1) / 2, roofY(OUT - ROOF.depth / 2) - 0.02, OUT - ROOF.depth / 2);
  roof.rotation.x = -PITCH;
  box(ROOF.x1 - ROOF.x0, 0.12, 0.1, trim, (ROOF.x0 + ROOF.x1) / 2, roofY(OUT - ROOF.depth) - 0.08, OUT - ROOF.depth - 0.04);   // the gutter

  const W = WINDOW, wall = new THREE.Shape([[-9.5, ROOF.top - 0.05], [10, ROOF.top - 0.05], [10, 2.9], [-9.5, 2.9]].map(p => new THREE.Vector2(...p)));
  wall.holes.push(new THREE.Path([[W.x0, W.y0], [W.x1, W.y0], [W.x1, W.y1], [W.x0, W.y1]].map(p => new THREE.Vector2(...p))));
  const sd = siding(), face = new THREE.Mesh(new THREE.ShapeGeometry(wall), new THREE.MeshStandardMaterial({ map: sd, color: '#c4c4be', bumpMap: sd, bumpScale: 2, roughness: 0.7, side: THREE.BackSide }));   // its back faces the yard
  face.position.z = OUT - 0.002; face.receiveShadow = true; g.add(face);
  const cx = (W.x0 + W.x1) / 2, cy = (W.y0 + W.y1) / 2;
  box(0.1, W.y1 - W.y0 + 0.2, 0.03, trim, W.x0 - 0.05, cy, OUT - 0.015); box(0.1, W.y1 - W.y0 + 0.2, 0.03, trim, W.x1 + 0.05, cy, OUT - 0.015);
  box(W.x1 - W.x0 + 0.2, 0.1, 0.03, trim, cx, W.y1 + 0.05, OUT - 0.015); box(W.x1 - W.x0 + 0.24, 0.04, 0.07, trim, cx, W.y0 - 0.02, OUT - 0.035);   // casing and sill
  box(19.5, 0.22, 0.03, trim, 0.25, 2.92, OUT - 0.46); box(19.5, 0.02, 0.45, trim, 0.25, 2.82, OUT - 0.225);   // the eave over it: fascia and soffit

  (() => {   // fireflies over the lawn, each flashing every few seconds as it drifts
    const n = 70, p = new Float32Array(n * 3), seed = new Float32Array(n);
    for (let i = 0; i < n; i++) { p.set([-12 + Math.random() * 26, GROUND + 0.3 + Math.random() * 1.8, OUT - 4 - Math.random() * 26], i * 3); seed[i] = Math.random(); }
    const geo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(p, 3)).setAttribute('seed', new THREE.BufferAttribute(seed, 1));
    const pts = new THREE.Points(geo, new THREE.ShaderMaterial({
      uniforms: { ...NIGHT, uSize: { value: 90 * renderer.getPixelRatio() } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `attribute float seed; uniform float uTime, uNight, uSize; varying float vGlow;
        void main() {
          float t = uTime + seed * 40., c = fract(t / (2.5 + 3. * fract(seed * 7.13)));
          vGlow = smoothstep(0., .06, c) * smoothstep(.3, .1, c) * smoothstep(.6, .95, uNight);
          vec4 mv = modelViewMatrix * vec4(position + vec3(sin(t * .31) * .8, sin(t * .53) * .35, cos(t * .23) * .8), 1.);
          gl_PointSize = clamp(uSize / -mv.z, 2., 12.); gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: 'varying float vGlow;\nvoid main() { gl_FragColor = vec4(vec3(.8, 1., .35) * vGlow * 6. * (1. - smoothstep(0., 1., length(gl_PointCoord - .5) * 2.)), 1.); }',
    }));
    pts.frustumCulled = false; g.add(pts);
  })();
  scene.add(g);

  // the backyard photo, its lawn laid flat on the ground and its trees on a dome 100 m out. The photo is true from where it was taken,
  // under the porch roof, which also hides the patch under the tripod
  let yard = null;
  new RGBELoader().load('assets/hdri/belfast_farmhouse_2k.hdr', t => {
    yard = new GroundedSkybox(t, LENS, 100);
    yard.position.set(WINDOW.center.x, GROUND + LENS, OUT - 1.2); yard.rotation.y = 0.6; yard.visible = !aloft;
    yard.material.color.setScalar(1.35);
    yard.material.onBeforeCompile = sh => {   // the photo's sky is its bright part above the horizon: the evening takes it over, and the trees go black against it
      Object.assign(sh.uniforms, NIGHT);
      sh.vertexShader = 'varying vec3 vDir;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvDir = mat3(modelMatrix) * position;');
      sh.fragmentShader = SKY + 'varying vec3 vDir;\n' + sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
        vec3 d = normalize(vDir), px = sampledDiffuseColor.rgb; float n = uNight, lum = dot(px, vec3(.2126, .7152, .0722));
        float open = smoothstep(0., .05, d.y) * max(max(smoothstep(1.25, 1.8, px.b / (px.r + 1e-3)) * smoothstep(.1, .25, lum), smoothstep(.28, .45, lum) * smoothstep(.85, 1., px.b / (px.g + 1e-3))), smoothstep(1.5, 3., lum));   // blue, or a cloud (not green like the trees), or the sun
        vec3 land = diffuseColor.rgb * mix(vec3(1.), vec3(1., .72, .55), smoothstep(.1, .45, n) * (1. - smoothstep(.5, .85, n)));
        land = mix(land, vec3(dot(land, vec3(.2126, .7152, .0722))), .55 * n) * mix(1., .06, smoothstep(.2, 1., n)) * mix(vec3(1.), vec3(.6, .75, 1.2), n);
        diffuseColor.rgb = mix(land, mix(diffuseColor.rgb, skyAt(d), smoothstep(.2, .65, n)), open);`);
    };
    scene.add(yard);
  });

  const heaven = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), new THREE.ShaderMaterial({   // the sky over the map, drawn first, round the camera
    uniforms: NIGHT, side: THREE.BackSide, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec3 vDir;\nvoid main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
    fragmentShader: `${SKY}varying vec3 vDir;\nvoid main() { gl_FragColor = vec4(skyAt(normalize(vDir)), 1.); }`,
  }));
  heaven.renderOrder = -1; heaven.frustumCulled = false; heaven.visible = false; scene.add(heaven);
  const credit = Object.assign(document.createElement('div'), { hidden: true });   // Google's terms: its logo, 16 to 19 px high with clear space round it, over the data credits
  credit.style.cssText = 'position:fixed;right:0;bottom:6px;z-index:5;max-width:70vw;padding-right:10px;text-align:right;font:11px/1.4 Arial,sans-serif;color:#fff;text-shadow:0 0 3px #000,0 0 2px #000;pointer-events:none';
  credit.innerHTML = '<img src="assets/google/GoogleMaps_Logo_WithDarkOutline.svg" alt="Google Maps" style="display:block;height:18px;margin:10px 0 5px auto"><span></span>';
  document.body.append(credit);
  const blink = document.createElement('div');   // white, to hide the jump between the photo yard and the map
  blink.style.cssText = 'position:fixed;inset:0;z-index:4;background:#fff;opacity:0;pointer-events:none';
  document.body.append(blink);

  let tiles = null, aloft = false, creditAt = 0, ell = null, toRoom = null, plan = null;

  // The trip: slowly over to Hanover Square, then faster and faster west, higher the faster it goes, and slower and lower again down to the
  // Chautauqua Hall. Two hundred kilometres out the ground is three and a half kilometres below the room's flat frame, so the long leg
  // runs on Google's ellipsoid along the great circle.
  function makePlan() {
    const D = THREE.MathUtils.DEG2RAD, unit = ([lat, lon]) => new THREE.Vector3(Math.cos(lat * D) * Math.cos(lon * D), Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D));
    const a = unit(HANOVER), arc = a.angleTo(unit(HALL)), axis = a.clone().cross(unit(HALL)).normalize(), dist = arc * 6371000, long = dist - DOWN;
    const ground = s => { const p = a.clone().applyAxisAngle(axis, arc * Math.min(1, s / dist)); return [Math.asin(p.z), Math.atan2(p.y, p.x)]; };   // radians, s metres along
    const point = ([lat, lon], h) => ell.getCartographicToPosition(lat, lon, h, new THREE.Vector3()).applyMatrix4(toRoom);
    const up = ([lat, lon]) => ell.getCartographicToNormal(lat, lon, new THREE.Vector3()).transformDirection(toRoom);
    const floor = s => HOUSE.floor + (LAND + 2.7 - HOUSE.floor) * Math.min(1, s / dist);   // 2.7 m over the ground, from the bedroom floor to Fredonia
    const square = at(...HANOVER, 150), west = point(ground(1000), 0).sub(point(ground(0), 0)).setY(0).normalize();
    const path = new THREE.CatmullRomCurve3([AIR[0], new THREE.Vector3(30, 150, 280), square.clone().addScaledVector(west, -300), square]);   // into the square already heading west
    const look = new THREE.CatmullRomCurve3([AIR[1], new THREE.Vector3(330, -150, 280), point(ground(450), HOUSE.floor - 2.7)]);
    const speed = 2 * path.getLength() / SLOW, g = x => (Math.exp(K * x) - 1) / (Math.exp(K) - 1), fast = long * K / ((Math.exp(K) - 1) * speed);   // the long leg starts at the speed the slow one ends
    const frame = (pos, at, normal, alt) => ({ pos, look: at, up: normal, near: Math.min(200, Math.max(0.5, alt / 200)), far: Math.min(1e6, Math.max(5000, alt * 60)) });
    return {
      slow: t => { const u = (t / SLOW) ** 2, p = path.getPointAt(u); return frame(p, look.getPointAt(ease(t / (SLOW * 0.8))), new THREE.Vector3(0, 1, 0), p.y + 2.7); },
      fast, long: t => {
        const u = t / fast, s = u < 0.5 ? long / 2 * g(2 * u) : long - long / 2 * g(2 - 2 * u), h = floor(s) + 150 + CLIMB * Math.min(s, long - s), ahead = s + 3 * (h - floor(s));
        return frame(point(ground(s), h), point(ground(ahead), Math.min(ahead, dist) === dist ? LAND + 8 : floor(ahead) - 2.7), up(ground(s)), h - floor(s) + 2.7);
      },
      down() {   // the ground at Chautauqua Hall, measured now that its tiles are in, then a glide down to a stop high enough that the map still looks good
        const top = point(ground(dist), 2000), hit = new THREE.Raycaster(top, up(ground(dist)).negate()).intersectObject(tiles.group, true)[0], land = hit ? 2000 - hit.distance : LAND;
        const from = point(ground(long), floor(long) + 150), curve = new THREE.QuadraticBezierCurve3(from, point(ground(long + 150), floor(long) + 150), point(ground(dist - 120), land + 70));
        return { curve, land, look: point(ground(dist), land + 8), up: up(ground(dist)), secs: 2 * curve.getLength() / speed };
      },
      dive({ curve, land }) {   // round the east end of the north wing, down to the third floor, and in at the window
        const n = 1 / 111132, e = 1 / (111320 * Math.cos(ROOM328[0] * D)), off = (north, east, hgt) => point([(ROOM328[0] + north * n) * D, (ROOM328[1] + east * e) * D], land + hgt);
        return { curve: new THREE.CatmullRomCurve3([curve.getPointAt(1), off(30, 25, 35), off(25, 0, 9), off(4, 0, 7.3)]), look: off(0, 0, 7.3) };
      },
      frame,
    };
  }

  async function load() {
    const [{ TilesRenderer, WGS84_ELLIPSOID }, { GoogleCloudAuthPlugin }, { GLTFExtensionsPlugin }, { DRACOLoader }] = await Promise.all([
      import(`${LIB}index.three.js`), import(`${LIB}index.core-plugins.js`), import(`${LIB}index.three-plugins.js`), import('three/addons/loaders/DRACOLoader.js')]);
    tiles = new TilesRenderer();
    tiles.registerPlugin(new GoogleCloudAuthPlugin({ apiToken: KEY, autoRefreshToken: true }));
    tiles.registerPlugin(new GLTFExtensionsPlugin({ dracoLoader: new DRACOLoader().setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/libs/draco/gltf/') }));
    tiles.setCamera(camera);
    const D = THREE.MathUtils.DEG2RAD, h = HOUSE.heading * D, c = Math.cos(h), s = Math.sin(h);
    const enu = WGS84_ELLIPSOID.getEastNorthUpFrame(HOUSE.lat * D, HOUSE.lon * D, HOUSE.floor, new THREE.Matrix4());
    toRoom = new THREE.Matrix4().set(c, -s, 0, 0, 0, 0, 1, 0, -s, -c, 0, 0, 0, 0, 0, 1).multiply(enu.invert());   // east, north, up to the room's x, y, z
    toRoom.decompose(tiles.group.position, tiles.group.quaternion, tiles.group.scale);
    ell = WGS84_ELLIPSOID;
    tiles.addEventListener('load-model', ({ scene: m }) => m.traverse(o => { if (o.material) nightTile(o.material); }));
    tiles.group.visible = aloft;
    scene.add(tiles.group);
  }

  return {
    out(screen) {   // climbing out: the window screen is pushed out first, and leaned on the wall beside the window
      screen.position.set(WINDOW.x1 + 0.6, roofY(OUT - 0.15), OUT - 0.15); screen.rotation.x = 0.29;
    },
    white() { blink.style.transition = 'opacity .4s'; blink.style.opacity = 1; },   // in at the window, into the next room
    air: KEY ? on => {   // up into the map, or back down to the roof and the photo yard
      aloft = on;
      if (on && !tiles) load(); else if (tiles) tiles.group.visible = on;
      g.visible = !on; if (yard) yard.visible = !on;
      heaven.visible = on; credit.hidden = !on;
      blink.style.transition = 'none'; blink.style.opacity = 1; void blink.offsetWidth;
      blink.style.transition = 'opacity 1.2s'; blink.style.opacity = 0;
    } : null,
    flight(t) {   // the camera t seconds after it reaches the air over the house, or null while the map is still loading
      if (!ell) return null;
      plan ??= makePlan();
      if (t < SLOW) return plan.slow(t);
      if (t < SLOW + plan.fast) return plan.long(t - SLOW);
      plan.end ??= plan.down();
      const x = (t - SLOW - plan.fast) / plan.end.secs, u = 1 - (1 - Math.min(1, x)) ** 2;
      if (x < 1 + HOLD / plan.end.secs) return { ...plan.frame(plan.end.curve.getPointAt(u), plan.end.look, plan.end.up, 150 - 80 * u), arrived: x >= 1 };
      plan.in ??= plan.dive(plan.end);
      const y = (t - SLOW - plan.fast - plan.end.secs - HOLD) / DIVE;
      return { ...plan.frame(plan.in.curve.getPointAt(ease(y)), plan.in.look, plan.end.up, 70 * (1 - ease(y)) + 7), arrived: true, into: y >= 0.55 };   // into the white while the hall is still twenty metres off, before the map tears up close
    },
    stars(on) { heaven.visible = on || aloft; },   // the night sky, over a room with no ceiling
    evening(n) {   // 0 in the afternoon to 1 at night; the moon climbs as it gets dark
      NIGHT.uNight.value = n; NIGHT.uMoon.value.copy(dir(122, 2 + 12 * n));
    },
    tick(t) {
      NIGHT.uTime.value = t; heaven.position.copy(camera.position); heaven.scale.setScalar(camera.near * 4);
      if (!tiles?.group.visible) return;
      tiles.setResolutionFromRenderer(camera, renderer);
      tiles.update();
      if (t - creditAt < 1) return;
      creditAt = t;
      credit.lastChild.textContent = tiles.getAttributions().filter(a => a.type === 'string').map(a => a.value).join('; ');
    },
  };
}
