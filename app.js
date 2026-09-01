
// Initial 10 anime matching the user's personal collection and images in images/
const INITIAL_ANIME_DATA = [
  {
    id: 1,
    title: "Komi Can't Communicate",
    genre: "Comedy",
    rating: 9.3,
    status: "Watching",
    image: "images/komi.jpg",
    isFavorite: true,
    synopsis: "An extremely timid high school girl with severe social anxiety seeks to overcome her communication disorder and make 100 friends with the help of a classmate."
  },
  {
    id: 2,
    title: "Bleach: Thousand-Year Blood War",
    genre: "Supernatural",
    rating: 9.6,
    status: "Completed",
    image: "images/bleach.jpg",
    isFavorite: true,
    synopsis: "The peace is suddenly broken when warning sirens blare through Soul Society as the Quincy king initiates a total war against the Soul Reapers."
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    genre: "Supernatural",
    rating: 9.2,
    status: "Watching",
    image: "images/jujutsukaisen.jpg",
    isFavorite: true,
    synopsis: "Yuji Itadori swallows a cursed finger to save his friends and joins Tokyo Jujutsu High to exorcise powerful curses alongside his classmates."
  },
  {
    id: 4,
    title: "Hell's Paradise (Jigokuraku)",
    genre: "Fantasy",
    rating: 9.0,
    status: "Watching",
    image: "images/hellsparadise.jpg",
    isFavorite: false,
    synopsis: "Gabimaru the Hollow, an immortal ninja assassin on death row, is offered a royal pardon if he retrieves the Elixir of Immortality from a mysterious paradise."
  },
  {
    id: 5,
    title: "Mushoku Tensei: Jobless Reincarnation",
    genre: "Fantasy",
    rating: 9.5,
    status: "Watching",
    image: "images/joblessreincarnation.jpg",
    isFavorite: true,
    synopsis: "A 34-year-old shut-in is reincarnated into a magical world as Rudeus Greyrat, resolving to conquer his past regrets and live his new life to the fullest."
  },
  {
    id: 6,
    title: "Vinland Saga",
    genre: "Drama",
    rating: 9.7,
    status: "Completed",
    image: "images/vinlandsaga.jpg",
    isFavorite: true,
    synopsis: "Young Thorfinn embarks on a perilous quest of vengeance against his father's killer, navigating brutal Viking battles and philosophical growth."
  },
  {
    id: 7,
    title: "The Angel Next Door Spoils Me Rotten",
    genre: "Romance",
    rating: 8.9,
    status: "Completed",
    image: "images/angelnextdoor.jpg",
    isFavorite: false,
    synopsis: "A slow and heartwarming romance unfolds between an unmotivated high school boy and the angel of the school after an umbrella is shared on a rainy day."
  },
  {
    id: 8,
    title: "One Piece",
    genre: "Adventure",
    rating: 9.4,
    status: "Watching",
    image: "images/onepiece.jpg",
    isFavorite: true,
    synopsis: "Monkey D. Luffy and the Straw Hat Pirates sail across the Grand Line in search of the legendary One Piece treasure to become the next Pirate King."
  },
  {
    id: 9,
    title: "My Hero Academia",
    genre: "Action",
    rating: 8.8,
    status: "Completed",
    image: "images/myheroacademia.jpg",
    isFavorite: false,
    synopsis: "Born without superpowers in a world where everyone has them, Izuku Midoriya inherits the power of the greatest hero, All Might, and attends UA High."
  },
  {
    id: 10,
    title: "Dragon Ball Super",
    genre: "Action",
    rating: 9.1,
    status: "Plan to Watch",
    image: "images/dragonball.jpg",
    isFavorite: false,
    synopsis: "Goku and the Z-Fighters battle against gods, cosmic tournaments, and legendary warriors across the multiverse to reach new divine transformations."
  }
];

// Initialize Vue 3 Application
const app = Vue.createApp({
  /* =========================================================================
     [REQUIREMENT 1] data() - REACTIVE STATE STORAGE
     ========================================================================= */
  data() {
    return {
      // Main watchlist array
      animeList: [],

      // Explicitly chosen Spotlight Anime ID (Dynamic Spotlight feature)
      featuredAnimeId: 1,

      // Modal state for custom Reset confirmation dialog
      showResetModal: false,

      // Modal state for custom Rating Slider dialog
      ratingModal: {
        show: false,
        anime: null,
        tempRating: 8.5
      },

      // Search, filter & sorting state
      searchQuery: '',
      statusFilter: 'All', // 'All', 'Watching', 'Completed', 'Plan to Watch'
      sortBy: 'default',   // 'default', 'rating-high', 'rating-low', 'title-az', 'title-za'

      // New anime form model
      newAnime: {
        title: '',
        genre: 'Action',
        rating: 8.5,
        status: 'Plan to Watch',
        image: 'images/komi.jpg',
        synopsis: ''
      },

      // Form & filter options
      statusOptions: ['All', 'Watching', 'Completed', 'Plan to Watch'],
      availableGenres: [
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Fantasy',
        'Romance',
        'Sci-Fi',
        'Slice of Life',
        'Sports',
        'Supernatural'
      ],

      // Preset cover files from user's actual collected images
      presetImages: [
        { label: 'komi.jpg', path: 'images/komi.jpg' },
        { label: 'bleach.jpg', path: 'images/bleach.jpg' },
        { label: 'jujutsukaisen.jpg', path: 'images/jujutsukaisen.jpg' },
        { label: 'hellsparadise.jpg', path: 'images/hellsparadise.jpg' },
        { label: 'joblessreincarnation.jpg', path: 'images/joblessreincarnation.jpg' },
        { label: 'vinlandsaga.jpg', path: 'images/vinlandsaga.jpg' },
        { label: 'angelnextdoor.jpg', path: 'images/angelnextdoor.jpg' },
        { label: 'onepiece.jpg', path: 'images/onepiece.jpg' },
        { label: 'myheroacademia.jpg', path: 'images/myheroacademia.jpg' },
        { label: 'dragonball.jpg', path: 'images/dragonball.jpg' }
      ],

      // UI helpers
      formError: '',
      toastMessage: '',
      toastTimeout: null
    };
  },

  /* =========================================================================
     [REQUIREMENT 8] computed - COMPUTED PROPERTIES
     ========================================================================= */
  computed: {
    // 1. Dynamic Featured Anime Billboard (Switchable & Reactive)
    featuredAnime() {
      if (this.animeList.length === 0) return null;
      
      // Find the user's selected spotlight anime by ID
      const chosen = this.animeList.find(a => a.id === this.featuredAnimeId);
      if (chosen) return chosen;

      // Fallback to first favorited anime or first item
      const fav = this.animeList.find(a => a.isFavorite);
      return fav || this.animeList[0];
    },

    // 2. Real-time Search, Filter, and Sort
    filteredAnime() {
      let list = this.animeList.filter(anime => {
        const matchesSearch = 
          anime.title.toLowerCase().includes(this.searchQuery.toLowerCase().trim()) ||
          anime.genre.toLowerCase().includes(this.searchQuery.toLowerCase().trim());
        
        const matchesStatus = 
          this.statusFilter === 'All' || anime.status === this.statusFilter;

        return matchesSearch && matchesStatus;
      });

      // Sorting
      if (this.sortBy === 'rating-high') {
        list = [...list].sort((a, b) => b.rating - a.rating);
      } else if (this.sortBy === 'rating-low') {
        list = [...list].sort((a, b) => a.rating - b.rating);
      } else if (this.sortBy === 'title-az') {
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === 'title-za') {
        list = [...list].sort((a, b) => b.title.localeCompare(a.title));
      }

      return list;
    },

    // 3. Total Anime Count
    totalAnime() {
      return this.animeList.length;
    },

    // 4. Currently Watching Count
    watchingCount() {
      return this.animeList.filter(anime => anime.status === 'Watching').length;
    },

    // 5. Completed Count
    completedCount() {
      return this.animeList.filter(anime => anime.status === 'Completed').length;
    },

    // 6. Plan to Watch Count
    planToWatchCount() {
      return this.animeList.filter(anime => anime.status === 'Plan to Watch').length;
    },

    // 7. Favorite Count
    favoriteCount() {
      return this.animeList.filter(anime => anime.isFavorite).length;
    }
  },

  /* =========================================================================
     [REQUIREMENT 7] methods - USER ACTION HANDLERS
     ========================================================================= */
  methods: {
    // Action 1: Set specific anime as Featured Spotlight Hero
    setSpotlight(anime) {
      this.featuredAnimeId = anime.id;
      this.showToast(`Set "${anime.title}" as Spotlight! ✨`);
      
      // Smooth scroll to top billboard
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Action 2: Cycle to the next anime in the Spotlight Billboard
    nextSpotlight() {
      if (this.animeList.length <= 1) return;
      
      const currentIndex = this.animeList.findIndex(a => a.id === this.featuredAnime.id);
      const nextIndex = (currentIndex + 1) % this.animeList.length;
      this.featuredAnimeId = this.animeList[nextIndex].id;
      this.showToast(`Spotlight: "${this.animeList[nextIndex].title}"`);
    },

    // Action 3: Open Custom Rating Slider Modal
    openRatingModal(anime) {
      this.ratingModal.anime = anime;
      this.ratingModal.tempRating = anime.rating;
      this.ratingModal.show = true;
    },

    // Action 4: Close Custom Rating Slider Modal
    closeRatingModal() {
      this.ratingModal.show = false;
      this.ratingModal.anime = null;
    },

    // Action 5: Save New Rating from Slider Modal
    saveRatingModal() {
      if (this.ratingModal.anime) {
        this.ratingModal.anime.rating = Number(this.ratingModal.tempRating);
        this.saveToStorage();
        this.showToast(`Updated "${this.ratingModal.anime.title}" rating to ★ ${this.ratingModal.anime.rating.toFixed(1)} / 10`);
      }
      this.closeRatingModal();
    },

    // Action 4: Toggle favorite state
    toggleFavorite(anime) {
      anime.isFavorite = !anime.isFavorite;
      this.saveToStorage();
      
      const message = anime.isFavorite 
        ? `Added "${anime.title}" to Favorites` 
        : `Removed "${anime.title}" from Favorites`;
      this.showToast(message);
    },

    // Action 4: Cycle watching status (Plan to Watch -> Watching -> Completed -> Plan to Watch)
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

    // Action 5: Remove anime from collection
    removeAnime(id) {
      const animeToRemove = this.animeList.find(item => item.id === id);
      const title = animeToRemove ? animeToRemove.title : 'Anime';
      
      this.animeList = this.animeList.filter(item => item.id !== id);
      
      // If deleted item was currently featured, update featured ID
      if (this.featuredAnimeId === id && this.animeList.length > 0) {
        this.featuredAnimeId = this.animeList[0].id;
      }

      this.saveToStorage();
      this.showToast(`Removed "${title}" from watchlist`);
    },

    // Action 6: Add a new anime to the watchlist
    addAnime() {
      // Validate title
      if (!this.newAnime.title || this.newAnime.title.trim() === '') {
        this.formError = 'Please enter an anime title.';
        return;
      }

      this.formError = '';

      // Create new anime item
      const createdAnime = {
        id: Date.now(),
        title: this.newAnime.title.trim(),
        genre: this.newAnime.genre,
        rating: parseFloat(this.newAnime.rating) || 8.0,
        status: this.newAnime.status,
        image: this.newAnime.image.trim() || 'images/komi.jpg',
        isFavorite: false,
        synopsis: this.newAnime.synopsis.trim() || 'A newly added anime in your personal watchlist collection.'
      };

      // Add to top of array
      this.animeList.unshift(createdAnime);
      
      // Automatically make newly added anime the spotlight hero!
      this.featuredAnimeId = createdAnime.id;

      this.saveToStorage();
      this.showToast(`Added "${createdAnime.title}" to watchlist!`);

      // Reset form fields
      this.newAnime.title = '';
      this.newAnime.genre = 'Action';
      this.newAnime.rating = 8.5;
      this.newAnime.status = 'Plan to Watch';
      this.newAnime.image = 'images/komi.jpg';
      this.newAnime.synopsis = '';

      // Smooth scroll back to billboard hero
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Helper: Select preset cover filename
    setFormImage(imagePath) {
      this.newAnime.image = imagePath;
    },

    // Action 7: Handle local image file picker upload from PC
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.newAnime.image = e.target.result;
        this.showToast(`Loaded "${file.name}"! 🖼️`);
      };
      reader.readAsDataURL(file);
    },

    // Action 8: Change status filter tab
    setStatusFilter(status) {
      this.statusFilter = status;
    },

    // Helper: Reset search & filter query
    resetFilters() {
      this.searchQuery = '';
      this.statusFilter = 'All';
      this.sortBy = 'default';
      this.showToast('Filters reset');
    },

    // Action 9: Open / Close custom Reset Confirmation Modal
    openResetModal() {
      this.showResetModal = true;
    },

    closeResetModal() {
      this.showResetModal = false;
    },

    // Action 10: Confirm Reset Watchlist to Original 10 Anime
    confirmReset() {
      this.animeList = JSON.parse(JSON.stringify(INITIAL_ANIME_DATA));
      this.featuredAnimeId = this.animeList[0].id;
      this.saveToStorage();
      this.resetFilters();
      this.closeResetModal();
      this.showToast('Watchlist reset to original collection! ✨');
    },

    // LocalStorage Helper: Save state
    saveToStorage() {
      try {
        localStorage.setItem('anitrack_user_collection_v1', JSON.stringify(this.animeList));
        localStorage.setItem('anitrack_spotlight_id_v1', this.featuredAnimeId);
      } catch (e) {
        console.warn('Could not save to localStorage:', e);
      }
    },

    // LocalStorage Helper: Load state
    loadFromStorage() {
      try {
        const savedData = localStorage.getItem('anitrack_user_collection_v1');
        const savedSpotlight = localStorage.getItem('anitrack_spotlight_id_v1');
        
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.animeList = parsed;
            this.featuredAnimeId = savedSpotlight ? parseInt(savedSpotlight) : parsed[0].id;
            return;
          }
        }
      } catch (e) {
        console.warn('Could not read from localStorage:', e);
      }
      this.animeList = JSON.parse(JSON.stringify(INITIAL_ANIME_DATA));
      this.featuredAnimeId = 1;
    },

    // UI Helper: Toast notification popup
    showToast(msg) {
      this.toastMessage = msg;
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }
      this.toastTimeout = setTimeout(() => {
        this.toastMessage = '';
      }, 2400);
    }
  },

  /* =========================================================================
     LIFECYCLE HOOK - mounted()
     ========================================================================= */
  mounted() {
    this.loadFromStorage();
  }
});

// Mount Vue application to #app element
app.mount('#app');
