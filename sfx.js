// The computer's sounds, synthesized: a 56k modem dialing out and shaking hands, a buddy's door opening and closing, an IM coming in
// and going out. Close to how AOL and a dial-up line sounded, not copies of their recordings.
function tone(ac, out, f, t0, dur, { type = 'sine', gain = 0.2, to } = {}) {
  const o = new OscillatorNode(ac, { type, frequency: f }), g = new GainNode(ac, { gain: 0 });
  if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(gain, t0 + 0.006); g.gain.setValueAtTime(gain, t0 + dur - 0.012); g.gain.linearRampToValueAtTime(0, t0 + dur);
  o.connect(g).connect(out); o.start(t0); o.stop(t0 + dur + 0.02);
}
function hiss(ac, out, t0, dur, { freq = 1800, q = 0.7, gain = 0.15, wobble = 0 } = {}) {
  const b = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - wobble * (0.5 + 0.5 * Math.sin(i / ac.sampleRate * 2 * Math.PI * 4)));
  const s = new AudioBufferSourceNode(ac, { buffer: b }), g = new GainNode(ac, { gain });
  s.connect(new BiquadFilterNode(ac, { type: 'bandpass', frequency: freq, Q: q })).connect(g).connect(out); s.start(t0);
}
function ring(ac, out, f, t0, dur, gain) {   // a struck metal partial, dying away
  const o = new OscillatorNode(ac, { frequency: f }), g = new GainNode(ac, { gain });
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur); o.connect(g).connect(out); o.start(t0); o.stop(t0 + dur);
}
function creak(ac, out, t0, dur, from, to, gain) {   // a door hinge: a slow buzz of tiny clicks, rung through the wood
  const o = new OscillatorNode(ac, { type: 'sawtooth', frequency: from }), g = new GainNode(ac, { gain: 0 });
  o.frequency.linearRampToValueAtTime((from + to) * 0.65, t0 + dur * 0.5); o.frequency.linearRampToValueAtTime(to, t0 + dur);
  g.gain.linearRampToValueAtTime(gain, t0 + dur * 0.2); g.gain.linearRampToValueAtTime(gain * 0.7, t0 + dur * 0.8); g.gain.linearRampToValueAtTime(0, t0 + dur);
  o.connect(new BiquadFilterNode(ac, { type: 'bandpass', frequency: 1100, Q: 6 })).connect(g).connect(out); o.start(t0); o.stop(t0 + dur);
}

export const SFX = {
  modem(ac, out) {   // dial tone, seven digits, the answer tone, the warble and the bong, then the hiss of the two modems training
    const line = new BiquadFilterNode(ac, { type: 'lowpass', frequency: 3400 }), t = ac.currentTime + 0.05; line.connect(out);
    tone(ac, line, 350, t, 0.9, { gain: 0.07 }); tone(ac, line, 440, t, 0.9, { gain: 0.07 });
    const ROW = [697, 770, 852, 941], COL = [1209, 1336, 1477], KEY = { 1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2], 7: [2, 0], 8: [2, 1], 9: [2, 2], 0: [3, 1] };
    [...'7390842'].forEach((k, i) => { const s = t + 1.05 + i * 0.16; tone(ac, line, ROW[KEY[k][0]], s, 0.09, { gain: 0.08 }); tone(ac, line, COL[KEY[k][1]], s, 0.09, { gain: 0.08 }); });
    for (let k = 0; k < 4; k++) tone(ac, line, 2100, t + 2.8 + k * 0.45, 0.43, { gain: 0.09 });
    for (let k = 0; k < 12; k++) tone(ac, line, k % 2 ? 1180 : 980, t + 4.6 + k * 0.03, 0.03, { gain: 0.08 });
    tone(ac, line, 1200, t + 5.05, 0.5, { gain: 0.07 }); tone(ac, line, 2400, t + 5.05, 0.5, { gain: 0.04 });
    hiss(ac, line, t + 5.6, 2.2, { freq: 1800, q: 0.6, gain: 0.5, wobble: 0.6 });
    for (let k = 0; k < 6; k++) tone(ac, line, 1650 + (k % 2) * 200, t + 7.2 + k * 0.05, 0.05, { gain: 0.05 });
  },
  open(ac, out) { creak(ac, out, ac.currentTime, 0.75, 34, 52, 0.8); },
  close(ac, out) {
    const t = ac.currentTime; creak(ac, out, t, 0.3, 50, 36, 0.6);
    tone(ac, out, 75, t + 0.28, 0.22, { gain: 0.35, to: 45 }); hiss(ac, out, t + 0.28, 0.06, { freq: 300, q: 0.5, gain: 0.3 });
  },
  inbound(ac, out) { const t = ac.currentTime; tone(ac, out, 587, t, 0.07, { type: 'triangle', gain: 0.16 }); tone(ac, out, 880, t + 0.08, 0.13, { type: 'triangle', gain: 0.16 }); },
  outbound(ac, out) { tone(ac, out, 500, ac.currentTime, 0.1, { gain: 0.16, to: 1100 }); },
  // the foam basketballs; k is how hard the hit was, 0 to 1
  bounce(ac, out, k = 0.5) { const t = ac.currentTime; tone(ac, out, 150, t, 0.07, { gain: 0.25 * k, to: 80 }); hiss(ac, out, t, 0.03, { freq: 500, q: 0.7, gain: 0.2 * k }); },
  rim(ac, out, k = 0.5) { const t = ac.currentTime; for (const [f, g] of [[1180, 0.06], [1630, 0.05], [2390, 0.035], [3150, 0.02]]) ring(ac, out, f, t, 0.45, g * (0.4 + k)); },
  board(ac, out, k = 0.5) { const t = ac.currentTime; hiss(ac, out, t, 0.05, { freq: 1100, q: 1.2, gain: 0.5 * k }); tone(ac, out, 260, t, 0.05, { gain: 0.2 * k, to: 180 }); },
  swish(ac, out) { hiss(ac, out, ac.currentTime, 0.3, { freq: 3200, q: 0.9, gain: 0.35, wobble: 0.3 }); },
  click(ac, out) { hiss(ac, out, ac.currentTime, 0.02, { freq: 2500, q: 1, gain: 0.6 }); tone(ac, out, 1800, ac.currentTime, 0.015, { gain: 0.12 }); },   // a lamp switch
};
