# AniTrack — Vue.js 3 Presentation & Study Guide 🎓
### Direct Defense Guide (Mapped 1-to-1 with Teacher's Requirements)

> **Tech Stack Constraint**: Built **STRICTLY with HTML5, CSS3, and Vue.js 3 via CDN (`vue.global.js`)**. No Node.js, no npm, no Vite, no React, no Tailwind, no Bootstrap, and no backend. Runs directly by opening `index.html`.

---

## 📋 The 9 Exact Requirements & Where They Are in Code

| Requirement | Code File | Line/Location | What It Does in AniTrack |
|---|---|---|---|
| **1. `data()`** | `app.js` | Lines 124–160 | Stores all reactive state (`animeList`, `featuredAnimeId`, `searchQuery`, `statusFilter`, `ratingModal`, `newAnime`). |
| **2. `{{ }}` Interpolation** | `index.html` | Hero, Stats, Cards | Displays titles (`{{ featuredAnime.title }}`), scores (`★ {{ anime.rating.toFixed(1) }}`), and live counts (`{{ totalAnime }}`). |
| **3. `v-for`** | `index.html` | Cards Grid, Filters | Loops over `filteredAnime` to render cards, loops over `statusOptions` for filter pills, and `availableGenres` for select options. |
| **4. `v-if / v-else-if / v-else`** | `index.html` | Badges, Modals, Empty | Renders 3 color badges (*Watching/Completed/Plan to Watch*), empty state, and custom modals (`showResetModal`, `ratingModal.show`). |
| **5. `v-bind` or `:`** | `index.html` | Poster Images, Styles | Dynamically binds `:src="anime.image"`, `:alt="anime.title"`, active filter class `:class="{ active: statusFilter === status }"`, and `:class="{ 'is-favorite': anime.isFavorite }"`. |
| **6. `@click` & Vue Events** | `index.html` | Buttons, Form | Handles `@click="changeStatus(anime)"`, `@click="toggleFavorite(anime)"`, `@click="openRatingModal(anime)"`, `@click="removeAnime(anime.id)"`, and `@submit.prevent="addAnime"`. |
| **7. At least one method** | `app.js` | `methods:` object | Contains 12 action functions (`addAnime`, `removeAnime`, `changeStatus`, `toggleFavorite`, `openRatingModal`, `saveRatingModal`, `setSpotlight`, `nextSpotlight`, etc.). |
| **8. At least one computed property** | `app.js` | `computed:` object | Contains 7 cached reactive properties (`filteredAnime`, `featuredAnime`, `totalAnime`, `watchingCount`, `completedCount`, `planToWatchCount`, `favoriteCount`). |
| **9. Working User Actions** | UI & `app.js` | Entire Application | **All 6 Actions Implemented**: **Add** (Form + File Upload), **Remove** (🗑️), **Favorite** (❤️), **Save** (`localStorage`), **Filter** (Search + Pills + Sort), **Change Status** (🔄). |

---

## 🧠 Step-by-Step Study Notes (Read This to Memorize)

### 1. `data()` (Reactive State)
- **Where**: Inside `Vue.createApp({ data() { return { ... } } })` in `app.js`.
- **What to say**: *"The `data()` function returns the reactive state object. When any variable in `data()` changes (like typing into `searchQuery` or adding an anime to `animeList`), Vue automatically detects it and re-renders the DOM in real time."*

### 2. `{{ }}` Text Interpolation (Mustache Syntax)
- **Where**: Throughout `index.html`.
- **What to say**: *"We use double curly braces `{{ }}` to bind JavaScript data into our HTML. For example, `{{ featuredAnime.title }}` displays the active spotlight anime title, and `{{ anime.rating.toFixed(1) }}` displays the score formatted to one decimal place."*

### 3. `v-for` (List Rendering)
- **Where**: `<div v-for="anime in filteredAnime" :key="anime.id" class="anime-card">` in `index.html`.
- **What to say**: *"The `v-for` directive iterates through our computed `filteredAnime` array and renders a card for each anime. We include `:key="anime.id"` so Vue's Virtual DOM can uniquely identify and track each element efficiently."*

### 4. `v-if / v-else-if / v-else` (Conditional Rendering)
- **Where**: Status badges, Empty State, and Modals in `index.html`.
- **What to say**: *"We use `v-if`, `v-else-if`, and `v-else` to conditionally render elements. For example, if an anime's status is 'Watching', it displays a green badge; if 'Completed', a blue badge; otherwise, an amber 'Plan to Watch' badge. We also use `v-if` for the Empty State when a search returns 0 results, and for our custom Modals."*

### 5. `v-bind` or `:` Shorthand (Dynamic Attributes)
- **Where**: `<img :src="anime.image" :alt="anime.title">` and `:class` bindings in `index.html`.
- **What to say**: *"Colon `:` is the shorthand for `v-bind`. It binds HTML attributes to dynamic Vue variables. We use it for dynamic poster image paths `:src`, `:style` background on the hero billboard, and dynamic CSS classes like `:class="{ 'is-favorite': anime.isFavorite }"`."*

### 6. `@click` & Event Directives
- **Where**: Buttons and forms in `index.html`.
- **What to say**: *"The `@` symbol is shorthand for `v-on`. `@click` listens for user clicks and triggers methods like `changeStatus(anime)` or `toggleFavorite(anime)`. We use `@click.stop` to prevent event bubbling, and `@submit.prevent="addAnime"` on the form to prevent default browser page refreshes."*

### 7. Methods (`methods:`)
- **Where**: `methods:` block in `app.js`.
- **What to say**: *"Methods are functions that execute when triggered by user events. They mutate state directly—for example, `changeStatus(anime)` cycles the status from Plan to Watch ➔ Watching ➔ Completed, and `saveToStorage()` saves the changes to `localStorage`."*

### 8. Computed Properties (`computed:`)
- **Where**: `computed:` block in `app.js`.
- **What to say**: *"Computed properties are reactive functions that are **cached based on their dependencies**. For example, `filteredAnime` combines real-time search, category filters, and sorting. It only recalculates when `searchQuery`, `statusFilter`, or `animeList` change, making it much more performant than a standard method."*

### 9. Working User Actions (All 6 Included)
1. **➕ Add**: Form at the bottom with title, genre, rating slider, summary, and local JPG file upload.
2. **🗑️ Remove**: Delete button on cards that filters out the anime by ID.
3. **❤️ Favorite**: Toggle heart button that updates favorites count and saves to storage.
4. **💾 Save**: `localStorage` automatic persistence so changes stay on refresh.
5. **🔍 Filter & Search**: Real-time keyword search + category status filter pills + sorting dropdown.
6. **🔄 Change Status**: Cycle button that transitions anime through its watching lifecycle.

---

## 👥 Group Presentation Roles (Split Between Groupmates)

- **👤 Speaker 1 (Intro & Tech Stack)**:
  > *"Good afternoon. We are presenting **AniTrack**, a personal anime watchlist web app built strictly with **HTML5, CSS3, and Vue.js 3 via CDN**. It contains zero prohibited frameworks or build tools and runs directly in any browser."*

- **👤 Speaker 2 (Vue 3 Core Concepts)**:
  > *"Our application implements all required Vue 3 concepts: `data()` for reactive state, `computed` properties for live stats and filtering, `v-for` for rendering the card grid, `v-if/else` for dynamic status badges, and `v-bind` for dynamic image sources."*

- **👤 Speaker 3 (Live Browser Demonstration)**:
  > *"Let's see it in action in the browser:
  > 1. **Hover Effect**: Hovering over a card dims the image and slides up the `ANITRACK` logo.
  > 2. **Spotlight Hero**: Clicking 'Spotlight' features the anime in the top billboard with its summary.
  > 3. **Search & Filter**: Searching 'Komi' or clicking 'Watching' filters the cards in real time.
  > 4. **Status Lifecycle**: Clicking '🔄 Status' cycles it from Plan to Watch ➔ Watching ➔ Completed.
  > 5. **Rating Slider Modal**: Clicking the star badge opens our custom modal to adjust the score with a slider.
  > 6. **Add Anime**: Adding a new title with custom summary and JPG upload saves and updates instantly!"*

- **👤 Speaker 4 (Defense Q&A)**:
  > Ready to answer teacher's technical questions on computed caching, Virtual DOM `:key`, and event modifiers.

---

## 🎯 Top 5 Teacher Defense Q&A

**Q1: "Why use a Computed Property for `filteredAnime` instead of a Method?"**  
👉 **Answer**: *"Computed properties are **cached based on reactive dependencies**. `filteredAnime` only re-evaluates when search, filter, or the anime list changes. A method would re-run on every single render cycle, which is inefficient."*

**Q2: "How does the Hero Spotlight work?"**  
👉 **Answer**: *"The computed property `featuredAnime` finds the anime object matching `featuredAnimeId` in `data()`. When the user clicks 'Spotlight' on any card, `setSpotlight(anime)` updates `featuredAnimeId`, triggering Vue to re-render the hero billboard instantly."*

**Q3: "What does `@submit.prevent` do on the form?"**  
👉 **Answer**: *"It calls `event.preventDefault()`, which prevents the browser from reloading the page upon form submission, keeping our Single Page Application reactive and smooth."*

**Q4: "Why do you have `:key="anime.id"` in the `v-for` loop?"**  
👉 **Answer**: *"The `:key` provides a unique identity for each rendered DOM node, allowing Vue's Virtual DOM to efficiently patch, re-order, or delete elements without re-creating the entire list."*

**Q5: "How does the app persist data on refresh?"**  
👉 **Answer**: *"We use the `mounted()` lifecycle hook in `app.js` to call `loadFromStorage()`, which reads from browser `localStorage`. Every time an action (add, remove, edit rating, change status, favorite) is performed, `saveToStorage()` serializes the state to `localStorage`."*

---

Everything is 100% prepared for your 2:00 PM presentation! 🚀
