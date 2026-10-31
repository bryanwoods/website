// Asleep in 1998, Bryan dreams of Tadzio, his kid (they/them), born seventeen years later. The room fogs over, a name comes up in a
// text box like the ones in A Link to the Past, a letter at a time, and out of the dark comes the dream's game (dreamgame.js).
import { dreamgame } from './dreamgame.js';

const CSS = `
.tz { position: fixed; inset: 0; z-index: 8; overflow: hidden; opacity: 0; transition: opacity 4s;
  background: radial-gradient(ellipse at 50% 55%, rgba(205, 208, 228, .45), rgba(92, 98, 132, .8)); backdrop-filter: blur(14px) saturate(.5); -webkit-backdrop-filter: blur(14px) saturate(.5); }
.tz.on { opacity: 1; }
.tz::before, .tz::after { content: ''; position: absolute; inset: -30%; pointer-events: none;
  background: radial-gradient(closest-side at 30% 40%, rgba(235, 236, 246, .5), transparent), radial-gradient(closest-side at 70% 65%, rgba(220, 222, 240, .42), transparent);
  animation: tzdrift 26s ease-in-out infinite alternate; }
.tz::after { animation-duration: 37s; animation-direction: alternate-reverse; opacity: .8; }
.tz .box { position: absolute; left: 50%; bottom: 12%; z-index: 2; box-sizing: border-box; width: min(84vw, 760px); min-height: 4.4em; padding: .9em 1.3em; transform: translateX(-50%);
  background: #08092a; border: .32em solid #f0f0ff; border-radius: .8em; box-shadow: inset 0 0 0 .22em #3c4ad0, 0 .3em 0 rgba(0, 0, 0, .35);
  font: 500 clamp(17px, 2.7vw, 30px)/1.5 'Pixelify Sans', ui-monospace, monospace; color: #fff; letter-spacing: .05em; white-space: pre-wrap; opacity: 0; transition: opacity .35s; }
.tz .box.on { opacity: 1; }
.tz .dark { position: absolute; inset: 0; z-index: 3; background: #000; opacity: 0; transition: opacity 2.5s; }
@keyframes tzdrift { from { transform: translate(-6%, -3%) scale(1); } to { transform: translate(6%, 4%) scale(1.15); } }
`;
const LINES = [['T....Tad...Tadzio?', 1600], ["Who's...Tadzio?", 1800], ['One day...there will be someone named Tadzio...', 1400], ['...seventeen years from now.', 2600]];   // each line, and how long it stays

export function tadzio({ audio }) {
  let root = null, timers = [], game = null;
  const later = (ms, f) => timers.push(setTimeout(f, ms));
  function blip() {   // one short square-wave note for each letter, as the old text boxes did, if SOUND ON has started the audio
    const ac = audio();
    if (ac?.state !== 'running') return;
    const o = new OscillatorNode(ac, { type: 'square', frequency: 660 + Math.random() * 40 }), g = new GainNode(ac, { gain: 0.035 });
    g.gain.setTargetAtTime(0, ac.currentTime + 0.025, 0.01); o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + 0.08);
  }
  function type(box, text, at) {   // a letter at a time; the dots slowly, as if the name were coming back from far off
    [...text].forEach(ch => {
      at += ch === '.' ? 260 : ch === '?' ? 120 : 55;
      later(at, () => { box.textContent += ch; if (ch !== '.' && ch !== ' ') blip(); });
    });
    return at;
  }
  return {
    get playing() { return !!game?.active; },
    open(done) {   // done: when the dream is over
      if (root) return;
      if (!document.getElementById('tzcss')) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500&display=swap"><style id="tzcss">${CSS}</style>`);
      root = Object.assign(document.createElement('div'), { className: 'tz', innerHTML: '<div class="box"></div><div class="dark"></div>' });
      document.body.append(root);
      const box = root.querySelector('.box');
      requestAnimationFrame(() => requestAnimationFrame(() => root?.classList.add('on')));
      later(4500, () => box.classList.add('on'));
      let at = 4700;
      LINES.forEach(([line, hold], i) => { at = type(box, line, at + 300) + hold; if (i < LINES.length - 1) later(at, () => { box.textContent = ''; }); });
      later(at, () => box.classList.remove('on'));
      later(at + 600, () => { root.querySelector('.dark').style.opacity = 1; });
      later(at + 3600, () => { game = dreamgame({ audio, done }); game.open(); });
    },
    close() {
      timers.forEach(clearTimeout); timers = [];
      game?.close(); game = null; root?.remove(); root = null;
    },
  };
}
