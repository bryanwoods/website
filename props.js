// Everything in the room. Poly Haven models (CC0) where one fits; the 90s things are built here.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { WINDOW } from './room.js';
import { newt } from './newt.js';
import { guitarAndAmp } from './gear.js';
import { iversons } from './sneakers.js';
import { muskaDeck } from './skateboard.js';
import { laundry } from './laundry.js';
import { pudgies } from './pizza.js';
import { screenTexture, framedNews, backboardTexture, magazineSpread, homeworkPage, cigarLabel, plaidTexture, spineColors, bookSpines, cdSpine, cdShine, pcBezel, netTexture, vfd, ventLid, trophyPlate, dollarBill, maskingTape } from './textures.js';

const M = {
  beige: new THREE.MeshStandardMaterial({ color: '#d8cfb8', roughness: 0.55 }),
  beigeDark: new THREE.MeshStandardMaterial({ color: '#bdb39b', roughness: 0.6 }),
  black: new THREE.MeshStandardMaterial({ color: '#1f1f22', roughness: 0.45 }),
  silver: new THREE.MeshStandardMaterial({ color: '#b8bcc2', metalness: 0.65, roughness: 0.35 }),
  gold: new THREE.MeshStandardMaterial({ color: '#f0c454', metalness: 0.75, roughness: 0.28, envMapIntensity: 8 }),   // full metal goes brown here: the room's reflections are dim
  marble: new THREE.MeshStandardMaterial({ color: '#efece6', roughness: 0.35 }),
  wood: new THREE.MeshStandardMaterial({ color: '#7a4a28', roughness: 0.6 }),
  cardboard: new THREE.MeshStandardMaterial({ color: '#c49a64', roughness: 0.9 }),
};
const oak = (() => {
  const t = new THREE.TextureLoader(), load = (s, srgb) => {
    const x = t.load(`assets/textures/laminate_floor_${s}.jpg`); x.wrapS = x.wrapT = THREE.RepeatWrapping; x.repeat.set(1.2, 0.6);
    if (srgb) x.colorSpace = THREE.SRGBColorSpace; return x;
  };
  return new THREE.MeshStandardMaterial({ map: load('diff', true), normalMap: load('nor'), roughnessMap: load('rough'), color: '#e8c79a', roughness: 0.55 });
})();

function add(parent, geo, mat, x, y, z, rot = [0, 0, 0]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z); m.rotation.set(...rot);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  return m;
}
const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const img = path => { const t = new THREE.TextureLoader().load(path); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const R = (w, h, d, r = 0.008) => new RoundedBoxGeometry(w, h, d, 3, r);

// a 90s particleboard computer desk with a keyboard tray
function desk(g) {
  const x0 = -1.75, x1 = -0.25, d = 0.62, z = -2.0 + d / 2, top = 0.74;
  add(g, R(x1 - x0, 0.025, d, 0.01), oak, (x0 + x1) / 2, top - 0.0125, z);
  add(g, R(0.02, top - 0.025, d, 0.006), oak, x0 + 0.01, (top - 0.025) / 2, z);
  add(g, R(0.02, top - 0.025, d, 0.006), oak, x1 - 0.01, (top - 0.025) / 2, z);
  add(g, R(x1 - x0 - 0.04, 0.4, 0.015, 0.005), oak, (x0 + x1) / 2, top - 0.25, -1.99);
  add(g, R(0.66, 0.018, 0.34, 0.007), oak, -1.05, 0.655, -1.53);                       // the tray, pulled out
  return { top, front: -2.0 + d };
}

function computer(g, top) {
  // CRT: a rounded front bezel and a deep back, and a screen that bulges a little
  const cx = -1.05, cz = -1.8;
  add(g, R(0.4, 0.37, 0.09, 0.02), M.beige, cx, top + 0.035 + 0.185, cz + 0.12);
  add(g, R(0.32, 0.29, 0.3, 0.03), M.beige, cx, top + 0.035 + 0.17, cz - 0.07);
  add(g, R(0.25, 0.035, 0.22, 0.01), M.beige, cx, top + 0.0175, cz);           // the swivel foot
  const sg = new THREE.PlaneGeometry(0.315, 0.24, 16, 12), p = sg.attributes.position;
  for (let i = 0; i < p.count; i++) { const u = p.getX(i) / 0.16, v = p.getY(i) / 0.12; p.setZ(i, 0.012 * (1 - 0.5 * (u * u + v * v))); }
  sg.computeVertexNormals();
  const screen = add(g, sg, new THREE.MeshStandardMaterial({ color: '#050806', emissive: '#ffffff', emissiveMap: screenTexture(), emissiveIntensity: 0.9, roughness: 0.15, metalness: 0 }),
    cx, top + 0.035 + 0.19, cz + 0.166);
  screen.castShadow = false;
  add(g, R(0.03, 0.012, 0.004, 0.002), M.beigeDark, cx + 0.15, top + 0.05, cz + 0.166);    // power button
  const led = add(g, new THREE.SphereGeometry(0.003, 8, 6), new THREE.MeshBasicMaterial({ color: '#4dff6a' }), cx + 0.12, top + 0.05, cz + 0.166);
  led.castShadow = false;
  for (const s of [-1, 1]) {   // little beige speakers
    add(g, R(0.085, 0.17, 0.1, 0.01), M.beige, cx + s * 0.29, top + 0.085, cz + 0.08);
    add(g, new THREE.CircleGeometry(0.028, 24), M.beigeDark, cx + s * 0.29, top + 0.11, cz + 0.131);
  }
  // keyboard on the tray, with every key
  const kb = new THREE.Group(); kb.position.set(-1.07, 0.664, -1.48); kb.rotation.x = 0.06; g.add(kb);
  add(kb, R(0.46, 0.028, 0.165, 0.006), M.beige, 0, 0.014, 0);
  const keys = new THREE.InstancedMesh(R(0.016, 0.009, 0.016, 0.002), new THREE.MeshStandardMaterial({ color: '#e9e2cf', roughness: 0.6 }), 110);
  keys.castShadow = true;
  const m4 = new THREE.Matrix4(); let k = 0;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 15; c++) { m4.setPosition(-0.205 + c * 0.0185, 0.032, -0.06 + r * 0.021); keys.setMatrixAt(k++, m4); }
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) { m4.setPosition(0.135 + c * 0.0185, 0.032, -0.039 + r * 0.021); keys.setMatrixAt(k++, m4); }
  keys.count = k; kb.add(keys);
  add(g, B(0.2, 0.003, 0.17), new THREE.MeshStandardMaterial({ color: '#2b4f8f', roughness: 0.9 }), -0.82, 0.666, -1.5);      // mouse pad
  add(g, R(0.06, 0.03, 0.105, 0.012), M.beige, -0.82, 0.682, -1.5);
  // the tower, on the floor under the right end of the desk: a beige mini-tower with its front bezel, drive tray, power button, and lights
  add(g, R(0.19, 0.43, 0.46, 0.01), M.beige, -0.47, 0.215, -1.72);
  add(g, R(0.186, 0.426, 0.012, 0.004), [M.beige, M.beige, M.beige, M.beige, new THREE.MeshStandardMaterial({ map: pcBezel(), roughness: 0.55 }), M.beige], -0.47, 0.215, -1.487);
  add(g, R(0.145, 0.012, 0.006, 0.002), M.beigeDark, -0.47, 0.387, -1.479);
  add(g, R(0.044, 0.036, 0.008, 0.004), M.beigeDark, -0.47, 0.189, -1.479);
  for (const [dx, c] of [[-0.0237, '#4dff6a'], [0.0237, '#ffb020']]) add(g, new THREE.SphereGeometry(0.002, 8, 6), new THREE.MeshBasicMaterial({ color: c }), -0.47 + dx, 0.1306, -1.4805).castShadow = false;
  return { screen };
}

// a floor-standing CD tower, cases stacked flat with their spines out
function cdTower(g) {
  const x = -0.06, z = -1.86, h = 1.02;
  for (const s of [-1, 1]) add(g, R(0.016, h, 0.15, 0.004), M.black, x + s * 0.082, h / 2, z);
  add(g, R(0.18, 0.02, 0.17, 0.006), M.black, x, 0.01, z);
  add(g, R(0.18, 0.016, 0.15, 0.005), M.black, x, h, z);
  const n = 84, cases = new THREE.InstancedMesh(B(0.142, 0.0102, 0.124), new THREE.MeshStandardMaterial({ map: cdSpine(), roughness: 0.3 }), n);
  cases.castShadow = cases.receiveShadow = true;
  const cols = spineColors(n, ['#1d1d1d', '#d9d4c7', '#b8322a', '#2a4b8d', '#e8c23a', '#3d7a4a', '#7a3f8f', '#ff7a2a', '#9aa5ad']);
  const m4 = new THREE.Matrix4();
  let y = 0.03, i = 0;
  while (i < n && y < h - 0.03) {
    if (Math.random() < 0.06) { y += 0.012; continue; }   // a gap where a CD is in the changer
    m4.makeRotationY((Math.random() < 0.3 ? Math.PI : 0) + (Math.random() - 0.5) * 0.04);   // some put back the wrong way round
    m4.setPosition(x, y, z + (Math.random() - 0.5) * 0.01 + 0.012);
    cases.setMatrixAt(i, m4); cases.setColorAt(i, cols[i]); i++; y += 0.0112;
  }
  cases.count = i; g.add(cases);
}

// red Solo cups and clear ones, some with diet soda still in them
const CUP = [[0, 0.002], [0.028, 0], [0.0305, 0.004], [0.034, 0.035], [0.035, 0.039], [0.0385, 0.07], [0.0395, 0.074], [0.0435, 0.105], [0.0445, 0.109], [0.047, 0.118], [0.0485, 0.12], [0.047, 0.1215]].map(([r, y]) => new THREE.Vector2(r, y));
const cupGeo = new THREE.LatheGeometry(CUP, 40);
const cupMats = {
  red: [new THREE.MeshStandardMaterial({ color: '#c3161c', roughness: 0.32 }), new THREE.MeshStandardMaterial({ color: '#f1efe8', roughness: 0.4, side: THREE.BackSide })],
  clear: [new THREE.MeshPhysicalMaterial({ color: '#e8f2f6', roughness: 0.08, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false })],
};
const soda = new THREE.MeshStandardMaterial({ color: '#3a1a0a', roughness: 0.1, transparent: true, opacity: 0.85 });
function cup(g, kind, x, y, z, { fill = 0, tip = 0, rotY = 0 } = {}) {
  const c = new THREE.Group(); c.position.set(x, y, z); c.rotation.set(tip, rotY, 0);
  for (const m of cupMats[kind]) { const mesh = new THREE.Mesh(cupGeo, m); mesh.castShadow = kind === 'red'; mesh.receiveShadow = true; c.add(mesh); }
  if (fill > 0) {
    const h = 0.11 * fill, r = 0.029 + 0.016 * fill;
    const s = new THREE.Mesh(new THREE.CylinderGeometry(r, 0.028, h, 32), soda); s.position.y = 0.004 + h / 2; c.add(s);
  }
  g.add(c);
  return c;
}

// youth soccer trophies, built at unit height: a gold plastic player about to kick, and a two-handled cup; both face +z
function bone(a, b, ra, rb) {   // a tapered limb from joint a to joint b, with a round joint at each end
  const A = new THREE.Vector3(...a), d = new THREE.Vector3(...b).sub(A), m = A.clone().addScaledVector(d, 0.5);
  const geo = new THREE.CylinderGeometry(rb, ra, d.length(), 12).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()));
  return [geo.translate(m.x, m.y, m.z), new THREE.SphereGeometry(ra, 12, 8).translate(...a), new THREE.SphereGeometry(rb, 12, 8).translate(...b)];
}
const kicker = mergeGeometries([   // the right leg cocked back to kick, the left arm out in front for balance
  new THREE.CylinderGeometry(0.2, 0.22, 0.06, 24).translate(0, 0.03, 0),
  ...bone([-0.06, 0.5, 0], [-0.07, 0.29, 0.03], 0.05, 0.038), ...bone([-0.07, 0.29, 0.03], [-0.07, 0.1, 0], 0.036, 0.027), ...bone([-0.07, 0.09, 0], [-0.07, 0.075, 0.08], 0.03, 0.022),
  ...bone([0.06, 0.5, 0], [0.07, 0.31, -0.09], 0.05, 0.038), ...bone([0.07, 0.31, -0.09], [0.07, 0.37, -0.27], 0.036, 0.027), ...bone([0.07, 0.37, -0.27], [0.07, 0.4, -0.34], 0.03, 0.022),
  ...bone([0, 0.55, 0], [0, 0.42, 0], 0.1, 0.13),
  ...bone([0, 0.53, 0], [0, 0.78, 0.04], 0.095, 0.115), ...bone([-0.12, 0.79, 0.04], [0.12, 0.79, 0.04], 0.045, 0.045), ...bone([0, 0.8, 0.04], [0, 0.88, 0.05], 0.035, 0.035),
  new THREE.SphereGeometry(0.068, 16, 12).scale(1, 1.12, 1).translate(0, 0.945, 0.06),
  ...bone([-0.13, 0.79, 0.04], [-0.24, 0.66, 0.1], 0.032, 0.027), ...bone([-0.24, 0.66, 0.1], [-0.3, 0.56, 0.19], 0.026, 0.022),
  ...bone([0.13, 0.79, 0.04], [0.24, 0.68, -0.05], 0.032, 0.027), ...bone([0.24, 0.68, -0.05], [0.3, 0.6, -0.14], 0.026, 0.022),
  new THREE.SphereGeometry(0.085, 16, 12).translate(-0.02, 0.145, 0.2),
]);
const trophyCup = mergeGeometries([
  new THREE.LatheGeometry([[0, 0], [0.3, 0], [0.3, 0.05], [0.12, 0.09], [0.06, 0.2], [0.06, 0.32], [0.14, 0.38], [0.32, 0.55], [0.42, 0.82], [0.45, 1]].map(([r, y]) => new THREE.Vector2(r, y)), 32),
  ...[-1, 1].map(s => new THREE.TorusGeometry(0.17, 0.03, 8, 20, Math.PI).rotateZ(-s * Math.PI / 2).translate(s * 0.4, 0.68, 0)),
]);
const sailboat = mergeGeometries([   // a sloop under sail, a unit high: the hull, the mast, the mainsail, and the jib
  new THREE.ExtrudeGeometry(new THREE.Shape([[-0.42, 0.16], [0.44, 0.16], [0.36, 0.06], [0.22, 0], [-0.3, 0.01], [-0.4, 0.06]].map(([a, c]) => new THREE.Vector2(a, c))), { depth: 0.14, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 2 }).translate(0, 0, -0.07),
  new THREE.CylinderGeometry(0.014, 0.016, 0.86, 10).translate(0.04, 0.58, 0).toNonIndexed(),
  new THREE.ExtrudeGeometry(new THREE.Shape([[0.02, 0.22], [0.02, 0.98], [-0.34, 0.22]].map(([a, c]) => new THREE.Vector2(a, c))), { depth: 0.012, bevelEnabled: false }).translate(0, 0, -0.006),
  new THREE.ExtrudeGeometry(new THREE.Shape([[0.06, 0.24], [0.06, 0.86], [0.42, 0.2]].map(([a, c]) => new THREE.Vector2(a, c))), { depth: 0.012, bevelEnabled: false }).translate(0, 0, -0.006),
]);
const flutes = new THREE.CylinderGeometry(0.011, 0.011, 1, 48);   // the column, fluted like the foil risers
for (let i = 0, p = flutes.attributes.position; i < p.count; i++) {
  const k = 1 + 0.15 * Math.max(0, Math.cos(Math.atan2(p.getZ(i), p.getX(i)) * 12));
  p.setXYZ(i, p.getX(i) * k, p.getY(i), p.getZ(i) * k);
}
flutes.computeVertexNormals();

function trophy(g, x, y, z, h, kind, color = '#2a63c9', lines = ['HORSEHEADS YOUTH SOCCER', '1997']) {
  const t = new THREE.Group(); t.position.set(x, y, z); t.rotation.y = Math.PI / 4 + (Math.random() - 0.5) * 0.5; g.add(t);   // turned toward the room
  t.userData = { lines, h };   // what its plate says, and how tall it is, for when it's picked up
  const long = lines.length > 2, bh = long ? 0.036 : 0.026, b = bh - 0.026;   // four lines of engraving need a taller base and a bigger plate
  add(t, R(0.075, bh, 0.075, 0.003), M.marble, 0, bh / 2, 0);
  add(t, new THREE.PlaneGeometry(long ? 0.064 : 0.045, long ? 0.03 : 0.014), new THREE.MeshStandardMaterial({ map: trophyPlate(lines), metalness: 0.6, roughness: 0.3, envMapIntensity: 6 }), 0, bh / 2, 0.0377);
  const top = kind === 'cup' ? 0.45 * h : 0.3 * h + 0.02, col = h - 0.038 - top;
  const trim = new THREE.CylinderGeometry(0.016, 0.017, 0.006, 24);
  add(t, trim, M.gold, 0, b + 0.029, 0);
  add(t, flutes, new THREE.MeshStandardMaterial({ color, metalness: 0.7, roughness: 0.22, envMapIntensity: 6 }), 0, b + 0.032 + col / 2, 0).scale.y = col;
  add(t, trim, M.gold, 0, b + 0.035 + col, 0);
  const topper = add(t, { cup: trophyCup, boat: sailboat }[kind] ?? kicker, M.gold, 0, b + 0.038 + col, 0);
  topper.scale.setScalar(top);
  if (kind !== 'cup') topper.rotation.y = kind === 'boat' ? 0.35 : 1;   // the player in three-quarter profile, so the kick reads; the boat nearly side on, so the sails do
  return t;
}

// a 90s oak-laminate dresser to match the desk, against the left wall
function buildDresser(g) {
  const x0 = -1.8, d = 0.44, w = 0.96, h = 0.8, z = -0.5, x = x0 + d / 2;
  add(g, R(d, h - 0.03, w, 0.006), oak, x, (h - 0.03) / 2, z);
  add(g, R(d + 0.02, 0.03, w + 0.03, 0.012), oak, x + 0.01, h - 0.015, z);
  const knob = new THREE.SphereGeometry(0.013, 16, 12), brass = new THREE.MeshStandardMaterial({ color: '#c9a24a', metalness: 0.9, roughness: 0.3 });
  for (let r = 0; r < 3; r++) {
    const y = 0.13 + r * 0.22;
    add(g, R(0.02, 0.2, w - 0.05, 0.007), oak, x0 + d + 0.008, y + 0.02, z);                  // drawer fronts
    for (const s of [-1, 1]) add(g, knob, brass, x0 + d + 0.026, y + 0.02, z + s * 0.24);
  }
  return { box: { max: { x: x0 + d, y: h }, min: { z: z - w / 2 } } };
}

// an Aiwa NSX-V20 shelf system: a three-CD changer on top, a dual cassette deck below, two speakers in grille cloth.
// Its front is a photo of a used one from an eBay listing, so it needs a licence before this is public. The display is lit, playing CD 2.
function hifi(g, x, y, z, rotY) {
  const h = new THREE.Group(); h.position.set(x, y, z); h.rotation.y = rotY; g.add(h);
  const body = new THREE.MeshStandardMaterial({ color: '#2a2a2c', roughness: 0.5 });
  add(h, R(0.27, 0.28, 0.3, 0.008), body, 0, 0.14, -0.01);
  add(h, new THREE.PlaneGeometry(0.27, 0.28), new THREE.MeshStandardMaterial({ map: img('assets/gear/aiwa.jpg'), color: '#b4b4b4', roughness: 0.45 }), 0, 0.14, 0.1405);
  add(h, new THREE.PlaneGeometry(0.151, 0.043), new THREE.MeshBasicMaterial({ map: vfd(), transparent: true, blending: THREE.AdditiveBlending, toneMapped: false }), -0.027, 0.1875, 0.1412).castShadow = false;
  add(h, R(0.2, 0.004, 0.2, 0.0015), new THREE.MeshStandardMaterial({ color: '#141416', roughness: 0.08 }), 0, 0.281, -0.02);   // the smoked lid of the changer
  for (const s of [-1, 1]) {
    add(h, R(0.14, 0.26, 0.2, 0.006), body, s * 0.21, 0.13, -0.02);
    add(h, new THREE.PlaneGeometry(0.128, 0.248), new THREE.MeshStandardMaterial({ color: '#1c1c1e', map: weave, bumpMap: weave, bumpScale: 2, roughness: 1 }), s * 0.21, 0.13, 0.0805);   // grille cloth
    add(h, R(0.03, 0.007, 0.003, 0.001), M.silver, s * 0.21, 0.025, 0.082);   // the badge
  }
}

function cigarBox(g, x, y, z) {
  const c = new THREE.Group(); c.position.set(x, y, z); c.rotation.y = 0.35; g.add(c);
  const w = 0.22, d = 0.15, h = 0.05, t = 0.006;
  add(c, B(w, t, d), M.wood, 0, t / 2, 0);
  add(c, B(w, h, t), M.wood, 0, h / 2, d / 2 - t / 2); add(c, B(w, h, t), M.wood, 0, h / 2, -d / 2 + t / 2);
  add(c, B(t, h, d), M.wood, w / 2 - t / 2, h / 2, 0); add(c, B(t, h, d), M.wood, -w / 2 + t / 2, h / 2, 0);
  const hinge = new THREE.Group(); hinge.position.set(0, h, -d / 2); hinge.rotation.x = -1.95; c.add(hinge);   // lid flung open
  add(hinge, B(w, t, d), [M.wood, M.wood, new THREE.MeshStandardMaterial({ map: cigarLabel(), roughness: 0.6 }), M.wood, M.wood, M.wood], 0, 0, d / 2);
  const cards = spineColors(9, ['#f1ece0', '#e4d6b0', '#d8e3ea']);
  cards.forEach((col, i) => add(c, B(0.064, 0.002, 0.089), new THREE.MeshStandardMaterial({ color: col, roughness: 0.7 }), -0.05 + (i % 3) * 0.03, 0.012 + i * 0.0025, (i % 2) * 0.01, [0, (Math.random() - 0.5) * 0.4, 0]));
  add(c, new THREE.SphereGeometry(0.009, 16, 12), new THREE.MeshPhysicalMaterial({ color: '#3b7dd8', roughness: 0.05, transmission: 0.3 }), 0.07, 0.016, -0.03);   // a marble
  add(c, new THREE.SphereGeometry(0.03, 24, 16), new THREE.MeshStandardMaterial({ color: '#f3efe6', roughness: 0.6 }), 0.13, 0.03, 0.05);         // a baseball, rolled out
}

// a mini hoop screwed to the wall: a clear acrylic backboard on four standoffs, an orange steel rim on its bracket, net hooks, a white nylon net
function hoop(g, x, y) {
  const h = new THREE.Group(); g.add(h);   // its own group, so a click on any part of it finds the hoop
  const z = -2.0, orange = new THREE.MeshStandardMaterial({ color: '#e2501f', roughness: 0.35, metalness: 0.3 });
  const acrylic = new THREE.MeshPhysicalMaterial({ map: backboardTexture(), transparent: true, roughness: 0.05, clearcoat: 1, envMapIntensity: 3 });
  const edge = new THREE.MeshPhysicalMaterial({ color: '#dfe9ec', transparent: true, opacity: 0.6, roughness: 0.05 });
  add(h, B(0.46, 0.32, 0.006), [edge, edge, edge, edge, acrylic, acrylic], x, y, z + 0.03).castShadow = false;
  for (const [u, v] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) add(h, new THREE.CylinderGeometry(0.006, 0.006, 0.027, 12).rotateX(Math.PI / 2), M.silver, x + u * 0.2, y + v * 0.13, z + 0.0135);
  const ry = y - 0.12, rz = z + 0.035 + 0.11;
  add(h, R(0.09, 0.06, 0.012, 0.003), orange, x, ry + 0.01, z + 0.039);   // the mounting plate
  add(h, R(0.03, 0.012, 0.075, 0.003), orange, x, ry - 0.002, z + 0.075);   // the bracket out to the rim
  add(h, new THREE.TorusGeometry(0.105, 0.0075, 12, 48), orange, x, ry, rz, [Math.PI / 2, 0, 0]);
  for (let k = 0; k < 12; k++) { const a = (k + 0.5) / 12 * Math.PI * 2; add(h, new THREE.TorusGeometry(0.006, 0.0015, 6, 10), M.silver, x + Math.sin(a) * 0.105, ry - 0.008, rz + Math.cos(a) * 0.105, [0, a + Math.PI / 2, 0]); }
  const net = add(h, new THREE.LatheGeometry([[0.104, 0], [0.098, -0.04], [0.085, -0.1], [0.07, -0.16]].map(([r, h]) => new THREE.Vector2(r, h)), 24),
    new THREE.MeshStandardMaterial({ map: netTexture(), alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.85 }), x, ry - 0.006, rz);
  return { group: h, net, rim: new THREE.Vector3(x, ry, rz), board: new THREE.Box3(new THREE.Vector3(x - 0.23, y - 0.16, z), new THREE.Vector3(x + 0.23, y + 0.16, z + 0.033)) };
}

const weave = (() => {   // a fine, uneven weave, tinted by each piece's colour
  const t = new THREE.CanvasTexture(Object.assign(document.createElement('canvas'), { width: 128, height: 128 }));
  const x = t.image.getContext('2d'), d = x.createImageData(128, 128);
  for (let i = 0; i < d.data.length; i += 4) { const v = 205 + Math.random() * 50; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  x.putImageData(d, 0, 0); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(5, 5);
  return t;
})();

// a sheet hung over a rail that runs along x at the origin, folded at `fold` along its length: the start hangs down the -z side,
// the rest down the +z side, in folds that deepen and gather toward the hem
function drape(w, L, fold, seed) {
  const geo = new THREE.PlaneGeometry(w, L, 48, 80), p = geo.attributes.position, r = 0.03, arc = r * Math.PI / 2;
  for (let i = 0; i < p.count; i++) {
    const s = p.getX(i), t = p.getY(i) + L / 2, side = t < fold ? -1 : 1, d = Math.abs(t - fold), e = Math.max(0, d - arc), k = Math.min(1, e / 0.25);
    const out = r + (0.003 + 0.02 * (0.65 * Math.sin(s * 19 + seed + 1.5 * Math.sin(e * 7 + s * 5)) ** 2 + 0.35 * Math.sin(s * 43 - seed + e * 4) ** 2)) * k;
    p.setXYZ(i, -s * (1 - 0.15 * k), (d < arc ? r * Math.cos(d / r) - r : -r - e) - 0.3 * s * s, side * (d < arc ? r * Math.sin(d / r) : out));   // x is mirrored, so the +z side shows the sheet's face turned upside down, not reflected
  }
  geo.computeVertexNormals();
  return geo;
}

function headphones(g, x, y, z, rotY) {
  const h = new THREE.Group(); h.position.set(x, y, z); h.rotation.set(0, rotY, 0); g.add(h);
  for (const s of [-1, 1]) {
    add(h, new THREE.CylinderGeometry(0.045, 0.045, 0.028, 28), M.black, s * 0.085, 0.014, 0);
    add(h, new THREE.CylinderGeometry(0.037, 0.04, 0.012, 28), new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 1 }), s * 0.085, 0.032, 0);
  }
  add(h, new THREE.TorusGeometry(0.085, 0.007, 8, 32, Math.PI), M.black, 0, 0.02, 0, [-Math.PI / 2 + 0.25, 0, 0]);
}

// paper that came rolled up: soft ripples, the edges lifted off the wall, and the corners curling away past the tacks
function poster(g, tex, w, h, x, y, z, rotY, tilt = 0) {
  const geo = new THREE.PlaneGeometry(w, h, 24, 32), pp = geo.attributes.position;
  for (let i = 0; i < pp.count; i++) {
    const u = pp.getX(i), v = pp.getY(i), e = Math.max(0, Math.abs(u) - w / 2 + 0.03) + Math.max(0, Math.abs(v) - h / 2 + 0.03);
    pp.setZ(i, 0.002 * (1 + Math.sin(u * 9 + v * 2 + x * 7) * Math.sin(v * 7 - u * 3)) + 6 * e * e);
  }
  geo.computeVertexNormals();
  const p = add(g, geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55 }), x, y, z, [0, rotY, tilt]);
  p.castShadow = false;
  const tack = new THREE.SphereGeometry(0.006, 10, 8), tm = new THREE.MeshStandardMaterial({ color: '#d82a2a', roughness: 0.3 });
  for (const [u, v] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
    const t = new THREE.Mesh(tack, tm); t.position.set(u * (w / 2 - 0.02), v * (h / 2 - 0.02), 0.004); p.add(t);
  }
}

// the Star-Gazette story, matted and framed in black under glass, hung a little crooked over the dresser
function framedStory(g, x, y, z) {
  const W = 0.262, H = 0.333, M = 0.025, D = 0.02, f = new THREE.Group();   // the mat, and the moulding's width and depth
  f.position.set(x, y, z); f.rotation.set(0, Math.PI / 2, 0.012); g.add(f);
  add(f, new THREE.PlaneGeometry(W, H), new THREE.MeshStandardMaterial({ map: framedNews(), roughness: 0.85 }), 0, 0, 0.004).castShadow = false;
  const black = new THREE.MeshStandardMaterial({ color: '#151515', roughness: 0.35 });
  for (const [w, h, px, py] of [[W + 2 * M, M, 0, (H + M) / 2], [W + 2 * M, M, 0, -(H + M) / 2], [M, H, -(W + M) / 2, 0], [M, H, (W + M) / 2, 0]]) add(f, R(w, h, D, 0.003), black, px, py, D / 2);
  add(f, new THREE.PlaneGeometry(W, H), new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.08, roughness: 0.05, clearcoat: 1, depthWrite: false }), 0, 0, D * 0.8).castShadow = false;   // the glass
  return f;
}

// a cool-mist humidifier on the carpet by the door, the kind every bedroom ran through a Horseheads winter: a white base with its knob and a
// green power light, a see-through blue tank about half full, the mist nozzle on top, and its cord to the outlet on the wall behind
function humidifier(g, x, z) {
  const h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.y = Math.PI; g.add(h);   // its front to the room
  const white = new THREE.MeshStandardMaterial({ color: '#ecebe5', roughness: 0.5 });
  add(h, R(0.32, 0.1, 0.19, 0.03), white, 0, 0.05, 0);
  add(h, R(0.28, 0.2, 0.17, 0.035), new THREE.MeshStandardMaterial({ color: '#4f9ff0', roughness: 0.15, transparent: true, opacity: 0.5, depthWrite: false }), 0, 0.2, 0).castShadow = false;
  add(h, R(0.265, 0.09, 0.155, 0.03), new THREE.MeshStandardMaterial({ color: '#1f6fd8', roughness: 0.1, transparent: true, opacity: 0.65, depthWrite: false }), 0, 0.15, 0).castShadow = false;   // the water
  add(h, R(0.29, 0.03, 0.18, 0.012), white, 0, 0.315, 0);
  add(h, new THREE.CylinderGeometry(0.028, 0.034, 0.05, 24), white, 0.07, 0.355, 0);
  add(h, new THREE.CircleGeometry(0.02, 20).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#2a2a2a' }), 0.07, 0.381, 0);
  add(h, new THREE.CylinderGeometry(0.02, 0.02, 0.014, 24).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#9da3a8', roughness: 0.4 }), -0.08, 0.055, 0.098);   // the knob
  add(h, new THREE.SphereGeometry(0.004, 10, 8), new THREE.MeshBasicMaterial({ color: '#3dff6a' }), 0.0, 0.07, 0.096);
  const plug = new THREE.Vector3(x - 0.22, 0.29, 1.993);   // the outlet, 30 cm up the wall
  add(g, B(0.07, 0.115, 0.006), white, plug.x, plug.y, 1.997);
  add(g, B(0.04, 0.03, 0.025), white, plug.x, plug.y + 0.02, 1.985);
  const cord = new THREE.CatmullRomCurve3([new THREE.Vector3(x + 0.12, 0.03, z + 0.09), new THREE.Vector3(x + 0.05, 0.004, z + 0.13), new THREE.Vector3(plug.x + 0.05, 0.004, 1.95), new THREE.Vector3(plug.x, 0.1, 1.975), new THREE.Vector3(plug.x, plug.y + 0.005, 1.975)]);
  add(g, new THREE.TubeGeometry(cord, 60, 0.0025, 6), white);
  // the mist: soft puffs that rise out of the nozzle, spread, drift, and thin out
  const c = Object.assign(document.createElement('canvas'), { width: 64, height: 64 }), x2 = c.getContext('2d'), rg = x2.createRadialGradient(32, 32, 0, 32, 32, 32);
  rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); x2.fillStyle = rg; x2.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c), mouth = new THREE.Vector3(x - 0.07, 0.385, z), puffs = [];   // the nozzle, turned round with the rest
  for (let i = 0; i < 26; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: '#f4f8ff', transparent: true, depthWrite: false, opacity: 0 })); s.userData.t0 = i / 26 * 3.2; g.add(s); puffs.push(s); }
  return t => {
    for (const s of puffs) {
      const a = ((t + s.userData.t0) % 3.2) / 3.2;   // each puff's age, 0 to 1
      s.position.set(mouth.x + Math.sin(t * 0.7 + s.userData.t0 * 3) * 0.03 * a, mouth.y + a * 0.42, mouth.z - a * 0.05);
      s.scale.setScalar(0.04 + a * 0.16); s.material.opacity = 0.32 * Math.sin(Math.PI * Math.min(1, a * 1.3));
    }
  };
}

// a twin captain's bed along the right wall, its head under the window, with drawers underneath
function bed(g) {
  const x0 = 0.82, x1 = 1.8, z0 = -2.0, z1 = -0.05, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, base = 0.36;
  add(g, R(x1 - x0, base, z1 - z0, 0.01), oak, cx, base / 2, cz);
  const knob = new THREE.SphereGeometry(0.014, 16, 12), brass = new THREE.MeshStandardMaterial({ color: '#c9a24a', metalness: 0.9, roughness: 0.3 });
  for (let i = 0; i < 3; i++) {   // three drawers facing the room
    const dz = z0 + 0.1 + (i + 0.5) * ((z1 - z0 - 0.2) / 3);
    add(g, R(0.02, 0.24, (z1 - z0 - 0.2) / 3 - 0.03, 0.007), oak, x0 - 0.008, base / 2, dz);
    add(g, knob, brass, x0 - 0.026, base / 2 + 0.02, dz);
  }
  add(g, R(x1 - x0, 0.78, 0.04, 0.015), oak, cx, 0.39, z0 + 0.02);                         // a low headboard, under the sill
  const fabric = new THREE.MeshStandardMaterial({ map: plaidTexture(), roughness: 0.95 });
  fabric.map.wrapS = fabric.map.wrapT = THREE.RepeatWrapping; fabric.map.repeat.set(2, 2);
  add(g, R(x1 - x0, 0.18, z1 - z0 - 0.04, 0.04), new THREE.MeshStandardMaterial({ color: '#b8cde0', roughness: 0.9 }), cx, base + 0.09, cz);   // the mattress, in a fitted sheet
  const pillow = new THREE.SphereGeometry(1, 48, 24), pp = pillow.attributes.position;   // a sphere pushed out square: plump in the middle, thin at the seam, corners like ears
  for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), z = pp.getZ(i); pp.setXYZ(i, Math.sign(x) * Math.abs(x) ** 0.35 * 0.31, pp.getY(i) * 0.065, Math.sign(z) * Math.abs(z) ** 0.35 * 0.19); }
  pillow.computeVertexNormals();
  add(g, pillow, new THREE.MeshStandardMaterial({ color: '#f2efe6', map: weave, roughness: 0.9 }), cx, base + 0.24, z0 + 0.3, [0, 0.06, 0]);
  // the comforter, kicked down: heaped in rolls toward the head, flat over the foot, hanging down the side and the foot of the bed
  fabric.side = THREE.DoubleSide;
  const cf = new THREE.PlaneGeometry(1.55, 1.45, 120, 120).rotateX(-Math.PI / 2), cp = cf.attributes.position, top = base + 0.21, half = (x1 - x0) / 2, r = 0.04, arc = r * Math.PI / 2;
  const fall = e => e < arc ? [r * Math.sin(e / r), r - r * Math.cos(e / r)] : [r, r + e - arc];   // over the rounded edge of the mattress, then straight down
  for (let i = 0; i < cp.count; i++) {
    const u = cp.getX(i), v = cp.getZ(i) + 0.725, z = -1.3 + v, eu = Math.abs(u) - half, ez = z - (z1 - 0.02);
    const flat = Math.min(1, Math.max(0, -eu / 0.12), Math.max(0, -ez / 0.12)) * Math.min(1, v / 0.06);   // the heap comes down at the edges
    const heap = (0.2 * Math.max(0, 1 - v / 0.85) ** 1.5 * (0.45 + 0.55 * Math.sin(v * 13 + u * 1.6 + 1.8 * Math.sin(u * 3.1 + 0.5)) ** 2) + 0.012 * Math.sin(u * 6 + v * 2) * Math.sin(v * 5 - u * 3)) * flat;
    const [sx, sy] = eu > 0 ? fall(eu) : [0, 0], [fz, fy] = ez > 0 ? fall(ez) : [0, 0];
    const pleatX = 0.03 * Math.min(1, Math.max(0, eu - arc) / 0.15) * Math.sin(z * 11 + 2 * Math.sin(z * 4.3) + 1.5 * Math.sin(eu * 6)) ** 2;   // folds where it hangs
    const pleatZ = 0.03 * Math.min(1, Math.max(0, ez - arc) / 0.15) * Math.sin(u * 11 + 2 * Math.sin(u * 4.3) + 1.5 * Math.sin(ez * 6)) ** 2;
    cp.setXYZ(i, Math.min(1.795, cx + Math.sign(u) * (Math.min(Math.abs(u), half) + sx + pleatX)), Math.max(0.01, top + heap - sy - fy), Math.min(z, z1 - 0.02) + fz + pleatZ);
  }
  cf.computeVertexNormals();
  add(g, cf, fabric, 0, 0, 0);
}

// the gold crucifix from Bryan's uncle's funeral, over the head of the bed: a brass cross and a bronze risen Christ, arms raised
function crucifix(g, x, y, z) {
  const c = new THREE.Group(); c.position.set(x, y, z); c.rotation.y = -Math.PI / 2; g.add(c);
  const bronze = new THREE.MeshStandardMaterial({ color: '#c99a55', metalness: 0.7, roughness: 0.4, envMapIntensity: 6 });
  add(c, B(0.0085, 0.3, 0.004), M.gold, 0, 0, 0.002);
  add(c, B(0.183, 0.0075, 0.004), M.gold, 0, 0.13, 0.002);
  add(c, new THREE.TorusGeometry(0.006, 0.0012, 8, 20), M.gold, 0, 0.157, 0.002);
  add(c, new THREE.SphereGeometry(0.0075, 16, 12), bronze, 0, 0.135, 0.008).scale.set(0.85, 1.15, 0.7);
  add(c, new THREE.CylinderGeometry(0.0115, 0.005, 0.108, 12), bronze, 0, 0.061, 0.008).scale.set(1, 1, 0.5);   // the robe, narrow at the feet
  for (const s of [-1, 1]) {
    add(c, B(0.036, 0.011, 0.005), bronze, s * 0.026, 0.118, 0.008, [0, 0, s * 0.15]);
    add(c, B(0.006, 0.02, 0.004), bronze, s * 0.045, 0.14, 0.008, [0, 0, -s * 0.2]);
  }
}

// the first dollar Bryan made, from selling ads on his Tupac fan site, behind glass in a black textured frame
function framedDollar(g, x, y, z) {
  const f = new THREE.Group(); f.position.set(x, y, z); f.rotation.y = -Math.PI / 2; g.add(f);
  const frame = new THREE.MeshStandardMaterial({ color: '#141414', roughness: 0.6, bumpMap: weave, bumpScale: 1.5 });
  for (const [w, h, px, py] of [[0.23, 0.026, 0, 0.0495], [0.23, 0.026, 0, -0.0495], [0.026, 0.125, 0.102, 0], [0.026, 0.125, -0.102, 0]]) add(f, R(w, h, 0.018, 0.004), frame, px, py, 0.009);
  add(f, B(0.2, 0.1, 0.004), M.black, 0, 0, 0.002);   // the backing
  add(f, new THREE.PlaneGeometry(0.156, 0.066), new THREE.MeshStandardMaterial({ map: dollarBill(), roughness: 0.8 }), 0, 0, 0.0045).castShadow = false;
  add(f, new THREE.PlaneGeometry(0.18, 0.075), new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.03, transparent: true, opacity: 0.12, envMapIntensity: 4 }), 0, 0, 0.012).castShadow = false;
}

// a small clear plastic critter keeper for the newt: purple gravel banked up at one end, a little water, a green vented lid; returns the newt's tick
function newtTank(g, x, y, z) {
  const t = new THREE.Group(); t.position.set(x, y, z); g.add(t);
  const L = 0.26, W = 0.15, H = 0.15, bank = u => 0.055 - 0.05 * u, water = 0.04;   // u runs 0..1 from the wall out; the water pools at the front
  const clear = new THREE.MeshPhysicalMaterial({ color: '#eef4f6', roughness: 0.2, transparent: true, opacity: 0.14, depthWrite: false, side: THREE.DoubleSide, envMapIntensity: 4 });
  const tub = add(t, B(L, H, W), [clear, clear, new THREE.MeshBasicMaterial({ visible: false }), clear, clear, clear], 0, H / 2, 0);
  tub.castShadow = false;
  tub.add(new THREE.LineSegments(new THREE.EdgesGeometry(tub.geometry), new THREE.LineBasicMaterial({ color: '#e9eff1', transparent: true, opacity: 0.55 })));   // the moulded edges are what you see of clear plastic
  const bed = B(L - 0.008, 1, W - 0.008), p = bed.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, p.getY(i) > 0 ? bank(p.getX(i) / (L - 0.008) + 0.5) : 0);
  bed.computeVertexNormals();
  add(t, bed, new THREE.MeshStandardMaterial({ color: '#4b2470', roughness: 0.6 }), 0, 0, 0);
  const pebble = new THREE.IcosahedronGeometry(0.0045, 1); pebble.deleteAttribute('normal'); pebble.deleteAttribute('uv');
  const round = mergeVertices(pebble), q = round.attributes.position;   // round and a little lumpy, so that shrunk inside they are stones, not crystals
  for (let i = 0; i < q.count; i++) { const k = 1 + (Math.random() - 0.5) * 0.22; q.setXYZ(i, q.getX(i) * k, q.getY(i) * k, q.getZ(i) * k); }
  round.computeVertexNormals();
  const n = 900, pebbles = new THREE.InstancedMesh(round, new THREE.MeshStandardMaterial({ roughness: 0.35 }), n), o = new THREE.Object3D(), col = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    o.position.set((u - 0.5) * (L - 0.014), bank(u) + Math.random() * 0.003, (Math.random() - 0.5) * (W - 0.014));
    o.rotation.set(Math.random() * 3, Math.random() * 3, 0); o.scale.set(1, 0.7, 0.9).multiplyScalar(0.7 + Math.random() * 0.6); o.updateMatrix();
    pebbles.setMatrixAt(i, o.matrix); pebbles.setColorAt(i, col.setHSL(0.75 + Math.random() * 0.04, 0.75, 0.24 + Math.random() * 0.16));
  }
  pebbles.castShadow = pebbles.receiveShadow = true; t.add(pebbles);
  add(t, B(L - 0.009, water, W - 0.009), new THREE.MeshPhysicalMaterial({ color: '#8fc4b4', roughness: 0.2, transparent: true, opacity: 0.35, depthWrite: false, envMapIntensity: 4 }), 0, water / 2, 0).castShadow = false;
  const green = new THREE.MeshStandardMaterial({ color: '#3fa34d', roughness: 0.45 });
  add(t, B(L + 0.012, 0.012, W + 0.012), [green, green, new THREE.MeshStandardMaterial({ map: ventLid(), roughness: 0.45 }), green, green, green], 0, H + 0.006, 0);
  add(t, B(0.08, 0.006, W * 0.62), green, -L * 0.28, H + 0.015, 0);   // the feeding hatch
  add(t, new THREE.PlaneGeometry(0.075, 0.02), new THREE.MeshStandardMaterial({ map: maskingTape('FIRENEWTY'), alphaTest: 0.5, roughness: 0.85 }), -0.07, 0.112, W / 2 + 0.0008).castShadow = false;   // his name, on masking tape
  return { ...newt(t, { L, W, bank, water }), glass: tub, group: t };
}

// the mess: magazines, a beanbag, CDs, homework, paper, a pizza box, cans, a hoodie, and the dishes nobody took down
const steel = new THREE.MeshStandardMaterial({ color: '#d7d9dc', metalness: 1, roughness: 0.25 });
const china = new THREE.MeshStandardMaterial({ color: '#f6f4ef', roughness: 0.22 });
const lathe = (pts, n = 40) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), n);

function magazine(g, tex, x, z, y, rotY, w = 0.21, d = 0.28) {
  const side = new THREE.MeshStandardMaterial({ color: '#f4f0e6', roughness: 0.7 }), cover = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 });
  return add(g, B(w, 0.004, d), [side, side, cover, side, side, side], x, y + 0.002, z, [0, rotY, 0]);
}

// a black vinyl beanbag, slumped: the beans settled into a wide bottom, the back pushed up against the wall,
// a hollow toward the front where you sit, six panel seams down the sides, and sharp creases where the vinyl folds
function beanbag(g, x, z) {
  const R0 = 0.4, geo = new THREE.SphereGeometry(R0, 144, 72), p = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const up = v.y / R0, a = Math.atan2(v.z, v.x), back = Math.max(0, v.z / R0), side = 1 - Math.abs(up);
    let y = up < -0.3 ? -0.3 * R0 * 0.6 + (v.y + 0.3 * R0) * 0.12 : v.y * 0.6;   // flat where it sits on the carpet
    const seat = Math.max(0, 1 - Math.hypot(v.x / 1.2, v.z + 0.1) / (R0 * 0.55)) ** 2, ring = Math.sqrt(seat) * (1 - seat);
    y += Math.max(0, up) * (back ** 1.3 * 0.2 - seat * 0.08 - 0.02 * ring * Math.abs(Math.sin(Math.atan2(v.z + 0.1, v.x) * 5)));
    const seam = Math.exp(-((Math.sin(3 * a) / 0.035) ** 2)) * (1 - Math.max(0, up) ** 3);
    const crease = (1 - Math.abs(Math.sin(a * 9 + 1.7 * Math.sin(a * 3 + up * 5) + up * 4))) ** 6;
    const fold = Math.min(1, Math.max(0, (up + 0.3) / 0.3)) * (0.3 + side);   // none where it rests on the carpet
    const wr = (1 + (0.04 * crease + 0.015 * Math.sin(a * 4 + up * 3)) * fold - 0.015 * seam) * (1 + 0.12 * Math.max(0, 0.2 - up));
    p.setXYZ(i, v.x * wr * 1.08, y, v.z * wr);
  }
  geo.computeVertexNormals(); geo.computeBoundingBox();
  return add(g, geo, new THREE.MeshPhysicalMaterial({ color: '#0a0a0c', roughness: 0.38, clearcoat: 0.7, clearcoatRoughness: 0.2, bumpMap: weave, bumpScale: 0.5 }), x, -geo.boundingBox.min.y, z, [0, Math.PI, 0]);
}

const ring = new THREE.RingGeometry(0.0075, 0.06, 48).rotateX(-Math.PI / 2);   // a CD, lying flat
function jewelCase(g, x, z, rotY, album, open = false) {
  const c = new THREE.Group(); c.position.set(x, 0, z); c.rotation.y = rotY; g.add(c);
  const clear = new THREE.MeshStandardMaterial({ color: '#cfd6dc', roughness: 0.1, transparent: true, opacity: 0.22 });
  const art = new THREE.MeshStandardMaterial({ map: img(`assets/cds/${album}.jpg`), roughness: 0.25 });
  add(c, R(0.142, 0.006, 0.125, 0.0012), M.black, 0, 0.003, 0);   // the black tray
  if (open) add(c, ring, new THREE.MeshStandardMaterial({ map: img(`assets/cds/${album}-disc.jpg`), roughness: 0.3 }), 0.004, 0.0064, 0);   // the disc in the tray
  else add(c, new THREE.PlaneGeometry(0.118, 0.118), art, 0.004, 0.0062, 0, [-Math.PI / 2, 0, 0]);   // the cover, through the lid
  const lid = new THREE.Group(); lid.position.set(-0.071, 0.006, 0); lid.rotation.z = open ? 2.95 : 0; c.add(lid);   // an open lid lies back on the carpet
  add(lid, B(0.142, 0.004, 0.125), [clear, clear, clear, art, clear, clear], 0.071, 0.002, 0);
}

// a balled-up page of homework: many flat facets at random depths. The jitter is a function of the vertex position, rounded,
// so the faces that share a vertex move it the same way and leave no cracks
const page = new THREE.MeshStandardMaterial({ map: homeworkPage(3), roughness: 0.9, flatShading: true });
function crumpled(g, x, y, z, r) {
  const geo = new THREE.IcosahedronGeometry(r, 3), p = geo.attributes.position, v = new THREE.Vector3(), seed = x * 13 + z * 7;
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = Math.sin(Math.round(v.x * 1e4) * 12.9898 + Math.round(v.y * 1e4) * 78.233 + Math.round(v.z * 1e4) * 37.719 + seed) * 43758.5453;
    v.multiplyScalar(0.72 + 0.36 * (n - Math.floor(n))); p.setXYZ(i, v.x, v.y * 0.85, v.z);
  }
  geo.computeVertexNormals();
  return add(g, geo, page, x, y + r * 0.7, z, [Math.random() * 3, Math.random() * 3, 0]);
}

// a Diet Coke can in the 80s and 90s design, the label unwrapped from a photo of a used one (it needs a licence before this is public)
const dietCoke = new THREE.MeshStandardMaterial({ map: img('assets/diet-coke.jpg'), metalness: 0.35, roughness: 0.35 });
const canEnd = new THREE.MeshStandardMaterial({ color: '#c9ccd0', metalness: 0.9, roughness: 0.3 });
function crush(m) {   // stepped on: squashed to under half its length, the sides buckled, lying on its side
  const p = m.geometry.attributes.position;
  for (let i = 0; i < p.count; i++) { const k = 1 + 0.18 * Math.sin(p.getY(i) * 60 + Math.atan2(p.getZ(i), p.getX(i)) * 3); p.setXYZ(i, p.getX(i) * k, p.getY(i) * 0.45, p.getZ(i) * k); }
  m.geometry.computeVertexNormals(); m.geometry.computeBoundingSphere();
  m.position.y = m.userData.floor + 0.0275; m.rotation.order = 'YXZ'; m.rotation.x = Math.PI / 2;
  m.userData.state = 'crushed';
}
function can(g, x, y, z, { crushed = false, lying = false, rotY = 0 } = {}) {
  const m = add(g, new THREE.CylinderGeometry(0.033, 0.033, 0.122, 32, 6), [dietCoke, canEnd, canEnd], x, y + (lying ? 0.033 : 0.061), z, [0, rotY, 0]);
  m.userData = { floor: y, state: lying ? 'empty' : 'full' };
  if (crushed) crush(m);
  else if (lying) { m.rotation.order = 'YXZ'; m.rotation.x = Math.PI / 2; }   // on its side, turned rotY on the floor
  return m;
}

function fork(g, x, y, z, rotY) {
  const f = new THREE.Group(); f.position.set(x, y, z); f.rotation.y = rotY; g.add(f);
  add(f, B(0.11, 0.003, 0.011), steel, -0.055, 0.0015, 0);
  add(f, B(0.03, 0.003, 0.02), steel, 0.015, 0.0015, 0);
  for (let k = 0; k < 4; k++) add(f, B(0.04, 0.0025, 0.003), steel, 0.05, 0.0015, -0.0075 + k * 0.005);
}

function dishes(g, top) {
  // a cereal bowl, the last of the milk gone warm, a spoon left in it
  const bx = -0.33, bz = -1.5;
  add(g, lathe([[0, 0], [0.03, 0], [0.032, 0.004], [0.05, 0.012], [0.068, 0.035], [0.075, 0.052], [0.072, 0.054], [0.065, 0.036], [0.047, 0.016], [0.028, 0.008], [0, 0.008]]), china, bx, top, bz);
  add(g, new THREE.CircleGeometry(0.052, 32), new THREE.MeshStandardMaterial({ color: '#efe8d6', roughness: 0.2 }), bx, top + 0.02, bz, [-Math.PI / 2, 0, 0]);
  for (let i = 0; i < 9; i++) add(g, new THREE.SphereGeometry(0.0065, 8, 6), new THREE.MeshStandardMaterial({ color: '#c98a3a', roughness: 0.8 }), bx + (Math.random() - 0.5) * 0.07, top + 0.021, bz + (Math.random() - 0.5) * 0.07).scale.set(1, 0.5, 1);
  const spoon = new THREE.Group(); spoon.position.set(bx + 0.02, top + 0.04, bz + 0.01); spoon.rotation.set(0, 0.6, 0.45); g.add(spoon);
  add(spoon, B(0.13, 0.003, 0.011), steel, 0.06, 0, 0);
  add(spoon, new THREE.SphereGeometry(0.018, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), steel, -0.012, 0.004, 0).scale.set(1.3, 0.45, 0.85);
  // a plate with crumbs, and the forks
  const px = -0.42, pz = -1.8;
  add(g, lathe([[0, 0], [0.07, 0], [0.075, 0.004], [0.11, 0.016], [0.112, 0.018], [0.108, 0.019], [0.07, 0.007], [0, 0.007]], 48), china, px, top, pz);
  for (let i = 0; i < 14; i++) add(g, B(0.004, 0.002, 0.003), new THREE.MeshStandardMaterial({ color: '#b07a3a', roughness: 1 }), px + (Math.random() - 0.5) * 0.11, top + 0.008, pz + (Math.random() - 0.5) * 0.11, [0, Math.random() * 3, 0]);
  fork(g, px + 0.01, top + 0.008, pz + 0.02, 0.4);
  fork(g, bx + 0.02, top, bz + 0.12, -0.3);
}

function mess(g, top) {
  // magazines on the floor, all from 1997: Thrasher and the tabloid-size Rolling Stone, fanned, one lying open
  const mags = [], papers = [], cans = [];
  [['thrasher-1997-04', 0.05, -0.15, 0.4, 'Thrasher, April 1997'], ['rollingstone-1997-04-17-beck', 0.18, -0.08, -0.3, 'Rolling Stone, April 17, 1997: Beck'], ['thrasher-1997-07', -0.12, 0.12, 1.1, 'Thrasher, July 1997'],
    ['rollingstone-1997-01-23-manson', 0.45, -0.25, 0.9, 'Rolling Stone, January 23, 1997: Marilyn Manson'], ['thrasher-1997-08-puleo', 0.3, 0.25, 2.4, 'Thrasher, August 1997: Bobby Puleo'],
    ['rollingstone-1997-09-04-rage-wutang', -0.25, -0.22, -0.7, 'Rolling Stone, September 4, 1997: Rage Against the Machine and the Wu-Tang Clan'], ['thrasher-1997-09-special-200', -0.02, 0.4, 0.25, 'Thrasher, September 1997: Special Issue 200']].forEach(([f, x, z, r, title], i) => {
    const rs = f.startsWith('rolling'), cover = `assets/magazines/${f}.jpg`;
    mags.push(Object.assign(magazine(g, img(cover), x, z, i * 0.0042, r, rs ? 0.25 : 0.21, rs ? 0.302 : 0.273), { userData: { cover, title } }));
  });
  magazine(g, magazineSpread(), 0.52, 0.08, 0, -0.5, 0.42);
  const bag = beanbag(g, 0.45, -1.58);
  // CDs out of their tower: In Utero, Relationship of Command lying open, and It's Dark and Hell Is Hot with its disc on top, and one disc loose
  jewelCase(g, -1.2, 0.06, 0.2, 'in-utero');
  jewelCase(g, -0.99, 0.13, 2.2, 'relationship-of-command', true);
  jewelCase(g, -1.13, 0.21, 2.4, 'its-dark-and-hell-is-hot');
  const disc = new THREE.MeshPhysicalMaterial({ map: cdShine(), metalness: 0.45, roughness: 0.18, iridescence: 1, iridescenceIOR: 1.3 });   // fully metal reads black in a room this dim in reflections
  const demo = add(g, ring, disc, -0.8, 0.001, 0.42);   // shiny side up: the band's demo, which plays its video like the guitar
  add(g, ring, new THREE.MeshStandardMaterial({ map: img('assets/cds/its-dark-and-hell-is-hot-disc.jpg'), roughness: 0.35 }), -1.11, 0.0135, 0.22, [0, 0.7, 0]);   // printed side up, on its case
  // the wastebasket, overflowing, and the shots that missed
  add(g, new THREE.CylinderGeometry(0.13, 0.11, 0.28, 32, 1, true), new THREE.MeshStandardMaterial({ color: '#8f9399', roughness: 0.6, side: THREE.DoubleSide }), -1.62, 0.14, -1.18);
  [[-1.64, 0.26, -1.2, 0.04], [-1.59, 0.28, -1.15, 0.035], [-1.66, 0.3, -1.13, 0.032], [-1.42, 0, -1.1, 0.035], [-1.3, 0, -1.22, 0.03], [-1.27, 0, -0.98, 0.038]].forEach(([x, y, z, r], i) => {   // each a draft that didn't make it
    papers.push(Object.assign(crumpled(g, x, y, z, r), { userData: { note: ['battle rhymes.txt', 'band names.txt', 'album ideas.txt', 'freestyle words.txt', 'earth sci lab 3.doc', 'battle rhymes.txt'][i] } }));
  });
  // homework, on the floor where it fell
  [[-0.62, -1.28, 0.5], [-0.48, -0.98, -0.3]].forEach(([x, z, r], i) => papers.push(Object.assign(add(g, new THREE.PlaneGeometry(0.21, 0.28), new THREE.MeshStandardMaterial({ map: homeworkPage(i), roughness: 0.8 }), x, 0.002 + i * 0.001, z, [-Math.PI / 2, 0, r]), { userData: { note: ['of mice and men essay.doc', 'global studies hw ch 7.doc'][i] } })));
  const pizza = pudgies(g, 1.2, 0.35, 0.35);   // at the foot of the bed
  // Diet Coke cans: on the desk, one crushed and three more strewn on the floor and the sill (and one on the CD changer)
  cans.push(can(g, -0.75, top, -1.92));
  cans.push(can(g, 0.95, 0, 0.75, { crushed: true, rotY: 0.8 }));
  cans.push(can(g, 0.08, 0, -1.05, { rotY: 2.6 }));                  // by the beanbag
  cans.push(can(g, 0.62, 0, 0.62, { lying: true, rotY: 1.3 }));      // rolled away across the carpet
  cans.push(can(g, 0.86, WINDOW.y0, -1.95, { rotY: 0.4 }));          // on the window sill, by the cup
  // Bryan's faded black Flameboy hoodie thrown over the back of the desk chair, its chest print upside down in the folds. The fabric and its
  // outline are a photo of a used one from an eBay listing, so it needs a licence before this is public
  const hoodie = new THREE.MeshStandardMaterial({ map: img('assets/flameboy.jpg'), alphaMap: new THREE.TextureLoader().load('assets/flameboy-mask.png'), alphaTest: 0.5,
    bumpMap: weave, bumpScale: 1.5, roughness: 1, side: THREE.DoubleSide });
  add(g, drape(0.78, 0.78, 0.46, 4.1), hoodie, -1.0, 0.972, -0.805, [0.18, 0, 0]);
  dishes(g, top);
  return { demo, bag, pizza, mags, papers, cans };
}

const loader = new GLTFLoader();
async function model(g, name, { x, z, y = 0, rotY = 0, scale = [1, 1, 1] }) {
  const gltf = await loader.loadAsync(`assets/models/${name}/${name}.gltf`);
  const o = gltf.scene; o.scale.set(...scale); o.rotation.y = rotY;
  o.traverse(m => { if (m.isMesh) { m.castShadow = m.receiveShadow = true; } });
  o.updateMatrixWorld(true);
  const b = new THREE.Box3().setFromObject(o), c = b.getCenter(new THREE.Vector3());
  o.position.set(x - c.x, y - b.min.y, z - c.z);   // stand it on y, centred on x, z
  g.add(o); o.updateMatrixWorld(true);
  return { o, box: new THREE.Box3().setFromObject(o) };
}

// a book at unit size, its spine to +x: a rounded spine, and boards that stand a little proud of the pages.
// uv.x is 1/32 on the plain cover, 29/32 to 3/32 across the spine, and 31/32 on the page edges (see bookSpines)
function bookGeometry(bulge, board, inset) {
  const K = 8, out = [], inn = [], nrm = [], us = [];
  const at = (x, z, nx, nz, u) => { out.push([x, z]); nrm.push([nx, nz]); us.push(u); };
  at(-0.5, -0.5, 0, -1, 1 / 32); at(0.5 - bulge, -0.5, 0, -1, 1 / 32);
  for (let k = 0; k <= K; k++) {
    const a = Math.PI * (k / K - 0.5), n = Math.hypot(Math.cos(a) / bulge, Math.sin(a) * 2);
    at(0.5 - bulge + bulge * Math.cos(a), 0.5 * Math.sin(a), Math.cos(a) / bulge / n, Math.sin(a) * 2 / n, (29 - 26 * k / K) / 32);
  }
  at(0.5 - bulge, 0.5, 0, 1, 1 / 32); at(-0.5, 0.5, 0, 1, 1 / 32);
  for (const [x, z] of out) inn.push([x < 0.5 - bulge ? x : 0.5 - bulge + (x - 0.5 + bulge) * 0.6, z * (1 - 2 * board)]);
  const pos = [], nor = [], uv = [], idx = [], quad = (a, b, c, d) => idx.push(a, b, c, b, d, c);
  const wall = (path, sign, u) => {   // the outside of the cover, or its inside, from the bottom of the book to the top
    const o = pos.length / 3;
    path.forEach(([x, z], i) => { for (const y of [-0.5, 0.5]) { pos.push(x, y, z); nor.push(sign * nrm[i][0], 0, sign * nrm[i][1]); uv.push(u ?? us[i], y + 0.5); } });
    for (let i = 0; i < path.length - 1; i++) sign > 0 ? quad(o + 2 * i, o + 2 * i + 1, o + 2 * i + 2, o + 2 * i + 3) : quad(o + 2 * i + 1, o + 2 * i, o + 2 * i + 3, o + 2 * i + 2);
  };
  wall(out, 1); wall(inn, -1, 1 / 32);
  for (const y of [-0.5, 0.5]) {   // the top and bottom edges of the boards and the spine
    const o = pos.length / 3;
    out.forEach((p, i) => { pos.push(p[0], y, p[1], inn[i][0], y, inn[i][1]); nor.push(0, Math.sign(y), 0, 0, Math.sign(y), 0); uv.push(1 / 32, 0.5, 1 / 32, 0.5); });
    for (let i = 0; i < out.length - 1; i++) y > 0 ? quad(o + 2 * i, o + 2 * i + 1, o + 2 * i + 2, o + 2 * i + 3) : quad(o + 2 * i + 1, o + 2 * i, o + 2 * i + 3, o + 2 * i + 2);
  }
  const cover = new THREE.BufferGeometry();
  cover.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); cover.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  cover.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); cover.setIndex(idx);
  const pages = B(1 - bulge - inset, 1 - 2 * inset, 1 - 2 * board - 0.01).translate((inset - bulge) / 2, 0, 0);
  pages.attributes.uv.array.fill(0.5); for (let i = 0; i < pages.attributes.uv.count; i++) pages.attributes.uv.setX(i, 31 / 32);
  return mergeGeometries([cover, pages]);
}

const BOOKS = [   // kind, share, and the ranges of height, depth, and thickness in metres
  ['paper', 0.38, [0.172, 0.19], [0.105, 0.11], [0.016, 0.04]],
  ['paper', 0.14, [0.2, 0.23], [0.13, 0.15], [0.012, 0.03]],
  ['hard', 0.28, [0.2, 0.25], [0.14, 0.17], [0.022, 0.045]],
  ['text', 0.035, [0.255, 0.28], [0.2, 0.215], [0.028, 0.045]],
  ['comp', 0.14, [0.245, 0.245], [0.19, 0.19], [0.011, 0.012]],
];
// the books Bryan loved in 12th grade, then the ones school assigned and a few for reference, each at the size of a common edition then:
// title, author, kind, spine colour, ink, height, depth, thickness
const LOVED = [
  ['THE STRANGER', 'CAMUS', 'paper', '#f2eee4', '#1a1a1a', 0.203, 0.133, 0.009], ['THE METAMORPHOSIS', 'KAFKA', 'paper', '#efe9db', '#8b2c2c', 0.175, 0.106, 0.006],
  ['WAITING FOR GODOT', 'BECKETT', 'paper', '#ebe6d8', '#b8322a', 0.203, 0.133, 0.008], ['ON THE ROAD', 'KEROUAC', 'paper', '#9fc9b3', '#1a1a1a', 0.198, 0.129, 0.02],
  ['HOWL', 'GINSBERG', 'paper', '#f4f1ea', '#111111', 0.16, 0.125, 0.005], ['KADDISH', 'GINSBERG', 'paper', '#f4f1ea', '#111111', 0.16, 0.125, 0.007],
  ['THE BEATLES', 'HUNTER DAVIES', 'paper', '#1a1a1a', '#f0c23b', 0.229, 0.152, 0.03], ['TUPAC SHAKUR', 'VIBE', 'hard', '#121212', '#f4f1ea', 0.285, 0.235, 0.018],
];
const ASSIGNED = [
  ['THE ODYSSEY', 'HOMER', 'paper', '#141414', '#e9dfc4', 0.198, 0.129, 0.034], ['THE ILIAD', 'HOMER', 'paper', '#141414', '#e9dfc4', 0.198, 0.129, 0.036],
  ['OF MICE AND MEN', 'STEINBECK', 'paper', '#2f5d8a', '#f4f1ea', 0.198, 0.129, 0.007], ['A FAREWELL TO ARMS', 'HEMINGWAY', 'paper', '#f2eee4', '#8b2c2c', 0.213, 0.14, 0.02],
  ['THE GREAT GATSBY', 'FITZGERALD', 'paper', '#1d3557', '#d8b45a', 0.203, 0.133, 0.012], ['THE CATCHER IN THE RYE', 'SALINGER', 'paper', '#7a1f1f', '#f0c23b', 0.175, 0.106, 0.016],
  ['LORD OF THE FLIES', 'GOLDING', 'paper', '#141414', '#e0702a', 0.198, 0.129, 0.014], ['TO KILL A MOCKINGBIRD', 'LEE', 'paper', '#5a3a1e', '#f0c23b', 0.175, 0.106, 0.02],
  ['1984', 'ORWELL', 'paper', '#c0392b', '#f4f1ea', 0.175, 0.106, 0.018], ['BRAVE NEW WORLD', 'HUXLEY', 'paper', '#22313f', '#f4f1ea', 0.175, 0.106, 0.015],
  ['HAMLET', 'SHAKESPEARE', 'paper', '#f2eee4', '#1a1a1a', 0.175, 0.106, 0.016], ['MACBETH', 'SHAKESPEARE', 'paper', '#f2eee4', '#1a1a1a', 0.175, 0.106, 0.013],
  ['THE CRUCIBLE', 'MILLER', 'paper', '#e9e2cf', '#8b2c2c', 0.198, 0.129, 0.01], ['DEATH OF A SALESMAN', 'MILLER', 'paper', '#2f4f3a', '#f4f1ea', 0.198, 0.129, 0.009],
  ['THE SCARLET LETTER', 'HAWTHORNE', 'paper', '#8b2c2c', '#f2eee4', 0.175, 0.106, 0.016], ['HUCKLEBERRY FINN', 'TWAIN', 'paper', '#e0702a', '#1a1a1a', 0.175, 0.106, 0.02],
  ['FRANKENSTEIN', 'SHELLEY', 'paper', '#141414', '#e9dfc4', 0.198, 0.129, 0.017], ['BEOWULF', 'HEANEY', 'paper', '#3b2a4a', '#e9dfc4', 0.203, 0.133, 0.014],
  ['THINGS FALL APART', 'ACHEBE', 'paper', '#e0702a', '#141414', 0.198, 0.129, 0.012],
  ['HORSEHEADS 1997', 'YEARBOOK', 'hard', '#1d3557', '#d8dde3', 0.285, 0.22, 0.02], ['WORLD ATLAS', '', 'hard', '#24475e', '#e9dfc4', 0.28, 0.21, 0.025],
  ["WEBSTER'S DICTIONARY", '', 'hard', '#8b2c2c', '#d8b45a', 0.245, 0.17, 0.05],
];
const span = ([a, b]) => a + Math.random() * (b - a);
function newBook() {
  let w = Math.random();
  const [kind, , h, d, t] = BOOKS.find(b => (w -= b[1]) < 0) ?? BOOKS[0];
  return { kind, h: span(h), d: span(d), t: span(t) };
}

// books on every shelf, found by casting a ray down through the shelf model: rows of spines, a book leaning into each gap, now and then a stack lying flat
function fillShelves(g, shelf) {
  const { o, box } = shelf, ray = new THREE.Raycaster(), hits = [];
  ray.set(new THREE.Vector3((box.min.x + box.max.x) / 2, box.max.y + 0.1, (box.min.z + box.max.z) / 2), new THREE.Vector3(0, -1, 0));
  for (const h of ray.intersectObject(o, true)) if (h.face && h.face.normal.clone().transformDirection(h.object.matrixWorld).y > 0.8) hits.push(h.point.y);
  const levels = [...new Set(hits.map(y => +y.toFixed(3)))].sort((a, b) => a - b).filter((y, i, a) => i === 0 || y - a[i - 1] > 0.12);
  const placed = [], e = new THREE.Euler(0, 0, 0, 'YXZ'), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  // from the beanbag you see only the end of each row nearest the dresser: the real books start every row there, the loved ones first,
  // dealt across the rows, and no textbooks come before the row is out of sight
  const shuffle = a => [...a].sort(() => Math.random() - 0.5), decks = levels.slice(1).map(() => [null]);   // the first book of a row hides behind the side of the shelf
  [...shuffle(LOVED), ...shuffle(ASSIGNED)].forEach((r, k) => decks[k % decks.length].push(r));
  const put = (b, y, z, tilt, turn) => {
    p.set(box.min.x + 0.03 + b.d / 2 + Math.random() * 0.025, y, z);   // pushed in toward the back, unevenly
    placed.push({ book: b, m: new THREE.Matrix4().compose(p, q.setFromEuler(e.set(tilt, turn, 0)), s.set(b.d, b.h, b.t)) });
  };
  levels.slice(0, -1).forEach((ly, li) => {
    const room = levels[li + 1] - ly - 0.03, end = box.max.z - 0.045;
    let z = box.min.z + 0.045, hp = 0;   // hp: the height of the upright book just before, if there is one
    const next = () => {
      const r = decks[li].shift();
      if (r) { const [title, author, kind, base, ink, h, d, t] = r; return { title, author, kind, base, ink, h, d, t }; }
      for (;;) { const b = newBook(); if (b.kind !== 'text' || z > box.min.z + 0.35) return b; }
    };
    while (placed.length < 500) {
      const b = next(), left = end - z; b.h = Math.min(b.h, room);
      if (left < b.t) break;
      if (Math.random() < 0.06 && left > 0.27) {   // a stack lying flat, spines out
        let y = ly, w = 0;
        for (let k = 3 + Math.floor(Math.random() * 4), c = b; k > 0 && y + c.t < ly + room; k--, c = next()) {
          c.h = Math.min(c.h, 0.25); put(c, y + c.t / 2, z + 0.005 + c.h / 2, Math.PI / 2, (Math.random() - 0.5) * 0.1); y += c.t; w = Math.max(w, c.h);
        }
        z += w + 0.012; hp = 0; continue;
      }
      const gap = hp && (left < b.t + 0.05 ? left - b.t : Math.random() < 0.08 ? 0.03 + Math.random() * 0.05 : 0);
      if (gap > 0.008) {   // it leans across the gap, its top against the book before
        const th = Math.asin(Math.min(0.6, gap / Math.min(b.h, hp))), foot = z + Math.sin(th) * Math.min(b.h, hp / Math.cos(th));
        put(b, ly + b.h / 2 * Math.cos(th) + b.t / 2 * Math.sin(th), foot - b.h / 2 * Math.sin(th) + b.t / 2 * Math.cos(th), -th, 0);
        z = foot + b.t * Math.cos(th) + 0.002; hp = 0; continue;
      }
      put(b, ly + b.h / 2 + 0.001, z + b.t / 2, 0, (Math.random() - 0.5) * 0.02);
      z += b.t + 0.0015; hp = b.h;
    }
  });
  const mat = new THREE.MeshStandardMaterial({ map: bookSpines(placed.map(b => b.book)), roughness: 0.6 });
  mat.onBeforeCompile = sh => { sh.vertexShader = 'attribute vec2 aCell;\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\nvMapUv = (vMapUv + aCell) / vec2(64.0, 8.0);'); };
  for (const [geo, kinds] of [[bookGeometry(0.05, 0.07, 0.015), ['hard', 'text']], [bookGeometry(0.012, 0.03, 0.004), ['paper', 'comp']]]) {
    const mine = placed.map((b, i) => [b, i]).filter(([b]) => kinds.includes(b.book.kind)), cell = new Float32Array(mine.length * 2);
    const books = new THREE.InstancedMesh(geo, mat, mine.length);
    mine.forEach(([b, i], k) => { books.setMatrixAt(k, b.m); cell[2 * k] = i % 64; cell[2 * k + 1] = 7 - Math.floor(i / 64); });
    geo.setAttribute('aCell', new THREE.InstancedBufferAttribute(cell, 2));
    books.castShadow = books.receiveShadow = true; g.add(books);
  }
  return levels;
}

export async function buildProps(scene) {
  const g = new THREE.Group(); scene.add(g);
  const { top } = desk(g);
  const { screen } = computer(g, top);
  cdTower(g);
  bed(g);
  cigarBox(g, -1.52, top, -1.62);
  headphones(g, -1.05, top + 0.35, -1.88, 0.1);   // on top of the monitor
  // the cups: on the desk, on the floor, one tipped over, a nested stack nobody took downstairs
  cup(g, 'red', -0.52, top, -1.52, { fill: 0.4 });
  cup(g, 'clear', -0.62, top, -1.86, { fill: 0.15, rotY: 1 });
  cup(g, 'red', -1.66, top, -1.48, { fill: 0 });
  cup(g, 'red', -0.3, 0.035, -1.18, { tip: Math.PI / 2 - 0.08, rotY: 0.6 });
  for (let i = 0; i < 6; i++) cup(g, 'red', -0.14, i * 0.014, -1.25, { rotY: i });
  cup(g, 'clear', 0.22, 0, 0.82, { fill: 0.3 });
  cup(g, 'red', 0.62, WINDOW.y0, -1.94, { fill: 0.2 });   // on the window sill
  poster(g, img('assets/posters/tupac.jpg'), 0.6, 0.8, -1.05, 1.66, -1.995, 0, 0.025);   // David LaChapelle's 1996 photo; needs a licence before this is public
  const news = framedStory(g, -1.799, 1.5, -0.5);
  const basket = hoop(g, -0.42, 1.62);
  await laundry(g);
  poster(g, img('assets/posters/nirvana.jpg'), 0.58, 0.91, 1.795, 1.6, -1.0, -Math.PI / 2, 0.02);   // over the bed; a licensed band photo, so it needs a licence before this is public
  crucifix(g, 1.798, 1.42, -1.62);
  framedDollar(g, 1.8, 1.5, -0.38);

  const dresser = buildDresser(g);
  const [shelf, , lamp] = await Promise.all([
    model(g, 'wooden_bookshelf_worn', { x: -1.64, z: 1.13, rotY: Math.PI / 2, scale: [1, 1, 0.55] }),   // 32 cm deep, its back on the wall
    model(g, 'painted_wooden_chair_01', { x: -1.0, z: -1.05, rotY: Math.PI }),
    model(g, 'desk_lamp_arm_01', { x: -1.6, z: -1.86, y: top, rotY: 0.6 }),
  ]);
  shelf.o.traverse(m => {   // painted blue, the grain and the knocks still showing through the paint
    if (!m.isMesh) return;
    const map = m.material.map, c = Object.assign(document.createElement('canvas'), { width: map.image.width, height: map.image.height }), x = c.getContext('2d');
    x.drawImage(map.image, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height);
    for (let i = 0; i < d.data.length; i += 4) d.data[i] = d.data[i + 1] = d.data[i + 2] = 215 + 0.45 * (d.data[i] * 0.3 + d.data[i + 1] * 0.59 + d.data[i + 2] * 0.11 - 130);
    x.putImageData(d, 0, 0);
    m.material = m.material.clone(); m.material.map = map.clone(); m.material.map.image = c; m.material.map.needsUpdate = true; m.material.color.set('#2d63c4');
  });
  fillShelves(g, shelf);
  const { demo, bag, pizza, mags, papers, cans } = mess(g, top);
  const dTop = dresser.box.max.y, dz = -0.5, dx = dresser.box.max.x - 0.24;
  hifi(g, dx + 0.02, dTop, dz + 0.01, Math.PI / 2);
  cans.push(can(g, dx + 0.05, dTop + 0.283, dz - 0.04, { rotY: 2 }));   // on top of the CD changer
  // the soccer trophies on one side of the changer, tall ones at the back, kept out from behind the speaker; the newt on the other side
  const SOCCER = 'HORSEHEADS YOUTH SOCCER';
  const trophies = [[-0.05, -0.45, 0.28, 'cup', '#2a63c9', [SOCCER, '1997']], [0.05, -0.45, 0.26, 'figure', '#c4312b', [SOCCER, '1996']], [0.15, -0.45, 0.22, 'figure', '#2a63c9', [SOCCER, '1995']],
    [0.2, -0.36, 0.13, 'figure', '#2d9a4a', [SOCCER, '1993']], [0.11, -0.36, 0.16, 'cup', '#c4312b', ['INDOOR SOCCER', '1996']],
    [0.02, -0.35, 0.2, 'boat', '#1f3a7a', ['SODUS BAY YACHT CLUB', 'JUNIOR SAILING ASSOCIATION', 'BEST 16 YEAR OLD SWIMMER', 'AGAINST 5 YEAR OLDS']]]   // up front: the proudest
    .map(([x, z, h, kind, color, lines]) => trophy(g, dx + 0.02 + x, dTop, dz + z, h, kind, color, lines));   // a season each, and the summer at Sodus Bay
  const tank = newtTank(g, dx + 0.02, dTop, dz + 0.385);
  const guitar = guitarAndAmp(g);
  await iversons(g);
  const deck = await muskaDeck(g);
  trophy(g, dx - 0.06, shelf.box.max.y, (shelf.box.min.z + shelf.box.max.z) / 2, 0.22, 'figure');
  const mist = humidifier(g, -1.05, 1.82);
  return { screen, tick: t => { tank.tick(t); mist(t); pizza.tick(t); }, tank, deck, guitar, lamp: lamp.o, hoop: basket, demo, news, bag, pizza, mags, papers, cans, crush, trophies };
}
