// The dream's game, in the manner of Deltarune: a 320 by 240 world drawn pixel by pixel and scaled up, a silent kid Bryan who walks
// and looks, talk boxes with a face at the side, and Tadzio, who joins and walks in his footsteps. Tadzio, the Dungeon Master, built
// the dungeon from the games they love: a block puzzle as in Zelda, a rally as in Mario Tennis, and a boss you spare, not fight, as
// in Undertale and Deltarune. Everything here is drawn in code; nothing is taken from the real games. The words are drafts for Bryan.
const W = 320, H = 240, T = 16;
const LOOKS = {   // two kids of ten, outlined like the sprites in those games
  bryan: { hair: '#5a3a22', hairHi: '#7a5233', long: false, top: '#26232e', yoke: '#26232e', shirt: '#26232e', badge: '#f2d23a', pants: '#3b5a8a', shoes: '#e8e6df' },
  tadzio: { hair: '#c39a62', hairHi: '#e0bf86', long: true, top: '#eeece4', yoke: '#eeece4', shirt: '#1f7d7a', pants: '#2c2b33', shoes: '#4a3a30' },
};
const SKIN = '#f1c7a3', INK = '#16121f';

// ---- the rooms: one screen each, a letter for each 16 px tile
const ROOMS = {
  field: {
    map: [
      '####################',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..........D.......#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '####################'],
    start: [3, 9, 'right'], dark: true,
    enter: [['', '* (Walk with the ARROW KEYS or W A S D. Press Z to look at things, to talk, and to go on.)'], ['', "* (It's dark. The grass is wet under your feet.)"], ['', '* (Fireflies. Like the ones in the backyard.)'], ['', "* (There's a door out here. Just a door, standing in the grass. Walk up to it and press Z.)"]],
  },
  tavern: {
    map: [
      '####################',
      '####################',
      '####################',
      '#..FF..............#',
      '#..................#',
      '#....tt......tt....#',
      '#....tt......tt....#',
      '#..................#',
      '#..........TT......#',
      '#..........TT......#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#........E.........#',
      '#########..#########'],
    start: [9, 12, 'up'],
    enter: [['', '* (A tavern. It smells like woodsmoke and blueberries.)']],
  },
  dungeon: {   // Tadzio's dungeon, room one: a block, a switch in a nook of pillars (P), and a locked door, as in Zelda. The block can only go
    // into the nook from below, and the pillar under the nook leaves no room to push it from two rows down: it has to come in a row higher
    map: ['####################', '####################', '#########dd#########', '#..................#', '#...P..............#', '#....P.............#',
      '#..................#', '#..................#', '#...P..............#', ...Array(5).fill('#..................#'), '#########..#########'],
    start: [9, 13, 'up'], style: 'stone',
    enter: [['tadzio', 'Welcome to my dungeon! Every good dungeon starts with a puzzle.', 'smile'], ['tadzio', 'The door only opens for something heavy.', 'smile'],
      ['tadzio', 'Stuck? Face me and press Z for a hint.', 'smile']],
  },
  court: { map: Array(15).fill('.'.repeat(20)), tennis: true, start: [10, 12, 'up'] },   // room two: tennis
  lair: {   // room three: the boss
    map: ['####################', '####################', '####################', '#........BB........#', '#........BB........#', ...Array(9).fill('#..................#'), '#########..#########'],
    start: [9, 13, 'up'], style: 'cave',
    enter: [['', '* (It smells like fabric softener and danger.)'], ['tadzio', 'The boss is up there. Walk up to it and press Z.', 'smile']],
  },
  hill: { map: Array.from({ length: 15 }, () => '.'.repeat(20)), start: [8, 10, 'right'], dark: true, sky: true },   // the end: a hilltop under the moon
};
const solid = (room, x, y) => { const c = room.map[y]?.[x]; return !c || '#tTFDBP'.includes(c); };
const SWITCH = [4, 5], BLOCK = [12, 9];   // in the dungeon

// ---- the sprites, drawn with rectangles: every part outlined first, then filled, so the whole kid gets one dark edge
function kid(g, look, x, y, dir, step, pose) {
  const parts = [], R = (px, py, w, h, c) => parts.push([px, py, w, h, c]);
  const lift = step % 2 ? 1 : 0, side = dir === 'left' || dir === 'right', flip = dir === 'left' ? -1 : 1;
  R(-4, -6, 3, 6 - lift, look.pants); R(1, -6, 3, 6 - (1 - lift), look.pants);   // legs, one lifted a step
  R(-4, -1 - lift, 3, 1, look.shoes); R(1, -2 + lift, 3, 1, look.shoes);
  R(-5, -13, 10, 7, look.shirt); R(-5, -13, 10, 2, look.yoke);   // the tee: its top colour across the shoulders
  if (pose === 'raise') { R(-7, -27, 2, 15, SKIN); R(5, -27, 2, 15, SKIN); R(-7, -13, 2, 2, look.top); R(5, -13, 2, 2, look.top); }   // both arms up, holding something over the head
  else if (!side) { R(-7, -13 + (step % 2), 2, 6, SKIN); R(5, -13 - (step % 2) + 1, 2, 6, SKIN); R(-7, -13 + (step % 2), 2, 2, look.top); R(5, -12 - (step % 2), 2, 2, look.top); }
  else { R(-1, -13, 2, 6, SKIN); R(-1, -13, 2, 2, look.top); }
  R(-5, -22, 10, 9, SKIN);   // the head
  if (look.long) {   // long hair: over the top, down both sides past the shoulders, and all down the back
    R(-6, -24, 12, 4, look.hair);
    if (dir === 'up') R(-6, -24, 12, 16, look.hair);
    else if (side) R(flip > 0 ? -6 : 1, -24, 5, 16, look.hair);
    else { R(-6, -21, 2, 13, look.hair); R(4, -21, 2, 13, look.hair); }
  } else {
    R(-6, -24, 12, 4, look.hair);
    if (dir === 'up') R(-6, -24, 12, 9, look.hair);
    else if (side) R(flip > 0 ? -6 : 1, -24, 5, 8, look.hair);
    else { R(-6, -21, 2, 4, look.hair); R(4, -21, 2, 4, look.hair); }
  }
  g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(x - 5, y - 1, 10, 2);
  g.fillStyle = INK; for (const [px, py, w, h] of parts) g.fillRect(x + px - 1, y + py - 1, w + 2, h + 2);
  for (const [px, py, w, h, c] of parts) { g.fillStyle = c; g.fillRect(x + px, y + py, w, h); }
  g.fillStyle = look.hairHi; if (dir !== 'up') g.fillRect(x - 3, y - 24, 4, 1);   // a shine on the hair
  if (look.badge && dir === 'down') { g.fillStyle = look.badge; g.fillRect(x - 1, y - 11, 3, 3); g.fillStyle = INK; g.fillRect(x - 1, y - 10, 1, 1); g.fillRect(x + 1, y - 10, 1, 1); }   // a yellow smiley on the black tee
  g.fillStyle = INK;   // eyes
  if (dir === 'down') { g.fillRect(x - 3, y - 18, 1, 2); g.fillRect(x + 2, y - 18, 1, 2); }
  else if (side) g.fillRect(x + flip * 3 - (flip < 0 ? 1 : 0), y - 18, 1, 2);
}

// Tadzio's face for the talk box, from the photo Bryan chose: long dark-blonde hair, green eyes, a small smile, the white and teal tee
function face(c, mood) {
  const g = c.getContext('2d'), P = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x, y, w, h); };
  g.clearRect(0, 0, 48, 48);
  P(6, 4, 36, 44, '#b48c56'); P(8, 2, 32, 8, '#c39a62');   // hair behind and over the head
  P(12, 8, 24, 26, SKIN); P(12, 30, 24, 4, '#e8b893');   // face, a little shadow under the chin
  P(10, 6, 12, 8, '#c39a62'); P(26, 6, 12, 8, '#c39a62'); P(22, 6, 4, 3, '#c39a62');   // parted down the middle
  P(16, 8, 6, 1, '#e0bf86'); P(28, 8, 5, 1, '#e0bf86');
  P(8, 12, 5, 34, '#c39a62'); P(35, 12, 5, 34, '#c39a62');   // and down past the shoulders
  P(16, 17, 5, 4, '#fff'); P(27, 17, 5, 4, '#fff'); P(18, 17, 3, 4, '#5f7a52'); P(29, 17, 3, 4, '#5f7a52'); P(19, 18, 1, 1, '#fff'); P(30, 18, 1, 1, '#fff');   // green eyes
  P(16, 15, 5, 1, '#9c7647'); P(27, 15, 5, 1, '#9c7647');
  P(23, 22, 2, 3, '#e3ad88');   // nose
  if (mood === 'smile') { P(20, 27, 9, 1, '#a8574a'); P(19, 26, 1, 1, '#a8574a'); P(29, 26, 1, 1, '#a8574a'); }
  else if (mood === 'unsure') P(21, 27, 6, 1, '#a8574a');
  else { P(20, 27, 8, 1, '#a8574a'); P(28, 26, 1, 1, '#a8574a'); }
  P(12, 38, 24, 10, '#eeece4'); P(12, 44, 24, 4, '#1f7d7a'); P(20, 38, 8, 2, '#d8d6cf');   // the tee
}

// ---- the things to look at and the people to talk to, by tile
const SPOTS = {
  field: { '11,5': { door: 'tavern', lines: [['', '* (Warm light under the door. Someone in there is laughing.)']] } },
  tavern: {
    '11,8': { who: 'tadzio' }, '12,8': { who: 'tadzio' }, '11,9': { who: 'tadzio' }, '12,9': { who: 'tadzio' },
    '5,5': { lines: [['', '* A twenty-sided die. It landed on 20.']] }, '6,5': { lines: [['', "* A character sheet. NAME: TADZIO. CLASS: [Bryan's pick]. It's covered in doodles."]] },
    '13,5': { lines: [['', '* A bowl of eyeballs.'], ['', "* ...They're lychees, with blueberries pushed into them. Probably."]] }, '14,5': { lines: [['', '* Someone left a half-eaten slice of pizza here. Still warm.']] },
    '3,3': { lines: [['', '* The fire crackles. You feel safe, for some reason.']] }, '4,3': { lines: [['', '* The fire crackles. You feel safe, for some reason.']] },
    '9,14': { exit: true }, '10,14': { exit: true },
  },
  dungeon: { '9,2': { gate: 'court' }, '10,2': { gate: 'court' } },
  lair: { '9,3': { boss: true }, '10,3': { boss: true }, '9,4': { boss: true }, '10,4': { boss: true } },
  court: {}, hill: {},
};
const BOSS = [['tadzio', "This is the boss. It's my character.", 'smile'], ['tadzio', 'A murderous teddy bear. [Name and class: Bryan, ask Tadzio.]', 'smile'],
  ['', '* (The bear is holding a tiny plastic knife. It looks extremely serious.)'], ['tadzio', 'Remember. Fighters are good at HUGGING.', 'smile']];
const MEET = [['tadzio', 'Dada?', 'unsure'], ['', '* (You look behind you. Nobody is there.)'], ['tadzio', "...Oh. Sorry. You just looked like someone.", 'unsure'],
  ['tadzio', "I'm Tadzio. I'm the Dungeon Master tonight.", 'smile'], ['tadzio', 'You can be the fighter. Fighters are good at hugging.', 'smile'],
  ['tadzio', '...I mean hitting. Hitting things.', 'unsure'], ['tadzio', 'Want an eyeball? I made them.', 'smile'], ['', '* (Tadzio joined the party.)']];

const TOUCH = [['<kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd> or <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>', 'the pad'], ['<kbd>←</kbd><kbd>→</kbd>', '<kbd>◀</kbd><kbd>▶</kbd>'],
  ['<kbd>↑</kbd><kbd>↓</kbd>', '<kbd>▲</kbd><kbd>▼</kbd>'], ['<kbd>Z</kbd>', '<kbd>A</kbd>'], ['<kbd>X</kbd>', '<kbd>B</kbd>'], ['the ARROW KEYS or W A S D', 'the pad'],
  ['Press Z', 'Tap A'], ['press Z', 'tap A'], ['Z to', 'A to']];   // what the keys are called on a phone: the pad, A, and B
const coarse = matchMedia('(pointer: coarse)'), words = t => (coarse.matches ? TOUCH.reduce((s, [a, b]) => s.split(a).join(b), t) : t);

const CSS = `
.dg { position: fixed; inset: 0; z-index: 9; background: #000; display: grid; place-items: center; touch-action: none; user-select: none; -webkit-user-select: none; }
.dg .pad, .dg .ab { position: absolute; display: none; z-index: 2; }
.dg .pad { left: 4vw; bottom: 5vh; width: 38vmin; height: 38vmin; grid-template: repeat(3, 1fr) / repeat(3, 1fr); }
.dg .ab { right: 4vw; bottom: 7vh; gap: 4vmin; grid-auto-flow: column; align-items: end; }
.dg .pad button, .dg .ab button { border: 2px solid #8a8a96; background: rgba(40, 40, 52, .75); color: #fff; font: 6vmin/1 'DotGothic16', monospace; padding: 0; touch-action: none; }
.dg .pad button { border-radius: 1.5vmin; } .dg .pad .u { grid-area: 1 / 2; } .dg .pad .l { grid-area: 2 / 1; } .dg .pad .r { grid-area: 2 / 3; } .dg .pad .d { grid-area: 3 / 2; }
.dg .ab button { width: 17vmin; height: 17vmin; border-radius: 50%; } .dg .ab .a { margin-bottom: 7vmin; background: rgba(150, 40, 60, .8); }
.dg .pad button.on, .dg .ab button.on { background: rgba(255, 210, 58, .55); }
/* on a touch screen: the pad and the buttons; held upright, the game up top, the words under it, and the pad and buttons at the bottom;
   held sideways, the pad and buttons either side of the game */
.dg.touch .pad, .dg.touch .ab { display: grid; }
.dg.touch .help { top: .8vh; font-size: 13px; }
.dg.touch.tall { place-items: start center; padding-top: 10vh; }
.dg.touch.tall .talk { bottom: auto; top: calc(10vh + 75vw + 1.5vh); width: 94vw; font-size: 16px; min-height: 0; }
.dg.touch:not(.tall) .talk { width: 54vw; bottom: 2vh; font-size: 15px; min-height: 0; padding: .5em .8em; }
.dg.touch:not(.tall) .talk canvas { width: 3.6em; height: 3.6em; }
.dg canvas.world { image-rendering: pixelated; }
.dg .talk { position: absolute; left: 50%; bottom: 3vh; transform: translateX(-50%); width: min(92vw, 860px); box-sizing: border-box; min-height: 7.5em; padding: .8em 1em;
  background: #000; border: .28em solid #fff; display: none; gap: 1em; align-items: flex-start; font: clamp(16px, 2.3vw, 25px)/1.5 'DotGothic16', ui-monospace, monospace; color: #fff; letter-spacing: .02em; }
.dg .talk.on { display: flex; }
.dg .talk canvas { width: 5.5em; height: 5.5em; image-rendering: pixelated; flex: none; }
.dg .talk p { margin: 0; white-space: pre-wrap; }
.dg .talk.zelda { background: #08092a; border-color: #f0f0ff; border-radius: .8em; box-shadow: inset 0 0 0 .22em #3c4ad0; min-height: 4.4em; }
.dg .fade { position: absolute; inset: 0; background: #000; opacity: 0; transition: opacity .5s; pointer-events: none; }
.dg .help { position: absolute; top: 1.5vh; left: 50%; transform: translateX(-50%); max-width: 70vw; padding: .35em .9em; text-align: center; pointer-events: none; z-index: 1;
  background: rgba(0, 0, 0, .7); border: 1px solid #555; font: clamp(13px, 1.6vw, 19px)/1.5 'DotGothic16', ui-monospace, monospace; color: #cfcfd8; letter-spacing: .02em; }
.dg .help:empty { display: none; }
.dg .help b { display: block; color: #ffd23a; font-weight: normal; }
.dg .help kbd { font: inherit; padding: 0 .3em; border: 1px solid #8a8a96; border-radius: .2em; color: #fff; }
`;

export function dreamgame({ audio, done }) {
  let root, cv, g, raf = 0, keys = {}, room, me, trail = [], party = false, talk = null, last = 0, flies = [], ending = false, roll = null, held = false;
  let mode = 'walk', block = null, push = 0, ten = null, bat = null, help = '', hints = 0;
  const HINTS = {
    tavern: () => 'The dungeon starts through the door at the bottom.',
    dungeon: () => (room.open ? 'The door is open! Up at the top.' : [   // a little more each time you ask
      'Something heavy has to sit on the switch in the corner.', "Walk into the stone block to push it. You can push, but you can't pull.",
      'The pillar under the switch is in the way. Bring the block in a row higher.', 'Jammed? Press Z on the block, and it goes back where it started.'][Math.min(hints++, 3)]),
    lair: () => 'Go say hi to the bear. Walk right up to it and press Z.',
  };
  function goal() {   // what to do now, and with which keys, for the bar at the top of the screen
    if (!room || room.sky) return '';
    if (talk) return '<b>&nbsp;</b><kbd>Z</kbd> next';
    if (mode === 'battle') return { menu: bat.mercy >= 100 ? '<b>Choose SPARE.</b><kbd>←</kbd><kbd>→</kbd> pick · <kbd>Z</kbd> choose' : "<b>FIGHT won't work. Try ACT.</b><kbd>←</kbd><kbd>→</kbd> pick · <kbd>Z</kbd> choose", act: '<b>Pick something to do.</b><kbd>↑</kbd><kbd>↓</kbd> pick · <kbd>Z</kbd> choose · <kbd>X</kbd> back', dodge: '<b>Dodge the stuffing with your heart.</b><kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd> or <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move' }[bat.phase] || '';
    if (room.tennis) return '<b>Stand under the ball and swing as it comes down.</b><kbd>←</kbd><kbd>→</kbd> move · <kbd>Z</kbd> swing';
    const what = { field: 'Walk up to the door and press Z.', tavern: party ? 'Leave by the door at the bottom.' : 'Walk up to the kid at the table and press Z.',
      dungeon: room.open ? 'The door is open. Go through it at the top.' : 'Open the door at the top.', lair: 'Walk up to the bear and press Z.' }[room.name];
    return `<b>${what}</b><kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd> or <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> walk · <kbd>Z</kbd> look, talk${party ? ' · <kbd>Z</kbd> facing Tadzio: hint' : ''}`;
  }
  const blocked = (x, y) => solid(room, x, y) || (room.name === 'dungeon' && ((block.x === x && block.y === y) || (!room.open && room.map[y]?.[x] === 'd')));
  const say = (lines, then) => { clearInterval(talk?.typing); talk = { lines: [...lines], i: -1, then }; next(); };
  function blip(who) {   // each letter a short note: higher for Tadzio
    const ac = audio();
    if (ac?.state !== 'running') return;
    const o = new OscillatorNode(ac, { type: 'square', frequency: who === 'tadzio' ? 820 : 440 }), v = new GainNode(ac, { gain: 0.03 });
    v.gain.setTargetAtTime(0, ac.currentTime + 0.02, 0.01); o.connect(v).connect(ac.destination); o.start(); o.stop(ac.currentTime + 0.06);
  }
  function next() {   // the next line, typed a letter at a time; Z while it types shows it all
    const box = root.querySelector('.talk'), p = box.querySelector('p'), pic = box.querySelector('canvas');
    if (talk.typing) { clearInterval(talk.typing); talk.typing = null; p.textContent = talk.full; return; }
    talk.i++;
    if (talk.i >= talk.lines.length) { box.classList.remove('on'); const then = talk.then; talk = null; then?.(); return; }
    let [who, text, mood] = talk.lines[talk.i];
    box.classList.add('on'); box.classList.toggle('zelda', who === 'zelda'); pic.style.display = who === 'tadzio' ? 'block' : 'none'; if (who === 'tadzio') face(pic, mood);
    text = words(text); talk.full = text; p.textContent = ''; let k = 0;
    talk.typing = setInterval(() => {
      p.textContent = text.slice(0, ++k); if (k % 2 && text[k - 1] !== ' ') blip(who);
      if (k >= text.length) { clearInterval(talk.typing); talk.typing = null; }
    }, 34);
  }
  function go(name, at) {   // into a room through the dark
    const f = root.querySelector('.fade'); f.style.opacity = 1;
    setTimeout(() => {
      room = ROOMS[name]; room.name = name; const [x, y, dir] = at || room.start;
      me = { x: x * T + 8, y: y * T + 14, dir, step: 0, walk: 0 }; trail = Array.from({ length: 24 }, () => ({ x: me.x, y: me.y - 2, dir }));
      f.style.opacity = 0;
      if (name === 'dungeon') { block = { x: BLOCK[0], y: BLOCK[1] }; room.open = false; }
      if (room.tennis) ten = { rally: 0, misses: 0, tz: 160, ball: null };
      if (room.enter && !room.seen) { room.seen = true; setTimeout(() => say(room.enter), 500); }
      if (room.tennis) setTimeout(() => say([['tadzio', 'Room two. Tennis. I always win.', 'smile'], ['tadzio', 'Left and right to move. Z to swing.', 'smile']], serve), 500);
    }, 500);
  }
  function act() {   // Z: look at, or talk to, whatever is on the tile in front of you
    if (talk) return next();
    const fx = Math.floor((me.x + { left: -12, right: 12, up: 0, down: 0 }[me.dir]) / T), fy = Math.floor((me.y - 6 + { up: -14, down: 12, left: 0, right: 0 }[me.dir]) / T);
    if (room.name === 'dungeon' && !room.open && fx === block.x && fy === block.y) return say([['tadzio', 'Stuck? Dungeon Masters allow do-overs.', 'smile']], () => { block = { x: BLOCK[0], y: BLOCK[1] }; });   // a block against a wall can never come off it
    const f = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] }[me.dir], vx = trail[0].x - me.x, vy = trail[0].y - me.y, d = Math.hypot(vx, vy);
    if (party && d > 2 && d < 40 && (vx * f[0] + vy * f[1]) > 0.7 * d) return say([['tadzio', HINTS[room.name]?.() ?? 'Keep going. You are doing great.', 'smile']]);   // Tadzio, a step behind you, has a hint
    const s = SPOTS[room.name][`${fx},${fy}`] || SPOTS[room.name][`${Math.floor(me.x / T)},${Math.floor((me.y - 6) / T)}`];
    if (!s) return;
    if (s.who === 'tadzio' && !party) return say(MEET, () => { party = true; });
    if (s.who === 'tadzio') return say([['tadzio', 'The dungeon is through the door. I made it myself. Mostly.', 'smile']]);
    if (s.door) return say(s.lines, () => go(s.door));
    if (s.exit) return party ? go('dungeon') : say([['', "* (You feel like you shouldn't leave without saying hello.)"]]);
    if (s.gate) return room.open ? go(s.gate) : say([['', '* (The door is locked. Something on the floor must open it.)']]);
    if (s.boss) return say(BOSS, startBattle);
    if (s.lines) say(s.lines);
  }
  // ---- room one: the block and the switch
  function solved() {
    room.open = true; [392, 523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.09, 0.1));
    say([['tadzio', 'Nice! I knew you would get it.', 'smile'], ['tadzio', '...Eventually.', 'unsure']]);
  }
  function dungeon(t) {   // the switch, the torches, and (in depth order, below) the block
    const [sx, sy] = SWITCH; g.fillStyle = INK; g.fillRect(sx * T + 1, sy * T + 1, 14, 14); g.fillStyle = room.open ? '#7a86b0' : '#5a6078'; g.fillRect(sx * T + 2, sy * T + 2, 12, 12);
    for (const tx of [4, 15]) { g.fillStyle = '#5a4630'; g.fillRect(tx * T + 6, 2 * T + 4, 4, 9); for (let i = 0; i < 3; i++) { g.fillStyle = i % 2 ? '#f2a03a' : '#ffd36a'; g.fillRect(tx * T + 5 + i * 2, 2 * T + 2 - Math.abs(Math.sin(t * 8 + i)) * 4, 2, 4); } }
  }
  function stone() {
    const x = block.x * T, y = block.y * T;
    g.fillStyle = INK; g.fillRect(x - 1, y - 5, T + 2, T + 6); g.fillStyle = '#8a8fa3'; g.fillRect(x, y - 4, T, 6); g.fillStyle = '#6a6f84'; g.fillRect(x, y + 2, T, T - 2); g.fillStyle = '#9ea3b8'; g.fillRect(x + 2, y - 3, 5, 1);
  }

  // ---- room two: tennis. The ball arcs over the net to you; be under it and swing as it comes down
  function serve() {
    const assist = ten.misses >= 3, ex = assist ? me.x : 70 + Math.random() * 180;
    ten.ball = { to: 'me', sx: ten.tz, sy: 52, ex, ey: 200, t0: performance.now(), d: assist ? 1.5 : Math.max(0.8, 1.3 - ten.rally * 0.08), h: 34 };
    note(660, 0, 0.05);
  }
  function swing() {
    const b = ten.ball;
    if (!b || b.to !== 'me') return;
    const u = (performance.now() - b.t0) / 1000 / b.d, bx = b.sx + (b.ex - b.sx) * Math.min(1, u);
    if (u < 0.72 || u > 1.15 || Math.abs(me.x - bx) > 22) return;
    ten.rally++; note(880, 0, 0.05);
    ten.ball = { to: 'tz', sx: bx, sy: 200, ex: 80 + Math.random() * 160, ey: 52, t0: performance.now(), d: Math.max(0.7, 1.15 - ten.rally * 0.08), h: 34 };
  }
  function tennis(dt, t, dx) {
    if (!talk) me.x = Math.max(56, Math.min(264, me.x + dx * 130 * dt));
    const b = ten.ball, u = b ? (performance.now() - b.t0) / 1000 / b.d : 0;
    if (b && b.to === 'tz') {
      ten.tz += (b.ex - ten.tz) * Math.min(1, dt * 6);
      if (u >= 1) {   // Tadzio sends it back, and on the fifth return smashes it where you aren't
        if (ten.rally >= 4) { ten.ball = { to: 'me', sx: b.ex, sy: 52, ex: me.x < 160 ? 255 : 65, ey: 200, t0: performance.now(), d: 0.42, h: 8, smash: true }; note(1175, 0, 0.08); }
        else serve();
      }
    }
    if (b && b.to === 'me' && u > 1.15 && !talk) {
      ten.ball = null;
      if (b.smash) say([['', '* GAME, SET, TADZIO.'], ['tadzio', 'Told you. I always win.', 'smile'], ['tadzio', 'You were good, though. For a fighter.', 'smile']], () => go('lair'));
      else { ten.misses++; ten.rally = 0; say([['tadzio', ['15-love!', '30-love!', '40-love! ...Okay, I will go easy.', 'Deuce. That means try again.'][Math.min(3, ten.misses - 1)], 'smile']], serve); }
    }
    g.fillStyle = '#2f6f3a'; g.fillRect(0, 0, W, H); g.fillStyle = '#3f8f4a'; g.fillRect(40, 24, 240, 196);   // the court
    g.fillStyle = '#eef'; for (const [x, y, w, h] of [[40, 24, 240, 2], [40, 218, 240, 2], [40, 24, 2, 196], [278, 24, 2, 196], [70, 24, 2, 196], [248, 24, 2, 196], [70, 70, 180, 2], [70, 168, 180, 2], [159, 70, 2, 100]]) g.fillRect(x, y, w, h);
    kid(g, LOOKS.tadzio, Math.round(ten.tz), 52, 'down', 0); g.fillStyle = INK; g.fillRect(Math.round(ten.tz) + 7, 36, 5, 6); g.fillStyle = '#e8e6df'; g.fillRect(Math.round(ten.tz) + 8, 37, 3, 4);   // their racket
    g.fillStyle = '#ddd'; g.fillRect(36, 118, 248, 4); g.fillStyle = '#999'; for (let x = 38; x < 284; x += 4) g.fillRect(x, 119, 1, 2); g.fillStyle = INK; g.fillRect(34, 112, 3, 12); g.fillRect(283, 112, 3, 12);   // the net
    kid(g, LOOKS.bryan, Math.round(me.x), 205, 'up', 0); g.fillStyle = INK; g.fillRect(Math.round(me.x) + 7, 186, 5, 6); g.fillStyle = '#e8e6df'; g.fillRect(Math.round(me.x) + 8, 187, 3, 4);
    if (ten.ball) {
      const c = Math.min(1.15, u), bx = b.sx + (b.ex - b.sx) * Math.min(1, c), by = b.sy + (b.ey - b.sy) * c, z = 4 * b.h * c * (1 - c);
      g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(Math.round(bx) - 2, Math.round(by), 4, 2);
      g.fillStyle = INK; g.fillRect(Math.round(bx) - 2, Math.round(by - z) - 2, 5, 5); g.fillStyle = '#d8f04a'; g.fillRect(Math.round(bx) - 1, Math.round(by - z) - 1, 3, 3);
    }
    g.font = '500 10px "Pixelify Sans", monospace'; g.textAlign = 'left'; g.fillStyle = '#fff'; g.fillText(`RALLY ${ten.rally}`, 6, 14);
  }

  // ---- room three: the boss, in a battle like Deltarune's. FIGHT will not do; hug it, joke with it, and spare it
  function bear(x, y, s) {   // a teddy bear, seated, very angry, with a tiny plastic knife
    const parts = [];
    const R = (px, py, w, h, c) => parts.push([px, py, w, h, c]);
    R(-13, -14, 5, 8, '#8b5a2b'); R(8, -14, 5, 8, '#8b5a2b'); R(-9, -16, 18, 15, '#8b5a2b'); R(-5, -13, 10, 9, '#c08a55');   // arms, body, belly
    R(-10, -4, 8, 5, '#8b5a2b'); R(2, -4, 8, 5, '#8b5a2b'); R(-8, -3, 4, 3, '#c08a55'); R(4, -3, 4, 3, '#c08a55');   // feet and their pads
    R(-11, -35, 7, 7, '#8b5a2b'); R(4, -35, 7, 7, '#8b5a2b'); R(-9, -33, 3, 3, '#c08a55'); R(6, -33, 3, 3, '#c08a55');   // ears
    R(-9, -30, 18, 15, '#8b5a2b'); R(-4, -22, 8, 5, '#c08a55');   // head and muzzle
    R(12, -24, 3, 9, '#c8ccd4'); R(12, -15, 3, 4, '#c62f2f');   // the knife
    g.fillStyle = INK; for (const [px, py, w, h] of parts) g.fillRect(x + (px - 1) * s, y + (py - 1) * s, (w + 2) * s, (h + 2) * s);
    for (const [px, py, w, h, c] of parts) { g.fillStyle = c; g.fillRect(x + px * s, y + py * s, w * s, h * s); }
    const P = (px, py, w, h, c) => { g.fillStyle = c; g.fillRect(x + px * s, y + py * s, w * s, h * s); };
    P(-6, -26, 2, 2, INK); P(4, -26, 2, 2, INK); P(-1, -22, 2, 2, INK);   // button eyes and nose
    if (!bat || bat.mercy < 100) { P(-7, -29, 2, 1, INK); P(-5, -28, 2, 1, INK); P(3, -28, 2, 1, INK); P(5, -29, 2, 1, INK); }   // furious eyebrows, until it is ready to be hugged
    else { P(-3, -19, 1, 1, INK); P(2, -19, 1, 1, INK); P(-2, -18, 4, 1, INK); }   // and then a smile
    P(-2, -29, 1, 3, '#4a2a12'); P(-3, -28, 3, 1, '#4a2a12');   // a stitched scar
  }
  function startBattle() {
    mode = 'battle'; note(200, 0, 0.3, 'sawtooth', 0.04);
    bat = { phase: 'menu', sel: 0, act: 0, mercy: 0, hp: 20, items: 3, hugs: 0, dodge: null };
    say([['', '* The MURDEROUS TEDDY BEAR blocks the way!'], ['tadzio', 'Left and right to pick, Z to choose. And whatever you do, do not FIGHT.', 'unsure']]);
  }
  function enemyTurn() { bat.phase = 'dodge'; bat.dodge = { t0: performance.now(), shots: [], hx: 160, hy: 148, inv: 0, next: 0 }; }
  function choose() {
    const i = bat.sel;
    if (i === 0) return say([['tadzio', 'NO! Fighters are good at HUGGING. Remember?', 'unsure']]);
    if (i === 1) { bat.phase = 'act'; bat.act = 0; return; }
    if (i === 2) {
      if (!bat.items) return say([['', '* No eyeballs left.']]);
      bat.items--; bat.hp = Math.min(20, bat.hp + 10);
      return say([['', "* You eat an eyeball. It's a lychee. You recover 10 HP."]], enemyTurn);
    }
    if (bat.mercy >= 100) return say([['', '* You spared the MURDEROUS TEDDY BEAR.'], ['', "* It hugs you back. It's very soft."], ['tadzio', "...That's not how you're supposed to beat it.", 'unsure'], ['tadzio', "That's better.", 'smile']], () => { mode = 'walk'; bat = null; ending = true; go('hill'); setTimeout(finale, 1300); });
    say([['', "* The bear isn't ready to be spared."]], enemyTurn);
  }
  function doAct() {
    const after = () => (bat.mercy >= 100 ? say([['', '* The bear looks ready to be SPARED.']]) : enemyTurn());
    bat.phase = 'menu';
    if (bat.act === 0) return say([['', '* MURDEROUS TEDDY BEAR - ATK 99 DEF 0.'], ['', "* Tadzio's character. Has never once been hugged."]], enemyTurn);
    if (bat.act === 1) { bat.hugs++; bat.mercy = Math.min(100, bat.mercy + 50); return say(bat.hugs > 1 ? [['', '* You hug the bear again.'], ['', '* It stops growling. It hugs you back, a little.']] : [['', '* You hug the bear.'], ['', '* It growls. ...Quieter than before.']], after); }
    bat.mercy = Math.min(100, bat.mercy + 25);
    say([['', '* You tell the bear a joke about a skeleton.'], ['tadzio', '...Okay, that one was actually good.', 'smile'], ['', "* The bear's ear twitches."]], after);
  }
  function battleKey(k, z) {
    if (bat.phase === 'menu') {
      if (k === 'ArrowLeft' || k === 'a') bat.sel = (bat.sel + 3) % 4;
      if (k === 'ArrowRight' || k === 'd') bat.sel = (bat.sel + 1) % 4;
      if (z) choose();
    } else if (bat.phase === 'act') {
      if (k === 'ArrowUp' || k === 'w') bat.act = (bat.act + 2) % 3;
      if (k === 'ArrowDown' || k === 's') bat.act = (bat.act + 1) % 3;
      if (k === 'x' || k === 'X' || k === 'Backspace') bat.phase = 'menu';
      if (z) doAct();
    }
  }
  function battle(dt, t, dx, dy) {
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#24183f'; for (let x = (-t * 8) % 20; x < W; x += 20) g.fillRect(Math.round(x), 0, 1, 186); for (let y = (t * 8) % 20; y < 186; y += 20) g.fillRect(0, Math.round(y), W, 1);   // the dark-world grid
    bear(236, 112 + Math.round(Math.sin(t * 3)), 2);
    kid(g, LOOKS.bryan, 64, 120, 'right', 0); kid(g, LOOKS.tadzio, 88, 136, 'right', 0);
    g.font = '500 8px "Pixelify Sans", monospace'; g.textAlign = 'left'; g.fillStyle = '#ffd23a'; g.fillText('MERCY', 206, 26);   // over the bear, clear of the box you dodge in
    g.fillStyle = '#444'; g.fillRect(234, 20, 60, 6); g.fillStyle = '#ffd23a'; g.fillRect(234, 20, 60 * bat.mercy / 100, 6);
    const d = bat.dodge;
    if (bat.phase === 'dodge' && d) {   // the bear's turn: stuffing falls and buttons bounce, and your heart dodges them
      const s = (performance.now() - d.t0) / 1000;
      g.fillStyle = '#fff'; g.fillRect(98, 108, 124, 74); g.fillStyle = '#000'; g.fillRect(100, 110, 120, 70);
      if (!talk) {
        d.hx = Math.max(104, Math.min(216, d.hx + dx * 90 * dt)); d.hy = Math.max(114, Math.min(176, d.hy + dy * 90 * dt));
        if ((d.next -= dt) < 0) { d.next = 0.28; d.shots.push(Math.random() < 0.75 ? { x: 104 + Math.random() * 112, y: 108, vx: 0, vy: 55 + Math.random() * 40, fluff: true } : { x: Math.random() < 0.5 ? 102 : 218, y: 112 + Math.random() * 60, vx: Math.random() < 0.5 ? 70 : -70, vy: 45, fluff: false }); }
        d.inv = Math.max(0, d.inv - dt);
        for (const p of d.shots) {
          p.x += p.vx * dt; p.y += p.vy * dt;
          if (!p.fluff && (p.y > 176 || p.y < 112)) p.vy = -p.vy;
          if (!p.fluff && (p.x < 102 || p.x > 218)) p.vx = -p.vx;
          if (!d.inv && Math.hypot(p.x - d.hx, p.y - d.hy) < 5) { bat.hp = Math.max(1, bat.hp - 3); d.inv = 0.8; note(120, 0, 0.12, 'square', 0.05); }   // it's a dream: you can't lose
        }
        d.shots = d.shots.filter(p => p.y < 182);
        if (s > 5) { bat.phase = 'menu'; bat.dodge = null; }
      }
      for (const p of d.shots) { g.fillStyle = p.fluff ? '#f4efe6' : '#3a2a20'; g.fillRect(Math.round(p.x) - 2, Math.round(p.y) - 2, 4, 4); if (!p.fluff) { g.fillStyle = '#7a5a40'; g.fillRect(Math.round(p.x) - 1, Math.round(p.y) - 1, 1, 1); g.fillRect(Math.round(p.x), Math.round(p.y), 1, 1); } }
      if (!d.inv || Math.floor(s * 12) % 2) heartAt(Math.round(d.hx), Math.round(d.hy));
    }
    g.fillStyle = '#000'; g.fillRect(0, 186, W, 54); g.fillStyle = '#fff'; g.fillRect(0, 186, W, 1);   // the panel: HP, and the four choices
    g.font = '500 10px "Pixelify Sans", monospace'; g.textAlign = 'left'; g.fillStyle = '#fff'; g.fillText('BRYAN', 12, 202);
    g.fillStyle = '#5a1010'; g.fillRect(52, 195, 50, 7); g.fillStyle = '#ffd23a'; g.fillRect(52, 195, 50 * bat.hp / 20, 7); g.fillStyle = '#fff'; g.fillText(`${bat.hp}/20`, 108, 202);
    ['FIGHT', 'ACT', 'ITEM', 'SPARE'].forEach((label, i) => {
      const x = 12 + i * 76, on = bat.phase === 'menu' && bat.sel === i;
      g.fillStyle = on ? '#ffd23a' : '#d07a2a'; g.fillRect(x, 212, 66, 20); g.fillStyle = '#000'; g.fillRect(x + 1, 213, 64, 18);
      g.fillStyle = i === 3 && bat.mercy >= 100 ? '#ffd23a' : on ? '#ffd23a' : '#d07a2a'; g.textAlign = 'center'; g.fillText(label, x + 33, 226);
    });
    if (bat.phase === 'act') {   // what you can do instead
      g.fillStyle = '#000'; g.fillRect(150, 140, 120, 44); g.fillStyle = '#fff'; g.fillRect(150, 140, 120, 1); g.textAlign = 'left';
      ['Check', 'Hug', 'Tell a joke'].forEach((o, i) => { g.fillStyle = '#fff'; g.fillText(`* ${o}`, 166, 154 + i * 12); if (i === bat.act) heartAt(158, 151 + i * 12); });
    }
  }
  function heartAt(x, y) {   // the little red heart you steer: you
    const rows = ['XX.XX', 'XXXXX', '.XXX.', '..X..'];
    g.fillStyle = '#e8344a'; rows.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') g.fillRect(x - 2 + i, y - 2 + j, 1, 1); }));
  }

  // ---- the end, on a hilltop: a roll of the die, a natural 20, a heart container held up overhead, and goodbye
  function note(f, at, len, type = 'square', vol = 0.05) {
    const ac = audio();
    if (ac?.state !== 'running') return;
    const o = new OscillatorNode(ac, { type, frequency: f }), v = new GainNode(ac, { gain: vol }), t0 = ac.currentTime + at;
    v.gain.setValueAtTime(vol, t0); v.gain.setTargetAtTime(0, t0 + len * 0.7, len * 0.2); o.connect(v).connect(ac.destination); o.start(t0); o.stop(t0 + len + 0.3);
  }
  function finale() {
    say([['tadzio', 'Every adventure ends with a roll.', 'smile'], ['tadzio', 'Here. You roll this time.', 'smile']], () => {
      roll = { t0: performance.now() };
      setTimeout(() => say([['tadzio', 'NAT 20! I knew it.', 'smile'], ['tadzio', "You're going to be really good at this.", 'smile'], ['tadzio', '...At the game, I mean.', 'unsure']], () => {
        roll = null; held = true;
        [523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.11, 0.12)); [523, 659, 784].forEach(f => note(f, 0.5, 1.1, 'triangle', 0.06));   // a little fanfare of our own
        say([['zelda', 'You got a Heart Container!'], ['zelda', 'Your heart feels full. Fuller than it has ever been.']], () => {
          held = false;
          say([['tadzio', "You'll meet me one day...", 'smile'], ['tadzio', 'Keep this to remember me until then.', 'smile'], ['tadzio', "...You'll need it.", 'smile'], ['tadzio', 'See you later, Dada.', 'smile']], () => {
            const f = root.querySelector('.fade'); f.style.background = '#fff'; f.style.transition = 'opacity 2.5s'; f.style.opacity = 1;
            setTimeout(() => done?.(), 3200);
          });
        });
      }), 3400);
    });
  }
  function hill(t) {   // night sky, stars, a big moon, and the grass of the hilltop
    const sky = g.createLinearGradient(0, 0, 0, 180); sky.addColorStop(0, '#05051a'); sky.addColorStop(1, '#1c1640');
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 60; i++) { const sx = (i * 97) % W, sy = (i * 53) % 130; if (Math.sin(t * 2 + i) > -0.6) { g.fillStyle = i % 7 ? '#cfd3ff' : '#fff7c8'; g.fillRect(sx, sy, 1, 1); } }
    g.fillStyle = 'rgba(255,248,220,.12)'; g.beginPath(); g.arc(250, 48, 30, 0, 7); g.fill();
    g.fillStyle = '#f7f1d8'; g.beginPath(); g.arc(250, 48, 20, 0, 7); g.fill(); g.fillStyle = '#e4dcbc'; g.fillRect(242, 42, 5, 4); g.fillRect(254, 52, 4, 3);
    g.fillStyle = '#16122a'; g.beginPath(); g.moveTo(0, 240); for (let x = 0; x <= W; x += 4) g.lineTo(x, 150 + ((x - 160) / 160) ** 2 * 30); g.lineTo(W, 240); g.fill();
    g.fillStyle = '#2a2350'; for (let i = 0; i < 80; i++) { const x = (i * 41) % W, y = 160 + ((i * 29) % 70); g.fillRect(x + Math.round(Math.sin(t * 2 + i)), y, 1, 3); }
  }
  function die(t) {   // the d20, big over the hill: numbers flying, slowing, and then 20
    const s = (performance.now() - roll.t0) / 1000, cx = 160, cy = 78, n = s < 2.2 ? 1 + Math.floor((Math.sin(s * s * 40) * 0.5 + 0.5) * 19) : 20;
    const R = 26 + (s > 2.2 ? Math.max(0, 6 - (s - 2.2) * 20) : 0), spin = s < 2.2 ? s * (9 - s * 3) : 0;
    g.save(); g.translate(cx, cy); g.rotate(spin);
    g.fillStyle = INK; g.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + Math.PI / 6; g.lineTo(Math.cos(a) * (R + 2), Math.sin(a) * (R + 2)); } g.fill();
    g.fillStyle = '#c62f2f'; g.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + Math.PI / 6; g.lineTo(Math.cos(a) * R, Math.sin(a) * R); } g.fill();
    g.strokeStyle = '#e5605a'; g.lineWidth = 1; g.beginPath(); for (let i = 0; i < 3; i++) { const a = i * 2 * Math.PI / 3 - Math.PI / 2; g.lineTo(Math.cos(a) * R * 0.62, Math.sin(a) * R * 0.62); } g.closePath(); g.stroke();
    g.restore();
    g.font = '500 16px "Pixelify Sans", monospace'; g.textAlign = 'center'; g.fillStyle = '#fff'; g.fillText(String(n), cx, cy + 6);
    if (s > 2.2) {
      const a = Math.min(1, (s - 2.2) * 3); g.globalAlpha = a; g.font = '500 22px "Pixelify Sans", monospace';
      g.lineWidth = 4; g.strokeStyle = INK; g.strokeText('NAT 20!', cx, cy + 46); g.fillStyle = '#ffe23a'; g.fillText('NAT 20!', cx, cy + 46); g.globalAlpha = 1;
      if (!roll.rang) { roll.rang = true; [784, 988, 1175, 1568].forEach((f, i) => note(f, i * 0.07, 0.1)); }
    } else if (Math.floor(s * 12) !== roll.tick) { roll.tick = Math.floor(s * 12); note(300 + n * 20, 0, 0.03, 'square', 0.02); }   // the clatter
  }
  function heart(x, y) {   // the heart container, held up overhead
    const rows = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'];
    g.fillStyle = INK; rows.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') g.fillRect(x - 7 + i * 2 - 1, y + j * 2 - 1, 4, 4); }));
    rows.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') { g.fillStyle = j === 1 && i === 1 ? '#ffd0d6' : '#e8344a'; g.fillRect(x - 7 + i * 2, y + j * 2, 2, 2); } }));
  }

  // ---- the world, drawn at 320 by 240
  function tile(x, y, c, t) {
    const px = x * T, py = y * T;
    if (room.style === 'stone') {   // grey-blue flagstones, block walls, and a barred door that opens
      if (c === '#') { g.fillStyle = y < 3 ? '#262a3a' : '#151722'; g.fillRect(px, py, T, T); if (y < 3) { g.fillStyle = '#1b1e2b'; g.fillRect(px, py + (x % 2 ? 7 : 15), T, 1); g.fillRect(px + (y % 2 ? 4 : 12), py, 1, T); } return; }
      if (c === 'P') { g.fillStyle = '#363c51'; g.fillRect(px, py, T, T); g.fillStyle = INK; g.fillRect(px + 1, py - 7, T - 2, T + 6); g.fillStyle = '#4a5068'; g.fillRect(px + 2, py - 6, T - 4, T + 4); g.fillStyle = '#626a88'; g.fillRect(px + 2, py - 6, T - 4, 4); g.fillStyle = '#3c4157'; g.fillRect(px + 2, py + 2, T - 4, 1); return; }   // a stone pillar
      if (c === 'd') { g.fillStyle = room.open ? '#05050a' : '#4a3a2a'; g.fillRect(px, py, T, T); if (!room.open) { g.fillStyle = '#22242e'; for (let i = 2; i < T; i += 4) g.fillRect(px + i, py, 2, T); } return; }
      g.fillStyle = (x + y) % 2 ? '#3b4157' : '#363c51'; g.fillRect(px, py, T, T); g.fillStyle = '#2e3346'; g.fillRect(px, py, T, 1); g.fillRect(px, py, 1, T); return;
    }
    if (room.style === 'cave') {   // a dark plum cave
      g.fillStyle = c === '#' ? '#120d16' : (x * 7 + y * 3) % 5 ? '#2a1d26' : '#2f2129'; g.fillRect(px, py, T, T); return;
    }
    if (room.dark) {   // the dream field: black-violet grass that sways
      g.fillStyle = (x + y) % 2 ? '#130f22' : '#16122a'; g.fillRect(px, py, T, T);
      g.fillStyle = '#2a2350'; for (let i = 0; i < 3; i++) { const sx = (x * 37 + y * 11 + i * 5) % 14, sy = (x * 13 + y * 29 + i * 7) % 12; g.fillRect(px + sx + Math.round(Math.sin(t * 2 + x + i)), py + sy, 1, 3); }
      if (c === '#') { g.fillStyle = '#07060e'; g.fillRect(px, py, T, T); }
      return;
    }
    if (c === '#') { g.fillStyle = y < 3 ? '#3a2418' : '#1b120c'; g.fillRect(px, py, T, T); if (y === 2) { g.fillStyle = '#2b1a11'; g.fillRect(px, py + 12, T, 4); } return; }
    g.fillStyle = (y % 2 ? x + 1 : x) % 3 ? '#6b452d' : '#5e3c27'; g.fillRect(px, py, T, T); g.fillStyle = '#4f321f'; g.fillRect(px, py + 15, T, 1);   // floorboards
  }
  function props(t) {
    if (room.name !== 'tavern') return;
    const fx = 3 * T, fy = 3 * T;   // the fire, the tables, and on the far ones the dice, the sheet, the bowl, the pizza
    g.fillStyle = '#4b4b52'; g.fillRect(fx - 2, fy - 14, 36, 30); g.fillStyle = '#16121f'; g.fillRect(fx + 4, fy - 4, 24, 18);
    for (let i = 0; i < 6; i++) { const h = 6 + Math.abs(Math.sin(t * 9 + i * 1.7)) * 8; g.fillStyle = i % 2 ? '#f2a03a' : '#e8582a'; g.fillRect(fx + 6 + i * 3.5, fy + 14 - h, 3, h); }
    for (const [tx, ty] of [[5, 5], [13, 5]]) { g.fillStyle = INK; g.fillRect(tx * T - 1, ty * T - 1, 34, 34); g.fillStyle = '#8a5a34'; g.fillRect(tx * T, ty * T, 32, 32); g.fillStyle = '#9c6a40'; g.fillRect(tx * T, ty * T, 32, 3); }
    g.fillStyle = '#eee'; g.fillRect(5 * T + 6, 5 * T + 8, 7, 7); g.fillStyle = '#c62f2f'; g.fillRect(5 * T + 8, 5 * T + 10, 3, 3);   // the d20
    g.fillStyle = '#f4efe2'; g.fillRect(6 * T + 2, 5 * T + 6, 11, 15); g.fillStyle = '#9aa'; for (let i = 0; i < 4; i++) g.fillRect(6 * T + 4, 5 * T + 9 + i * 3, 7, 1);   // the character sheet
    g.fillStyle = 'rgba(210,230,240,.55)'; g.fillRect(13 * T + 3, 5 * T + 6, 12, 8);   // the glass bowl, and the eyeballs in it
    for (let i = 0; i < 6; i++) { g.fillStyle = '#f3d4d8'; g.fillRect(13 * T + 4 + (i % 3) * 4, 5 * T + 7 + Math.floor(i / 3) * 3, 3, 3); g.fillStyle = '#2a2a55'; g.fillRect(13 * T + 5 + (i % 3) * 4, 5 * T + 8 + Math.floor(i / 3) * 3, 1, 1); }
    g.fillStyle = '#e8b54a'; g.fillRect(14 * T + 4, 5 * T + 8, 8, 6); g.fillStyle = '#c62f2f'; g.fillRect(14 * T + 6, 5 * T + 10, 2, 2);   // the pizza
  }
  function door(t) {   // the door in the grass, and the light under it
    const dx = 11 * T, dy = 5 * T;
    g.fillStyle = 'rgba(255,190,110,.18)'; g.fillRect(dx - 6, dy + 14, 28, 6);
    g.fillStyle = INK; g.fillRect(dx - 1, dy - 15, 18, 31); g.fillStyle = '#7a4a2a'; g.fillRect(dx, dy - 14, 16, 30); g.fillStyle = '#5e3820'; g.fillRect(dx + 2, dy - 12, 5, 12); g.fillRect(dx + 9, dy - 12, 5, 12); g.fillRect(dx + 2, dy + 2, 5, 11); g.fillRect(dx + 9, dy + 2, 5, 11);
    g.fillStyle = '#e8c24a'; g.fillRect(dx + 12, dy + 1, 2, 2);
    g.fillStyle = `rgba(255,200,120,${0.55 + 0.2 * Math.sin(t * 5)})`; g.fillRect(dx, dy + 15, 16, 1);
  }
  function front() {   // Tadzio's table, with more dice on it
    g.fillStyle = INK; g.fillRect(11 * T - 1, 8 * T - 1, 34, 34); g.fillStyle = '#8a5a34'; g.fillRect(11 * T, 8 * T, 32, 32); g.fillStyle = '#9c6a40'; g.fillRect(11 * T, 8 * T, 32, 3);
    g.fillStyle = '#eee'; g.fillRect(12 * T + 2, 8 * T + 6, 6, 6); g.fillStyle = '#2f5fc6'; g.fillRect(12 * T + 4, 8 * T + 8, 2, 2);
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - (last || now)) / 1000), t = now / 1000; last = now;
    if (!room) return;
    const k = (...ks) => (ks.some(c => keys[c]) ? 1 : 0), dx = k('ArrowRight', 'd') - k('ArrowLeft', 'a'), dy = k('ArrowDown', 's') - k('ArrowUp', 'w');
    const h = words(goal()); if (h !== help) root.querySelector('.help').innerHTML = help = h;   // only our own fixed strings, never a visitor's
    if (mode === 'battle') return battle(dt, t, dx, dy);
    if (room.tennis) return tennis(dt, t, dx);
    if (!talk && !ending && (dx || dy)) {   // walking, a tile's edge at a time, and Tadzio a few steps behind in your footprints
      me.dir = dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up';
      const sp = 70 * dt, nx = me.x + dx * sp, ny = me.y + dy * sp;
      if (!blocked(Math.floor((nx + Math.sign(dx) * 5) / T), Math.floor((me.y - 3) / T))) me.x = nx;
      if (!blocked(Math.floor(me.x / T), Math.floor((ny - 3 + Math.max(0, dy) * 2) / T))) me.y = ny;
      if (room.name === 'dungeon' && !room.open && !dx !== !dy) {   // lean on the block a moment and it slides a tile
        const ax = Math.floor((me.x + dx * 9) / T), ay = Math.floor((me.y - 4 + dy * 9) / T);
        if (ax === block.x && ay === block.y && (push += dt) > 0.3) {
          push = 0; const bx = block.x + dx, by = block.y + dy;
          if (!blocked(bx, by) && room.map[by][bx] === '.') { block.x = bx; block.y = by; note(110, 0, 0.12, 'triangle', 0.08); if (bx === SWITCH[0] && by === SWITCH[1]) solved(); }
        } else if (ax !== block.x || ay !== block.y) push = 0;
      }
      me.walk += dt; me.step = Math.floor(me.walk * 6);
      trail.push({ x: me.x, y: me.y, dir: me.dir }); if (trail.length > 24) trail.shift();
    } else me.step = 0;
    if (room.sky) hill(t); else for (let y = 0; y < 15; y++) for (let x = 0; x < 20; x++) tile(x, y, room.map[y][x], t);
    props(t);
    const people = [{ who: 'me', ...me }];
    if (room.name === 'hill') people.push({ who: 'tadzio', x: 11 * T + 8, y: 10 * T + 14, dir: 'left', step: 0 });   // across from you on the hilltop
    else if (party) people.push({ who: 'tadzio', ...trail[0], step: dx || dy ? me.step + 1 : 0 });
    else if (room.name === 'tavern') people.push({ who: 'tadzio', x: 12 * T, y: 8 * T + 6, dir: 'down', step: 0 });   // sitting behind their table
    if (room.name === 'tavern') people.push({ who: 'thing', y: 8 * T + 31, draw: front });   // tall things go in depth order with the people
    if (room.name === 'field') people.push({ who: 'thing', y: 5 * T + 15, draw: () => door(t) });
    if (room.name === 'dungeon') { dungeon(t); people.push({ who: 'thing', y: block.y * T + 15, draw: stone }); }
    if (room.name === 'lair') people.push({ who: 'thing', y: 4 * T + 15, draw: () => bear(10 * T, 4 * T + 15, 1) });
    people.sort((a, b) => a.y - b.y).forEach(p => (p.draw ? p.draw() : kid(g, p.who === 'me' ? LOOKS.bryan : LOOKS.tadzio, Math.round(p.x), Math.round(p.y), held && p.who === 'me' ? 'down' : p.dir, p.step, held && p.who === 'me' ? 'raise' : '')));
    if (held) heart(Math.round(me.x), Math.round(me.y) - 40);
    if (roll) die(t);
    if (room.sky || room.style) return;
    if (room.dark) {   // fireflies over the field
      flies.forEach(f => { f.x += Math.sin(t + f.s) * 0.2; f.y += Math.cos(t * 0.7 + f.s) * 0.15; const on = Math.sin(t * 2 + f.s * 7) > 0.4; if (on) { g.fillStyle = 'rgba(200,255,120,.9)'; g.fillRect(Math.round(f.x), Math.round(f.y), 1, 1); g.fillStyle = 'rgba(200,255,120,.25)'; g.fillRect(Math.round(f.x) - 1, Math.round(f.y) - 1, 3, 3); } });
    } else { g.fillStyle = `rgba(255,150,60,${0.05 + 0.02 * Math.sin(t * 7)})`; g.fillRect(0, 0, W, H); }   // the firelight on everything
  }

  // ---- keys: arrows or WASD to walk, Z, Enter, or Space to look and talk
  function press(k) {   // Z, Enter, or Space talks and chooses; in the battle the arrows move through the menus
    const z = ['z', 'Z', 'Enter', ' '].includes(k);
    if (talk) { if (z) next(); return; }
    if (mode === 'battle') return battleKey(k, z);
    if (room?.tennis) { if (z) swing(); return; }
    if (z) act();
  }
  const down = e => {
    if (e.key === 'Escape') return;
    keys[e.key] = true; e.preventDefault(); e.stopPropagation();
    if (!e.repeat) press(e.key);
  };
  const up = e => { keys[e.key] = false; };
  const fit = () => {   // whole pixels where there is room for them; on a phone, as big as fits beside or above the pad
    const touch = coarse.matches, tall = touch && innerHeight > innerWidth, area = touch ? (tall ? [innerWidth, innerHeight * 0.55] : [innerWidth * 0.56, innerHeight]) : [innerWidth, innerHeight];
    root.classList.toggle('touch', touch); root.classList.toggle('tall', tall);
    let k = Math.min(area[0] / W, area[1] / H); if (k >= 2) k = Math.floor(k);
    cv.style.width = W * k + 'px'; cv.style.height = H * k + 'px';
  };
  return {
    get active() { return !!root; },
    open() {
      if (!document.getElementById('dgcss')) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap"><style id="dgcss">${CSS}</style>`);   // a pixel font whose Z doesn't look like a 2
      root = Object.assign(document.createElement('div'), { className: 'dg', innerHTML: '<canvas class="world" width="320" height="240"></canvas><div class="talk"><canvas width="48" height="48"></canvas><p></p></div><div class="fade"></div><div class="help"></div>' +
        '<div class="pad"><button class="u" data-k="ArrowUp">▲</button><button class="l" data-k="ArrowLeft">◀</button><button class="r" data-k="ArrowRight">▶</button><button class="d" data-k="ArrowDown">▼</button></div>' +
        '<div class="ab"><button class="b" data-b="x">B</button><button class="a" data-b="z">A</button></div>' });
      document.body.append(root);
      cv = root.querySelector('.world'); g = cv.getContext('2d'); fit();
      flies = Array.from({ length: 26 }, () => ({ x: 20 + Math.random() * 280, y: 20 + Math.random() * 200, s: Math.random() * 10 }));
      addEventListener('keydown', down, true); addEventListener('keyup', up, true); addEventListener('resize', fit);
      root.addEventListener('pointerdown', e => { if (e.target === cv || e.target.closest('.talk')) press('z'); });   // a tap on the game or the words is Z
      for (const b of root.querySelectorAll('.pad button')) b.addEventListener('pointerdown', e => {   // the pad: held down like the arrow keys, until that finger lifts anywhere
        const k = b.dataset.k, off = ev => { if (ev.pointerId !== e.pointerId) return; keys[k] = false; b.classList.remove('on'); removeEventListener('pointerup', off); removeEventListener('pointercancel', off); };
        e.preventDefault(); keys[k] = true; b.classList.add('on'); press(k);
        addEventListener('pointerup', off); addEventListener('pointercancel', off);
      });
      for (const b of root.querySelectorAll('.ab button')) b.addEventListener('pointerdown', e => { e.preventDefault(); b.classList.add('on'); setTimeout(() => b.classList.remove('on'), 150); press(b.dataset.b); });
      go('field'); raf = requestAnimationFrame(frame);
    },
    close() {
      if (!root) return;
      cancelAnimationFrame(raf); clearInterval(talk?.typing); root.remove(); root = null; talk = null; room = null; party = false; ending = false; roll = null; held = false; mode = 'walk'; bat = null; ten = null;
      for (const r of Object.values(ROOMS)) r.seen = false;
      removeEventListener('keydown', down, true); removeEventListener('keyup', up, true); removeEventListener('resize', fit);
    },
  };
}
