<div align="center"><div align="center">

```text

``` ██████   ██████   ██   ██  ███████  ███████ 

 ██████╗ ██████╗  ██████╗ ██╗  ██╗██╗███████╗██      ██    ██  ██  ██   ██       ██      

██╔════╝██╔═══██╗██╔═══██╗██║ ██╔╝██║██╔════╝██      ██    ██  ██ ██    ██ █████  █████   

██║     ██║   ██║██║   ██║█████╔╝ ██║█████╗  ██      ██    ██  █████     ██  ███  ██  ██  

██║     ██║   ██║██║   ██║██╔═██╗ ██║██╔══╝  <div align="center">

╚██████╗╚██████╔╝╚██████╔╝██║  ██╗██║███████╗```text

 ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ██████   ██████   ██   ██  ███████  ███████ 

                                              ██      ██    ██  ██  ██   ██       ██      

███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗██████╗ ██      ██    ██  ██ ██    ██ █████  █████   

██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██      ██    ██  █████     ██  ███  ██  ██  

█████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██████╔╝██      ██    ██  ██ ██    ██   ██  ██   ██ 

██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██╔══██╗██      ██    ██  ██  ██   ██    ██ ██    ██ 

███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████╗██║  ██║ ██████   ██████   ██   ██  ███████  ███████ 

╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

```███████  ██    ██  ██████   ██████   ███████ 

██       ██    ██ ██    ██ ██    ██  ██      

### 🔐 Educational Browser Cookie Analyzer██████   ██    ██ ██    ██ ██    ██  █████   

██        ██  ██  ██    ██ ██    ██  ██      

![License](https://img.shields.io/badge/license-MIT-blue.svg)██         ████    ██████   ██████   ██      

![Manifest](https://img.shields.io/badge/manifest-v3-green.svg)██          ██                                

![Purpose](https://img.shields.io/badge/purpose-educational-orange.svg)███████     ██                               

```

**A powerful educational tool for understanding browser cookie mechanics and security implications**</div>



[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Security](#-security-notice) • [License](#-license)# Cookie Exporter



---A small, educational browser extension for demonstrating how cookie data can be read via extension APIs. Designed for learning, security research, and awareness — not for malicious use.



</div>## Why this exists

- Teach: how cookies are structured and what security flags mean.

## 🎯 Overview- Demonstrate: the risks of broad extension permissions.

- Audit: help developers and defenders recognize risky behavior.

Cookie Exporter is a lightweight browser extension designed for **security researchers, developers, and students** to explore how cookies work under the hood. This tool demonstrates the power—and risks—of browser extension permissions.

## Highlights

### 💡 Why This Exists- Export cookies from the current tab or all domains (for lab/testing only).

- Produces a readable text file grouped by domain with attributes (Secure, HttpOnly, SameSite, expiry).

```- Optional webhook/demo sender (configure or remove before use).

🎓 Education    → Learn cookie structure, attributes, and security flags

🔍 Research     → Analyze cookie behavior across different domains  ## Quick Start (Research Only)

⚠️  Awareness   → Understand extension permission risks1. Clone or download this repo.

🛡️  Defense     → Help developers build more secure applications2. In Chrome/Edge/Brave: go to chrome://extensions/, enable Developer mode.

```3. Click "Load unpacked" and select this folder.

4. Click the extension icon and choose an export option.

## ✨ Features

## Important Security & Legal Notice

<table>This tool can access sensitive authentication data. Use only on systems and accounts you own or where you have explicit permission. Do NOT use this project for unauthorized access or data theft. The author accepts no liability for misuse.

<tr>

<td width="50%">## For Developers

- Minimize permissions when adapting code.

### 🎨 Core Capabilities- Protect exports and never ship webhook endpoints with real credentials.

- ✅ **Selective Export** - Current site or all domains- Prefer HttpOnly + Secure cookie design in web apps to reduce risk.

- ✅ **Detailed Attributes** - Secure, HttpOnly, SameSite flags

- ✅ **Smart Grouping** - Organized by domain## Contributing & License

- ✅ **Timestamp Tracking** - Know when data was capturedImprovements that increase clarity, safety, and educational value are welcome. Licensed under MIT — use responsibly.

- ✅ **Clean Output** - Human-readable text format

---

</td>

<td width="50%">_This README was rewritten to be shorter, clearer, and more approachable while keeping the original educational intent._

This browser extension is developed **strictly for educational and security research purposes** to demonstrate browser cookie vulnerabilities and raise awareness about web security risks.This browser extension is created for **educational purposes** to help you understand how browser cookies work and how they can be accessed through browser APIs.

### 🔧 Technical Specs
- 🚀 Manifest V3 compliant
- 💾 Automatic file downloads
- 🌐 Cross-browser compatible
- 📊 Cookie count statistics
- ⚡ Lightweight & fast

</td>
</tr>
</table>

## 📦 Installation

### Chrome / Edge / Brave (Chromium-based)

```bash
# 1. Clone or download this repository
git clone https://github.com/yourusername/cookie-exporter.git

# 2. Navigate to extensions page
chrome://extensions/
edge://extensions/
brave://extensions/
```

**3. Enable Developer Mode** (toggle in top-right corner)

**4. Click "Load unpacked"** and select the extension folder

**5. Done!** 🎉 The extension icon will appear in your toolbar

## 🚀 Usage

1. **Click** the Cookie Exporter icon in your browser toolbar
2. **Choose** your export option:
   - 📄 **Current Site** - Export cookies from active tab only
   - 🌐 **All Cookies** - Export everything in your browser
3. **Review** the downloaded text file with organized cookie data

### 📋 Output Format

```
===========================================
COOKIE EXPORT - 2025-11-06 14:30:45
Total Cookies: 42
===========================================

Domain: example.com
-------------------
Name: session_id
Value: abc123xyz...
Domain: .example.com
Path: /
Secure: Yes
HttpOnly: Yes
SameSite: Lax
Expires: 2025-12-06
```

## ⚠️ Security Notice

<div align="center">

### 🛡️ EDUCATIONAL USE ONLY 🛡️

</div>

> **Important:** This tool demonstrates how browser extensions can access sensitive data. Use responsibly and ethically.

### ✅ Authorized Use
- 🟢 Personal testing on your own browser
- 🟢 Security training and education
- 🟢 Authorized penetration testing
- 🟢 Academic research with consent

### ❌ Prohibited Use
- 🔴 Unauthorized access to systems
- 🔴 Data theft or malicious activity
- 🔴 Deployment without explicit consent
- 🔴 Violation of privacy laws

## 👨‍💻 For Developers

### Best Practices to Implement

```javascript
// 1. Minimize permissions - only request what you need
"permissions": ["cookies", "activeTab"]

// 2. Use secure cookie flags
document.cookie = "name=value; Secure; HttpOnly; SameSite=Strict";

// 3. Implement Content Security Policy
"content_security_policy": {
  "extension_pages": "script-src 'self'; object-src 'self'"
}

// 4. Regular security audits
// Review extension behavior in DevTools
```

### 🔍 What You'll Learn

- Cookie lifecycle and expiration handling
- Security attribute implications (Secure, HttpOnly, SameSite)
- Browser extension API interactions
- Data exfiltration techniques and defenses
- Privacy-preserving web development

## 📚 Resources

- 📖 [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- 🔧 [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- 🛡️ [OWASP Cookie Security](https://owasp.org/www-community/controls/SecureFlag)
- 🔐 [Web Security Best Practices](https://developer.chrome.com/docs/extensions/mv3/security/)

## 🤝 Contributing

Contributions that improve educational value, security, or clarity are welcome!

```bash
# Fork the repo, make changes, submit a PR
1. Fork the repository
2. Create your feature branch (git checkout -b feature/improvement)
3. Commit your changes (git commit -m 'Add educational feature')
4. Push to the branch (git push origin feature/improvement)
5. Open a Pull Request
```

## 📄 License

**MIT License** - Use responsibly and ethically.

This project is provided "as-is" for educational purposes. The author assumes no liability for misuse. Users are solely responsible for compliance with applicable laws and regulations.

---

<div align="center">

### 🌟 Remember

**With great power comes great responsibility.**

Use this knowledge to build more secure systems, not to harm others.

---

Made with 💙 for security education | **Always act ethically and legally**

</div>
