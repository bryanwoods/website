// The mini fridge under the window, as it was in October: a black cube of 2003 with a door that opens, a light, a wire shelf, a freezer box
// grown shut with frost, and two forties.
import * as THREE from 'three';
import { canvas } from './room.js';

const label = (w, h, draw) => canvas(w, h, draw);

// a forty: ENLogic's photo of an Olde English 800 (Wikimedia Commons, CC BY-SA 4.0; on the licence list). Its outline, traced row by row as
// [photo row, half its width in pixels], is spun into the glass, and the photo is laid onto the front of it, straight on, as it was taken.
// A real forty is 30 cm by 8.4 cm; the photo is a little wider than that. It stands on its base, 0 to 0.3 m up its y axis
// The glass ends at the rim of its mouth, with the dark inside of the neck; the cap is its own piece, from the photo's row 25.5 up, so it
// can come off
const GLASS = [[374, 0], [374, 39.5], [371, 43], [368, 46], [360, 51.5], [355, 54.5], [345, 57.5], [140, 59], [130, 58.5], [120, 55], [110, 51], [100, 47.5], [90, 45],
  [80, 39.5], [70, 35.5], [60, 32], [50, 26.5], [45, 24], [40, 20.5], [36, 18], [30, 16], [27, 16], [25.5, 15.5], [25.5, 11], [30, 10.5], [30, 0]];
const CAP = [[25.5, 0], [25.5, 19.2], [24, 19], [16, 19.5], [8, 17.5], [5, 16], [3, 12], [2.5, 0]];
const H = 0.3 / 371.5, R = 0.042 / 59;
let glass = null;
export function forty(full = 1) {   // full: how much is left, 1 to 0
  if (!glass) {
    const lathe = rows => {
      const geo = new THREE.LatheGeometry(rows.map(([y, w]) => new THREE.Vector2(w * R, (374 - y) * H)), 48), p = geo.attributes.position, uv = geo.attributes.uv;
      for (let i = 0; i < p.count; i++) uv.setXY(i, (168 + p.getX(i) / R * 0.97) / 340, 1 - Math.min(362, 374 - p.getY(i) / H) / 375);   // the base, from the gold just above it: below row 362 is the photo's white
      return geo;
    };
    const map = new THREE.TextureLoader().load('assets/olde-english.jpg'); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
    glass = { body: lathe(GLASS), cap: lathe(CAP), map, mouth: new THREE.CircleGeometry(10.5 * R, 20).rotateX(-Math.PI / 2).translate(0, (374 - 29.5) * H, 0) };
  }
  // the photo's own studio light, which is close to a fridge's. Above the level the gold goes to clear glass: the liquid runs from the photo's
  // row 366 to row 62, and the paper label from row 176 to row 316 stays as it is
  const mat = new THREE.MeshBasicMaterial({ map: glass.map, toneMapped: false }), level = { value: full };
  mat.onBeforeCompile = sh => {
    sh.uniforms.level = level;
    sh.fragmentShader = 'uniform float level;\n' + sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
      float top = mix(0.024, 0.835, level);
      if (vMapUv.y > top && vMapUv.y < 0.835 && (vMapUv.y < 0.157 || vMapUv.y > 0.531)) diffuseColor.rgb = mix(vec3(dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11))), vec3(0.92), 0.6);`);
  };
  const m = new THREE.Mesh(glass.body, mat), cap = new THREE.Mesh(glass.cap, mat);
  m.add(new THREE.Mesh(glass.mouth, new THREE.MeshBasicMaterial({ color: '#2a1d0c' })), cap);
  m.castShadow = cap.castShadow = true; Object.assign(m.userData, { level, cap });
  return m;
}

export function buildFridge(g) {
  const black = new THREE.MeshStandardMaterial({ color: '#151515', roughness: 0.32, metalness: 0.1 }), none = new THREE.MeshBasicMaterial({ visible: false });
  const liner = new THREE.MeshStandardMaterial({ color: '#eceff1', roughness: 0.55 }), grey = new THREE.MeshStandardMaterial({ color: '#b9bec4', roughness: 0.4, metalness: 0.5 });
  const fridge = new THREE.Group(); fridge.position.set(0, 0, -2.07); g.add(fridge);
  const box = (w, h, d, mat, x, y, z, parent = fridge) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; parent.add(m); return m; };

  // the case with no front, its white inside, and the rim round the opening
  box(0.48, 0.5, 0.45, [black, black, black, black, none, black], 0, 0.27, 0);
  const inside = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.4), new THREE.MeshStandardMaterial({ color: '#eceff1', roughness: 0.55, side: THREE.BackSide })); inside.position.set(0, 0.27, 0.02); fridge.add(inside);
  for (const [w, h, x, y] of [[0.48, 0.03, 0, 0.505], [0.48, 0.03, 0, 0.035], [0.03, 0.5, -0.225, 0.27], [0.03, 0.5, 0.225, 0.27]]) box(w, h, 0.012, black, x, y, 0.219);
  for (let i = 0; i < 9; i++) box(0.41, 0.004, 0.004, grey, 0, 0.25, -0.17 + i * 0.045);   // the wire shelf
  for (const x of [-0.204, 0.204]) box(0.004, 0.006, 0.39, grey, x, 0.25, 0.01);
  const frost = label(256, 128, (x, w, h) => {   // the freezer's flap, under a skin of frost that has grown over its edges
    x.fillStyle = '#c9d3da'; x.fillRect(0, 0, w, h); x.fillStyle = '#9aa6b0'; x.fillRect(w / 2 - 30, 10, 60, 8);
    for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.5})`; const e = Math.random() < 0.6, px = e ? (Math.random() < 0.5 ? Math.random() * 30 : w - Math.random() * 30) : Math.random() * w; x.beginPath(); x.arc(px, Math.random() * h, 1 + Math.random() * 5, 0, 7); x.fill(); }
  });
  box(0.26, 0.11, 0.36, new THREE.MeshStandardMaterial({ color: '#f4f8fb', roughness: 0.95 }), -0.07, 0.425, 0.01);   // grown over with frost
  box(0.25, 0.1, 0.008, new THREE.MeshStandardMaterial({ map: frost, roughness: 0.7 }), -0.07, 0.425, 0.195);
  for (const [fx, fz] of [[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.19], [0.2, 0.19]]) box(0.03, 0.02, 0.03, black, fx, 0.01, fz);
  const light = new THREE.PointLight('#f2f6ff', 0, 0.7, 1.5); light.position.set(0.12, 0.44, 0.05); fridge.add(light);

  // the door, hinged on the left: black outside, grey inside with its empty shelves, the handle a groove along the top
  const door = new THREE.Group(); door.position.set(-0.235, 0, 0.235); fridge.add(door);
  box(0.47, 0.49, 0.02, [black, black, black, black, black, liner], 0.235, 0.27, 0, door);
  box(0.3, 0.015, 0.012, new THREE.MeshStandardMaterial({ color: '#333', roughness: 0.6 }), 0.235, 0.49, 0.013, door);
  box(0.06, 0.012, 0.002, new THREE.MeshStandardMaterial({ color: '#b8bcc0', metalness: 0.9, roughness: 0.3 }), 0.065, 0.08, 0.011, door);   // the maker's badge
  for (const y of [0.1, 0.3]) { box(0.4, 0.012, 0.07, liner, 0.235, y, -0.045, door); box(0.4, 0.04, 0.006, liner, 0.235, y + 0.02, -0.08, door); }

  // and in it, nothing but two forties, on their sides because that is the only way they fit: one on the floor, one on the shelf
  const forties = [[0.092, 0.06, 0.12, -0.55], [0.296, 0.1, -0.08, -0.55]].map(([y, z, yaw, roll]) => {
    const body = forty(); body.rotation.y = roll;   // rolled a little, so the label looks up at you
    const lying = new THREE.Group(); lying.position.set(-0.15, y, z); lying.rotation.set(0, yaw, -Math.PI / 2); lying.add(body); fridge.add(lying);
    body.userData.forty = true;
    return lying;
  });
  const items = forties.map(f => f.children[0]);

  const front = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.52, 0.5), none); front.position.set(0, 0.27, 0.02); fridge.add(front);   // a click anywhere on it, shut
  return { door, light, items, front, forties };
}
