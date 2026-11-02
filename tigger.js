// Tigger, the fat orange tabby. Every few minutes he comes in at the door and finds his way round the furniture to somewhere to sleep: the
// laundry, wherever it lies now, the bed, the beanbag, or the carpet by the window. He hops up, turns round once, lies down in a loaf with his
// tail round him, and sleeps, breathing, an ear twitching now and then. Later he gets up and goes out. A click on him makes him purr.
// He is made of shapes, coloured after a 3D orange tabby on RenderHub: thin dark stripes down from the spine, a cream belly and chest, a ringed
// tail with a cream tip, and the M on his forehead; his belly hangs.
import * as THREE from 'three';

const CELL = 0.05, NX = 72, NZ = 80, X0 = -1.8, Z0 = -2;   // the floor map: 5 cm squares over the room
const DOOR = new THREE.Vector3(0.95, 0, 1.82), SPEED = 0.3;   // where he comes in; metres a second

const color = (a, b, k) => new THREE.Color(a).lerp(new THREE.Color(b), k).getStyle();
function fur(w, h, draw) {   // painted, then brushed with short hairs along the length
  const c = Object.assign(document.createElement('canvas'), { width: w, height: h }), x = c.getContext('2d');
  draw(x, w, h);
  for (let i = 0; i < w * h / 6; i++) {
    const px = Math.random() * w, py = Math.random() * h;
    x.strokeStyle = `rgba(${Math.random() < 0.5 ? '255,236,205' : '95,40,12'},${Math.random() * 0.13})`; x.lineWidth = 1;
    x.beginPath(); x.moveTo(px, py); x.lineTo(px + (Math.random() - 0.5) * 2, py + 3 + Math.random() * 5); x.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
// the body's sphere has its poles at his tail and his chest: across the picture is round him, with his spine a quarter of the way across and his
// belly three quarters; down the picture runs from his tail to his chest
const BODY = fur(512, 256, (x, w, h) => {
  for (let px = 0; px < w; px++) {
    const a = Math.abs(((px / w - 0.25 + 1.5) % 1) - 0.5) * 2;   // 0 on the spine, 1 under the belly
    x.fillStyle = a < 0.6 ? color('#c45d22', '#df8a3c', a / 0.6) : color('#df8a3c', '#f3dbb2', Math.min(1, (a - 0.6) / 0.22)); x.fillRect(px, 0, 1, h);
  }
  for (let y = 8; y < h - 10; y += 13 + Math.random() * 6) for (const dir of [-1, 1]) for (let s = 0; s < 1; s += 0.015) {   // stripes, thinning down each side
    x.fillStyle = 'rgba(150,60,18,.5)'; x.beginPath(); x.arc(w * (0.25 + dir * s * 0.21), y + Math.sin(s * 5 + y) * 3 + s * 5, 3.6 * (1 - s * 0.8), 0, 7); x.fill();
  }
});
const PLAIN = fur(256, 128, (x, w, h) => { x.fillStyle = '#dc843a'; x.fillRect(0, 0, w, h); });
const HEAD = fur(256, 128, (x, w, h) => {   // his face looks out from a quarter of the way across
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#c86526'); g.addColorStop(0.6, '#e08c40'); g.addColorStop(1, '#ecb47c'); x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.fillStyle = '#f5e0bd'; x.beginPath(); x.ellipse(64, 104, 22, 26, 0, 0, 7); x.fill();   // the cream of his muzzle and chin
  x.strokeStyle = 'rgba(140,55,15,.85)'; x.lineWidth = 3; x.lineJoin = 'round';
  x.beginPath(); x.moveTo(50, 48); x.lineTo(55, 26); x.lineTo(64, 40); x.lineTo(73, 26); x.lineTo(78, 48); x.stroke();   // the M
  for (const s of [-1, 1]) { x.beginPath(); x.moveTo(64 + s * 22, 62); x.quadraticCurveTo(64 + s * 34, 66, 64 + s * 44, 60); x.stroke(); }   // lines back from his eyes
  for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(110 + i * 20, 6); x.lineTo(104 + i * 20, 40); x.stroke(); }   // stripes over the back of his head
});
const LEG = fur(128, 128, (x, w, h) => {
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#d77d34'); g.addColorStop(1, '#f0c995'); x.fillStyle = g; x.fillRect(0, 0, w, h);
  for (let y = 12; y < h * 0.75; y += 15) { x.fillStyle = 'rgba(150,60,18,.45)'; x.fillRect(0, y, w, 4); }
});
const EYE = (() => {
  const c = Object.assign(document.createElement('canvas'), { width: 64, height: 64 }), x = c.getContext('2d');
  x.fillStyle = '#2a1a08'; x.fillRect(0, 0, 64, 64);
  const g = x.createRadialGradient(16, 32, 1, 16, 32, 12); g.addColorStop(0, '#f2c25a'); g.addColorStop(1, '#b8781e'); x.fillStyle = g; x.beginPath(); x.arc(16, 32, 12, 0, 7); x.fill();
  x.fillStyle = '#080502'; x.beginPath(); x.ellipse(16, 32, 2.4, 9, 0, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(13, 28, 2, 0, 7); x.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const fluff = (map, tint = '#ffffff') => new THREE.MeshPhysicalMaterial({ map, color: tint, roughness: 0.92, sheen: 1, sheenRoughness: 0.55, sheenColor: new THREE.Color('#ffb46e') });
const SHADOW = (() => {
  const c = Object.assign(document.createElement('canvas'), { width: 64, height: 64 }), x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();

function build() {   // standing on the floor at his origin, facing +z; body: all that rises when he breathes and sinks when he lies down
  const cat = new THREE.Group(), body = new THREE.Group(); cat.add(body);
  const skin = fluff(BODY), plain = fluff(PLAIN), leg = fluff(LEG), cream = fluff(PLAIN, '#ffe7c4'), pink = new THREE.MeshStandardMaterial({ color: '#e59a92', roughness: 0.6 });
  const ball = (r, mat, x, y, z, sx = 1, sy = 1, sz = 1, parent = body) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 20), mat); m.position.set(x, y, z); m.scale.set(sx, sy, sz); parent.add(m); return m; };
  const torso = new THREE.SphereGeometry(1, 48, 32).rotateX(-Math.PI / 2), p = torso.attributes.position;
  for (let i = 0; i < p.count; i++) {   // fattest at the middle, the belly hanging lower than the back is high, narrower to the chest
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), fat = 1 + 0.14 * Math.cos(z * 1.5), chest = z > 0.55 ? 1 - (z - 0.55) * 0.45 : 1;
    p.setXYZ(i, x * 0.122 * fat * chest, y * (y < 0 ? 0.128 : 0.098) * fat * chest, z * 0.215);
  }
  torso.computeVertexNormals();
  const trunk = new THREE.Mesh(torso, skin); trunk.position.set(0, 0.2, 0); body.add(trunk);
  ball(0.083, plain, 0, 0.215, 0.15, 1, 1.05, 1); ball(0.056, plain, 0, 0.27, 0.205);   // the chest, and the neck
  for (const s of [-1, 1]) { ball(0.062, plain, s * 0.056, 0.2, -0.13, 0.95, 1.1, 1.15); ball(0.05, plain, s * 0.058, 0.21, 0.14); }   // haunches and shoulders
  ball(0.075, cream, 0, 0.155, 0.13, 1, 0.9, 1.1);   // the cream of his chest and belly front

  const head = new THREE.Group(); head.position.set(0, 0.31, 0.245); body.add(head);
  ball(0.062, fluff(HEAD), 0, 0, 0, 1.13, 0.95, 1, head);
  for (const s of [-1, 1]) ball(0.034, plain, s * 0.04, -0.021, 0.024, 1, 0.9, 1, head);   // his cheeks
  ball(0.026, cream, 0, -0.024, 0.052, 1.3, 0.8, 0.9, head); ball(0.017, cream, 0, -0.042, 0.042, 1, 0.8, 1, head);   // muzzle and chin
  ball(0.0075, pink, 0, -0.011, 0.074, 1.2, 0.8, 0.8, head);   // his nose
  const eyes = [-1, 1].map(s => { const e = ball(0.0118, new THREE.MeshStandardMaterial({ map: EYE, roughness: 0.15 }), s * 0.026, 0.008, 0.05, 1, 1, 0.7, head); e.rotation.y = s * 0.3; return e; });
  const ears = [-1, 1].map(s => {
    const ear = new THREE.Group(); ear.position.set(s * 0.036, 0.048, -0.004); ear.rotation.set(-0.12, 0, -s * 0.38); head.add(ear);
    const outer = new THREE.Mesh(new THREE.ConeGeometry(0.029, 0.055, 14), plain); outer.position.y = 0.022; outer.scale.z = 0.55; ear.add(outer);
    const inner = new THREE.Mesh(new THREE.ConeGeometry(0.019, 0.04, 14), pink); inner.position.set(0, 0.018, 0.008); inner.scale.z = 0.3; ear.add(inner);
    return ear;
  });
  const whisk = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) whisk.push(s * 0.02, -0.026, 0.06, s * 0.085, -0.03 + i * 0.012, 0.045 - i * 0.004);
  head.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(whisk, 3)), new THREE.LineBasicMaterial({ color: '#f6f0e4', transparent: true, opacity: 0.8 })));

  const legs = [[-1, 0.14], [1, 0.14], [-1, -0.13], [1, -0.13]].map(([s, z]) => {   // front left, front right, back left, back right: from the shoulder or hip to the floor
    const l = new THREE.Group(); l.position.set(s * (z > 0 ? 0.062 : 0.07), 0.21, z); body.add(l);
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.13, 6, 14), leg); m.position.y = -0.09; l.add(m);
    ball(0.026, cream, 0, -0.19, 0.008, 1, 0.55, 1.35, l);   // the paw
    return l;
  });
  let at = new THREE.Group(); at.position.set(0, 0.24, -0.205); body.add(at);   // the tail, twelve rings, each hung from the one before
  const tail = [];
  for (let i = 0; i < 12; i++) {
    const r = 0.022 - i * 0.0008, len = 0.028, seg = new THREE.Group();
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, 10).rotateX(Math.PI / 2).translate(0, 0, -len / 2), i > 9 ? cream : fluff(PLAIN, i % 2 ? '#a95e2c' : '#ffffff'));
    seg.add(m); at.add(seg); tail.push(seg);
    const next = new THREE.Group(); next.position.z = -len; seg.add(next); at = next;
  }
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.56), new THREE.MeshBasicMaterial({ map: SHADOW, transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.003; cat.add(shadow);
  return { cat, body, head, eyes, ears, legs, tail, shadow };
}

export function tigger({ scene, camera, clothes, pile, bag, sfx }) {
  const T = build(), look = new THREE.Raycaster();
  look.camera = camera;
  T.cat.name = 'Tigger'; T.cat.visible = false; scene.add(T.cat);
  let state = 'away', next = 25, path = [], then = '', spot = null, start = null, land = null, floor = null, last = 0, until = 0;
  let phase = 0, walk = 0, lie = 0, sleep = 0, yaw = Math.PI, twitch = 0, flick = 0;

  const surface = (x, z) => {   // the top of whatever is at (x, z), not counting him
    look.set(new THREE.Vector3(x, 2.2, z), new THREE.Vector3(0, -1, 0));
    const h = look.intersectObject(scene, true).find(h => h.object.isMesh && h.object.visible && h.object.material.visible !== false && !T.cat.getObjectById(h.object.id));
    return h ? h.point.y : 0;
  };
  function map() {   // the floor in 5 cm squares: blocked where something stands on it, widened by half his width; laundry and magazines don't count
    const { high, bottom } = clothes.ground(), b = new Uint8Array(NX * NZ);
    for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++) {
      const x = X0 + (i + 0.5) * CELL, z = Z0 + (j + 0.5) * CELL;
      b[j * NX + i] = i < 2 || j < 2 || i >= NX - 2 || j >= NZ - 2 || [[0, 0], [-0.02, -0.02], [0.02, -0.02], [-0.02, 0.02], [0.02, 0.02]].some(([dx, dz]) => bottom.at(x + dx, z + dz) < 0.2 && high.at(x + dx, z + dz) > 0.04) ? 1 : 0;
    }
    const wide = b.slice();
    for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++) if (b[j * NX + i]) for (let dj = -2; dj <= 2; dj++) for (let di = -2; di <= 2; di++) { const ii = i + di, jj = j + dj; if (ii >= 0 && jj >= 0 && ii < NX && jj < NZ) wide[jj * NX + ii] = 1; }
    return wide;
  }
  const centre = (i, j) => new THREE.Vector3(X0 + (i + 0.5) * CELL, 0, Z0 + (j + 0.5) * CELL);
  const free = (x, z) => { const i = Math.floor((x - X0) / CELL), j = Math.floor((z - Z0) / CELL); return i >= 0 && j >= 0 && i < NX && j < NZ && !floor[j * NX + i]; };
  function nearest(x, z) {   // the free square closest to (x, z)
    let best = null, bd = Infinity;
    for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++) if (!floor[j * NX + i]) { const d = (X0 + (i + 0.5) * CELL - x) ** 2 + (Z0 + (j + 0.5) * CELL - z) ** 2; if (d < bd) { bd = d; best = [i, j]; } }
    return best;
  }
  function route(a, [gi, gj]) {   // A* over the squares, then straightened wherever the way is clear
    const [si, sj] = nearest(a.x, a.z), goal = gj * NX + gi, g = new Float32Array(NX * NZ).fill(Infinity), came = new Int32Array(NX * NZ).fill(-1), shut = new Uint8Array(NX * NZ), open = [sj * NX + si];
    g[sj * NX + si] = 0;
    const h = k => { const dx = Math.abs(k % NX - gi), dz = Math.abs(Math.floor(k / NX) - gj); return Math.max(dx, dz) + 0.414 * Math.min(dx, dz); };
    while (open.length) {
      let bi = 0; for (let k = 1; k < open.length; k++) if (g[open[k]] + h(open[k]) < g[open[bi]] + h(open[bi])) bi = k;
      const c = open.splice(bi, 1)[0];
      if (c === goal) break;
      shut[c] = 1;
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
        const ni = c % NX + di, nj = Math.floor(c / NX) + dj, n = nj * NX + ni;
        if ((!di && !dj) || ni < 0 || nj < 0 || ni >= NX || nj >= NZ || floor[n] || shut[n]) continue;
        const cost = g[c] + (di && dj ? 1.414 : 1);
        if (cost < g[n]) { if (g[n] === Infinity) open.push(n); g[n] = cost; came[n] = c; }
      }
    }
    if (g[goal] === Infinity) return null;
    const pts = [];
    for (let k = goal; k >= 0; k = came[k]) pts.unshift(centre(k % NX, Math.floor(k / NX)));
    const clear = (p, q) => { for (let s = 0; s <= 1; s += 0.5 * CELL / Math.max(1e-6, p.distanceTo(q))) if (!free(p.x + (q.x - p.x) * s, p.z + (q.z - p.z) * s)) return false; return true; };
    const out = [];
    for (let k = 0; k < pts.length - 1;) { let f = pts.length - 1; while (f > k + 1 && !clear(pts[k], pts[f])) f--; out.push(pts[f]); k = f; }
    return out;
  }
  function places() {   // somewhere to sleep, most often the laundry where it lies now, then the bed, then the beanbag or the carpet by the window
    const laundry = pile.pieces.filter(m => m.visible && !m.userData.moving).map(m => {
      const p = m.userData.pos; let cx = 0, cz = 0; for (let i = 0; i < p.length; i += 3) { cx += p[i]; cz += p[i + 2]; }
      cx /= p.length / 3; cz /= p.length / 3;
      return new THREE.Vector3(cx, surface(cx, cz), cz);
    }).sort(() => Math.random() - 0.5);
    const b = new THREE.Box3().setFromObject(bag).getCenter(new THREE.Vector3());
    const bed = new THREE.Vector3(1.22, surface(1.22, -0.95), -0.95), beanbag = new THREE.Vector3(b.x, surface(b.x, b.z), b.z), sun = new THREE.Vector3(0.35, 0, -0.35);
    const r = Math.random(), first = r < 0.45 ? laundry[0] : r < 0.75 ? bed : r < 0.87 ? beanbag : sun;
    return [first, ...laundry, bed, beanbag, sun].filter(Boolean);
  }
  function go(to, after) {   // walk from where he is to the floor next to `to`
    const g = nearest(to.x, to.z), p = g && route(T.cat.position, g);
    if (!p) return false;
    path = p; then = after; state = 'walk';
    return true;
  }
  function enter(t) {
    floor = map(); T.cat.position.copy(DOOR); yaw = Math.PI; T.cat.visible = true; lie = sleep = 0;
    for (const s of places()) if (go(s, 'hop')) { spot = s; return; }
    T.cat.visible = false; next = t + 60;   // nowhere to go this time
  }
  const leave = t => { T.cat.visible = false; state = 'away'; next = t + 150 + Math.random() * 110; };

  function pose(t, dt) {
    const w = walk, L = lie, S = sleep;
    T.legs.forEach((l, k) => {   // trot: front left with back right, front right with back left; lying, front paws tucked forward and back legs folded under
      const swing = Math.sin(phase + (k === 0 || k === 3 ? 0 : Math.PI)) * 0.5 * w;
      l.rotation.x = swing * (1 - L) + (k < 2 ? -1.45 : -1.25) * L; l.scale.y = 1 - (k < 2 ? 0.55 : 0.45) * L;
    });
    T.body.position.y = -0.074 * L + Math.abs(Math.sin(phase)) * 0.008 * w;
    const breath = Math.sin(t * 1.9) * (0.012 + 0.018 * S); T.body.scale.set(1 + breath, 1 + breath, 1);
    T.head.position.y = 0.31 - 0.03 * L; T.head.rotation.x = 0.35 * S + Math.sin(phase * 2) * 0.03 * w;
    T.eyes.forEach(e => { e.scale.y = 1 - 0.9 * S; });
    twitch = Math.max(0, twitch - dt); flick = Math.max(0, flick - dt);
    T.ears.forEach((e, k) => { e.rotation.z = (k ? -0.38 : 0.38) + (k ? -1 : 1) * Math.sin(twitch * 30) * twitch * 0.8; });
    T.tail.forEach((s, i) => {   // carried up as he walks, arching back and swinging; lying, down to what he lies on and round his side
      s.rotation.x = (i ? -0.06 : 0.55) * (1 - L) + (i === 0 ? -1.3 : i === 5 ? 1.3 : 0) * L;
      s.rotation.y = Math.sin(t * 3 - i * 0.5) * (0.06 + 0.12 * w) * (1 - L) + (i > 5 ? 0.4 : 0) * L + Math.sin(t * 6 - i) * flick * 0.25;
    });
    T.shadow.scale.setScalar(1 + 0.2 * L);
  }

  return {
    get mesh() { return T.cat.visible ? T.cat : []; },   // nothing to click while he's out
    pet() { twitch = 1; flick = 1; sfx('purr'); },
    tick(t) {
      const dt = Math.min(0.05, t - (last || t)); last = t;
      if (state === 'away') { if (t > next) enter(t); return; }
      const c = T.cat.position;
      if (state === 'walk') {
        const target = path[0], d = Math.hypot(target.x - c.x, target.z - c.z);
        if (d < 0.02) {
          path.shift();
          if (!path.length) { state = then; until = t; start = c.clone(); }
        } else {
          const want = Math.atan2(target.x - c.x, target.z - c.z), turn = Math.atan2(Math.sin(want - yaw), Math.cos(want - yaw));
          yaw += turn * Math.min(1, dt * 6);
          const step = Math.min(d, SPEED * dt * Math.max(0.2, Math.cos(turn)));
          c.x += Math.sin(yaw) * step; c.z += Math.cos(yaw) * step; phase += step / 0.05;
        }
      } else if (state === 'hop') {   // up onto it, or just a step if it's the floor
        const k = Math.min(1, (t - until) / 0.55), up = spot.y > 0.02;
        c.set(start.x + (spot.x - start.x) * k, start.y + (spot.y + 0.01 - start.y) * k + Math.sin(Math.PI * k) * (up ? 0.16 : 0.02), start.z + (spot.z - start.z) * k);
        if (k === 1) { state = 'turn'; until = t; }
      } else if (state === 'turn') {   // round once before lying down
        yaw += dt * 4.5; phase += dt * 9;
        if (t - until > 1.4) { state = 'lie'; until = t; }
      } else if (state === 'lie') {
        lie = Math.min(1, t - until); sleep = Math.max(0, Math.min(1, (t - until - 0.8) / 2));
        if (t - until > 2.8) { state = 'sleep'; until = t + 60 + Math.random() * 70; }
      } else if (state === 'sleep') {
        if (Math.random() < dt / 7) twitch = 1;
        if (Math.random() < dt / 11) flick = 1;
        if (t > until) { state = 'rise'; until = t; }
      } else if (state === 'rise') {
        sleep = Math.max(0, 1 - (t - until) / 0.8); lie = Math.max(0, 1 - (t - until - 0.6));
        if (t - until > 1.8) {   // off it and back to the floor, then out the way he came
          floor = map(); start = c.clone(); const g = nearest(c.x, c.z); land = centre(...g);
          if (c.y > 0.02) { state = 'down'; until = t; } else if (!go(DOOR, 'out')) leave(t);
        }
      } else if (state === 'down') {
        const k = Math.min(1, (t - until) / 0.5);
        c.set(start.x + (land.x - start.x) * k, start.y * (1 - k) + Math.sin(Math.PI * k) * 0.08, start.z + (land.z - start.z) * k);
        if (k === 1 && !go(DOOR, 'out')) leave(t);
      } else if (state === 'out') leave(t);
      const moving = state === 'walk' ? 1 : state === 'turn' ? 0.6 : 0;
      walk += (moving - walk) * Math.min(1, dt * 6);
      T.cat.rotation.y = yaw;
      pose(t, dt);
    },
  };
}
