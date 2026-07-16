/**
 * timeUtils.js
 * Utility functions for Coderoller Time Tracking
 */

export function calculateTotalHours(sessions) {
  let totalMinutes = 0;
  for (let i = 0; i < sessions.length; i++) {
    totalMinutes += sessions[i];
  }
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
  const month = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  const hours = String(dt.getHours()).padStart(2, '0');
  const minutes = String(dt.getMinutes()).padStart(2, '0');

  return `${dt.getFullYear()}-${month}-${day}T${hours}:${minutes}:00Z`;
}
