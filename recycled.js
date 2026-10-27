// The Recycle Bin, never emptied. The pictures are names, sizes, and dates only: Windows 98 can't open a deleted file, only restore it,
// so a double-click shows its properties. The writing opens in Notepad or WordPad; it is stand-in text until Bryan writes his own.
const PICS = 'C:\\My Documents\\My Pictures', DOCS = 'C:\\My Documents', SCHOOL = 'C:\\My Documents\\School';
export const RECYCLED = [
  { name: 'babe1.jpg', from: PICS, deleted: '10/3/97 11:48 PM', size: 38 },
  { name: 'babe2.jpg', from: PICS, deleted: '10/3/97 11:48 PM', size: 52 },
  { name: 'hot.gif', from: 'C:\\WINDOWS\\Desktop', deleted: '10/3/97 11:49 PM', size: 61 },
  { name: 'spring break 2.jpg', from: PICS, deleted: '12/19/97 1:15 AM', size: 47 },
  { name: 'earth sci project.jpg', from: SCHOOL, deleted: '1/17/98 10:02 PM', size: 44 },
  { name: 'nekkid.jpg', from: 'C:\\Program Files\\Netscape\\Users\\default\\Cache', deleted: '2/6/98 12:31 AM', size: 29 },
  { name: 'DONT OPEN.jpg', from: PICS, deleted: '3/14/98 11:58 PM', size: 66 },
  { name: 'battle rhymes.txt', from: DOCS, deleted: '5/21/98 4:12 PM', size: 1, text: `battle rhymes   !!!DONT READ THIS!!!

yo
step to the mic and you already lost
im the illest in the 607, you the lunch line sauce
your rhymes on dial up, all static and hiss
i hit like a pudgies box, extra cheese, cant miss
you skate like your grandma, you rap like your mom
im the bomb.com before the internet was the bomb

(need a better ending)
(rhymes w/ horseheads: dreads, fed, bed, ahead, said)` },
  { name: 'freestyle words.txt', from: DOCS, deleted: '5/21/98 4:13 PM', size: 1, text: `WORDS THAT RHYME (for freestyle at lunch)

lot / hot / shot / not / plot / spot / knot
rail / fail / jail / mail / pale / sale
sauce / boss / loss / toss / floss / cross
tower / power / shower / hour / flower (no)` },
  { name: 'of mice and men essay.doc', from: SCHOOL, deleted: '11/4/97 9:40 PM', size: 19, text: `Bryan
English 9, Period 4
Of Mice and Men

In the book Of Mice and Men by John Steinbeck, George and Lennie have a dream of owning a little farm where Lennie can tend the rabbits. The dream is what keeps them going even though they don't have anything.

George and Lennie are different from the other men on the ranch because they travel together. Most of the workers are lonely, like Crooks and Candy, and that is why everybody wants in on the dream once they hear about it.

In conclusion, (NEED 2 MORE PARAGRAPHS. due fri)` },
  { name: 'global studies hw ch 7.doc', from: SCHOOL, deleted: '2/24/98 10:20 PM', size: 12, text: `Global Studies, Chapter 7 Review

1. What was the Silk Road? A trade route from China to the Mediterranean. They traded silk (obviously) and spices and stuff.

2. Why did the Mongols have such a big empire? Horses. Really good at horses.

3. Name two inventions that came from China. Paper and gunpowder.

4. ` },
  { name: 'earth sci lab 3.doc', from: SCHOOL, deleted: '10/22/97 8:55 PM', size: 14, text: `Lab 3: Mineral Identification

Purpose: to identify an unknown mineral by its properties.

Hardness: scratched the glass plate, so it is more than 5.5
Streak: white
Luster: glassy

Conclusion: the mystery mineral was probably quartz. Mr. K said it was feldspar.` },
  { name: 'band names.txt', from: DOCS, deleted: '4/2/98 3:51 PM', size: 1, text: `BAND NAMES (vote at lunch)

Drink Spine Fluid
Seventeen Minute Egg
The Rail Slides
Static on Channel 3
Chemung River Rats
Lunch Line Sauce
No Parking on the Dance Floor (taken??)` },
  { name: 'album ideas.txt', from: DOCS, deleted: '4/2/98 3:58 PM', size: 1, text: `ALBUM IDEAS

1. Live at the Lot
2. Songs for the Back of the Bus
3. Dial Tone
4. It's Dark and Hell Is Horseheads
5. self titled. no. too lame` },
];
