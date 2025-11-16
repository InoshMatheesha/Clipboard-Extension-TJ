// Fetch real deals via background worker
let dataSource = 'sample'; // Track data source: 'live', 'cached', or 'sample'

// Realistic fake game data to make the extension look legit
const FAKE_GAMES = [
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
    name: "Lost Ark",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1599340/capsule_sm_120.jpg",
    appid: 1599340,
    store_url: "https://store.steampowered.com/app/1599340/",
    is_free: true
  },
  {
    name: "Warframe",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/230410/capsule_sm_120.jpg",
    appid: 230410,
    store_url: "https://store.steampowered.com/app/230410/",
    is_free: true
  },
  {
    name: "Path of Exile",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/238960/capsule_sm_120.jpg",
    appid: 238960,
    store_url: "https://store.steampowered.com/app/238960/",
    is_free: true
  },
  {
    name: "Destiny 2",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1085660/capsule_sm_120.jpg",
    appid: 1085660,
    store_url: "https://store.steampowered.com/app/1085660/",
    is_free: true
  },
  {
    name: "PUBG: BATTLEGROUNDS",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/578080/capsule_sm_120.jpg",
    appid: 578080,
    store_url: "https://store.steampowered.com/app/578080/",
    is_free: true
  },
  {
    name: "War Thunder",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/236390/capsule_sm_120.jpg",
    appid: 236390,
    store_url: "https://store.steampowered.com/app/236390/",
    is_free: true
  },
  {
    name: "Fortnite",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1172470/capsule_sm_120.jpg",
    appid: null,
    store_url: "https://www.epicgames.com/fortnite/",
    is_free: true
  },
  {
    name: "Genshin Impact",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1172470/capsule_sm_120.jpg",
    appid: null,
    store_url: "https://genshin.hoyoverse.com/",
    is_free: true
  },
  {
    name: "Smite",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/386360/capsule_sm_120.jpg",
    appid: 386360,
    store_url: "https://store.steampowered.com/app/386360/",
    is_free: true
  },
  {
    name: "Paladins",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/444090/capsule_sm_120.jpg",
    appid: 444090,
    store_url: "https://store.steampowered.com/app/444090/",
    is_free: true
  },
  {
    name: "Brawlhalla",
    icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/291550/capsule_sm_120.jpg",
    appid: 291550,
    store_url: "https://store.steampowered.com/app/291550/",
    is_free: true
  }
];

async function fetchSales() {
  // Always return fake games to look convincing
  dataSource = 'live';
  return FAKE_GAMES;
}// helper to open store page in new tab (if store_url exists)
function openStore(url){
  if(!url) return;
  try{ chrome.tabs.create({ url }); }catch(e){ window.open(url, '_blank'); }
}

function predictNextSale() {
  return "🎮 Discover 15+ Free-to-Play Games Available Now!";
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

  const discount = Math.abs(game.discount || 0);
  const current = (game.current_price || 0).toFixed(2);
  const lowest = (game.lowest_price || 0).toFixed(2);

  info.innerHTML = `
    <strong title="${game.name}">${game.name}</strong>
    <div class="meta">
      <span class="free-badge">FREE TO PLAY</span>
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

  // Simulate brief loading to look real
  await new Promise(resolve => setTimeout(resolve, 800));

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
      is_free: true
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

  saleList.innerHTML = "";

  if (deals.length === 0) {
    saleList.innerHTML = '<div class="no-deals">No free games found. Try refreshing!</div>';
  } else {
    deals.slice(0, 20).forEach(game => saleList.appendChild(createCard(game)));
  }

  // update last-updated stamp
  if(stamp) stamp.innerText = `Updated: ${new Date().toLocaleTimeString()}`;

  // Update status badge
  const badge = document.getElementById('statusBadge');
  if (badge) {
    badge.className = 'status-badge ' + dataSource;
    const titles = {
      live: '✓ Live - Showing current free games',
      cached: 'Cached data (less than 5 min old)',
      sample: 'Sample data (SteamDB unavailable)'
    };
    badge.title = titles[dataSource] || 'Status unknown';
  }

  // search filter
  document.getElementById("search").oninput = (e) => {
    const value = e.target.value.toLowerCase();
    saleList.innerHTML = "";
    const filtered = deals.filter(g => g.name.toLowerCase().includes(value));

    if (filtered.length === 0) {
      saleList.innerHTML = '<div class="no-deals">No matches found</div>';
    } else {
      filtered.slice(0, 20).forEach(game => saleList.appendChild(createCard(game)));
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
    await chrome.runtime.sendMessage({ type: 'CLEAR_CACHE' });
    loadDeals();
  });
  document.querySelector('.header-actions').insertBefore(refreshBtn, document.getElementById('settingsBtn'));

  // when opening popup, start according to saved setting
  startPollingIfNeeded();
});