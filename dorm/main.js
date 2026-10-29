// Room 328: you come in through the window, out of the white, standing by the door the way you'd take a picture of the room. A click on the
// THE HALL backs you out of the door, and it swings shut on its whiteboard: anyone can draw on it, and anyone can wipe it, like a real one.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { buildDorm, ROOM, WINDOW } from './room.js';
import { menu } from './menu.js';

const SHEET = 'https://script.google.com/macros/s/AKfycbylJz7wB3gsmglRWmgsseErFp6sFF_jLC71Q6zkl9L63NyAcJ9879PNMiz7nYDYbe_9Dw/exec';   // the bedroom's sheet (tools/visitors.gs), which keeps the board too

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
const phone = matchMedia('(pointer: coarse)').matches;
renderer.setPixelRatio(Math.min(devicePixelRatio, phone ? 1 : 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;   // the shadows are drawn once; only the door moves, and it casts none worth redrawing
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = 1.1;
document.body.prepend(renderer.domElement);
RectAreaLightUniformsLib.init();

const scene = new THREE.Scene();
scene.background = new THREE.Color('#d9dfe4');
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.25;

// a grey October afternoon through a north window, and the fluorescent light on
const sky = new THREE.RectAreaLight('#dce6f0', 5, WINDOW.x1 - WINDOW.x0, WINDOW.y1 - WINDOW.y0);
sky.position.set(0, (WINDOW.y0 + WINDOW.y1) / 2, WINDOW.z + 0.02); sky.lookAt(0, 1.2, 0);
const tube = new THREE.SpotLight('#fff3df', 22, 9, 1.4, 1, 1.3);
tube.position.set(0, ROOM.h - 0.1, 0.2); tube.target.position.set(0, 0, 0.2);
tube.castShadow = true; tube.shadow.mapSize.setScalar(2048); tube.shadow.bias = -0.002; tube.shadow.normalBias = 0.06; tube.shadow.radius = 5;
scene.add(sky, tube, tube.target, new THREE.HemisphereLight('#eef2f8', '#8a7d6a', 0.55));
const { door, board, ink, inkMap, tools, pack } = buildDorm(scene);
renderer.shadowMap.needsUpdate = true;

// just inside the door, a step toward the roommate's side, looking across at Bryan's bed and desk and the window; at his desk, over the
// chair, the Dell and the cups and the Kamels; and out in the hall, square on to the door's whiteboard. Going out, you back through the
// doorway still facing in, and the door closes in front of you
const camera = new THREE.PerspectiveCamera(60, 1, 0.03, 100);
const INSIDE = [new THREE.Vector3(-0.75, 1.6, 2.2), new THREE.Vector3(0.75, 0.95, -1.35)], HALL = [new THREE.Vector3(0.02, 1.53, 3.45), new THREE.Vector3(0.02, 1.47, 2.55)];
const DESK = [new THREE.Vector3(0.38, 1.4, -1.0), new THREE.Vector3(1.42, 0.68, -1.82)];
const OUTWARD = new THREE.CatmullRomCurve3([INSIDE[0], new THREE.Vector3(-0.15, 1.58, 1.9), new THREE.Vector3(0, 1.55, 2.8), HALL[0]]);
const focus = INSIDE[1].clone(), UP = new THREE.Vector3(0, 1, 0);
camera.position.copy(INSIDE[0]);
function resize() {
  camera.aspect = innerWidth / innerHeight; camera.fov = camera.aspect < 1 ? 75 : 60; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
addEventListener('resize', resize);
resize();

const status = document.getElementById('status'), back = document.getElementById('back');
let hush = 0;
const say = (text, ms = 6000) => { status.textContent = text; status.style.opacity = 0.85; clearTimeout(hush); hush = setTimeout(() => { status.style.opacity = 0; }, ms); };
say('Room 328, Chautauqua Hall, SUNY Fredonia. Fall 2003.', 7000);
requestAnimationFrame(() => requestAnimationFrame(() => { document.getElementById('blink').style.opacity = 0; }));   // out of the white the flight ended in

const clock = new THREE.Clock(), ease = x => (x = Math.min(1, Math.max(0, x))) * x * (3 - 2 * x);
let where = 'inside', move = null;   // inside, desk, or hall; move: a trip between two of them
const LABEL = { inside: 'THE HALL', desk: 'BACK', hall: 'BACK INSIDE' };
function go(to) {
  if (move || held || to === where) return;
  move = { from: where, to, t0: clock.getElapsedTime(), at: camera.position.clone(), look: focus.clone() }; where = to; back.textContent = LABEL[to];
  if (to === 'hall') { load(); say(`The door of 328. ${phone ? 'Tap' : 'Click'} a marker, then draw on the board; the eraser wipes it. Whoever comes by next sees what you leave.`, 9000); }
  if (to === 'desk') say(`Bryan's desk. ${phone ? 'Tap' : 'Click'} the Kamels.`, 4000);
  if (move.from === 'hall' && timer) { clearTimeout(timer); save(); }
}
back.onclick = () => go(where === 'inside' ? 'hall' : 'inside');
addEventListener('keydown', e => { if (e.key === 'Escape') go('inside'); });

// the whiteboard: a marker draws, the eraser wipes, and a few seconds after you stop the board goes up to the sheet as a picture
const pen = ink.getContext('2d'), ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const cast = (e, objs) => { ndc.set(e.clientX / innerWidth * 2 - 1, 1 - e.clientY / innerHeight * 2); ray.setFromCamera(ndc, camera); return ray.intersectObjects(objs, false)[0]; };
const at = uv => ({ x: uv.x * ink.width, y: (1 - uv.y) * ink.height });
let tool = '#1a1a1a', last = null, drawn = false, timer = 0;
function stroke(a, b) {
  const rub = tool === 'eraser';
  Object.assign(pen, { strokeStyle: rub ? '#fbfbf8' : tool, lineWidth: rub ? 30 : 7, lineCap: 'round', lineJoin: 'round' });
  pen.beginPath(); pen.moveTo(a.x, a.y); pen.lineTo(b.x, b.y); pen.stroke();
  inkMap.needsUpdate = true;
}
function load() {   // what the last visitor left, unless you've already started drawing over it
  if (drawn) return;
  fetch(`${SHEET}?board=1`).then(r => r.json()).then(r => {
    if (!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(r?.board || '')) return;
    const img = new Image();
    img.onload = () => { if (!drawn) { pen.drawImage(img, 0, 0, ink.width, ink.height); inkMap.needsUpdate = true; } };
    img.src = r.board;
  }).catch(() => {});
}
async function save() {   // a sheet cell holds 50,000 characters: a busy board goes up smaller
  timer = 0;
  let url;
  for (const k of [1, 0.75, 0.5]) {
    const c = k === 1 ? ink : Object.assign(document.createElement('canvas'), { width: ink.width * k, height: ink.height * k });
    if (k !== 1) c.getContext('2d').drawImage(ink, 0, 0, c.width, c.height);
    url = c.toDataURL('image/png');
    if (url.length <= 49000) break;
  }
  const r = await fetch(SHEET, { method: 'POST', body: JSON.stringify({ board: url }) }).then(x => x.json()).catch(() => null);   // plain text, so no CORS preflight
  say(r && !r.error ? 'On the door now. The next visitor sees it.' : `It didn't save${r?.error ? `: ${r.error}` : '.'}`, 3500);
}
const canvas = renderer.domElement;
canvas.addEventListener('pointerdown', e => {
  if (move) return;
  if (where === 'inside') { if (cast(e, deskArea)) go('desk'); else if (cast(e, [pane])) home(e); return; }
  if (where === 'desk') { if (!held && cast(e, smokes)) takeUp(); else if (!held && !cast(e, deskArea)) go('inside'); return; }
  const hit = cast(e, [board, ...tools]);
  if (!hit) return;
  if (hit.object !== board) { tool = hit.object.userData.tool; say(tool === 'eraser' ? 'The eraser.' : 'A marker.', 1500); return; }
  last = at(hit.uv); drawn = true; stroke(last, last); canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', e => {
  if (where !== 'hall' && !move) canvas.style.cursor = !held && cast(e, where === 'inside' ? [desk, pane] : smokes) ? 'pointer' : '';
  if (move || where !== 'hall') return;
  const hit = cast(e, [board, ...tools]);
  canvas.style.cursor = !hit ? '' : hit.object === board ? 'crosshair' : 'pointer';
  if (last && hit?.object === board) { const p = at(hit.uv); stroke(last, p); last = p; }
});
addEventListener('pointerup', () => { if (!last) return; last = null; clearTimeout(timer); timer = setTimeout(save, 2500); });

// the pack of Kamels: up to your face, a question, and the lucky turned upside down in its row, the one you smoke last
const X = new THREE.Vector3(1, 0, 0), hidden = new THREE.MeshBasicMaterial({ visible: false });
const grab = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.1), hidden), desk = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.75, 1.15), hidden);
pack.add(grab); desk.position.set(1.43, 0.95, -1.87); scene.add(desk);   // the pack a little bigger than itself; the desk and all that is on it
const smokes = [grab], deskArea = [desk];
// the window you came in by is the way home: back into the white, and out of it in the bedroom in Horseheads
const pane = new THREE.Mesh(new THREE.PlaneGeometry(WINDOW.x1 - WINDOW.x0, WINDOW.y1 - WINDOW.y0), hidden);
pane.position.set((WINDOW.x0 + WINDOW.x1) / 2, (WINDOW.y0 + WINDOW.y1) / 2, WINDOW.z + 0.05); scene.add(pane);
const home = e => menu(e.clientX, e.clientY, 'HOME TO HORSEHEADS?', [['YES', true], ['NO', false]], yes => {
  if (!yes) return;
  document.getElementById('blink').style.opacity = 1; setTimeout(() => { location.href = '../'; }, 1300);
});
let held = null;
const phase = p => { held.phase = p; held.t0 = clock.getElapsedTime(); };
function takeUp() {
  held = { pos: pack.position.clone(), quat: pack.quaternion.clone() }; phase('up');
  say('A pack of Kamel Reds.', 3000);
}
function hold(t) {   // up 0.5 s, the question, the flip 2.9 s, down 0.5 s
  const s = t - held.t0, { lid, lucky } = pack.userData;
  const k = held.phase === 'up' ? ease(s / 0.5) : held.phase === 'down' ? 1 - ease(s / 0.5) : 1;
  const to = camera.localToWorld(new THREE.Vector3(0, -0.01, -0.22)), toQ = camera.quaternion.clone().multiply(new THREE.Quaternion().setFromAxisAngle(X, 0.5));   // tipped toward you, so you see in the top
  pack.position.lerpVectors(held.pos, to, k); pack.quaternion.slerpQuaternions(held.quat, toQ, k);
  if (held.phase === 'up' && s > 0.5) {
    phase('ask');
    menu(innerWidth * 0.6, innerHeight * 0.3, 'FLIP THE LUCKY?', [['YES', true], ['NO', false]], yes => { held.n = lucky.userData.flips ?? 0; phase(yes ? 'flip' : 'down'); }, () => phase('down'));
  }
  else if (held.phase === 'flip') {
    const n = held.n;   // how many times it had been flipped when this flip began: once a flip, however many frames see the end
    lid.rotation.x = -2.1 * (ease(s / 0.5) - ease((s - 2.4) / 0.5));
    lucky.position.y = -0.0015 + 0.075 * (ease((s - 0.5) / 0.6) - ease((s - 1.8) / 0.6));
    lucky.rotation.z = (n + ease((s - 1.1) / 0.7)) * Math.PI;   // end over end, in front of you
    if (s > 2.9) { lucky.userData.flips = n + 1; say(n % 2 ? 'Turned back the right way.' : 'The lucky. Smoke it last.', 3500); phase('down'); }
  }
  else if (held.phase === 'down' && s > 0.5) { pack.position.copy(held.pos); pack.quaternion.copy(held.quat); held = null; }
}

// the head turns with the pointer, inside; out in the hall it holds still so you can draw
const mouse = new THREE.Vector2(), look = new THREE.Vector2(), aim = new THREE.Vector3(), side = new THREE.Vector3();
addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.buttons) mouse.set(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1); });
let drift = 1;
renderer.setAnimationLoop(() => {
  const t = clock.getElapsedTime();
  if (move && (move.from === 'hall' || move.to === 'hall')) {   // through the door
    const s = t - move.t0, u = ease((s - 0.3) / 1.4), k = move.to === 'hall' ? u : 1 - u;
    camera.position.copy(OUTWARD.getPointAt(k)); focus.lerpVectors(INSIDE[1], HALL[1], k);
    door.rotation.y = -1.75 * (s < 1.5 ? ease(s / 0.6) : 1 - ease((s - 1.5) / 0.8));   // open into the room, then shut
    if (s > 2.3) { move = null; door.rotation.y = 0; }
  } else if (move) {   // across the room
    const s = ease((t - move.t0) / 1.2), [to, toLook] = move.to === 'desk' ? DESK : INSIDE;
    camera.position.lerpVectors(move.at, to, s); focus.lerpVectors(move.look, toLook, s);
    if (s === 1) move = null;
  }
  drift += ((where !== 'hall' && !move && !held ? 1 : 0) - drift) * 0.08;
  look.lerp(mouse, 0.04);
  const reach = drift * camera.position.distanceTo(focus) / 4.1;   // the head turns through the same angle up close as across the room
  side.subVectors(focus, camera.position).cross(UP).normalize();
  aim.copy(focus).addScaledVector(side, (look.x * 1.1 + Math.sin(t * 0.13) * 0.05) * reach);
  aim.y += (-look.y * 0.6 + Math.sin(t * 0.11) * 0.03) * reach;
  camera.lookAt(aim);
  camera.updateMatrixWorld();
  if (held) hold(t);
  renderer.render(scene, camera);
});
Object.assign(window, { THREE, scene, camera });
