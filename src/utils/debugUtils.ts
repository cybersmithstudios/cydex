// Debug utilities for clearing problematic state
export const clearAllAuthData = () => {
  try {
    // Clear all authentication-related localStorage items
    localStorage.removeItem('cydexSessionExpiry');
    
    // Clear all localStorage if needed (use sparingly)
    const keysToRemove = Object.keys(localStorage).filter(key => 
      key.includes('auth') || 
      key.includes('session') || 
      key.includes('supabase') ||
      key.includes('cydex')
    );
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    console.log('Cleared authentication data from localStorage');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

export const debugAuthState = () => {
  console.group('🔍 Auth Debug Information');
  console.log('LocalStorage auth data:', {
    sessionExpiry: localStorage.getItem('cydexSessionExpiry'),
    allKeys: Object.keys(localStorage)
  });
  console.log('Current URL:', window.location.href);
  console.log('User Agent:', navigator.userAgent);
  console.groupEnd();
};

export const forceAuthReset = () => {
  console.warn('🚨 Force resetting authentication state');
  clearAllAuthData();
  
  // Force reload to completely reset state
  window.location.href = '/';
};

// Add to window for debugging in console
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).debugAuth = {
    clearAllAuthData,
    debugAuthState,
    forceAuthReset,
  };
  
  console.log('🔧 Debug utilities available at window.debugAuth');
} 