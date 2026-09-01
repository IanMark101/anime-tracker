# 🎓 AniTrack — Complete Vue.js 3 Concepts Breakdown & Code Guide

This document explains **every single Vue.js 3 concept** required in the project guidelines, showing **exact code snippets from AniTrack** and explaining **how each concept powers the application**.

---

## 📌 Quick Summary Table

| Vue Concept | Location in Code | Purpose in AniTrack |
|---|---|---|
| **1. `data()`** | [`app.js`](file:///C:/Users/ANIME-TRACKER/app.js) (Lines 124–165) | Holds all reactive variables (`animeList`, `searchQuery`, `statusFilter`, `ratingModal`, `newAnime`). |
| **2. `{{ }}` (Interpolation)** | [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html) | Dynamically prints titles, ratings, synopsis, and live counters on the webpage. |
| **3. `v-for`** | [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html) | Loops over arrays to render the Anime Cards Grid, Status Filter Pills, and Genre Options. |
| **4. `v-if / v-else-if / v-else`** | [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html) | Shows 3 color-coded status badges, the Empty Search State, and Custom Modals. |
| **5. `v-bind` or `:`** | [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html) | Dynamically sets HTML attributes like `:src="anime.image"`, `:style`, and `:class`. |
| **6. `@click` & Vue Events** | [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html) | Listens for user clicks (`@click="changeStatus"`, `@click="openRatingModal"`, `@submit.prevent="addAnime"`). |
| **7. Methods (`methods:`)** | [`app.js`](file:///C:/Users/ANIME-TRACKER/app.js) (Lines 260–395) | Contains functions that execute actions and update data (`addAnime`, `removeAnime`, `toggleFavorite`, etc.). |
| **8. Computed (`computed:`)** | [`app.js`](file:///C:/Users/ANIME-TRACKER/app.js) (Lines 170–255) | Cached calculations that automatically re-evaluate (`filteredAnime`, `featuredAnime`, `watchingCount`, etc.). |
| **9. `v-model` (Two-Way Binding)** | [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html) | Keeps input fields (search box, form title, rating slider) in sync with JavaScript data. |
| **10. `mounted()` Lifecycle Hook** | [`app.js`](file:///C:/Users/ANIME-TRACKER/app.js) (Lines 400–405) | Automatically loads saved anime data from `localStorage` as soon as the page opens. |

---

---

## 1. `data()` — Reactive State Storage

### 💡 What is it?
In Vue 3, `data()` is a function that returns an object containing all the **reactive variables** of the application. "Reactive" means whenever a variable in `data()` changes, Vue automatically re-renders the parts of the HTML that use it.

### 📍 Where is it in our codebase?
In [`app.js`](file:///C:/Users/ANIME-TRACKER/app.js) (Lines 124–165).

### 💻 Code Snippet:
```javascript
data() {
  return {
    // 1. Array storing all anime in the user's collection
    animeList: [],

    // 2. ID of the anime currently featured on the Hero Spotlight Billboard
    featuredAnimeId: 1,

    // 3. Modal visibility states
    showResetModal: false,
    ratingModal: {
      show: false,
      anime: null,
      tempRating: 8.5
    },

    // 4. Search and filter state
    searchQuery: '',
    statusFilter: 'All', // 'All', 'Watching', 'Completed', 'Plan to Watch'
    sortBy: 'default',   // 'default', 'rating-high', 'rating-low', 'title-az', 'title-za'

    // 5. Form object for creating a new anime
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

### 🎯 How it applies to AniTrack:
- When a user types into the search bar, `searchQuery` updates.
- When a user adds an anime, `animeList` grows.
- When a user clicks a card to spotlight it, `featuredAnimeId` updates.
- Vue watches all these variables and updates the screen automatically with zero manual DOM manipulation (`document.getElementById`).

---

---

## 2. `{{ }}` — Text Interpolation (Mustache Syntax)

### 💡 What is it?
Double curly braces `{{ }}` allow us to output dynamic JavaScript data or expressions directly inside our HTML template.

### 📍 Where is it in our codebase?
In [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html) across the Hero Banner, Metric Cards, and Anime Cards.

### 💻 Code Snippet:
```html
<!-- 1. Displaying the active spotlight anime title and synopsis -->
<h2 class="hero-title">{{ featuredAnime.title }}</h2>
<p class="hero-synopsis">{{ featuredAnime.synopsis }}</p>

<!-- 2. Displaying personal rating formatted to 1 decimal place -->
<span class="card-rating-badge">★ {{ anime.rating.toFixed(1) }}</span>

<!-- 3. Displaying live calculated stats -->
<span class="stat-value">{{ totalAnime }}</span>
<span class="stat-value">{{ watchingCount }}</span>
```

### 🎯 How it applies to AniTrack:
- If you change an anime's rating from `9.6` to `10.0`, `{{ anime.rating.toFixed(1) }}` immediately displays `10.0`.
- If you add a new anime, `{{ totalAnime }}` automatically changes from `10` to `11`.

---

---

## 3. `v-for` — List Rendering Directive

### 💡 What is it?
`v-for` is a loop directive in Vue that iterates over an array and renders an HTML element for every item in that array. It requires a `:key` attribute so Vue's Virtual DOM can track and update elements efficiently.

### 📍 Where is it in our codebase?
In [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html).

### 💻 Code Snippet:
```html
<!-- 1. Rendering the responsive grid of anime cards -->
<div 
  v-for="anime in filteredAnime" 
  :key="anime.id" 
  class="anime-card"
>
  <!-- Card Poster & Info -->
  <img :src="anime.image" :alt="anime.title" class="card-img">
  <h3 class="card-title">{{ anime.title }}</h3>
</div>

<!-- 2. Rendering the Category Filter Tabs -->
<button 
  v-for="status in statusOptions" 
  :key="status"
  @click="setStatusFilter(status)"
  :class="['filter-btn', { active: statusFilter === status }]"
>
  {{ status }}
</button>
```

### 🎯 How it applies to AniTrack:
- Instead of hardcoding 10 HTML cards, `v-for="anime in filteredAnime"` takes our array of anime objects and dynamically generates cards for each one.
- When you search or filter, `filteredAnime` changes, and `v-for` re-renders only the matching cards.

---

---

## 4. `v-if / v-else-if / v-else` — Conditional Rendering Directives

### 💡 What is it?
These directives conditionally add or remove elements from the DOM based on whether a boolean expression is `true` or `false`.

### 📍 Where is it in our codebase?
In [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html).

### 💻 Code Snippet:
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

<!-- 2. Empty State when search returns 0 results -->
<div v-if="filteredAnime.length === 0" class="empty-state">
  <p>No anime found matching your search.</p>
</div>
<div v-else class="anime-grid">
  <!-- Card Grid -->
</div>

<!-- 3. Custom Rating Slider Modal -->
<div v-if="ratingModal.show" class="modal-backdrop">
  <!-- Modal Card Content -->
</div>
```

### 🎯 How it applies to AniTrack:
- **Status Badges**: If status is `'Watching'`, it renders the green badge; if `'Completed'`, the blue badge; otherwise, the amber `'Plan to Watch'` badge.
- **Empty State**: If you search for `"xyz"` and find 0 anime, `v-if="filteredAnime.length === 0"` hides the grid and shows a helpful "No anime found" box with a Reset button.
- **Modals**: The Reset and Rating modals only appear in the DOM when their `v-if` boolean becomes `true`.

---

---

## 5. `v-bind` or `:` Shorthand — Dynamic Attribute Binding

### 💡 What is it?
`v-bind` (shorthand `:`) binds an HTML element's attributes (such as `src`, `alt`, `class`, `style`, `title`) to reactive JavaScript data or expressions.

### 📍 Where is it in our codebase?
In [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html).

### 💻 Code Snippet:
```html
<!-- 1. Binding Dynamic Image Sources -->
<img :src="anime.image" :alt="anime.title" class="card-img">

<!-- 2. Dynamic Backdrop Style on Hero Billboard -->
<div 
  class="hero-backdrop" 
  :style="{ backgroundImage: 'url(' + featuredAnime.image + ')' }"
></div>

<!-- 3. Dynamic Class Binding for Favorite Heart Button -->
<button :class="['card-fav-btn', { 'is-favorite': anime.isFavorite }]">
  <span v-if="anime.isFavorite">❤️</span>
  <span v-else>🤍</span>
</button>
```

### 🎯 How it applies to AniTrack:
- `:src="anime.image"` ensures each card shows its own unique cover artwork.
- `:class="{ 'is-favorite': anime.isFavorite }"` automatically adds the `.is-favorite` CSS glow class only when `anime.isFavorite` is `true`.

---

---

## 6. `@click` & Vue Event Directives

### 💡 What is it?
`@` is the shorthand for `v-on`. It listens to DOM events (clicks, form submits, keypresses, file uploads) and triggers a Vue method.

### 📍 Where is it in our codebase?
In [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html).

### 💻 Code Snippet:
```html
<!-- 1. Click Event to Cycle Watching Status -->
<button @click.stop="changeStatus(anime)">🔄 Status</button>

<!-- 2. Click Event to Open Rating Slider Modal -->
<button @click.stop="openRatingModal(anime)">★ {{ anime.rating.toFixed(1) }}</button>

<!-- 3. Click Event to Toggle Favorite -->
<button @click.stop="toggleFavorite(anime)">❤️</button>

<!-- 4. Click Event to Delete Anime -->
<button @click.stop="removeAnime(anime.id)">🗑️</button>

<!-- 5. Form Submit with .prevent modifier (stops page reload) -->
<form @submit.prevent="addAnime">
```

### 🎯 How it applies to AniTrack:
- **`@click.stop`**: The `.stop` modifier stops event bubbling (so clicking a button inside a card doesn't accidentally trigger the parent card's click event).
- **`@submit.prevent`**: The `.prevent` modifier runs `event.preventDefault()` so submitting the form adds the anime without refreshing the browser.

---

---

## 7. Methods (`methods:`) — User Action Handlers

### 💡 What is it?
The `methods:` object contains functions that handle user interactions, mutate `data()` state, and perform logic.

### 📍 Where is it in our codebase?
In [`app.js`](file:///C:/Users/ANIME-TRACKER/app.js) (Lines 260–395).

### 💻 Code Snippet:
```javascript
methods: {
  // 1. Cycle Watching Status linearly: Plan to Watch -> Watching -> Completed
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

  // 2. Toggle favorite on an anime
  toggleFavorite(anime) {
    anime.isFavorite = !anime.isFavorite;
    this.saveToStorage();
    this.showToast(anime.isFavorite ? `Added "${anime.title}" to Favorites ❤️` : `Removed from Favorites`);
  },

  // 3. Add new anime from form
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

    this.animeList.unshift(animeToAdd); // Add to top of list
    this.featuredAnimeId = animeToAdd.id; // Spotlight it
    this.saveToStorage();
    this.showToast(`Added "${animeToAdd.title}" to collection! ➕`);
  },

  // 4. Open Rating Slider Modal
  openRatingModal(anime) {
    this.ratingModal.anime = anime;
    this.ratingModal.tempRating = anime.rating;
    this.ratingModal.show = true;
  },

  // 5. Save Rating from Slider
  saveRatingModal() {
    if (this.ratingModal.anime) {
      this.ratingModal.anime.rating = Number(this.ratingModal.tempRating);
      this.saveToStorage();
      this.showToast(`Updated "${this.ratingModal.anime.title}" rating to ★ ${this.ratingModal.anime.rating.toFixed(1)}`);
    }
    this.closeRatingModal();
  }
}
```

### 🎯 How it applies to AniTrack:
- Every interactive button on the website connects to a method in `app.js`.
- Each method updates the data and calls `this.saveToStorage()` so changes are immediately remembered by the browser.

---

---

## 8. Computed Properties (`computed:`) — Cached Calculations

### 💡 What is it?
Computed properties are functions that calculate and return a value based on reactive data. **They are cached**, meaning Vue only recalculates them when their specific dependencies change.

### 📍 Where is it in our codebase?
In [`app.js`](file:///C:/Users/ANIME-TRACKER/app.js) (Lines 170–255).

### 💻 Code Snippet:
```javascript
computed: {
  // 1. Featured Spotlight Anime (Hero Billboard)
  featuredAnime() {
    return this.animeList.find(a => a.id === this.featuredAnimeId) || this.animeList[0] || {};
  },

  // 2. Multi-Criteria Filter (Search + Status Filter + Sort)
  filteredAnime() {
    let result = [...this.animeList];

    // Filter by Status Tab ('All', 'Watching', 'Completed', 'Plan to Watch')
    if (this.statusFilter !== 'All') {
      result = result.filter(anime => anime.status === this.statusFilter);
    }

    // Filter by Search Query
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

  // 3. Live Metric Statistics
  totalAnime() { return this.animeList.length; },
  watchingCount() { return this.animeList.filter(a => a.status === 'Watching').length; },
  completedCount() { return this.animeList.filter(a => a.status === 'Completed').length; },
  planToWatchCount() { return this.animeList.filter(a => a.status === 'Plan to Watch').length; },
  favoriteCount() { return this.animeList.filter(a => a.isFavorite).length; }
}
```

### 🎯 Why use Computed instead of Methods?
- If the user scrolls or hovers on a card, `filteredAnime` **does NOT recalculate** because `searchQuery` and `statusFilter` did not change.
- A regular method would re-run on every single render cycle, wasting CPU performance. Computed properties keep the application fast and responsive.

---

---

## 9. `v-model` — Two-Way Data Binding

### 💡 What is it?
`v-model` creates a **two-way data binding** between an input element (text input, slider, dropdown, textarea) and a variable in `data()`. When the user types or moves a slider, the JavaScript variable updates instantly; if the variable changes in code, the input updates automatically.

### 📍 Where is it in our codebase?
In [`index.html`](file:///C:/Users/ANIME-TRACKER/index.html) (Search box, Form inputs, Rating Slider Modal).

### 💻 Code Snippet:
```html
<!-- 1. Search Bar -->
<input type="text" v-model="searchQuery" placeholder="Search anime...">

<!-- 2. Form Title Input -->
<input type="text" v-model="newAnime.title" required>

<!-- 3. Form Rating Range Slider (with .number modifier) -->
<input type="range" min="1" max="10" step="0.1" v-model.number="newAnime.rating">

<!-- 4. Story Summary Textarea -->
<textarea v-model="newAnime.synopsis"></textarea>

<!-- 5. Genre & Status Dropdowns -->
<select v-model="newAnime.genre">
<select v-model="newAnime.status">
```

---

---

## 10. `mounted()` Lifecycle Hook & `localStorage`

### 💡 What is it?
`mounted()` is a Vue lifecycle hook that runs **automatically once when the application is first mounted onto the DOM**. We use it to read data from `localStorage`.

### 📍 Where is it in our codebase?
In [`app.js`](file:///C:/Users/ANIME-TRACKER/app.js) (Lines 400–405).

### 💻 Code Snippet:
```javascript
mounted() {
  // Automatically loads saved collection and spotlight when the website opens
  this.loadFromStorage();
}
```

---

## 🏆 Summary Checklist for Your 2:00 PM Presentation

If your teacher points to ANY feature on your screen:
1. **The Hero Billboard?** $\rightarrow$ Powered by `computed: featuredAnime` and `v-bind:style`.
2. **The 5 Metric Counters?** $\rightarrow$ Powered by `computed: totalAnime`, `watchingCount`, etc., displayed via `{{ }}`.
3. **The Cards Grid?** $\rightarrow$ Powered by `v-for="anime in filteredAnime"` with `:key="anime.id"`.
4. **The Status Badges?** $\rightarrow$ Powered by `v-if`, `v-else-if`, `v-else`.
5. **The Rating Slider Modal?** $\rightarrow$ Powered by `v-if="ratingModal.show"`, `v-model.number`, and `saveRatingModal()`.
6. **The Search Bar & Filter Tabs?** $\rightarrow$ Powered by `v-model="searchQuery"`, `@click="setStatusFilter"`, and `computed: filteredAnime`.
7. **Form & JPG Upload?** $\rightarrow$ Powered by `@submit.prevent="addAnime"`, `v-model`, and HTML5 `FileReader`.

You are 100% prepared to explain every line of code with complete confidence! 🚀
