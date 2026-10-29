// The computer, close up: Windows 98 with AIM already signed on. It is real HTML laid over the glass while you look at the screen,
// in its own shadow root so 98.css styles nothing else on the page. 640 by 480, the way the monitor was set.
import { ME, BUDDIES, listOf, on } from './buddies.js';
import { RECYCLED } from './recycled.js';
import { RESUME } from './resume.js';
import { snood } from './snood.js';
import { doom } from './doom.js';
import { ie } from './ie.js';

const CDN = 'https://cdn.jsdelivr.net/npm/98.css@0.1.21/dist';
export const SHEET = 'https://script.google.com/macros/s/AKfycbylJz7wB3gsmglRWmgsseErFp6sFF_jLC71Q6zkl9L63NyAcJ9879PNMiz7nYDYbe_9Dw/exec';   // a Google Sheet's web app, tools/visitors.gs: visitors' away messages and the Snood and Jimmy high scores
const esc = s => String(s).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
const fill = html => (html || '').replaceAll('%n', ME);
const dur = m => [[Math.floor(m / 60), 'hour'], [m % 60, 'minute']].filter(([v]) => v).map(([v, u]) => `${v} ${u}${v > 1 ? 's' : ''}`).join(', ');

const RUN = 'M9.5 5 7.6 9.4 4.6 13.2M7.6 9.4l3 1.4.4 3.4M8.8 6.4 5.2 7.6M8.8 6.4l3.2-1.4';
const MAN = `<svg class="man" viewBox="0 0 16 16"><path d="${RUN}" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="${RUN}" fill="none" stroke="#ffd800" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.6" cy="2.6" r="1.9" fill="#ffd800" stroke="#000" stroke-width=".9"/></svg>`;
const NOTE = '<svg class="note" viewBox="0 0 10 10"><path d="M1 .5h6l2 2v7H1z" fill="#ffffb0" stroke="#000" stroke-width=".8"/><path d="M2.5 3.5h5M2.5 5.5h5M2.5 7.5h4" stroke="#808080" stroke-width=".7"/></svg>';
const FLAG = '<svg class="flag" viewBox="0 0 16 14"><path d="M1 2l6-1v5.5L1 7.5z" fill="#e8401c"/><path d="M8 1l7-1v6L8 6.5z" fill="#3cb043"/><path d="M1 8.5l6-1V13L1 14z" fill="#1e64d4"/><path d="M8 7.5l7-.5v6l-7 .5z" fill="#ffc000"/></svg>';
const SNOOD = '<rect x="3" y="3" width="26" height="26" rx="8" fill="#2f6fe0" stroke="#000"/><ellipse cx="11.5" cy="12" rx="3.4" ry="4.2" fill="#fff" stroke="#000"/><ellipse cx="20.5" cy="12" rx="3.4" ry="4.2" fill="#fff" stroke="#000"/><circle cx="12" cy="13" r="1.7"/><circle cx="21" cy="13" r="1.7"/><path d="M9 18.5q7 8 14 0z" fill="#fff" stroke="#000"/>';   // Jake
const FIRE = '<defs><linearGradient id="fire" x2="0" y2="1"><stop offset="0" stop-color="#ffe14a"/><stop offset=".5" stop-color="#ff7a1a"/><stop offset="1" stop-color="#b3120a"/></linearGradient></defs><rect x="1" y="7" width="30" height="18" rx="2" fill="#1a0d08" stroke="#000"/><text x="16" y="21.5" text-anchor="middle" font-family="Impact, Haettenschweiler, Arial Black, sans-serif" font-size="13" fill="url(#fire)" stroke="#000" stroke-width=".8" paint-order="stroke">DOOM</text>';   // DOOM in fire, not id's logo
const IE = '<ellipse cx="16" cy="16" rx="14.5" ry="6.5" transform="rotate(-28 16 16)" fill="none" stroke="#f2b51b" stroke-width="2.6"/><text x="16" y="24.5" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-weight="bold" font-size="25" fill="#2a6fd8" stroke="#0b3c8c" stroke-width=".8">e</text><path d="M3.3 22.6c1.6 2.3 6 2.6 11.2 1" fill="none" stroke="#f2b51b" stroke-width="2.6" stroke-linecap="round"/>';   // the e, its ring in front at the lower left
const BIN = '<path d="M8 9h16l-2 20H10z" fill="#dfe8e8" stroke="#000"/><path d="M9 9l2-5 4 3 3-4 3 4 2-1 1 3z" fill="#fff" stroke="#000"/><path d="M12 12l1 14M16 12v14M20 12l-1 14" stroke="#808080"/>';   // full
const PIC = '<svg class="ico" viewBox="0 0 16 16"><rect x="1.5" y="2.5" width="13" height="11" fill="#fff" stroke="#000"/><path d="M3 12l3.5-4 2.5 3 2-2 2.5 3z" fill="#2a8a3a"/><circle cx="11" cy="5.5" r="1.4" fill="#f0c000"/></svg>';
const TXT = '<svg class="ico" viewBox="0 0 16 16"><path d="M3 1.5h7l3 3v10H3z" fill="#fff" stroke="#000"/><path d="M5 6h6M5 8h6M5 10h6M5 12h4" stroke="#000080" stroke-width=".8"/></svg>';
const DOC = '<svg class="ico" viewBox="0 0 16 16"><path d="M4 1.5h7l3 3v10H4z" fill="#fff" stroke="#000"/><rect x="1.5" y="6" width="8" height="7" fill="#1f4fbf" stroke="#000"/><path d="M2.7 7.5l1 4 1-3 1 3 1-4" fill="none" stroke="#fff" stroke-width=".9"/></svg>';
const KIND = { jpg: ['JPEG Image', PIC], gif: ['GIF Image', PIC], txt: ['Text Document', TXT], doc: ['Microsoft Word Document', DOC] };
const kind = f => KIND[f.name.split('.').pop()];
const menu = (...items) => `<div class="menubar">${items.map(m => `<span>${m}</span>`).join('')}</div>`;
export const ICONS = [
  ['My Computer', '<rect x="4" y="3" width="24" height="18" fill="#c0c0c0" stroke="#000"/><rect x="7" y="6" width="18" height="12" fill="#008080" stroke="#404040"/><rect x="9" y="21" width="14" height="4" fill="#c0c0c0" stroke="#000"/><rect x="3" y="25" width="26" height="5" fill="#c0c0c0" stroke="#000"/>'],
  ['Recycle Bin', BIN],
  ['Internet Explorer', IE],
  ['Snood', SNOOD],
  ['DOOM', FIRE],
  ['RESUME.doc', '<path d="M7 2h13l6 6v22H7z" fill="#fff" stroke="#000"/><path d="M20 2v6h6" fill="#c0c0c0" stroke="#000"/><rect x="3" y="12" width="15" height="14" fill="#1f4fbf" stroke="#000"/><path d="M5.5 15l2 8 2-6 2 6 2-8" fill="none" stroke="#fff" stroke-width="1.6"/>'],
];
const SUNK = 'box-shadow: inset -1px -1px #fff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a';
const CSS = `
  [hidden] { display: none !important; }
  .screen { position: relative; width: 640px; height: 480px; overflow: hidden; background: #008080; color: #000; font: 11px "Pixelated MS Sans Serif", Arial, sans-serif; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; cursor: default; }
  .screen::after { content: ''; position: absolute; inset: 0; z-index: 100002; pointer-events: none;   /* the glass: scanlines, and the tube darker toward its edges */
    background: repeating-linear-gradient(rgba(0,0,0,.08) 0 1px, transparent 1px 3px); box-shadow: inset 0 0 70px rgba(0,0,0,.5), inset 0 0 12px rgba(0,0,0,.6); }
  .screen > .window { position: absolute; }
  .title-bar { touch-action: none; }   /* a finger drags the window, not the page */
  .title-bar-text { display: flex; align-items: center; gap: 3px; min-width: 0; }
  .title-bar-text span, .task span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .man { width: 14px; height: 14px; flex: none; } .note { width: 10px; height: 10px; flex: none; } .flag { width: 16px; height: 14px; }
  .menubar { display: flex; padding: 1px 0 3px; } .menubar span { padding: 1px 6px; }
  .icon { position: absolute; left: 6px; width: 72px; text-align: center; color: #fff; }
  .icon svg { display: block; width: 32px; height: 32px; margin: 0 auto 4px; }
  .icon span { padding: 1px 2px; }
  .icon.sel span { background: #000080; outline: 1px dotted #fff; }
  .icon.sel svg { filter: brightness(.55) sepia(1) hue-rotate(190deg) saturate(5); }
  .taskbar { position: absolute; left: 0; right: 0; bottom: 0; height: 28px; z-index: 100000; display: flex; align-items: center; gap: 3px; padding: 2px 2px 0; box-sizing: border-box; background: silver; box-shadow: inset 0 1px #dfdfdf, inset 0 2px #fff; }
  .taskbar button { min-width: 0; min-height: 0; height: 22px; padding: 0 5px; display: flex; align-items: center; gap: 4px; }
  .start { font-weight: bold; }
  .tasks { display: flex; gap: 3px; flex: 1; min-width: 0; }
  .task { width: 150px; justify-content: flex-start; overflow: hidden; white-space: nowrap; }
  .task.on { font-weight: bold; background: repeating-conic-gradient(silver 0 25%, #fff 0 50%) 0 0 / 2px 2px; ${SUNK}; }
  .tray { height: 22px; padding: 0 8px; display: flex; align-items: center; gap: 6px; box-shadow: inset -1px -1px #fff, inset 1px 1px #808080; }
  .tray .man { width: 16px; height: 16px; }
  .tip { position: absolute; z-index: 100001; max-width: 200px; padding: 2px 4px; background: #ffffe1; border: 1px solid #000; pointer-events: none; }
  .aim { width: 184px; height: 434px; display: flex; flex-direction: column; }
  .banner { display: flex; align-items: center; gap: 6px; margin: 0 1px 5px; padding: 5px 6px; background: #fff; ${SUNK}; font: bold italic 12px/1.05 Arial, sans-serif; color: #0a246a; }
  .banner .man { width: 30px; height: 30px; }
  .aim .panel { flex: 1; display: flex; min-height: 0; margin: 0 1px; padding: 3px; }
  .aim .tree-view { flex: 1; margin: 0; overflow-y: auto; }
  .tree-view summary { font-weight: bold; }
  .buddy { display: flex; align-items: center; gap: 3px; padding: 0 2px; white-space: nowrap; }
  .buddy.sel { background: #000080; color: #fff; } .buddy.fresh { font-weight: bold; } .buddy.leave { color: #000080; cursor: pointer; }
  .buddy.idle, .buddy.offline { color: #808080; }
  .aim .buttons { display: flex; gap: 2px; margin: 4px 1px 1px; } .aim .buttons button { flex: 1; min-width: 0; padding: 0; }
  .im { width: 340px; height: 262px; display: flex; flex-direction: column; }
  .log, .html { background: #fff; ${SUNK}; font: 13px/1.35 Arial, sans-serif; user-select: text; overflow-y: auto; }
  .log { flex: 1; margin: 0 1px 3px; padding: 4px 6px; } .log p { margin: 0 0 2px; } .log .me { color: #f00; } .log .them { color: #00f; }
  .tools { display: flex; gap: 1px; margin: 0 1px 2px; } .tools button { min-width: 0; min-height: 0; width: 22px; height: 18px; padding: 0; font: bold 11px Arial, sans-serif; }
  .im textarea { height: 46px; margin: 0 1px; resize: none; font: 13px Arial, sans-serif; }
  .row { display: flex; gap: 3px; margin: 4px 1px 1px; } .row span { flex: 1; } .row button { min-width: 50px; padding: 0 6px; }
  .info { width: 300px; } .info fieldset { margin: 0 0 6px; } .html { max-height: 120px; padding: 4px 6px; }
  .alert { width: 260px; } .alert p { display: flex; align-items: center; gap: 10px; margin: 8px 6px 12px; } .alert p svg { flex: none; width: 28px; height: 28px; }
  .ok { text-align: center; }
  .drop { position: absolute; left: 6px; top: 38px; z-index: 5; min-width: 150px; padding: 2px; background: silver; box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff; }
  .drop div { padding: 3px 16px; } .drop div:hover { background: #000080; color: #fff; } .drop .off, .drop .off:hover { background: none; color: #808080; }
  .drop hr { margin: 2px 0; border: 0; border-top: 1px solid grey; border-bottom: 1px solid #fff; }
  .awaymsg, .hiscore { width: 300px; } .awaymsg input, .awaymsg textarea, .hiscore input { width: 100%; box-sizing: border-box; font: 12px Arial, sans-serif; } .awaymsg .err, .hiscore .err { min-height: 13px; margin: 6px 0; color: #a00000; }
  .ico { width: 16px; height: 16px; flex: none; vertical-align: -4px; margin-right: 4px; }
  .folder { width: 566px; height: 372px; display: flex; flex-direction: column; }
  .address { display: flex; align-items: center; gap: 4px; margin: 0 1px 3px; } .address div { flex: 1; display: flex; align-items: center; padding: 2px 3px; background: #fff; ${SUNK}; }
  .pane { flex: 1; display: flex; min-height: 0; margin: 0 1px; background: #fff; ${SUNK}; padding: 2px; }
  .web { width: 128px; flex: none; padding: 8px; overflow: hidden; } .web > svg { width: 32px; height: 32px; }
  .web h1 { margin: 2px 0 8px; padding-bottom: 4px; font: bold 15px Arial, sans-serif; border-bottom: 2px solid; border-image: linear-gradient(90deg, #000080, #1084d0, transparent) 1; }
  .pane .sunken-panel { flex: 1; border: 0; box-shadow: none; } .pane td { white-space: nowrap; } .pane tr { cursor: default; }
  .folder .status-bar { margin: 3px 1px 0; }
  .reader { width: 430px; height: 300px; display: flex; flex-direction: column; }
  .reader textarea { flex: 1; margin: 0 1px 1px; resize: none; font: 13px/1.3 "Courier New", monospace; }
  .page { flex: 1; overflow-y: auto; margin: 0 1px 1px; padding: 14px 22px; background: #fff; ${SUNK}; font: 14px/1.4 "Times New Roman", serif; user-select: text; }
  .props { width: 300px; } .props .head { display: flex; align-items: center; gap: 10px; margin: 6px 4px 8px; } .props .head .ico { width: 32px; height: 32px; }
  .word { width: 612px; height: 434px; display: flex; flex-direction: column; }
  .fmt { display: flex; align-items: center; gap: 2px; margin: 0 1px 3px; } .fmt select { height: 21px; } .fmt button { min-width: 0; width: 23px; height: 21px; padding: 0; font: 12px "Times New Roman", serif; }
  .ruler { height: 14px; margin: 0 1px 2px; background: #fff repeating-linear-gradient(90deg, transparent 0 11px, #808080 11px 12px) 0 100% / 100% 4px no-repeat; ${SUNK}; }
  .doc { flex: 1; overflow-y: auto; margin: 0 1px; padding: 12px 0; background: #808080; ${SUNK}; }
  .sheet { width: 480px; margin: 0 auto; padding: 36px 46px; box-sizing: border-box; background: #fff; box-shadow: 2px 2px #000; font: 12px/1.35 "Times New Roman", serif; user-select: text; }
  .sheet h1 { margin: 0; text-align: center; font-size: 21px; letter-spacing: 3px; } .sheet .place { margin: 1px 0 6px; text-align: center; }
  .sheet h2 { margin: 14px 0 6px; font-size: 12px; letter-spacing: 1px; border-bottom: 1px solid; }
  .sheet .job { margin-bottom: 7px; } .sheet .line { display: flex; justify-content: space-between; gap: 10px; } .sheet .line span { flex: none; white-space: nowrap; } .sheet i { color: #333; } .sheet p { margin: 2px 0 0; }
  .word .status-bar { margin: 3px 1px 0; }
  .snood .window-body { display: flex; gap: 8px; margin: 4px; }
  .snood .well { padding: 2px; ${SUNK}; } .snood canvas { display: block; width: 288px; height: 368px; touch-action: none; }
  .scores { width: 270px; } .scores select { margin-bottom: 6px; } .scores .sunken-panel { height: 210px; } .scores table { width: 100%; } .scores td:nth-child(3) { text-align: right; }
  .snood .side { width: 92px; display: flex; flex-direction: column; gap: 6px; text-align: center; }
  .snood fieldset { margin: 0; padding: 2px 4px 5px; } .snood fieldset b { font: bold 16px Arial, sans-serif; }
  .snood .meter { position: relative; flex: 1; margin: 4px 30px 0; background: linear-gradient(#e02020, #f0d000 45%, #2bb52b); ${SUNK}; }
  .snood .meter div { position: absolute; top: 2px; left: 2px; right: 2px; max-height: calc(100% - 4px); background: #fff; }
  .snood .meter.hot { animation: hot .5s steps(1) infinite; } @keyframes hot { 50% { filter: brightness(1.5); } }
  .doom .window-body { margin: 3px; } .doom .status-bar { margin: 0 3px 3px; }
  .doom .crt { position: relative; width: 480px; height: 360px; background: #000; }
  .doom canvas { display: block; width: 100%; height: 100%; image-rendering: pixelated; outline: none; }
  .doom .crt p { position: absolute; left: 0; right: 0; top: 45%; margin: 0; text-align: center; color: #aaa; font: 14px "Courier New", monospace; }
  .ie { width: 600px; height: 432px; display: flex; flex-direction: column; }
  .ie .menubar { align-items: center; } .ie .spin { margin-left: auto; padding: 0 4px; } .ie .spin svg { width: 20px; height: 20px; }
  .ie.busy .spin svg { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotateY(360deg); } }
  .ie .nav { display: flex; gap: 2px; margin: 0 1px 3px; } .ie .nav button { min-width: 0; padding: 0 9px; }
  .ie .address input { flex: 1; } .ie .address button { min-width: 0; padding: 0 8px; }
  .ie .view { flex: 1; display: flex; min-height: 0; margin: 0 1px; padding: 2px; ${SUNK}; } .ie iframe { flex: 1; border: 0; background: #fff; }
  .ie .status-bar { margin: 3px 1px 0; } .ie .status-bar-field:first-child { flex: 1; }
  .props hr { border: 0; border-top: 1px solid #808080; border-bottom: 1px solid #fff; } .props table { background: none; } .props td:first-child { padding-right: 20px; }
`;

export function desktop(sfx) {
  // a shadow root ignores @font-face, so the pixel font is declared on the page
  document.head.insertAdjacentHTML('beforeend', `<style>@font-face{font-family:"Pixelated MS Sans Serif";src:url(${CDN}/ms_sans_serif.woff2) format("woff2")}@font-face{font-family:"Pixelated MS Sans Serif";font-weight:700;src:url(${CDN}/ms_sans_serif_bold.woff2) format("woff2")}</style>`);
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:0;top:0;width:640px;height:480px;transform-origin:0 0;display:none;opacity:0;transition:opacity .35s;border-radius:12px;overflow:hidden;z-index:2;touch-action:manipulation';
  document.body.append(host);
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<link rel="stylesheet" href="${CDN}/98.css"><style>${CSS}</style><div class="screen">
    ${ICONS.map(([label, svg], i) => `<div class="icon" data-icon="${label}" style="top:${8 + i * 70}px"><svg viewBox="0 0 32 32">${svg}</svg><span>${label}</span></div>`).join('')}
    <div class="taskbar"><button class="start">${FLAG}Start</button><div class="tasks"></div><div class="tray">${MAN}<span class="clock">4:47 PM</span></div></div>
    <div class="tip" hidden></div></div>`;
  const screen = root.querySelector('.screen'), tasks = root.querySelector('.tasks'), tip = root.querySelector('.tip');
  let scale = 1, z = 1, touchy = false;   // touchy: the last press was a finger, so a tap does what a double-click does
  screen.addEventListener('pointerdown', e => { touchy = e.pointerType === 'touch'; }, true);

  // the window you touch comes to the top with a blue title bar and a pressed taskbar button; the rest go grey
  function front(w) {
    const all = [...screen.querySelectorAll(':scope > .window')];
    if (w) w.style.zIndex = ++z;
    const top = w || all.filter(x => !x.hidden).sort((a, b) => b.style.zIndex - a.style.zIndex)[0];
    for (const x of all) { x.querySelector('.title-bar').classList.toggle('inactive', x !== top); x.task.classList.toggle('on', x === top); }
  }
  function open(title, cls, x, y, body, icon = MAN) {
    const w = document.createElement('div'), task = document.createElement('button');
    w.className = `window ${cls}`; w.style.cssText = `left:${x}px;top:${y}px`; w.task = task;
    w.innerHTML = `<div class="title-bar"><div class="title-bar-text">${icon}<span>${esc(title)}</span></div><div class="title-bar-controls"><button aria-label="Minimize"></button><button aria-label="Close"></button></div></div>${body}`;
    task.className = 'task'; task.innerHTML = `${icon}<span>${esc(title)}</span>`;
    screen.insertBefore(w, tip); tasks.append(task);
    const bar = w.querySelector('.title-bar');
    w.addEventListener('pointerdown', () => front(w), true);
    bar.onpointerdown = e => {   // drag by the title bar; the screen is scaled, so the pointer moves farther than the window
      if (e.target.closest('button')) return;
      const x0 = e.clientX, y0 = e.clientY, l = w.offsetLeft, t = w.offsetTop;
      bar.setPointerCapture(e.pointerId);
      bar.onpointermove = m => { w.style.left = `${l + (m.clientX - x0) / scale}px`; w.style.top = `${t + (m.clientY - y0) / scale}px`; };
      bar.onpointerup = () => { bar.onpointermove = null; };
    };
    const hide = () => { w.hidden = true; front(); };
    w.querySelector('[aria-label=Minimize]').onclick = hide;
    w.querySelector('[aria-label=Close]').onclick = () => w.close();
    task.onclick = () => (!w.hidden && task.classList.contains('on') ? hide() : (w.hidden = false, front(w)));
    w.close = () => { w.remove(); task.remove(); w.onclose?.(); front(); };
    front(w);
    return w;
  }
  const alert = (text, title = 'Instant Message', icon = MAN) => { const w = open(title, 'alert', 190, 170, `<div class="window-body"><p>${icon}${esc(text)}</p><div class="ok"><button>OK</button></div></div>`, icon); w.querySelector('.ok button').onclick = () => w.close(); };

  // the buddy list, with a note beside whoever is away. It is alive while you watch: one buddy signs on a few seconds after you sit down,
  // in bold with the door opening, and after that someone comes or goes every minute or so
  const ons = BUDDIES.filter(on), gone = new Set(ons.length > 1 ? [ons[Math.floor(Math.random() * ons.length)]] : []), fresh = new Set(), here = b => on(b) && !gone.has(b);
  let picked, live = 0;
  const row = b => `<li class="buddy ${b.status}${fresh.has(b) ? ' fresh' : ''}${b === picked ? ' sel' : ''}" data-name="${esc(b.name)}">${esc(b.name)}${b.status === 'away' && here(b) ? NOTE : ''}</li>`;
  // the away messages visitors have left, from the server: shown as away buddies under Visitors, their words escaped, never run as HTML
  let visitors = [], api = false;   // api: the server answered, so messages can be left here
  const seen = v => ({ name: v.name, status: 'away', away: esc(v.away), at: v.at });
  const when = b => b.at ? `Left this on ${new Date(b.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : `Online time: ${dur(b.online)}${b.idle ? `<br>Idle: ${dur(b.idle)}` : ''}`;
  const groups = () => {
    const all = listOf(gone);
    if (api) all.splice(-1, 0, ['Visitors', visitors, visitors.length]);
    return all.map(([g, bs, n]) => `<li><details open><summary>${g} (${bs.length}/${n})</summary><ul>${g === 'Visitors' ? '<li class="buddy leave"><i>+ leave yours...</i></li>' : ''}${bs.map(row).join('')}</ul></details></li>`).join('');
  };
  const list = open(`${ME}'s Buddy List`, 'aim', 446, 8, `${menu('My AIM', 'People', 'Help')}
    <div class="banner">${MAN}<span>AOL Instant<br>Messenger</span></div>
    <menu role="tablist"><li role="tab" aria-selected="true"><a>Online</a></li><li role="tab"><a>List Setup</a></li></menu>
    <div class="window panel" role="tabpanel"><ul class="tree-view">${groups()}</ul></div>
    <div class="buttons"><button data-do="im">IM</button><button>Chat</button><button data-do="info">Info</button></div>`);
  list.close = () => { list.hidden = true; front(); };   // closing the list leaves AIM running in the tray
  root.querySelector('.tray .man').onclick = () => { list.hidden = false; front(list); };
  const tree = list.querySelector('.tree-view'), who = e => [...BUDDIES, ...visitors].find(b => b.name === e.target.closest('.buddy')?.dataset.name);
  const render = () => { tree.innerHTML = groups(); };
  fetch(SHEET).then(r => (r.ok ? r.json() : Promise.reject())).then(vs => { api = true; visitors = vs.map(seen); render(); }, () => {});

  // My AIM > Set Away Message...: a visitor leaves an away message for whoever sits down here next
  const myAim = list.querySelector('.menubar span'), drop = Object.assign(document.createElement('div'), { className: 'drop', hidden: true });
  drop.innerHTML = '<div data-do="away">Set Away Message...</div><hr><div class="off">Sign Off</div>';
  list.append(drop);
  myAim.onclick = () => { drop.hidden = !drop.hidden; };
  screen.addEventListener('pointerdown', e => { if (e.target !== myAim && !drop.contains(e.target)) drop.hidden = true; });
  drop.querySelector('[data-do=away]').onclick = () => { drop.hidden = true; awayMessage(); };
  function awayMessage() {
    const w = open('Away Message', 'awaymsg', 150, 80, `<div class="window-body">
      <p>Leave an away message on ${ME}'s buddy list. Whoever sits down here next will see it under Visitors.</p>
      <div class="field-row-stacked"><label>Your screen name</label><input class="sn" maxlength="16"></div>
      <div class="field-row-stacked"><label>Away message</label><textarea class="msg" maxlength="200" rows="4"></textarea></div>
      <p class="err"></p><div class="ok"><button class="go">I'm Away</button> <button class="no">Cancel</button></div></div>`, NOTE);
    const sn = w.querySelector('.sn'), msg = w.querySelector('.msg'), err = w.querySelector('.err');
    try { sn.value = localStorage.getItem('aim-screen-name') || ''; } catch {}
    w.querySelector('.no').onclick = () => w.close();
    w.querySelector('.go').onclick = async () => {
      if (BUDDIES.some(b => b.name.toLowerCase() === sn.value.trim().toLowerCase())) return void (err.textContent = 'That screen name belongs to one of my buddies.');
      const r = await fetch(SHEET, { method: 'POST', body: JSON.stringify({ name: sn.value, away: msg.value }) }).catch(() => null);   // plain text, so no CORS preflight
      const v = await r?.json().catch(() => null);
      if (!r?.ok || !v || v.error) return void (err.textContent = v?.error || "Can't reach AIM right now. Try again later.");
      try { localStorage.setItem('aim-screen-name', v.name); } catch {}
      const b = seen(v); visitors.unshift(b); fresh.add(b); render(); setTimeout(() => { fresh.delete(b); render(); }, 8000);
      w.close();
    };
    sn.focus();
  }
  function stir() {
    const back = [...gone][0], ins = BUDDIES.filter(here);
    if (back) { gone.delete(back); fresh.add(back); sfx('open'); setTimeout(() => { fresh.delete(back); render(); }, 8000); }
    else if (ins.length > 1) { gone.add(ins[Math.floor(Math.random() * ins.length)]); sfx('close'); }
    render(); live = setTimeout(stir, 50000 + Math.random() * 50000);
  }
  const pick = e => { for (const li of tree.querySelectorAll('.buddy')) li.classList.toggle('sel', li === e.target.closest('.buddy')); return (picked = who(e)); };
  let press = 0, pressed = false;   // a long press on a buddy is a right-click
  tree.onpointerdown = e => {   // the target is kept: an event inside a shadow root loses it once it has been dispatched
    const held = { target: e.target }; pressed = false; clearTimeout(press);
    if (e.pointerType === 'touch') press = setTimeout(() => { if (pick(held)) { pressed = true; info(picked); } }, 550);
  };
  tree.onpointerup = tree.onpointercancel = () => clearTimeout(press);
  tree.onclick = e => {
    if (e.target.closest('.leave')) return awayMessage();
    if (touchy) { if (!pressed && pick(e)) im(picked); return; }
    if (pick(e) && (e.metaKey || e.ctrlKey)) info(picked);
  };
  tree.oncontextmenu = e => { e.preventDefault(); if (pick(e)) info(picked); };   // a right-click, or a control-click on a Mac, opens the profile
  tree.ondblclick = e => { const b = who(e); if (b) im(b); };
  tree.onmouseover = e => {
    const b = who(e), li = e.target.closest('.buddy');
    if (!b) return void (tip.hidden = true);
    const r = li.getBoundingClientRect(), s = screen.getBoundingClientRect();
    tip.innerHTML = `<b>${esc(b.name)}</b><br>${here(b) ? `${when(b)}${b.status === 'away' ? '<br>Away' : ''}` : 'Not signed on'}`;
    tip.style.left = `${Math.min((r.left - s.left) / scale, 440)}px`; tip.style.top = `${(r.bottom - s.top) / scale + 4}px`; tip.hidden = false;
  };
  tree.onmouseleave = () => { tip.hidden = true; };
  list.querySelector('[data-do=im]').onclick = () => picked && im(picked);
  list.querySelector('[data-do=info]').onclick = () => picked && info(picked);

  // an IM window; someone away has already answered with their away message
  const ims = new Map();
  function im(b) {
    if (!here(b)) return alert(`${b.name} is not currently signed on.`);
    if (ims.has(b.name)) { const w = ims.get(b.name); w.hidden = false; return front(w); }
    const w = open(`${b.name} - Instant Message`, 'im', 96 + ims.size * 22, 30 + ims.size * 22, `${menu('File', 'Edit', 'Insert', 'People')}
      <div class="log"></div>
      <div class="tools">${['A', 'A', '<small>A</small>', 'A', '<big>A</big>', 'B', '<i>I</i>', '<u>U</u>', '@', ':)'].map(t => `<button>${t}</button>`).join('')}</div>
      <textarea></textarea>
      <div class="row"><button>Warn</button><button>Block</button><span></span><button data-do="info">Get Info</button><button data-do="send">Send</button></div>`);
    ims.set(b.name, w); w.onclose = () => ims.delete(b.name);
    const log = w.querySelector('.log'), box = w.querySelector('textarea');
    const say = (cls, name, html) => { log.insertAdjacentHTML('beforeend', `<p><b class="${cls}">${esc(name)}:</b> ${html}</p>`); log.scrollTop = log.scrollHeight; };
    if (b.status === 'away') { say('them', `Auto response from ${b.name}`, fill(b.away)); sfx('inbound'); }
    const send = () => { const t = box.value.trim(); if (t) { say('me', ME, esc(t)); sfx('outbound'); } box.value = ''; };
    box.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };
    w.querySelector('[data-do=send]').onclick = send;
    w.querySelector('[data-do=info]').onclick = () => info(b);
    box.focus();
  }
  function info(b) {
    if (!here(b)) return alert(`${b.name} is not currently signed on.`);
    const k = screen.querySelectorAll(':scope > .info').length, w = open(`Buddy Info: ${b.name}`, 'info', 160 + k * 22, 50 + k * 22, `<div class="window-body">
      <p>Screen name: <b>${esc(b.name)}</b><br>${when(b)}</p>
      ${b.status === 'away' ? `<fieldset><legend>Away Message</legend><div class="html">${fill(b.away)}</div></fieldset>` : ''}
      <fieldset><legend>Profile</legend><div class="html">${fill(b.profile) || '<i>No profile.</i>'}</div></fieldset>
      <div class="ok"><button>Close</button></div></div>`);
    w.querySelector('.ok button').onclick = () => w.close();
  }

  // the Recycle Bin: Explorer's details view of everything deleted, with the web view's panel down its left side
  let binWin;
  function bin() {
    if (binWin?.isConnected) { binWin.hidden = false; return front(binWin); }
    binWin = open('Recycle Bin', 'folder', 36, 24, `${menu('File', 'Edit', 'View', 'Go', 'Favorites', 'Help')}
      <div class="address">Address<div><svg class="ico" viewBox="0 0 32 32">${BIN}</svg>Recycle Bin</div></div>
      <div class="pane"><div class="web"><svg viewBox="0 0 32 32">${BIN}</svg><h1>Recycle Bin</h1><p class="about">This folder contains files and folders that you have deleted from your computer.</p></div>
        <div class="sunken-panel"><table class="interactive"><thead><tr><th>Name</th><th>Original Location</th><th>Date Deleted</th><th>Type</th><th>Size</th></tr></thead><tbody>
        ${RECYCLED.map((f, i) => `<tr data-i="${i}"><td>${kind(f)[1]}${esc(f.name)}</td><td>${esc(f.from)}</td><td>${f.deleted}</td><td>${kind(f)[0]}</td><td>${f.size}KB</td></tr>`).join('')}</tbody></table></div></div>
      <div class="status-bar"><p class="status-bar-field">${RECYCLED.length} object(s)</p><p class="status-bar-field">${RECYCLED.reduce((s, f) => s + f.size, 0)}KB</p></div>`, `<svg class="ico" viewBox="0 0 32 32">${BIN}</svg>`);
    const rows = binWin.querySelector('tbody'), about = binWin.querySelector('.about'), file = e => RECYCLED[e.target.closest('tr')?.dataset.i];
    rows.onclick = e => {
      for (const tr of rows.children) tr.classList.toggle('highlighted', tr === e.target.closest('tr'));
      const f = file(e);
      if (f) about.innerHTML = `<b>${esc(f.name)}</b><br>${kind(f)[0]}<br><br>Original location:<br>${esc(f.from)}<br><br>Deleted: ${f.deleted}`;
    };
    rows.ondblclick = e => { const f = file(e); if (f) (f.text == null ? properties : read)(f); };
    rows.addEventListener('click', e => { if (touchy) rows.ondblclick(e); });
  }
  function properties(f) {   // a deleted picture can't be opened, only looked at
    const w = open(`${f.name} Properties`, 'props', 190, 80, `<div class="window-body">
      <div class="head">${kind(f)[1]}<b>${esc(f.name)}</b></div><hr>
      <table><tr><td>Origin:</td><td>${esc(f.from)}</td></tr><tr><td>Type:</td><td>${kind(f)[0]}</td></tr><tr><td>Size:</td><td>${f.size}KB (${(f.size * 1024 - 211).toLocaleString('en-US')} bytes)</td></tr></table><hr>
      <table><tr><td>Deleted:</td><td>${f.deleted}</td></tr></table>
      <div class="ok"><button>OK</button></div></div>`, kind(f)[1]);
    w.querySelector('.ok button').onclick = () => w.close();
  }
  function read(f) {   // the writing opens where it was written: Notepad for a .txt, WordPad for a .doc
    const pad = f.name.endsWith('.txt'), k = screen.querySelectorAll(':scope > .reader').length;
    open(`${f.name} - ${pad ? 'Notepad' : 'WordPad'}`, 'reader', 120 + k * 22, 56 + k * 22, pad
      ? `${menu('File', 'Edit', 'Search', 'Help')}<textarea spellcheck="false">${esc(f.text)}</textarea>`
      : `${menu('File', 'Edit', 'View', 'Insert', 'Format', 'Help')}<div class="page">${f.text.split('\n\n').map(p => `<p>${esc(p).replaceAll('\n', '<br>')}</p>`).join('')}</div>`, kind(f)[1]);
  }
  screen.querySelector('[data-icon="Recycle Bin"]').ondblclick = bin;

  // RESUME.doc, open in Word 97
  let doc;
  screen.querySelector('[data-icon="RESUME.doc"]').ondblclick = () => {
    if (doc?.isConnected) { doc.hidden = false; return front(doc); }
    const { name, place, jobs, school: [school, field, years] } = RESUME;
    doc = open('Microsoft Word - RESUME.doc', 'word', 14, 6, `${menu('File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Table', 'Window', 'Help')}
      <div class="fmt"><select><option>Normal</option></select><select><option>Times New Roman</option></select><select><option>12</option></select><button><b>B</b></button><button><i>I</i></button><button><u>U</u></button></div>
      <div class="ruler"></div>
      <div class="doc"><div class="sheet"><h1>${esc(name).toUpperCase()}</h1><div class="place">${esc(place)}</div>
        <h2>EXPERIENCE</h2>${jobs.map(([title, company, dates, where, what]) => `<div class="job"><div class="line"><b>${esc(title)}, ${esc(company)}</b><span>${dates}</span></div>${where ? `<i>${esc(where)}</i>` : ''}${what ? `<p>${esc(what)}</p>` : ''}</div>`).join('')}
        <h2>EDUCATION</h2><div class="job"><div class="line"><b>${esc(school)}</b><span>${years}</span></div><i>${esc(field)}</i></div></div></div>
      <div class="status-bar">${['Page 1', 'Sec 1', '1/1', 'At 1"', 'Ln 1', 'Col 1'].map(s => `<p class="status-bar-field">${s}</p>`).join('')}</div>`, DOC);
  };

  let game;
  screen.querySelector('[data-icon="Snood"]').ondblclick = () => {
    if (game?.isConnected) { game.hidden = false; return front(game); }
    game = snood(open, sfx, `<svg class="ico" viewBox="0 0 32 32">${SNOOD}</svg>`, SHEET);
  };

  let browser;
  screen.querySelector('[data-icon="Internet Explorer"]').ondblclick = () => {
    if (browser?.isConnected) { browser.hidden = false; return front(browser); }
    browser = ie(open, `<svg class="ico" viewBox="0 0 32 32">${IE}</svg>`);
  };

  let shooter;   // DOOM can't pause, so leaving the computer quits it
  screen.querySelector('[data-icon="DOOM"]').ondblclick = () => {
    const icon = `<svg class="ico" viewBox="0 0 32 32">${FIRE}</svg>`;
    if (touchy) return alert('DOOM needs a keyboard. Try it on a computer.', 'DOOM', icon);
    if (shooter?.isConnected) { shooter.hidden = false; return front(shooter); }
    shooter = doom(open, icon);
  };

  for (const icon of screen.querySelectorAll('.icon')) {
    icon.onpointerdown = () => { for (const i of screen.querySelectorAll('.icon')) i.classList.toggle('sel', i === icon); };
    icon.addEventListener('click', () => { if (touchy) icon.ondblclick?.(); });
  }
  screen.onpointerdown = e => { if (e.target === screen) for (const i of screen.querySelectorAll('.icon')) i.classList.remove('sel'); };

  return {
    show() { host.style.display = 'block'; requestAnimationFrame(() => { host.style.opacity = 1; }); clearTimeout(live); live = setTimeout(stir, gone.size ? 7000 : 50000); },
    hide() { if (shooter?.isConnected) shooter.close(); host.style.display = 'none'; host.style.opacity = 0; tip.hidden = true; clearTimeout(live); },
    get visitors() { return api; },   // whether a server keeps visitors' away messages here
    clock(text) { const c = root.querySelector('.clock'); if (c.textContent !== text) c.textContent = text; },
    place(x, y, width, height) { scale = width / 640; host.style.transform = `translate(${x}px, ${y}px) scale(${scale}, ${height / 480})`; },   // over the glass, in page pixels; the glass is a little taller than 4:3
  };
}
