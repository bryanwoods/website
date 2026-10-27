// Bryan's Reebok Answer DMX in the Georgetown colours, Iverson's first signature shoe, kicked off at the foot of the bed.
// Each shoe is lofted along its length from the outline of a side photo, with the photo projected onto both sides
// (StockX's product shot, so it needs a licence before this is public).
import * as THREE from 'three';

const N = 96, M = 28, LEN = 0.27;   // slices along the shoe, points round each slice, length in metres: a men's US 8.5
const T = [0, 0.04, 0.12, 0.3, 0.45, 0.62, 0.75, 0.88, 0.96, 1], F = [0.3, 0.62, 0.74, 0.76, 0.74, 0.98, 1, 0.9, 0.6, 0.25];   // the last, seen from above
const plan = t => { let i = 1; while (T[i] < t) i++; const k = (t - T[i - 1]) / (T[i] - T[i - 1]); return LEN / 6 * (F[i - 1] + (F[i] - F[i - 1]) * k); };

async function shoeGeometry() {
  const im = await new THREE.ImageLoader().loadAsync('assets/answer-dmx.jpg'), W = im.width, H = im.height;
  const ctx = Object.assign(document.createElement('canvas'), { width: W, height: H }).getContext('2d'); ctx.drawImage(im, 0, 0);
  const px = ctx.getImageData(0, 0, W, H).data, shoe = (x, y) => px[4 * (y * W + x)] + px[4 * (y * W + x) + 1] + px[4 * (y * W + x) + 2] < 3 * 238;
  const edge = (x, from, step) => { for (let y = from; y >= 0 && y < H; y += step) if (shoe(x, y)) return y; return from; };
  let x0 = 0, x1 = W - 1; while (!shoe(x0, edge(x0, 0, 1))) x0++; while (!shoe(x1, edge(x1, 0, 1))) x1--;
  const s = LEN / (x1 - x0), base = edge((x0 + x1) >> 1, H - 1, -1);   // metres per pixel; the bottom of the sole
  const pos = [], uv = [], col = [], idx = [];
  for (let i = 0; i <= N; i++) {
    const t = 0.01 + 0.98 * i / N, cx = Math.round(x0 + t * (x1 - x0));
    let top = 0, bot = 0; for (let k = -6; k <= 6; k++) { const x = Math.min(x1, Math.max(x0, cx + k)); top += edge(x, 0, 1) / 13; bot += edge(x, H - 1, -1) / 13; }
    const opening = Math.max(0, 1 - Math.abs(t - 0.21) / 0.1);   // the ankle opening, between the heel collar and the tongue
    for (let j = 0; j < M; j++) {
      const a = j / M * Math.PI * 2, c = Math.cos(a), si = Math.sin(a);
      const py = (top + bot) / 2 - (bot - top) / 2 * Math.sign(si) * Math.abs(si) ** (si < 0 ? 0.35 : 0.85);   // a flat sole, a rounded top
      const cup = opening * Math.max(0, si) ** 4;
      pos.push((cx - (x0 + x1) / 2) * s, (base - py) * s - cup * (bot - top) * s * 0.4, plan(t) * Math.sign(c) * Math.abs(c) ** 0.55 * (1 - 0.35 * Math.max(0, si) ** 2));
      uv.push(cx / W, 1 - py / H);
      const v = cup > 0.25 ? 0.15 : 1; col.push(v, v, v);   // the dark lining inside
      if (i < N) { const a0 = i * M + j, a1 = i * M + (j + 1) % M; idx.push(a0, a0 + M, a1, a1, a0 + M, a1 + M); }
    }
  }
  for (const [i, end] of [[0, 0], [N, 1]]) {   // close the heel and the toe with a fan
    const ring = [...Array(M)].map((_, j) => i * M + j), c = new THREE.Vector3(), v = new THREE.Vector3();
    for (const r of ring) c.add(v.fromArray(pos, r * 3)); c.divideScalar(M);
    const k = pos.length / 3; pos.push(c.x, c.y, c.z); uv.push(uv[ring[0] * 2], 0.4); col.push(1, 1, 1);
    for (let j = 0; j < M; j++) end ? idx.push(ring[j], k, ring[(j + 1) % M]) : idx.push(ring[(j + 1) % M], k, ring[j]);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); geo.setIndex(idx); geo.computeVertexNormals();
  return geo;
}

// the pair, not neatly: the right shoe upright with its toe to the room, the left one tipped over on its side
export async function iversons(g) {
  const geo = await shoeGeometry(), map = new THREE.TextureLoader().load('assets/answer-dmx.jpg');
  map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
  const mat = new THREE.MeshPhysicalMaterial({ map, vertexColors: true, roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.3 });   // patent leather
  for (const [x, y, z, yaw, roll, left] of [[0.84, 0, 0.42, -1.25, 0, false], [0.72, LEN / 6 + 0.002, 0.13, 0.35, Math.PI / 2, true]]) {
    const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true;
    m.position.set(x, y, z); m.rotation.set(roll, yaw, 0, 'YXZ'); if (left) m.scale.z = -1;
    g.add(m);
  }
}
