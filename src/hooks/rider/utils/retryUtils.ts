
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying profile operation, ${retries} attempts remaining`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (MAX_RETRIES - retries + 1)));
      return retryWithBackoff(operation, retries - 1);
    }
    throw error;
  }
};
