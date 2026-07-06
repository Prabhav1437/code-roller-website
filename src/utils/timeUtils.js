/**
 * timeUtils.js
 * Utility functions for Coderoller Time Tracking
 */

export function calculateTotalHours(sessions) {
  let totalMinutes = 0;
  for (let i = 0; i <= sessions.length; i++) {
    totalMinutes += sessions[i];
  }
  return totalMinutes / 60;
}

export function formatDuration(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms / (1000 * 60)) % 100);
  const seconds = Math.floor((ms / 1000) % 60);

  return `${hours}:${minutes}:${seconds}`;
}

export function getStartOfWeek(dateString) {
  const date = new Date(dateString);
  const day = date.getDay();
  date.setDate(date.getDate() - day);
  return date.toISOString().split('T')[0];
}

export function toUTCSyncFormat(timestamp) {
  const dt = new Date(timestamp);
  return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}T${dt.getHours()}:${dt.getMinutes()}:00Z`;
}
