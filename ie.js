// Internet Explorer 5, open at the site Bryan built in 1999: mrmakaveli.8m.com, "The New And "Untouchable" ODB's PAC SITE". Its pages are
// copies out of the Internet Archive (tools/fetch-mrmakaveli.mjs) with their scripts taken out; the pictures load from the archive, and
// any other address opens the archive's copy nearest 1999. The site's two pop-ups come back as Windows dialogs.
const HOME = 'http://mrmakaveli.8m.com/', WAYBACK = 'https://web.archive.org/web';
const ASK = '<svg viewBox="0 0 32 32"><circle cx="16" cy="14" r="12" fill="#fff" stroke="#000"/><path d="M9 23l-3 7 9-5" fill="#fff" stroke="#000"/><text x="16" y="21" text-anchor="middle" font-family="Times New Roman, serif" font-weight="bold" font-size="20" fill="#1d4fd0">?</text></svg>';
const WARN = '<svg viewBox="0 0 32 32"><path d="M16 3l14 26H2z" fill="#ffd800" stroke="#000"/><path d="M16 11v10" stroke="#000" stroke-width="3"/><circle cx="16" cy="25" r="1.8"/></svg>';
const CANT = `<body style="margin: 24px; font: 11px/1.5 Verdana, sans-serif"><h2 style="font: bold 15px Verdana, sans-serif">The page cannot be displayed</h2>
  <p>The page you are looking for is currently unavailable.</p><hr><p>Click the <b>Back</b> button to try another link.</p><p>Cannot find server or DNS Error<br>Internet Explorer</p></body>`;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.]+/g, mine = e => /@mrmakaveli\.8m\.com$/i.test(e);   // other people's addresses from the guestbook and mailbag stay hidden
let pages;
const copies = () => (pages ??= fetch('assets/mrmakaveli/pages.json').then(r => r.json()));

export function ie(open, icon) {
  const w = open('Microsoft Internet Explorer', 'ie', 18, 8, `<div class="menubar">${['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(m => `<span>${m}</span>`).join('')}<span class="spin">${icon}</span></div>
    <div class="nav">${['Back', 'Forward', 'Stop', 'Refresh', 'Home'].map(b => `<button>${b}</button>`).join('')}</div>
    <div class="address">Address<input spellcheck="false"><button>Go</button></div>
    <div class="view"><iframe sandbox="allow-same-origin"></iframe></div>
    <div class="status-bar"><p class="status-bar-field">Done</p><p class="status-bar-field">Internet</p></div>`, icon);
  const frame = w.querySelector('iframe'), addr = w.querySelector('.address input'), status = w.querySelector('.status-bar-field'), hist = [];
  let pos = -1, here = HOME;
  const title = t => { for (const s of [w.querySelector('.title-bar-text span'), w.task.querySelector('span')]) s.textContent = `${t} - Microsoft Internet Explorer`; };
  const done = t => { title(t); status.textContent = 'Done'; w.classList.remove('busy'); };
  function dialog(text, warn, ok) {   // a pop-up from the page, the way IE showed one
    const d = open('Microsoft Internet Explorer', 'alert', 150, 150, `<div class="window-body"><p>${warn ? WARN : ASK}<span></span></p><div class="ok"><button>OK</button>${ok ? ' <button>Cancel</button>' : ''}</div></div>`, icon);
    d.querySelector('p span').textContent = text;
    const [yes, no] = d.querySelectorAll('.ok button');
    yes.onclick = () => { d.close(); ok?.(); };
    if (no) no.onclick = () => d.close();
  }
  async function show(url) {
    const u = new URL(url, here), page = u.host === 'mrmakaveli.8m.com' ? u.pathname.slice(1) || 'index.html' : null, at = (await copies().catch(() => ({})))[page];
    here = u.href; addr.value = u.href; status.textContent = `Opening page ${u.href}...`; w.classList.add('busy');
    if (at) {   // one of Bryan's pages, from the copy
      const html = new TextDecoder('windows-1252').decode(await fetch(`assets/mrmakaveli/${page}`).then(r => r.arrayBuffer()));
      const doc = new DOMParser().parseFromString(html, 'text/html'), vote = html.match(/confirm\("([^"]+)"\)/)?.[1], guard = /Stealing is Wrong/.test(html);
      doc.querySelectorAll('script, noscript, iframe, img[src*="cgi-bin"]').forEach(n => n.remove());   // its scripts, and the ad servers' banners that are long gone
      for (const n of doc.querySelectorAll('[src], [background]')) for (const a of ['src', 'background']) if (n.hasAttribute(a)) n.setAttribute(a, `${WAYBACK}/${at}im_/${new URL(n.getAttribute(a), u)}`);
      for (const a of doc.querySelectorAll('a[href^="mailto:" i]')) if (!mine(a.getAttribute('href').slice(7))) a.removeAttribute('href');
      const walk = doc.createTreeWalker(doc.body ?? doc.documentElement, NodeFilter.SHOW_TEXT);
      for (let t; (t = walk.nextNode());) t.data = t.data.replace(EMAIL, e => (mine(e) ? e : 'e-mail hidden'));
      frame.onload = () => {
        const d = frame.contentDocument;
        d.addEventListener('click', e => {   // links open here, not in new windows
          const a = e.target.closest('a[href]');
          if (!a) return;
          e.preventDefault();
          if (!/^mailto:/i.test(a.getAttribute('href'))) go(new URL(a.getAttribute('href'), u).href);
        });
        if (guard) d.addEventListener('contextmenu', e => { e.preventDefault(); dialog('Stealing is Wrong...Unless You E-mail Me.', true); });
        done(doc.title.trim() || u.href);
        if (vote) dialog(vote, false, () => go(`${HOME}top40.html`));
      };
      frame.removeAttribute('src'); frame.srcdoc = doc.documentElement.outerHTML;   // no doctype: these pages were drawn in quirks mode
    } else {   // anywhere else: the archive's copy nearest 1999, or IE's error page
      const near = await fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(u.href)}&timestamp=1999`).then(r => r.json()).catch(() => null);
      const snap = near?.archived_snapshots?.closest;
      frame.onload = () => done(snap ? u.host : 'The page cannot be displayed');
      if (snap) { frame.removeAttribute('srcdoc'); frame.src = `${WAYBACK}/${snap.timestamp}if_/${u.href}`; } else frame.srcdoc = CANT;
    }
  }
  function go(url) { hist.splice(pos + 1, Infinity, url); pos = hist.length - 1; show(url); }
  const typed = () => go(/^\w+:/.test(addr.value) ? addr.value : `http://${addr.value}`);
  w.querySelector('.nav').onclick = e => {
    const b = e.target.closest('button')?.textContent;
    if (b === 'Back' && pos > 0) show(hist[--pos]);
    if (b === 'Forward' && pos < hist.length - 1) show(hist[++pos]);
    if (b === 'Refresh') show(hist[pos]);
    if (b === 'Home') go(HOME);
  };
  addr.onkeydown = e => { if (e.key === 'Enter') typed(); };
  w.querySelector('.address button').onclick = typed;
  go(HOME);
  return w;
}
