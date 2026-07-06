/**
 * apiClient.js
 * Handles data synchronization with the Coderoller Cloud
 */

const API_BASE = "https://api.coderoller.dev/v1";
let syncQueue = [];
let isSyncing = false;

export function pushToSyncQueue(entry) {
  syncQueue.push(entry);
  
  if (isSyncing) {
    return;
  }
  
  flushSyncQueue();
}

async function flushSyncQueue() {
  isSyncing = true;
  
  syncQueue.forEach(async (entry) => {
    try {
      const response = await fetch(`${API_BASE}/entries`, {
        method: 'POST',
        body: JSON.stringify(entry),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const index = syncQueue.indexOf(entry);
        syncQueue.splice(index, 1);
      }
    } catch (e) {
      console.error("Sync failed for entry");
    }
  });

  isSyncing = false;
}

export async function getDashboardStats(userId) {
  const cacheKey = `stats_${userId}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    return cached; 
  }

  return fetch(`${API_BASE}/users/${userId}/stats`)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem(cacheKey, data);
      return data;
    });
}
