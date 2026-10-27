// Firenewty, a Chinese fire-bellied newt: a dark back and an orange belly. He walks the gravel, swims the shallow end, comes up for air,
// rests a while wherever he gets to, and goes after any bloodworm that drops in. Everything is in the tank's frame: x along the length, y up from the tank floor.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const LEN = 0.075, NU = 48, NT = 14, STRIDE = 0.014;
// half-width and half-height from the snout (u = 0) to the tail tip (u = 1): a flat head, a round trunk, a tail flat side to side
const U = [0, 0.03, 0.08, 0.14, 0.18, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9, 1];
const HW = [0.0005, 0.0035, 0.0058, 0.0062, 0.005, 0.0058, 0.0062, 0.0045, 0.0028, 0.0018, 0.0009, 0.0002];
const HH = [0.0004, 0.0022, 0.0034, 0.0036, 0.0034, 0.0042, 0.0045, 0.0042, 0.004, 0.0034, 0.002, 0.0003];
const at = (ys, u) => { let i = 1; while (U[i] < u) i++; let k = (u - U[i - 1]) / (U[i] - U[i - 1]); k = k * k * (3 - 2 * k); return ys[i - 1] + (ys[i] - ys[i - 1]) * k; };
const bodyX = u => LEN * (0.35 - u);   // the origin is between the legs; the head points +x
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function body() {
  const pos = new Float32Array((NU + 1) * NT * 3), col = new Float32Array(pos.length), idx = [];
  const back = new THREE.Color('#1c1815'), belly = new THREE.Color('#ff5a1a'), c = new THREE.Color();
  for (let i = 0; i <= NU; i++) for (let j = 0; j < NT; j++) {
    const u = i / NU, a = j / NT * Math.PI * 2, s = Math.sin(a), k = 3 * (i * NT + j);
    pos[k] = bodyX(u); pos[k + 1] = at(HH, u) * s * (s < 0 ? 0.75 : 1); pos[k + 2] = at(HW, u) * Math.cos(a);
    c.copy(s < -0.3 && u < 0.7 && Math.random() > 0.15 ? belly : back).offsetHSL(0, 0, (Math.random() - 0.5) * 0.04).toArray(col, k);
    if (i < NU) { const a0 = i * NT + j, a1 = i * NT + (j + 1) % NT; idx.push(a0, a1, a0 + NT, a1, a1 + NT, a0 + NT); }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); geo.setIndex(idx);
  return geo;
}

export function newt(tank, { L, W, bank, water }) {
  const g = new THREE.Group(); g.rotation.order = 'YZX'; tank.add(g);
  const skin = new THREE.MeshStandardMaterial({ color: '#1c1815', roughness: 0.45 });
  const geo = body(), flat = geo.attributes.position.array.slice();
  g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4 })));
  const eye = new THREE.SphereGeometry(0.0011, 8, 6), eyes = [-1, 1].map(s => {
    const e = new THREE.Mesh(eye, new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.1 })); e.position.set(bodyX(0.07), 0.002, s * 0.0047); g.add(e); return e;
  });
  const legR = mergeGeometries([new THREE.CapsuleGeometry(0.0011, 0.006, 3, 6).rotateX(Math.PI / 2).translate(0, 0, 0.0045),
    new THREE.SphereGeometry(0.0017, 8, 6).scale(1.4, 0.4, 1).translate(0.0008, 0, 0.0092)]).rotateX(0.6);   // splayed out and down
  const legL = legR.clone().rotateY(Math.PI);
  const legs = [[0.22, 1, 0], [0.22, -1, Math.PI], [0.47, 1, Math.PI], [0.47, -1, 0]].map(([u, side, off]) => {   // diagonal pairs step together
    const pivot = new THREE.Object3D(); pivot.rotation.order = 'YXZ'; pivot.position.set(bodyX(u), -0.0015, side * at(HW, u) * 0.85);
    pivot.add(new THREE.Mesh(side > 0 ? legR : legL, skin)); g.add(pivot);
    return { pivot, side, off, ring: Math.round(u * NU), z: pivot.position.z };
  });

  const XB = (L - 0.009) / 2, ZB = (W - 0.009) / 2, ground = x => bank(x / (L - 0.008) + 0.5) + 0.004;   // the top of the pebbles
  const p = new THREE.Vector3(-0.05, ground(-0.05) + 0.0045, 0), target = new THREE.Vector3(), head = new THREE.Vector3(), dzs = new Float32Array(NU + 1);
  let yaw = Math.random() * 6, mix = 0, phase = 0, wave = 0, omega = 0, last = 0, picked = 0, arrived = false, until = 0, linger = 1, puff = 0;
  function pick(t) {   // somewhere on the gravel, or somewhere in the water: on the bottom, in between, or up at the surface for air
    const wet = Math.random() < 0.55, x = wet ? 0.03 + Math.random() * 0.06 : -0.09 + Math.random() * 0.07, floor = ground(x) + 0.0045;
    target.set(x, wet && Math.random() < 0.3 ? water - 0.003 : floor + (wet ? Math.random() * (water - 0.004 - floor) : 0), (Math.random() - 0.5) * 0.08);
    picked = t;
  }
  pick(0);

  // bloodworms dropped in through the hatch, and the air he lets go under water
  const worms = [], bubbles = [];
  const wormGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([[-6, 0], [-3, 1.5], [0, 0], [3, -1.5], [6, 0]].map(([a, b]) => new THREE.Vector3(a / 1000, 0, b / 1000))), 16, 0.0006, 5);
  const wormMat = new THREE.MeshStandardMaterial({ color: '#8a0f18', roughness: 0.35 });
  const bubbleGeo = new THREE.SphereGeometry(0.0012, 8, 6), bubbleMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0, transparent: true, opacity: 0.45 });
  const inside = v => v.set(clamp(v.x, -XB + 0.03, XB - 0.03), v.y, clamp(v.z, -ZB + 0.02, ZB - 0.02));
  function feed(ray) {   // a worm drops in where the click meets the water line, sinks, and wriggles on the bottom
    const at = ray.clone().applyMatrix4(tank.matrixWorld.clone().invert()).intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -water), new THREE.Vector3());
    if (!at || worms.length > 4) return;
    const floor = ground(inside(at).x) + 0.0015, w = new THREE.Mesh(wormGeo, wormMat);
    w.position.set(at.x, Math.max(water, floor + 0.02), at.z); w.userData = { floor, sink: floor < water ? 0.006 : 0.08, spin: Math.random() * 6 };
    tank.add(w); worms.push(w);
  }
  function greet(eye) {   // he notices you and comes over to the glass nearest you, and stays there a while
    const at = inside(tank.worldToLocal(eye.clone()));
    target.set(at.x, (ground(at.x) + water) / 2, at.z); picked = last; arrived = false; until = 0; linger = 6;
  }

  function tick(t) {
    const dt = Math.min(0.1, t - last); last = t;
    const swimming = water - ground(p.x) > 0.012;
    mix += ((swimming ? 1 : 0) - mix) * Math.min(1, dt * 1.5);
    head.set(p.x + Math.cos(yaw) * LEN * 0.35, p.y, p.z - Math.sin(yaw) * LEN * 0.35);
    const food = worms[0];
    if (food) {   // a worm in the tank: go for it and gulp it down
      target.copy(food.position); picked = t; arrived = false;
      if (head.distanceTo(food.position) < 0.009) { tank.remove(food); worms.shift(); until = t + 1.2; }
    } else if (arrived ? t > until : Math.hypot(target.x - head.x, target.z - head.z) < 0.012 || t - picked > 25) {   // there: stay a while, then go somewhere else
      if (arrived) pick(t); else until = t + linger;
      arrived = !arrived; linger = 0.5 + Math.random() * 2.5;
    }
    const still = arrived || t < until;
    let err = Math.atan2(-(target.z - p.z), target.x - p.x) - yaw; err = Math.atan2(Math.sin(err), Math.cos(err));
    const turn = still ? 0 : Math.sign(err) * Math.min(Math.abs(err), (swimming ? 0.9 : 0.6) * dt);
    yaw += turn; omega += ((dt ? turn / dt : 0) - omega) * Math.min(1, dt * 3);
    const ds = still ? 0 : (swimming ? 0.011 : 0.0055) * dt * Math.max(0.25, Math.cos(err));
    p.x += Math.cos(yaw) * ds; p.z -= Math.sin(yaw) * ds;
    const ex = Math.abs(Math.cos(yaw)) * 0.05 + 0.004, ez = Math.abs(Math.sin(yaw)) * 0.05 + 0.007;   // keep the whole body inside the tub
    p.x = clamp(p.x, -XB + ex, XB - ex); p.z = clamp(p.z, -ZB + ez, ZB - ez);
    const floor = ground(p.x) + 0.0045, y0 = p.y;
    p.y = Math.max(floor, p.y + ((swimming ? clamp(target.y, floor, water - 0.003) : floor) - p.y) * Math.min(1, dt * (swimming ? 0.8 : 4)));
    const pitch = swimming ? clamp(Math.atan2((p.y - y0) / (dt || 1), 0.011), -0.5, 0.5) : Math.atan(-0.05 / (L - 0.008) * Math.cos(yaw));
    g.position.copy(p); g.rotation.set(0, yaw, pitch);

    phase += 2 * Math.PI * ds / STRIDE * (1 - mix); wave += dt * 2 * Math.PI * (0.4 + 1.1 * mix);
    for (let i = 0; i <= NU; i++) {
      const u = i / NU;
      dzs[i] = (1 - mix) * 0.0035 * Math.sin(phase) * Math.sin(2 * Math.PI * (u - 0.1) * 0.9)   // walking: the trunk sways with the legs
        + mix * 0.006 * (0.15 + u) * Math.sin(2 * Math.PI * 1.1 * u - wave)                    // swimming: a wave down to the tail
        - 0.009 * omega * ((u - 0.35) * 1.6) ** 2;                                               // turning: head and tail curl in
    }
    const pos = geo.attributes.position;
    for (let v = 0; v < pos.count; v++) pos.array[v * 3 + 2] = flat[v * 3 + 2] + dzs[Math.floor(v / NT)];
    pos.needsUpdate = true; geo.computeVertexNormals();
    eyes.forEach((e, k) => { e.position.z = (k ? 1 : -1) * 0.0047 + dzs[3]; });
    for (const l of legs) {
      const swing = 0.5 * Math.sin(phase + l.off), lift = Math.max(0, Math.cos(phase + l.off)) * 0.35;
      l.pivot.position.z = l.z + dzs[l.ring];
      l.pivot.rotation.set(-l.side * (lift * (1 - mix) + 0.6 * mix), l.side * ((1 - mix) * swing - mix * 1.2), 0);   // in the water the legs fold up and back
    }

    for (const w of worms) { w.position.y = Math.max(w.userData.floor, w.position.y - w.userData.sink * dt); w.rotation.set(0, w.userData.spin + Math.sin(t * 5 + w.id) * 0.6, Math.sin(t * 7 + w.id) * 0.3); }
    if (swimming && p.y < water - 0.008 && t > puff) {
      puff = t + 3 + Math.random() * 5;
      const b = new THREE.Mesh(bubbleGeo, bubbleMat); b.position.copy(head); b.castShadow = false; tank.add(b); bubbles.push(b);
    }
    for (const b of bubbles) { b.position.y += 0.025 * dt; b.position.x += Math.sin(t * 9 + b.id) * 0.00015; }
    while (bubbles.length && bubbles[0].position.y > water) tank.remove(bubbles.shift());
  }
  return { tick, feed, greet };
}
