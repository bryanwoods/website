// Things drawn on canvas: the computer screen, posters, a magazine spread, the cigar box label, the comforter, the wall stucco.
// Every name and title here is made up, except the buddy list from buddies.js; the real books on the shelf are listed in props.js.
import * as THREE from 'three';
import { ME, listOf, on } from './buddies.js';

function canvas(w, h, draw) {
  const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
const rnd = (a, b) => a + Math.random() * (b - a);

// the desktop as it looks from across the room, laid out like the real one in desktop.js: three icons, the buddy list, the taskbar
export function screenTexture() {
  return canvas(640, 480, (x, w, h) => {
    x.fillStyle = '#008080'; x.fillRect(0, 0, w, h);
    const bevel = (X, Y, W, H, face = '#c0c0c0') => {
      x.fillStyle = face; x.fillRect(X, Y, W, H);
      x.fillStyle = '#fff'; x.fillRect(X, Y, W, 1); x.fillRect(X, Y, 1, H);
      x.fillStyle = '#404040'; x.fillRect(X, Y + H - 1, W, 1); x.fillRect(X + W - 1, Y, 1, H);
    };
    const text = (s, X, Y, color = '#000', font = '11px Tahoma, Verdana, sans-serif') => { x.fillStyle = color; x.font = font; x.fillText(s, X, Y); };
    ['My Computer', 'Recycle Bin', 'RESUME.doc'].forEach((label, i) => {
      bevel(26, 8 + i * 70, 32, 30, ['#c0c0c0', '#dfe8e8', '#fff'][i]);
      x.textAlign = 'center'; text(label, 42, 55 + i * 70, '#fff'); x.textAlign = 'left';
    });
    const X = 446, Y = 8, W = 184, H = 434;
    bevel(X, Y, W, H);
    const g = x.createLinearGradient(X, 0, X + W, 0); g.addColorStop(0, '#000080'); g.addColorStop(1, '#1084d0');
    x.fillStyle = g; x.fillRect(X + 3, Y + 3, W - 6, 18);
    text(`${ME}'s Buddy List`, X + 22, Y + 16, '#fff', 'bold 11px Tahoma, sans-serif');
    x.fillStyle = '#ffd800'; x.fillRect(X + 6, Y + 6, 11, 12);
    text('My AIM    People    Help', X + 8, Y + 35);
    x.fillStyle = '#fff'; x.fillRect(X + 4, Y + 42, W - 8, 40);
    x.fillStyle = '#ffd800'; x.fillRect(X + 12, Y + 48, 26, 28);
    text('AOL Instant', X + 46, Y + 60, '#0a246a', 'bold italic 12px Arial, sans-serif'); text('Messenger', X + 46, Y + 73, '#0a246a', 'bold italic 12px Arial, sans-serif');
    bevel(X + 6, Y + 86, 50, 18); text('Online', X + 14, Y + 99);
    x.fillStyle = '#fff'; x.fillRect(X + 7, Y + 108, W - 14, 290);
    let row = Y + 124;
    for (const [name, bs, n] of listOf()) {
      text(`${name} (${bs.length}/${n})`, X + 12, row, '#000', 'bold 11px Tahoma, sans-serif'); row += 15;
      for (const b of bs) { text(b.name, X + 26, row, b.status === 'idle' || !on(b) ? '#808080' : '#000'); row += 15; }
    }
    ['IM', 'Chat', 'Info'].forEach((label, i) => { bevel(X + 5 + i * 58, Y + 404, 56, 24); text(label, X + 24 + i * 58, Y + 420); });
    bevel(0, h - 28, w, 28);
    bevel(3, h - 25, 56, 22); text('Start', 18, h - 9, '#000', 'bold 12px Tahoma, sans-serif');
    bevel(64, h - 25, 150, 22, '#e0e0e0'); text(`${ME}'s Buddy List`, 72, h - 9, '#000', 'bold 11px Tahoma, sans-serif');
    bevel(w - 74, h - 25, 70, 22); text('4:47 PM', w - 56, h - 9);
  });
}

// a photocopied show flyer for Bryan's high school band
export function conformityPoster() {
  return canvas(512, 768, (x, w, h) => {
    x.fillStyle = '#0d0d0d'; x.fillRect(0, 0, w, h);
    const d = x.getImageData(0, 0, w, h);
    for (let i = 0; i < d.data.length; i += 4) { const n = Math.random() < 0.04 ? 60 : Math.random() * 14; d.data[i] += n; d.data[i + 1] += n; d.data[i + 2] += n; }   // xerox toner noise
    x.putImageData(d, 0, 0);
    x.fillStyle = '#d42a1e'; x.fillRect(0, h * 0.6, w, 96);
    x.save(); x.translate(w / 2, h * 0.36); x.rotate(-0.06);
    x.fillStyle = '#f2efe6'; x.textAlign = 'center'; x.font = '900 86px Impact, Haettenschweiler, "Arial Narrow", sans-serif';
    x.fillText('CONFORMITY', 0, 0);
    x.strokeStyle = '#0d0d0d'; x.lineWidth = 7; x.beginPath(); x.moveTo(-230, -26); x.lineTo(230, -38); x.stroke();   // a strike through the word, by hand
    x.restore();
    x.fillStyle = '#0d0d0d'; x.font = '900 40px Impact, sans-serif'; x.textAlign = 'center';
    x.fillText('2003 BATTLE OF THE BANDS', w / 2, h * 0.6 + 62);
    x.fillStyle = '#f2efe6'; x.font = '700 20px "Courier New", monospace';
    x.fillText('LIVE  ·  LOUD  ·  ALL AGES', w / 2, h * 0.9);
  });
}

// the backboard of a mini hoop: clear acrylic printed with a black border, a white pinstripe, an orange target square
// whose bottom edge is level with the rim, and a made-up logo
export function backboardTexture() {
  return canvas(512, 360, (x, w, h) => {
    x.fillStyle = 'rgba(235,242,246,0.22)'; x.fillRect(0, 0, w, h);
    x.strokeStyle = '#141414'; x.lineWidth = 22; x.strokeRect(11, 11, w - 22, h - 22);
    x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = 4; x.strokeRect(30, 30, w - 60, h - 60);
    x.strokeStyle = '#e2501f'; x.lineWidth = 9; x.strokeRect(w * 0.33, 205, w * 0.34, 108);
    x.fillStyle = '#141414'; x.font = 'italic 900 34px Impact, "Arial Black", sans-serif'; x.textAlign = 'center'; x.fillText('SLAM JAM', w / 2, 84);
  });
}

// a white nylon net laid flat: cords run up from twelve hooks on the rim (the bottom of the canvas) and cross into four rows of diamonds
export function netTexture() {
  return canvas(512, 256, (x, w, h) => {
    x.strokeStyle = '#f4f2ec'; x.lineWidth = 6; x.lineCap = 'round';
    for (let k = 0; k < 12; k++) for (const s of [-1, 1]) for (const o of [-w, 0, w]) {
      const x0 = (k + 0.5) * w / 12 + o; x.beginPath(); x.moveTo(x0, h); x.lineTo(x0 + s * w / 6, 0); x.stroke();
    }
  });
}

// the lit display of the stereo, added over the dark glass in the photo: the disc, the track, the time, and the spectrum bars
export function vfd() {
  return canvas(300, 86, (x, w) => {
    x.fillStyle = '#000'; x.fillRect(0, 0, w, 86);
    x.fillStyle = '#5ff2d8'; x.font = '700 22px "Courier New", monospace'; x.fillText('CD 2  TR 04  3:17', 14, 32);
    x.font = '700 9px Arial, sans-serif'; x.fillText('3 DISC     ROCK     T-BASS', 16, 48);
    for (let k = 0; k < 16; k++) { const b = 3 + Math.random() * 20; x.fillRect(150 + k * 9, 80 - b, 6, b); }
  });
}

export function magazineSpread() {
  return canvas(512, 340, (x, w, h) => {
    x.fillStyle = '#f3efe4'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#3c4a5a'; x.fillRect(20, 24, 220, 150);
    x.fillStyle = '#9aa1a8'; for (let c = 0; c < 2; c++) for (let r = 0; r < 14; r++) x.fillRect(272 + c * 118, 26 + r * 11, 104 - (r % 5 === 4 ? 40 : 0), 4);
    for (let r = 0; r < 12; r++) x.fillRect(20, 190 + r * 11, 220 - (r % 4 === 3 ? 60 : 0), 4);
    x.fillStyle = 'rgba(0,0,0,.18)'; x.fillRect(w / 2 - 3, 0, 6, h);   // the gutter
  });
}
// a page of wide-ruled notebook paper with homework on it, half done
export function homeworkPage(seed) {
  return canvas(256, 330, (x, w, h) => {
    x.fillStyle = '#fbfaf4'; x.fillRect(0, 0, w, h);
    x.strokeStyle = '#9cc0e6'; x.lineWidth = 1; for (let y = 40; y < h; y += 16) { x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); }
    x.strokeStyle = '#e8a0a0'; x.beginPath(); x.moveTo(34, 0); x.lineTo(34, h); x.stroke();
    x.strokeStyle = '#2b3a8a'; x.lineWidth = 1.4;
    for (let r = 0; r < 9 + seed % 5; r++) {   // pencil-ish scrawl
      x.beginPath(); let px = 40; const y = 52 + r * 16;
      while (px < w - 30 - (r % 3) * 30) { x.moveTo(px, y); x.quadraticCurveTo(px + 4, y - 6 - Math.random() * 3, px + 9 + Math.random() * 8, y - 1); px += 14 + Math.random() * 10; }
      x.stroke();
    }
  });
}
// grease that soaked through the lid of a pizza box, laid over the printing
export function grease() {
  return canvas(256, 256, x => {
    for (const [cx, cy, rx, ry, a] of [[170, 180, 46, 34, 0.35], [92, 214, 22, 16, 0.25], [206, 96, 14, 11, 0.2]]) {
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, rx);
      g.addColorStop(0, `rgba(110,60,15,${a})`); g.addColorStop(0.8, `rgba(110,60,15,${a * 0.7})`); g.addColorStop(1, 'rgba(110,60,15,0)');
      x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy, rx, ry, 0.4, 0, 7); x.fill();
    }
  });
}

export function cigarLabel() {
  return canvas(256, 160, (x, w, h) => {
    x.fillStyle = '#7a1e18'; x.fillRect(0, 0, w, h);
    x.strokeStyle = '#d8b25a'; x.lineWidth = 6; x.strokeRect(8, 8, w - 16, h - 16);
    x.fillStyle = '#e9cf8a'; x.beginPath(); x.ellipse(w / 2, h / 2, 86, 46, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#7a1e18'; x.font = 'italic 700 26px Georgia, serif'; x.textAlign = 'center'; x.fillText('El Capitán', w / 2, h / 2 + 2);
    x.font = '700 11px Georgia, serif'; x.fillText('HABANA · 50 CIGARS', w / 2, h / 2 + 22);
  });
}

export function plaidTexture() {
  return canvas(256, 256, (x, w, h) => {
    x.fillStyle = '#1f3d6b'; x.fillRect(0, 0, w, h);
    const band = (c, a, pos, size, vertical) => { x.fillStyle = c; x.globalAlpha = a; vertical ? x.fillRect(pos, 0, size, h) : x.fillRect(0, pos, w, size); x.globalAlpha = 1; };
    for (const v of [false, true]) { band('#1b5e3a', 0.6, 40, 70, v); band('#b0292a', 0.65, 150, 18, v); band('#e9d9a0', 0.5, 196, 6, v); band('#0b1530', 0.5, 0, 24, v); }
    const t = x.getImageData(0, 0, w, h);
    for (let i = 0; i < t.data.length; i += 4) { const n = (Math.random() - 0.5) * 18; t.data[i] += n; t.data[i + 1] += n; t.data[i + 2] += n; }   // flannel fuzz
    x.putImageData(t, 0, 0);
  });
}

// a strip of spine colours for CD cases and books: one column per item
export function spineColors(n, palette) {
  return Array.from({ length: n }, () => new THREE.Color(palette[Math.floor(Math.random() * palette.length)]).offsetHSL(rnd(-0.03, 0.03), rnd(-0.1, 0.1), rnd(-0.08, 0.08)));
}

// book spines for the shelf, one 32 x 256 cell per book in a 64 x 8 grid, top to bottom.
// In each cell, columns 0-1 are the plain cover and columns 30-31 are the page edges: bookGeometry in props.js reads them there.
// A book with a title gets it on its spine; the rest show at most a surname, the way most spines read from across a room.
const TEXTBOOKS = ['BIOLOGY', 'ALGEBRA II', 'EARTH SCIENCE', 'U.S. HISTORY', 'CHEMISTRY', 'GLOBAL STUDIES', 'GEOMETRY', 'HTML 3.2 REFERENCE', 'QBASIC FOR BEGINNERS', 'SPANISH 2', 'PHYSICS', 'HEALTH', 'ENGLISH 10'];
const SURNAMES = ['HOLLIS', 'MARSH', 'KEMP', 'ADLER', 'VANCE', 'DOYLE', 'REYES', 'CARVER', 'FINCH'];
const BASES = {
  hard: ['#6e1f1a', '#1d3557', '#2f4f3a', '#3b2a4a', '#5a3a1e', '#1c1c1c', '#7a6a4a', '#8b2c2c', '#24475e'],
  paper: ['#e9e2cf', '#b8322a', '#f0c23b', '#22313f', '#e0702a', '#f4f1ea', '#1f7a6a', '#6a3d8f', '#141414', '#c9d6df'],
  text: ['#f4f1ea', '#2a63c9', '#c4312b', '#2d9a4a', '#f0c23b', '#1c1c1c'],
  comp: ['#161616'],
};
export function bookSpines(books) {
  const pick = a => a[Math.floor(Math.random() * a.length)], textbooks = [...TEXTBOOKS].sort(() => Math.random() - 0.5);
  return canvas(2048, 2048, x => books.forEach(({ kind, title, author, base = pick(BASES[kind]), ink }, i) => {
    x.save(); x.translate((i % 64) * 32, Math.floor(i / 64) * 256);
    const [r, g, b] = [1, 3, 5].map(k => parseInt(base.slice(k, k + 2), 16)), light = r * 0.3 + g * 0.59 + b * 0.11 > 150;
    ink ??= light ? pick(['#1a1a1a', '#b8322a', '#22313f']) : pick(['#e9dfc4', '#d8b45a', '#f4f1ea']);
    x.fillStyle = base; x.fillRect(0, 0, 30, 256);
    for (let k = 0; k < 400; k++) { x.fillStyle = Math.random() < 0.5 ? 'rgba(0,0,0,.07)' : 'rgba(255,255,255,.06)'; x.fillRect(Math.random() * 30, Math.random() * 256, 1, 1 + Math.random() * 4); }   // cloth, scuffs
    const say = (text, font, y, max) => {   // set along the spine, read with your head tipped right
      x.save(); x.translate(16, y); x.rotate(Math.PI / 2); x.font = font; x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle';
      const w = x.measureText(text).width; if (w > max) x.scale(max / w, 1);
      x.fillText(text, 0, 0); x.restore();
    };
    const surname = !title && Math.random() < 0.2 ? pick(SURNAMES) : author;
    if (kind === 'hard') {
      x.fillStyle = ink; if (Math.random() < 0.6) for (const y of [12, 17, 237, 242]) x.fillRect(3, y, 26, 2);
      if (title) say(title, '600 15px Georgia, serif', 112, 150);
      if (surname) say(surname, '11px Georgia, serif', 206, 50);
    } else if (kind === 'paper') {
      if (surname) say(surname, '700 11px Arial, sans-serif', 30, 44);
      if (title) say(title, '800 15px "Arial Narrow", Arial, sans-serif', 128, 150);
      x.fillStyle = ink; x.fillRect(12, 232, 9, 9);   // the publisher's mark
      for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(255,255,255,.3)'; x.fillRect(4 + Math.random() * 24, 20 + Math.random() * 190, 1, 10 + Math.random() * 40); }   // read until the spine cracked
    } else if (kind === 'text') {
      x.fillStyle = pick(BASES.text.filter(c => c !== base)); x.fillRect(2, 0, 28, 60);
      if (textbooks.length) say(textbooks.pop(), '900 15px Arial, sans-serif', 150, 170);
    }
    x.fillStyle = kind === 'comp' ? '#f4f1ea' : pick(['#efe8d6', '#e8dcc0', '#f5f2ea', '#d9c9a0']); x.fillRect(30, 0, 2, 256);
    x.restore();
  }));
}

// the spine of a jewel case, white so each case's colour tints it: dark hinge tabs at the ends, and lines of tiny print
export function cdSpine() {
  return canvas(256, 32, (x, w, h) => {
    x.fillStyle = '#f4f4f4'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#8a8a8a'; x.fillRect(0, 0, 12, h); x.fillRect(w - 12, 0, 12, h);
    x.fillStyle = '#2a2a2a';
    for (const [a, b] of [[22, 110], [126, 212]]) for (let px = a; px < b;) { const k = rnd(3, 7); if (Math.random() > 0.15) x.fillRect(px, 12, k, 8); px += k + 1.5; }
    x.fillRect(222, 11, 11, 10);
  });
}

// the front bezel of a beige mini-tower, 1997, 1 px = 0.74 mm: a CD-ROM drive, two blank bays, a floppy drive, power and reset, two lights, a badge, vents
export function pcBezel() {
  return canvas(256, 580, (x, w) => {
    x.fillStyle = '#d6cdb4'; x.fillRect(0, 0, w, 580);
    const bay = (y, hh, face) => { x.fillStyle = '#a39b84'; x.fillRect(16, y - 2, w - 32, hh + 4); x.fillStyle = face; x.fillRect(18, y, w - 36, hh); };
    bay(34, 58, '#ddd6c0'); x.fillStyle = '#c4bba2'; x.fillRect(30, 50, w - 60, 16);
    x.fillStyle = '#3a3a3a'; x.fillRect(190, 74, 24, 8); x.beginPath(); x.arc(40, 78, 4, 0, 7); x.fill(); x.fillRect(56, 72, 3, 12);   // eject, headphones, volume
    bay(100, 58, '#d2cab2'); bay(166, 58, '#d2cab2');
    bay(236, 34, '#ddd6c0'); x.fillStyle = '#1e1e1e'; x.fillRect(60, 248, 136, 6); x.fillStyle = '#8a836f'; x.fillRect(178, 260, 22, 6);
    x.fillStyle = '#b5ad95'; x.fillRect(118, 368, 20, 12);   // reset
    x.fillStyle = '#6b6555'; x.font = '9px Arial, sans-serif'; x.textAlign = 'center'; x.fillText('POWER', 96, 420); x.fillText('HDD', 160, 420);
    x.fillStyle = '#c9ccd0'; x.fillRect(78, 432, 100, 20); x.fillStyle = '#2a2a2a'; x.font = '700 12px Arial, sans-serif'; x.fillText('200 MHz', 128, 447);
    x.fillStyle = '#9e967f'; for (let k = 0; k < 9; k++) x.fillRect(40, 482 + k * 10, w - 80, 4);
  });
}

// the bare side of a CD: silver with a faint rainbow where the light catches the tracks, and the clear hub
export function cdShine() {
  return canvas(256, 256, (x, w) => {
    const g = x.createConicGradient(0, w / 2, w / 2);
    ['#d9dde2', '#f2d7e6', '#d7e4f4', '#e2f2da', '#f4ecd2', '#d9dde2', '#cfd4da', '#e9d6f0', '#d3eef0', '#d9dde2'].forEach((c, k, a) => g.addColorStop(k / (a.length - 1), c));
    x.fillStyle = g; x.fillRect(0, 0, w, w);
    x.fillStyle = '#c4cad0'; x.beginPath(); x.arc(w / 2, w / 2, 37, 0, 7); x.fill();
  });
}

// a strip of masking tape with a name in marker, torn off the roll at both ends
export function maskingTape(text) {
  return canvas(300, 80, (x, w, h) => {
    x.fillStyle = '#e4d6a2'; x.beginPath(); x.moveTo(8, 10);
    for (let y = 10; y < h - 10; y += 5) x.lineTo(4 + Math.random() * 7, y);
    x.lineTo(w - 8, h - 10);
    for (let y = h - 10; y > 10; y -= 5) x.lineTo(w - 11 + Math.random() * 7, y);
    x.closePath(); x.fill();
    for (let k = 0; k < 300; k++) { x.fillStyle = `rgba(120,95,50,${Math.random() * 0.15})`; x.fillRect(10 + Math.random() * (w - 20), 10 + Math.random() * (h - 20), 2, 2); }
    x.fillStyle = '#16161a'; x.font = 'bold 40px "Marker Felt", "Comic Sans MS", cursive'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(text, w / 2, h / 2 + 2);
  });
}

// a one-dollar bill, Series 1995, drawn rather than photographed: green-grey paper, the border and the corner ones, the portrait in its oval,
// the black and green seals, green serial numbers, and the crease where it was folded into a wallet
export function dollarBill() {
  return canvas(512, 218, (x, w, h) => {
    x.fillStyle = '#bccaa8'; x.fillRect(0, 0, w, h);
    x.strokeStyle = 'rgba(50,75,50,0.22)'; x.lineWidth = 0.7;   // the fine engraved line work behind everything
    for (let k = -h; k < w; k += 4) { x.beginPath(); x.moveTo(k, 0); x.bezierCurveTo(k + 40, h * 0.3, k - 20, h * 0.7, k + 30, h); x.stroke(); }
    for (let k = 0; k < 2500; k++) { x.fillStyle = `rgba(${Math.random() < 0.5 ? '40,60,40' : '255,255,245'},${Math.random() * 0.08})`; x.fillRect(Math.random() * w, Math.random() * h, 1, 1 + Math.random() * 3); }
    const ink = '#26301f';
    x.fillStyle = 'rgba(70,110,70,0.18)'; x.font = '900 70px Georgia, serif'; x.textAlign = 'center'; x.fillText('ONE', w - 140, 150);
    x.strokeStyle = ink; x.lineWidth = 3; x.strokeRect(10, 10, w - 20, h - 20); x.lineWidth = 1; x.strokeRect(16, 16, w - 32, h - 32);
    x.fillStyle = ink; x.textAlign = 'center';
    x.font = '700 9px Georgia, serif'; x.fillText('FEDERAL RESERVE NOTE', w / 2, 30);
    x.font = '700 20px Georgia, serif'; x.fillText('THE UNITED STATES OF AMERICA', w / 2, 52);
    x.font = '800 17px Georgia, serif'; x.fillText('ONE DOLLAR', w / 2, h - 24);
    for (const [cx, cy] of [[36, 46], [w - 36, 46], [36, h - 40], [w - 36, h - 40]]) { x.beginPath(); x.arc(cx, cy, 17, 0, 7); x.stroke(); x.font = '700 26px Georgia, serif'; x.fillText('1', cx, cy + 9); }
    x.save(); x.beginPath(); x.ellipse(w / 2, 118, 42, 54, 0, 0, 7); x.fillStyle = '#5b6655'; x.fill(); x.clip();   // the portrait
    x.fillStyle = '#9aa18f'; x.beginPath(); x.ellipse(w / 2, 104, 20, 27, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(w / 2, 168, 38, 30, 0, 0, 7); x.fill(); x.restore();
    x.beginPath(); x.arc(150, 118, 22, 0, 7); x.fillStyle = '#2b2b2b'; x.fill(); x.fillStyle = '#dcdfcd'; x.font = '700 18px Georgia, serif'; x.fillText('B', 150, 125);
    x.strokeStyle = '#2f7a50'; x.lineWidth = 3; x.beginPath(); x.arc(w - 150, 124, 20, 0, 7); x.stroke();
    x.fillStyle = '#2f7a50'; x.font = '700 14px "Courier New", monospace'; x.fillText('B 37150264 C', 150, 166); x.fillText('B 37150264 C', w - 140, 84);
    x.fillStyle = ink; x.font = '9px Georgia, serif'; x.fillText('SERIES 1995', w - 130, 168);
    const crease = x.createLinearGradient(w / 2 - 6, 0, w / 2 + 6, 0);
    crease.addColorStop(0, 'rgba(0,0,0,0)'); crease.addColorStop(0.5, 'rgba(255,255,250,0.35)'); crease.addColorStop(0.55, 'rgba(0,0,0,0.18)'); crease.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = crease; x.fillRect(w / 2 - 6, 0, 12, h);
  });
}

// the engraved plate on a trophy base
export function trophyPlate() {
  return canvas(256, 80, (x, w, h) => {
    x.fillStyle = '#d9b04a'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#2a2214'; x.font = '700 14px Arial, sans-serif'; x.textAlign = 'center';
    x.fillText('HORSEHEADS YOUTH SOCCER', w / 2, 34); x.fillText('1997', w / 2, 58);
  });
}

// the top of a critter keeper lid: green plastic with rows of vent slots
export function ventLid() {
  return canvas(256, 160, (x, w, h) => {
    x.fillStyle = '#3fa34d'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#173f20';
    for (let c = 0; c < 2; c++) for (let r = 0; r < 9; r++) x.fillRect(110 + c * 70, 22 + r * 13, 56, 5);
  });
}

// a fine stipple stucco as a tiling normal map: many small overlapping domes, flattened on top like knockdown
export function stuccoNormal() {
  const size = 512, h = new Float32Array(size * size), wrap = v => (v + size) % size;
  for (let i = 0; i < 9000; i++) {
    const cx = Math.random() * size, cy = Math.random() * size, r = 1.5 + Math.random() ** 2 * 4, a = 0.3 + Math.random() * 0.4;
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
      const d = ((x - cx) ** 2 + (y - cy) ** 2) / (r * r);
      if (d < 1) h[wrap(y) * size + wrap(x)] += a * (1 - d) ** 2;
    }
  }
  const c = Object.assign(document.createElement('canvas'), { width: size, height: size }), ctx = c.getContext('2d'), img = ctx.createImageData(size, size);
  const H = (x, y) => Math.tanh(1.6 * h[wrap(y) * size + wrap(x)]);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const nx = -(H(x + 1, y) - H(x - 1, y)), ny = H(x, y + 1) - H(x, y - 1), k = 1 / Math.hypot(nx, ny, 1), i = 4 * (y * size + x);   // canvas rows run down, the texture v runs up
    img.data[i] = 255 * (0.5 + 0.5 * nx * k); img.data[i + 1] = 255 * (0.5 + 0.5 * ny * k); img.data[i + 2] = 255 * (0.5 + 0.5 * k); img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
  return t;
}
