# A Little Universe — Birthday Website ♡

A small, hand-made birthday love letter for 28 October. It's built with plain HTML, CSS and JavaScript. It has no frameworks and no build step, and it doesn't need a backend.

```
birthday-website/
├── index.html        ← the page and all its words
├── style.css         ← colors, fonts, layout, animations
├── script.js         ← CONFIG (your personal details) + interactions
├── assets/
│   ├── images/       ← put your photos here (optional)
│   └── audio/        ← put your song here (optional)
└── README.md
```

---

## 1. Open it locally

Double-click `index.html`. It opens in your browser, and that's all you need.

(Optional) If you'd rather use a local server:

```bash
cd birthday-website
python3 -m http.server 8000
# then visit http://localhost:8000
```

> The fonts come from Google Fonts. Offline, the page falls back to elegant system fonts and still looks good.

---

## 2. Add your names, dates and story

Open `script.js`. Everything personal is in the **`CONFIG`** block at the top:

| Field | What to write | Example format |
|---|---|---|
| `yourName` | Your name (signs the letter and the final message) | `"Your Name"` |
| `herName` | Her name (used in “My dearest …,”) | `"Her Name"` |
| `birthday.day` / `birthday.month` | Already set to 28 / 10 | `28`, `10` |
| `birthday.year` | Optional, e.g. the year you're celebrating | `2026` |
| `firstMeetingDate` | **The date you met** (drives the counter) | `"2023-02-14"` |
| `meetingPlace` | Where you met | `"A tiny café in Pune"` |
| `howWeMet` | One or two sentences | `"…"` |
| `firstImpression` | What you thought the first time you saw her | `"…"` |
| `firstMeetingPhoto` | Path, alt text and caption for the first-meeting photo | |
| `memories` | 3–6 photos, each with a title and an optional caption | |
| `secretMessage` | The hidden message behind the final button | |
| `music.src` | Path to your song | |
| `showPlaceholders` | `true` while editing, **`false` before you give it to her** | |

**How empty fields behave**

- While `showPlaceholders: true`, any empty field shows a dashed tag like `[WHERE WE MET]`, so you can see what's left to fill in.
- Once you set `showPlaceholders: false`, empty details are hidden, so there's no awkward blank text.
- The **days-since-we-met counter** only appears when `firstMeetingDate` is a real date in `YYYY-MM-DD` format. It's calculated live from today's date, so it's always correct. If the date is missing, invalid or in the future, the counter stays hidden.

To change any other wording (headings, the love letter, the quotes), edit the text directly in `index.html`. Each section is marked with a comment such as `<!-- ============ 4. A LITTLE LOVE LETTER ============ -->`.

---

## 3. Add your photographs

1. Copy your photos into `assets/images/`.
2. Name them to match the config, or change the paths in `CONFIG`:
   - `first-meeting.jpg` is the photo from the day you met
   - `memory-1.jpg` … `memory-4.jpg` are for the gallery
3. Refresh the page.

Tips:
- JPG or WebP files around 1200–1600px on the long side load quickly on phones.
- Portrait photos suit the first-meeting frame (4:5). Gallery frames are square, and photos are cropped to fit.
- To add a 5th or 6th memory, add another `{ src, title, caption, alt }` line to `memories`. The gallery shows up to six.
- If a file is missing, a soft rose placeholder appears instead of a broken image icon. Its small “Add a photo at …” hint disappears when `showPlaceholders` is `false`.

> File names are case-sensitive on most web hosts. `Memory-1.JPG` and `memory-1.jpg` count as different files.

---

## 4. Optional background music

1. Put an audio file you have the right to use at `assets/audio/romantic-music.mp3`, or set `CONFIG.music.src` to another path.
2. Refresh. A small **“Play our song”** button appears in the bottom-right corner.

- The music **never autoplays**. It starts only when she taps the button, and the same button pauses it.
- If no audio file exists, the button stays hidden and the rest of the site works normally.
- Change the volume with `CONFIG.music.volume` (0–1).

---

## 5. Test it on a mobile phone

**Fastest:** in Chrome or Edge, open DevTools (`F12`) and press `Ctrl+Shift+M` (`Cmd+Shift+M` on a Mac) to turn on device mode. Then try an iPhone, an Android phone and an iPad size.

**On a real phone (same Wi-Fi):**

```bash
cd birthday-website
python3 -m http.server 8000
```

Find your computer's local IP address (e.g. `192.168.1.20`), then open `http://192.168.1.20:8000` on the phone.

**Checklist before the big day**
- [ ] Every placeholder is filled in, and `showPlaceholders` is `false`
- [ ] The counter shows the right number of days
- [ ] Photos appear in the right frames
- [ ] Both buttons work (“Open Your Little Universe” and “One Last Little Surprise”)
- [ ] The music button plays and pauses (if you added music)

---

## 6. Publish it (free static hosting)

The site is entirely static, so any static host works. Before you upload, remember that whoever has the link can see the page, so only include photos you're both comfortable sharing. The page already asks search engines not to index it (`noindex`).

**Netlify Drop (easiest, no account setup needed)**
1. Go to <https://app.netlify.com/drop>.
2. Drag the whole `birthday-website` folder onto the page.
3. You get a link like `https://something.netlify.app`. You can rename it in the site settings.

**GitHub Pages**
1. Create a new repository and upload the contents of `birthday-website/` (with `index.html` at the root).
2. Go to **Settings → Pages**, set the source to the `main` branch and `/root`, and save.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

**Vercel / Cloudflare Pages**: import the folder or repository as a static site. There's no build command, and the output directory is `/`.

---

## About the scripture section

Every verse in “Where Love Meets Dharma” comes from a recognized scripture, with its exact reference:

- **Rig Veda 10.85.42**, from the Vedic wedding hymn (Sūryā Sūkta): a blessing that the couple never be parted and reach a full life together.
- **Rig Veda 10.191.4**, the closing verse of the Rig Veda: a prayer for shared intention and harmony.
- **Bhagavad Gita 12.13**: the qualities (no hatred, friendliness, compassion, forgiveness) of one dear to Krishna. The thought continues into 12.14.

The English lines are faithful modern renderings, not word-for-word translations. Sanskrit editions differ slightly in punctuation and sandhi, so if you'd like to be extra careful, compare them with a printed edition you trust or ask a family elder or pandit. The closing line, “May our love be guided by kindness…”, is clearly labeled on the page as an *original reflection*, not scripture.

In the quote carousel, lines marked “written for you” are original. The two attributed quotes are by Antoine de Saint-Exupéry (*Wind, Sand and Stars*, 1939, English translation) and Robert Browning (*Rabbi Ben Ezra*, 1864).

---

## Accessibility & comfort

- Works with a keyboard alone: visible focus rings, a skip link, and arrow keys in the quote carousel.
- Respects **reduced-motion** settings: no floating hearts, no auto-rotating quotes, and content appears without animation.
- The carousel has previous/next buttons, dots and a pause button, and supports swipe on touchscreens.
- No tracking, no cookies, no external APIs. Google Fonts is the only external request.

Happy birthday to her ♡
