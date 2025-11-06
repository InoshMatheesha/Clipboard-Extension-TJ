<div align="center">

<h1>🍪</h1>
<h2>Cookie Exporter</h2>

<p><em>Educational browser extension for cookie analysis</em></p>

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green.svg)](manifest.json)

<br>

[Features](#features) · [Installation](#installation) · [Usage](#usage) · [Security](#security)

</div>

---

## Overview

Cookie Exporter is a lightweight educational tool designed for security researchers and developers to understand browser cookie mechanics, security attributes, and permission models.

**Purpose:** Learn how cookies work, analyze security flags, and understand data access risks.

## Features

- **Selective Export** — Current site or all browser cookies
- **Detailed Analysis** — View Secure, HttpOnly, SameSite attributes
- **Clean Output** — Organized by domain, timestamp included
- **Modern Stack** — Manifest V3, cross-browser compatible

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/cookie-exporter.git

# Load in browser
# 1. Navigate to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the extension folder
```

## Usage

1. Click the extension icon
2. Choose export option:
   - **Current Site** — Active tab cookies only
   - **All Cookies** — Complete browser storage
3. Review downloaded text file

**Output format:**
```
Cookie Export - 2025-11-06 14:30:45
Total: 42 cookies

Domain: example.com
  session_id | Secure: Yes | HttpOnly: Yes | SameSite: Lax
  ...
```

## Security

> ⚠️ **Educational Use Only**

This tool demonstrates browser extension capabilities and potential security risks.

**Authorized Use:**
- Personal testing and learning
- Security research with permission
- Academic purposes

**Prohibited:**
- Unauthorized data access
- Malicious activities
- Privacy violations

## Development

```javascript
// Best practices demonstrated:
- Minimal permissions (cookies, activeTab)
- Secure cookie flags (Secure, HttpOnly, SameSite)
- Content Security Policy implementation
- Privacy-first design patterns
```

## Resources

- [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [Chrome Extensions](https://developer.chrome.com/docs/extensions/)
- [OWASP Cookie Security](https://owasp.org/www-community/controls/SecureFlag)

## License

MIT — Use responsibly. Author assumes no liability for misuse.

---

<div align="center">
<sub>Built for security education · Use ethically and legally</sub>
</div>
