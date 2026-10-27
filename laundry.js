// The laundry pile's cloth: the weave and the details of each piece, its thickness, and the shadows in its folds.
// Where each piece lies comes from pile.js, dropped offline into assets/laundry.bin.
import * as THREE from 'three';
import { C, RES, PIECES, sheet, heightField } from './pile.js';

// painting helpers, in pattern metres
const STITCH = [0.004, 0.0022];
function line(x, pts, width, color, dash = []) {
  x.lineWidth = width; x.strokeStyle = color; x.setLineDash(dash); x.beginPath();
  pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.stroke(); x.setLineDash([]);
}
function glow(x, cx, cy, r, rgb, a) {
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r);
}
function ribs(x, x0, y0, x1, y1, step, color) {
  x.fillStyle = 'rgba(0,0,0,0.06)'; x.fillRect(x0, y0, x1 - x0, y1 - y0);
  for (let k = x0; k < x1; k += step) line(x, [[k, y0], [k, y1]], step * 0.4, color);
}

function towel(x, side, b) {
  const y = b.y0 + 0.07;
  x.fillStyle = 'rgba(255,255,255,0.14)'; x.fillRect(b.x0, y - 0.03, b.x1 - b.x0, 0.06);   // the flat-woven border near the ends
  for (let k = -2; k <= 2; k++) line(x, [[b.x0, y + k * 0.011], [b.x1, y + k * 0.011]], 0.002, 'rgba(0,0,0,0.13)');
  line(x, [[b.x0, b.y0 + 0.022], [b.x1, b.y0 + 0.022]], 0.004, 'rgba(0,0,0,0.14)');   // the hem
  for (let k = 0; k < 7; k++) glow(x, b.x0 + Math.random() * (b.x1 - b.x0), b.y0 + Math.random() * (b.y1 - b.y0), 0.05 + Math.random() * 0.12, '120,100,60', 0.08);   // never quite clean
}

function jeans(x, side) {
  const gold = 'rgba(206,150,72,0.95)', copper = '#9c6b3c';
  for (const s of [-1, 1]) {
    if (side) { glow(x, s * 0.12, -0.2, 0.15, '185,205,225', 0.28); glow(x, s * 0.14, -0.68, 0.1, '185,205,225', 0.18); }   // the seat, the backs of the knees
    else {
      glow(x, s * 0.13, -0.36, 0.14, '190,210,230', 0.34); glow(x, s * 0.14, -0.64, 0.09, '190,210,230', 0.3);   // the thighs and knees
      for (let k = 0; k < 6; k++) line(x, [[s * 0.03, -0.235 - k * 0.018], [s * (0.09 + k * 0.012), -0.215 - k * 0.024]], 0.004, 'rgba(215,228,240,0.3)');   // whiskers
    }
    line(x, [[s * 0.022, -0.31], [s * 0.03, -1.0]], 0.0013, gold, STITCH);   // the inseam
    line(x, [[s * 0.265, -1.005], [s * 0.03, -0.998]], 0.0013, gold, STITCH);   // the hem
    line(x, [[s * 0.272, -1.034], [s * 0.02, -1.026]], 0.014, 'rgba(60,52,42,0.55)');   // walked to shreds and grey at the back of the hem
    for (let k = 0; k < 70; k++) { const t = Math.random(); line(x, [[s * (0.03 + t * 0.24), -1.032], [s * (0.03 + t * 0.24) + 0.002, -1.04 + Math.random() * 0.012]], 0.0007, 'rgba(225,225,215,0.35)'); }
    line(x, [[s * 0.24, -0.2], [s * 0.247, -0.36], [s * 0.242, -0.65], [s * 0.258, -1.0]], 0.0013, gold, STITCH);   // the side seam
  }
  x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(-0.2, -0.042, 0.4, 0.042);   // the waistband
  line(x, [[-0.19, -0.006], [0.19, -0.006]], 0.0013, gold, STITCH); line(x, [[-0.195, -0.037], [0.195, -0.037]], 0.0013, gold, STITCH);
  for (const lx of side ? [-0.16, -0.06, 0, 0.06, 0.16] : [-0.15, 0.15]) { x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(lx - 0.006, -0.05, 0.012, 0.05); line(x, [[lx, -0.003], [lx, -0.047]], 0.0013, gold, STITCH); }   // belt loops
  if (!side) {
    x.fillStyle = copper; x.beginPath(); x.arc(0, -0.021, 0.009, 0, 7); x.fill(); line(x, [[0.006, -0.021], [-0.006, -0.021]], 0.002, 'rgba(0,0,0,0.4)');   // the button
    line(x, [[0.032, -0.045], [0.032, -0.17], [0.012, -0.205], [0, -0.21]], 0.0013, gold, STITCH);   // the fly
    for (const s of [-1, 1]) {
      x.beginPath(); x.moveTo(s * 0.1, -0.042); x.quadraticCurveTo(s * 0.12, -0.12, s * 0.235, -0.13); x.lineWidth = 0.005; x.strokeStyle = 'rgba(10,20,40,0.55)'; x.stroke();   // the pocket mouths
      x.setLineDash(STITCH); x.lineWidth = 0.0013; x.strokeStyle = gold; x.beginPath(); x.moveTo(s * 0.093, -0.042); x.quadraticCurveTo(s * 0.112, -0.128, s * 0.235, -0.138); x.stroke(); x.setLineDash([]);
      x.fillStyle = copper; x.beginPath(); x.arc(s * 0.228, -0.05, 0.004, 0, 7); x.fill();   // rivets
    }
    line(x, [[-0.125, -0.05], [-0.13, -0.1], [-0.185, -0.1], [-0.19, -0.05]], 0.0013, gold, STITCH);   // the coin pocket
  } else {
    line(x, [[-0.24, -0.1], [0, -0.14], [0.24, -0.1]], 0.0013, gold, STITCH); line(x, [[-0.24, -0.108], [0, -0.148], [0.24, -0.108]], 0.0013, gold, STITCH);   // the yoke
    line(x, [[0, -0.04], [0, -0.27]], 0.0013, gold, STITCH);
    for (const s of [-1, 1]) {
      const pk = [[s * 0.04, -0.16], [s * 0.19, -0.14], [s * 0.18, -0.3], [s * 0.115, -0.33], [s * 0.05, -0.31], [s * 0.04, -0.16]];
      line(x, pk, 0.004, 'rgba(10,20,40,0.35)'); line(x, pk.map(([a, c]) => [a * 0.97 + s * 0.003, c - 0.004]), 0.0013, gold, STITCH);   // the back pockets
      x.beginPath(); x.moveTo(s * 0.055, -0.2); x.quadraticCurveTo(s * 0.09, -0.25, s * 0.115, -0.21); x.quadraticCurveTo(s * 0.14, -0.25, s * 0.175, -0.19); x.lineWidth = 0.0013; x.strokeStyle = gold; x.stroke();   // the arcs
    }
    x.fillStyle = '#8c6a47'; x.fillRect(-0.16, -0.04, 0.075, 0.034);   // the leather patch
  }
}

function sweats(x, side) {
  ribs(x, -0.24, -0.05, 0.24, 0, 0.005, 'rgba(0,0,0,0.12)');   // the waistband
  for (const s of [-1, 1]) {
    ribs(x, s > 0 ? 0.03 : -0.155, -1.0, s > 0 ? 0.155 : -0.03, -0.935, 0.005, 'rgba(0,0,0,0.12)');   // the ankle cuffs
    glow(x, s * 0.12, -0.6, 0.08, '40,35,30', 0.12);   // the knees
    if (!side) line(x, [[s * 0.17, -0.05], [s * 0.215, -0.19]], 0.004, 'rgba(0,0,0,0.3)');   // the pockets
  }
  if (!side) for (const [a, b, c] of [[-0.012, -0.08, -0.03], [0.012, 0.06, 0.07]]) {   // the drawstring
    x.beginPath(); x.moveTo(a, -0.025); x.bezierCurveTo(a * 2, -0.09, b, -0.08, c, -0.17); x.lineWidth = 0.006; x.strokeStyle = '#efebe3'; x.stroke();
  }
}

function hoodie(x, side) {
  ribs(x, -0.3, -0.72, 0.3, -0.65, 0.006, 'rgba(0,0,0,0.18)');   // the ribbed waistband
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 0.705, -0.54); x.rotate(s * Math.PI / 4); ribs(x, -0.06, 0, 0.06, 0.075, 0.006, 'rgba(0,0,0,0.18)'); x.restore();   // the cuffs
    line(x, [[s * 0.27, -0.05], [s * 0.29, -0.27]], 0.0015, 'rgba(0,0,0,0.3)', STITCH);   // the armholes
  }
  if (!side) {
    x.beginPath(); x.ellipse(0, 0.13, 0.12, 0.17, 0, 0, 7); x.fillStyle = 'rgba(45,0,5,0.4)'; x.fill();   // into the hood
    x.lineWidth = 0.018; x.strokeStyle = 'rgba(255,220,220,0.06)'; x.stroke();
    const pocket = [[-0.21, -0.645], [-0.21, -0.52], [-0.13, -0.4], [0.13, -0.4], [0.21, -0.52], [0.21, -0.645]];
    line(x, pocket, 0.003, 'rgba(0,0,0,0.25)'); line(x, pocket.map(([a, c]) => [a * 0.96, c - 0.006]), 0.0013, 'rgba(0,0,0,0.35)', STITCH);   // the kangaroo pocket
    for (const s of [-1, 1]) line(x, [[s * 0.13, -0.4], [s * 0.21, -0.52]], 0.007, 'rgba(30,0,0,0.5)');   // its mouths
    for (const s of [-1, 1]) { line(x, [[s * 0.045, -0.005], [s * 0.05, -0.12], [s * 0.064, -0.24]], 0.008, '#ebe4d8'); line(x, [[s * 0.064, -0.24], [s * 0.066, -0.265]], 0.009, '#c9c9c4'); }   // the drawstrings
  } else line(x, [[0, 0.33], [0, 0.0]], 0.0015, 'rgba(0,0,0,0.3)', STITCH);   // the seam down the back of the hood
}

function tee(x, side) {
  const neck = () => { x.beginPath(); x.moveTo(-0.1, 0); x.quadraticCurveTo(0, side ? -0.03 : -0.13, 0.1, 0); };
  neck(); x.fillStyle = 'rgba(0,0,0,0.35)'; x.fill(); x.lineWidth = 0.02; x.strokeStyle = 'rgba(255,255,255,0.07)'; x.stroke();   // the collar, and the inside of the back through it
  line(x, [[-0.28, -0.72], [0.28, -0.72]], 0.0013, 'rgba(255,255,255,0.18)', STITCH);
  for (const s of [-1, 1]) {
    line(x, [[s * 0.406, -0.186], [s * 0.316, -0.286]], 0.0013, 'rgba(255,255,255,0.18)', STITCH);   // the sleeve hems
    line(x, [[s * 0.1, 0], [s * 0.25, -0.05], [s * 0.28, -0.25]], 0.0015, 'rgba(255,255,255,0.1)');
  }
  for (let k = 0; k < 8; k++) glow(x, (Math.random() - 0.5) * 0.5, -Math.random() * 0.7, 0.06 + Math.random() * 0.1, '255,255,255', 0.035);   // washed out to charcoal
}

function sock(x, side) {
  ribs(x, -0.05, -0.1, 0.05, 0, 0.004, 'rgba(0,0,0,0.09)');
  x.fillStyle = '#25356c'; x.fillRect(-0.05, -0.036, 0.1, 0.009); x.fillStyle = '#b3282d'; x.fillRect(-0.05, -0.056, 0.1, 0.009);   // the stripes
  const g = x.createLinearGradient(0, -0.25, 0, -0.48); g.addColorStop(0, 'rgba(95,85,70,0)'); g.addColorStop(1, `rgba(95,85,70,${side ? 0.6 : 0.3})`);   // grey under the foot
  x.fillStyle = g; x.fillRect(-0.05, -0.48, 0.1, 0.23);
}

const PAINT = { towel, jeans, sweats, hoodie, tee, sock };

// the cloth's front and back, its weave, and its details; the back is drawn mirrored so both sides line up with the pattern
function texture(p, b) {
  const ppm = 700, pw = Math.ceil((b.x1 - b.x0) * ppm), ph = Math.ceil((b.y1 - b.y0) * ppm);
  const c = Object.assign(document.createElement('canvas'), { width: 2 * pw, height: ph }), x = c.getContext('2d');
  x.fillStyle = p.base; x.fillRect(0, 0, c.width, c.height);
  const d = x.getImageData(0, 0, c.width, c.height), [amp, slub] = p.grain, col = Float32Array.from({ length: c.width }, () => (Math.random() - 0.5) * slub);
  for (let i = 0; i < d.data.length; i += 4) { const k = (Math.random() - 0.5) * amp + col[(i >> 2) % c.width]; d.data[i] += k; d.data[i + 1] += k; d.data[i + 2] += k; }
  x.putImageData(d, 0, 0);
  for (const side of [0, 1]) {
    x.save(); x.beginPath(); x.rect(side * pw, 0, pw, ph); x.clip();
    x.setTransform(side ? -ppm : ppm, 0, 0, -ppm, side ? pw + b.x1 * ppm : -b.x0 * ppm, b.y1 * ppm);
    PAINT[p.look](x, side, b);
    for (let k = 0; k < (b.x1 - b.x0) * (b.y1 - b.y0) * 160; k++) {   // creases pressed into it, each a dark line with a light one beside it
      const cx = b.x0 + Math.random() * (b.x1 - b.x0), cy = b.y0 + Math.random() * (b.y1 - b.y0), a = Math.random() * Math.PI, l = 0.03 + Math.random() * 0.12, bend = (Math.random() - 0.5) * 0.04;
      for (const [o, ink] of [[0, 'rgba(0,0,0,0.07)'], [0.0025, 'rgba(255,255,255,0.05)']]) {
        x.beginPath(); x.moveTo(cx + o, cy + o); x.quadraticCurveTo(cx + Math.cos(a) * l / 2 - Math.sin(a) * bend + o, cy + Math.sin(a) * l / 2 + Math.cos(a) * bend + o, cx + Math.cos(a) * l + o, cy + Math.sin(a) * l + o);
        x.lineWidth = 0.003; x.strokeStyle = ink; x.stroke();
      }
    }
    x.restore();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

// the cloth with its thickness: a top and a bottom offset from the simulated sheet, joined round the edge by a rolled hem
function garment(p, s, pos, field) {
  const sim = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)).setIndex(new THREE.BufferAttribute(s.tris, 1));
  sim.computeVertexNormals();
  const n = s.n, nr = sim.attributes.normal.array, out = new Float32Array(3 * n), edge = new Uint8Array(n), T = p.thick / 2, b = s.bounds;
  for (let e = 0; e < s.rim.length; e += 4) for (const [v, w] of [[s.rim[e], s.rim[e + 3]], [s.rim[e + 1], s.rim[e + 2]]]) { edge[v] = 1; for (let k = 0; k < 3; k++) out[3 * v + k] += pos[3 * v + k] - pos[3 * w + k]; }
  const ring = new Int32Array(n).fill(-1); let m = 0;
  for (let i = 0; i < n; i++) if (edge[i]) {
    const o = new THREE.Vector3().fromArray(out, 3 * i), nn = new THREE.Vector3().fromArray(nr, 3 * i);
    o.addScaledVector(nn, -o.dot(nn)).normalize().toArray(out, 3 * i); ring[i] = 2 * n + m++;
  }
  const V = 2 * n + m, xyz = new Float32Array(3 * V), uv = new Float32Array(2 * V), col = new Float32Array(3 * V);
  for (let i = 0; i < n; i++) {
    const fu = (s.P[2 * i] - b.x0) / (b.x1 - b.x0) / 2, bu = 0.5 + (b.x1 - s.P[2 * i]) / (b.x1 - b.x0) / 2, fv = (s.P[2 * i + 1] - b.y0) / (b.y1 - b.y0);
    const ao = occlusion(field, pos[3 * i], pos[3 * i + 1] + T, pos[3 * i + 2]);
    for (const [slot, sign, u, shade] of [[i, 1, fu, ao], [n + i, -1, bu, ao * 0.7]]) {
      for (let k = 0; k < 3; k++) { xyz[3 * slot + k] = pos[3 * i + k] + sign * T * nr[3 * i + k]; col[3 * slot + k] = shade; }
      uv[2 * slot] = u; uv[2 * slot + 1] = fv;
    }
    if (ring[i] >= 0) {
      const hole = p.open?.(s.P[2 * i], s.P[2 * i + 1]);
      for (let k = 0; k < 3; k++) { xyz[3 * ring[i] + k] = pos[3 * i + k] + T * (hole ? 0.2 : 0.6) * out[3 * i + k]; col[3 * ring[i] + k] = hole ? 0.08 : ao; }
      uv[2 * ring[i]] = fu; uv[2 * ring[i] + 1] = fv;
    }
  }
  const idx = [...s.tris];
  for (let t = 0; t < s.tris.length; t += 3) idx.push(n + s.tris[t + 2], n + s.tris[t + 1], n + s.tris[t]);
  for (let e = 0; e < s.rim.length; e += 4) {
    const a = s.rim[e], c = s.rim[e + 1], ma = ring[a], mc = ring[c];
    idx.push(a, ma, mc, a, mc, c, ma, n + a, n + c, ma, n + c, mc);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(xyz, 3)); geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setIndex(idx); geo.computeVertexNormals();
  const map = texture(p, b);
  const mesh = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ map, bumpMap: map, bumpScale: 3, vertexColors: true, roughness: 0.92, sheen: 1, sheenRoughness: 0.5, sheenColor: new THREE.Color(p.base).lerp(new THREE.Color('#ffffff'), 0.15) }));
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

// how much of the pile rises around a point: the folds and the gaps between pieces go dark
function occlusion(field, x, y, z) {
  let o = 0;
  for (const r of [0.025, 0.06, 0.12]) for (let k = 0; k < 8; k++) o += Math.min(1, Math.max(0, field.at(x + r * Math.cos(k * Math.PI / 4), z + r * Math.sin(k * Math.PI / 4)) - y) / r);
  return 1 - 0.9 * o / 24;
}

// a soft shadow on the carpet round the pile, where the room light can't reach under the cloth
function contactShadow(field) {
  const n = field.n, a = Object.assign(document.createElement('canvas'), { width: n, height: n }), d = a.getContext('2d').createImageData(n, n);
  for (let k = 0; k < n * n; k++) { d.data[4 * k] = d.data[4 * k + 1] = d.data[4 * k + 2] = field.h[k] > 0 ? 255 : 0; d.data[4 * k + 3] = 255; }
  a.getContext('2d').putImageData(d, 0, 0);
  const c = Object.assign(document.createElement('canvas'), { width: n, height: n }), x = c.getContext('2d');
  x.filter = 'blur(3px)'; x.drawImage(a, 0, 0);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(n * RES, n * RES), new THREE.MeshBasicMaterial({ color: '#000', alphaMap: new THREE.CanvasTexture(c), transparent: true, opacity: 0.45, depthWrite: false }));
  m.position.set(C[0], 0.0015, C[1]); m.rotation.x = -Math.PI / 2;
  return m;
}

export async function laundry(g) {
  const all = new Float32Array(await (await fetch('assets/laundry.bin')).arrayBuffer()), field = heightField();
  let at = 0;
  const landed = PIECES.map(p => {
    const s = sheet(p.outline, p.h), pos = all.subarray(at, at += 3 * s.n);
    field.stamp(pos, s.tris, p.thick / 2);
    return [p, s, pos];
  });
  for (const [p, s, pos] of landed) g.add(garment(p, s, pos, field));
  g.add(contactShadow(field));
}
