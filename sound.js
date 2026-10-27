// The afternoon, heard: a neighbour mowing a lawn somewhere down the street, birds, and the computer's whine and fan; after sunset the
// mowing stops and the crickets start. Outside is a field recording (CC0, Freesound; see assets/audio/CREDITS.txt). The rest is synthesized.
export function startSound() {
  const ac = new AudioContext(), out = ac.createGain();
  out.gain.setValueAtTime(0, ac.currentTime); out.gain.linearRampToValueAtTime(0.9, ac.currentTime + 3);
  out.connect(ac.destination);
  const noise = (() => { const b = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; })();
  const loop = buf => { const s = ac.createBufferSource(); s.buffer = buf; s.loop = true; s.start(); return s; };

  // outside comes in through the window screen: a little muffled, from one side of the room
  const yard = new GainNode(ac, { gain: 1.1 }), pan = new StereoPannerNode(ac, { pan: 0.25 });
  yard.connect(new BiquadFilterNode(ac, { type: 'lowpass', frequency: 3600 })).connect(pan).connect(out);
  fetch('assets/audio/yard.mp3').then(r => r.arrayBuffer()).then(b => ac.decodeAudioData(b)).then(buffer => {
    const s = new AudioBufferSourceNode(ac, { buffer, loop: true });
    s.connect(yard); s.start(0, Math.random() * buffer.duration);
  });
  // the wind and the houses between: the mower drifts in and out, slowly
  const t0 = ac.currentTime;
  let day = 1;
  setInterval(() => {
    const t = ac.currentTime - t0, now = ac.currentTime;
    yard.gain.setTargetAtTime(1.1 * day * (0.65 + 0.22 * Math.sin(t * 2 * Math.PI / 47) + 0.13 * Math.sin(t * 2 * Math.PI / 19 + 1)), now, 2);
    pan.pan.setTargetAtTime(0.25 + 0.2 * Math.sin(t * 2 * Math.PI / 61), now, 2);
  }, 500);

  // in the room: the CRT's faint high whine and the PC's fan
  const whine = new OscillatorNode(ac, { frequency: 15734 }); whine.connect(new GainNode(ac, { gain: 0.0015 })).connect(out); whine.start();
  const fan = loop(noise); fan.connect(new BiquadFilterNode(ac, { type: 'bandpass', frequency: 700, Q: 0.4 })).connect(new GainNode(ac, { gain: 0.012 })).connect(out);
  // after sunset: three crickets, one left, one middle, one right, each chirping in threes
  const crickets = new GainNode(ac, { gain: 0 }); crickets.connect(out);
  [-0.8, 0.1, 0.7].forEach((pan, c) => {
    const p = new StereoPannerNode(ac, { pan }); p.connect(crickets);
    setInterval(() => {
      if (crickets.gain.value < 0.01 || Math.random() < 0.25) return;
      const at = ac.currentTime + Math.random() * 0.6;
      for (let k = 0; k < 3; k++) {
        const o = new OscillatorNode(ac, { frequency: 4300 + c * 270 }), g = new GainNode(ac, { gain: 0 }), s = at + k * 0.055;
        g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(0.04, s + 0.008); g.gain.linearRampToValueAtTime(0, s + 0.035);
        o.connect(g).connect(p); o.start(s); o.stop(s + 0.04);
      }
    }, 800 + c * 130);
  });
  return { ac, dusk(k) { day = 1 - 0.9 * Math.min(1, Math.max(0, (k - 0.55) / 0.25)); crickets.gain.setTargetAtTime(Math.min(1, Math.max(0, (k - 0.6) / 0.3)), ac.currentTime, 2); } };   // k: 0 afternoon to 1 night
}
