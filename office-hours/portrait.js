(() => {
  const canvas = document.querySelector("canvas[data-portrait]");
  const data = window.PORTRAIT;
  if (!canvas || !data || !canvas.getContext) return;

  const GLYPHS = "0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ<>/=+*:".split("");
  const pick = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
  const { cols, rows, d } = data;
  const ctx = canvas.getContext("2d");
  const glyph = Array.from({ length: cols * rows }, pick);
  const drop = new Array(cols).fill(0);
  const speed = Array.from({ length: cols }, () => 0.55 + Math.random() * 0.5);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const darkMode = matchMedia("(prefers-color-scheme: dark)");
  const still = reduced.matches || location.hash === "#still";
  let cw, ch, frame, timer;

  function size() {
    const r = canvas.getBoundingClientRect();
    const dpr = devicePixelRatio || 1;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cw = r.width / cols;
    ch = r.height / rows;
    ctx.font = `500 ${ch * 0.92}px "JetBrains Mono", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  }

  function draw(settled) {
    const style = getComputedStyle(document.documentElement);
    const ink = style.getPropertyValue("--ink").trim();
    const accent = style.getPropertyValue("--accent").trim();
    const dark = darkMode.matches;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ink;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const c = d[y * cols + x];
        const head = !settled && y > drop[x] - 1.2 && y <= drop[x];
        if (!settled && y > drop[x]) continue;
        if (c === "-" && !head) continue;
        const px = x * cw + cw / 2, py = y * ch + ch / 2;
        if (head) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = accent;
          ctx.fillText(pick(), px, py);
          ctx.fillStyle = ink;
          continue;
        }
        const v = +c / 9;
        ctx.globalAlpha = dark ? 0.1 + 0.9 * Math.pow(1 - v, 1.1) : 0.16 + 0.84 * Math.pow(v, 0.7);
        ctx.fillText(glyph[y * cols + x], px, py);
      }
    }
    ctx.globalAlpha = 1;
  }

  function shimmer() {
    clearInterval(timer);
    if (still) return;
    timer = setInterval(() => {
      for (let k = 0; k < 3; k++) {
        const i = (Math.random() * glyph.length) | 0;
        if (d[i] !== "-") glyph[i] = pick();
      }
      draw(true);
    }, 180);
  }

  function rain() {
    let done = true;
    for (let x = 0; x < cols; x++) {
      drop[x] += speed[x];
      if (drop[x] < rows + 2) done = false;
    }
    draw(false);
    if (done) {
      draw(true);
      shimmer();
    } else {
      frame = requestAnimationFrame(rain);
    }
  }

  document.fonts.ready.then(() => {
    size();
    canvas.closest(".portrait").classList.add("live");
    if (still) {
      draw(true);
      return;
    }
    for (let x = 0; x < cols; x++) drop[x] = -Math.random() * rows * 0.9;
    rain();
  });

  addEventListener("resize", () => { size(); draw(true); });
  darkMode.addEventListener("change", () => draw(true));
})();
