// Bryan's resume, from his LinkedIn profile (linkedin.com/in/bryan-woods), for RESUME.doc on the desktop.
// LinkedIn has no descriptions for the jobs; the lines under Arlo and Rhino are from his own LinkedIn posts.
// It opens empty in 1998: Bryan types what he wants to do with computers, takes two of them back, and keeps the third as his objective.
// Then the years fill in the jobs under it, oldest first, and the parts of the wish that came true go yellow.
const RESUME = {
  name: 'Bryan Woods',
  place: 'New York, NY',
  jobs: [   // title, company, dates, place, what it was
    ['Head of Engineering', 'Arlo', 'Aug 2026 – Present', 'New York, NY', 'Health insurance that owns the whole stack: underwriting, risk, claims, member support, and the software behind all of it.'],
    ['Co-Founder & CTO', 'Rhino Labs', 'Aug 2016 – Jul 2026', 'New York, NY', 'Security deposits as a monthly fee instead of a lump sum. Wrote the first versions of the software; raised more than $100M, merged with Jetty, and offered in millions of homes.'],
    ['Director of Engineering', 'PS Dept.', 'Jul 2015 – Jul 2017', 'New York, NY'],
    ['Staff Software Engineer', 'Samsung Electronics', 'Jul 2014 – Jul 2015', 'New York, NY'],
    ['Lead Software Engineer', 'HowAboutWe', 'Nov 2010 – Jul 2014', 'Brooklyn, NY'],
    ['Developer Success', 'Drop.io', 'Jul 2010 – Oct 2010', 'Brooklyn, NY'],
    ['Product Manager and Software Engineer', 'Wilson Colab', 'Jul 2008 – Jul 2010', 'Brooklyn, NY'],
    ['Account Manager', 'Buddylube, LLC', 'Sep 2007 – Jul 2008', 'Brooklyn, NY'],
    ['Web Developer', 'Freelance', 'Jan 1998 – Aug 2007'],
  ],
  school: ['State University of New York at Fredonia', 'English Language and Literature', '2003 – 2006'],
};

const TRIES = ['I want to play with computers', 'I want to get rich on the internet'];
const WISH = [['I want to do something meaningful with computers', '... '], ["I want to use them to help make people's lives easier", '... '], ["like when they're sick", '... '], ['or moving homes', '...']];
const CAME_TRUE = { Arlo: 2, 'Rhino Labs': 3 };   // which part of the wish each job made real

function page(esc) {
  const { name, place, jobs, school: [school, field, years] } = RESUME;
  return `<h1>${esc(name).toUpperCase()}</h1><div class="place">${esc(place)}</div>
    <h2>OBJECTIVE</h2><p class="wish">${WISH.map(([w, tail]) => `<span>${esc(w)}</span>${tail}`).join('')}</p>
    <h2>EXPERIENCE</h2>${jobs.map(([title, company, dates, where, what]) => `<div class="job" data-year="${dates.match(/\d{4}/)[0]}" data-company="${esc(company)}"><div class="line"><b>${esc(title)}, ${esc(company)}</b><span>${dates}</span></div>${where ? `<i>${esc(where)}</i>` : ''}${what ? `<p>${esc(what)}</p>` : ''}</div>`).join('')}
    <h2>EDUCATION</h2><div class="job" data-year="${years.slice(0, 4)}"><div class="line"><b>${esc(school)}</b><span>${years}</span></div><i>${esc(field)}</i></div>`;
}

// types it all into sheet; returns finish(), which shows the whole resume at once
export function write(sheet, esc) {
  sheet.innerHTML = page(esc);
  const wish = sheet.querySelector('.wish'), marked = wish.innerHTML, heads = sheet.querySelectorAll('h2'), years = [...sheet.querySelectorAll('[data-year]')].sort((a, b) => a.dataset.year - b.dataset.year);
  const hidden = [sheet.querySelector('h1'), sheet.querySelector('.place'), ...heads, ...years], typed = document.createElement('span');
  hidden.forEach(e => { e.hidden = true; });
  wish.replaceChildren(typed, Object.assign(document.createElement('span'), { className: 'caret' }));
  let skip = false;
  const wait = ms => new Promise(r => setTimeout(r, skip ? 0 : ms));
  const key = async (text, ms) => { for (const c of text) { if (skip) return; typed.textContent += c; await wait(ms * (0.4 + Math.random() * 1.2) + (c === '.' ? 140 : 0)); } };
  const back = async () => { while (typed.textContent && !skip) { typed.textContent = typed.textContent.slice(0, -1); await wait(45); } };
  const light = e => { if (e.dataset.company in CAME_TRUE) wish.children[CAME_TRUE[e.dataset.company]].classList.add('lit'); };
  (async () => {
    await wait(1200);
    for (const t of TRIES) { await key(t, 85); await wait(1100); await back(); await wait(600); }
    for (const [w, tail] of WISH) { await key(w + tail, 70); await wait(450); }
    await wait(1300);
    if (skip) return;
    wish.innerHTML = marked; heads[0].hidden = false;
    await wait(900); heads[1].hidden = false;
    for (const e of years) {
      if (skip) return;
      if (!e.dataset.company) heads[2].hidden = false;   // school, in 2003
      e.hidden = false; light(e);
      await wait(e.dataset.company in CAME_TRUE ? 1700 : 800);
    }
    hidden.forEach(e => { e.hidden = false; });
  })();
  return () => { if (skip) return; skip = true; wish.innerHTML = marked; hidden.forEach(e => { e.hidden = false; }); years.forEach(light); };
}
