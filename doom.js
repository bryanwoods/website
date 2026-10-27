// DOOM: id Software's 1993 shareware episode (v1.9, "PLEASE DISTRIBUTE!!!"), running as the DOS program it was, in js-dos (DOSBox in
// WebAssembly). assets/doom/doom.zip holds DOOM.EXE and DOOM1.WAD, as they unpack from the official doom19s.zip. Nothing loads until the
// window opens. Hosting id's files needs a licence check before the room is promoted.
const JSDOS = 'https://unpkg.com/js-dos@6.22.60/dist';   // not jsdelivr: js-dos finds its wasm by replacing the first ".js" in this URL
let loading;
const MAC = /Mac/.test(navigator.platform);   // there Ctrl and an arrow switch Spaces, so Z fires
const CFG = Object.entries({   // DOOM's settings file: a Sound Blaster where DOSBox puts one, no mouse, and keys are scancodes
  use_mouse: 0, key_fire: MAC ? 44 : 29, snd_channels: 8, snd_musicdevice: 3, snd_sfxdevice: 3, snd_sbport: 0x220, snd_sbirq: 7, snd_sbdma: 1, snd_mport: 0x330,
}).map(([k, v]) => `${k}\t\t${v}\r\n`).join('');
const jsdos = () => (loading ??= new Promise((ok, fail) => document.head.append(Object.assign(document.createElement('script'), { src: `${JSDOS}/js-dos.js`, onload: ok, onerror: fail }))));

export function doom(open, icon) {
  const w = open('DOOM', 'doom', 76, 20, `<div class="window-body"><div class="crt"><canvas tabindex="0"></canvas><p>Loading DOOM...</p></div></div>
    <div class="status-bar">${['Arrows move', `${MAC ? 'Z' : 'Ctrl'} fires`, 'Space opens', 'Esc menu'].map(s => `<p class="status-bar-field">${s}</p>`).join('')}</div>`, icon);
  const cv = w.querySelector('canvas'), note = w.querySelector('.crt p');
  let ci;
  cv.addEventListener('keydown', e => e.stopPropagation());   // Esc is DOOM's menu here, not the way back to the room
  cv.addEventListener('pointerdown', () => cv.focus());
  w.onclose = () => ci?.exit();
  jsdos()
    .then(() => window.Dos(cv, {
      wdosboxUrl: `${JSDOS}/wdosbox.js`, keyboardListeningElement: cv,
      onprogress: (stage, total, loaded) => { note.textContent = `Loading DOOM... ${total ? Math.round(loaded / total * 100) : 0}%`; },   // also keeps js-dos's own loader off the page
    }))
    .then(({ fs, main }) => fs.extract('assets/doom/doom.zip').then(() => { fs.createFile('DEFAULT.CFG', CFG); return main(['-c', 'DOOM.EXE']); }))
    .then(c => { ci = c; if (!w.isConnected) return c.exit(); note.hidden = true; cv.focus(); })
    .catch(e => { note.textContent = `DOOM couldn't start. ${e?.message ?? e ?? ''}`; });
  return w;
}
