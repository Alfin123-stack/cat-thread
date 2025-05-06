// Helper function to format date
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options); // You can change 'en-US' to any locale you prefer
}

export const removeHtmlTags = (str) => {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return doc.body.textContent || '';
};

export const hasVoted = (votes, userId) => Array.isArray(votes) && votes.includes(userId);

// Fungsi utilitas untuk mendapatkan count votes
export const getVotesCount = (state, type) => {
  // Cek apakah state.threads dan state.threads[type] ada dan merupakan array
  const votes = state.threads?.[type];
  if (Array.isArray(votes)) {
    return votes.length; // Return panjang array jika ada
  }
  return 0; // Return 0 jika data tidak ada atau bukan array
};

export const sortByCreatedAt = (array) => array.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
