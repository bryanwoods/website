// Snood, the game Bryan played most, rebuilt for the bedroom computer from Dave Dobson's 1996 shareware. Aim the launcher with the mouse
// or a finger and let go to fire. Three or more alike knock each other out, and whatever is left hanging falls. Every shot fills the
// Danger Meter, and a full meter brings the ceiling down a row. A snood past the line at the bottom ends the game.
// The names and rules are Snood's; the faces are drawn here, not copied. Snood belongs to Snood, LLC: ask before the room is promoted.
const D = 32, R = 16, H = 27.7, C = 9, W = C * D, FH = 368, LINE = 312, GUN = { x: W / 2, y: FH - 26 }, SPEED = 900;
const SNOODS = [['Jake', '#2f6fe0'], ['Midoribe', '#38b040'], ['Mildred', '#a4a4b0'], ['Spike', '#8c3cd8'], ['Zod', '#e0322a'], ['Geji', '#58ccf0'], ['Sunny', '#ffcc1a']];
const SKULL = 7, WILD = 8, STONE = 9;
const LEVELS = {   // kinds of snood, rows to start with, shots that fill the Danger Meter, Numbskulls in the way
  Child: [4, 4, 12, 0], Easy: [5, 5, 9, 0], Medium: [6, 6, 7, 0], Hard: [7, 6, 6, 3], Evil: [7, 7, 5, 6],
};

function eye(g, x, y, rx, ry, lx, ly, white = '#fff') {
  g.fillStyle = white; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#000'; g.beginPath(); g.arc(x + lx * rx * 0.45, y + ly * ry * 0.45, Math.min(rx, ry) * 0.5, 0, 7); g.fill();
}
function arc(g, x, y, r, a, b, fill) {
  g.beginPath(); g.arc(x, y, r, a * Math.PI, b * Math.PI);
  if (fill) { g.closePath(); g.fillStyle = fill; g.fill(); }
  g.stroke();
}
function line(g, ...pts) { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); }

// one snood at x, y, s times its size, its pupils turned toward the point `look`
function snoodAt(g, k, x, y, s, look) {
  const c = k < SKULL ? SNOODS[k][1] : k === SKULL ? '#ebe6d6' : '#8b8b86', d = Math.hypot(look.x - x, look.y - y) || 1, lx = (look.x - x) / d, ly = (look.y - y) / d;
  g.save(); g.translate(x, y); g.scale(s, s); g.lineWidth = 1.4; g.strokeStyle = '#000';
  if (k === 6) for (let a = 0; a < 12; a++) { g.save(); g.rotate(a * Math.PI / 6); g.fillStyle = '#ff9a1a'; g.beginPath(); g.moveTo(-3.2, -11); g.lineTo(0, -16); g.lineTo(3.2, -11); g.fill(); g.stroke(); g.restore(); }   // Sunny's rays
  if (k === 4) for (const sx of [-1, 1]) { g.fillStyle = '#7a1010'; g.beginPath(); g.moveTo(sx * 5, -12); g.lineTo(sx * 10, -17.5); g.lineTo(sx * 11, -8); g.fill(); g.stroke(); }   // Zod's horns
  if (k === 1) { g.fillStyle = '#1e7a24'; g.beginPath(); g.ellipse(5, -15, 5.5, 2.4, -0.5, 0, 7); g.fill(); g.stroke(); }   // Midoribe's leaf
  if (k === 2) { g.fillStyle = '#76767f'; g.beginPath(); g.arc(0, -14, 5, 0, 7); g.fill(); g.stroke(); }   // Mildred's bun
  g.beginPath();
  if (k === 0) g.roundRect(-14.5, -14.5, 29, 29, 8);
  else if (k === 3) for (let a = 0; a < 20; a++) { const q = a % 2 ? 11.5 : 16; g.lineTo(q * Math.sin(a * Math.PI / 10), -q * Math.cos(a * Math.PI / 10)); }
  else if (k === 5) { g.moveTo(0, -15.5); g.quadraticCurveTo(17, 10, 13, 13.5); g.quadraticCurveTo(0, 18, -13, 13.5); g.quadraticCurveTo(-17, 10, 0, -15.5); }
  else if (k === STONE) [[0, -15], [11, -10], [15, 2], [8, 13], [-6, 14], [-15, 4], [-11, -10]].forEach(([a, b]) => g.lineTo(a, b));
  else g.arc(0, 0, k === 6 ? 12 : 15, 0, 7);
  g.closePath();
  if (k === WILD) { const cg = g.createConicGradient(0, 0, 0); ['#f33', '#fc3', '#3c3', '#3cf', '#36f', '#c3f', '#f33'].forEach((col, i) => cg.addColorStop(i / 6, col)); g.fillStyle = cg; } else g.fillStyle = c;
  g.fill();
  const hl = g.createRadialGradient(-5, -6, 1, -3, -3, 16); hl.addColorStop(0, 'rgba(255,255,255,.55)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = hl; g.fill(); g.stroke();
  if (k === 0) { eye(g, -5.5, -4, 4, 5, lx, ly); eye(g, 5.5, -4, 4, 5, lx, ly); g.beginPath(); g.moveTo(-8, 3); g.quadraticCurveTo(0, 15, 8, 3); g.closePath(); g.fillStyle = '#fff'; g.fill(); g.stroke(); line(g, [-3, 3.5], [-3, 7.5]); line(g, [3, 3.5], [3, 7.5]); }
  if (k === 1) { eye(g, 0, -3, 7, 7, lx, ly); arc(g, 0, 4, 5, 0.2, 0.8); }
  if (k === 2) { g.lineWidth = 2; eye(g, -5.5, -3, 4.5, 4.5, lx, ly); eye(g, 5.5, -3, 4.5, 4.5, lx, ly); line(g, [-1, -3], [1, -3]); g.lineWidth = 1.4; arc(g, 0, 7.5, 2, 0, 2, '#600'); }
  if (k === 3) { eye(g, -5, -1, 3.5, 4, lx, ly); eye(g, 5, -1, 3.5, 4, lx, ly); g.lineWidth = 2; line(g, [-9, -7], [-2, -4]); line(g, [9, -7], [2, -4]); g.lineWidth = 1.4; arc(g, 0, 11, 5, 1.2, 1.8); }
  if (k === 4) { eye(g, -5.5, -3, 4.5, 3, lx, ly, '#ffe14a'); eye(g, 5.5, -3, 4.5, 3, lx, ly, '#ffe14a'); line(g, [-7, 5], [7, 5]); for (const fx of [-4, 4]) { g.fillStyle = '#fff'; g.beginPath(); g.moveTo(fx - 1.6, 5); g.lineTo(fx + 1.6, 5); g.lineTo(fx, 9); g.closePath(); g.fill(); g.stroke(); } }
  if (k === 5) {
    for (const ex of [-5, 5]) { eye(g, ex, 1, 4, 4, lx, ly); g.fillStyle = c; g.beginPath(); g.ellipse(ex, 1, 4.6, 4.6, 0, Math.PI, 0); g.fill(); line(g, [ex - 4, 1], [ex + 4, 1]); }   // half asleep
    line(g, [-4, 8], [4, 8]); arc(g, 1.5, 8, 2.5, 0, 1, '#ff6f91');
  }
  if (k === 6) { arc(g, -4.5, -1, 3, 1.15, 1.85); arc(g, 4.5, -1, 3, 1.15, 1.85); arc(g, 0, 2, 6, 0.15, 0.85, '#c03020'); }
  if (k === SKULL) { g.fillStyle = '#000'; for (const ex of [-5.5, 5.5]) { g.beginPath(); g.ellipse(ex, -3, 4, 4.5, 0, 0, 7); g.fill(); } g.beginPath(); g.moveTo(0, 2); g.lineTo(-1.8, 5.5); g.lineTo(1.8, 5.5); g.fill(); for (const tx of [-4, 0, 4]) line(g, [tx, 8], [tx, 12]); }
  if (k === WILD) { g.fillStyle = '#fff'; g.beginPath(); for (let a = 0; a < 10; a++) { const q = a % 2 ? 3 : 7.5; g.lineTo(q * Math.sin(a * Math.PI / 5), -q * Math.cos(a * Math.PI / 5)); } g.closePath(); g.fill(); g.stroke(); }
  if (k === STONE) { line(g, [-4, -8], [0, -2], [-3, 4]); line(g, [6, 0], [10, 4]); }
  g.restore();
}

export function snood(open, sfx, icon) {
  const w = open('Snood', 'snood', 120, 6, `<div class="menubar"><span>Game</span><span>Options</span><span>Help</span></div>
    <div class="window-body"><div class="well"><canvas width="${W * 2}" height="${FH * 2}"></canvas></div>
      <div class="side"><fieldset><legend>Score</legend><b class="score">0</b></fieldset><fieldset><legend>Level</legend><b class="lvl">1</b></fieldset>
        <div class="meter"><div></div></div><label>Danger</label>
        <select class="diff">${Object.keys(LEVELS).map(l => `<option${l === 'Medium' ? ' selected' : ''}>${l}</option>`).join('')}</select><button class="new">New Game</button></div></div>`, icon);
  const cv = w.querySelector('canvas'), g = cv.getContext('2d'), $ = s => w.querySelector(s);
  g.scale(2, 2);
  let grid, diff = 'Medium', level, score, danger, ceil, shown, ball, held, aim = Math.PI / 2, over, msg = '', until = 0, now = 0, last = 0, fx = [];
  const odd = i => i % 2, cols = i => C - odd(i), at = (i, j) => grid[i]?.[j];
  const X = (i, j) => R + j * D + odd(i) * R, Y = (i, c = ceil) => R + (i + c) * H;
  const each = f => grid.forEach((row, i) => row.forEach((k, j) => { if (k != null) f(i, j, k); }));
  const near = (i, j) => (odd(i) ? [[i, j - 1], [i, j + 1], [i - 1, j], [i - 1, j + 1], [i + 1, j], [i + 1, j + 1]] : [[i, j - 1], [i, j + 1], [i - 1, j - 1], [i - 1, j], [i + 1, j - 1], [i + 1, j]])
    .filter(([a, b]) => a >= 0 && b >= 0 && b < cols(a));
  const say = (text, s = 1.4) => { msg = text; until = now + s; };
  const cap = () => LEVELS[diff][2];
  function hud() {
    $('.score').textContent = score.toLocaleString('en-US'); $('.lvl').textContent = level;
    $('.meter div').style.height = `${(1 - Math.min(1, danger / cap())) * 100}%`;
    $('.meter').classList.toggle('hot', danger >= cap() - 1.5 && !over);
  }
  function pick() {   // what loads next: now and then a Wildcard or a Stone, otherwise a kind still on the board
    const r = Math.random();
    if (r < 0.04) return WILD;
    if (r < 0.07) return STONE;
    const left = new Set(); each((i, j, k) => { if (k < SKULL) left.add(k); });
    const ks = left.size ? [...left] : [...Array(LEVELS[diff][0]).keys()];
    return ks[Math.floor(Math.random() * ks.length)];
  }
  function deal() {   // a new board: alike snoods often side by side, Numbskulls scattered in on Hard and Evil
    const [n, rows, , skulls] = LEVELS[diff];
    grid = []; ceil = shown = danger = 0; ball = null;
    for (let i = 0; i < rows + Math.min(level - 1, 2); i++) {
      grid.push(Array.from({ length: cols(i) }, (_, j) => {
        const by = near(i, j).map(([a, b]) => at(a, b)).filter(k => k != null && k < SKULL);
        return by.length && Math.random() < 0.45 ? by[Math.floor(Math.random() * by.length)] : Math.floor(Math.random() * n);
      }));
    }
    for (let s = 0; s < skulls; s++) { const i = 1 + Math.floor(Math.random() * (grid.length - 1)); grid[i][Math.floor(Math.random() * cols(i))] = SKULL; }
    held = pick(); say(`Level ${level}`); hud();
  }
  function newGame() { level = 1; score = 0; over = false; fx = []; deal(); }
  function fire() {
    if (over) return newGame();
    if (ball || held == null) return;
    ball = { k: held, x: GUN.x, y: GUN.y, vx: Math.cos(aim) * SPEED, vy: -Math.sin(aim) * SPEED }; held = null; sfx('shoot');
  }
  function flood(i, j, want) {   // the group joined to i, j: snoods of the kind `want`, and Wildcards, which stand in for any kind
    const seen = new Set([`${i},${j}`]), out = [[i, j]];
    for (let q = 0; q < out.length; q++) for (const [a, b] of near(...out[q])) {
      if (!seen.has(`${a},${b}`) && (at(a, b) === want || at(a, b) === WILD)) { seen.add(`${a},${b}`); out.push([a, b]); }
    }
    return out;
  }
  function land() {
    let best, bd = Infinity;   // the nearest empty place that hangs from the ceiling or from another snood
    for (let i = 0; i <= grid.length; i++) for (let j = 0; j < cols(i); j++) {
      if (at(i, j) != null || (i && !near(i, j).some(([a, b]) => at(a, b) != null))) continue;
      const d = Math.hypot(ball.x - X(i, j), ball.y - Y(i));
      if (d < bd) { bd = d; best = [i, j]; }
    }
    const [i, j] = best, { k } = ball;
    ball = null;
    (grid[i] ??= Array(cols(i)).fill(null))[j] = k;
    const gone = new Map();
    if (k === STONE) [[i, j], ...near(i, j)].forEach(([a, b]) => { if (at(a, b) != null) gone.set(`${a},${b}`, [a, b]); });   // a Stone knocks out what it lands against
    else for (const want of k === WILD ? new Set(near(i, j).map(([a, b]) => at(a, b)).filter(x => x != null && x !== WILD)) : [k]) {
      const group = flood(i, j, want);
      if (group.length >= 3) group.forEach(([a, b]) => gone.set(`${a},${b}`, [a, b]));
    }
    for (const [a, b] of gone.values()) { fx.push({ k: at(a, b), x: X(a, b), y: Y(a), t: 0 }); grid[a][b] = null; }
    const hung = new Set(), q = grid[0]?.map((x, b) => [0, b]).filter(([a, b]) => at(a, b) != null) ?? [];   // what still hangs from the ceiling
    q.forEach(([a, b]) => hung.add(`${a},${b}`));
    for (let n = 0; n < q.length; n++) for (const [a, b] of near(...q[n])) if (at(a, b) != null && !hung.has(`${a},${b}`)) { hung.add(`${a},${b}`); q.push([a, b]); }
    let fell = 0;
    each((a, b, x) => { if (!hung.has(`${a},${b}`)) { fx.push({ k: x, x: X(a, b), y: Y(a), vx: (Math.random() - 0.5) * 80, vy: -40 - Math.random() * 80, t: 0 }); grid[a][b] = null; fell++; } });
    while (grid.length && grid.at(-1).every(x => x == null)) grid.pop();
    score += gone.size * 10 + fell * 30;
    danger = Math.max(0, danger + 1 - 0.35 * (gone.size + fell));
    if (gone.size) sfx('pop', gone.size); if (fell) sfx('fall');
    if (!grid.length) {   // cleared: a bonus for how little danger was left, and the next level
      const bonus = 250 * level + Math.round((cap() - danger) * 50);
      score += bonus; level++; say(`Level clear! +${bonus}`, 1.6); sfx('win'); hud();
      return setTimeout(() => { if (!over && w.isConnected) deal(); }, 1600);
    }
    if (danger >= cap()) { ceil++; danger = 0; sfx('ceiling'); }
    if (grid.some((row, a) => row.some(x => x != null) && Y(a) + R > LINE)) {   // over the line: every snood turns into a Numbskull
      over = true; each((a, b) => { grid[a][b] = SKULL; }); say('Game Over', Infinity); sfx('lose');
    } else held = pick();
    hud();
  }
  function step(dt) {
    shown += (ceil - shown) * Math.min(1, dt * 8);
    for (const f of fx) { f.t += dt; if (f.vy != null) { f.vy += 900 * dt; f.x += f.vx * dt; f.y += f.vy * dt; } }
    fx = fx.filter(f => (f.vy != null ? f.y < FH + R : f.t < 0.3));
    if (!ball) return;
    const n = Math.ceil(SPEED * dt / 4);
    for (let s = 0; s < n; s++) {
      ball.x += ball.vx * dt / n; ball.y += ball.vy * dt / n;
      if (ball.x < R) { ball.x = 2 * R - ball.x; ball.vx *= -1; }
      if (ball.x > W - R) { ball.x = 2 * (W - R) - ball.x; ball.vx *= -1; }
      let hit = ball.y - R <= ceil * H;
      each((i, j) => { hit ||= Math.hypot(ball.x - X(i, j), ball.y - Y(i)) < D - 6; });
      if (hit) return land();
    }
  }
  function draw() {
    const bg = g.createLinearGradient(0, 0, 0, FH); bg.addColorStop(0, '#1b1450'); bg.addColorStop(1, '#0c3a5c');
    g.fillStyle = bg; g.fillRect(0, 0, W, FH);
    const top = shown * H;   // the ceiling: grey stone, a row deeper each time the Danger Meter fills
    g.fillStyle = '#6d6d78'; g.fillRect(0, 0, W, top);
    g.strokeStyle = '#55555f'; g.lineWidth = 1;
    for (let y = 9; y < top; y += 9) for (let x = (y / 9) % 2 ? 0 : 12; x < W; x += 24) { g.strokeRect(x, y - 9, 24, 9); }
    g.fillStyle = '#a2a2ae'; g.fillRect(0, top, W, 3);
    g.setLineDash([4, 4]); g.strokeStyle = 'rgba(255,255,255,.35)'; line(g, [0, LINE], [W, LINE]); g.setLineDash([]);
    const look = ball ?? { x: GUN.x + Math.cos(aim) * 300, y: GUN.y - Math.sin(aim) * 300 };
    each((i, j, k) => snoodAt(g, k, X(i, j), Y(i, shown), 1, look));
    for (const f of fx) { g.globalAlpha = f.vy != null ? 1 : 1 - f.t / 0.3; snoodAt(g, f.k, f.x, f.y, f.vy != null ? 1 : 1 + f.t * 2, look); }
    g.globalAlpha = 1;
    g.save(); g.translate(GUN.x, GUN.y); g.rotate(Math.PI / 2 - aim);   // the launcher
    g.fillStyle = '#b8b8c4'; g.strokeStyle = '#000'; g.lineWidth = 1.4; g.beginPath(); g.roundRect(-7, -38, 14, 26, 3); g.fill(); g.stroke();
    g.restore();
    g.fillStyle = '#8888a0'; g.beginPath(); g.arc(GUN.x, FH, 26, Math.PI, 0); g.fill(); g.stroke();
    if (held != null) snoodAt(g, held, GUN.x, GUN.y, 1, look);
    if (ball) snoodAt(g, ball.k, ball.x, ball.y, 1, look);
    if (now < until) {
      g.font = 'bold 26px "Arial Black", Arial, sans-serif'; g.textAlign = 'center'; g.lineWidth = 5; g.strokeStyle = '#000'; g.fillStyle = '#ffe14a';
      g.strokeText(msg, W / 2, FH / 2); g.fillText(msg, W / 2, FH / 2);
      if (over) { g.font = 'bold 13px Arial, sans-serif'; g.lineWidth = 3; g.strokeText('Click to play again', W / 2, FH / 2 + 24); g.fillText('Click to play again', W / 2, FH / 2 + 24); }
    }
  }
  const point = e => {   // the screen is scaled onto the glass, so the canvas's own box gives the pointer's place in it
    const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) * W / r.width, y = (e.clientY - r.top) * FH / r.height;
    aim = Math.min(Math.PI - 0.13, Math.max(0.13, Math.atan2(Math.max(1, GUN.y - y), x - GUN.x)));
  };
  cv.onpointermove = point;
  cv.onpointerdown = e => { cv.setPointerCapture(e.pointerId); point(e); };
  cv.onpointerup = e => { point(e); fire(); };
  $('.new').onclick = newGame;
  $('.diff').onchange = e => { diff = e.target.value; newGame(); };
  newGame();
  requestAnimationFrame(function loop(ms) {   // paused while the window is minimized or you have left the computer
    if (!w.isConnected) return;
    now = ms / 1000;
    const dt = Math.min(0.05, now - (last || now)); last = now;
    if (!w.hidden && cv.offsetWidth) { step(dt); draw(); }
    requestAnimationFrame(loop);
  });
  return w;
}
