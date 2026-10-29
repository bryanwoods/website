import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { buildRoom, WINDOW } from './room.js';
import { buildProps } from './props.js';
import { startSound } from './sound.js';
import { desktop } from './desktop.js';
import { winamp } from './winamp.js';
import { SFX } from './sfx.js';
import { foam } from './foam.js';
import { menu } from './menu.js';
import { paper, cover } from './overlay.js';
import { RECYCLED } from './recycled.js';
import { buildOutside, SEAT, AIR } from './outside.js';
import { jimmy } from './jimmy.js';

const status = document.getElementById('status');
addEventListener('unhandledrejection', e => { status.textContent = 'Error: ' + (e.reason?.message || e.reason); });

const renderer = new THREE.WebGLRenderer({ powerPreference: 'high-performance' });
const phone = matchMedia('(pointer: coarse)').matches;   // a touch screen: lighter rendering, and you drag to look around
renderer.setPixelRatio(Math.min(devicePixelRatio, phone ? 1 : 1.5));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;   // nothing that casts a shadow moves: draw the shadows once
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.prepend(renderer.domElement);
RectAreaLightUniformsLib.init();

const scene = new THREE.Scene();
// you, on a beanbag near the door, looking across the room to the desk, the window, and the bed
const camera = new THREE.PerspectiveCamera(52, 1, 0.03, 200);
camera.position.set(0.35, 0.85, 1.45);   // low, on a beanbag
const HOME = camera.position.clone(), LOOK = new THREE.Vector3(-0.1, 0.78, -2.0), focus = LOOK.clone(), NEAR = camera.near, FAR = camera.far, REACH = HOME.distanceTo(LOOK);

scene.backgroundIntensity = 1.35;   // the yard's brightness (outside.js), which the evening turns down
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.15;

// late-afternoon sun, low in the west, coming in through the window and across the carpet
const SUN = new THREE.Vector3(-0.3, -0.65, 0.7).normalize();   // the way the light travels
const sun = new THREE.DirectionalLight('#ffc98a', 9);
sun.position.copy(WINDOW.center).addScaledVector(SUN, -9);
sun.target.position.copy(WINDOW.center).addScaledVector(SUN, 2);
sun.castShadow = true;
sun.shadow.mapSize.setScalar(phone ? 2048 : 4096);
Object.assign(sun.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 2, far: 16 });
sun.shadow.camera.updateProjectionMatrix();
sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.015; sun.shadow.radius = 2.5;
scene.add(sun, sun.target);
const skyLight = new THREE.RectAreaLight('#dbe6f5', 2.2, WINDOW.x1 - WINDOW.x0, WINDOW.y1 - WINDOW.y0);   // the sky's soft light through the glass
skyLight.position.copy(WINDOW.center).setZ(WINDOW.z + 0.02);
skyLight.lookAt(WINDOW.center.x, WINDOW.center.y, 0);
scene.add(skyLight);
const hemi = new THREE.HemisphereLight('#e6ecf6', '#d9772f', 0.7);
scene.add(hemi);
const bounce = new THREE.PointLight('#ff9a4a', 1.3, 6, 2);   // the sunlit orange carpet throws warm light back up
bounce.position.set(0.1, 0.9, -0.5);
scene.add(bounce);
const patchGlow = new THREE.PointLight('#ffb070', 1.6, 4, 1.6);   // the sun patch on the carpet lights the room from below
patchGlow.position.set(-0.1, 0.25, -0.4);
scene.add(patchGlow);

const room = buildRoom(scene), outside = buildOutside(scene, camera, renderer);
status.textContent = 'Setting up the room…';
const props = await buildProps(scene);
renderer.shadowMap.needsUpdate = true;

// dust: specks everywhere in the air, seen only where they drift through the sunbeam
const DUST = 700, dp = new Float32Array(DUST * 3);
for (let i = 0; i < DUST; i++) dp.set([-1.4 + Math.random() * 2.6, Math.random() * 2.2, -1.95 + Math.random() * 2.6], i * 3);
const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
const dust = new THREE.Points(dustGeo, new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uPx: { value: 1 }, uLight: { value: 1 }, uSun: { value: SUN.clone().negate() }, uWinZ: { value: WINDOW.z - 0.06 },
    uWin: { value: new THREE.Vector4(WINDOW.x0 + 0.04, WINDOW.x1 - 0.04, WINDOW.y0, WINDOW.y1 - 0.04) }, uRails: { value: new THREE.Vector2(...WINDOW.rails) } },
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: /* glsl */`
    uniform float uTime, uPx, uWinZ; uniform vec3 uSun; uniform vec4 uWin; uniform vec2 uRails; varying float vB;
    void main(){
      float s = fract(sin(dot(position, vec3(12.9, 78.2, 37.7))) * 43758.5);
      vec3 p = position + vec3(sin(uTime * 0.07 + s * 40.0) * 0.12, sin(uTime * 0.05 + s * 17.0) * 0.08 + 0.03 * uTime * (s - 0.5), cos(uTime * 0.06 + s * 23.0) * 0.12);
      p.y = mod(p.y, 2.2);
      vec2 q = p.xy + uSun.xy * ((uWinZ - p.z) / uSun.z);
      float m = step(uWinZ + 0.06, p.z) * step(uWin.x, q.x) * step(q.x, uWin.y) * step(uWin.z, q.y) * step(q.y, uWin.w)
              * step(0.03, abs(q.y - uRails.x)) * step(0.03, abs(q.y - uRails.y));
      vB = m * (0.4 + 0.6 * sin(uTime * (0.6 + s) + s * 60.0) * 0.5 + 0.3);   // they catch the light as they turn
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = clamp(uPx * (0.6 + s) / -mv.z, 1.0, 5.0);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */`
    uniform float uLight; varying float vB;
    void main(){ float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5)); gl_FragColor = vec4(vec3(1.0, 0.86, 0.66) * vB * a * 1.6 * uLight, 1.0); }`,
}));
dust.frustumCulled = false;
scene.add(dust);

// the beam: sunlight made visible by the dust in the air, in the shape of the window and its rails
const BeamShader = {
  uniforms: { tScene: { value: null }, tDepth: { value: null }, uProjInv: { value: new THREE.Matrix4() }, uCamWorld: { value: new THREE.Matrix4() },
    uCam: { value: new THREE.Vector3() }, uSun: { value: SUN.clone().negate() }, uWin: { value: new THREE.Vector4(WINDOW.x0 + 0.04, WINDOW.x1 - 0.04, WINDOW.y0, WINDOW.y1 - 0.04) },
    uWinZ: { value: WINDOW.z - 0.06 }, uRails: { value: new THREE.Vector2(...WINDOW.rails) }, uDensity: { value: 0.24 }, uCol: { value: new THREE.Color('#ffd7a6') }, uTime: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: /* glsl */`
    uniform sampler2D tScene, tDepth; uniform mat4 uProjInv, uCamWorld; uniform vec3 uCam, uSun, uCol; uniform vec4 uWin; uniform vec2 uRails;
    uniform float uWinZ, uDensity, uTime; varying vec2 vUv;
    float h3(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
    float beamAt(vec3 p){
      if (p.z < uWinZ + 0.06 || p.y < 0.0) return 0.0;
      vec2 q = p.xy + uSun.xy * ((uWinZ - p.z) / uSun.z);        // follow the ray back to the window
      float e = 0.012, m = smoothstep(uWin.x - e, uWin.x + e, q.x) * smoothstep(uWin.y + e, uWin.y - e, q.x) * smoothstep(uWin.z - e, uWin.z + e, q.y) * smoothstep(uWin.w + e, uWin.w - e, q.y);
      m *= smoothstep(0.022, 0.034, abs(q.y - uRails.x)) * smoothstep(0.022, 0.034, abs(q.y - uRails.y));   // the sash rails block it
      return m;
    }
    void main(){
      vec3 base = texture2D(tScene, vUv).rgb;
      float d = texture2D(tDepth, vUv).r;
      vec4 v = uProjInv * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0); v /= v.w;
      vec3 wp = (uCamWorld * v).xyz, rd = wp - uCam;
      float L = min(length(rd), 7.0); rd = normalize(rd);
      float j = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime) * 43758.5453), acc = 0.0;
      const int N = 20; float st = L / float(N);
      for (int i = 0; i < N; i++) {
        vec3 s = uCam + rd * st * (float(i) + j);
        vec3 c = floor(s * 6.0 + vec3(0.0, uTime * 0.05, 0.0));
        acc += beamAt(s) * (0.55 + 0.45 * h3(c));                    // the dust is uneven
      }
      gl_FragColor = vec4(base + uCol * acc * st * uDensity, 1.0);
    }`,
};
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform float uTime; varying vec2 vUv;
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      c *= 1.0 - 0.55 * pow(length(vUv - 0.5) * 1.25, 2.4);                                  // vignette
      c = c * vec3(1.04, 1.0, 0.92) + vec3(0.012, 0.008, 0.0);                                // a warm print: Kodak Gold, 1997
      c = mix(vec3(dot(c, vec3(0.2126, 0.7152, 0.0722))), c, 1.08);
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c += (fract(sin(dot(vUv * vec2(1237.0, 971.0) + uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.018 * (0.4 + l);   // film grain
      gl_FragColor = vec4(c, 1.0);
    }`,
};

// the scene renders into its own target with a depth texture; the beam reads it there and writes into the composer
const sceneRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthTexture: new THREE.DepthTexture(1, 1) });
const composer = new EffectComposer(renderer);
const beam = new ShaderPass(BeamShader, 'none');
beam.uniforms.tScene.value = sceneRT.texture;
beam.uniforms.tDepth.value = sceneRT.depthTexture;
composer.addPass(beam);
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.55, 0.9);
composer.addPass(bloom);
const grade = new ShaderPass(GradeShader);
composer.addPass(grade);
composer.addPass(new OutputPass());
const smaa = new SMAAPass(1, 1);
composer.addPass(smaa);

function resize() {
  camera.aspect = innerWidth / innerHeight;
  camera.fov = camera.aspect < 1 ? 70 : 52;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  sceneRT.setSize(innerWidth * renderer.getPixelRatio(), innerHeight * renderer.getPixelRatio());
  dust.material.uniforms.uPx.value = innerHeight * renderer.getPixelRatio() / 220;
}
addEventListener('resize', resize);
resize();

// your head turns a little with the pointer, and drifts when you leave it alone
// with a mouse, wherever the pointer is; with a finger, you drag the room around you, far enough to see every wall
const mouse = new THREE.Vector2(), look = new THREE.Vector2(), aim = new THREE.Vector3(), turn = new THREE.Vector2(), turned = new THREE.Vector2(), UP = new THREE.Vector3(0, 1, 0), side = new THREE.Vector3();
addEventListener('pointermove', e => { if (e.pointerType === 'mouse') mouse.set(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1); });
let drag = { moved: 0 };   // so the end of a drag isn't taken for a tap
renderer.domElement.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, moved: 0 }; spot?.press?.(e); });
renderer.domElement.addEventListener('pointerup', e => spot?.release?.(e));
renderer.domElement.addEventListener('pointermove', e => {
  if (drag.x == null || (e.pointerType !== 'touch' && !e.buttons)) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
  if (held) return void (held.spin += dx * 0.012);   // turning the trophy in your hand
  if (e.pointerType === 'touch' && (!spot || spot.free)) turn.set(THREE.MathUtils.clamp(turn.x - dx / innerWidth * 2.2, -1.45, 1.45), THREE.MathUtils.clamp(turn.y + dy / innerHeight * 1.2, -0.45, 0.45));
});

const btn = document.getElementById('sound');
let ac, sound;
btn.onclick = () => {
  if (!ac) { sound = startSound(); ac = sound.ac; }
  else if (ac.state === 'running') ac.suspend(); else ac.resume();
  btn.textContent = ac.state === 'suspended' ? 'SOUND OFF' : 'SOUND ON';
  setTimeout(() => { btn.textContent = ac.state === 'running' ? 'SOUND OFF' : 'SOUND ON'; }, 50);
};

status.textContent = 'Horseheads, NY. A Tuesday in June, about 4:47 PM.';
setTimeout(() => { status.style.opacity = 0; }, 6000);
Object.assign(window, { THREE, scene, camera, sun, renderer, props, beam });

// the things you can click: a click flies you to a close view of one, and Esc or a click anywhere in the room flies you back.
// The view is in the address (#computer), so the back button and a shared link both work.
const sfx = (name, k) => { if (ac?.state === 'running') SFX[name](ac, ac.destination, k); };   // only once SOUND ON has started the audio
const pc = desktop(sfx), back = () => { location.hash = ''; };
let dialed = false;
// shrunk in the tank: a point on its gravel at the eye height of something pebble-sized, and a point just ahead of you
const inTank = (x, z, up = 0.006) => props.tank.group.localToWorld(new THREE.Vector3(x, props.tank.ground(x) + up, z));
const ahead = d => camera.getWorldDirection(new THREE.Vector3()).setY(0).normalize().multiplyScalar(d).add(camera.position);
const under = Object.assign(document.createElement('div'), { hidden: true });   // under the water everything goes green and dim
under.style.cssText = 'position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 50% -10%, rgba(170,240,215,.15), rgba(15,85,70,.5))';
document.body.append(under);
let walk = null;   // where you are walking to in the tank, and where you look on the way
// out on the roof: a look left, a look right, and a look up at the sky (seconds, turn left in radians, tilt up), then up you go
const LOOKS = [[0, 0, 0], [0.5, 0, 0], [1.9, 0.75, 0.05], [3.5, -0.75, 0.05], [5, 0, 1]];
let roofAt = 0, trip = null;
// a trophy picked up off the dresser: it floats up in front of you, upright on the screen with its plate toward you, a drag turns it,
// and it goes back where it was when you put it down
let held = null, heldAt = 0;
function pickUp(t) {
  held = { t, parent: t.parent, pos: t.getWorldPosition(new THREE.Vector3()), quat: t.getWorldQuaternion(new THREE.Quaternion()), spin: 0, k: 0, down: false };
  scene.attach(t);
  say(t.userData.lines.join(' · '), 6000);
}
const putDown = () => { held.down = true; };
function hold(now = heldAt) {
  const dt = Math.min(0.05, now - heldAt); heldAt = now;
  if (!held) return;
  const { t, h = t.userData.h } = held;
  held.k = THREE.MathUtils.clamp(held.k + (held.down ? -dt : dt) / 0.45, 0, 1);
  const e = held.k * held.k * (3 - 2 * held.k);
  const to = camera.localToWorld(new THREE.Vector3(0, -h * 0.5, -(0.16 + h * 1.15)));   // far enough to see all of it
  const facing = camera.quaternion.clone().multiply(new THREE.Quaternion().setFromAxisAngle(UP, held.spin));
  t.position.lerpVectors(held.pos, to, e); t.quaternion.slerpQuaternions(held.quat, facing, e);
  if (held.k === 0 && (held.down || !spot)) { held.parent.attach(t); held = null; }
}
const squash = (s, b = props.bag) => { b.userData.y ??= b.position.y; b.scale.y = s; b.position.y = b.userData.y * s; };   // from the floor up: its middle is its origin
const game = foam(scene, camera, props.hoop, sfx, text => say(text, 4000));   // the foam basketballs
// Thrasher's "Classics" upload of Muska's part: Bryan's link (wUxEhn7mhG0) and the full Shorty's video refuse to play outside youtube.com
const muska = winamp({ video: '8kRTFNU4ZaE', title: "CHAD MUSKA - FULFILL THE DREAM (SHORTY'S 1998)", onClose: back });
const noTeeth = winamp({ audio: 'assets/conformity/no-teeth.mp3', title: 'CONFORMITY - NO TEETH', side: 'right', onClose: back });   // Bryan's high school band
const band = winamp({ video: 'RUUP4kkl6Z0', title: 'FACE DOWN IN MEXICO CITY WITH AN ICE PICK IN THE BACK - SHANGHAI THE SAILOR', side: 'right', onClose: back });   // Bryan's college band
const offroad = jimmy({ audio: () => ac, exit: back });
const fit = (h, w) => { const t = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)); return Math.max(h / t, w / (t * camera.aspect)); };   // how far back to stand to see h by w metres
const SPOTS = {
  computer: {
    mesh: props.screen, leave: pc.hide,
    get hint() { return innerHeight > innerWidth ? 'Turn your phone sideways to use the computer.' : pc.visitors ? 'Leave Bryan an away message: it goes under Visitors on his buddy list.' : ''; },
    enter() { pc.show(); if (!dialed && ac?.state === 'running') { dialed = true; sfx('modem'); } },   // the first time you sit down with the sound on, the modem dials out
    view() {   // square on to the glass, near enough that the screen and a little of the bezel fill the view
      const c = props.screen.getWorldPosition(new THREE.Vector3());
      return [c.clone().setZ(c.z + fit(0.29, innerHeight > innerWidth ? 0.33 : 0.36)), c];   // on a phone held upright, the glass nearly fills the width
    },
    place() {   // the desktop's HTML over the glass, from where the glass's corners land on the page
      const { width: w, height: h } = props.screen.geometry.parameters, m = props.screen.matrixWorld;
      const tl = new THREE.Vector3(-w / 2, h / 2, 0.006).applyMatrix4(m).project(camera), br = new THREE.Vector3(w / 2, -h / 2, 0.006).applyMatrix4(m).project(camera);   // the glass bulges: its edges stand 6 mm proud
      pc.place((tl.x + 1) / 2 * innerWidth, (1 - tl.y) / 2 * innerHeight, (br.x - tl.x) / 2 * innerWidth, (tl.y - br.y) / 2 * innerHeight);
    },
  },
  newt: {
    mesh: props.tank.glass, menu: ["*~ FIRENEWTY'Z CRIB ~*", [['FEED FIRENEWTY', 'newt'], ['GET IN', 'tank']]], hint: `Firenewty. ${phone ? 'Tap' : 'Click'} the water to drop in a bloodworm.`,
    enter() { props.tank.greet(camera.position); },
    view() {   // down the tank from its water end, under the lid, and clear of the guitar's headstock beside it
      const c = props.tank.glass.getWorldPosition(new THREE.Vector3());
      return [c.clone().add(new THREE.Vector3(1, 0.18, 0.1).normalize().multiplyScalar(0.13 + fit(0.18, 0.2))), c.clone().setY(c.y - 0.02)];
    },
    click() { if (!ray.intersectObject(props.tank.glass).length) return false; props.tank.feed(ray.ray); return true; },
  },
  tank: {   // GET IN: shrunk to the size of a pebble, standing on the gravel in Firenewty's tank. Only the tank's menu brings you here
    mesh: [], near: 0.001, free: true,   // free: the head turns with the pointer here, as in the room
    hint: `You're the size of a pebble. ${phone ? 'Tap' : 'Click'} the gravel to walk there, or the sky to drop in a bloodworm.`,
    view: () => [inTank(-0.1, 0.02), inTank(0.06, -0.01, -0.004)],   // on the dry end, looking down the slope to the water
    enter() { props.tank.greet(ahead(0.08)); },   // he comes over to see what you are, and stops where you can see all of him
    leave() { under.hidden = true; walk = null; },
    place() {
      under.hidden = props.tank.group.worldToLocal(camera.position.clone()).y > props.tank.water;
      if (!walk) return;
      camera.position.lerp(walk.to, 0.03); focus.lerp(walk.look, 0.06);
      if (camera.position.distanceTo(walk.to) < 0.0005) walk = null;
    },
    click() {   // along the ray in millimetre steps: where it meets the gravel, walk there; if it never does, a bloodworm drops in ahead
      const { group, ground, XB, ZB } = props.tank, r = ray.ray.clone().applyMatrix4(group.matrixWorld.clone().invert()), p = r.origin.clone();
      for (let s = 0; s < 300 && Math.abs(p.x) < XB && Math.abs(p.z) < ZB && p.y < 0.2; s++, p.addScaledVector(r.direction, 0.001)) {
        if (p.y > ground(p.x)) continue;
        const x = THREE.MathUtils.clamp(p.x, 0.008 - XB, XB - 0.008), z = THREE.MathUtils.clamp(p.z, 0.008 - ZB, ZB - 0.008), to = inTank(x, z);
        walk = { to, look: to.clone().add(to.clone().sub(camera.position).setY(0).normalize().multiplyScalar(0.05)).setY(to.y - 0.004) };
        return true;
      }
      const at = ahead(0.04);
      props.tank.feed(new THREE.Ray(at.setY(at.y + 1), new THREE.Vector3(0, -1, 0)));
      return true;
    },
  },
  news: {   // the framed Star-Gazette story on the wall over the dresser, close enough to read
    mesh: props.news, enter: noTeeth.show, leave: noTeeth.hide, hint: 'The Star-Gazette, Wednesday, August 20, 2003. On Winamp: Conformity, "No Teeth."',
    view() {   // the frame in the left half of the view, Winamp in the right
      const c = props.news.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, -0.2));
      return [c.clone().add(new THREE.Vector3(fit(0.42, 0.8), 0, 0)), c];
    },
  },
  lamp: { mesh: props.lamp, act() { lamp.user = !lamp.on; } },   // the desk lamp's switch
  cans: {   // a Diet Coke: crack it, drink it, crush it
    mesh: props.cans,
    act(c) {
      const s = c.userData.state;
      if (s === 'full') { c.userData.state = 'open'; sfx('crack'); say('Pssshhht.', 2500); }
      else if (s === 'open') { c.userData.state = 'empty'; sfx('gulp'); say('Warm, and flat already. Still good.', 3000); }
      else if (s === 'empty') { props.crush(c); sfx('crunch'); say('Crushed.', 2000); }
      else say('Already crushed.', 2000);
    },
  },
  mags: { mesh: props.mags, act(m) { cover(m.userData.cover, m.userData.title); } },
  papers: { mesh: props.papers, act(p) { paper(RECYCLED.find(r => r.name === p.userData.note).text, p.geometry.type !== 'PlaneGeometry'); } },   // smoothed out, if it was balled up
  window: {   // standing at the window, looking out at the yard
    mesh: (() => { const m = new THREE.Mesh(new THREE.BoxGeometry(WINDOW.x1 - WINDOW.x0, WINDOW.y1 - WINDOW.y0, 0.06), new THREE.MeshBasicMaterial({ visible: false })); m.position.copy(WINDOW.center).setZ(WINDOW.z + 0.05); scene.add(m); return m; })(),
    free: true, hint: `The backyard. ${phone ? 'Drag' : 'Move the mouse'} to look around.`, menu: ['*~ DA WINDOW ~*', [['LOOK OUT', 'window'], ['CLIMB OUT', 'roof'], ['OFF ROAD', 'offroad']]],
    view: () => [new THREE.Vector3(WINDOW.center.x, 1.42, WINDOW.z + 0.55), new THREE.Vector3(WINDOW.center.x - 0.25, 1.25, WINDOW.z - 1.5)],
  },
  roof: {   // CLIMB OUT: through the open bottom half of the window and sat on the porch roof. Only the window's menu brings you here
    mesh: [], near: 0.1, far: 4000,
    get free() { return !outside.air; },   // with the map, the roof is only the way up
    get hint() { return outside.air ? 'Out on the porch roof.' : `Out on the porch roof. ${phone ? 'Drag' : 'Move the mouse'} to look around.`; },
    via: () => [new THREE.Vector3(WINDOW.center.x, 1.08, WINDOW.z + 0.35), new THREE.Vector3(WINDOW.center.x, 0.9, WINDOW.z - 2)],   // to the window first, low enough to go under the sash
    view: () => SEAT,
    go() { outside.out(room.screen); },
    enter() { roofAt = clock.getElapsedTime(); },
    place() {
      if (!outside.air) return;
      const s = clock.getElapsedTime() - roofAt, i = LOOKS.findIndex(k => k[0] > s);
      if (i < 0) return void (location.hash = 'float');
      const [t0, y0, p0] = LOOKS[i - 1], [t1, y1, p1] = LOOKS[i], e = smooth(t0, t1, s), base = new THREE.Spherical().setFromVector3(SEAT[1].clone().sub(SEAT[0]));
      focus.setFromSphericalCoords(base.radius, base.phi - p0 - (p1 - p0) * e, base.theta + y0 + (y1 - y0) * e).add(SEAT[0]);
    },
  },
  float: {   // up off the roof and away west to SUNY Fredonia, in Google's 3D map, and in at the window of room 328. Only the roof brings you here
    mesh: [], near: 1, far: 20000, secs: 4,
    view: () => AIR,
    go() { outside.air(true); },
    enter() { trip = { at: clock.getElapsedTime() }; },
    place() {
      if (trip.done) return;
      const f = outside.flight(clock.getElapsedTime() - trip.at);
      if (!f) return void (trip.at = clock.getElapsedTime());   // the trip starts when the map has loaded
      camera.position.copy(f.pos); focus.copy(f.look); camera.up.copy(f.up);
      camera.near = f.near; camera.far = f.far; camera.updateProjectionMatrix();
      if (f.arrived && !trip.said) { trip.said = true; say('Chautauqua Hall, SUNY Fredonia. Fall 2003.', 4000); }
      if (f.into) {   // white, then the dorm; back from there comes home to the bedroom, not to the start of the trip
        trip.done = true; outside.white();
        setTimeout(() => { history.replaceState(null, '', location.pathname); location.href = '../dorm/'; }, 450);
      }
    },
    leave() { trip = null; camera.up.set(0, 1, 0); camera.position.copy(SEAT[0]); focus.copy(SEAT[1]); outside.air(false); },   // back on the roof in a blink, then the usual way in
  },
  offroad: {   // OFF ROAD: a look out at the field behind the house, and then the field as a cartoon, in Dave's dad's Jimmy
    mesh: [], view: () => SPOTS.window.view(), enter: offroad.open, leave: offroad.close,
  },
  trophies: {   // close enough to read the plates; a click on one picks it up
    mesh: props.trophies, hint: `Horseheads Youth Soccer, and one summer at Sodus Bay. ${phone ? 'Tap' : 'Click'} one to pick it up.`,
    click() {
      let o = ray.intersectObjects(props.trophies)[0]?.object;
      while (o && !props.trophies.includes(o)) o = o.parent;
      if (!o) return false;
      pickUp(o); return true;
    },
    leave() { if (held) { held.k = 0; held.down = true; hold(); } },   // put straight back
    view() {
      const b = new THREE.Box3(); props.trophies.forEach(t => b.expandByObject(t));
      const c = b.getCenter(new THREE.Vector3());
      return [c.clone().add(new THREE.Vector3(0.32, 0.42, 0.3)), c.clone().setY(c.y - 0.04)];   // from where the plates face, high enough to see over the hoodie on the chair
    },
  },
  bag: {   // plopped down on the beanbag under the window, looking back across the room toward the door
    mesh: props.bag, free: true, hint: `You're on the beanbag. ${phone ? 'Drag' : 'Move the mouse'} to look around.`,
    view: () => [new THREE.Vector3(0.45, 0.74, -1.48), new THREE.Vector3(-1.0, 0.86, 0.8)],
    enter() { sfx('plop'); },
    leave() { squash(1); },
    place() { squash(props.bag.scale.y + (0.92 - props.bag.scale.y) * 0.2); },   // the beans settle under you
  },
  pizza: {   // the Pudgie's box at the foot of the bed, open, with half a pizza left in it
    mesh: props.pizza.group, hint: `Half a Pudgie's left. ${phone ? 'Tap' : 'Click'} a square to eat it.`,
    enter() { props.pizza.open(true); },
    leave() { props.pizza.open(false); },
    view() { const b = props.pizza.group; return [b.localToWorld(new THREE.Vector3(0, 0.45, 0.36)), b.localToWorld(new THREE.Vector3(0, 0.02, -0.03))]; },
    click() {
      const left = props.pizza.eat(ray.intersectObjects(props.pizza.squares)[0]?.object);
      if (left == null) return false;
      sfx('chomp'); say(left ? `${left} square${left > 1 ? 's' : ''} left.` : "That was the last square. There's grease on the box forever.", 3000);
      return true;
    },
  },
  muska: {
    mesh: props.deck, enter: muska.show, leave: muska.hide,
    view() {   // square on to the deck against the wall, with the deck in the right half of the view and Winamp in the left
      const c = new THREE.Box3().setFromObject(props.deck).getCenter(new THREE.Vector3()).add(new THREE.Vector3(0, 0, -0.3));
      return [c.clone().add(new THREE.Vector3(-0.8, 0.12, 0)), c];
    },
  },
  hoop: {
    mesh: props.hoop.group, ...game,
    click: () => true,   // here a click is part of a throw, not a way out
    hint: `${phone ? 'Swipe' : 'Drag'} up and let go to shoot. Longer goes farther.`,
    view() {   // standing in the middle of the room, a step and a half back from the hoop, the rim a little above your eyes
      const r = props.hoop.rim;
      return [new THREE.Vector3(r.x + 0.18, 1.32, r.z + 1.45), r.clone().setY(r.y + 0.05)];
    },
  },
  guitar: {
    mesh: [props.guitar, props.demo], enter: band.show, leave: band.hide,
    view() {   // in front of the guitar and off to its right, so the bookshelf stays out of the view; the guitar left of centre, Winamp on the right
      const c = new THREE.Box3().setFromObject(props.guitar).getCenter(new THREE.Vector3());
      return [c.clone().add(new THREE.Vector3(0.6, 0.05, 0.9)), c.add(new THREE.Vector3(0.22, 0, 0))];
    },
  },
};
let spot = null, fly = null;
const ray = new THREE.Raycaster();
ray.params.Line.threshold = 0.005;   // a line (the tank's edges, the guitar's strings) is hit only on it; three.js's default reaches a metre around it
let picked = null;   // the very thing the last hit landed on: which can, which paper, which magazine
const hit = e => {   // the nearest clickable thing under the pointer
  ray.setFromCamera(new THREE.Vector2(e.clientX / innerWidth * 2 - 1, 1 - e.clientY / innerHeight * 2), camera);
  let best = null, near = Infinity;
  for (const [k, s] of Object.entries(SPOTS)) {
    const h = ray.intersectObjects([s.mesh].flat())[0];
    if (h && h.distance < near) { near = h.distance; best = k; picked = h.object; }
  }
  return best;
};
renderer.domElement.addEventListener('pointermove', e => { const k = hit(e); renderer.domElement.style.cursor = (k && (!spot || SPOTS[k] === spot && spot.click)) || (!spot && game.pick(ray.ray)) ? 'pointer' : ''; });
renderer.domElement.addEventListener('click', e => {   // a spot can take the click for itself, and a thing with a menu asks first
  if (drag.moved > 12) return;
  if (held) return void putDown();   // holding a trophy, a click puts it down
  const k = hit(e);
  if (spot?.click?.()) return;
  if (!spot && game.pick(ray.ray, true)) return void (location.hash = 'hoop');   // a foam ball: pick it up and go shoot
  if (!spot && SPOTS[k]?.act) return void SPOTS[k].act([SPOTS[k].mesh].flat().find(o => o === picked || o.getObjectById(picked.id)));   // some things you use where they are
  if (!spot && SPOTS[k]?.menu) return menu(e.clientX, e.clientY, ...SPOTS[k].menu, to => { location.hash = to; });
  location.hash = spot ? '' : k || '';
});
const backButton = document.getElementById('back');
backButton.onclick = back;   // the way out on a phone, which has no Esc key
addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (held) putDown(); else if (spot) location.hash = ''; });   // Esc puts a trophy down before it takes you anywhere
function route() {
  const next = SPOTS[location.hash.slice(1)]?.view ? SPOTS[location.hash.slice(1)] : null;   // the things you use where they are have nowhere to fly to
  if (next === spot) return;
  spot?.leave?.(); spot = next; backButton.hidden = !spot; spot?.go?.();
  if (spot?.near) camera.near = spot.near;   // shrunk, things a few millimetres away must not be cut off
  camera.far = spot?.far ?? FAR; camera.updateProjectionMatrix();
  if (spot?.free) turn.set(0, 0);
  const [to, toLook] = spot ? spot.view() : [HOME, LOOK], [mid, midLook] = spot?.via?.() ?? [];   // via: a stop on the way, such as the window
  fly = { from: camera.position.clone(), fromLook: focus.clone(), to: mid ?? to, toLook: midLook ?? toLook, t0: clock.getElapsedTime(), next: mid && [to, toLook], secs: spot?.secs };
}
addEventListener('hashchange', route);
addEventListener('resize', () => { if (spot && !fly) { const [to, toLook] = spot.view(); camera.position.copy(to); focus.copy(toLook); } });

// the afternoon goes on while you stay: the sun drops and reddens, the sky through the window goes orange and then blue, the mower
// stops and the crickets start, the desk lamp clicks on, and someone calls up the stairs for dinner. Ten minutes of yours are three
// and a half hours of his. ?at=<minutes> starts the visit that many minutes in.
const DUSK = 600, AT = (+new URLSearchParams(location.search).get('at') || 0) * 60, SUN_DAY = SUN.clone(), SUN_LOW = new THREE.Vector3(-0.55, -0.12, 0.83).normalize();
const smooth = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
const TINT = { sunDay: sun.color.clone(), sunSet: new THREE.Color('#ff7a2e'), beamDay: beam.uniforms.uCol.value.clone(), skyDay: skyLight.color.clone(), hemiDay: hemi.color.clone(), night: new THREE.Color('#34467e'), white: new THREE.Color('#fff') };
const dusky = (() => {   // the sky outside the window after sunset, laid over the yard: blue at the top, orange at the tree line
  const c = Object.assign(document.createElement('canvas'), { width: 4, height: 256 }), x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 256);
  [[0, '#1b2550'], [0.45, '#4b4a86'], [0.7, '#c4688a'], [0.85, '#ff9a55'], [1, '#ffb867']].forEach(([s, col]) => g.addColorStop(s, col));
  x.fillStyle = g; x.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const f = 3.5, eye = SPOTS.window.view()[0];   // grown about the eye at the window, out past the edge of the porch roof, so the roof stays in front of it
  const m = new THREE.Mesh(new THREE.PlaneGeometry(4 * f, 3 * f), new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
  m.position.set(WINDOW.center.x, WINDOW.y0 + 1.3, WINDOW.z - 0.6).sub(eye).multiplyScalar(f).add(eye); scene.add(m);
  return m;
})();
const lamp = (() => {   // a bulb under the desk lamp's shade, found as the highest point of the lamp, shining down onto the desk
  const top = new THREE.Vector3(0, -Infinity, 0), v = new THREE.Vector3();
  props.lamp.updateMatrixWorld(true);
  props.lamp.traverse(o => { if (!o.isMesh) return; const p = o.geometry.attributes.position; for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld); if (v.y > top.y) top.copy(v); } });
  const light = new THREE.SpotLight('#ffb46a', 0, 3.5, 0.95, 0.7, 1.6), bulb = new THREE.Mesh(new THREE.SphereGeometry(0.008, 12, 8), new THREE.MeshBasicMaterial({ color: '#ffe2b0' }));
  light.position.copy(top).y -= 0.07; light.target.position.set(-1.25, 0.74, -1.6);   // down onto the desk
  bulb.position.copy(light.position); bulb.visible = false; scene.add(light, light.target, bulb);
  return { light, bulb, on: false, dark: false, user: null };   // user: switched on or off by hand, until it gets dark
})();
const say = (text, ms = 7000) => { status.textContent = text; status.style.opacity = 1; setTimeout(() => { status.style.opacity = 0; }, ms); };
let shadowsAt = 0, called = 0;
function dusk(t) {
  const s = t + AT, k = Math.min(1, s / DUSK), up = 1 - smooth(0.5, 0.85, k), night = smooth(0.4, 1, k);
  SUN.lerpVectors(SUN_DAY, SUN_LOW, smooth(0, 0.85, k)).normalize();
  sun.position.copy(WINDOW.center).addScaledVector(SUN, -9); sun.target.position.copy(WINDOW.center).addScaledVector(SUN, 2); sun.target.updateMatrixWorld();
  sun.color.lerpColors(TINT.sunDay, TINT.sunSet, smooth(0.3, 0.8, k)); sun.intensity = 9 * up;
  beam.uniforms.uSun.value.copy(SUN).negate(); dust.material.uniforms.uSun.value.copy(SUN).negate();
  beam.uniforms.uDensity.value = 0.24 * up; dust.material.uniforms.uLight.value = up; beam.uniforms.uCol.value.lerpColors(TINT.beamDay, TINT.sunSet, smooth(0.3, 0.8, k));
  skyLight.color.lerpColors(TINT.skyDay, TINT.night, night); skyLight.intensity = 2.2 - 1.95 * night;
  hemi.color.lerpColors(TINT.hemiDay, TINT.night, night); hemi.intensity = 0.7 - 0.58 * night;
  bounce.intensity = 1.3 * up; patchGlow.intensity = 1.6 * up;
  scene.backgroundIntensity = 1.35 - 1.27 * night; scene.environmentIntensity = 0.15 - 0.12 * night; renderer.toneMappingExposure = 1.05 - 0.2 * night;
  dusky.visible = spot !== SPOTS.roof && spot !== SPOTS.float;   // it hangs out past the porch roof, so it is only for looking out from the room
  dusky.material.opacity = 0.9 * smooth(0.35, 0.9, k); dusky.material.color.lerpColors(TINT.white, TINT.night, smooth(0.8, 1, k));
  if (k > 0.7 !== lamp.dark) { lamp.dark = k > 0.7; lamp.user = null; }   // at dusk it comes on, whatever you did before
  if ((lamp.user ?? lamp.dark) !== lamp.on) { lamp.on = !lamp.on; lamp.bulb.visible = lamp.on; sfx('click'); }
  lamp.light.intensity += ((lamp.on ? 7 : 0) - lamp.light.intensity) * 0.3;
  sound?.dusk(k);
  if (up > 0 && t - shadowsAt > 2) { shadowsAt = t; renderer.shadowMap.needsUpdate = true; }
  const min = 4 * 60 + 47 + Math.floor(s * 0.35);   // the clock on the computer's taskbar
  pc.clock(`${(Math.floor(min / 60) - 1) % 12 + 1}:${String(min % 60).padStart(2, '0')} PM`);
  if (k > 0.95 && called < 1) { called = 1; say('From downstairs: “Bryan! Dinner!”'); }
  if (s > DUSK + 120 && called < 2) { called = 2; say('From downstairs: “Bryan! It’s getting cold!”'); }
}

// ?fps=1 shows the frame rate in the corner
const showFps = new URLSearchParams(location.search).has('fps');
let frames = 0, lastFps = performance.now();
const clock = new THREE.Clock(), still = new THREE.Vector2();
let drift = 1;   // the head turn and the idle sway; both stop while you look at something close
route();
renderer.setAnimationLoop(() => {
  if (offroad.active && !fly) return;   // the cartoon covers the room
  const t = clock.getElapsedTime();
  if (fly) {
    const s = Math.min(1, (t - fly.t0) / (fly.secs ?? 1.4)), e = s * s * (3 - 2 * s);
    camera.position.lerpVectors(fly.from, fly.to, e).y += fly.from.distanceTo(fly.to) > 1 && !fly.low ? 0.3 * Math.sin(Math.PI * e) : 0;   // up over the chair, not through it
    focus.lerpVectors(fly.fromLook, fly.toLook, e);
    if (s === 1 && fly.next) fly = { from: fly.to, fromLook: fly.toLook, to: fly.next[0], toLook: fly.next[1], t0: t, low: true };
    else if (s === 1) {
      fly = null; spot?.enter?.();
      camera.near = spot?.near ?? NEAR; camera.updateProjectionMatrix();
      if (spot?.hint) { status.textContent = spot.hint; status.style.opacity = 1; setTimeout(() => { status.style.opacity = 0; }, 5000); }
    }
  }
  drift += ((spot && !spot.free ? 0 : 1) - drift) * 0.05;
  look.lerp(spot && !spot.free ? still : mouse, 0.035);
  const reach = drift * camera.position.distanceTo(focus) / REACH;   // the head turns through the same angle at any size: in the room, or shrunk in the tank
  side.subVectors(focus, camera.position).cross(UP).normalize();
  aim.copy(focus).addScaledVector(side, (look.x * 1.1 + Math.sin(t * 0.13) * 0.05) * reach);
  aim.y += (-look.y * 0.55 + Math.sin(t * 0.11) * 0.03) * reach;
  turned.lerp(turn, 0.2);
  aim.sub(camera.position).applyAxisAngle(UP, -turned.x * drift);   // the drag: a turn of the head, then a tilt
  aim.applyAxisAngle(side.crossVectors(aim, UP).normalize(), turned.y * drift).add(camera.position);
  camera.lookAt(aim);
  camera.updateMatrixWorld();
  if (spot && !fly) spot.place?.();
  hold(t);
  game.tick(t);
  room.tick(t);
  props.tick(t);
  outside.tick(t);
  dusk(t);
  dust.material.uniforms.uTime.value = t;
  beam.uniforms.uTime.value = grade.uniforms.uTime.value = t;
  beam.uniforms.uProjInv.value.copy(camera.projectionMatrixInverse);
  beam.uniforms.uCamWorld.value.copy(camera.matrixWorld);
  beam.uniforms.uCam.value.copy(camera.position);
  renderer.setRenderTarget(sceneRT);
  renderer.render(scene, camera);
  composer.render();
  if (showFps && ++frames && performance.now() - lastFps > 1000) { status.style.opacity = 1; status.textContent = `${frames} fps`; frames = 0; lastFps = performance.now(); }
});
