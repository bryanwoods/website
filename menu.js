// A pop-up menu the way a 1999 hip-hop home page did one: black, gold chrome, fire, and Impact. It comes up where you click a thing
// that can do more than one thing, and goes away with a click anywhere else or Esc.
const CSS = `
  .menu90 { position: fixed; z-index: 20; min-width: 230px; padding: 10px 12px 12px; background: #000; border: 4px ridge #d4af37; box-shadow: 0 0 0 2px #000, 0 0 22px 6px rgba(255, 70, 0, .55); text-align: center; }
  .menu90 h1 { margin: 0 0 6px; font: 19px Impact, "Arial Black", sans-serif; letter-spacing: 2px; color: transparent;
    background: linear-gradient(#fffbe0, #f5d45a 40%, #8a6200 55%, #ffe680 75%, #c99a1b); -webkit-background-clip: text; background-clip: text; filter: drop-shadow(0 0 5px #ff4500); }
  .menu90 button { display: block; width: 100%; margin: 7px 0 0; padding: 7px 10px 8px; border: 3px outset #c41a00; background: linear-gradient(#ff3d00, #7a0000);
    color: #ffd700; font: 17px Impact, "Arial Black", sans-serif; letter-spacing: 1.5px; text-shadow: 2px 2px #000; cursor: pointer; }
  .menu90 button::before { content: '» '; animation: blink90 .8s steps(1) infinite; }
  .menu90 button:hover, .menu90 button:focus-visible { border-style: inset; background: linear-gradient(#ffe14a, #ff7a00); color: #000; text-shadow: 1px 1px #fff6; outline: none; }
  @keyframes blink90 { 50% { opacity: 0; } }
`;

export function menu(x, y, title, items, pick) {   // items: [label, choice]; pick(choice) runs when one is clicked
  document.querySelector('.menu90')?.remove();
  if (!document.getElementById('menu90')) document.head.insertAdjacentHTML('beforeend', `<style id="menu90">${CSS}</style>`);
  const m = Object.assign(document.createElement('div'), { className: 'menu90' });
  m.innerHTML = `<h1></h1>${items.map(() => '<button></button>').join('')}`;
  m.querySelector('h1').textContent = title;
  m.querySelectorAll('button').forEach((b, i) => { b.textContent = items[i][0]; b.onclick = () => { close(); pick(items[i][1]); }; });
  document.body.append(m);
  m.style.left = `${Math.max(8, Math.min(x, innerWidth - m.offsetWidth - 8))}px`;
  m.style.top = `${Math.max(8, Math.min(y, innerHeight - m.offsetHeight - 8))}px`;
  const away = e => { if (!m.contains(e.target)) close(); }, esc = e => { if (e.key === 'Escape') close(); };
  function close() { m.remove(); removeEventListener('pointerdown', away, true); removeEventListener('keydown', esc, true); }
  addEventListener('pointerdown', away, true); addEventListener('keydown', esc, true);
}
