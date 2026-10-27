// Small foam basketballs for the mini hoop over the desk. At the hoop you hold one, and a flick up throws it: harder the longer the
// flick, and off to the side it leans. A ball flies under gravity and a little air drag, bounces off the backboard and the furniture,
// rattles the rim, slows through the net, and rolls away across the carpet. Three wait around the room before anyone plays.
import * as THREE from 'three';

const R = 0.045, G = 9.8, RIM = 0.105, TUBE = 0.0075;   // a 9 cm ball; the rim's radius and its tube
const ROOM = new THREE.Box3(new THREE.Vector3(-1.8, 0, -2), new THREE.Vector3(1.8, 2.45, 2));
const FURNITURE = [   // what a ball bounces off besides the room and the backboard, as min and max corners
  [[-1.75, 0.715, -2], [-0.25, 0.74, -1.38]],    // the desk top
  [[-1.25, 0.74, -2], [-0.85, 1.145, -1.635]],   // the monitor
  [[-0.565, 0, -1.95], [-0.375, 0.43, -1.49]],   // the tower
  [[-1.8, 0, -0.98], [-1.36, 0.8, -0.02]],       // the dresser
  [[0.82, 0, -2], [1.8, 0.58, -0.05]],           // the bed
].map(([a, b]) => new THREE.Box3(new THREE.Vector3(...a), new THREE.Vector3(...b)));

function skin() {   // orange foam with black seams: the equator, two meridians, and the two curved seams
  const c = Object.assign(document.createElement('canvas'), { width: 256, height: 128 }), x = c.getContext('2d');
  x.fillStyle = '#e66f24'; x.fillRect(0, 0, 256, 128);
  for (let k = 0; k < 2500; k++) { x.fillStyle = `rgba(${Math.random() < 0.5 ? '120,40,0' : '255,190,120'},${Math.random() * 0.25})`; x.fillRect(Math.random() * 256, Math.random() * 128, 1.5, 1.5); }
  x.strokeStyle = '#1a1210'; x.lineWidth = 3;
  const line = pts => { x.beginPath(); pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.stroke(); };
  line([[0, 64], [256, 64]]);
  for (const u of [1, 128, 255]) line([[u, 0], [u, 128]]);
  for (const s of [-1, 1]) line([...Array(65)].map((_, i) => [i * 4, 64 + s * 40 * Math.cos(i * 4 / 256 * Math.PI * 2)]));
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function foam(scene, camera, { rim, board, net }, sfx, say) {
  const tex = skin(), mat = new THREE.MeshStandardMaterial({ map: tex, bumpMap: tex, bumpScale: 0.6, roughness: 0.95 }), geo = new THREE.SphereGeometry(R, 24, 16);
  const blobGeo = new THREE.CircleGeometry(R * 1.1, 16).rotateX(-Math.PI / 2);   // a soft spot of shadow under each ball: the sun's shadows are drawn once
  const balls = [], boxes = [...FURNITURE, board], q = new THREE.Vector3(), n = new THREE.Vector3(), t2 = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0);
  let hand = null, aim = null, active = false, shots = 0, makes = 0, last = 0, sway = 0;

  function ball(at) {
    const m = new THREE.Mesh(geo, mat), blob = new THREE.Mesh(blobGeo, new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.3, depthWrite: false }));
    scene.add(m, blob);
    const b = { m, blob, p: new THREE.Vector3(...at), v: new THREE.Vector3() };
    balls.push(b);
    return b;
  }
  [[-0.3, R, -1.25], [0.05, R, -0.85], [-0.55, 0.74 + R, -1.55]].forEach(ball);
  function drop(b) { scene.remove(b.m, b.blob); balls.splice(balls.indexOf(b), 1); }
  function grab() {   // a new ball in your hand; with a dozen around, the oldest goes
    if (!active || hand) return;
    if (balls.length >= 12) drop(balls[0]);
    hand = ball([0, 0, 0]);
  }

  function bounce(b, normal, e, sound) {   // reflect the part of the velocity going into the surface, and rub off a little of the rest
    const vn = b.v.dot(normal);
    if (vn >= 0) return;
    b.v.addScaledVector(normal, -(1 + e) * vn);
    b.v.addScaledVector(t2.copy(b.v).addScaledVector(normal, -b.v.dot(normal)), -0.15);
    if (-vn > 0.6) sfx(sound, Math.min(1, -vn / 6));
  }
  function collide(b) {
    const p = b.p;
    for (const [i, lo, hi] of [[0, ROOM.min.x, ROOM.max.x], [1, ROOM.min.y, ROOM.max.y], [2, ROOM.min.z, ROOM.max.z]]) {
      if (p.getComponent(i) < lo + R) { p.setComponent(i, lo + R); bounce(b, n.set(0, 0, 0).setComponent(i, 1), 0.45, 'bounce'); }
      if (p.getComponent(i) > hi - R) { p.setComponent(i, hi - R); bounce(b, n.set(0, 0, 0).setComponent(i, -1), 0.4, 'bounce'); }
    }
    for (const box of boxes) {
      box.clampPoint(p, q); n.subVectors(p, q);
      const d = n.length();
      if (d >= R) continue;
      if (d < 1e-6) n.set(0, 1, 0); else n.divideScalar(d);
      p.copy(q).addScaledVector(n, R);
      if (box === board) b.board = true;
      bounce(b, n, box === board ? 0.6 : 0.4, box === board ? 'board' : 'bounce');
    }
    n.subVectors(p, rim).setY(0);   // the rim: the nearest point on its ring
    const len = n.length();
    q.copy(rim).addScaledVector(len > 1e-6 ? n.divideScalar(len) : n.set(1, 0, 0), RIM);
    n.subVectors(p, q);
    const d = n.length();
    if (d < R + TUBE) { n.divideScalar(d || 1); p.copy(q).addScaledVector(n, R + TUBE); b.rim = true; bounce(b, n, 0.5, 'rim'); }
  }

  function step(b, h) {
    const above = b.p.y > rim.y;
    b.v.y -= G * h; b.v.multiplyScalar(1 - 0.12 * h);
    b.p.addScaledVector(b.v, h);
    collide(b);
    for (const o of balls) {   // the other balls: equal weights, so each takes half of the hit
      if (o === b || o === hand) continue;
      n.subVectors(b.p, o.p); const d = n.length();
      if (d >= 2 * R || d < 1e-6) continue;
      n.divideScalar(d); b.p.addScaledVector(n, 2 * R - d);
      const vn = t2.subVectors(b.v, o.v).dot(n);
      if (vn < 0) { b.v.addScaledVector(n, -0.7 * vn); o.v.addScaledVector(n, 0.7 * vn); }
    }
    const off = Math.hypot(b.p.x - rim.x, b.p.z - rim.z);
    if (b.p.y < rim.y && b.p.y > rim.y - 0.16 && off < RIM) b.v.multiplyScalar(0.985);   // the net slows it
    if (b.shot && !b.done && above && b.p.y <= rim.y && b.v.y < 0 && off < RIM - R * 0.4) {
      b.done = true; makes++; sway = 1; sfx('swish');
      say(`${b.rim || b.board ? 'Bucket!' : 'Swish!'} ${makes} for ${shots}.`);
    }
    if (b.shot && !b.done && b.v.y < 0 && b.p.y < rim.y - 0.3) { b.done = true; say(`${b.rim || b.board ? 'Brick.' : 'Airball.'} ${makes} for ${shots}.`); }
  }

  return {
    enter() { active = true; grab(); },
    leave() { active = false; aim = null; if (hand) { drop(hand); hand = null; } },
    press(e) { if (hand) aim = { x: e.clientX, y: e.clientY }; },
    release(e) {   // the flick: up for power, sideways for aim, always at about 52 degrees
      if (!hand || !aim) return;
      const dx = e.clientX - aim.x, dy = aim.y - e.clientY; aim = null;
      if (dy < 25) return;
      const speed = 3 + 1.6 * Math.min(1, dy / innerHeight);   // 3 to 4.6 m/s: from short of the hoop to over it
      const dir = new THREE.Vector3(rim.x - hand.p.x, 0, rim.z - hand.p.z).normalize().applyAxisAngle(UP, -Math.atan2(dx, dy) * 0.6);
      hand.v.copy(dir).multiplyScalar(speed * Math.cos(0.91)).addScaledVector(UP, speed * Math.sin(0.91));   // 0.91 rad is 52 degrees
      hand.shot = true; shots++; hand = null;
      setTimeout(grab, 500);
    },
    tick(t) {
      const dt = Math.min(0.05, t - last); last = t;
      if (hand) hand.p.copy(camera.localToWorld(q.set(0.06, -0.15, -0.38)));
      for (const b of balls) {
        if (b !== hand && b.v.lengthSq() > 1e-6) {
          const before = b.p.clone();
          for (let k = 0; k < 4; k++) step(b, dt / 4);
          if (b.p.y <= R + 0.002 || boxes.some(box => b.p.y > box.max.y && box.distanceToPoint(b.p) < R + 0.003)) {   // rolling to a stop on the carpet or the furniture
            b.v.x *= 1 - 1.5 * dt; b.v.z *= 1 - 1.5 * dt; if (b.v.lengthSq() < 0.001) b.v.set(0, 0, 0);
          }
          n.subVectors(b.p, before).setY(0);
          if (n.lengthSq() > 1e-10) b.m.rotateOnWorldAxis(t2.crossVectors(UP, n).normalize(), n.length() / R);
        }
        b.m.position.copy(b.p);
        const ground = boxes.reduce((g, box) => (b.p.x > box.min.x && b.p.x < box.max.x && b.p.z > box.min.z && b.p.z < box.max.z && box.max.y <= b.p.y ? Math.max(g, box.max.y) : g), 0);
        b.blob.position.set(b.p.x, ground + 0.002, b.p.z); b.blob.visible = b !== hand;
        b.blob.material.opacity = 0.3 * Math.max(0, 1 - (b.p.y - R - ground) / 0.8);
      }
      sway *= 0.93; net.scale.set(1 - 0.06 * sway, 1 + 0.1 * sway * Math.sin(t * 30), 1 - 0.06 * sway);   // the net shakes when the ball drops through
    },
  };
}
