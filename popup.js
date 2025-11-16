// Fetch real deals via background worker
let dataSource = 'sample'; // Track data source: 'live', 'cached', or 'sample'

async function fetchSales() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_DEALS' });

    if (response.success && response.data) {
      console.log(`Loaded ${response.data.length} deals (${response.cached ? 'cached' : 'fresh'})`);
      dataSource = response.cached ? 'cached' : 'live';
      return response.data;
    } else {
      console.warn('Failed to fetch deals, using fallback:', response.error);
      dataSource = 'sample';
      return await loadFallbackDeals();
    }
  } catch (e) {
    console.warn("Error fetching deals, using fallback:", e);
    dataSource = 'sample';
    return await loadFallbackDeals();
  }
}

// Fallback to local sample data
async function loadFallbackDeals() {
  try {
    const local = await fetch("sample_deals.json");
    const arr = await local.json();
    return arr;
  } catch (err) {
    console.error("Failed to load fallback data", err);
    return [];
  }
}// helper to open store page in new tab (if store_url exists)
function openStore(url){
  if(!url) return;
  try{ chrome.tabs.create({ url }); }catch(e){ window.open(url, '_blank'); }
}

function predictNextSale() {
  return "Discover free games available now on Steam";
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
  saleList.innerHTML = '<div class="loading">Loading free games from SteamDB...</div>';
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
      live: 'Live data from SteamDB Free Games API',
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