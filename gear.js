// The black Squier Strat and the Fender Frontman 10G practice amp, between the dresser and the bookshelf, plugged in.
// Their faces are photos of used ones from eBay listings: they need a licence before this is public.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// strat.jpg is a 520 x 1180 crop of the photo; the outlines below are traced in the photo's own pixels
const photo = (rx = 1, ry = 1, ox = 0, oy = 0) => {
  const t = new THREE.TextureLoader().load('assets/gear/strat.jpg');
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.repeat.set(rx, ry); t.offset.set(ox, oy);
  return t;
};
const uvAt = (x, y) => [(x - 300) / 520, 1 - (y - 100) / 1180];
const BODY = [[550, 1256], [640, 1250], [720, 1230], [765, 1200], [783, 1165], [780, 1120], [765, 1070], [748, 1020], [735, 960], [732, 900], [737, 845], [743, 800],
  [738, 760], [725, 738], [708, 733], [697, 742], [690, 770], [672, 793], [645, 820], [610, 818], [595, 812], [517, 765], [500, 758], [470, 752], [445, 738], [430, 712],
  [424, 680], [418, 655], [398, 650], [383, 670], [376, 700], [374, 745], [376, 790], [372, 840], [365, 900], [352, 980], [340, 1060], [334, 1130], [338, 1180], [360, 1220], [410, 1246], [480, 1256]];
const HEAD = [[521, 284], [570, 284], [580, 272], [590, 260], [596, 248], [598, 230], [596, 212], [590, 195], [587, 182], [591, 172], [600, 162], [603, 150], [600, 138],
  [592, 129], [580, 125], [567, 127], [558, 132], [552, 141], [547, 152], [540, 171], [532, 190], [525, 210], [518, 230], [512, 250], [507, 265], [509, 276], [515, 282]];
const TUNERS = [[532, 147], [525, 170], [517, 191], [510, 211], [501, 234], [495, 255]];
const KNOBS = [[635, 1025], [692, 1055], [745, 1100]];
const T = 0.045, SX = 0.000709, SY = 0.00066;   // the photo is a little narrow: the guitar was turned from the camera
const HX = 0.00086, HY = 0.0011;                // and the headstock leans away from it
const YS = 0.106, YN = YS + 0.648, YJ = (1256 - 745) * SY;   // the saddles, the nut (a 25.5 inch scale), the end of the fretboard

function add(parent, geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; parent.add(m); return m;
}
// a smooth outline through traced points, pulled in a little toward (cx, cy) so the photo's background never shows at the edge
const outline = (pts, cx, cy) => new THREE.Shape(new THREE.SplineCurve([...pts, pts[0]].map(([x, y]) => new THREE.Vector2(cx + (x - cx) * 0.975, cy + (y - cy) * 0.975))).getPoints(160));
// a board from y0 to y1 that narrows from w0 to w1, between z0 and z1
function slab(w0, w1, y0, y1, z0, z1) {
  const geo = new THREE.BoxGeometry(1, 1, 1), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { const k = p.getY(i) + 0.5; p.setXYZ(i, p.getX(i) * (w0 + (w1 - w0) * k), y0 + (y1 - y0) * k, z0 + (z1 - z0) * (p.getZ(i) + 0.5)); }
  geo.computeVertexNormals();
  return geo;
}

// built standing up, the back of the body on z = 0 and the face toward +z, the bottom of the body at the origin
function strat() {
  const g = new THREE.Group(), gloss = { roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.08 };
  const black = new THREE.MeshPhysicalMaterial({ color: '#0c0c0e', ...gloss }), chrome = new THREE.MeshStandardMaterial({ color: '#e4e6ea', metalness: 0.9, roughness: 0.2, envMapIntensity: 4 });
  const body = outline(BODY.map(([x, y]) => [(x - 553) * SX, (1256 - y) * SY]), 0, 0.17), bev = 0.004;
  add(g, new THREE.ExtrudeGeometry(body, { depth: T - 2 * bev, bevelThickness: bev, bevelSize: bev, bevelSegments: 4, curveSegments: 1 }).translate(0, 0, bev),
    [new THREE.MeshPhysicalMaterial({ map: photo(1 / (SX * 520), 1 / (SY * 1180), 253 / 520, 24 / 1180), ...gloss }), black]);
  const maple = new THREE.MeshStandardMaterial({ color: '#d9ad6c', roughness: 0.35 }), rosewood = new THREE.MeshStandardMaterial({ color: '#2a1810', roughness: 0.6 });
  add(g, slab(0.056, 0.042, YJ, YN, T - 0.012, T + 0.006), maple);
  const fretboard = slab(0.056, 0.042, YJ, YN, T + 0.006, T + 0.012), uv = fretboard.attributes.uv;
  for (let i = 16; i < 20; i++) uv.setXY(i, ...uvAt(uv.getX(i) ? (uv.getY(i) ? 570 : 595) : (uv.getY(i) ? 521 : 517), uv.getY(i) ? 290 : 745));   // the +z face: the fretboard in the photo
  add(g, fretboard, [rosewood, rosewood, rosewood, rosewood, new THREE.MeshStandardMaterial({ map: photo(), roughness: 0.5 }), rosewood]);
  add(g, new THREE.BoxGeometry(0.043, 0.004, 0.006), new THREE.MeshStandardMaterial({ color: '#f2efe6', roughness: 0.4 }), 0, YN, T + 0.011);   // the nut
  const head = outline(HEAD.map(([x, y]) => [(x - 545.6) * HX, (284 - y) * HY]), 0, 0.09);
  add(g, new THREE.ExtrudeGeometry(head, { depth: 0.011, bevelThickness: 0.0015, bevelSize: 0.0015, bevelSegments: 2, curveSegments: 1 }),
    [new THREE.MeshStandardMaterial({ map: photo(1 / (HX * 520), 1 / (HY * 1180), 245.6 / 520, 996 / 1180), roughness: 0.35 }), maple], 0, YN - 0.004, T - 0.0065);
  for (const [x, y] of TUNERS) add(g, new RoundedBoxGeometry(0.013, 0.009, 0.005, 2, 0.002), chrome, (x - 545.6) * HX - 0.004, YN - 0.004 + (284 - y) * HY, T - 0.004);
  for (const [x, y] of KNOBS) add(g, new THREE.CylinderGeometry(0.0095, 0.011, 0.014, 20).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#ece6d6', roughness: 0.4 }), (x - 553) * SX, (1256 - y) * SY, T + 0.007);
  const strings = [];
  [510, 524, 537.5, 552.5, 566, 580].forEach((x, i) => strings.push((x - 553) * SX, YS, T + 0.011, (i - 2.5) * 0.0072, YN, T + 0.0135));
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(strings, 3)), new THREE.LineBasicMaterial({ color: '#b8b8b8', transparent: true, opacity: 0.45 })));
  return g;
}

// the amp built facing +z, standing on the origin: worn black tolex, the photo's front, a strap handle, and scuffed corner caps
function frontman() {
  const a = new THREE.Group(), W = 0.28, H = 0.26, D = 0.146;
  const tolex = new THREE.MeshStandardMaterial({ color: '#19191a', roughness: 0.8 }), worn = new THREE.MeshStandardMaterial({ color: '#c2b89c', metalness: 0.6, roughness: 0.45 });
  add(a, new RoundedBoxGeometry(W, H, D, 3, 0.012), tolex, 0, H / 2, 0);
  const face = new THREE.TextureLoader().load('assets/gear/frontman.jpg'); face.colorSpace = THREE.SRGBColorSpace; face.anisotropy = 8;
  add(a, new THREE.PlaneGeometry(0.245, 0.226), new THREE.MeshStandardMaterial({ map: face, roughness: 0.6 }), 0, 0.127, D / 2 + 0.0005);
  add(a, new THREE.TorusGeometry(0.055, 0.006, 6, 20, Math.PI).scale(1, 0.4, 2.2), tolex, 0, H, 0);
  for (const s of [-1, 1]) add(a, new RoundedBoxGeometry(0.03, 0.006, 0.035, 2, 0.002), worn, s * 0.055, H + 0.002, 0);
  for (const x of [-1, 1]) for (const y of [0, 1]) for (const z of [-1, 1]) add(a, new RoundedBoxGeometry(0.022, 0.022, 0.022, 2, 0.007), worn, x * (W / 2 - 0.0095), 0.0095 + y * (H - 0.019), z * (D / 2 - 0.0095));
  return a;
}

// the guitar leans on the end of the dresser, its headstock against the top; the amp stands in the corner, turned to the room
export function guitarAndAmp(g) {
  const gtr = strat(); gtr.position.set(-1.58, 0, 0.058); gtr.rotation.x = -0.1; g.add(gtr);
  const amp = frontman(); amp.position.set(-1.68, 0, 0.28); amp.rotation.y = 1.22; g.add(amp);
  gtr.updateMatrixWorld(); amp.updateMatrixWorld();
  const jack = gtr.localToWorld(new THREE.Vector3(0.0936, 0.0634, T + 0.01)), input = amp.localToWorld(new THREE.Vector3(-0.115, 0.226, 0.08));
  const lead = new THREE.CatmullRomCurve3([jack, jack.clone().add(new THREE.Vector3(0.02, -0.02, 0.05)), new THREE.Vector3(-1.42, 0.005, 0.22), new THREE.Vector3(-1.33, 0.005, 0.33),
    new THREE.Vector3(-1.38, 0.005, 0.45), new THREE.Vector3(-1.5, 0.05, 0.43), input.clone().add(new THREE.Vector3(0.03, -0.01, 0.01)), input]);
  add(g, new THREE.TubeGeometry(lead, 120, 0.0032, 6), new THREE.MeshStandardMaterial({ color: '#141414', roughness: 0.5 }));
  return gtr;
}
