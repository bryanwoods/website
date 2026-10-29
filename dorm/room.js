// Room 328, Chautauqua Hall, SUNY Fredonia, fall 2003. Metres; the floor is y = 0. The window wall is z = -2.5 and looks north to Nixon
// Hall; the door to the hall is at z = 2.5. Coming in the door, Bryan's side is on the right (+x): his cubby of clothes, his bed with the blue
// comforter, and, past the head of the bed by the window, his desk with the black Dell. The roommate's side (-x) is the same furniture, bare.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const ROOM = { x0: -1.75, x1: 1.75, z0: -2.5, z1: 2.5, h: 2.45 };
export const WINDOW = { x0: -0.85, x1: 0.85, y0: 0.95, y1: 2.05, z: -2.5 };

function canvas(w, h, draw, repeat) {
  const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}
const rnd = (a, b) => a + Math.random() * (b - a);

// painted concrete block, 1.6 m square: 16 by 8 inch blocks in running bond, the joints a little sunk
const block = canvas(512, 512, (x, w, h) => {
  for (let r = 0; r < 8; r++) for (let c = -1; c < 4; c++) {
    const l = 226 + rnd(-4, 4);
    x.fillStyle = `rgb(${l + 6},${l + 2},${l - 10})`; x.fillRect(c * 128 + (r % 2) * 64, r * 64, 128, 64);
  }
  for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(0,0,0,${rnd(0.02, 0.07)})`; x.fillRect(rnd(0, w), rnd(0, h), 2, 2); }   // the pits in the block under the paint
  x.fillStyle = 'rgba(70,60,40,0.35)';
  for (let r = 0; r < 8; r++) { x.fillRect(0, r * 64, w, 4); for (let c = 0; c < 5; c++) x.fillRect(c * 128 + (r % 2) * 64 - 2, r * 64, 4, 64); }
}, [1 / 1.6, 1 / 1.6]);
// vinyl composition tile, 12 inch squares, beige with darker flecks, the odd tile a shade off
const tile = canvas(512, 512, (x, w) => {
  const s = w / 4;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const l = 196 + rnd(-8, 8);
    x.fillStyle = `rgb(${l},${l - 8},${l - 26})`; x.fillRect(c * s, r * s, s, s);
    for (let i = 0; i < 260; i++) { const k = rnd(90, 160); x.fillStyle = `rgba(${k},${k - 12},${k - 30},0.6)`; x.fillRect(c * s + rnd(0, s), r * s + rnd(0, s), rnd(1, 4), rnd(1, 3)); }
  }
  x.fillStyle = 'rgba(60,50,30,0.35)';
  for (let i = 0; i <= 4; i++) { x.fillRect(i * s - 1, 0, 2, w); x.fillRect(0, i * s - 1, w, 2); }
}, [3.5 / 1.22, 5 / 1.22]);

// the Dell's screen: an XP desktop, green hill and blue sky, the blue taskbar and the green Start button
const desktopXP = canvas(512, 384, (x, w, h) => {
  const s = x.createLinearGradient(0, 0, 0, h * 0.7); s.addColorStop(0, '#2a6fd6'); s.addColorStop(1, '#a9cdf2'); x.fillStyle = s; x.fillRect(0, 0, w, h);
  x.fillStyle = '#ffffffcc'; for (let i = 0; i < 6; i++) { x.beginPath(); x.ellipse(rnd(40, w - 40), rnd(30, 140), rnd(30, 60), rnd(8, 16), 0, 0, 7); x.fill(); }
  const g = x.createLinearGradient(0, h * 0.5, 0, h); g.addColorStop(0, '#6db33f'); g.addColorStop(1, '#2f7a1f'); x.fillStyle = g;
  x.beginPath(); x.moveTo(0, h * 0.62); x.quadraticCurveTo(w * 0.45, h * 0.38, w, h * 0.66); x.lineTo(w, h); x.lineTo(0, h); x.fill();
  const b = x.createLinearGradient(0, h - 26, 0, h); b.addColorStop(0, '#3a80f0'); b.addColorStop(1, '#1d4fc0'); x.fillStyle = b; x.fillRect(0, h - 26, w, 26);
  x.fillStyle = '#3c9a3c'; x.fillRect(0, h - 26, 92, 26); x.fillStyle = '#fff'; x.font = 'italic bold 18px Tahoma, Verdana, sans-serif'; x.fillText('start', 28, h - 7);
  x.fillStyle = '#0f8ce0'; x.fillRect(w - 80, h - 26, 80, 26); x.fillStyle = '#fff'; x.font = '12px Tahoma, sans-serif'; x.fillText('4:51 PM', w - 60, h - 9);
});
// out the window: the trees between the halls in October, and Nixon Hall's brick across the way, under a grey lake-effect sky
const outside = canvas(1024, 512, (x, w, h) => {
  const s = x.createLinearGradient(0, 0, 0, h * 0.5); s.addColorStop(0, '#b9c3cc'); s.addColorStop(1, '#dde2e4'); x.fillStyle = s; x.fillRect(0, 0, w, h);
  x.fillStyle = '#8a4a36'; x.fillRect(80, 170, 860, 300);   // the brick
  for (let r = 0; r < 4; r++) for (let c = 0; c < 14; c++) { x.fillStyle = '#2e3236'; x.fillRect(110 + c * 60, 190 + r * 70, 34, 42); x.fillStyle = '#c9c4b8'; x.fillRect(110 + c * 60, 230 + r * 70, 34, 4); }
  x.fillStyle = '#d8d2c4'; x.fillRect(80, 162, 860, 10);
  for (let i = 0; i < 70; i++) {   // the tree tops, in front of the lower floors
    const cx = rnd(-20, w + 20), cy = rnd(330, 520), r = rnd(40, 90), col = ['#c4612a', '#d9902e', '#8a9a3a', '#b8402a', '#6f7f35', '#e0b040'][i % 6];
    x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  }
});

export function buildDorm(scene) {
  const { x0, x1, z0, z1, h } = ROOM, W = WINDOW, g = new THREE.Group();
  const paint = new THREE.MeshStandardMaterial({ map: block, bumpMap: block, bumpScale: 1.5, roughness: 0.85 });
  const oak = new THREE.MeshStandardMaterial({ color: '#b98b55', roughness: 0.55 });   // the dorm furniture's oak laminate
  const darkOak = new THREE.MeshStandardMaterial({ color: '#8e6537', roughness: 0.6 });
  const metal = new THREE.MeshStandardMaterial({ color: '#4d4237', roughness: 0.5, metalness: 0.3 });   // the bronze of the window and the door frame
  const black = new THREE.MeshStandardMaterial({ color: '#141414', roughness: 0.45 });
  const box = (w, hh, d, mat, x, y, z, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, d), mat);
    m.position.set(x, y, z); m.rotation.y = ry; m.castShadow = m.receiveShadow = true; g.add(m); return m;
  };
  const wall = (pts, holes, place) => {   // a flat wall from a shape in metres, so the block is the same size everywhere
    const s = new THREE.Shape(pts.map(p => new THREE.Vector2(...p)));
    holes.forEach(hp => s.holes.push(new THREE.Path(hp.map(p => new THREE.Vector2(...p)))));
    const m = new THREE.Mesh(new THREE.ShapeGeometry(s), paint); place(m); m.receiveShadow = true; g.add(m);
  };
  const rect = (a, b, c, d) => [[a, b], [c, b], [c, d], [a, d]];

  // the shell
  wall(rect(x0, 0, x1, h), [rect(W.x0, W.y0, W.x1, W.y1)], m => { m.position.z = z0; });
  wall(rect(x0, 0, x1, h), [rect(-0.46, 0, 0.46, 2.06)], m => { m.position.z = z1; m.rotation.y = Math.PI; });
  wall(rect(z0, 0, z1, h), [], m => { m.position.x = x1; m.rotation.y = -Math.PI / 2; });
  wall(rect(-z1, 0, -z0, h), [], m => { m.position.x = x0; m.rotation.y = Math.PI / 2; });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), new THREE.MeshStandardMaterial({ map: tile, roughness: 0.35 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; g.add(floor);
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), new THREE.MeshStandardMaterial({ color: '#f1efe8', roughness: 0.95 }));
  ceiling.rotation.x = Math.PI / 2; ceiling.position.y = h; g.add(ceiling);
  const cove = new THREE.MeshStandardMaterial({ color: '#2b2622', roughness: 0.6 });   // the black rubber cove base
  box(x1 - x0, 0.1, 0.01, cove, 0, 0.05, z0 + 0.005); box(0.01, 0.1, z1 - z0, cove, x1 - 0.005, 0.05, 0); box(0.01, 0.1, z1 - z0, cove, x0 + 0.005, 0.05, 0);
  for (const s of [-1, 1]) box(1.29, 0.1, 0.01, cove, s * (0.46 + 1.29 / 2), 0.05, z1 - 0.005);

  // a thin blue rug over most of the floor, its edges turned up where it was rolled for the summer
  const rug = new THREE.PlaneGeometry(2.6, 4.4, 52, 88), rp = rug.attributes.position;
  for (let i = 0; i < rp.count; i++) {
    const x = rp.getX(i), y = rp.getY(i), edge = Math.min(1.3 - Math.abs(x), 2.2 - Math.abs(y));
    rp.setZ(i, 0.003 + (edge < 0.09 ? 0.022 * (1 - edge / 0.09) ** 2 : 0) * (0.7 + 0.3 * Math.sin(x * 9 + y * 5)));
  }
  rug.computeVertexNormals();
  const rugMap = canvas(256, 256, (x, w) => {
    x.fillStyle = '#22386a'; x.fillRect(0, 0, w, w);
    for (let i = 0; i < 9000; i++) { const l = rnd(-25, 25); x.fillStyle = `rgba(${34 + l},${56 + l},${106 + l},0.6)`; x.fillRect(rnd(0, w), rnd(0, w), 1, rnd(1, 3)); }
  }, [6, 10]);
  const rugMesh = new THREE.Mesh(rug, new THREE.MeshStandardMaterial({ map: rugMap, roughness: 1, side: THREE.DoubleSide }));
  rugMesh.rotation.x = -Math.PI / 2; rugMesh.position.z = -0.05; rugMesh.receiveShadow = true; g.add(rugMesh);

  // the window: a deep sill in the block, a bronze frame with a slider, the blinds two thirds down, and the heater under it
  const cx = 0, cy = (W.y0 + W.y1) / 2, ww = W.x1 - W.x0, wh = W.y1 - W.y0;
  box(ww, 0.03, 0.26, new THREE.MeshStandardMaterial({ color: '#cfc6b4', roughness: 0.4 }), cx, W.y0 - 0.015, z0 - 0.1);   // the sill
  box(0.02, wh, 0.22, paint, W.x0 - 0.01, cy, z0 - 0.11); box(0.02, wh, 0.22, paint, W.x1 + 0.01, cy, z0 - 0.11); box(ww, 0.02, 0.22, paint, cx, W.y1 + 0.01, z0 - 0.11);
  for (const [w2, h2, x, y] of [[ww, 0.05, cx, W.y0 + 0.025], [ww, 0.05, cx, W.y1 - 0.025], [0.05, wh, W.x0 + 0.025, cy], [0.05, wh, W.x1 - 0.025, cy], [0.04, wh, cx, cy]]) box(w2, h2, 0.05, metal, x, y, z0 - 0.2);
  const glass = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.05, transparent: true, opacity: 0.1 });
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), glass); pane.position.set(cx, cy, z0 - 0.2); g.add(pane);
  const slats = 34, low = W.y1 - 0.06 - slats * 0.022, blinds = new THREE.InstancedMesh(new THREE.BoxGeometry(ww - 0.04, 0.003, 0.025), new THREE.MeshStandardMaterial({ color: '#ece6d8', roughness: 0.5 }), slats);
  for (let i = 0; i < slats; i++) blinds.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(cx, W.y1 - 0.06 - i * 0.022, z0 - 0.06), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.75), new THREE.Vector3(1, 1, 1)));
  blinds.castShadow = true; g.add(blinds);
  box(ww - 0.02, 0.035, 0.04, new THREE.MeshStandardMaterial({ color: '#ece6d8', roughness: 0.5 }), cx, W.y1 - 0.03, z0 - 0.06);   // the head rail
  box(ww - 0.04, 0.012, 0.03, new THREE.MeshStandardMaterial({ color: '#ece6d8', roughness: 0.5 }), cx, low, z0 - 0.06);   // the bottom rail
  const heater = new THREE.MeshStandardMaterial({ color: '#d6ccb8', roughness: 0.5, metalness: 0.2 });
  box(2.4, 0.5, 0.2, heater, cx, 0.25, z0 + 0.1); box(2.4, 0.01, 0.16, black, cx, 0.505, z0 + 0.1);   // the convector and its grille
  const view = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), new THREE.MeshBasicMaterial({ map: outside }));
  view.position.set(0, 2, z0 - 30); g.add(view);

  // the door to the hall, hung on the right so it swings open toward Bryan's cubby: oak, a lever each side, the fire map inside, and outside
  // the whiteboard on its tray of markers and Bryan's name cut out of construction paper. The closer and the bronze frame stay put
  const door = new THREE.Group(), OUT = z1 + 0.0425;   // the hinge, and the door's outside face
  door.position.set(0.45, 0, z1 + 0.02); g.add(door);
  const hang = m => { door.attach(m); return m; };
  const steel = new THREE.MeshStandardMaterial({ color: '#c8c8c4', metalness: 1, roughness: 0.3 }), alu = new THREE.MeshStandardMaterial({ color: '#b9bcbf', metalness: 0.8, roughness: 0.35 });
  hang(box(0.9, 2.03, 0.045, new THREE.MeshStandardMaterial({ color: '#c39a66', roughness: 0.45 }), 0, 1.015, z1 + 0.02));
  hang(box(0.14, 0.02, 0.02, steel, -0.31, 1.0, z1 - 0.02)); hang(box(0.14, 0.02, 0.02, steel, -0.31, 1.0, OUT + 0.018));
  hang(box(0.22, 0.28, 0.005, new THREE.MeshStandardMaterial({ color: '#f4f1e6', roughness: 0.9 }), 0, 1.5, z1 - 0.005));
  for (const [w2, h2, x, y] of [[0.06, 2.1, -0.48, 1.05], [0.06, 2.1, 0.48, 1.05], [1.02, 0.06, 0, 2.08]]) { box(w2, h2, 0.08, metal, x, y, z1 - 0.02); box(w2, h2, 0.04, metal, x, y, z1 + 0.05); }
  box(0.3, 0.06, 0.06, metal, 0.2, 1.97, z1 - 0.03);
  const ink = Object.assign(document.createElement('canvas'), { width: 480, height: 640 });
  ink.getContext('2d').fillStyle = '#fbfbf8'; ink.getContext('2d').fillRect(0, 0, 480, 640);
  const inkMap = new THREE.CanvasTexture(ink); inkMap.colorSpace = THREE.SRGBColorSpace; inkMap.anisotropy = 8;
  hang(box(0.39, 0.51, 0.012, alu, 0.02, 1.45, OUT + 0.006));
  const board = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.48), new THREE.MeshStandardMaterial({ map: inkMap, emissiveMap: inkMap, emissive: '#ffffff', emissiveIntensity: 0.6, roughness: 0.25 }));   // the glow keeps the white white in the hall light
  board.position.set(0.02, 1.45, OUT + 0.0125); g.add(board); hang(board);
  hang(box(0.37, 0.012, 0.045, alu, 0.02, 1.183, OUT + 0.023));   // the tray
  const tools = [['#1a1a1a', -0.08, 0.034], ['#1d3fbf', 0.045, 0.034], ['#c41e1e', -0.08, 0.014], ['#1f8a3a', 0.045, 0.014]].map(([color, x, dz]) => {   // two rows of two
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.11, 14).rotateZ(Math.PI / 2), new THREE.MeshStandardMaterial({ color, roughness: 0.4 }));
    m.position.set(x, 1.198, OUT + dz); m.userData.tool = color; g.add(m); return hang(m);
  });
  const eraser = hang(box(0.09, 0.03, 0.04, new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 1 }), 0.165, 1.204, OUT + 0.025));
  eraser.userData.tool = 'eraser'; tools.push(eraser);
  const sign = (draw, w, hh, x, y, z, ry = 0, onDoor = false) => {   // a flat thing on a wall or the door, drawn on canvas
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, hh), new THREE.MeshStandardMaterial({ map: canvas(256, Math.round(256 * hh / w), draw), transparent: true, roughness: 0.8 }));
    m.position.set(x, y, z); m.rotation.y = ry; g.add(m); if (onDoor) hang(m); return m;
  };
  const star = (name, fill) => (x, w, hh) => {   // the RA's door decoration: a construction-paper star with a name in marker
    x.fillStyle = fill; x.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 50 : 122; x.lineTo(w / 2 + r * Math.cos(a), hh / 2 + 6 + r * Math.sin(a)); }
    x.fill(); x.fillStyle = '#111'; x.font = 'bold 44px "Comic Sans MS", "Chalkboard SE", sans-serif'; x.textAlign = 'center'; x.fillText(name, w / 2, hh / 2 + 22);
  };
  sign(star('BRYAN', '#f3d23a'), 0.22, 0.22, 0.02, 1.81, OUT + 0.003, 0, true);
  const plate = n => (x, w, hh) => { x.fillStyle = '#3a2c22'; x.fillRect(0, 0, w, hh); x.fillStyle = '#f2ece0'; x.font = 'bold 120px Helvetica, Arial, sans-serif'; x.textAlign = 'center'; x.fillText(n, w / 2, hh * 0.62); x.fillStyle = '#d9cfbf'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(w / 2 - 40 + (i % 3) * 14 + Math.floor(i / 3) * 40, hh * 0.85, 4, 0, 7); x.fill(); } };

  // the hall: the same block and tile, fluorescent tubes down the middle, and the neighbours' doors with their own boards
  const H0 = z1 + 0.06, H1 = H0 + 2.1, HX = 6, mid = (H0 + H1) / 2;
  const hallDoor = (x, n, z, ry) => {   // a neighbour's door, its frame, its number, and a blank board
    const f = Math.sign(Math.cos(ry)), dz = z + f * 0.02;
    box(0.9, 2.03, 0.045, new THREE.MeshStandardMaterial({ color: '#c39a66', roughness: 0.45 }), x, 1.015, dz - f * 0.03);
    for (const [w2, h2, xx, y] of [[0.06, 2.1, x - 0.48, 1.05], [0.06, 2.1, x + 0.48, 1.05], [1.02, 0.06, x, 2.08]]) box(w2, h2, 0.04, metal, xx, y, dz - f * 0.01);
    box(0.39, 0.51, 0.012, alu, x, 1.45, dz); box(0.36, 0.48, 0.002, new THREE.MeshStandardMaterial({ color: '#f6f6f2', roughness: 0.25 }), x, 1.45, dz + f * 0.006);
    sign(plate(n), 0.12, 0.09, x - f * 0.7, 1.55, z + f * 0.004, ry);
  };
  wall(rect(-HX, 0, HX, h), [rect(-0.46, 0, 0.46, 2.06), rect(-4.06, 0, -3.14, 2.06), rect(3.14, 0, 4.06, 2.06)], m => { m.position.z = H0; });
  wall(rect(-HX, 0, HX, h), [], m => { m.position.z = H1; m.rotation.y = Math.PI; });
  wall(rect(H0, 0, H1, h), [], m => { m.position.x = HX; m.rotation.y = -Math.PI / 2; });
  wall(rect(-H1, 0, -H0, h), [], m => { m.position.x = -HX; m.rotation.y = Math.PI / 2; });
  const hallTile = tile.clone(); hallTile.repeat.set(2 * HX / 1.22, (H1 - H0) / 1.22);
  const hallFloor = new THREE.Mesh(new THREE.PlaneGeometry(2 * HX, H1 - H0), new THREE.MeshStandardMaterial({ map: hallTile, roughness: 0.3 }));
  hallFloor.rotation.x = -Math.PI / 2; hallFloor.position.z = mid; hallFloor.receiveShadow = true; g.add(hallFloor);
  const hallCeiling = new THREE.Mesh(new THREE.PlaneGeometry(2 * HX, H1 - H0), ceiling.material); hallCeiling.rotation.x = Math.PI / 2; hallCeiling.position.set(0, h, mid); g.add(hallCeiling);
  for (const x of [-3.4, 0.6, 4.2]) {
    box(1.22, 0.06, 0.3, new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fff6e6', emissiveIntensity: 1.2 }), x, h - 0.03, mid);
    const tubeLight = new THREE.RectAreaLight('#fff3df', 7, 1.22, 0.3); tubeLight.position.set(x, h - 0.07, mid); tubeLight.lookAt(x, 0, mid); g.add(tubeLight);
  }
  sign(plate('328'), 0.12, 0.09, -0.7, 1.55, H0 + 0.004);
  hallDoor(-3.6, '326', H0, 0); hallDoor(3.6, '330', H0, 0); hallDoor(-1.8, '327', H1, Math.PI); hallDoor(2.2, '329', H1, Math.PI);
  for (const s of [-1, 1]) box(HX - 0.46, 0.1, 0.01, cove, s * (0.46 + (HX - 0.46) / 2), 0.05, H0 + 0.005);
  box(2 * HX, 0.1, 0.01, cove, 0, 0.05, H1 - 0.005);

  // the bedding's cloth: a fine weave under a soft sheen
  const cloth = canvas(256, 256, (x, w) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, w); for (let i = 0; i < 9000; i++) { const l = rnd(215, 255); x.fillStyle = `rgb(${l},${l},${l})`; x.fillRect(rnd(0, w), rnd(0, w), rnd(2, 4), 2); } }, [3, 3]);
  const down = new THREE.MeshPhysicalMaterial({ color: '#21438c', map: cloth, roughness: 0.85, sheen: 1, sheenRoughness: 0.55, sheenColor: '#6f8cc8', side: THREE.DoubleSide });
  const blanket = new THREE.MeshStandardMaterial({ color: '#77736a', map: cloth, roughness: 0.95, side: THREE.DoubleSide });
  const pillowcase = new THREE.MeshPhysicalMaterial({ color: '#a6c6ee', map: cloth, roughness: 0.8, sheen: 1, sheenRoughness: 0.5, sheenColor: '#dfeafa' });
  // a cover on a mattress against the wall at wx (s: +1 or -1, which way the room is), from z0c to z1c: a sheet of vertices across the top,
  // puffed in 25 cm squares, a roll where it's turned down, and over the room-side edge (rounded, as the bedroom's comforter falls) and down
  function cover(wx, s, z0c, z1c, puff, mat) {
    const EDGE = 0.97, W = EDGE + 0.34, L = z1c - z0c, top = 0.612, r = 0.05, arc = r * Math.PI / 2;
    const geo = new THREE.PlaneGeometry(W, L, 110, 170).rotateX(-Math.PI / 2), p = geo.attributes.position;
    const fall = e => e < arc ? [r * Math.sin(e / r), r - r * Math.cos(e / r)] : [r, r + e - arc];
    for (let i = 0; i < p.count; i++) {
      const u = p.getX(i) + W / 2 + 0.01, v = p.getZ(i) + L / 2, z = z0c + v, e = u - EDGE;   // u from the wall, v from the turned-down edge
      const square = Math.abs(Math.sin(Math.PI * u / 0.25) * Math.sin(Math.PI * (v + 0.05) / 0.25)) ** 0.6;
      const lift = puff * (0.55 + 0.45 * square) + puff * 1.6 * Math.exp(-(((v - 0.07) / 0.06) ** 2)) - 0.03 * Math.max(0, (v - L + 0.08) / 0.08);   // puffs, the roll, the foot tucked
      const over = Math.max(0, 1 - Math.max(0, e) / arc), [sx, sy] = e > 0 ? fall(e) : [0, 0];
      const pleat = 0.03 * Math.min(1, Math.max(0, e - arc) / 0.12) * Math.sin(z * 9 + 2 * Math.sin(z * 3.7)) ** 2;
      p.setXYZ(i, wx - s * (Math.min(u, EDGE) + sx + pleat + (e > 0 ? puff * (1 - over) : 0)), top + lift * over - sy, z);   // the hanging part keeps an even loft
    }
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; g.add(m);
  }

  // each side, door to window: the cubby, the bed, the desk. s is +1 for Bryan's side, -1 for the roommate's
  for (const s of [1, -1]) {
    const wx = s > 0 ? x1 : x0, inner = wx - s * 0.62;   // the wall, and how far the cubby and the desk come out from it
    box(0.62, 2.1, 0.025, oak, wx - s * 0.31, 1.05, 1.38);   // the cubby's side panel, toward the bed
    box(0.62, 0.025, 1.0, oak, wx - s * 0.31, 1.78, 1.88); box(0.62, 0.025, 1.0, oak, wx - s * 0.31, 2.09, 1.88);   // its shelf and its top
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.0, 12).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#bdbdb8', metalness: 1, roughness: 0.3 }));
    rod.position.set(wx - s * 0.31, 1.68, 1.88); g.add(rod);
    const colors = s > 0 ? ['#3a3f47', '#1f2a44', '#111', '#8c1d1d', '#e8e6df', '#5b6e45', '#2f4f7f', '#7a7a7a'] : ['#6b6b6b', '#24324d', '#cfcac0'];
    colors.forEach((c, i) => box(0.44, rnd(0.62, 0.8), 0.035, new THREE.MeshStandardMaterial({ color: c, roughness: 0.95 }), wx - s * 0.31, 1.3, 1.45 + i * 0.1));   // shirts and hoodies on hangers

    const bx = wx - s * 0.5, bz = -0.05, len = 2.03;   // the bed: twin XL, head toward the window
    box(1.0, 0.85, 0.04, oak, bx, 0.425, bz - len / 2 - 0.02); box(1.0, 0.6, 0.04, oak, bx, 0.3, bz + len / 2 + 0.02);   // head and foot boards
    box(0.04, 0.2, len, darkOak, bx - s * 0.48, 0.35, bz); box(0.04, 0.2, len, darkOak, wx - s * 0.02, 0.35, bz);
    box(0.97, 0.16, len - 0.02, new THREE.MeshStandardMaterial({ color: '#e9e6dc', roughness: 0.9 }), bx, 0.53, bz);   // the mattress
    // the bedding: Bryan's big down comforter in sewn-through squares that puff up, turned down below the pillow, rolled over the room
    // side and hanging there in folds; his pillow in a light blue case; the roommate's bed made flat under a grey blanket
    cover(wx, s, bz - len / 2 + 0.36, bz + len / 2 - 0.03, s > 0 ? 0.035 : 0.004, s > 0 ? down : blanket);
    const pillow = new THREE.SphereGeometry(1, 48, 24), pp = pillow.attributes.position;   // a sphere pushed out square, as in the bedroom
    for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), z = pp.getZ(i); pp.setXYZ(i, Math.sign(x) * Math.abs(x) ** 0.35 * 0.32, pp.getY(i) * 0.07, Math.sign(z) * Math.abs(z) ** 0.35 * 0.2); }
    pillow.computeVertexNormals();
    const pm = new THREE.Mesh(pillow, s > 0 ? pillowcase : new THREE.MeshStandardMaterial({ color: '#efece4', roughness: 0.9 }));
    pm.position.set(bx, 0.67, bz - len / 2 + 0.26); pm.rotation.set(0, s * 0.05, s * 0.04); pm.castShadow = pm.receiveShadow = true; g.add(pm);

    const dz = -1.87;   // the desk, along the wall in the corner by the window
    box(0.62, 0.03, 1.1, oak, wx - s * 0.31, 0.75, dz);
    box(0.6, 0.72, 0.42, oak, wx - s * 0.3, 0.36, dz - 0.33);   // the drawers
    for (let k = 0; k < 3; k++) box(0.01, 0.2, 0.38, darkOak, inner + s * 0.005, 0.6 - k * 0.23, dz - 0.33);
    box(0.6, 0.72, 0.03, oak, wx - s * 0.3, 0.36, dz + 0.53);   // the end panel
    const seat = new THREE.MeshStandardMaterial({ color: '#a77e4c', roughness: 0.6 }), chair = new THREE.Group();   // the roommate's pushed in; Bryan's pulled out, turned to the room
    chair.position.set(inner - s * (s > 0 ? 0.35 : 0.05), 0, dz + 0.1); chair.rotation.y = s > 0 ? 0.35 : 0; g.add(chair);
    for (const [w2, h2, d2, x, y, z] of [[0.42, 0.03, 0.42, 0, 0.45, 0], [0.03, 0.42, 0.4, -s * 0.22, 0.68, 0], ...[[0.18, 0.18], [0.18, -0.18], [-0.18, 0.18], [-0.18, -0.18]].map(([ox, oz]) => [0.03, 0.45, 0.03, ox, 0.225, oz])]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w2, h2, d2), seat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; chair.add(m);
    }
  }

  // Bryan's desk: the Dell everyone on the floor had in 2003, a Dimension 2400 (its front is a public-domain photo of one, from Wikimedia
  // Commons) on the floor under the desk, a black seventeen inch Dell CRT with its glass bulging a little, a black keyboard, the mouse, the speakers
  const dx = x1 - 0.31, dz = -1.87, plastic = new THREE.MeshStandardMaterial({ color: '#1b1c1f', roughness: 0.42 }), gray = new THREE.MeshStandardMaterial({ color: '#2c2e33', roughness: 0.5, metalness: 0.15 });
  const dell = new THREE.TextureLoader().load('assets/dell-front.jpg'); dell.colorSpace = THREE.SRGBColorSpace; dell.anisotropy = 8;
  const tower = new THREE.Mesh(new RoundedBoxGeometry(0.43, 0.37, 0.185, 3, 0.008), [gray, new THREE.MeshStandardMaterial({ map: dell, roughness: 0.45 }), gray, gray, gray, gray]);
  tower.position.set(x1 - 0.225, 0.185, -1.53); tower.castShadow = tower.receiveShadow = true; g.add(tower);   // on the floor under the desk, front to the room
  const bezel = canvas(512, 462, (x, w, h) => {   // the monitor's face: black plastic, a lip round the glass, DELL, the power button and its green light
    const f = x.createLinearGradient(0, 0, 0, h); f.addColorStop(0, '#2a2b2f'); f.addColorStop(1, '#141518'); x.fillStyle = f; x.fillRect(0, 0, w, h);
    x.fillStyle = '#0b0b0c'; x.beginPath(); x.roundRect(36, 30, w - 72, h - 110, 18); x.fill();
    x.fillStyle = '#7d8086'; x.font = 'bold 22px Helvetica, Arial, sans-serif'; x.textAlign = 'center'; x.fillText('D E L L', w / 2, h - 34);
    x.fillStyle = '#3a3c41'; x.beginPath(); x.arc(w - 64, h - 42, 11, 0, 7); x.fill(); x.fillStyle = '#5cff6a'; x.beginPath(); x.arc(w - 92, h - 42, 4, 0, 7); x.fill();
    for (let i = 0; i < 4; i++) { x.fillStyle = '#2f3136'; x.fillRect(70 + i * 34, h - 48, 22, 10); }
  });
  const shell = new THREE.Mesh(new RoundedBoxGeometry(0.2, 0.37, 0.41, 3, 0.02), [plastic, new THREE.MeshStandardMaterial({ map: bezel, roughness: 0.45 }), plastic, plastic, plastic, plastic]);
  shell.position.set(1.44, 0.975, dz); shell.castShadow = true; g.add(shell);
  const back = new THREE.BoxGeometry(0.22, 0.32, 0.36, 1, 1, 1), bp = back.attributes.position;   // the tube's housing, narrowing to the wall
  for (let i = 0; i < bp.count; i++) if (bp.getX(i) > 0) bp.setXYZ(i, bp.getX(i), bp.getY(i) * 0.62 - 0.03, bp.getZ(i) * 0.6);
  back.computeVertexNormals();
  const housing = new THREE.Mesh(back, plastic); housing.position.set(1.64, 0.96, dz); housing.castShadow = true; g.add(housing);
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.14, 0.022, 32), plastic); stand.scale.z = 0.8; stand.position.set(1.47, 0.776, dz); g.add(stand);
  const crt = new THREE.PlaneGeometry(0.33, 0.25, 16, 12), gp = crt.attributes.position;
  for (let i = 0; i < gp.count; i++) gp.setZ(i, 0.012 * (1 - (gp.getX(i) / 0.165) ** 2 * 0.5 - (gp.getY(i) / 0.125) ** 2 * 0.5));   // the curve of the tube's face
  crt.computeVertexNormals();
  const screen = new THREE.Mesh(crt, new THREE.MeshBasicMaterial({ map: desktopXP, toneMapped: false }));
  screen.position.set(1.338, 1.0, dz); screen.rotation.y = -Math.PI / 2; g.add(screen);
  const keys = canvas(512, 168, (x, w, h) => {   // a black Dell keyboard from above: the F row, rows of keys, the arrows
    x.fillStyle = '#121214'; x.fillRect(0, 0, w, h);
    const key = (kx, ky, kw = 22, kh = 22) => { x.fillStyle = '#2b2c30'; x.fillRect(kx, ky, kw, kh); x.fillStyle = '#3a3b40'; x.fillRect(kx + 2, ky + 2, kw - 4, kh - 7); };
    for (let i = 0; i < 13; i++) key(10 + i * 26 + (i > 0 ? 8 : 0) + (i > 4 ? 8 : 0) + (i > 8 ? 8 : 0), 8, 22, 16);
    for (let r = 0; r < 5; r++) for (let i = 0; i < 14 - (r === 4 ? 6 : 0); i++) key(10 + i * 25 + r * 5, 34 + r * 25, r === 4 && i === 3 ? 120 : 22);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) key(392 + i * 25, 34 + r * 25);
    key(417, 109); key(392, 134); key(417, 134); key(442, 134);
    x.fillStyle = '#9aa0a8'; x.font = 'bold 9px Helvetica, Arial, sans-serif'; x.fillText('DELL', w - 40, 18);
  });
  keys.rotation = Math.PI / 2; keys.center.set(0.5, 0.5);
  const kbd = new THREE.Mesh(new RoundedBoxGeometry(0.17, 0.025, 0.46, 2, 0.006), [plastic, plastic, new THREE.MeshStandardMaterial({ map: keys, roughness: 0.55 }), plastic, plastic, plastic]);
  kbd.position.set(dx - 0.2, 0.778, dz + 0.02); kbd.rotation.z = -0.05; kbd.castShadow = true; g.add(kbd);
  const mouse = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), plastic); mouse.scale.set(0.032, 0.018, 0.055); mouse.position.set(dx - 0.2, 0.77, dz + 0.36); mouse.castShadow = true; g.add(mouse);
  box(0.2, 0.004, 0.2, new THREE.MeshStandardMaterial({ color: '#2a3a6a', roughness: 0.9 }), dx - 0.2, 0.767, dz + 0.36);   // the mouse pad
  for (const o of [-0.3, 0.3]) { const sp = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.16, 0.07, 2, 0.01), plastic); sp.position.set(dx + 0.12, 0.85, dz + o); sp.castShadow = true; g.add(sp); }   // the speakers

  // the mini fridge under the window between the two desks: a black cube of 2003, its handle a groove along the top of the door
  const fridge = new THREE.MeshStandardMaterial({ color: '#151515', roughness: 0.32, metalness: 0.1 });
  box(0.48, 0.5, 0.45, fridge, 0, 0.27, -2.07); box(0.47, 0.49, 0.02, fridge, 0, 0.27, -1.835);
  box(0.3, 0.015, 0.012, new THREE.MeshStandardMaterial({ color: '#333', roughness: 0.6 }), 0, 0.49, -1.822);
  box(0.06, 0.012, 0.002, new THREE.MeshStandardMaterial({ color: '#b8bcc0', metalness: 0.9, roughness: 0.3 }), -0.17, 0.08, -1.824);   // the maker's badge
  for (const [fx, fz] of [[-0.2, -2.25], [0.2, -2.25], [-0.2, -1.88], [0.2, -1.88]]) box(0.03, 0.02, 0.03, black, fx, 0.01, fz);

  // and on Bryan's side only, a month of dining-hall cups: Pepsi fountain cups, some still with their lids and bendy straws, one knocked over
  const rand = (a => () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })(328);   // the same mess every visit
  const pepsi = canvas(512, 256, (x, w, h) => {   // the 2003 cup: blue swirl, the globe, PEPSI up the side
    const b = x.createLinearGradient(0, 0, w, 0); b.addColorStop(0, '#0a3f9e'); b.addColorStop(0.5, '#2f8fe6'); b.addColorStop(1, '#0a3f9e'); x.fillStyle = b; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(255,255,255,${rnd(0.04, 0.14)})`; x.beginPath(); x.arc(rnd(0, w), rnd(0, h), rnd(4, 26), 0, 7); x.fill(); }
    const gx = 330, gy = 118, r = 62;
    x.fillStyle = '#fff'; x.beginPath(); x.arc(gx, gy, r + 4, 0, 7); x.fill();
    x.fillStyle = '#d8232a'; x.beginPath(); x.arc(gx, gy, r, Math.PI, 0); x.quadraticCurveTo(gx, gy - 18, gx - r, gy); x.fill();
    x.fillStyle = '#004b93'; x.beginPath(); x.arc(gx, gy, r, 0, Math.PI); x.quadraticCurveTo(gx, gy + 24, gx + r, gy); x.fill();
    x.save(); x.translate(200, 230); x.rotate(-Math.PI / 2); x.fillStyle = '#fff'; x.font = 'italic 900 64px "Arial Black", Arial, sans-serif'; x.fillText('PEPSI', 0, 0); x.restore();
  });
  const cupGeo = new THREE.CylinderGeometry(0.044, 0.032, 0.15, 28), rimGeo = new THREE.TorusGeometry(0.044, 0.0025, 6, 28).rotateX(Math.PI / 2);
  const cupMats = [new THREE.MeshStandardMaterial({ map: pepsi, roughness: 0.5 }), new THREE.MeshStandardMaterial({ color: '#2a1a12', roughness: 0.15 }), new THREE.MeshStandardMaterial({ color: '#f1f1ee', roughness: 0.6 })];
  const lid = new THREE.MeshStandardMaterial({ color: '#f4f4f0', roughness: 0.3, transparent: true, opacity: 0.9 }), lidGeo = new THREE.CylinderGeometry(0.047, 0.047, 0.012, 28), strawGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.2, 8);
  const cup = (x, y, z, tipped = false, bare = false) => {   // bare: no lid, for a cup with another stacked in it
    const c = new THREE.Group(), body = new THREE.Mesh(cupGeo, cupMats), rim = new THREE.Mesh(rimGeo, cupMats[2]);
    body.position.y = 0.075; rim.position.y = 0.15; body.castShadow = true; c.add(body, rim);
    if (!bare && rand() < 0.5) {
      const l = new THREE.Mesh(lidGeo, lid), straw = new THREE.Mesh(strawGeo, cupMats[2]);
      l.position.y = 0.156; straw.position.set(0.01, 0.22, 0); straw.rotation.z = rand() * 0.3 - 0.15; c.add(l, straw);
    }
    c.position.set(x, y, z); c.rotation.set(0, rand() * 7, tipped ? Math.PI / 2 : 0);
    if (tipped) c.position.y += 0.04;
    g.add(c);
  };
  const busy = [[1.14, 1.73, -2.1, -1.64], [1.14, 1.36, -2.1, -1.4], [1.5, 1.62, -2.22, -2.12], [1.5, 1.62, -1.62, -1.52], [1.14, 1.52, -2.42, -2.2], [1.15, 1.3, -2.22, -2.1]];   // monitor, keyboard and pad, speakers, the carton, the loose pack
  const placed = [];
  for (let tries = 0; placed.length < 18 && tries < 900; tries++) {
    const x = 1.18 + rand() * 0.52, z = -2.37 + rand() * 0.99;
    if (busy.some(([a, b, c2, d]) => x > a - 0.04 && x < b + 0.04 && z > c2 - 0.04 && z < d + 0.04) || placed.some(([px, pz]) => Math.hypot(x - px, z - pz) < 0.088)) continue;
    placed.push([x, z]);
    const n = [6, 1, 2, 5, 1, 4, 1, 3, 2][placed.length - 1] ?? 1;   // a few nested in towers
    for (let i = 0; i < n; i++) cup(x, 0.765 + i * 0.03, z, placed.length === 5, i < n - 1);
  }
  for (const [x, y, z] of [[0.1, 0.52, -2.0], [0.16, 0.52, -2.2], [0.45, 0.95, -2.52], [0.64, 0.95, -2.5], [1.43, 1.16, -1.97], [1.47, 1.16, -1.78]]) cup(x, y, z);   // two on the fridge, two on the sill, two on top of the monitor

  // an open carton of Kamel Reds at the window end of the desk, a pack half out of the open end and another loose beside it
  const red = new THREE.MeshStandardMaterial({ color: '#d1281f', roughness: 0.55 }), cream = new THREE.MeshStandardMaterial({ color: '#ece2c4', roughness: 0.6 });
  const face = new THREE.TextureLoader().load('assets/kamel-carton.jpg'); face.colorSpace = THREE.SRGBColorSpace; face.anisotropy = 8;
  const carton = new THREE.Group(); carton.position.set(1.32, 0.79, -2.31); carton.rotation.y = 0.07; g.add(carton);
  const cbox = new THREE.Mesh(new THREE.BoxGeometry(0.275, 0.05, 0.105), [red, new THREE.MeshStandardMaterial({ color: '#3a2a1e' }), new THREE.MeshStandardMaterial({ map: face, roughness: 0.55 }), cream, cream, cream]);
  cbox.castShadow = true; carton.add(cbox);
  const flap = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.002, 0.105), red); flap.position.set(-0.155, 0.03, 0); flap.rotation.z = -0.5; carton.add(flap);
  const packFace = canvas(256, 144, (x, w, h) => { x.fillStyle = '#d1281f'; x.fillRect(0, 0, w, h); x.fillStyle = '#ece2c4'; x.fillRect(0, h * 0.72, w, h * 0.28); x.fillStyle = '#2a1010'; x.font = '28px Georgia, serif'; x.textAlign = 'center'; x.fillText('K A M E L', w * 0.42, h * 0.48); x.strokeStyle = '#ece2c4'; x.lineWidth = 3; x.strokeRect(w * 0.78, h * 0.12, w * 0.16, h * 0.5); x.fillStyle = '#ece2c4'; x.font = 'bold 40px Helvetica, Arial, sans-serif'; x.fillText('R', w * 0.86, h * 0.48); });
  const packMats = [cream, cream, new THREE.MeshStandardMaterial({ map: packFace, roughness: 0.5 }), red, red, red];
  const slid = new THREE.Mesh(new THREE.BoxGeometry(0.098, 0.022, 0.055), packMats); slid.position.set(-0.15, -0.006, 0.02); carton.add(slid);

  // the open pack on the desk: a flip-top hard pack, its front Bryan's photo of one, twenty inside in rows of seven, six, and seven, filters
  // up. Lying on its back by the keyboard until someone picks it up
  const front = new THREE.TextureLoader().load('assets/kamel-pack.jpg', () => { bodyFront.needsUpdate = lidFront.needsUpdate = true; }); front.colorSpace = THREE.SRGBColorSpace; front.anisotropy = 8;   // the lid and the body each show a part of it
  const pack = new THREE.Group(), PW = 0.055, PH = 0.085, PD = 0.022, CUT = PH / 2 - 0.28 * PH;   // king size; the lid comes down to the seam in the photo
  const bodyFront = front.clone(); bodyFront.repeat.set(1, (CUT + PH / 2) / PH);
  const lidFront = front.clone(); lidFront.repeat.set(1, (PH / 2 - CUT) / PH); lidFront.offset.set(0, (CUT + PH / 2) / PH);
  const body = new THREE.Mesh(new THREE.BoxGeometry(PW, CUT + PH / 2, PD), [cream, cream, cream, cream, new THREE.MeshStandardMaterial({ map: bodyFront, roughness: 0.45 }), cream]);
  body.position.y = (CUT - PH / 2) / 2; pack.add(body);
  const flip = new THREE.Group(); flip.position.set(0, PH / 2, -PD / 2); pack.add(flip);   // the lid, hinged along the top of the back
  const lidBox = new THREE.Mesh(new THREE.BoxGeometry(PW + 0.0008, PH / 2 - CUT, PD + 0.0008), [cream, cream, cream, cream, new THREE.MeshStandardMaterial({ map: lidFront, roughness: 0.45 }), cream]);
  lidBox.position.set(0, -(PH / 2 - CUT) / 2, PD / 2); flip.add(lidBox);
  const paper = new THREE.MeshStandardMaterial({ color: '#f6f4ee', roughness: 0.7 }), cork = new THREE.MeshStandardMaterial({ map: canvas(64, 64, (x, w) => { x.fillStyle = '#c98a4b'; x.fillRect(0, 0, w, w); for (let i = 0; i < 300; i++) { x.fillStyle = `rgba(${rnd(80, 200)},${rnd(50, 120)},20,0.5)`; x.fillRect(rnd(0, w), rnd(0, w), 2, 2); } }), roughness: 0.8 });
  const stick = new THREE.CylinderGeometry(0.0038, 0.0038, 0.063, 12), tip = new THREE.CylinderGeometry(0.0038, 0.0038, 0.021, 12);
  const smokes = [];
  for (const [row, n] of [[1, 7], [0, 6], [-1, 7]]) for (let i = 0; i < n; i++) {   // front row first; each one's middle is its origin, so it can turn end over end
    const c = new THREE.Group(), p = new THREE.Mesh(stick, [paper, paper, new THREE.MeshStandardMaterial({ color: '#6a4426', roughness: 1 })]), f = new THREE.Mesh(tip, [cork, cork, cork]);
    p.position.y = -0.0105; f.position.y = 0.0315; c.add(p, f);
    c.position.set((i - (n - 1) / 2) * 0.0077, -0.0015, row * 0.0066);   // 2 mm under the lid's top pack.add(c); if (row === 1) smokes.push(c);
  }
  pack.userData = { lid: flip, lucky: smokes[4] };   // the front row seen from the front, third from the right
  pack.position.set(1.22, 0.765 + PD / 2, -2.16); pack.rotation.set(-Math.PI / 2, 0, 0.6, 'YXZ');
  pack.traverse(o => { if (o.isMesh) o.castShadow = true; }); g.add(pack);

  // his wall: the Rat Pack round the pool table over the bed and Trainspotting's "Choose Life" over the desk (store prints: licences
  // needed), and between them drugstore prints of college, from the "Life of Bryan" deck, taped up crooked. Each is as wide as its picture
  const loader = new THREE.TextureLoader();
  const pin = (file, hh, z, y, tilt = 0, out = 0.004) => {
    const map = loader.load(file, t => m.scale.set(hh * t.image.width / t.image.height, hh, 1));
    map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({ map, roughness: 0.6 }));
    m.position.set(x1 - out, y, z); m.rotation.set(0, -Math.PI / 2, tilt); m.scale.set(hh, hh, 1); g.add(m);
  };
  pin('assets/posters/rat-pack.jpg', 0.68, -0.2, 1.45);
  pin('assets/posters/trainspotting.jpg', 0.9, -1.87, 1.62);
  for (const [name, z, y, tilt, out] of [['sleep', -1.31, 1.68, 0.04, 0.006], ['friends', -1.16, 1.69, -0.03, 0.008], ['band-2006', -1.01, 1.675, 0.03, 0.006],
    ['guitar', -1.36, 1.565, -0.04, 0.007], ['polaroid', -1.215, 1.57, 0.05, 0.009], ['quad', -1.07, 1.56, -0.02, 0.007], ['band-2005', -1.24, 1.45, 0.03, 0.006]]) {
    pin(`assets/photos/${name}.jpg`, name === 'polaroid' ? 0.107 : 0.102, z, y, tilt, out);   // 4 by 6 inch prints, and one Polaroid
  }

  // the ceiling: a fluorescent fixture and a smoke detector
  box(0.6, 0.06, 1.22, new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fff6e6', emissiveIntensity: 1.2 }), 0, h - 0.03, 0.2);
  const smoke = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 24), new THREE.MeshStandardMaterial({ color: '#f4f2ec' }));
  smoke.position.set(-0.6, h - 0.015, -0.8); g.add(smoke);

  scene.add(g);
  return { door, board, ink, inkMap, tools, pack };
}
