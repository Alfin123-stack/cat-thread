const BASE_URL = 'https://forum-api.dicoding.dev/v1';

// Utility functions to manage the access token in localStorage
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}
// User authentication functions
async function login({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Handle non-2xx HTTP status (e.g., 401 Unauthorized)
      const errorResponse = await response.json();
      alert(
        errorResponse.message || 'Unauthorized. Please check your credentials.',
      );
      return { error: true, data: null };
    }

    const responseJson = await response.json();

    if (!responseJson.error) {
      // Store access token only if login is successful
      localStorage.setItem('accessToken', responseJson.data.token);
      return { error: false, data: responseJson.data };
    }
    // Handle API error, e.g., incorrect credentials
    return { error: true, data: null };
  } catch (error) {
    console.error('Error during login:', error);
    alert('An unexpected error occurred. Please try again.');
    return { error: true, data: null };
  }
}

async function register({ name, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    // Cek status HTTP dari response
    if (!response.ok) {
      // Jika response tidak OK (misal 400 atau 500)
      const errorResponse = await response.json();
      return { error: true, message: errorResponse.message || 'Registration failed.' };
    }

    const responseJson = await response.json();

    // Cek apakah status yang diterima di response JSON adalah success
    if (responseJson.status !== 'success') {
      return { error: true, message: responseJson.message || 'Registration failed.' };
    }

    return { error: false };
  } catch (error) {
    console.error('Error during registration:', error);
    return { error: true, message: error.message || 'An unexpected error occurred.' };
  }
}

// Get user profile details
async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// Fetch all users
async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.users };
}

// Fetch threads
async function getAllThreads() {
  try {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.data.threads;
  } catch (error) {
    console.error('Error fetching threads:', error);
    return [];
  }
}

// Fetch a specific thread by ID
async function getThread(id) {
  try {
    const response = await fetch(`${BASE_URL}/threads/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.data.detailThread;
  } catch (error) {
    console.error('Error fetching thread:', error);
    return null;
  }
}

// Create a new thread
async function createThread({ title, body, category }) {
  try {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    if (!response.ok) throw new Error('Failed to create thread');

    const data = await response.json();
    return data.data.thread;
  } catch (error) {
    console.error('Error creating thread:', error);
    return null;
  }
}

// Create a comment for a thread
async function createComment(threadId, { content }) {
  try {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();
    return data.data.comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    return null;
  }
}

// Voting actions
async function upvoteThread(threadId) {
  try {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.data.vote.userId;
  } catch (error) {
    console.error('Error upvoting thread:', error);
    return null;
  }
}

async function downvoteThread(threadId) {
  try {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.data.vote.userId;
  } catch (error) {
    console.error('Error downvoting thread:', error);
    return null;
  }
}

async function neutralVoteThread(threadId) {
  try {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    return data.data.vote.userId;
  } catch (error) {
    console.error('Error neutral voting thread:', error);
    return null;
  }
}

// Voting actions for comments

// Upvote a comment
async function upvoteComment(threadId, commentId) {
  try {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    if (data.status === 'success') {
      return data.data.vote; // Returning the userId who upvoted the comment
    }
    return null;
  } catch (error) {
    console.error('Error upvoting comment:', error);
    return null;
  }
}

// Downvote a comment
async function downvoteComment(threadId, commentId) {
  try {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    if (data.status === 'success') {
      return data.data.vote; // Returning the userId who downvoted the comment
    }
    return null;
  } catch (error) {
    console.error('Error downvoting comment:', error);
    return null;
  }
}

// Neutralize the comment vote (remove vote)
async function neutralVoteComment(threadId, commentId) {
  try {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    if (data.status === 'success') {
      return data.data.vote; // Returning the userId who neutralized the vote
    }
    return null;
  } catch (error) {
    console.error('Error neutral voting comment:', error);
    return null;
  }
}

// Fetch leaderboards
async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.leaderboards };
}

// Export the functions
export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  login,
  register,
  getUserLogged,
  getAllUsers,
  getAllThreads,
  getThread,
  createThread,
  createComment,
  upvoteThread,
  downvoteThread,
  neutralVoteThread,
  upvoteComment, // Add this
  downvoteComment, // Add this
  neutralVoteComment, // Add this
  getLeaderboards,
};
