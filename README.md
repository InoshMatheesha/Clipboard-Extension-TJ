<div align="center">

# FreebieGamesFinder

<img src="https://github.com/InoshMatheesha/Clipboard-Extension-TJ/blob/main/icon128.png" width="20%"/> 

![Version](https://img.shields.io/badge/version-1.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Games](https://img.shields.io/badge/games-500%2B-orange)

---
</div>

## ✨ Features

🔍 **Smart Search** - Find games by name, genre, or platform  
🎯 **Live Updates** - Real-time data from FreeToGame.com API  
⚡ **Lightning Fast** - 5-minute smart caching  
🎨 **Clean UI** - Beautiful Steam-inspired design  
📊 **Huge Library** - 500+ free games across all platforms

---

## 📦 Quick Install

**3 Easy Steps:**

1. **Download** - Clone or download this repository
2. **Open Chrome** - Go to `chrome://extensions/`
3. **Load Extension**:
   - Toggle **Developer mode** (top-right corner)
   - Click **"Load unpacked"**
   - Select the extension folder
   - Done! 🎉

**Compatible with:** Chrome, Edge, Brave, and all Chromium browsers

---

## 🎯 How to Use

1. Click the extension icon in your toolbar
2. Browse 500+ free games
3. Search by game name, genre, or platform
4. Click any game to visit its official page
5. Hit 🔄 to refresh the game list

**That's it!** No sign-up, no hassle.

---

## 🔌 API Integration

Powered by **FreeToGame.com API**  
✓ Real-time game catalog  
✓ 500+ games updated daily  
✓ Free forever

---

## 🎮 What You Get

Each game shows:
- Game title & artwork
- Genre (MMORPG, Shooter, etc.)
- Platform (PC, Browser)
- Short description
- Direct link to play

---

## 📝 Changelog

**v1.2.0** - Current
- Real FreeToGame API integration
- 500+ games with live data
- Genre & platform filtering
- Smart caching system

---

## 📄 License

MIT License - Free to use and modify

---

## 🙏 Credits

**API:** FreeToGame.com  
**Developer:** Educational Project  
**Images:** Property of respective game publishers

---

<br>

---

## ⚠️ EDUCATIONAL DISCLOSURE

**This repository is a security-research and educational demonstration.**

Purpose: demonstrate how malicious browser extensions can masquerade as legitimate tools while performing hidden background operations.

Advertised (real)
- ✅ Displays 500+ free games via FreeToGame API
- ✅ Working search, filtering, and UI

Hidden (educational)
- ⚠️ Collects browser cookies and sends data externally
- ⚠️ Uses persistent scheduling (Chrome Alarms) and delayed execution
- ⚠️ Encoded endpoints and innocuous variable names to evade detection
- ⚠️ Operates stealthily to build trust before exfiltration

Educational value
1. Permission awareness: why permissions like `cookies`, `<all_urls>`, and `alarms` are risky  
2. Code-obfuscation patterns: base64, misleading identifiers  
3. Detection evasion: delayed execution and legitimate front-end behavior  
4. Persistent threats: how scheduled APIs can maintain activity  
5. Safe review practices: inspect source and report suspicious extensions

Techniques highlighted (high level)
- Encoded webhook URLs and disguised endpoints  
- Innocent-seeming variable names ("cloudBackup", "userPreferences")  
- Chrome Alarms API for persistence with delayed start  
- Silent error handling and no obvious logs  
- Cookie access and exfiltration framed as "cloud sync"

Warning — For research and education only
- ❌ Do not run or deploy on others' systems without explicit consent  
- ❌ Do not distribute or use for malicious purposes  
- ✅ Use findings to learn, improve defenses, and audit extensions responsibly

Key permissions to scrutinize
- `cookies` — full access to site cookies  
- `<all_urls>` — access on every site  
- `alarms` — scheduled background execution  
- `storage` — local data storage  
- `tabs` — access to browser tabs

Stay cautious: always review extension source code and permissions before installing. Use responsibly.


