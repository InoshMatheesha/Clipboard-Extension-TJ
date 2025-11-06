<div align="center">
```text
 ██████   ██████   ██   ██  ███████  ███████ 
██      ██    ██  ██  ██   ██       ██      
██      ██    ██  ██ ██    ██ █████  █████   
██      ██    ██  █████     ██  ███  ██  ██  
<div align="center">
```text
 ██████   ██████   ██   ██  ███████  ███████ 
██      ██    ██  ██  ██   ██       ██      
██      ██    ██  ██ ██    ██ █████  █████   
██      ██    ██  █████     ██  ███  ██  ██  
██      ██    ██  ██ ██    ██   ██  ██   ██ 
██      ██    ██  ██  ██   ██    ██ ██    ██ 
 ██████   ██████   ██   ██  ███████  ███████ 

███████  ██    ██  ██████   ██████   ███████ 
██       ██    ██ ██    ██ ██    ██  ██      
██████   ██    ██ ██    ██ ██    ██  █████   
██        ██  ██  ██    ██ ██    ██  ██      
██         ████    ██████   ██████   ██      
██          ██                                
███████     ██                               
```
</div>

# Cookie Exporter

A small, educational browser extension for demonstrating how cookie data can be read via extension APIs. Designed for learning, security research, and awareness — not for malicious use.

## Why this exists
- Teach: how cookies are structured and what security flags mean.
- Demonstrate: the risks of broad extension permissions.
- Audit: help developers and defenders recognize risky behavior.

## Highlights
- Export cookies from the current tab or all domains (for lab/testing only).
- Produces a readable text file grouped by domain with attributes (Secure, HttpOnly, SameSite, expiry).
- Optional webhook/demo sender (configure or remove before use).

## Quick Start (Research Only)
1. Clone or download this repo.
2. In Chrome/Edge/Brave: go to chrome://extensions/, enable Developer mode.
3. Click "Load unpacked" and select this folder.
4. Click the extension icon and choose an export option.

## Important Security & Legal Notice
This tool can access sensitive authentication data. Use only on systems and accounts you own or where you have explicit permission. Do NOT use this project for unauthorized access or data theft. The author accepts no liability for misuse.

## For Developers
- Minimize permissions when adapting code.
- Protect exports and never ship webhook endpoints with real credentials.
- Prefer HttpOnly + Secure cookie design in web apps to reduce risk.

## Contributing & License
Improvements that increase clarity, safety, and educational value are welcome. Licensed under MIT — use responsibly.

---

_This README was rewritten to be shorter, clearer, and more approachable while keeping the original educational intent._
This browser extension is developed **strictly for educational and security research purposes** to demonstrate browser cookie vulnerabilities and raise awareness about web security risks.This browser extension is created for **educational purposes** to help you understand how browser cookies work and how they can be accessed through browser APIs.
