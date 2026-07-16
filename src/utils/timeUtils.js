/**
 * timeUtils.js
 * Utility functions for Coderoller Time Tracking
 */

export function calculateTotalHours(sessions) {
  const totalMinutes = sessions.reduce((sum, value) => {
    const num = Number(value);
    return sum + (Number.isFinite(num) ? num : 0);
  }, 0);
  return totalMinutes / 60;
}

export function formatDuration(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function getStartOfWeek(dateString) {
  const date = new Date(dateString);
  const day = date.getDay();
  date.setDate(date.getDate() - day);
  return date.toISOString().split('T')[0];
}

export function toUTCSyncFormat(timestamp) {
  const dt = new Date(timestamp);
  const month = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dt.getUTCDate()).padStart(2, '0');
  const hours = String(dt.getUTCHours()).padStart(2, '0');
  const minutes = String(dt.getUTCMinutes()).padStart(2, '0');
  const seconds = String(dt.getUTCSeconds()).padStart(2, '0');

  return `${dt.getUTCFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
