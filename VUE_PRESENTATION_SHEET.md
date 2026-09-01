# 🎓 AniTrack — Vue.js 3 Presentation & Code Defense Sheet
### 🖥️ Screen-Share Presentation Document (Academic Defense)

> **Project Name**: AniTrack — Personal Anime Watchlist Application  
> **Tech Stack**: HTML5, Vanilla CSS3, Vue.js 3 via CDN (`vue.global.js`) — *Zero build tools, Zero external JS libraries, Pure Frontend SPA*.

---

## 📋 Quick Concept Matrix (100% Rubric Coverage)

| # | Vue.js 3 Concept | HTML Location (`index.html`) | JavaScript Location (`app.js`) |
|---|---|---|---|
| 1 | **`data()`** | `<div id="app">` | Lines 124–165 (`data() { return { ... } }`) |
| 2 | **`{{ }}` Interpolation** | Hero, Metric Cards, Anime Cards | Injected from `data()` & `computed:` |
| 3 | **`v-for`** | Cards Grid, Status Filter Pills, Genres | Iterating over `filteredAnime`, `statusOptions` |
| 4 | **`v-if / v-else-if / v-else`** | Status Badges, Empty State, Modals | Evaluates `anime.status`, `filteredAnime.length`, `modal.show` |
| 5 | **`v-bind` or `:`** | `:src`, `:alt`, `:style`, `:class` | Bound to `anime.image`, `anime.isFavorite`, `statusFilter` |
| 6 | **`@click` & Event Directives** | Buttons (`@click.stop`), Form (`@submit.prevent`) | Connected to `methods:` in `app.js` |
| 7 | **`v-model` (Two-Way Binding)** | Search bar, Form inputs, Rating slider, Textarea | Bound to `searchQuery`, `newAnime`, `ratingModal` |
| 8 | **`methods:` (Action Handlers)** | Triggered by buttons in UI | Lines 260–395 (`changeStatus`, `addAnime`, `openRatingModal`, etc.) |
| 9 | **`computed:` (Cached Properties)** | Displayed in Hero, Grid, Metric Stats | Lines 170–255 (`filteredAnime`, `featuredAnime`, `totalAnime`, etc.) |
| 10 | **`mounted()` & `localStorage`** | Auto-invoked on page load | Lines 400–405 (`mounted() { this.loadFromStorage(); }`) |

---

---

## 1. `data()` — Reactive State Storage

### 💡 Concept:
The central storage box of the application. Every variable inside `data()` is **reactive**: when it changes, Vue automatically re-renders the UI without page reloads.

### 💻 Exact Code in `app.js`:
```javascript
data() {
  return {
    // 1. Array containing all anime objects in user's collection
    animeList: [],

    // 2. ID of the anime featured on the Hero Spotlight Billboard
    featuredAnimeId: 1,

    // 3. Modal visibility states
    showResetModal: false,
    ratingModal: {
      show: false,
      anime: null,
      tempRating: 8.5
    },

    // 4. Two-way bound search, filter & sort states
    searchQuery: '',
    statusFilter: 'All', // 'All', 'Watching', 'Completed', 'Plan to Watch'
    sortBy: 'default',   // 'default', 'rating-high', 'rating-low', 'title-az'

    // 5. New anime form model
    newAnime: {
      title: '',
      genre: 'Action',
      rating: 8.5,
      status: 'Plan to Watch',
      image: 'images/komi.jpg',
      synopsis: ''
    }
  };
}
```

### 🎤 What to say to your instructor:
> *"The `data()` function returns the reactive state of AniTrack. Any mutation to these properties automatically updates the DOM through Vue's reactivity engine without manual DOM selection."*

---

---

## 2. `{{ }}` — Text Interpolation (Mustache Syntax)

### 💡 Concept:
Injects live JavaScript data directly into the HTML markup. Whenever the variable updates, the rendered text updates immediately.

### 💻 Exact Code in `index.html`:
```html
<!-- 1. Hero Spotlight Title & Story Summary -->
<h2 class="hero-title">{{ featuredAnime.title }}</h2>
<p class="hero-synopsis">{{ featuredAnime.synopsis }}</p>

<!-- 2. Personal Rating on Cards (Formatted to 1 decimal) -->
<span class="card-rating-badge">★ {{ anime.rating.toFixed(1) }}</span>

<!-- 3. Metric Counter Numbers -->
<span class="stat-value">{{ totalAnime }}</span>
<span class="stat-value">{{ watchingCount }}</span>
<span class="stat-value">{{ completedCount }}</span>
```

### 🎤 What to say to your instructor:
> *"We use `{{ }}` text interpolation to dynamically bind titles, formatted review scores, and calculated collection statistics directly into the HTML template."*

---

---

## 3. `v-for` — List Rendering Directive

### 💡 Concept:
Acts like a JavaScript `.map()` loop, taking an array and automatically stamping out HTML elements for every item.

### 💻 Exact Code in `index.html`:
```html
<!-- 1. Rendering the responsive grid of Anime Cards -->
<div 
  v-for="anime in filteredAnime" 
  :key="anime.id" 
  class="anime-card"
>
  <img :src="anime.image" :alt="anime.title" class="card-img">
  <h3 class="card-title">{{ anime.title }}</h3>
  <button @click.stop="changeStatus(anime)">🔄 {{ anime.status }}</button>
</div>

<!-- 2. Rendering Category Filter Pills -->
<button 
  v-for="status in statusOptions" 
  :key="status" 
  @click="setStatusFilter(status)"
  :class="['filter-btn', { active: statusFilter === status }]"
>
  {{ status }}
</button>
```

### 🎤 What to say to your instructor:
> *"The `v-for` directive iterates over our `filteredAnime` array to dynamically construct the anime cards grid. We supply `:key="anime.id"` so Vue's Virtual DOM can track and update individual nodes with high performance."*

---

---

## 4. `v-if / v-else-if / v-else` — Conditional Rendering

### 💡 Concept:
Conditionally mounts or unmounts HTML elements from the DOM based on boolean logic (like an `if / else` statement).

### 💻 Exact Code in `index.html`:
```html
<!-- 1. Three-State Color-Coded Status Badges -->
<span v-if="anime.status === 'Watching'" class="status-badge badge-watching">
  Watching
</span>
<span v-else-if="anime.status === 'Completed'" class="status-badge badge-completed">
  Completed
</span>
<span v-else class="status-badge badge-plan">
  Plan to Watch
</span>

<!-- 2. Empty State (Displayed when Search returns 0 items) -->
<div v-if="filteredAnime.length === 0" class="empty-state">
  <h3>No anime found.</h3>
  <button @click="resetFilters">Reset Filters</button>
</div>
<div v-else class="anime-grid">
  <!-- Card Grid -->
</div>

<!-- 3. Custom Rating Slider Modal -->
<div v-if="ratingModal.show" class="modal-backdrop" @click.self="closeRatingModal">
  <!-- Modal Card -->
</div>
```

### 🎤 What to say to your instructor:
> *"We use `v-if`, `v-else-if`, and `v-else` to conditionally render our 3 distinct status badge styles, the zero-match search empty state, and the custom modal dialogs."*

---

---

## 5. `v-bind` or `:` — Dynamic Attribute Binding

### 💡 Concept:
Binds HTML attributes (such as `src`, `style`, `class`, `alt`) to dynamic JavaScript variables rather than static text strings.

### 💻 Exact Code in `index.html`:
```html
<!-- 1. Dynamic Poster Image Path and Alt Text -->
<img :src="anime.image" :alt="anime.title" class="card-img">

<!-- 2. Dynamic Backdrop Image Style on Hero Billboard -->
<div 
  class="hero-backdrop" 
  :style="{ backgroundImage: 'url(' + featuredAnime.image + ')' }"
></div>

<!-- 3. Dynamic Favorite Heart State Class Binding -->
<button :class="['card-fav-btn', { 'is-favorite': anime.isFavorite }]">
  <span v-if="anime.isFavorite">❤️</span>
  <span v-else>🤍</span>
</button>
```

### 🎤 What to say to your instructor:
> *"The colon `:` is shorthand for `v-bind`. It binds HTML attributes to dynamic expressions in our data model, allowing dynamic poster image loading, background styles, and conditional CSS class toggling."*

---

---

## 6. `@click` & Vue Event Directives

### 💡 Concept:
Listens to browser events (like clicks and form submits) and executes methods. Supports modifiers like `.stop` (stops bubbling) and `.prevent` (stops page refresh).

### 💻 Exact Code in `index.html`:
```html
<!-- 1. Cycle Watching Status -->
<button @click.stop="changeStatus(anime)">🔄 Status</button>

<!-- 2. Open Custom Rating Slider Modal -->
<button @click.stop="openRatingModal(anime)">★ {{ anime.rating.toFixed(1) }}</button>

<!-- 3. Toggle Favorite Heart -->
<button @click.stop="toggleFavorite(anime)">❤️</button>

<!-- 4. Remove Anime from Watchlist -->
<button @click.stop="removeAnime(anime.id)">🗑️</button>

<!-- 5. Form Submit with .prevent modifier (Prevents browser refresh) -->
<form @submit.prevent="addAnime">
```

### 🎤 What to say to your instructor:
> *"The `@` symbol is shorthand for `v-on`. We use `@click` to trigger user actions and leverage event modifiers like `@click.stop` to prevent event bubbling and `@submit.prevent` to prevent full page reloads."*

---

---

## 7. `v-model` — Two-Way Data Binding

### 💡 Concept:
Synchronizes form inputs bidirectionally with JavaScript variables. When the user types or slides, the variable updates; if the variable changes in code, the input updates automatically.

### 💻 Exact Code in `index.html`:
```html
<!-- 1. Live Search Input -->
<input type="text" v-model="searchQuery" placeholder="Search anime by title or genre...">

<!-- 2. Add Anime Form Title -->
<input type="text" v-model="newAnime.title" required>

<!-- 3. Personal Rating Slider (with .number modifier to cast as numeric) -->
<input type="range" min="1" max="10" step="0.1" v-model.number="newAnime.rating">

<!-- 4. Story Summary Textarea -->
<textarea v-model="newAnime.synopsis"></textarea>

<!-- 5. Rating Modal Slider -->
<input type="range" min="1" max="10" step="0.1" v-model.number="ratingModal.tempRating">
```

### 🎤 What to say to your instructor:
> *"We use `v-model` for two-way data binding across all user inputs, and `v-model.number` to ensure numeric values like ratings are automatically parsed as JavaScript floating-point numbers."*

---

---

## 8. `methods:` — Action Handlers

### 💡 Concept:
Functions that execute when triggered by user events. They mutate `data()`, persist state to `localStorage`, and display toast notifications.

### 💻 Exact Code in `app.js`:
```javascript
methods: {
  // 1. Cycle Watching Status: Plan to Watch -> Watching -> Completed -> Plan to Watch
  changeStatus(anime) {
    if (anime.status === 'Plan to Watch') {
      anime.status = 'Watching';
    } else if (anime.status === 'Watching') {
      anime.status = 'Completed';
    } else {
      anime.status = 'Plan to Watch';
    }
    this.saveToStorage();
    this.showToast(`Updated "${anime.title}" status to "${anime.status}"`);
  },

  // 2. Toggle Favorite
  toggleFavorite(anime) {
    anime.isFavorite = !anime.isFavorite;
    this.saveToStorage();
    this.showToast(anime.isFavorite ? `Added "${anime.title}" to Favorites ❤️` : `Removed from Favorites`);
  },

  // 3. Add Anime to Collection
  addAnime() {
    if (!this.newAnime.title.trim()) return;

    const animeToAdd = {
      id: Date.now(),
      title: this.newAnime.title.trim(),
      genre: this.newAnime.genre,
      rating: Number(this.newAnime.rating),
      status: this.newAnime.status,
      isFavorite: false,
      image: this.newAnime.image.trim() || 'images/komi.jpg',
      synopsis: this.newAnime.synopsis.trim() || 'A new favorite anime added to your personal watchlist.'
    };

    this.animeList.unshift(animeToAdd);
    this.featuredAnimeId = animeToAdd.id;
    this.saveToStorage();
    this.showToast(`Added "${animeToAdd.title}" to collection! ➕`);
  },

  // 4. Open Rating Slider Modal
  openRatingModal(anime) {
    this.ratingModal.anime = anime;
    this.ratingModal.tempRating = anime.rating;
    this.ratingModal.show = true;
  },

  // 5. Save Modified Rating
  saveRatingModal() {
    if (this.ratingModal.anime) {
      this.ratingModal.anime.rating = Number(this.ratingModal.tempRating);
      this.saveToStorage();
      this.showToast(`Updated "${this.ratingModal.anime.title}" rating to ★ ${this.ratingModal.anime.rating.toFixed(1)} / 10`);
    }
    this.closeRatingModal();
  }
}
```

### 🎤 What to say to your instructor:
> *"The `methods:` object contains our event-handling functions that mutate reactive state, handle business logic, and serialize updates to `localStorage`."*

---

---

## 9. `computed:` — Cached Reactive Calculations

### 💡 Concept:
Smart formula functions that return derived data. **They are cached based on their reactive dependencies** and only re-calculate when the specific data they depend on changes.

### 💻 Exact Code in `app.js`:
```javascript
computed: {
  // 1. Featured Spotlight Anime (Hero Billboard)
  featuredAnime() {
    return this.animeList.find(a => a.id === this.featuredAnimeId) || this.animeList[0] || {};
  },

  // 2. Multi-Criteria Filter (Search Query + Category Tab + Sorting)
  filteredAnime() {
    let result = [...this.animeList];

    // Filter by Status Tab ('All', 'Watching', 'Completed', 'Plan to Watch')
    if (this.statusFilter !== 'All') {
      result = result.filter(anime => anime.status === this.statusFilter);
    }

    // Filter by Search Query (Title or Genre)
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(anime => 
        anime.title.toLowerCase().includes(q) || 
        anime.genre.toLowerCase().includes(q)
      );
    }

    // Sort Results
    if (this.sortBy === 'rating-high') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'rating-low') {
      result.sort((a, b) => a.rating - b.rating);
    } else if (this.sortBy === 'title-az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  },

  // 3. Live Collection Metrics
  totalAnime() { return this.animeList.length; },
  watchingCount() { return this.animeList.filter(a => a.status === 'Watching').length; },
  completedCount() { return this.animeList.filter(a => a.status === 'Completed').length; },
  planToWatchCount() { return this.animeList.filter(a => a.status === 'Plan to Watch').length; },
  favoriteCount() { return this.animeList.filter(a => a.isFavorite).length; }
}
```

### 🎯 Why Computed over Methods?
- If the user interacts with other parts of the page, `filteredAnime` **does not re-calculate** because search and filter parameters did not change.
- A method would re-execute on every render cycle, degrading performance.

### 🎤 What to say to your instructor:
> *"We use `computed` properties for derived values like `filteredAnime` and live counters because computed properties are cached based on their dependencies, recalculating only when necessary to ensure optimal runtime efficiency."*

---

---

## 10. `mounted()` & `localStorage` — Persistent State

### 💡 Concept:
A lifecycle hook that executes **automatically once when the application finishes mounting to the DOM**. It loads previously saved user data from browser storage.

### 💻 Exact Code in `app.js`:
```javascript
mounted() {
  // Automatically restores collection and spotlight on page load
  this.loadFromStorage();
}
```

### 🎤 What to say to your instructor:
> *"The `mounted()` lifecycle hook synchronizes our application state with browser `localStorage` on initial load, guaranteeing persistence across browser refreshes and sessions."*

---

## 🌟 Ready to Share Screen for 2:00 PM Defense! 🚀
