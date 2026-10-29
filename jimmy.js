// OFF ROAD: Dave's dad's GMC Jimmy in the hayfields behind the house, drawn like a 2002 Flash cartoon: flat colours and fat black
// outlines. Gas and brake, and in the air gas tips the nose up and brake tips it down. Catch air on the divots, clear the round bales, get
// to Beaver Brook at the far end of the field, and don't roll it.
import { SHEET } from './desktop.js';

const G = 13, M = 1, I = 2.1, K = 46, C = 5.5, REST = 0.62, R = 0.46, DRIVE = 15, AIR = 7, END = 520;   // metres, seconds, a car of mass 1
const MOUNTS = [[-1.42, -0.32], [1.42, -0.32]];   // rear and front wheels, in the car's frame
const HULL = [[-2.25, -0.32], [2.25, -0.32], [2.3, 0.5], [1.25, 0.62], [0.55, 1.42], [-2.1, 1.42], [-2.3, 0.5]];   // the body's outline; 4 and 5 are the roof
const rand = (a => () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })(1997);

// the field: rolling ground, divots and humps every so often, round bales on it, the brook at the end
const BUMPS = [], BALES = [];
for (let x = 32; x < END - 30; x += 14 + rand() * 16) {
  if (x > 425 && x < 485) continue;   // room for the big one
  const big = rand() < 0.3, h = big ? 1.4 + rand() * 0.8 : rand() < 0.4 ? -0.45 : 0.5 + rand() * 0.5;   // a ramp, a divot, or a hump
  BUMPS.push([x, h, big ? 5 + rand() * 2 : 2.2 + rand() * 2]);
  if (big && rand() < 0.75) { const n = 1 + (rand() < 0.4), bx = x + 9 + rand() * 4; for (let i = 0; i < n; i++) BALES.push(bx + i * 1.55); }
}
BUMPS.push([452, 2.8, 4.2]); BALES.push(466, 467.55, 469.1);   // the big one, at the end: three bales under it, and air enough to flip it
const field = x => {
  const flat = Math.min(1, Math.max(0, (x - 8) / 20));
  let y = flat * (0.9 * Math.sin(x / 41) + 0.5 * Math.sin(x / 17 + 1.3));
  for (const [bx, h, w] of BUMPS) y += h * Math.exp(-(((x - bx) / w) ** 2));
  if (x > END - 8) y -= 1.1 * Math.exp(-(((x - END) / 3) ** 2));   // the brook's bank
  return y;
};
const baleY = BALES.map(x => field(x) + 0.68);
const slope = x => (field(x + 0.08) - field(x - 0.08)) / 0.16;
const coarse = matchMedia('(pointer: coarse)'), press = () => (coarse.matches ? 'TAP' : 'PRESS ANY KEY');

export function jimmy({ audio, exit }) {
  let cv, cx, raf = 0, keys = {}, car, mode, cam, best = 0, said = [], dust = [], snd = null, last = 0, ended = 0, top = null, mine = null, sign = null, quip = null, puff = 0;
  try { best = +localStorage.getItem('jimmyBest') || 0; } catch {}
  const S = () => Math.min(cv.width, cv.height * 1.6) / 22;   // pixels in a metre
  function reset() {
    car = { x: 7, y: field(7) + 1.1, a: 0, a0: 0, vx: 0, vy: 0, w: 0, spin: 0, air: 0, bigAir: 0, airs: 0, flips: 0, bales: 0, cleared: new Set(), burst: new Set(), t: 0, comp: [0, 0], ground: [false, false] };
    cam = { x: car.x - 4, y: car.y }; dust = []; said = [];
  }
  const say = (text, big = false) => said.push({ text, at: performance.now(), big });
  const chat = lines => { quip = { text: pick(lines), at: performance.now() }; };   // the one riding along says something

  // ---- the physics: a rigid body on two spring-and-damper wheels, a few substeps a frame
  function step(h, gas, brake) {
    const c = Math.cos(car.a), s = Math.sin(car.a);
    let fx = 0, fy = -G * M, tq = 0, on = 0;
    MOUNTS.forEach(([mx, my], i) => {
      const px = car.x + mx * c - my * s, py = car.y + mx * s + my * c, dx = s, dy = -c;   // the mount, and the car's down
      let t = REST;
      for (let k = 0; k < 3; k++) t = (field(px + dx * t) + R - py) / dy;   // how far down the wheel reaches the ground
      car.ground[i] = t < REST && t > -0.25 && dy < -0.3;
      car.comp[i] = car.ground[i] ? REST - Math.max(0.15, t) : 0;
      if (!car.ground[i]) return;
      on++;
      const rx = px - car.x, ry = py - car.y, vpx = car.vx - car.w * ry, vpy = car.vy + car.w * rx, into = vpx * dx + vpy * dy;
      const f = Math.max(0, K * (REST - Math.max(0.15, t)) + C * into + (t < 0.15 ? 400 * (0.15 - t) : 0));
      fx -= f * dx; fy -= f * dy; tq += rx * (-f * dy) - ry * (-f * dx);
      const wx = px + dx * t, sl = slope(wx), n = Math.hypot(1, sl), tx = 1 / n, ty = sl / n, along = car.vx * tx + car.vy * ty;
      let push = gas ? DRIVE : brake ? (along > 0.5 ? -DRIVE * 1.6 : -DRIVE * 0.6) : -1.2 * along;   // gas, brake then reverse, or roll to a stop
      push -= 0.6 * along;
      const ax = wx - car.x, ay = py + dy * t - car.y;
      fx += push * tx / 2; fy += push * ty / 2; tq += (ax * push * ty - ay * push * tx) / 2;
    });
    if (!on) tq += (gas ? AIR : 0) - (brake ? AIR : 0);   // leaning, in the air
    car.vx += fx / M * h; car.vy += fy / M * h; car.w += tq / I * h; car.w *= 1 - 0.8 * h;
    car.x += car.vx * h; car.y += car.vy * h; car.a += car.w * h;
    car.spin += (car.vx * Math.cos(car.a) + car.vy * Math.sin(car.a)) / R * h;
    // the body against the ground: pushed back out along the ground's normal, and the roof touching means it rolled
    const c2 = Math.cos(car.a), s2 = Math.sin(car.a);
    HULL.forEach(([hx, hy], i) => {
      const qx = car.x + hx * c2 - hy * s2, qy = car.y + hx * s2 + hy * c2, gy = field(qx);
      if (qy >= gy) return;
      const sl = slope(qx), n = Math.hypot(1, sl), nx = -sl / n, ny = 1 / n, rx = qx - car.x, ry = qy - car.y;
      const vn = (car.vx - car.w * ry) * nx + (car.vy + car.w * rx) * ny, rn = rx * ny - ry * nx;
      if (vn < 0) { const j = -1.3 * vn / (1 / M + rn * rn / I); car.vx += j * nx / M; car.vy += j * ny / M; car.w += rn * j / I; }
      const d = (gy - qy) * ny; car.x += nx * d; car.y += ny * d;
      if ((i === 4 || i === 5) && mode === 'drive') crash();
    });
    return on;
  }
  function crash() { mode = 'rolled'; ended = performance.now(); quip = null; noise(0.5, 900); say(pick(["YOU ROLLED DAVE'S DAD'S JIMMY.", 'OH, THE JIMMY.', 'THAT IS NOT HOW YOU JIMMY.']), true); }
  const pick = a => a[Math.floor(Math.random() * a.length)];

  // ---- the sound, if SOUND ON has started it: an engine that climbs with the speed, a thump on landing, a crunch for a roll
  function engine(rate, gas) {
    const ac = audio();
    if (!ac || ac.state !== 'running') return;
    if (!snd) {
      const o = ac.createOscillator(), f = ac.createBiquadFilter(), g = ac.createGain();
      o.type = 'sawtooth'; f.type = 'lowpass'; f.frequency.value = 500; g.gain.value = 0;
      o.connect(f).connect(g).connect(ac.destination); o.start(); snd = { o, g, ac };
    }
    snd.o.frequency.setTargetAtTime(38 + rate * 5 + (gas ? 18 : 0), ac.currentTime, 0.08);
    snd.g.gain.setTargetAtTime(mode === 'drive' ? 0.05 + (gas ? 0.03 : 0) : 0, ac.currentTime, 0.1);
  }
  function honk() {   // two flat notes, like the horn of an old GM truck
    say('BEEP BEEP!');
    const ac = audio();
    if (!ac || ac.state !== 'running') return;
    const g = ac.createGain(); g.gain.setValueAtTime(0.06, ac.currentTime); g.gain.setTargetAtTime(0, ac.currentTime + 0.32, 0.03); g.connect(ac.destination);
    for (const f of [392, 494]) { const o = ac.createOscillator(); o.type = 'square'; o.frequency.value = f; o.connect(g); o.start(); o.stop(ac.currentTime + 0.45); }
  }
  function noise(len, freq) {
    const ac = audio();
    if (!ac || ac.state !== 'running') return;
    const b = ac.createBuffer(1, ac.sampleRate * len, ac.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 2;
    const n = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    n.buffer = b; f.type = 'lowpass'; f.frequency.value = freq; g.gain.value = 0.5; n.connect(f).connect(g).connect(ac.destination); n.start();
  }

  // ---- the drawing: everything in metres, y up, onto a canvas with y down
  let X0 = 0, Y0 = 0, s = 1;
  const P = (x, y) => [X0 + x * s, Y0 - y * s];
  const ink = (lw = 3) => { cx.lineWidth = lw * s / 40; cx.strokeStyle = '#141414'; cx.lineJoin = cx.lineCap = 'round'; };
  function shape(pts, fill, lw = 3, close = true) {
    cx.beginPath(); pts.forEach(([x, y], i) => cx[i ? 'lineTo' : 'moveTo'](...P(x, y))); if (close) cx.closePath();
    if (fill) { cx.fillStyle = fill; cx.fill(); } ink(lw); cx.stroke();
  }
  function blob(x, y, r, fill, lw = 3) { cx.beginPath(); cx.arc(...P(x, y), r * s, 0, 7); cx.fillStyle = fill; cx.fill(); ink(lw); cx.stroke(); }
  function text(str, x, y, size, fill = '#ffe23a', rot = 0, align = 'center') {   // marker letters, filled, with a fat black edge
    cx.save(); cx.translate(x, y); cx.rotate(rot); cx.font = `${size}px "Permanent Marker", "Comic Sans MS", cursive`; cx.textAlign = align;
    cx.lineWidth = size / 6; cx.strokeStyle = '#141414'; cx.lineJoin = 'round'; cx.strokeText(str, 0, 0); cx.fillStyle = fill; cx.fillText(str, 0, 0); cx.restore();
  }
  // a layer k as fast as the field: the sky's clouds hardly move, the far hill a quarter, the trees half
  const L = (k, u, v) => [cv.width * 0.38 + (u - cam.x * k) * s, cv.height * 0.6 - (v - cam.y * k) * s];
  const hill = u => 3.4 + 1.6 * Math.sin(u / 31) + 0.8 * Math.sin(u / 11.5);
  function scenery(t) {
    const w = cv.width, h = cv.height, sky = cx.createLinearGradient(0, 0, 0, h), u0 = k => cam.x * k - w * 0.38 / s - 3, u1 = k => cam.x * k + w * 0.62 / s + 3;
    sky.addColorStop(0, '#4fb8ff'); sky.addColorStop(0.7, '#c9efff'); cx.fillStyle = sky; cx.fillRect(0, 0, w, h);
    for (let i = 0; i < 7; i++) {   // clouds, drifting along on their own
      const u = ((i * 13 + t * 0.5 - cam.x * 0.05) % 90 + 90) % 90 - 30 + cam.x * 0.05, v = 9 + (i % 3) * 1.6;
      cx.beginPath(); for (const [ox, oy, r] of [[0, 0, 1.1], [1.2, 0.35, 1.35], [2.5, 0, 1]]) cx.arc(...L(0.05, u + ox, v + oy), r * s, 0, 7);
      cx.fillStyle = '#fff'; cx.fill(); ink(2.5); cx.stroke();
    }
    cx.beginPath(); cx.moveTo(0, h);   // the wooded hill across the field, in October
    for (let u = u0(0.25); u <= u1(0.25); u += 0.5) cx.lineTo(...L(0.25, u, hill(u)));
    cx.lineTo(w, h); cx.closePath(); cx.fillStyle = '#c8823a'; cx.fill(); ink(3); cx.stroke();
    for (let u = Math.floor(u0(0.25) / 1.7) * 1.7; u < u1(0.25); u += 1.7) {   // the tree tops along it
      const r = 0.8 + 0.4 * Math.sin(u * 3.1);
      cx.beginPath(); cx.arc(...L(0.25, u, hill(u) - 0.2), r * s, Math.PI, 0); cx.fillStyle = ['#d24f1f', '#e8a321', '#7d9a2c', '#b8361c'][Math.abs(Math.round(u / 1.7)) % 4]; cx.fill(); ink(2); cx.stroke();
    }
    for (let u = Math.floor(u0(0.5) / 2.6) * 2.6; u < u1(0.5); u += 2.6) {   // the hedgerow at the far edge of the field
      cx.beginPath(); cx.arc(...L(0.5, u, 1.4 + 0.4 * Math.sin(u)), (1.3 + 0.3 * Math.sin(u * 2.3)) * s, 0, 7); cx.fillStyle = ['#3f7d28', '#5e9131', '#a86c1f'][Math.abs(Math.round(u / 2.6)) % 3]; cx.fill(); ink(2.5); cx.stroke();
    }
  }
  function house() {   // the white house the field starts behind, and somebody still sat out on the porch roof
    shape([[-10, 0], [-1, 0], [-1, 6.2], [-10, 6.2]], '#f6f3ea');
    shape([[-10.8, 6.1], [-5.5, 9.2], [-0.2, 6.1]], '#8f949b');
    shape([[-1, 3.1], [1.6, 2.2], [1.6, 1.9], [-1, 2.6]], '#5f646b');
    for (const [x, y] of [[-8.6, 1.2], [-5.6, 1.2], [-8.6, 4.2], [-5.6, 4.2], [-3, 4.2]]) shape([[x, y], [x + 1.5, y], [x + 1.5, y + 1.6], [x, y + 1.6]], '#8fd4ff');
    const wave = 1.1 + 0.45 * Math.sin(performance.now() / 120);   // waving you off
    shape([[0.4, 2.62], [0.4 + 0.45 * Math.cos(wave), 2.62 + 0.45 * Math.sin(wave)]], null, 4, false);
    blob(0.2, 3.0, 0.28, '#f1c27d', 2); shape([[-0.05, 2.7], [0.45, 2.7], [0.45, 2.3], [-0.05, 2.3]], '#2f63c9', 2);
  }
  function fieldShape() {
    const x0 = -X0 / s - 2, x1 = (cv.width - X0) / s + 2;
    cx.beginPath();
    for (let x = x0; x <= x1; x += 0.25) cx.lineTo(...P(x, field(x)));
    cx.lineTo(...P(x1, -40)); cx.lineTo(...P(x0, -40)); cx.closePath();
    cx.fillStyle = '#86c540'; cx.fill();
    cx.save(); cx.clip();
    for (let x = Math.floor(x0 / 4) * 4; x < x1; x += 4) { cx.fillStyle = Math.round(x / 4) % 2 ? '#78b737' : '#93d04a'; cx.beginPath(); cx.moveTo(...P(x, field(x) + 1)); cx.lineTo(...P(x + 4, field(x + 4) + 1)); cx.lineTo(...P(x + 6, -40)); cx.lineTo(...P(x + 2, -40)); cx.fill(); }   // the mower's stripes
    cx.restore();
    cx.beginPath(); for (let x = x0; x <= x1; x += 0.25) cx.lineTo(...P(x, field(x))); ink(4); cx.stroke();
    for (let x = Math.ceil(x0 / 1.7) * 1.7; x < x1; x += 1.7) { const y = field(x); cx.beginPath(); cx.moveTo(...P(x - 0.15, y)); cx.lineTo(...P(x, y + 0.3)); cx.lineTo(...P(x + 0.12, y)); ink(2); cx.stroke(); }   // tufts
    // Beaver Brook, and its sign
    if (x1 > END - 10) {
      shape([[END - 3, field(END - 3) - 0.1], [END + 3, field(END + 3) - 0.1], [END + 3, field(END) + 0.15], [END - 3, field(END) + 0.15]], '#3f9df0', 3);
      shape([[END - 6.05, field(END - 6)], [END - 5.85, field(END - 6)], [END - 5.85, field(END - 6) + 2.2], [END - 6.05, field(END - 6) + 2.2]], '#8a5a2b', 2);
      shape([[END - 7.6, field(END - 6) + 1.6], [END - 4.3, field(END - 6) + 1.6], [END - 4.3, field(END - 6) + 2.5], [END - 7.6, field(END - 6) + 2.5]], '#c8955a', 2.5);
      const [tx, ty] = P(END - 5.95, field(END - 6) + 1.9); text('BEAVER BROOK', tx, ty, 0.42 * s, '#fff2c9');
    }
    BALES.forEach((bx, i) => {   // round bales on their sides, the spiral of the roll showing
      if (bx < x0 - 1 || bx > x1 + 1) return;
      if (car.burst.has(i)) return void shape([...Array(9)].map((_, k) => [bx - 1.3 + k * 0.325, field(bx - 1.3 + k * 0.325) + (k % 2 ? 0.28 : 0.12) * Math.sin(k * Math.PI / 8)]), '#e2bd5c', 2.5);   // what's left of it
      blob(bx, baleY[i], 0.75, '#e2bd5c', 3.5);
      cx.beginPath(); for (let k = 0; k < 40; k++) { const a = k * 0.45, r = 0.68 - k * 0.016; cx.lineTo(...P(bx + r * Math.cos(a), baleY[i] + r * Math.sin(a))); } ink(1.8); cx.stroke();
    });
  }
  function truck() {   // the Jimmy: maroon over silver, a roof rack, the spare on the back, two heads in the windows, big knobby tyres
    const c = Math.cos(car.a), sn = Math.sin(car.a), at = ([x, y]) => [car.x + x * c - y * sn, car.y + x * sn + y * c];
    MOUNTS.forEach(([mx, my], i) => {
      const [wx, wy] = at([mx, my - REST + car.comp[i]]);
      blob(wx, wy, R, '#1d1d1f', 3);
      for (let k = 0; k < 10; k++) { const a = car.spin * -1 + k * Math.PI / 5; blob(wx + Math.cos(a) * R, wy + Math.sin(a) * R, 0.07, '#1d1d1f', 1.5); }   // the knobs
      blob(wx, wy, 0.2, '#c8ccd1', 2.5);
      for (let k = 0; k < 5; k++) { const a = -car.spin + k * 1.2566; cx.beginPath(); cx.moveTo(...P(wx, wy)); cx.lineTo(...P(wx + Math.cos(a) * 0.17, wy + Math.sin(a) * 0.17)); ink(1.5); cx.stroke(); }
    });
    shape([[-2.3, 0.15], [-2.62, 0.15], [-2.62, 1.0], [-2.3, 1.0]].map(at), '#1d1d1f', 2.5);   // the spare
    shape(HULL.map(at), '#8e1f2b', 3.5);
    shape([[-2.25, -0.32], [2.25, -0.32], [2.28, 0.15], [-2.28, 0.15]].map(at), '#b7bcc2', 2.5);   // the silver lower half
    shape([[0.35, 0.68], [1.1, 0.68], [0.5, 1.3], [0.05, 1.3]].map(at), '#a8e1ff', 2.5);   // the windscreen side window
    shape([[-1.95, 0.68], [-0.15, 0.68], [-0.15, 1.3], [-1.95, 1.3]].map(at), '#a8e1ff', 2.5);
    const bob = Math.max(-0.08, Math.min(0.13, -car.vy * 0.03));   // falling, the heads float up off the seats
    for (const [hx, cap] of [[0.45, '#2f63c9'], [-0.9, '#d63c2b']]) {   // you driving, a friend riding along, caps on
      const [px, py] = at([hx, 1.0 + bob]); blob(px, py, 0.26, '#f1c27d', 2.5);
      shape([[hx - 0.27, 1.12], [hx + 0.27, 1.12], [hx + 0.42, 1.08], [hx + 0.27, 1.27], [hx - 0.27, 1.27]].map(([x, y]) => at([x, y + bob])), cap, 2);
    }
    shape([[-1.9, 1.42], [0.35, 1.42], [0.35, 1.58], [-1.9, 1.58]].map(at), null, 2.5, false);   // the roof rack
    blob(...at([2.18, 0.32]), 0.11, '#fff36b', 2); blob(...at([-2.22, 0.32]), 0.09, '#ff3b2f', 2);
    if (quip && performance.now() - quip.at < 2400) {   // a speech bubble up over the roof
      const [qx, qy] = P(...at([-0.9, 2.6])), size = s * 0.42;
      cx.font = `${size}px "Permanent Marker", "Comic Sans MS", cursive`;
      const bw = cx.measureText(quip.text).width + size * 1.2, bh = size * 1.7;
      cx.beginPath(); cx.roundRect(qx - bw / 2, qy - bh / 2, bw, bh, bh / 2); cx.moveTo(qx - size * 0.3, qy + bh / 2 - 1); cx.lineTo(qx - size * 0.1, qy + bh / 2 + size * 0.8); cx.lineTo(qx + size * 0.4, qy + bh / 2 - 1);
      cx.fillStyle = '#fff'; cx.fill(); ink(2.5); cx.stroke();
      cx.fillStyle = '#141414'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(quip.text, qx, qy); cx.textBaseline = 'alphabetic';
    }
  }
  function pedals(gas, brake) {   // on a touch screen, the two halves of the screen, labelled
    const w = cv.width, h = cv.height, r = Math.min(w, h) * 0.09;
    for (const [x, label, on, col] of [[r * 1.6, 'BRAKE', brake, '#ff5a3c'], [w - r * 1.6, 'GAS', gas, '#7ad23f']]) {
      cx.beginPath(); cx.roundRect(x - r, h - r * 2.7, r * 2, r * 2.3, r * 0.35); cx.fillStyle = on ? col : 'rgba(255,255,255,0.55)'; cx.fill(); cx.lineWidth = r / 12; cx.strokeStyle = '#141414'; cx.stroke();
      text(label, x, h - r * 1.4, r * 0.5, on ? '#ffffff' : col);
    }
  }
  function hud() {
    const w = cv.width, sz = Math.max(16, w / 55), y = sz + 56 * devicePixelRatio;   // under the page's SOUND and BACK buttons
    text(`${Math.max(0, Math.round(car.x - 7))} m`, sz * 3, y, sz);
    text(`BALES CLEARED: ${car.bales}`, w / 2, y, sz);
    text(`BEST AIR: ${car.bigAir.toFixed(1)} s`, w - sz * 5.5, y, sz);
    said = said.filter(m => (m.t = (performance.now() - m.at) / 1000) < (m.big ? 99 : 1.8));
    said.filter(m => !m.big).forEach((m, i) => text(m.text, w / 2, cv.height * 0.24 + i * sz * 1.4 - m.t * 30, sz * 1.4, '#ffe23a', -0.04));
  }
  function shout() {   // the big news, on a comic-book burst, over the card
    const m = said.find(m => m.big);
    if (!m) return;
    const w = cv.width, x = mode === 'won' ? w * 0.31 : w / 2, y = cv.height * 0.3, size = Math.max(16, w / 55) * 2 * (1 + 0.05 * Math.sin(m.t * 9) * Math.exp(-m.t));
    cx.font = `${size}px "Permanent Marker", "Comic Sans MS", cursive`;
    const rx = cx.measureText(m.text).width * 0.62, ry = size * 1.5;
    cx.beginPath(); for (let k = 0; k < 28; k++) { const a = k * Math.PI / 14, r = k % 2 ? 0.82 : 1.08; cx.lineTo(x + Math.cos(a) * rx * r, y - size * 0.35 + Math.sin(a) * ry * r); }
    cx.closePath(); cx.fillStyle = '#ffe23a'; cx.fill(); cx.lineWidth = size / 7; cx.strokeStyle = '#141414'; cx.stroke();
    text(m.text, x, y, size, '#ff5a3c', -0.04);
  }
  function card(lines, sub, x = cv.width / 2) {   // a title or an ending, over everything
    const w = cv.width, h = cv.height, sz = Math.max(18, w / (x === w / 2 ? 32 : 44));
    cx.fillStyle = 'rgba(0,0,0,0.35)'; cx.fillRect(0, 0, w, h);
    const t = performance.now() / 1000;   // the title rocks a little, like it's on a spring
    lines.forEach(([str, col], i) => text(str, x, h * 0.3 + i * sz * 1.5, sz * (i ? 0.75 : 1.4 + 0.04 * Math.sin(t * 5)), col, i ? 0 : -0.05 + 0.03 * Math.sin(t * 2.5)));
    if (sub) text(sub, w / 2, h * 0.9, sz * 0.7, '#ffffff');
  }
  function board() {   // the top ten, painted on a sheet of plywood off to the right
    const w = cv.width, h = cv.height, bw = w * 0.34, sz = bw / 15, bh = sz * 15.5;
    cx.save(); cx.translate(w * 0.63, h * 0.1); cx.rotate(0.025);
    cx.beginPath(); cx.roundRect(0, 0, bw, bh, sz * 0.4); cx.fillStyle = '#d9a866'; cx.fill(); cx.lineWidth = sz / 4; cx.strokeStyle = '#141414'; cx.stroke();
    for (const [x, y] of [[0.5, 0.5], [bw / sz - 0.5, 0.5], [0.5, bh / sz - 0.5], [bw / sz - 0.5, bh / sz - 0.5]]) { cx.beginPath(); cx.arc(x * sz, y * sz, sz * 0.14, 0, 7); cx.fillStyle = '#555'; cx.fill(); }   // the nails
    text('TOP JIMMIERS', bw / 2, sz * 1.9, sz * 1.4, '#ff5a3c');
    const rows = Array.isArray(top) ? top : [];
    rows.forEach((r, i) => {   // a visitor's name only ever goes in as text on the canvas
      const y = sz * (3.6 + i * 1.15), me = mine && r.name === mine.name && r.score === mine.score, col = me ? '#ffe23a' : '#ffffff';
      text(`${i + 1}.`, sz * 1.9, y, sz * 0.85, col, 0, 'right'); text(String(r.name), sz * 2.3, y, sz * 0.85, col, 0, 'left');
      text(Number(r.score).toLocaleString('en-US'), bw - sz * 0.9, y, sz * 0.85, col, 0, 'right');
    });
    if (!rows.length) text(top === null ? 'Loading...' : top ? 'Nobody yet. Be the first.' : "Can't reach the scores.", bw / 2, sz * 4.5, sz * 0.8, '#ffffff');
    cx.restore();
  }
  // the scores, kept in the Google Sheet with the away messages and Snood's (tools/visitors.gs)
  const load = () => fetch(`${SHEET}?jimmy=1`).then(r => r.json()).then(l => { top = Array.isArray(l) ? l.filter(r => r.score) : false; }, () => { top = false; });
  function ask() {   // made the top ten: a name for the plywood
    sign = Object.assign(document.createElement('form'), { innerHTML: '<label>YOU MADE THE TOP 10! YOUR NAME:</label><input maxlength="16" autocomplete="off" data-1p-ignore data-lpignore="true"><button>SIGN IT</button><p></p>' });
    sign.style.cssText = 'position:fixed;left:31%;top:68%;transform:translate(-50%,0) rotate(-2deg);z-index:11;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:min(440px,56vw);font:20px "Permanent Marker",cursive;color:#ffe23a;text-shadow:2px 2px #141414';
    for (const [el, css] of [['label', 'width:100%;text-align:center'], ['input', 'flex:1;min-width:0;font:inherit;color:#141414;text-shadow:none;background:#fff8d6;border:4px solid #141414;border-radius:10px;padding:4px 10px'], ['button', 'font:inherit;color:#141414;text-shadow:none;background:#ffe23a;border:4px solid #141414;border-radius:10px;padding:4px 14px;cursor:pointer'], ['p', 'width:100%;margin:0;text-align:center;color:#ff8a6b;font-size:15px']]) sign.querySelector(el).style.cssText = css;
    const box = sign.querySelector('input');
    try { box.value = localStorage.getItem('aim-screen-name') || ''; } catch {}
    sign.onsubmit = async e => {
      e.preventDefault();
      const score = car.score, r = await fetch(SHEET, { method: 'POST', body: JSON.stringify({ name: box.value, jimmy: score, bales: car.bales }) }).then(x => x.json()).catch(() => null);   // plain text, so no CORS preflight
      if (!r || r.error) return void (sign.querySelector('p').textContent = r?.error || "Can't reach the scores right now. Try again later.");
      try { localStorage.setItem('aim-screen-name', r.name); } catch {}
      mine = { name: r.name, score }; sign.remove(); sign = null; ended = performance.now(); load();
    };
    document.body.append(sign); box.focus();
  }

  // ---- the loop
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    const driving = mode === 'drive', gas = driving && (keys.ArrowRight || keys.d || keys.D || keys.ArrowUp || keys.w || keys.touchGas), brake = driving && (keys.ArrowLeft || keys.a || keys.A || keys.ArrowDown || keys.s || keys.touchBrake);
    let on = 0;   // after a roll or at the brook, the Jimmy goes on tumbling, or rolls to a stop, by itself
    for (let i = Math.round(dt * 240); i > 0; i--) on = step(1 / 240, gas, brake);
    if (driving) car.t += dt;
    if (!on) { if (!car.air) car.a0 = car.a; car.air += dt; }
    else {
      const flips = Math.abs(Math.round(car.a / (2 * Math.PI)) - Math.round(car.a0 / (2 * Math.PI)));   // round past upright, and down on its wheels
      if (flips && driving) { car.flips += flips; say(`${flips > 1 ? 'DOUBLE ' : ''}${car.a > car.a0 ? 'BACKFLIP' : 'FRONTFLIP'}! +${flips * 500}`); chat(['WHAT. WAS. THAT.', 'My dad can never know.']); }
      if (car.air > 0.6 && driving) {
        car.bigAir = Math.max(car.bigAir, car.air); car.airs += car.air;
        if (car.air > 1.3) chat(['DUUUDE.', 'We were FLYING.', 'My stomach!', 'Do that again.']);
        say(car.air > 1.6 ? `SICK AIR! ${car.air.toFixed(1)} s` : `AIR! ${car.air.toFixed(1)} s`); noise(0.25, 300);
        for (let k = 0; k < 8; k++) dust.push({ x: car.x + (Math.random() - 0.5) * 3, y: field(car.x) + 0.2, vx: (Math.random() - 0.5) * 3, vy: 1 + Math.random() * 2, t: 0 });
      }
      car.air = 0; car.a0 = car.a;
    }
    if (driving) {
      BALES.forEach((bx, i) => {   // over a bale is points; into one bursts it, and the hay slows you right down
        if (car.cleared.has(i) || car.burst.has(i)) return;
        const c = Math.cos(car.a), sn = Math.sin(car.a), dx = bx - car.x, dy = baleY[i] - car.y, lx = dx * c + dy * sn, ly = dy * c - dx * sn;
        if (Math.hypot(lx - Math.max(-2.3, Math.min(2.3, lx)), ly - Math.max(-1.4, Math.min(1.42, ly))) < 0.75) {
          car.burst.add(i); car.vx *= 0.45; noise(0.35, 1800); say(pick(['HAY EVERYWHERE!', 'THE FARMER SAW THAT.', 'BALE: DESTROYED']));
          chat(["That's somebody's hay.", 'Hay in my MOUTH.', 'Wipers! WIPERS!']);
          for (let k = 0; k < 24; k++) dust.push({ x: bx, y: baleY[i], vx: (Math.random() - 0.3) * 8, vy: 2 + Math.random() * 5, t: 0, hay: true, g: true });
        } else if (car.x > bx + 0.8) { car.cleared.add(i); car.bales++; say(pick(['CLEARED A BALE!', 'OVER THE BALE!', 'HAY!'])); }
      });
      if (Math.cos(car.a) < -0.2 && !car.ground[0] && !car.ground[1] && car.y - field(car.x) < 2.2 && Math.abs(car.vy) < 1) crash();   // stuck on its back
      if (car.y < -30) crash();
      if (car.x > END) {   // a flip is worth 500, a bale 250, a second of air 100, and every second under a minute and a half 20
        mode = 'won'; ended = now;
        car.score = car.flips * 500 + car.bales * 250 + Math.round(car.airs * 100) + Math.max(0, Math.round((90 - car.t) * 20));
        if (car.score > best) { best = car.score; try { localStorage.setItem('jimmyBest', best); } catch {} }
        say(`BEAVER BROOK! ${car.score} POINTS`, true); chat(['Hose it off before he gets home.', 'SPLOOSH.']); noise(0.6, 700);
        for (let k = 0; k < 30; k++) dust.push({ x: car.x + Math.random() * 2, y: field(car.x) + 0.3, vx: car.vx * 0.3 + (Math.random() - 0.5) * 6, vy: 3 + Math.random() * 5, t: 0, g: true, r: 0.14, col: '#3f9df0' });
        load().then(() => { if (mode === 'won' && Array.isArray(top) && (top.length < 10 || car.score > top.at(-1).score)) ask(); });
      }
    }
    engine(Math.abs(car.vx), gas && mode === 'drive');
    const k = 1 - Math.exp(-dt * 5);
    cam.x += ((mode === 'title' ? car.x - 4 : car.x + car.vx * 0.35) - cam.x) * k; cam.y += (car.y - cam.y) * k * 0.75;
    s = S(); X0 = cv.width * 0.38 - cam.x * s; Y0 = cv.height * 0.6 + cam.y * s;
    scenery(now / 1000);
    house(); fieldShape(); truck();
    dust = dust.filter(d => (d.t += dt) < 0.8);
    if (gas && (puff += dt) > 0.07) { puff = 0; const c = Math.cos(car.a), sn = Math.sin(car.a); dust.push({ x: car.x - 2.35 * c + 0.2 * sn, y: car.y - 2.35 * sn - 0.2 * c, vx: -1.5 * c + car.vx * 0.5, vy: 0.6, t: 0, r: 0.12, col: '#9a9a9a' }); }   // the tailpipe
    dust.forEach(d => { d.x += d.vx * dt; d.y += d.vy * dt; if (d.g) d.vy -= G * dt; cx.globalAlpha = 1 - d.t / 0.8; if (d.hay) { cx.beginPath(); cx.moveTo(...P(d.x, d.y)); cx.lineTo(...P(d.x + 0.35 * Math.cos(d.t * 9 + d.vx), d.y + 0.35 * Math.sin(d.t * 9 + d.vx))); cx.lineWidth = s / 9; cx.strokeStyle = '#f0cf62'; cx.stroke(); } else blob(d.x, d.y, (d.r ?? 0.3) + d.t * (d.g ? 0 : 1), d.col ?? '#c9a36b', 1.5); cx.globalAlpha = 1; });
    if (driving && coarse.matches) pedals(gas, brake);
    if (cv.height > cv.width) return card([['TURN YOUR PHONE SIDEWAYS', '#ffe23a']]);
    if (mode !== 'title') hud();
    if (mode === 'title' || mode === 'won') board();
    if (mode === 'title') card([["DAVE'S DAD'S JIMMY", '#ffe23a'], ['out back, behind the house in Horseheads', '#ffffff'], [`GAS: → or D     BRAKE: ← or A${coarse.matches ? '' : '     HORN: SPACE'}`, '#ffffff'], ['in the air, gas tips it back, brake tips it forward', '#ffffff'], ["clear the bales, get to Beaver Brook, DON'T ROLL IT", '#ffe23a']], `${press()} TO GO  ·  ESC TO GO HOME${best ? `  ·  YOUR BEST ${best}` : ''}`, cv.width * 0.31);
    if (mode === 'rolled') card([['', '#fff'], ['', '#fff'], ["Dave's dad is gonna kill us.", '#ffffff']], `${press()} TO TRY AGAIN  ·  ESC TO GO HOME`);
    if (mode === 'won') card([['', '#fff'], ['', '#fff'], [`${car.flips ? `${car.flips} flip${car.flips > 1 ? 's' : ''}, ` : ''}${car.bales} bales, ${car.airs.toFixed(1)} s of air, ${Math.round(car.t)} s`, '#ffffff'], [`your best: ${best}`, '#ffffff']], `${press()} TO GO AGAIN  ·  ESC TO GO HOME`, cv.width * 0.31);
    shout();
  }

  // ---- the keys and the touch pedals: the right half is the gas, the left half the brake
  const go = () => { if (!sign && (mode === 'title' || mode !== 'drive' && performance.now() - ended > 1200)) { reset(); mode = 'drive'; mine = null; say('GO!'); chat(["Don't tell my dad.", "He's home at six. GO.", 'Seatbelts are for nerds.']); } };   // a held gas key must not skip the ending
  const down = e => {
    if (e.key === 'Escape') { e.preventDefault(); exit(); return; }
    if (sign?.contains(e.target)) return;   // typing a name
    if (mode === 'drive' && e.key === ' ' && !e.repeat) honk();
    keys[e.key] = true; if (!e.repeat && !['Shift', 'Meta', 'Control', 'Alt'].includes(e.key)) go(); e.preventDefault(); e.stopPropagation();
  };
  const up = e => { keys[e.key] = false; };
  const touch = e => { keys.touchGas = keys.touchBrake = false; for (const t of e.touches) keys[t.clientX > innerWidth / 2 ? 'touchGas' : 'touchBrake'] = true; };
  const tap = e => { if (mode !== 'drive') go(); touch(e); e.preventDefault(); };
  const fit = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; };
  return {
    get active() { return !!cv; },
    open() {
      if (cv) return;
      if (!document.getElementById('marker')) document.head.insertAdjacentHTML('beforeend', '<link id="marker" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap">');
      cv = Object.assign(document.createElement('canvas'), { className: 'jimmy' });
      cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:9;touch-action:none;background:#4fb8ff;clip-path:circle(0% at 50% 45%);transition:clip-path .7s ease-in';   // a cartoon iris, in and out
      document.body.append(cv); cx = cv.getContext('2d'); fit();
      const iris = cv.style; requestAnimationFrame(() => requestAnimationFrame(() => { iris.clipPath = 'circle(100% at 50% 45%)'; }));
      reset(); mode = 'title'; keys = {}; load();
      addEventListener('keydown', down, true); addEventListener('keyup', up, true); addEventListener('resize', fit);
      cv.addEventListener('touchstart', tap); cv.addEventListener('touchmove', touch); cv.addEventListener('touchend', touch);
      cv.addEventListener('mousedown', () => go());
      raf = requestAnimationFrame(frame);
    },
    close() {
      if (!cv) return;
      cancelAnimationFrame(raf); cv.style.clipPath = 'circle(0% at 50% 45%)'; setTimeout(cv.remove.bind(cv), 700); cv = null; sign?.remove(); sign = null;
      removeEventListener('keydown', down, true); removeEventListener('keyup', up, true); removeEventListener('resize', fit);
      if (snd) { const { o, g, ac } = snd; g.gain.setTargetAtTime(0, ac.currentTime, 0.05); setTimeout(() => o.stop(), 300); snd = null; }
    },
  };
}
