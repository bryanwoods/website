// Bryan's AIM buddy list, signed on after school. The screen names, away messages, and profiles are his friends' real ones,
// so each friend says yes before this is public.
// status is 'online', 'away', 'idle', or 'offline'; online and idle are minutes; away and profile are HTML, the way AIM kept them,
// and %n in either is the screen name of whoever reads it.
export const ME = 'DrinkSpineFluid';
export const GROUPS = ['Buddies', 'Family', 'Co-Workers'];
export const BUDDIES = [
  { name: 'PunkRawkShow85', status: 'online', online: 52, profile: "*~*~' Look at all those stars, look at how god damn ugly the stars are. '~*~*" },
  { name: 'teesa619', status: 'away', online: 97, away: '<font color="#ff3399"><i>getting around...biggie crew hit me up</i></font>', profile: '<font color="#ff3399"><i>Celebrate we will, because life is short but sweet for certain</i></font>' },
  { name: 'jamey i guess', status: 'away', online: 23, away: 'My first case of teenage love has been crushed' },
  { name: 'jesserunner', status: 'away', online: 64, away: 'c17' },
];

// the list as AIM showed it: each group with who in it is on, of how many, then everyone who isn't; `gone` have signed off for now
const of = g => BUDDIES.filter(b => (b.group || 'Buddies') === g);
export const on = b => b.status !== 'offline';
export const listOf = (gone = new Set()) => {
  const here = b => on(b) && !gone.has(b);
  return [...GROUPS.map(g => [g, of(g).filter(here), of(g).length]), ['Offline', BUDDIES.filter(b => !here(b)), BUDDIES.length]];
};
