// Winamp 2 in its classic skin, playing a YouTube video in its video window, on one side of the view.
// The buttons, the volume, and the seek bar drive the YouTube player. The spectrum is drawn, not measured: a YouTube frame keeps its
// sound to itself. In its own shadow root, so nothing here styles the rest of the page.
let api;   // YouTube's player API, loaded once for every Winamp
const youtube = () => api ||= new Promise(done => {
  window.onYouTubeIframeAPIReady = done;
  document.head.append(Object.assign(document.createElement('script'), { src: 'https://www.youtube.com/iframe_api' }));
});

// the big green clock digits, segment by segment
const SEG = { a: [1, 0, 7, 1], b: [8, 1, 1, 5], c: [8, 7, 1, 5], d: [1, 12, 7, 1], e: [0, 7, 1, 5], f: [0, 1, 1, 5], g: [1, 6, 7, 1] };
const LIT = ['abcdef', 'bc', 'abged', 'abgcd', 'fgbc', 'afgcd', 'afgedc', 'abc', 'abcdefg', 'abfgcd'];
const digit = n => `<svg viewBox="0 0 9 13">${[...LIT[n]].map(s => `<rect x="${SEG[s][0]}" y="${SEG[s][1]}" width="${SEG[s][2]}" height="${SEG[s][3]}"/>`).join('')}</svg>`;
const clock = s => { const m = Math.floor(s / 60), r = Math.floor(s % 60); return `${digit(Math.floor(m / 10) % 10)}${digit(m % 10)}<i></i>${digit(Math.floor(r / 10))}${digit(r % 10)}`; };
const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const ICON = {
  prev: '<rect x="0" y="0" width="1.6" height="7"/><path d="M8 0v7L2 3.5z"/>', play: '<path d="M1 0v7l6-3.5z"/>', pause: '<rect x="1" y="0" width="2" height="7"/><rect x="5" y="0" width="2" height="7"/>',
  stop: '<rect x="1" y="0.5" width="6" height="6"/>', next: '<path d="M0 0v7l6-3.5z"/><rect x="6.4" y="0" width="1.6" height="7"/>', eject: '<path d="M4 0l4 4H0z"/><rect x="0" y="5" width="8" height="2"/>',
};
const CSS = `
  [hidden] { display: none !important; }
  .stack { position: fixed; top: 0; bottom: 0; z-index: 3; display: flex; align-items: center; pointer-events: none; font: 8px/1 Arial, sans-serif; user-select: none; }
  .zoom { pointer-events: auto; }
  .win { position: relative; width: 275px; background: #2d2d3f linear-gradient(90deg, rgba(255,255,255,.03) 50%, transparent 50%) 0 0 / 2px 2px; box-shadow: inset 1px 1px #5b5b75, inset -1px -1px #101018, 0 0 0 1px #000; }
  .bar { display: flex; align-items: center; gap: 4px; height: 14px; padding: 0 3px 0 6px; background: #1c1c2a; }
  .bar i { flex: 1; height: 5px; background: repeating-linear-gradient(#e6c35c 0 1px, transparent 1px 2px); }
  .bar b { color: #e6c35c; font: italic bold 8px/1 Arial, sans-serif; letter-spacing: 1px; }
  .bar button { width: 9px; height: 9px; padding: 0; border: 0; background: #b9b9c8; box-shadow: inset -1px -1px #555, inset 1px 1px #fff; font: bold 7px/9px Arial; color: #000; cursor: pointer; }
  .main { height: 116px; }
  .lcd { position: absolute; left: 9px; top: 20px; width: 93px; height: 42px; background: #000; box-shadow: inset 1px 1px #000, 0 0 0 1px #4a4a60; }
  .state { position: absolute; left: 6px; top: 5px; width: 6px; height: 7px; fill: #00e000; }
  .time { position: absolute; left: 26px; top: 4px; display: flex; gap: 3px; fill: #00e000; }
  .time svg { width: 9px; height: 13px; } .time i { width: 2px; height: 13px; background: linear-gradient(transparent 3px, #00e000 3px 5px, transparent 5px 8px, #00e000 8px 10px, transparent 10px); }
  .spec { position: absolute; left: 6px; bottom: 4px; display: flex; align-items: flex-end; gap: 1px; height: 16px; }
  .spec i { width: 3px; background: linear-gradient(#ff3c00, #f0d000 40%, #00d000 70%) bottom / 3px 16px no-repeat; }
  .marquee { position: absolute; left: 109px; top: 24px; width: 155px; height: 12px; overflow: hidden; background: #000; color: #00e000; font: bold 8px/12px "Courier New", monospace; white-space: nowrap; }
  .marquee span { display: inline-block; padding-left: 4px; animation: scroll 14s linear infinite; }
  @keyframes scroll { to { transform: translateX(-50%); } }
  .info { position: absolute; left: 109px; top: 41px; display: flex; align-items: center; gap: 3px; color: #c8c8d8; font-size: 7px; }
  .info span { padding: 1px 2px; background: #000; color: #00e000; font: bold 8px/1 "Courier New", monospace; }
  .info b { margin-left: 4px; color: #3d6a3d; font-weight: normal; } .info b.on { color: #00e000; }
  input[type=range] { position: absolute; margin: 0; height: 13px; -webkit-appearance: none; appearance: none; background: transparent; cursor: pointer; }
  input[type=range]::-webkit-slider-runnable-track { height: 5px; margin-top: 4px; background: var(--track); box-shadow: inset 1px 1px #000, inset -1px -1px #666; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 11px; margin-top: -3px; background: #c4c4d4; box-shadow: inset -1px -1px #555, inset 1px 1px #fff; }
  .vol { left: 107px; top: 57px; width: 68px; --track: linear-gradient(90deg, #00a000, #e0e000, #e03000); }
  .bal { left: 177px; top: 57px; width: 38px; --track: linear-gradient(90deg, #e03000, #00a000, #e03000); }
  .seek { left: 16px; top: 72px; width: 248px; --track: #1a1a26; }
  .seek::-webkit-slider-thumb { width: 29px !important; }
  .tog { position: absolute; top: 58px; width: 23px; height: 12px; padding: 0; border: 0; background: #1a1a26; color: #3d6a3d; font: bold 7px/12px Arial; box-shadow: inset 1px 1px #000, inset -1px -1px #555; cursor: pointer; }
  .tog.on { color: #00e000; }
  .ctrl { position: absolute; left: 16px; top: 88px; display: flex; }
  .ctrl button { width: 23px; height: 18px; padding: 0; border: 0; background: #c0c0d0; box-shadow: inset -1px -1px #4c4c5c, inset 1px 1px #fff; cursor: pointer; }
  .ctrl button:active { box-shadow: inset 1px 1px #4c4c5c, inset -1px -1px #fff; }
  .ctrl svg { width: 8px; height: 7px; }
  .ctrl .eject { width: 22px; height: 16px; margin-left: 6px; }
  .mode { position: absolute; top: 89px; height: 15px; padding: 0 4px; border: 0; background: #c0c0d0; box-shadow: inset -1px -1px #4c4c5c, inset 1px 1px #fff; font: bold 7px/15px Arial; }
  .bolt { position: absolute; right: 9px; top: 89px; width: 13px; height: 15px; }
  .screen { margin: 0 4px; height: 206px; background: #000; box-shadow: 0 0 0 1px #000; overflow: hidden; }
  .foot { height: 12px; }
`;

export function winamp({ video, title, side = 'left', onClose }) {
  const host = document.createElement('div'); document.body.append(host);
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>${CSS}</style><div class="stack" hidden><div class="zoom">
    <div class="win main">
      <div class="bar"><i></i><b>WINAMP</b><i></i><button title="Close">x</button></div>
      <div class="lcd"><svg class="state" viewBox="0 0 8 7">${ICON.stop}</svg><div class="time">${clock(0)}</div><div class="spec">${'<i></i>'.repeat(19)}</div></div>
      <div class="marquee"><span></span></div>
      <div class="info"><span>128</span>kbps<span>44</span>kHz<b>mono</b><b class="on">stereo</b></div>
      <input class="vol" type="range" min="0" max="100" value="80"><input class="bal" type="range" min="-100" max="100" value="0">
      <button class="tog" style="left:219px">EQ</button><button class="tog on" style="left:242px">PL</button>
      <input class="seek" type="range" min="0" max="1000" value="0">
      <div class="ctrl">${['prev', 'play', 'pause', 'stop', 'next'].map(k => `<button data-do="${k}"><svg viewBox="0 0 8 7">${ICON[k]}</svg></button>`).join('')}<button class="eject" data-do="eject"><svg viewBox="0 0 8 7">${ICON.eject}</svg></button></div>
      <button class="mode" style="left:164px">SHUFFLE</button><button class="mode" style="left:210px">REP</button>
      <svg class="bolt" viewBox="0 0 13 15"><path d="M8 0L1 9h5l-2 6 8-10H7z" fill="#e6c35c" stroke="#000" stroke-width=".6"/></svg>
    </div>
    <div class="win vid"><div class="bar"><i></i><b>WINAMP VIDEO</b><i></i><button title="Close">x</button></div><div class="screen"><div class="slot"></div></div><div class="foot"></div></div>
  </div></div>`;
  const $ = s => root.querySelector(s), stack = $('.stack'), bars = [...root.querySelectorAll('.spec i')], seek = $('.seek'), vol = $('.vol');
  stack.style[side] = '5vw';
  const setTitle = d => { const t = `1. ${title}${d ? ` (${mmss(d)})` : ''}  ***  `; $('.marquee span').textContent = t + t; };
  setTitle();
  let player, ready, scale = 1, dragging = false, frame = 0;

  function load() {   // the YouTube player inside the video window, scaled back down so it plays at full size on the page
    ready = new Promise(done => youtube().then(() => {
      player = new window.YT.Player($('.slot'), {
        videoId: video, width: 267 * scale, height: 206 * scale,
        playerVars: { autoplay: 1, controls: 0, rel: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1, disablekb: 1 },
        events: { onReady: () => { player.setVolume(+vol.value); setTitle(player.getDuration()); done(); }, onError: e => { $('.marquee span').textContent = `YOUTUBE WON'T PLAY THIS HERE (ERROR ${e.data})  ***  `.repeat(2); } },
      });
      player.getIframe().style.zoom = 1 / scale;
    }));
  }
  const act = { prev: () => player.seekTo(0, true), play: () => player.playVideo(), pause: () => player.pauseVideo(), stop: () => { player.pauseVideo(); player.seekTo(0, true); }, next: () => player.seekTo(player.getDuration() - 1, true), eject: onClose };
  for (const b of root.querySelectorAll('[data-do]')) b.onclick = () => ready?.then(act[b.dataset.do]);
  for (const b of root.querySelectorAll('.bar button')) b.onclick = onClose;
  vol.oninput = () => player?.setVolume(+vol.value);
  seek.onpointerdown = () => { dragging = true; };
  seek.onchange = () => { dragging = false; player?.seekTo(seek.value / 1000 * player.getDuration(), true); };

  function draw() {   // the clock, the seek bar, the play state, and a spectrum that jumps while it plays
    frame = requestAnimationFrame(draw);
    if (!player?.getCurrentTime) return;
    const t = player.getCurrentTime(), d = player.getDuration() || 1, playing = player.getPlayerState() === 1;
    $('.time').innerHTML = clock(t);
    if (!dragging) seek.value = t / d * 1000;
    $('.state').innerHTML = playing ? ICON.play : player.getPlayerState() === 2 ? ICON.pause : ICON.stop;
    bars.forEach((b, i) => { const h = playing ? Math.max(1, Math.min(16, (parseFloat(b.style.height) || 1) * 0.7 + Math.random() * (17 - i * 0.5) * 0.5)) : 1; b.style.height = `${h}px`; });
  }

  return {
    show() {
      const narrow = innerWidth < 700 || innerHeight < 500;   // a phone: Winamp in the middle, as big as fits
      scale = narrow ? Math.min((innerWidth - 16) / 275, (innerHeight - 40) / 352) : Math.max(1, Math.min(2, (innerHeight - 40) / 352, innerWidth * 0.5 / 275));
      stack.style.left = stack.style.right = narrow ? '0' : ''; if (!narrow) stack.style[side] = '5vw'; stack.style.justifyContent = narrow ? 'center' : '';
      $('.zoom').style.zoom = scale; stack.hidden = false;
      if (!ready) load(); else ready.then(() => player.playVideo());
      draw();
    },
    hide() { stack.hidden = true; cancelAnimationFrame(frame); ready?.then(() => player.pauseVideo()); },
  };
}
