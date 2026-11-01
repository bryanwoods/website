// The laundry on the floor and the Flameboy hoodie on the chair, as cloth you drag around the room. You hold a piece by the point you grabbed;
// it, and every piece that lies on it, are stepped in clothworker.js and fall onto whatever is under them: the room's heights, seen from above.
import * as THREE from 'three';
import { sheet, sample, FLAMEBOY } from './pile.js';
import { garment } from './laundry.js';
import { ROOM } from './room.js';

const RES = 0.01, NX = Math.round((ROOM.x1 - ROOM.x0) / RES), NZ = Math.round((ROOM.z1 - ROOM.z0) / RES), X0 = ROOM.x0 + RES / 2, Z0 = ROOM.z0 + RES / 2;
const WALL = [ROOM.x0 + 0.03, ROOM.x1 - 0.03, ROOM.z0 + 0.03, ROOM.z1 - 0.03];
const LIFT = 0.04, HIGH = 1, LOW = 0.35;   // the hand drags its point 4 cm over whatever is under it, never higher than the dresser;
// cloth under a desk or a chair seat lies on what is under 35 cm

export function wardrobe({ scene, camera, renderer, pile, chair }) {
  const room = pile.pieces[0].parent, recs = pile.pieces.map(mesh => ({ mesh, p: mesh.userData.piece, s: mesh.userData.sheet, pos: mesh.userData.pos, vel: new Float32Array(mesh.userData.pos.length) }));
  const worker = new Worker(new URL('./clothworker.js', import.meta.url), { type: 'module' }), ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let sim = null, ids = 0, fb = null, bottom = null;

  // the room from straight above, every pixel the height of the highest thing under the cut there, in centimetres (red) and the fraction of one (green);
  // or from straight below, the lowest thing there, and 2.55 m where there is nothing
  const top = new THREE.Scene(), rt = new THREE.WebGLRenderTarget(NX, NZ), px = new Uint8Array(4 * NX * NZ);
  const cam = new THREE.OrthographicCamera(ROOM.x0, ROOM.x1, ROOM.z0, ROOM.z1, 0.05, 3);   // top and bottom swapped, so pixel rows run with z
  cam.position.set(0, 3, 0); cam.up.set(0, 0, -1); cam.lookAt(0, 0, 0); cam.updateMatrixWorld();
  const up = new THREE.OrthographicCamera(ROOM.x0, ROOM.x1, ROOM.z1, ROOM.z0, 0.05, 3);
  up.position.set(0, -0.5, 0); up.up.set(0, 0, 1); up.lookAt(0, 0, 0); up.updateMatrixWorld();
  top.overrideMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: `varying float vY;
      void main() {
        vec4 p = vec4(position, 1.0);
        #ifdef USE_INSTANCING
          p = instanceMatrix * p;
        #endif
        p = modelMatrix * p; vY = p.y; gl_Position = projectionMatrix * viewMatrix * p;
      }`,
    uniforms: { cut: { value: 9 } },
    fragmentShader: 'uniform float cut; varying float vY; void main() { if (vY > cut) discard; float c = max(vY, 0.0) * 100.0; gl_FragColor = vec4(floor(c) / 255.0, fract(c), 0.0, 1.0); }',
  });
  function heights(skip, cut = 9, below = false) {   // skip: the cloth that is moving, which is not under anything
    const hidden = [];
    room.traverse(o => { if (o.visible && (skip.includes(o) || o.isSprite || o.isLine || o.isPoints)) { o.visible = false; hidden.push(o); } });
    const was = renderer.getRenderTarget(), clear = renderer.getClearColor(new THREE.Color()), alpha = renderer.getClearAlpha();
    top.add(room);
    top.overrideMaterial.uniforms.cut.value = cut;
    renderer.setRenderTarget(rt); renderer.setClearColor(below ? 0xff0000 : 0, 1); renderer.clear(); renderer.render(top, below ? up : cam);
    renderer.readRenderTargetPixels(rt, 0, 0, NX, NZ, px);
    renderer.setRenderTarget(was); renderer.setClearColor(clear, alpha);
    scene.add(room); hidden.forEach(o => { o.visible = true; });
    const h = new Float32Array(NX * NZ);
    for (let k = 0; k < h.length; k++) h[k] = (px[4 * k] + px[4 * k + 1] / 255) / 100;
    return { h, at: sample(h, NX, NZ, X0, Z0, RES) };
  }

  function flameboy() {   // the hoodie on the chair as cloth: each particle starts where its spot on the photo lies in the drape, 1.5 mm a pixel
    if (fb) return fb;
    const s = sheet(FLAMEBOY.outline, FLAMEBOY.h), b = s.bounds, M = 0.0015, g = chair.geometry.attributes.position, { widthSegments: W, heightSegments: H } = chair.geometry.parameters;
    const p = { ...FLAMEBOY, photo: chair.material.map.image, photoRect: [b.x0 / M + 255.5, 8 + (0.37 - b.y1) / M, (b.x1 - b.x0) / M, (b.y1 - b.y0) / M] };
    const pos = new Float32Array(3 * s.n), v = new THREE.Vector3(), corner = (i, j, w) => v.addScaledVector(new THREE.Vector3().fromBufferAttribute(g, j * (W + 1) + i), w);
    for (let k = 0; k < s.n; k++) {
      const fx = (s.P[2 * k] / M + 255.5) / 512 * W, fy = (8 + (0.37 - s.P[2 * k + 1]) / M) / 512 * H;
      const i = THREE.MathUtils.clamp(Math.floor(fx), 0, W - 1), j = THREE.MathUtils.clamp(Math.floor(fy), 0, H - 1), u = fx - i, w = fy - j;
      v.set(0, 0, 0); corner(i, j, (1 - u) * (1 - w)); corner(i + 1, j, u * (1 - w)); corner(i, j + 1, (1 - u) * w); corner(i + 1, j + 1, u * w);
      chair.localToWorld(v).toArray(pos, 3 * k);
    }
    return fb = { mesh: garment(p, s, pos), p, s, pos, vel: new Float32Array(3 * s.n) };
  }

  function riders(list) {   // the pieces in list, every piece with a tenth of it or more on one of them, and every piece on those
    const set = new Set(list), cell = (x, z) => Math.round(x / 0.02) * 1e4 + Math.round(z / 0.02);
    for (let grew = true; grew;) {
      grew = false;
      const high = new Map();
      for (const c of set) for (let i = 0; i < c.pos.length; i += 3) { const k = cell(c.pos[i], c.pos[i + 2]); high.set(k, Math.max(high.get(k) ?? -1, c.pos[i + 1])); }
      for (const c of recs) {
        if (set.has(c)) continue;
        let on = 0;
        for (let i = 0; i < c.pos.length; i += 3) { const y = high.get(cell(c.pos[i], c.pos[i + 2])); if (c.pos[i + 1] > y && c.pos[i + 1] < y + 0.04) on++; }
        if (on > c.s.n / 10) { set.add(c); grew = true; }
      }
    }
    return [...set];
  }

  function start(list, held, pin) {   // step these pieces, the one held hanging from its particle pin
    bottom ??= heights([...recs.map(c => c.mesh), chair, pile.shadow], 9, true);   // the undersides of the furniture: laundry and the hoodie on the chair never roof anything
    const f = heights(list.map(c => c.mesh)), low = heights(list.map(c => c.mesh), LOW);
    f.on = (x, z, y) => (y < bottom.at(x, z) - 0.02 ? low : f).at(x, z);   // under a desk or a chair seat: what is under it
    let o = 0, at = -1;
    for (const c of list) { if (c === held) at = o + pin; o += c.s.n; c.mesh.userData.moving = true; }
    sim = { id: ++ids, list, f, held: !!held, last: performance.now() };
    pile.shadow.userData.draw();
    worker.postMessage({ id: sim.id, pin: at, wall: WALL, field: { h: f.h, low: low.h, bottom: bottom.h, nx: NX, nz: NZ, x0: X0, z0: Z0, res: RES }, parts: list.map(c => ({ outline: c.p.outline, h: c.p.h, thick: c.p.thick, soft: c.p.soft, pos: c.pos, vel: c.vel })) });
  }
  worker.onmessage = ({ data: m }) => {
    if (m.id !== sim?.id) return;
    let o = 0;
    for (const c of sim.list) { c.pos = m.pos.slice(o, o + 3 * c.s.n); c.vel = m.vel.slice(o, o + 3 * c.s.n); o += 3 * c.s.n; }
    sim.fresh = true; sim.waiting = false;
    if (!m.done) return;
    for (const c of sim.list) { c.mesh.userData.pos = c.pos; c.mesh.userData.moving = false; c.vel.fill(0); }
    sim = null;
    const f = heights([]);   // all at rest: the folds and the gaps go dark again, and the carpet under the cloth
    for (const c of recs) c.mesh.userData.update(c.pos, f);
    pile.shadow.userData.draw(); renderer.shadowMap.needsUpdate = true;
  };

  function reach(r, f) {   // LIFT over what the pointer is on, or over the floor where the pointer's line meets a wall
    const p = r.origin.clone(), q = new THREE.Vector3();
    for (let t = 0.05; t < 8; t += 0.01) {
      q.copy(r.origin).addScaledVector(r.direction, t);
      if (q.x < WALL[0] || q.x > WALL[1] || q.z < WALL[2] || q.z > WALL[3]) break;
      p.copy(q);
      if (q.y <= f.on(q.x, q.z, q.y)) break;
    }
    return [p.x, Math.min(f.on(p.x, p.z, p.y), HIGH) + LIFT, p.z];
  }
  const aim = e => ray.setFromCamera(ndc.set(e.clientX / innerWidth * 2 - 1, 1 - e.clientY / innerHeight * 2), camera);
  const meshes = () => [...recs.map(c => c.mesh), ...(chair.visible ? [chair] : [])];

  return {
    get holding() { return !!sim?.held; },   // while you carry a piece, your head keeps still
    under(e) { aim(e); return ray.intersectObjects(meshes())[0]?.distance ?? Infinity; },   // how far off the cloth under the pointer is
    grab(e, near) {   // a press on a piece, nearer than anything else you can click, picks it up by the point under the pointer
      aim(e);
      const hit = ray.intersectObjects(meshes())[0];
      if (!hit || hit.distance > near) return false;
      const c = hit.object === chair ? flameboy() : recs.find(r => r.mesh === hit.object);
      let pin = 0, best = Infinity;
      for (let i = 0; i < c.pos.length; i += 3) { const d = hit.point.distanceToSquared(new THREE.Vector3(c.pos[i], c.pos[i + 1], c.pos[i + 2])); if (d < best) { best = d; pin = i / 3; } }
      if (c === fb && !recs.includes(fb)) {   // off the chair; a press on the photo round the hoodie is not on the hoodie
        if (best > 0.03 ** 2) return false;
        chair.visible = false; room.add(fb.mesh); recs.push(fb); pile.pieces.push(fb.mesh);
      }
      e.target.setPointerCapture(e.pointerId);
      start(riders([...(sim?.list ?? []), c]), c, pin);
      return true;
    },
    move: aim,
    drop() { if (sim) sim.held = false; },
    tick() {   // show the last frame of cloth, and ask for the next: the steps in the time since the last ask, so each frame moves as far as it lasted
      if (!sim) return;
      if (sim.fresh) { sim.fresh = false; for (const c of sim.list) c.mesh.userData.update(c.pos); renderer.shadowMap.needsUpdate = true; }
      if (sim.waiting) return;
      const now = performance.now(), steps = THREE.MathUtils.clamp(Math.round((now - sim.last) * 0.6), 1, 20);
      if (sim.held) ray.setFromCamera(ndc, camera);
      Object.assign(sim, { last: now, waiting: true });
      worker.postMessage({ id: sim.id, steps, held: sim.held, hand: sim.held && reach(ray.ray, sim.f) });
    },
  };
}
