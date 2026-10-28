// A Pudgie's pizza in its box at the foot of the bed. Pudgie's, the Southern Tier chain, bakes it in a sheet: soft, thick dough cut into
// squares, melted cheese browned in spots over red sauce, and here one half under cupped pepperoni. Half the squares are gone already.
// The box opens on its back edge; a square you click is eaten, and its grease stain stays on the cardboard.
import * as THREE from 'three';
import { grease } from './textures.js';

const COLS = 8, ROWS = 6, S = 0.052, T = 0.02, PW = COLS * S, PD = ROWS * S;   // the squares: 5.2 cm across, 2 cm of dough
const BW = 0.46, BD = 0.35, BH = 0.045, SHEET = 0.003;   // the box, and its cardboard
const GONE = ['0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '1,0', '1,1', '1,2', '1,3', '1,4', '1,5', '6,0', '6,1', '6,2', '7,0', '7,1', '7,2', '2,5', '3,0', '5,4', '4,1'];
const PEPPERONI = c => c >= 4;   // the right half
const R = Math.random;

function canvas(w, h, draw) {
  const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}
const blob = (x, px, py, r) => { x.beginPath(); x.ellipse(px, py, r * (0.6 + R() * 0.8), r * (0.6 + R() * 0.8), R() * Math.PI, 0, Math.PI * 2); x.fill(); };
const soft = (x, px, py, r, rgb, a) => { const g = x.createRadialGradient(px, py, 0, px, py, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`); x.fillStyle = g; x.fillRect(px - r, py - r, 2 * r, 2 * r); };   // melted things have no edges

function sheetTop(cups) {   // the top of the whole sheet, one picture across all the squares, 25 px a centimetre
  return canvas(1040, 780, (x, w, h) => {
    x.fillStyle = '#a8301a'; x.fillRect(0, 0, w, h);
    for (let k = 0; k < 500; k++) soft(x, R() * w, R() * h, 10 + R() * 30, `${180 + R() * 50 | 0},${40 + R() * 35 | 0},${18 + R() * 15 | 0}`, 0.3 + R() * 0.35);
    for (let k = 0; k < 1400; k++) soft(x, R() * w, R() * h, 16 + R() * 34, `${238 + R() * 14 | 0},${186 + R() * 32 | 0},${88 + R() * 52 | 0}`, 0.3 + R() * 0.4);   // the cheese, melted golden, sauce showing between
    for (let k = 0; k < 200; k++) soft(x, R() * w, R() * h, 12 + R() * 26, '232,138,38', 0.15 + R() * 0.2);   // oil
    for (let k = 0; k < 1700; k++) {   // browning in leopard spots, thicker toward the crust
      const px = R() * w, py = R() * h, edge = Math.min(px, py, w - px, h - py) / (h / 2);
      if (R() < edge * 0.6) continue;
      const r = 2 + R() ** 2 * 14;   // mostly small, a few big blisters
      if (r > 9) soft(x, px, py, r * 1.8, '205,130,50', 0.35);   // a blister browns the cheese round it
      x.fillStyle = R() < 0.25 ? `rgba(${110 + R() * 30 | 0},${55 + R() * 20 | 0},20,${0.45 + R() * 0.4})` : `rgba(${170 + R() * 40 | 0},${95 + R() * 35 | 0},${35 + R() * 20 | 0},${0.35 + R() * 0.45})`;
      for (let n = 0; n < 3; n++) blob(x, px + (R() - 0.5) * r, py + (R() - 0.5) * r, r * (0.4 + R() * 0.5));   // a ragged cluster, not a dot
    }
    for (const [u, v] of cups) {   // grease pooled round each pepperoni
      const cx = u * w, cy = v * h, g = x.createRadialGradient(cx, cy, 18, cx, cy, 44);
      g.addColorStop(0, 'rgba(235,120,25,.6)'); g.addColorStop(1, 'rgba(235,120,25,0)'); x.fillStyle = g; x.fillRect(cx - 44, cy - 44, 88, 88);
    }
    for (const [ax, ay, bx, by, rx, ry, rw, rh] of [[0, 0, 0, 34, 0, 0, w, 34], [0, h, 0, h - 34, 0, h - 34, w, 34], [0, 0, 34, 0, 0, 0, 34, h], [w, 0, w - 34, 0, w - 34, 0, 34, h]]) {
      const g = x.createLinearGradient(ax, ay, bx, by);   // the crust: dark where it baked against the pan, then golden
      g.addColorStop(0, '#7a3f16'); g.addColorStop(0.3, '#b8732f'); g.addColorStop(0.65, '#d9a050'); g.addColorStop(1, 'rgba(217,160,80,0)'); x.fillStyle = g; x.fillRect(rx, ry, rw, rh);
    }
  });
}
const cutSide = () => canvas(64, 64, (x, w, h) => {   // where a square was cut from the next: cheese, sauce, the soft crumb, the baked bottom
  for (const [y0, y1, col] of [[0, 0.12, '#f0d38c'], [0.12, 0.28, '#b9381d'], [0.28, 0.85, '#ead8a8'], [0.85, 1, '#8b5424']]) { x.fillStyle = col; x.fillRect(0, y0 * h, w, (y1 - y0) * h); }
  for (let k = 0; k < 60; k++) { x.fillStyle = `rgba(160,120,60,${R() * 0.4})`; x.fillRect(R() * w, (0.3 + R() * 0.5) * h, 1 + R() * 2, 1 + R() * 2); }   // the holes in the crumb
});

function stain(x, col, row, cw, ch) {   // a square's grease on the cardboard, a little bigger than the square, and a few crumbs
  const px = ((-PW / 2 + col * S) + BW / 2) / BW * cw, py = ((-PD / 2 + row * S) + BD / 2) / BD * ch, s = S / BW * cw;
  x.fillStyle = 'rgba(205,115,35,.32)'; x.beginPath(); x.roundRect(px - 3, py - 3, s + 6, s * BW / BD * ch / cw + 6, 10); x.fill();
  for (let k = 0; k < 14; k++) { x.fillStyle = `rgba(${120 + R() * 60 | 0},${70 + R() * 30 | 0},30,${0.4 + R() * 0.5})`; x.fillRect(px + R() * s, py + R() * s, 2 + R() * 3, 2 + R() * 3); }
}

export function pudgies(g, x, z, rotY) {
  const box = new THREE.Group(); box.position.set(x, 0, z); box.rotation.y = rotY; g.add(box);
  const orange = new THREE.MeshStandardMaterial({ color: '#e8743a', roughness: 0.9 }), kraft = new THREE.MeshStandardMaterial({ color: '#c9a274', roughness: 0.9 });
  const part = (geo, mats, px, py, pz, parent = box) => { const m = new THREE.Mesh(geo, mats); m.position.set(px, py, pz); m.castShadow = m.receiveShadow = true; parent.add(m); return m; };
  const floorC = Object.assign(document.createElement('canvas'), { width: 920, height: 700 }), floorX = floorC.getContext('2d'), floorT = new THREE.CanvasTexture(floorC);
  floorT.colorSpace = THREE.SRGBColorSpace;
  floorX.fillStyle = '#c9a274'; floorX.fillRect(0, 0, 920, 700);
  for (let k = 0; k < 900; k++) { floorX.fillStyle = `rgba(110,80,40,${R() * 0.12})`; floorX.fillRect(R() * 920, R() * 700, 6 + R() * 18, 1); }   // the fibres of the board
  for (const k of GONE) stain(floorX, ...k.split(',').map(Number), 920, 700);
  part(new THREE.BoxGeometry(BW, SHEET, BD), [orange, orange, new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.85 }), orange, orange, orange], 0, SHEET / 2, 0);
  for (const [w, d, px, pz, out] of [[BW, SHEET, 0, BD / 2 - SHEET / 2, 4], [BW, SHEET, 0, -BD / 2 + SHEET / 2, 5], [SHEET, BD, BW / 2 - SHEET / 2, 0, 0], [SHEET, BD, -BW / 2 + SHEET / 2, 0, 1]]) {
    part(new THREE.BoxGeometry(w, BH, d), [0, 1, 2, 3, 4, 5].map(i => (i === out ? orange : kraft)), px, BH / 2, pz);   // orange outside, kraft inside
  }
  // the lid, hinged along the back edge: the 1972 print on top with grease soaked through it, grease spots and drips underneath
  const hinge = new THREE.Group(); hinge.position.set(0, BH, -BD / 2); box.add(hinge);
  const print = canvas(920, 700, () => {}), art = new Image();   // the square 1972 print in the middle of the lid, its orange carried out to the edges
  art.onload = () => {
    const x2 = print.image.getContext('2d');
    x2.drawImage(art, 110, 0, 700, 700);
    const [r, gg, b] = x2.getImageData(118, 350, 1, 1).data;
    x2.fillStyle = `rgb(${r},${gg},${b})`; x2.fillRect(0, 0, 112, 700); x2.fillRect(808, 0, 112, 700);
    print.needsUpdate = true;
  };
  art.src = 'assets/pudgies.jpg';   // a photo of a real box, so it needs a licence before this is public
  const under = canvas(460, 350, (x2, w, h) => {
    x2.fillStyle = '#c9a274'; x2.fillRect(0, 0, w, h);
    for (let k = 0; k < 9; k++) { x2.fillStyle = `rgba(200,110,30,${0.15 + R() * 0.25})`; blob(x2, R() * w, h * (0.55 + R() * 0.4), 6 + R() * 18); }
    for (let k = 0; k < 7; k++) { const px = 40 + R() * (w - 80); x2.fillStyle = 'rgba(160,85,25,.35)'; x2.fillRect(px, h - 30 - R() * 60, 3, 30 + R() * 50); }   // drips, from when the box stood on its end
  });
  const lid = part(new THREE.BoxGeometry(BW, SHEET, BD), [orange, orange, new THREE.MeshStandardMaterial({ map: print, roughness: 0.85 }), new THREE.MeshStandardMaterial({ map: under, roughness: 0.9 }), orange, orange], 0, SHEET / 2, BD / 2, hinge);
  part(new THREE.PlaneGeometry(BW * 0.9, BD * 0.9).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ map: grease(), transparent: true, depthWrite: false, roughness: 0.5 }), 0, SHEET / 2 + 0.0004, 0, lid).castShadow = false;
  // the squares: each domed a little, the dough risen, and the crust round the outside puffed up higher
  const cups = [], squares = [];
  for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
    if (GONE.includes(`${c},${r}`) || !PEPPERONI(c)) continue;
    for (const [ox, oz] of [[-0.22, -0.2], [0.21, -0.24], [-0.2, 0.22], [0.24, 0.18], ...(R() < 0.4 ? [[0, 0]] : [])]) cups.push([(c + 0.5 + ox + (R() - 0.5) * 0.22) / COLS, (r + 0.5 + oz + (R() - 0.5) * 0.22) / ROWS]);   // four or five, overlapping
  }
  const top = new THREE.MeshStandardMaterial({ map: sheetTop(cups), roughness: 0.55 }), side = new THREE.MeshStandardMaterial({ map: cutSide(), roughness: 0.8 }), bottom = new THREE.MeshStandardMaterial({ color: '#8b5424', roughness: 0.8 });
  const pep = new THREE.MeshStandardMaterial({ roughness: 0.4, side: THREE.DoubleSide, map: canvas(4, 32, (x2, w, h) => {   // two-sided: from above you look into the cup
    const gr = x2.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#3e1007'); gr.addColorStop(0.25, '#7a1e0e'); gr.addColorStop(0.6, '#a32c18'); gr.addColorStop(1, '#b8361d');   // the rim crisp and dark, the middle red
    x2.fillStyle = gr; x2.fillRect(0, 0, w, h);
  }) });
  const pool = new THREE.CircleGeometry(0.0028, 16).rotateX(-Math.PI / 2), oil = new THREE.MeshStandardMaterial({ color: '#c4521a', roughness: 0.08, transparent: true, opacity: 0.7 });   // the grease each cup holds
  const cup = new THREE.LatheGeometry([[0.0005, 0.0012], [0.006, 0.0016], [0.009, 0.003], [0.0102, 0.0041], [0.0104, 0.0035], [0.0097, 0.003]].map(([a, b]) => new THREE.Vector2(a, b)), 18);   // 2 cm across, curled up at the rim, as they do
  const rise = (px, pz) => {   // how far the top stands above flat, anywhere on the sheet
    const u = ((px + PW / 2) / S) % 1 * 2 - 1, v = ((pz + PD / 2) / S) % 1 * 2 - 1, edge = Math.max(0, Math.max(Math.abs(px) / (PW / 2), Math.abs(pz) / (PD / 2)) - 0.9) / 0.1;
    return 0.003 * (1 - u * u) * (1 - v * v) + 0.005 * Math.min(1, edge);
  };
  for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
    if (GONE.includes(`${c},${r}`)) continue;
    const geo = new THREE.BoxGeometry(S - 0.0016, T, S - 0.0016, 6, 1, 6), p = geo.attributes.position, n = geo.attributes.normal, uv = geo.attributes.uv;
    const cx = -PW / 2 + (c + 0.5) * S, cz = -PD / 2 + (r + 0.5) * S;
    for (let i = 0; i < p.count; i++) {
      if (p.getY(i) < 0) continue;
      const px = cx + p.getX(i), pz = cz + p.getZ(i);
      p.setY(i, T / 2 + rise(px, pz));
      if (n.getY(i) > 0.9) uv.setXY(i, (px + PW / 2) / PW, 1 - (pz + PD / 2) / PD);   // the top: its own piece of the sheet's picture
    }
    geo.computeVertexNormals();
    const sq = part(geo, [side, side, top, bottom, side, side], cx + (R() - 0.5) * 0.003, SHEET + T / 2, cz + (R() - 0.5) * 0.003);
    sq.rotation.y = (R() - 0.5) * 0.05;   // cut by hand, not quite square
    sq.userData.at = [c, r];
    if (PEPPERONI(c)) cups.filter(([u, v]) => Math.floor(u * COLS) === c && Math.floor(v * ROWS) === r).forEach(([u, v], k) => {
      const px = -PW / 2 + u * PW, pz = -PD / 2 + v * PD, floor = Math.max(...[[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].map(([a, b]) => rise(px + a * 0.01, pz + b * 0.01)));   // on the highest point under its rim, so the crust can't bury it
      const p = part(cup, pep, px - cx, T / 2 + floor - 0.0006 + 0.0004 * k, pz - cz, sq);   // each a hair above the last where they overlap
      p.rotation.y = R() * 6;
      part(pool, oil, 0, 0.0017, 0, p);
    });
    squares.push(sq);
  }

  let open = 0, last;
  const bites = [];
  return {
    group: box, squares,
    open(on) { open = on ? 1 : 0; },
    eat(o) {   // whatever was clicked: the square, or a pepperoni on it
      while (o && !squares.includes(o)) o = o.parent;
      if (!o) return null;
      squares.splice(squares.indexOf(o), 1); bites.push({ o, t: 0 });
      stain(floorX, ...o.userData.at, 920, 700); floorT.needsUpdate = true;
      return squares.length;
    },
    tick(t) {
      const dt = Math.min(0.05, t - (last ?? t)); last = t;
      hinge.rotation.x += (-1.95 * open - hinge.rotation.x) * Math.min(1, dt * 6);   // a little past upright, leaning back
      for (const b of bites) {   // up toward you, smaller, gone
        b.t += dt; b.o.position.y += dt * 0.5; b.o.scale.setScalar(Math.max(0.01, 1 - b.t * 2.6));
        if (b.t > 0.38) b.o.removeFromParent();
      }
      while (bites[0]?.t > 0.38) bites.shift();
    },
  };
}
