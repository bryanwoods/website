// Something picked up off the floor and held up close: a page of notebook paper in Bryan's handwriting, or a magazine's cover.
// A click anywhere, or Esc, puts it back down.
const CSS = `
  .held { position: fixed; inset: 0; z-index: 25; display: flex; align-items: center; justify-content: center; background: rgba(12, 8, 4, .55); cursor: pointer; }
  .held .paper { width: min(520px, 88vw); max-height: 84vh; overflow: auto; padding: 32px 24px 28px 66px; box-sizing: border-box; transform: rotate(-1.2deg); box-shadow: 0 12px 40px rgba(0,0,0,.5);
    background: linear-gradient(90deg, transparent 52px, #e8a0a0 52px 54px, transparent 54px), repeating-linear-gradient(#fbfaf4 0 27px, #9cc0e6 27px 28px);
    color: #22307a; font: 19px/28px "Bradley Hand", "Segoe Print", "Comic Sans MS", cursive; white-space: pre-wrap; }
  .held .paper.crumpled { transform: rotate(1.6deg); background:   /* flattened out again, the creases still in it */
    linear-gradient(118deg, transparent 38%, rgba(0,0,0,.06) 39%, transparent 41%), linear-gradient(32deg, transparent 58%, rgba(0,0,0,.07) 59%, transparent 61%),
    linear-gradient(74deg, transparent 22%, rgba(255,255,255,.5) 23%, transparent 25%), linear-gradient(90deg, transparent 52px, #e8a0a0 52px 54px, transparent 54px), repeating-linear-gradient(#f7f3e8 0 27px, #9cc0e6 27px 28px); }
  .held figure { margin: 0; text-align: center; }
  .held img { max-width: 88vw; max-height: 80vh; box-shadow: 0 12px 40px rgba(0,0,0,.6); }
  .held figcaption { margin-top: 12px; color: #f3e9d6; font: 15px Georgia, serif; }
`;

function show(build) {
  if (!document.getElementById('held')) document.head.insertAdjacentHTML('beforeend', `<style id="held">${CSS}</style>`);
  const el = Object.assign(document.createElement('div'), { className: 'held' });
  build(el); document.body.append(el);
  const put = e => {   // Esc puts it down here, and does not also take you out of the room's view
    if (e.type === 'keydown' && e.key !== 'Escape') return;
    e.stopPropagation(); el.remove(); removeEventListener('keydown', put, true);
  };
  el.onclick = put; addEventListener('keydown', put, true);
}
export const paper = (text, crumpled) => show(el => { el.appendChild(Object.assign(document.createElement('div'), { className: crumpled ? 'paper crumpled' : 'paper', textContent: text })); });
export const cover = (src, title) => show(el => {
  el.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure>';
  el.querySelector('img').src = src; el.querySelector('figcaption').textContent = title;
});
