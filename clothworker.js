// Steps the laundry that is moving, off the page's thread: the cloth from pile.js, as many steps of 1/600 s as each frame of the page asks for.
// One piece can hang from the hand by one point; the hand goes toward where the pointer is, over things and not through them.
// Each frame gets every particle back, until the hand lets go and everything lies still.
import { sheet, cloth, sample } from './pile.js';

const SPEED = 2.5, DT = 1 / 600;   // how fast the hand moves, metres a second
let sim = null;

onmessage = ({ data: m }) => {
  if (m.parts) {
    const parts = m.parts.map(q => [sheet(q.outline, q.h), q]), pos = new Float32Array(m.parts.reduce((a, q) => a + q.pos.length, 0)), f = m.field;
    let o = 0;
    for (const q of m.parts) { pos.set(q.pos, o); o += q.pos.length; }
    const c = cloth(parts, pos, true);
    o = 0;
    for (const q of m.parts) { c.vel.set(q.vel, o); o += q.vel.length; }
    const [high, low, bottom] = [f.h, f.low, f.bottom].map(h => sample(h, f.nx, f.nz, f.x0, f.z0, f.res));
    const field = { at: (x, z, y = Infinity) => (y < bottom(x, z) - 0.02 ? low : high)(x, z) };   // under a desk or a chair seat: what is under it
    sim = { id: m.id, c, wall: m.wall, field, pin: m.pin, calm: 0, free: 0 };
    if (m.pin >= 0) Object.assign(sim, { hand: pos.slice(3 * m.pin, 3 * m.pin + 3), target: pos.slice(3 * m.pin, 3 * m.pin + 3), tie: c.tether(m.pin) });
    return;
  }
  const s = sim;
  if (m.id !== s?.id) return;
  if (!m.held) s.pin = -1;
  if (m.hand) s.target = m.hand;
  const p = s.c.pos, was = p.slice();
  for (let k = 0; k < m.steps; k++) {
    if (s.pin >= 0) move(s);
    s.c.step(s.field, s.pin, s.hand, s.wall, s.pin >= 0 ? s.tie : null);
  }
  let moved = 0; for (let i = 0; i < p.length; i += 3) moved = Math.max(moved, Math.hypot(p[i] - was[i], p[i + 1] - was[i + 1], p[i + 2] - was[i + 2]));
  s.calm = moved / m.steps < 0.0003 ? s.calm + m.steps : 0;   // cloth at rest still shivers a little where it presses on itself
  if (s.pin < 0) s.free += m.steps;
  const done = s.pin < 0 && (s.calm > 120 || s.free > 3000);   // let go, and still for a fifth of a second, or five seconds gone
  if (done) s.c.smooth(s.field);
  postMessage({ id: s.id, pos: p.slice(), vel: s.c.vel.slice(), done });
};

function move(s) {   // one step of the hand toward the pointer; over anything lower than it, and up first when something taller is in the way
  const h = s.hand, t = s.target, dx = t[0] - h[0], dy = t[1] - h[1], dz = t[2] - h[2], k = Math.min(1, SPEED * DT / (Math.hypot(dx, dy, dz) || 1));
  const clear = (x, z) => s.field.at(x, z, h[1]) + 0.03, x = h[0] + dx * k, y = h[1] + dy * k, z = h[2] + dz * k;
  if (y >= clear(x, z)) h.set([x, y, z]);
  else if (h[1] >= clear(x, z)) h.set([x, h[1], z]);
  else h[1] += SPEED * DT;
}
