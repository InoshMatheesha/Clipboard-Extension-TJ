// Fetch real deals via background worker
let dataSource = 'sample'; // Track data source: 'live', 'cached', or 'sample'
let cachedGames = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Realistic fake game data as fallback
const FALLBACK_GAMES = [
  {
    name: "Counter-Strike 2",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/capsule_sm_120.jpg",
    appid: 730,
    store_url: "https://store.steampowered.com/app/730/",
    is_free: true
  },
  {
    name: "Dota 2",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/570/capsule_sm_120.jpg",
    appid: 570,
    store_url: "https://store.steampowered.com/app/570/",
    is_free: true
  },
  {
    name: "Team Fortress 2",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/440/capsule_sm_120.jpg",
    appid: 440,
    store_url: "https://store.steampowered.com/app/440/",
    is_free: true
  },
  {
    name: "Apex Legends",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1172470/capsule_sm_120.jpg",
    appid: 1172470,
    store_url: "https://store.steampowered.com/app/1172470/",
    is_free: true
  },
  {
    name: "Warframe",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/230410/capsule_sm_120.jpg",
    appid: 230410,
    store_url: "https://store.steampowered.com/app/230410/",
    is_free: true
  }
];

async function fetchSales() {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cachedGames && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('Using cached games data');
      dataSource = 'cached';
      return cachedGames;
    }

    // Fetch from real Free-to-Game API
    console.log('Fetching fresh games from FreeToGame API...');
    const response = await fetch('https://www.freetogame.com/api/games', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const games = await response.json();
    
    // Transform API response to our format
    const transformedGames = games.map(game => ({
      name: game.title,
      icon: game.thumbnail,
      appid: game.id,
      store_url: game.game_url,
      is_free: true,
      genre: game.genre,
      platform: game.platform,
      publisher: game.publisher,
      short_description: game.short_description
    }));

    // Cache the results
    cachedGames = transformedGames;
    cacheTimestamp = now;
    dataSource = 'live';
    
    console.log(`Successfully loaded ${transformedGames.length} games from FreeToGame API`);
    return transformedGames;
    
  } catch (error) {
    console.warn('Failed to fetch from FreeToGame API, using fallback:', error);
    dataSource = 'sample';
    return FALLBACK_GAMES;
  }
}// helper to open store page in new tab (if store_url exists)
function openStore(url){
  if(!url) return;
  try{ chrome.tabs.create({ url }); }catch(e){ window.open(url, '_blank'); }
}

function predictNextSale() {
  const count = cachedGames ? cachedGames.length : '500+';
  return `🎮 Discover ${count} Free-to-Play Games Available Now!`;
}

function createCard(game) {
  const card = document.createElement("div");
  card.className = "deal-card";

  const img = document.createElement("img");
  img.src = game.icon || "https://via.placeholder.com/84x42?text=No+Image";
  img.loading = "lazy";
  img.onerror = () => { img.src = "https://via.placeholder.com/84x42?text=No+Image"; };

  const info = document.createElement("div");
  info.className = "deal-info";

  // Create game info with genre and platform if available
  let metaHTML = '<span class="free-badge">FREE TO PLAY</span>';
  
  if (game.genre) {
    metaHTML += `<span class="genre-tag">${game.genre}</span>`;
  }
  
  if (game.platform) {
    metaHTML += `<span class="platform-tag">${game.platform}</span>`;
  }

  info.innerHTML = `
    <strong title="${game.name}">${game.name}</strong>
    ${game.short_description ? `<p class="game-desc">${game.short_description.substring(0, 80)}${game.short_description.length > 80 ? '...' : ''}</p>` : ''}
    <div class="meta">
      ${metaHTML}
    </div>
  `;

  card.appendChild(img);
  card.appendChild(info);

  // click opens store page if available
  card.addEventListener('click', () => {
    if (game.store_url) openStore(game.store_url);
    else if (game.appid) openStore(`https://store.steampowered.com/app/${game.appid}`);
  });

  card.style.cursor = 'pointer';

  return card;
}

async function loadDeals() {
  const saleList = document.getElementById("dealList");
  const nextSaleBox = document.getElementById("nextSale");
  const stamp = document.getElementById('lastUpdated');

  // Show loading state
  saleList.innerHTML = '<div class="loading">🔍 Searching for free games...</div>';
  nextSaleBox.innerText = predictNextSale();

  let deals = await fetchSales();

  // normalize and filter: for free games, show all
  deals = (deals || [])
    .map(g => ({
      icon: g.icon || g.img || g.image || "",
      name: g.name || g.title || g.app_name || "Unknown",
      discount: 0, // Free games have no discount
      current_price: 0, // Free
      lowest_price: 0, // Free
      appid: g.appid,
      store_url: g.store_url,
      is_free: true,
      genre: g.genre,
      platform: g.platform,
      short_description: g.short_description
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

  saleList.innerHTML = "";

  if (deals.length === 0) {
    saleList.innerHTML = '<div class="no-deals">No free games found. Try refreshing!</div>';
  } else {
    deals.slice(0, 50).forEach(game => saleList.appendChild(createCard(game)));
  }

  // Update the header with actual count
  nextSaleBox.innerText = `🎮 Discover ${deals.length} Free-to-Play Games Available Now!`;

  // update last-updated stamp
  if(stamp) stamp.innerText = `Updated: ${new Date().toLocaleTimeString()}`;

  // Update status badge
  const badge = document.getElementById('statusBadge');
  if (badge) {
    badge.className = 'status-badge ' + dataSource;
    const titles = {
      live: '✓ Live - Fresh data from FreeToGame API',
      cached: '📦 Cached - Data less than 5 min old',
      sample: '⚠️ Offline - Using fallback data'
    };
    badge.title = titles[dataSource] || 'Status unknown';
  }

  // search filter
  document.getElementById("search").oninput = (e) => {
    const value = e.target.value.toLowerCase();
    saleList.innerHTML = "";
    const filtered = deals.filter(g => 
      g.name.toLowerCase().includes(value) || 
      (g.genre && g.genre.toLowerCase().includes(value)) ||
      (g.platform && g.platform.toLowerCase().includes(value))
    );

    if (filtered.length === 0) {
      saleList.innerHTML = '<div class="no-deals">No matches found</div>';
    } else {
      filtered.slice(0, 50).forEach(game => saleList.appendChild(createCard(game)));
    }
  };
}

// Settings + polling support
let pollInterval = null;
const POLL_MS = 2 * 60 * 1000; // 2 minutes for live polling

async function startPollingIfNeeded(){
  const cfg = await chrome.storage.local.get(['liveEnabled']);
  const live = cfg.liveEnabled;
  stopPolling();
  if(live){
    // initial load and then periodic refresh while popup is open
    loadDeals();
    pollInterval = setInterval(loadDeals, POLL_MS);
  } else {
    // single load
    loadDeals();
  }
}

function stopPolling(){ if(pollInterval){ clearInterval(pollInterval); pollInterval = null; } }

// Settings UI wiring
function showSettings(show){
  const modal = document.getElementById('settings');
  modal.setAttribute('aria-hidden', show ? 'false' : 'true');
}

async function saveSettings(){
  const live = document.getElementById('liveToggle').checked;
  await chrome.storage.local.set({ liveEnabled: live });

  // Clear cache when toggling live mode
  await chrome.runtime.sendMessage({ type: 'CLEAR_CACHE' });

  showSettings(false);
  startPollingIfNeeded();
}

async function loadSettingsToUI(){
  const cfg = await chrome.storage.local.get(['liveEnabled']);
  document.getElementById('liveToggle').checked = !!cfg.liveEnabled;
}

// wire modal buttons
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('settingsBtn').addEventListener('click', () => { loadSettingsToUI().then(()=> showSettings(true)); });
  document.getElementById('closeSettings').addEventListener('click', ()=> showSettings(false));
  document.getElementById('saveSettings').addEventListener('click', saveSettings);

  // Add refresh button functionality
  const refreshBtn = document.createElement('button');
  refreshBtn.className = 'icon-btn';
  refreshBtn.innerHTML = '🔄';
  refreshBtn.title = 'Refresh free games';
  refreshBtn.addEventListener('click', async () => {
    // Clear cache to force fresh fetch
    cachedGames = null;
    cacheTimestamp = 0;
    loadDeals();
  });
  document.querySelector('.header-actions').insertBefore(refreshBtn, document.getElementById('settingsBtn'));

  // when opening popup, start according to saved setting
  startPollingIfNeeded();
});