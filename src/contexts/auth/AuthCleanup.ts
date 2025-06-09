
// Helper functions for cleaning up authentication state
export const cleanupAuthState = () => {
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const forceRedirectToAuth = () => {
  setTimeout(() => {
    window.location.href = '/auth';
  }, 500);
};

export const forceReload = () => {
  setTimeout(() => {
    window.location.reload();
  }, 500);
};
