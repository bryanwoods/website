// The room: walls, carpet, ceiling, and the open window. Metres; the floor is y = 0, the back wall is z = -2.
import * as THREE from 'three';
import { stuccoNormal } from './textures.js';

export const ROOM = { x0: -1.8, x1: 1.8, z0: -2.0, z1: 2.0, h: 2.45 };
// the window opening in the back wall; the lower sash is pushed up, so the bottom half is open behind a screen
export const WINDOW = { x0: 0.2, x1: 1.1, y0: 0.85, y1: 2.05, z: -2.0, rails: [1.35, 1.47] };
WINDOW.center = new THREE.Vector3((WINDOW.x0 + WINDOW.x1) / 2, (WINDOW.y0 + WINDOW.y1) / 2, WINDOW.z);

const tex = new THREE.TextureLoader();
function pbr(name, repeat, color, normalScale = 1, paint = false) {   // paint: keep only the relief, colour it flat
  const load = (suffix, srgb) => {
    const t = tex.load(`assets/textures/${name}_${suffix}.jpg`);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...repeat);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  return new THREE.MeshStandardMaterial({ map: paint ? null : load('diff', true), normalMap: load('nor'), roughnessMap: load('rough'), color,
    normalScale: new THREE.Vector2(normalScale, normalScale) });
}

function box(w, h, d, mat, x, y, z, { cast = true, receive = true } = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = cast; m.receiveShadow = receive;
  return m;
}

function worldUV(m) {   // UVs in metres, so the stucco is the same size on every piece of wall
  const p = m.geometry.attributes.position, n = m.geometry.attributes.normal, uv = m.geometry.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) + m.position.x, y = p.getY(i) + m.position.y, z = p.getZ(i) + m.position.z;
    uv.setXY(i, Math.abs(n.getX(i)) > 0.5 ? z : x, Math.abs(n.getY(i)) > 0.5 ? z : y);
  }
}

export function buildRoom(scene) {
  const { x0, x1, z0, z1, h } = ROOM, W = WINDOW, T = 0.12;
  const wall = new THREE.MeshStandardMaterial({ color: '#f4f1ea', roughness: 0.92, normalMap: stuccoNormal() });   // white, with the fine stucco every 90s house had
  wall.normalMap.repeat.set(2, 2);
  // bright orange, wall to wall: the colour is painted here, the Poly Haven carpet gives only the fibres' relief
  const carpet = pbr('dirty_carpet', [5, 5], new THREE.Color('#ffffff'), 1.6);
  carpet.map = (() => {
    const c = Object.assign(document.createElement('canvas'), { width: 512, height: 512 }), x = c.getContext('2d'), d = x.createImageData(512, 512);
    for (let i = 0; i < d.data.length; i += 4) {
      const n = Math.random(), k = 0.82 + 0.18 * n * n;
      d.data[i] = 255 * k; d.data[i + 1] = (118 + 20 * n) * k; d.data[i + 2] = 28 * k; d.data[i + 3] = 255;
    }
    x.putImageData(d, 0, 0);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 6);
    return t;
  })();
  carpet.roughness = 1;
  const ceiling = pbr('white_rough_plaster', [5, 5], new THREE.Color('#f7f5ef'), 2.2, true);   // a popcorn ceiling
  const trim = new THREE.MeshStandardMaterial({ color: '#f6f3ec', roughness: 0.45 });   // white vinyl and painted trim

  const g = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), carpet);
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
  g.add(floor);
  g.add(box(x1 - x0 + 2 * T, 0.1, z1 - z0 + 2 * T, ceiling, 0, h + 0.05, 0));   // solid, so the high sun cannot come in through it

  // the back wall is built around the window opening, so the sun can only come in through it
  const bz = z0 - T / 2;
  g.add(box(W.x0 - x0, h, T, wall, (x0 + W.x0) / 2, h / 2, bz));
  g.add(box(x1 - W.x1, h, T, wall, (W.x1 + x1) / 2, h / 2, bz));
  g.add(box(W.x1 - W.x0, W.y0, T, wall, (W.x0 + W.x1) / 2, W.y0 / 2, bz));
  g.add(box(W.x1 - W.x0, h - W.y1, T, wall, (W.x0 + W.x1) / 2, (W.y1 + h) / 2, bz));
  g.add(box(T, h, z1 - z0 + 2 * T, wall, x0 - T / 2, h / 2, 0));
  g.add(box(T, h, z1 - z0 + 2 * T, wall, x1 + T / 2, h / 2, 0));
  g.add(box(x1 - x0, h, T, wall, 0, h / 2, z1 + T / 2));
  for (const m of g.children) if (m.material === wall) worldUV(m);

  // baseboards
  g.add(box(x1 - x0, 0.09, 0.015, trim, 0, 0.045, z0 + 0.008));
  g.add(box(0.015, 0.09, z1 - z0, trim, x0 + 0.008, 0.045, 0));
  g.add(box(0.015, 0.09, z1 - z0, trim, x1 - 0.008, 0.045, 0));

  // the door out to the hall, behind you as you come in: a six-panel door painted white, its casing, a brass knob, and the light switch by the latch
  const D = { x: 0.95, w: 0.8, h: 2.03 }, cw2 = 0.07, brass = new THREE.MeshStandardMaterial({ color: '#c9a646', metalness: 1, roughness: 0.3 });
  const door = new THREE.MeshStandardMaterial({ color: '#ebe6d8', roughness: 0.4 }), bevel = new THREE.MeshStandardMaterial({ color: '#d6cfbd', roughness: 0.5 });   // years of hands on the paint
  g.add(box(D.w + 0.006, D.h + 0.003, 0.01, new THREE.MeshStandardMaterial({ color: '#2e2922', roughness: 1 }), D.x, D.h / 2, z1 - 0.003));   // the gap round the door, dark
  g.add(box(D.w, D.h, 0.035, door, D.x, D.h / 2, z1 - 0.012));
  for (const [cy, ph] of [[1.78, 0.32], [1.2, 0.62], [0.48, 0.62]]) for (const s of [-1, 1]) {   // six raised panels, each in a bevelled sink
    g.add(box(0.3, ph + 0.03, 0.004, bevel, D.x + s * 0.19, cy, z1 - 0.031));
    g.add(box(0.26, ph - 0.01, 0.01, door, D.x + s * 0.19, cy, z1 - 0.035));
  }
  for (const s of [-1, 1]) g.add(box(cw2, D.h + cw2, 0.018, trim, D.x + s * (D.w + cw2) / 2, (D.h + cw2) / 2, z1 - 0.009));
  g.add(box(D.w + 2 * cw2, cw2, 0.018, trim, D.x, D.h + cw2 / 2, z1 - 0.009));
  for (const [a, b] of [[x0, D.x - D.w / 2 - cw2], [D.x + D.w / 2 + cw2, x1]]) g.add(box(b - a, 0.09, 0.015, trim, (a + b) / 2, 0.045, z1 - 0.008));   // baseboards either side
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.026, 20, 14), brass); knob.position.set(D.x - D.w / 2 + 0.07, 0.92, z1 - 0.085); g.add(knob);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.03, 0.055, 20).rotateX(Math.PI / 2), brass); neck.position.set(knob.position.x, 0.92, z1 - 0.055); g.add(neck);
  g.add(box(0.07, 0.115, 0.006, trim, D.x - D.w / 2 - cw2 - 0.12, 1.22, z1 - 0.003));   // the switch plate
  g.add(box(0.012, 0.026, 0.014, trim, D.x - D.w / 2 - cw2 - 0.12, 1.228, z1 - 0.01));   // the toggle, up

  // window: casing, jambs, sill, two sashes, glass, and the screen over the open half
  const cx = (W.x0 + W.x1) / 2, ww = W.x1 - W.x0, cw = 0.07;
  g.add(box(cw, W.y1 - W.y0 + 2 * cw, 0.02, trim, W.x0 - cw / 2, (W.y0 + W.y1) / 2, z0 + 0.01));
  g.add(box(cw, W.y1 - W.y0 + 2 * cw, 0.02, trim, W.x1 + cw / 2, (W.y0 + W.y1) / 2, z0 + 0.01));
  g.add(box(ww + 2 * cw, cw, 0.02, trim, cx, W.y1 + cw / 2, z0 + 0.01));
  g.add(box(ww + 0.18, 0.03, 0.1, trim, cx, W.y0 - 0.015, z0 + 0.04));                     // the sill, inside
  g.add(box(ww + 2 * cw, 0.06, 0.015, trim, cx, W.y0 - 0.06, z0 + 0.008));                 // the apron under it
  g.add(box(0.035, W.y1 - W.y0, T, trim, W.x0 + 0.0175, (W.y0 + W.y1) / 2, bz));
  g.add(box(0.035, W.y1 - W.y0, T, trim, W.x1 - 0.0175, (W.y0 + W.y1) / 2, bz));
  g.add(box(ww, 0.035, T, trim, cx, W.y1 - 0.0175, bz));

  const glass = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.05, metalness: 0, transparent: true, opacity: 0.08, envMapIntensity: 2 });
  function sash(y0, y1, z) {
    const s = 0.045, r = 0.05, sw = ww - 0.07;
    g.add(box(s, y1 - y0, 0.035, trim, cx - sw / 2 + s / 2, (y0 + y1) / 2, z));
    g.add(box(s, y1 - y0, 0.035, trim, cx + sw / 2 - s / 2, (y0 + y1) / 2, z));
    g.add(box(sw, r, 0.035, trim, cx, y0 + r / 2, z));
    g.add(box(sw, r, 0.035, trim, cx, y1 - r / 2, z));
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(sw - 2 * s, y1 - y0 - 2 * r), glass);
    pane.position.set(cx, (y0 + y1) / 2, z);
    g.add(pane);
  }
  sash(1.45, W.y1 - 0.035, z0 - 0.085);   // upper sash, outer track
  sash(1.3, 1.9, z0 - 0.04);               // lower sash, pushed up in the inner track

  const screenTex = (() => {
    const c = Object.assign(document.createElement('canvas'), { width: 64, height: 64 }), x = c.getContext('2d');
    x.strokeStyle = 'rgba(40,40,40,0.55)'; x.lineWidth = 1;
    for (let i = 0; i < 64; i += 4) { x.beginPath(); x.moveTo(i + 0.5, 0); x.lineTo(i + 0.5, 64); x.moveTo(0, i + 0.5); x.lineTo(64, i + 0.5); x.stroke(); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(40, 24);
    return t;
  })();
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(ww - 0.07, 0.5), new THREE.MeshBasicMaterial({ map: screenTex, transparent: true, opacity: 0.55, depthWrite: false }));
  screen.position.set(cx, W.y0 + 0.25, z0 - 0.105);
  g.add(screen);
  g.add(box(ww - 0.07, 0.02, 0.01, new THREE.MeshStandardMaterial({ color: '#8a8a86', metalness: 0.6, roughness: 0.4 }), cx, W.y0 + 0.5, z0 - 0.105));

  // sheer curtains that breathe in the breeze from the open window
  const curtains = [];
  const sheer = new THREE.MeshStandardMaterial({ color: '#fff3d6', roughness: 0.9, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false });
  sheer.onBeforeCompile = s => {
    s.uniforms.uTime = curtainTime;
    s.vertexShader = 'uniform float uTime;\n' + s.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      float drop = 1.0 - uv.y;   // the hem moves, the rod does not
      transformed.z += drop * drop * (0.05 * sin(uTime * 0.9 + position.x * 7.0) + 0.03 * sin(uTime * 2.1 + position.y * 4.0 + position.x * 3.0));
      transformed.x += drop * 0.015 * sin(uTime * 0.7 + position.y * 3.0);`);
  };
  for (const side of [-1, 1]) {
    const geo = new THREE.PlaneGeometry(0.42, 1.38, 24, 32);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) p.setZ(i, 0.025 * Math.sin(p.getX(i) * 38));   // gathered folds
    geo.computeVertexNormals();
    const c = new THREE.Mesh(geo, sheer);
    c.position.set(side < 0 ? W.x0 - 0.08 : W.x1 + 0.08, W.y1 + 0.12 - 0.69, z0 + 0.07);
    curtains.push(c); g.add(c);
  }
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, ww + 0.5, 12), new THREE.MeshStandardMaterial({ color: '#c9b78d', metalness: 0.7, roughness: 0.35 }));
  rod.position.set(cx, W.y1 + 0.13, z0 + 0.07); rod.rotation.z = Math.PI / 2;
  g.add(rod);

  // the ceiling light, off
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.17, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#fbf6ea', roughness: 0.3 }));
  dome.scale.y = 0.45; dome.rotation.x = Math.PI; dome.position.set(0, h, 0);
  g.add(dome);

  scene.add(g);
  return { tick: t => { curtainTime.value = t; } };
}
const curtainTime = { value: 0 };
