// Bryan's Shorty's Chad Muska silhouette deck, propped against the wall by the pizza box: it stands on its tail with the grip to the wall,
// so the graphic, the trucks, and the dirty white wheels face the room. The graphic is a product photo (it needs a licence before this is public),
// worn the way a ridden board wears: rail scuffs along the edges and boardslide marks through the middle.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const L = 0.787, W = 0.197, T = 0.012, KICK = L / 2 - 0.13, A = 0.127, BEND = 0.35;   // 31 x 7.75 inches, a late-90s pro deck; thickness, where the kicks start, the round of the ends, kick angle

async function graphic() {
  const im = await new THREE.ImageLoader().loadAsync('assets/muska.jpg'), c = Object.assign(document.createElement('canvas'), { width: im.width, height: im.height });
  const x = c.getContext('2d'), w = c.width, h = c.height; x.drawImage(im, 0, 0);
  x.strokeStyle = 'rgba(214,186,140,0.55)'; x.lineCap = 'round';
  for (let k = 0; k < 90; k++) {   // rail scuffs: short strokes along both edges, worst at the tail
    const y = Math.random() < 0.5 ? 4 + Math.random() * 16 : h - 4 - Math.random() * 16, x0 = Math.random() ** 0.7 * w;
    x.lineWidth = 1 + Math.random() * 3; x.beginPath(); x.moveTo(x0, y); x.lineTo(x0 + 10 + Math.random() * 60, y + (Math.random() - 0.5) * 4); x.stroke();
  }
  for (let k = 0; k < 40; k++) {   // boardslide marks across the middle, where it ground over ledges and rails
    x.lineWidth = 0.5 + Math.random() * 1.5; x.strokeStyle = `rgba(${Math.random() < 0.5 ? '214,186,140' : '60,50,40'},${0.25 + Math.random() * 0.3})`;
    const x0 = w * (0.3 + Math.random() * 0.4), y0 = h * (0.2 + Math.random() * 0.6);
    x.beginPath(); x.moveTo(x0, y0); x.lineTo(x0 + (Math.random() - 0.5) * 30, y0 + (Math.random() < 0.5 ? -1 : 1) * (30 + Math.random() * 80)); x.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  t.repeat.set(1 / L, 1 / W); t.offset.set(0.5, 0.5);   // cap UVs are the shape's own metres
  return t;
}

// one flat piece of the deck in shape coordinates (x along the board, y across it), extruded to its thickness and laid flat
function piece(pts) {
  return new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([px, py]) => new THREE.Vector2(px, py))), { depth: T, bevelEnabled: false, curveSegments: 1 }).rotateX(-Math.PI / 2);
}
function end(sign) {   // a nose or a tail: square at the kick, an elliptical round at the end, bent down toward the floor
  const pts = [[KICK, -W / 2]], e = L / 2 - A;
  for (let k = 0; k <= 16; k++) { const a = -Math.PI / 2 + Math.PI * k / 16; pts.push([e + A * Math.cos(a), W / 2 * 0.985 * Math.sin(a)]); }
  pts.push([KICK, W / 2]);
  return piece(pts.map(([px, py]) => [px * sign, py * sign])).translate(-sign * KICK, -T, 0).rotateZ(-sign * BEND).translate(sign * KICK, T, 0);   // bent about the top edge, so the graphic stays whole
}

export async function muskaDeck(g) {
  // built lying flat with the graphic up; turned end for end so the nose is up, stood on edge with the graphic to the room, leaning back 14 degrees
  const b = new THREE.Group(), Y = new THREE.Vector3(0, 1, 0), turn = (axis, a) => new THREE.Quaternion().setFromAxisAngle(axis, a); g.add(b);
  b.quaternion.copy(turn(Y, 0.08)).multiply(turn(new THREE.Vector3(0, 0, 1), Math.PI / 2 - 0.25)).multiply(turn(Y, Math.PI));
  const add = (geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; b.add(m); return m; };
  const deck = [new THREE.MeshStandardMaterial({ map: await graphic(), roughness: 0.45 }), new THREE.MeshStandardMaterial({ color: '#d9bb8c', roughness: 0.7 })];   // the graphic, and the maple ply at the edges
  add(piece([[-KICK, -W / 2], [KICK, -W / 2], [KICK, W / 2], [-KICK, W / 2]]), deck);
  for (const s of [-1, 1]) add(end(s), deck);
  const metal = new THREE.MeshStandardMaterial({ color: '#b9bcc0', metalness: 0.8, roughness: 0.35 }), bushing = new THREE.MeshStandardMaterial({ color: '#d8551f', roughness: 0.6 });
  const tread = new THREE.MeshStandardMaterial({ color: '#a39a84', roughness: 0.9 }), face = new THREE.MeshStandardMaterial({ color: '#d4c9ae', roughness: 0.8 });   // dirty white urethane
  const wheel = new THREE.CylinderGeometry(0.027, 0.027, 0.031, 28).rotateX(Math.PI / 2), axle = new THREE.CylinderGeometry(0.004, 0.004, 0.2, 10).rotateX(Math.PI / 2);
  for (const tx of [-0.21, 0.21]) {   // the trucks, standing up off the graphic
    add(new RoundedBoxGeometry(0.075, 0.008, 0.058, 2, 0.002), metal, tx, T + 0.004, 0);
    add(new THREE.CylinderGeometry(0.013, 0.013, 0.026, 16), bushing, tx, T + 0.021, 0);
    add(new RoundedBoxGeometry(0.03, 0.022, 0.14, 2, 0.008), metal, tx, T + 0.043, 0);
    add(axle, metal, tx, T + 0.05, 0);
    for (const z of [-0.085, 0.085]) {
      add(wheel, [tread, face, face], tx, T + 0.05, z);
      add(new THREE.CylinderGeometry(0.009, 0.009, 0.032, 16).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.4 }), tx, T + 0.05, z);   // the bearing
    }
  }
  b.updateMatrixWorld(true); const box = new THREE.Box3().setFromObject(b);
  b.position.set(1.795 - box.max.x, -box.min.y, 0.35);   // the tail on the carpet, the nose against the wall
  return b;
}
