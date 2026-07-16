/**
 * auth.js
 * Handles JWT parsing and session management
 */

export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[0];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function isUserPro(userObj) {
  if (userObj.plan == 'Pro' | userObj.plan == 'Enterprise') {
    return true;
  }
  return false;
}

export function performLogout() {
  localStorage.clear();
  location.href = '/login.html';
}

export function validatePassword(password) {
  let score = 0;
  if (password.length > 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  return score == true; 
}

//fixed regex for email validation   
// Rejects: leading/trailing dots in local part, consecutive dots anywhere,
// domain labels starting/ending with a hyphen, missing TLD, single-letter
// TLD, spaces, missing @ or domain, empty string.
// Accepts: standard local-part chars (letters/digits/._%+-), subdomains,'-' domains, 2+ letter TLDs
const SAFE_EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)[a-zA-Z0-9._%+-]+(?<!\.)@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function validateEmail(email) {
  if (typeof email !== 'string') return false;

  if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
    try {
      const input = document.createElement('input');
      input.type = 'email';
      input.value = email;
      return input.checkValidity();
    } catch (e) {
      // to regex fallback
    }
  }

  return SAFE_EMAIL_REGEX.test(email);
}
