// Edward Fortyhands: a forty duct-taped into each fist, and the tape comes off when both are empty. The first time a bottle comes up, its cap
// pops off and goes across the room. Hold left or right to drink that one; hold it up too long and you choke and spill. Every sip fills the
// bladder, and the drunker you get the faster it fills; and the RA comes round on the hour. Empty both before either. The room sways and
// blurs more with every swallow.
import * as THREE from 'three';
import { forty } from './fridge.js';
import { canvas } from './room.js';

const DRINK = 0.11, SIP = 1.6, CHOKE = 0.8, RA = 40;   // of a bottle each second; the longest swallow and how long a choke stops you, in seconds; when the RA knocks
const REST = [[-0.2, -0.29, -0.46], [-0.16, 0, 0.14]], LIFT = [[-0.073, -0.186, -0.34], [1.151, 0, -0.201]];   // the left hand, low; and at your mouth, its neck just under your eyes and the bottle away down to the left
const CSS = `
  .fh { position: fixed; inset: 0; pointer-events: none; z-index: 5; font: 400 13px Silkscreen, "Lucida Console", monospace; letter-spacing: 1px; color: #ffb21c; text-shadow: 0 0 6px rgba(255,150,0,.75); }
  .fh .lcd { position: absolute; padding: 6px 10px; border-radius: 4px; background: repeating-linear-gradient(#0d1a24 0 2px, #0a141c 2px 3px); border: 1px solid #262c33; box-shadow: inset 0 2px 5px #000, 0 2px 8px rgba(0,0,0,.5); }
  .fh .bladder { top: 16px; left: 50%; width: 200px; margin-left: -236px; }
  .fh .bladder i { display: block; height: 9px; margin-top: 5px; border: 1px solid #5a3a00; background: linear-gradient(90deg, #ffb21c var(--p), transparent var(--p)); box-shadow: 0 0 6px rgba(255,150,0,.5); }
  .fh .ra { top: 16px; left: 50%; margin-left: 8px; } .fh .ra b { display: block; margin-top: 2px; font-size: 18px; font-weight: 400; }
  .fh .ra.soon b { color: #ff4a2a; text-shadow: 0 0 8px #ff2a10; animation: fhblink .5s steps(1) infinite; } @keyframes fhblink { 50% { opacity: .25; } }
  .fh .key { bottom: 22px; transition: opacity 1s; } .fh .key.l { left: 22px; } .fh .key.r { right: 22px; }
  .fh .end { top: 40%; left: 50%; transform: translate(-50%, -50%); padding: 14px 22px; font-size: 22px; opacity: 0; transition: opacity .6s; }
`;

// duct tape: a silver-grey cloth weave under a plastic skin, creased where it was pulled round a fist, its wraps' edges lying over each other
const weave = canvas(256, 256, (x, w, h) => {
  x.fillStyle = '#9ba1a8'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 2500; i++) { x.fillStyle = `rgba(${Math.random() < 0.5 ? '0,0,0' : '255,255,255'},${Math.random() * 0.08})`; x.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
  for (let i = 0; i < w; i += 3) { x.fillStyle = 'rgba(0,0,0,.07)'; x.fillRect(i, 0, 1, h); x.fillStyle = 'rgba(255,255,255,.05)'; x.fillRect(0, i, w, 1); }
  for (let i = 0; i < 16; i++) {   // creases: a dark fold with a bright edge beside it
    const ax = Math.random() * w, ay = Math.random() * h, bx = ax + (Math.random() - 0.5) * 140, by = ay + (Math.random() - 0.5) * 60, cx = (ax + bx) / 2 + (Math.random() - 0.5) * 40, cy = (ay + by) / 2 + (Math.random() - 0.5) * 30;
    for (const [o, ink, lw] of [[0, 'rgba(0,0,0,.28)', 2.5], [2, 'rgba(255,255,255,.3)', 1.5]]) { x.strokeStyle = ink; x.lineWidth = lw; x.beginPath(); x.moveTo(ax + o, ay + o); x.quadraticCurveTo(cx + o, cy + o, bx + o, by + o); x.stroke(); }
  }
  for (let y = 40; y < h; y += 72) { x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 2; x.beginPath(); for (let px = 0; px <= w; px += 8) x.lineTo(px, y + Math.sin(px * 0.08) * 3); x.stroke(); }   // where one wrap lies over the last
}, [2, 1]);
const torn = canvas(64, 64, (x, w, h) => { x.fillStyle = '#fff'; x.beginPath(); x.moveTo(0, 0); x.lineTo(w, 0); for (let px = w; px >= 0; px -= 4) x.lineTo(px, h - 8 - Math.random() * 12); x.fill(); });   // a torn end
const tape = new THREE.MeshStandardMaterial({ map: weave, bumpMap: weave, bumpScale: 3, roughness: 0.38, metalness: 0.55, envMapIntensity: 1.6, side: THREE.DoubleSide });
function wad() {   // the fist under it all, a lumpy ball crumpled by the wraps
  const g = new THREE.SphereGeometry(1, 40, 28), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), d = 1 + 0.07 * Math.sin(9 * x + 1) * Math.sin(7 * y + 2) * Math.sin(8 * z) + 0.035 * Math.sin(17 * x + 13 * y + 5 * z);
    p.setXYZ(i, x * d * 0.052, y * d * 0.062, z * d * 0.056);
  }
  g.computeVertexNormals();
  return new THREE.Mesh(g, tape);
}

export function fortyhands({ scene, camera, renderer, fridge, door, phone }) {
  if (!camera.parent) scene.add(camera);   // the hands ride on the camera
  const sleeve = new THREE.MeshStandardMaterial({ color: '#2b2f3a', roughness: 0.9 });
  const hands = [-1, 1].map(side => {   // a fist taped round the bottle's base, wraps over wraps, a loose end, and the sleeve going off the bottom of the view
    const hand = new THREE.Group(), bottle = forty();
    bottle.position.y = -0.035; hand.add(bottle, wad());   // gripped at the base, under the label
    for (const [r, y, rx, rz] of [[0.058, -0.02, 0.1, -0.08], [0.06, 0.022, -0.14, 0.1], [0.064, 0, 0.5, 0.35 * side], [0.062, -0.01, -0.4, -0.45 * side], [0.047, 0.05, 0.06, 0.05]]) {   // two inches wide, over the fist and up onto the glass
      const band = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.048, 40, 1, true), tape); band.position.y = y; band.rotation.set(rx, 0, rz); hand.add(band);
    }
    const flap = new THREE.Mesh(new THREE.PlaneGeometry(0.048, 0.04), new THREE.MeshStandardMaterial({ map: weave, alphaMap: torn, alphaTest: 0.5, roughness: 0.38, metalness: 0.55, envMapIntensity: 1.6, side: THREE.DoubleSide }));
    flap.position.set(0.064 * -side, -0.05, 0.012); flap.rotation.set(0.35, Math.PI / 2 - 0.4 * side, 0.25); hand.add(flap);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.4, 16), sleeve); arm.position.set(0.04 * side, -0.12, 0.2); arm.rotation.x = 1.1; hand.add(arm);
    hand.visible = false; camera.add(hand);
    return { side, hand, bottle, cap: bottle.userData.cap, k: 0, held: 0, left: 1, down: false, capped: true, pop: 0 };
  });
  let on = false, t0 = 0, last = 0, bladder = 0, choke = 0, fall = 0, ui = null, keys = null, knock = -1;
  const flying = [];   // caps in the air, and on the rug once they land

  const pose = h => {   // between resting low and tipped up at your mouth; the right hand is the left one in a mirror
    const e = h.k * h.k * (3 - 2 * h.k), s = h.side, p = [0, 1, 2].map(i => REST[0][i] + (LIFT[0][i] - REST[0][i]) * e), r = [0, 1, 2].map(i => REST[1][i] + (LIFT[1][i] - REST[1][i]) * e);
    h.hand.position.set(p[0] * -s, p[1], p[2]); h.hand.rotation.set(r[0], r[1] * -s, r[2] * -s);
  };
  function pop(h) {   // flicked off with your teeth: up, away, and spinning, out of the view and onto the floor
    h.capped = false; h.pop = 0.35;
    scene.attach(h.cap);
    const v = new THREE.Vector3(0.5 * h.side, 1.7, -0.6).applyQuaternion(camera.quaternion);
    flying.push({ cap: h.cap, v, spin: new THREE.Vector3().randomDirection(), rate: 16 + Math.random() * 8 });
  }
  const press = (side, down) => { const h = hands[side < 0 ? 0 : 1]; if (h.down !== down) { h.down = down; if (!down) h.held = 0; } };
  const key = e => {
    if (!on) return;
    const side = { a: -1, A: -1, ArrowLeft: -1, d: 1, D: 1, ArrowRight: 1 }[e.key];
    if (e.key === 'Escape') return void end('');
    if (side) { e.preventDefault(); e.stopPropagation(); press(side, e.type === 'keydown'); }
  };
  const touch = e => { if (on) press(e.clientX < innerWidth / 2 ? -1 : 1, e.type === 'pointerdown'); };
  addEventListener('keydown', key, true); addEventListener('keyup', key, true);
  addEventListener('pointerdown', touch); addEventListener('pointerup', touch); addEventListener('pointercancel', touch);

  function start() {
    if (!document.getElementById('fhcss')) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap"><style id="fhcss">${CSS}</style>`);
    ui = Object.assign(document.createElement('div'), { className: 'fh' });
    ui.innerHTML = `<div class="lcd bladder">BLADDER<i></i></div><div class="lcd ra">RA<b></b></div><div class="lcd key l">${phone ? 'HOLD' : '◀ A'}</div><div class="lcd key r">${phone ? 'HOLD' : 'D ▶'}</div><div class="lcd end"></div>`;
    document.body.append(ui);
    fridge.forties.forEach(f => { f.visible = false; });
    for (const h of hands) {
      Object.assign(h, { k: 0, held: 0, left: 1, down: false, capped: true, pop: 0 }); h.bottle.userData.level.value = 1; h.hand.visible = true; pose(h);
      h.bottle.add(h.cap); h.cap.position.set(0, 0, 0); h.cap.rotation.set(0, 0, 0);   // back on, from wherever it landed last time
    }
    flying.length = 0; bladder = 0; choke = 0; fall = 0; knock = -1; on = true; t0 = last = performance.now() / 1000;
    keys = setTimeout(() => ui?.querySelectorAll('.key').forEach(k => { k.style.opacity = 0; }), 5000);
  }
  function end(how) {   // won, seal, ra, or '' when you give up
    on = false; clearTimeout(keys);
    const banner = ui.querySelector('.end');
    banner.textContent = { won: 'EDWARD FORTYHANDS', seal: 'YOU BROKE THE SEAL', ra: 'WRITTEN UP' }[how] ?? ''; banner.style.opacity = how ? 1 : 0;
    for (const h of hands) h.down = false;
    if (how === 'ra') knock = 0;   // the door opens on you
    if (how === 'won') {   // the empties on the rug by the bed
      for (const [x, z, yaw] of [[0.42, -0.55, 0.4], [0.6, -0.25, 2.2]]) { const b = forty(0); b.remove(b.userData.cap); b.position.set(x, 0.042, z); b.rotation.set(0, yaw, Math.PI / 2); scene.add(b); }
      renderer.shadowMap.needsUpdate = true;
    } else fridge.forties.forEach(f => { f.visible = true; });   // back in the fridge, for another go
    setTimeout(() => { ui.remove(); ui = null; for (const h of hands) h.hand.visible = false; renderer.domElement.style.filter = ''; door.rotation.y = 0; }, how ? 3200 : 600);
  }

  return {
    get on() { return on; },
    start,
    tick() {   // after the camera has looked where it looks: the hands, the caps, the drinking, the bladder, the clock, and the sway
      if (!ui) return;
      const now = performance.now() / 1000, dt = Math.min(0.05, now - last), t = now - t0; last = now;
      const drunk = 1 - (hands[0].left + hands[1].left) / 2;
      if (!on) fall += dt;
      for (const h of hands) {
        const other = hands[h.side < 0 ? 1 : 0];   // one mouth: a bottle comes up only once the other is on its way down
        h.k = Math.min(1, Math.max(0, h.k + (on && h.down && choke <= 0 && h.left > 0 && other.k < 0.3 ? dt : -dt) / 0.25));
        if (on && h.k > 0.8 && h.down && h.capped) pop(h);
        h.pop -= dt;
        if (on && h.k > 0.8 && h.down && h.left > 0 && h.pop <= 0) {
          h.held += dt; h.left = Math.max(0, h.left - DRINK * dt);
          if (h.held > SIP) { choke = CHOKE; h.held = 0; h.left = Math.max(0, h.left - 0.04); }   // too much at once: you choke, and some goes down your shirt
        }
        h.bottle.userData.level.value = h.left;
        pose(h); h.hand.position.y -= fall * fall * 1.5;   // and when it's over, down out of the view
      }
      for (const f of flying) {
        if (!f.v) continue;
        f.v.y -= 9.8 * dt; f.cap.position.addScaledVector(f.v, dt); f.cap.rotateOnWorldAxis(f.spin, f.rate * dt);
        if (f.cap.position.y < 0.012) { f.cap.position.y = 0.012; f.v = null; renderer.shadowMap.needsUpdate = true; }   // on the rug
      }
      if (on) {
        choke -= dt; bladder += dt * (0.012 + 0.035 * drunk);   // full in about 34 s at a steady pace: alternating sips take about 24
        const ra = Math.max(0, RA - t), clock = ui.querySelector('.ra');
        ui.querySelector('.bladder i').style.setProperty('--p', `${Math.min(100, bladder * 100)}%`);
        clock.querySelector('b').textContent = `0:${String(Math.ceil(ra)).padStart(2, '0')}`; clock.classList.toggle('soon', ra < 10);
        if (!hands[0].left && !hands[1].left) end('won'); else if (bladder >= 1) end('seal'); else if (!ra) end('ra');
      }
      if (knock >= 0) { knock += dt; door.rotation.y = -0.9 * Math.min(1, knock / 0.5) ** 2; }   // the RA, in the doorway
      const amp = 0.012 + 0.085 * drunk, cough = Math.max(0, choke) * 0.08;   // the room sways, and jolts when you cough
      camera.rotateZ(Math.sin(t * 0.9) * amp + Math.sin(t * 40) * cough); camera.rotateY(Math.sin(t * 0.55 + 1) * amp * 0.6); camera.rotateX(Math.sin(t * 1.3) * amp * 0.35 + Math.sin(t * 33) * cough);
      camera.updateMatrixWorld();
      renderer.domElement.style.filter = `blur(${(drunk * 2.2).toFixed(2)}px)`;
    },
  };
}
