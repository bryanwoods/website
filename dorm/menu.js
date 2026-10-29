// A pop-up menu the way a 2002 site did one: a brushed-metal plate with a screw in each corner, the question on a dark LCD strip in amber
// pixel type, and glossy gel buttons with a red LED that lights when you point at one. It comes up where you click a thing that can do
// more than one thing, and goes away with a click anywhere else or Esc. From the bedroom's menu.js, which keeps its 1999 look; the two
// rooms deploy to different folders. dismiss() runs when it goes away with no choice.
const CSS = `
  .menu90 { position: fixed; z-index: 20; min-width: 220px; padding: 14px 14px 12px; border-radius: 9px; text-align: center;
    background: repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 1px, rgba(0,0,0,.05) 1px 3px), linear-gradient(#e3e6ea, #a9aeb5 48%, #8f949b 52%, #c9cdd2);
    border: 1px solid #4c5158; box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #5d6269, 0 6px 18px rgba(0,0,0,.55); }
  .menu90::before, .menu90::after { content: ''; position: absolute; top: 6px; width: 7px; height: 7px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #8a8f96 60%, #3d4147); box-shadow: 0 0 0 1px #555; }
  .menu90::before { left: 6px; } .menu90::after { right: 6px; }
  .menu90 h1 { margin: 2px 0 10px; padding: 7px 10px 6px; border-radius: 4px; background: repeating-linear-gradient(#0d1a24 0 2px, #0a141c 2px 3px); border: 1px solid #262c33;
    box-shadow: inset 0 2px 5px #000; font: 400 14px Silkscreen, "Lucida Console", monospace; letter-spacing: 1px; color: #ffb21c; text-shadow: 0 0 6px rgba(255,150,0,.75); }
  .menu90 button { position: relative; display: block; width: 100%; margin: 8px 0 0; padding: 7px 10px 7px 28px; border: 1px solid #0c3d6b; border-radius: 14px; cursor: pointer;
    background: linear-gradient(#7fd0ff, #2a8fe0 50%, #1567b8 51%, #3aa4f2); color: #fff; font: 400 13px Silkscreen, Verdana, sans-serif; letter-spacing: 1px; text-shadow: 0 1px 1px #0b3966;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 1px 2px rgba(0,0,0,.4); overflow: hidden; }
  .menu90 button::after { content: ''; position: absolute; left: 8px; top: 50%; width: 8px; height: 8px; margin-top: -4px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #ff9c8a, #7a1208); box-shadow: 0 0 0 1px #3a0904; }
  .menu90 button:hover, .menu90 button:focus-visible { background: linear-gradient(#b6ecff, #48b4ff 50%, #1d84df 51%, #6cc7ff); box-shadow: inset 0 1px 0 #fff, 0 0 10px rgba(80,190,255,.9); outline: none; }
  .menu90 button:hover::after, .menu90 button:focus-visible::after { background: radial-gradient(circle at 35% 35%, #fff2ee, #ff3418 55%, #a10e00); box-shadow: 0 0 0 1px #3a0904, 0 0 8px #ff2a10; }
`;

export function menu(x, y, title, items, pick, dismiss) {   // items: [label, choice]; pick(choice) runs when one is clicked
  document.querySelector('.menu90')?.remove();
  if (!document.getElementById('menu90')) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap"><style id="menu90">${CSS}</style>`);
  const m = Object.assign(document.createElement('div'), { className: 'menu90' });
  m.innerHTML = `<h1></h1>${items.map(() => '<button></button>').join('')}`;
  m.querySelector('h1').textContent = title;
  m.querySelectorAll('button').forEach((b, i) => { b.textContent = items[i][0]; b.onclick = () => { close(); pick(items[i][1]); }; });
  document.body.append(m);
  m.style.left = `${Math.max(8, Math.min(x, innerWidth - m.offsetWidth - 8))}px`;
  m.style.top = `${Math.max(8, Math.min(y, innerHeight - m.offsetHeight - 8))}px`;
  const away = e => { if (!m.contains(e.target)) { close(); dismiss?.(); } }, esc = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); dismiss?.(); } };
  function close() { m.remove(); removeEventListener('pointerdown', away, true); removeEventListener('keydown', esc, true); }
  addEventListener('pointerdown', away, true); addEventListener('keydown', esc, true);
}
