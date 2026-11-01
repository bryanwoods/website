// The laundry pile in front of the dresser, as cloth. Each piece starts as its flat sewing pattern: it hangs from one hand, then it is
// tossed onto the pile, one piece after another, so each one falls and settles over the pieces under it.
// It runs once, offline, in tools/drop-laundry.mjs; the page loads where every particle came to rest. No three.js here, so node can run it.
export const C = [-0.84, -0.26], RES = 0.01, CELLS = 160;   // the middle of the pile; the floor under it is a height field of 1 cm cells

function rng(seed) {   // mulberry32
  return () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// the patterns, flat, in metres: x across, y up the garment. sym() mirrors a right half that runs clockwise from the top
const sym = half => [...half, ...half.filter(([x]) => x).reverse().map(([x, y]) => [-x, y])];
const rect = (w, d) => [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
const JEANS = sym([[0.19, 0], [0.235, -0.2], [0.255, -0.36], [0.25, -0.65], [0.27, -1.04], [0.022, -1.03], [0.014, -0.3], [0, -0.28]]);   // baggy, 28 by 30
const SWEATS = sym([[0.18, 0], [0.225, -0.2], [0.245, -0.36], [0.2, -0.8], [0.15, -0.94], [0.15, -1.0], [0.035, -1.0], [0.035, -0.94], [0.014, -0.31], [0, -0.29]]);
const HOODIE = sym([[0, 0.33], [0.1, 0.31], [0.16, 0.22], [0.17, 0.08], [0.14, 0], [0.27, -0.05], [0.74, -0.5], [0.67, -0.58], [0.29, -0.27], [0.29, -0.72], [0, -0.72]]);
const TEE = sym([[0, -0.02], [0.1, 0], [0.25, -0.05], [0.42, -0.2], [0.33, -0.3], [0.28, -0.25], [0.28, -0.74], [0, -0.74]]);
const SOCK = sym([[0.045, 0], [0.045, -0.43], [0.035, -0.47], [0, -0.48]]);   // a tube sock

// in the order they land: its pattern, its grid, how thick and soft it is, its look, its openings, the point it hangs from, where the hand is,
// which way the cloth faces, and its folds.
// A fold is a line through a point at an angle; the part to its left goes over the top.
const towelOf = (base, outline, thick, grab, at, turn, folds) => ({ outline, h: 0.02, thick, soft: 150, base, grain: [50, 0], look: 'towel', grab, at, turn, folds });
const sockAt = (grab, at, turn) => ({ outline: SOCK, h: 0.01, thick: 0.012, soft: 150, base: '#ebe7db', grain: [36, 0], look: 'sock', open: (x, y) => y > -0.004, grab, at, turn, folds: [] });
// the edges that are openings, sleeves and legs and necks, where you see into the dark inside
const across = (x, y, [ax, ay], [bx, by]) => ((Math.abs(x) - ax) * (ay - by) + (y - ay) * (bx - ax)) / Math.hypot(bx - ax, by - ay) > -0.012;   // on or past the line from a to b
export const PIECES = [
  towelOf('#e4ddca', rect(0.68, 0.64), 0.012, [0.3, 0.3], [0.05, 0.1], 0.5, [[-0.12, 0, 1.9]]),   // the bath towel, still folded in half from the rail
  towelOf('#5a84b0', rect(0.42, 0.72), 0.008, [-0.18, 0.34], [-0.15, -0.05], 0.2, []),   // the blue hand towel
  { outline: JEANS, h: 0.02, thick: 0.012, soft: 60, base: '#3a5b88', grain: [24, 8], look: 'jeans', open: (x, y) => y > -0.004 || y < -1.02, grab: [0.19, 0], at: [0.05, 0.08], turn: 0.8, folds: [] },   // the legs left toward the room
  { outline: SWEATS, h: 0.02, thick: 0.014, soft: 400, base: '#8a8c90', grain: [34, 0], look: 'sweats', open: (x, y) => y > -0.004 || y < -0.995, grab: [0.09, -1.0], at: [0.12, -0.12], turn: 1.4, folds: [] },
  { outline: HOODIE, h: 0.02, thick: 0.016, soft: 250, base: '#a3262a', grain: [22, 0], look: 'hoodie', open: (x, y) => y < -0.715 || across(x, y, [0.74, -0.5], [0.67, -0.58]), grab: [0, 0.33], at: [-0.04, -0.05], turn: 0.3, folds: [] },
  { outline: TEE, h: 0.018, thick: 0.007, soft: 800, base: '#202024', grain: [16, 0], look: 'tee', open: (x, y) => y < -0.735 || (y > -0.03 && Math.abs(x) < 0.1) || across(x, y, [0.42, -0.2], [0.33, -0.3]), grab: [0.08, 0], at: [-0.05, -0.08], turn: 1.9, folds: [] },
  sockAt([0, 0], [0.0, 0.0], 1.0),
  sockAt([0.03, -0.45], [0.3, 0.22], 2.4),   // kicked off onto the carpet
];

// Bryan's black Flameboy hoodie, its outline traced from the mask of its photo (assets/flameboy-mask.png): 512 px is 0.77 m. It hangs on the
// chair until someone drags it off; the photo is its front
export const FLAMEBOY = { outline: [[-0.022,0.37],[0.017,0.365],[0.068,0.33],[0.107,0.274],[0.115,0.258],[0.107,0.247],[0.11,0.238],[0.221,0.214],[0.283,0.209],[0.383,0.081],[0.383,-0.044],[0.314,-0.128],[0.289,-0.305],[0.287,-0.368],[0.269,-0.362],[0.263,-0.352],[0.212,-0.343],[0.101,-0.328],[0.011,-0.325],[-0.11,-0.326],[-0.263,-0.359],[-0.271,-0.355],[-0.278,-0.269],[-0.289,-0.256],[-0.298,-0.22],[-0.301,-0.191],[-0.293,-0.179],[-0.311,-0.176],[-0.383,-0.106],[-0.383,0.078],[-0.319,0.192],[-0.136,0.225],[-0.14,0.238],[-0.118,0.29],[-0.079,0.334]], h: 0.02, thick: 0.016, soft: 250, base: '#3a3d3b', grain: [22, 0], look: 'photo' };

// the pattern as a grid of particles: a cell is cloth when its centre is inside the outline, and the edge particles are pulled onto the outline
export function sheet(outline, h) {
  const inside = (px, py) => {
    let c = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) { const [xi, yi] = outline[i], [xj, yj] = outline[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c; }
    return c;
  };
  const xs = outline.map(q => q[0]), ys = outline.map(q => q[1]), on = new Set(), cell = (i, j) => on.has(i * 1e4 + j);
  for (let i = Math.floor(Math.min(...xs) / h); i <= Math.ceil(Math.max(...xs) / h); i++) for (let j = Math.floor(Math.min(...ys) / h); j <= Math.ceil(Math.max(...ys) / h); j++) if (inside(i * h, j * h)) on.add(i * 1e4 + j);
  const ids = new Map(), P = [], GI = [], GJ = [];
  const vert = (I, J) => { const k = I * 1e4 + J; if (!ids.has(k)) { ids.set(k, GI.length); GI.push(I); GJ.push(J); P.push((I - 0.5) * h, (J - 0.5) * h); } return ids.get(k); };
  const tris = [], stretch = new Map(), shear = [], rim = [];
  for (const k of on) {
    const i = Math.round(k / 1e4), j = k - i * 1e4, q = [vert(i, j), vert(i + 1, j), vert(i + 1, j + 1), vert(i, j + 1)];
    (i + j) & 1 ? tris.push(q[0], q[1], q[3], q[1], q[2], q[3]) : tris.push(q[0], q[1], q[2], q[0], q[2], q[3]);
    [[i, j - 1], [i + 1, j], [i, j + 1], [i - 1, j]].forEach(([ni, nj], e) => {
      const a = q[e], b = q[(e + 1) % 4]; stretch.set(Math.min(a, b) * 1e6 + Math.max(a, b), [a, b]);
      if (!cell(ni, nj)) rim.push(a, b, q[(e + 2) % 4], q[(e + 3) % 4]);   // an edge of the cloth, and the particles inside it
    });
    shear.push([q[0], q[2]], [q[1], q[3]]);
  }
  for (let v = 0; v < GI.length; v++) {
    const I = GI[v], J = GJ[v];
    if (cell(I - 1, J - 1) && cell(I, J - 1) && cell(I - 1, J) && cell(I, J)) continue;
    let best = null, bd = 0.6 * h;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const [ax, ay] = outline[j], ex = outline[i][0] - ax, ey = outline[i][1] - ay;
      const t = Math.max(0, Math.min(1, ((P[2 * v] - ax) * ex + (P[2 * v + 1] - ay) * ey) / (ex * ex + ey * ey))), d = Math.hypot(ax + t * ex - P[2 * v], ay + t * ey - P[2 * v + 1]);
      if (d < bd) { bd = d; best = [ax + t * ex, ay + t * ey]; }
    }
    if (best) [P[2 * v], P[2 * v + 1]] = best;
  }
  const bend = [];
  for (const [k, v] of ids) for (const [di, dj] of [[1, 0], [0, 1]]) { const a = ids.get(k - di * 1e4 - dj), b = ids.get(k + di * 1e4 + dj); if (a !== undefined && b !== undefined) bend.push([a, b]); }
  const links = [...stretch.values(), ...shear, ...bend];
  return {
    n: GI.length, h, P: Float32Array.from(P), tris: Uint32Array.from(tris), rim: Int32Array.from(rim), stiff: links.length - bend.length,
    links: Int32Array.from(links.flat()), rest: Float32Array.from(links, ([a, b]) => Math.hypot(P[2 * a] - P[2 * b], P[2 * a + 1] - P[2 * b + 1])),
    bounds: { x0: Math.min(...xs) - h, x1: Math.max(...xs) + h, y0: Math.min(...ys) - h, y1: Math.max(...ys) + h },
  };
}

// the height at (x, z) on a grid of nx by nz heights, the first at (x0, z0), res apart
export const sample = (h, nx, nz, x0, z0, res) => (x, z) => {
  const fx = (x - x0) / res, fz = (z - z0) / res, i = Math.floor(fx), j = Math.floor(fz);
  if (i < 0 || j < 0 || i >= nx - 1 || j >= nz - 1) return 0;
  const u = fx - i, v = fz - j, k = j * nx + i;
  return (h[k] * (1 - u) + h[k + 1] * u) * (1 - v) + (h[k + nx] * (1 - u) + h[k + nx + 1] * u) * v;
};

// the floor and everything already on it, as heights on a grid
export function heightField() {
  const n = CELLS, h = new Float32Array(n * n), x0 = C[0] - n * RES / 2, z0 = C[1] - n * RES / 2, at = sample(h, n, n, x0, z0, RES);
  const stamp = (pos, tris, lift) => {   // raise the field to the top of every triangle
    for (let t = 0; t < tris.length; t += 3) {
      const [ax, ay, az, bx, by, bz, cx, cy, cz] = [0, 1, 2].flatMap(k => { const p = 3 * tris[t + k]; return [(pos[p] - x0) / RES, pos[p + 1] + lift, (pos[p + 2] - z0) / RES]; });
      const det = (bz - cz) * (ax - cx) + (cx - bx) * (az - cz);
      if (Math.abs(det) < 1e-9) continue;
      for (let j = Math.max(0, Math.ceil(Math.min(az, bz, cz))); j <= Math.min(n - 1, Math.floor(Math.max(az, bz, cz))); j++) {
        for (let i = Math.max(0, Math.ceil(Math.min(ax, bx, cx))); i <= Math.min(n - 1, Math.floor(Math.max(ax, bx, cx))); i++) {
          const l1 = ((bz - cz) * (i - cx) + (cx - bx) * (j - cz)) / det, l2 = ((cz - az) * (i - cx) + (ax - cx) * (j - cz)) / det, l3 = 1 - l1 - l2;
          if (l1 < -1e-6 || l2 < -1e-6 || l3 < -1e-6) continue;
          h[j * n + i] = Math.max(h[j * n + i], l1 * ay + l2 * by + l3 * cy);
        }
      }
    }
    const was = h.slice();   // widen every ridge by a cell, so none pokes up between the particles of the next piece
    for (let j = 1; j < n - 1; j++) for (let i = 1; i < n - 1; i++) for (const k of [-n - 1, -n, -n + 1, -1, 1, n - 1, n, n + 1]) h[j * n + i] = Math.max(h[j * n + i], was[j * n + i + k]);
  };
  return { n, h, x0, z0, at, stamp };
}

// fold the pattern, hang it from one hand by the point `grab`, ripple it a little, and hold it with its lowest point just over the pile
function pose(s, p, field, rnd) {
  const n = s.n, u = new Float32Array(n), v = new Float32Array(n), w = new Float32Array(n);
  let pin = 0;
  for (let i = 0; i < n; i++) { u[i] = s.P[2 * i]; v[i] = s.P[2 * i + 1]; if (Math.hypot(u[i] - p.grab[0], v[i] - p.grab[1]) < Math.hypot(u[pin] - p.grab[0], v[pin] - p.grab[1])) pin = i; }
  for (const [px, py, a] of p.folds) {
    const nx = -Math.sin(a), ny = Math.cos(a), c = Math.max(...w) + 0.012;
    for (let i = 0; i < n; i++) { const d = (u[i] - px) * nx + (v[i] - py) * ny; if (d > 0) { u[i] -= 2 * d * nx; v[i] -= 2 * d * ny; w[i] = 2 * c - w[i]; } }
  }
  const gx = u[pin], gy = v[pin], r = -Math.PI / 2 - Math.atan2(v.reduce((a, b) => a + b) / n - gy, u.reduce((a, b) => a + b) / n - gx);
  const cr = Math.cos(r), sr = Math.sin(r), ct = Math.cos(p.turn), st = Math.sin(p.turn);
  const waves = [...Array(6)].map(() => [rnd() * Math.PI, 14 + rnd() * 30, rnd() * 6.3, 0.002 + rnd() * 0.005]);
  const pos = new Float32Array(3 * n); let low = Infinity;
  for (let i = 0; i < n; i++) {
    let h = w[i]; for (const [th, f, ph, amp] of waves) h += amp * Math.sin(f * (u[i] * Math.cos(th) + v[i] * Math.sin(th)) + ph);
    const du = u[i] - gx, dv = v[i] - gy, a = du * cr - dv * sr;   // the hand at the top, the rest of the cloth straight down under it, then the turn
    pos[3 * i] = C[0] + p.at[0] + a * ct + h * st; pos[3 * i + 1] = du * sr + dv * cr; pos[3 * i + 2] = C[1] + p.at[1] - a * st + h * ct;
  }
  for (let i = 0; i < n; i++) low = Math.min(low, pos[3 * i + 1] - field.at(pos[3 * i], pos[3 * i + 2]));
  for (let i = 0; i < n; i++) pos[3 * i + 1] += 0.02 - low;
  return [pos, pin];
}

// position-based dynamics: stiff threads, softer bending, each piece kept off itself and off the others, friction on whatever it lands on.
// parts are [sheet, piece] pairs stepped together, their particles one part after another in pos; field.at(x, z, y) is the height under (x, z)
// for a particle at height y.
// live is the page's cloth, heavier than the offline drop: folds 20 times stiffer, ripples that die out at once, cloth that slides on what it
// lies on as hard as it presses down, the walls of the room, and a search for near particles once in four steps, 1 cm farther out
export function cloth(parts, pos, live = false) {
  const every = live ? 4 : 1;
  const n = parts.reduce((a, [s]) => a + s.n, 0), P = new Float32Array(2 * n), T = new Float64Array(n), D = new Float64Array(n), near = new Float64Array(n), part = new Int32Array(n);
  const L = [], R = [], K = [], stiff = [];
  let o = 0;
  parts.forEach(([s, p], k) => {
    for (let i = 0; i < s.n; i++) { P[2 * (o + i)] = s.P[2 * i] + 10 * k; P[2 * (o + i) + 1] = s.P[2 * i + 1]; T[o + i] = p.thick / 2 + 0.002; D[o + i] = 0.85 * s.h; near[o + i] = (1.5 * s.h) ** 2; part[o + i] = k; }   // the patterns 10 m apart: two pieces are never near in the pattern
    for (let e = 0; e < s.rest.length; e++) { L.push(o + s.links[2 * e], o + s.links[2 * e + 1]); R.push(s.rest[e]); K.push(e < s.stiff ? 2 : 2 + p.soft / (live ? 20 : 1)); stiff.push(e < s.stiff); }
    o += s.n;
  });
  const prev = new Float32Array(3 * n), vel = new Float32Array(3 * n), dt = 1 / 600, d = Math.max(...D) + (every > 1 ? 0.01 : 0), MU = 0.5, pairs = [];
  let steps = 0;
  const size = 2 * n, start = new Int32Array(size + 1), entry = new Int32Array(n);
  const hash = (a, b, c) => Math.abs((a * 92837111) ^ (b * 689287499) ^ (c * 283923481)) % size;
  function touch(i, j) {   // two particles closer than their radii: push them apart
    const r = (D[i] + D[j]) / 2, dx = pos[3 * j] - pos[3 * i], dy = pos[3 * j + 1] - pos[3 * i + 1], dz = pos[3 * j + 2] - pos[3 * i + 2], dd = dx * dx + dy * dy + dz * dz;
    if (dd >= r * r || dd === 0) return;
    const len = Math.sqrt(dd), k = (r - len) / (2 * len);
    pos[3 * i] -= dx * k; pos[3 * i + 1] -= dy * k; pos[3 * i + 2] -= dz * k; pos[3 * j] += dx * k; pos[3 * j + 1] += dy * k; pos[3 * j + 2] += dz * k;
    if (part[i] === part[j]) return;
    let fx = pos[3 * j] - prev[3 * j] - pos[3 * i] + prev[3 * i], fy = pos[3 * j + 1] - prev[3 * j + 1] - pos[3 * i + 1] + prev[3 * i + 1], fz = pos[3 * j + 2] - prev[3 * j + 2] - pos[3 * i + 2] + prev[3 * i + 2];
    const fn = (fx * dx + fy * dy + fz * dz) / dd; fx -= fn * dx; fy -= fn * dy; fz -= fn * dz;
    const f = Math.min(1, MU * (r - len) / (Math.hypot(fx, fy, fz) || 1e-9)) / 2;   // one piece drags the other along, as hard as they press together
    pos[3 * i] += fx * f; pos[3 * i + 1] += fy * f; pos[3 * i + 2] += fz * f; pos[3 * j] -= fx * f; pos[3 * j + 1] -= fy * f; pos[3 * j + 2] -= fz * f;
  }
  function step(field, pin = -1, hand = null, wall = null, tie = null) {
    for (let i = 0; i < 3 * n; i++) { if (i % 3 === 1) vel[i] -= 9.8 * dt; vel[i] *= 0.996; prev[i] = pos[i]; pos[i] += vel[i] * dt; }
    for (let e = 0; e < R.length; e++) {
      const a = 3 * L[2 * e], b = 3 * L[2 * e + 1], dx = pos[b] - pos[a], dy = pos[b + 1] - pos[a + 1], dz = pos[b + 2] - pos[a + 2], len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-9;
      const k = (len - R[e]) / (len * K[e]);
      pos[a] += dx * k; pos[a + 1] += dy * k; pos[a + 2] += dz * k; pos[b] -= dx * k; pos[b + 1] -= dy * k; pos[b + 2] -= dz * k;
    }
    if (pin >= 0) pos.set(hand, 3 * pin);   // held up by one point
    if (tie) for (let i = 0; i < n; i++) {   // and no point farther from the hand than the cloth between them is long, so it never stretches
      const dx = pos[3 * i] - hand[0], dy = pos[3 * i + 1] - hand[1], dz = pos[3 * i + 2] - hand[2], len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (len > tie[i]) { const k = tie[i] / len; pos[3 * i] = hand[0] + dx * k; pos[3 * i + 1] = hand[1] + dy * k; pos[3 * i + 2] = hand[2] + dz * k; }
    }
    if (steps++ % every) for (let k = 0; k < pairs.length; k += 2) touch(pairs[k], pairs[k + 1]);
    else {
      pairs.length = 0; start.fill(0);
      for (let i = 0; i < n; i++) start[hash(Math.floor(pos[3 * i] / d), Math.floor(pos[3 * i + 1] / d), Math.floor(pos[3 * i + 2] / d))]++;
      for (let i = 1; i <= size; i++) start[i] += start[i - 1];
      for (let i = 0; i < n; i++) entry[--start[hash(Math.floor(pos[3 * i] / d), Math.floor(pos[3 * i + 1] / d), Math.floor(pos[3 * i + 2] / d))]] = i;
      for (let i = 0; i < n; i++) {
        const cx = Math.floor(pos[3 * i] / d), cy = Math.floor(pos[3 * i + 1] / d), cz = Math.floor(pos[3 * i + 2] / d);
        for (let a = cx - 1; a <= cx + 1; a++) for (let b = cy - 1; b <= cy + 1; b++) for (let c = cz - 1; c <= cz + 1; c++) {
          const hh = hash(a, b, c);
          for (let q = start[hh]; q < start[hh + 1]; q++) {
            const j = entry[q];
            if (j <= i || (P[2 * i] - P[2 * j]) ** 2 + (P[2 * i + 1] - P[2 * j + 1]) ** 2 < near[i]) continue;
            if (every > 1 && (pos[3 * j] - pos[3 * i]) ** 2 + (pos[3 * j + 1] - pos[3 * i + 1]) ** 2 + (pos[3 * j + 2] - pos[3 * i + 2]) ** 2 < d * d) pairs.push(i, j);
            touch(i, j);
          }
        }
      }
    }
    for (let i = 0; i < n; i++) {
      if (live) { pos[3 * i] = Math.min(wall[1], Math.max(wall[0], pos[3 * i])); pos[3 * i + 2] = Math.min(wall[3], Math.max(wall[2], pos[3 * i + 2])); }
      let g = field.at(pos[3 * i], pos[3 * i + 2], pos[3 * i + 1]) + T[i];
      if (live && pos[3 * i + 1] < g - 0.04) {   // well under the top here: from the side, the side stops it; already under it (a desk, a chair seat), it hangs free
        const was = field.at(prev[3 * i], prev[3 * i + 2], pos[3 * i + 1]) + T[i];
        if (pos[3 * i + 1] < was - 0.04) g = -Infinity; else { pos[3 * i] = prev[3 * i]; pos[3 * i + 2] = prev[3 * i + 2]; g = was; }
      }
      if (pos[3 * i + 1] < g && live) {   // cloth on cloth or carpet: it slides as hard as it presses down, and what the room lifts does not fly up
        const tx = pos[3 * i] - prev[3 * i], tz = pos[3 * i + 2] - prev[3 * i + 2], k = Math.min(1, (g - pos[3 * i + 1]) / (Math.hypot(tx, tz) || 1e-9));
        pos[3 * i] -= tx * k; pos[3 * i + 1] = g; pos[3 * i + 2] -= tz * k; prev[3 * i + 1] = Math.max(prev[3 * i + 1], g);
      } else if (pos[3 * i + 1] < g) { pos[3 * i + 1] = g; pos[3 * i] = prev[3 * i]; pos[3 * i + 2] = prev[3 * i + 2]; }   // offline: it sticks where it lands
    }
    for (let i = 0; i < 3 * n; i++) vel[i] = (pos[i] - prev[i]) / dt;
    if (live) for (let e = 0; e < R.length; e++) {   // each thread evens out the speeds at its ends: the piece still moves as one
      if (!stiff[e]) continue;
      const a = 3 * L[2 * e], b = 3 * L[2 * e + 1];
      for (let k = 0; k < 3; k++) { const dv = (vel[b + k] - vel[a + k]) * 0.45; vel[a + k] += dv; vel[b + k] -= dv; }
    }
  }
  function smooth(field) {   // ease out the zigzags one particle wide: real cloth is too thick to fold that tight
    const sum = new Float32Array(3 * n), cnt = new Float32Array(n);
    for (let it = 0; it < 3; it++) {
      sum.fill(0); cnt.fill(0);
      for (let e = 0; e < R.length; e++) { if (!stiff[e]) continue; const a = L[2 * e], b = L[2 * e + 1]; cnt[a]++; cnt[b]++; for (let k = 0; k < 3; k++) { sum[3 * a + k] += pos[3 * b + k]; sum[3 * b + k] += pos[3 * a + k]; } }
      for (let i = 0; i < n; i++) {
        for (let k = 0; k < 3; k++) pos[3 * i + k] += 0.5 * (sum[3 * i + k] / cnt[i] - pos[3 * i + k]);
        const g = field.at(pos[3 * i], pos[3 * i + 2], pos[3 * i + 1]) + T[i];
        if (pos[3 * i + 1] > g - 0.04) pos[3 * i + 1] = Math.max(pos[3 * i + 1], g);
      }
    }
  }
  function tether(pin) {   // how far along the cloth each particle is from the pin; Infinity on the other pieces
    const tie = new Float64Array(n).fill(Infinity);
    tie[pin] = 0;
    for (let changed = true; changed;) {
      changed = false;
      for (let e = 0; e < R.length; e++) {
        if (!stiff[e]) continue;
        const a = L[2 * e], b = L[2 * e + 1];
        if (tie[a] + R[e] < tie[b]) { tie[b] = tie[a] + R[e]; changed = true; } else if (tie[b] + R[e] < tie[a]) { tie[a] = tie[b] + R[e]; changed = true; }
      }
    }
    return tie;
  }
  return { pos, vel, step, smooth, tether };
}

function drop(s, pos, pin, field, p) {   // hang it, let go, let it settle
  const c = cloth([[s, p]], pos), hand = pos.slice(3 * pin, 3 * pin + 3), HANG = 400;
  for (let step = 0; step < HANG + 1800; step++) c.step(field, step < HANG ? pin : -1, hand);
  c.smooth(field);
}

// drop every piece in turn; the rest positions of all their particles, one piece after another
export function dropPile() {
  const field = heightField(), all = [];
  PIECES.forEach((p, k) => {
    const s = sheet(p.outline, p.h), [pos, pin] = pose(s, p, field, rng(7 + k));
    drop(s, pos, pin, field, p); field.stamp(pos, s.tris, p.thick / 2); all.push(...pos);
  });
  return Float32Array.from(all);
}
