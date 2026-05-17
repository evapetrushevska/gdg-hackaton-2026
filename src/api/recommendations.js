const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getPersonalRecommendations(userName = 'user1') {
  const response = await fetch(`${API_URL}/recommend/test/personal/${userName}`)

  if (!response.ok) {
    throw new Error('Failed to fetch personal recommendations')
  }

  return response.json()
}

export async function getBlendedRecommendations(users = ['user1', 'user2', 'user3']) {
  const response = await fetch(`${API_URL}/recommend/test/blended`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ users }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch blended recommendations')
  }

  return response.json()
}

export async function getUserMovieDatabase(userName = 'user1') {
  const response = await fetch(`${API_URL}/movies/test/user/${userName}`)

  if (!response.ok) {
    throw new Error('Failed to fetch user movie database')
  }

  return response.json()
}

export async function getOppositePersonalRecommendations() {
  const response = await fetch(`${API_URL}/recommend/opposite/personal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: 0,
      watched: [
        {
          watched_id: 1,
          user_id: 0,
          imdb_id: 'tt0107688',
        },
        {
          watched_id: 2,
          user_id: 0,
          imdb_id: 'tt0441773',
        },
        {
          watched_id: 3,
          user_id: 0,
          imdb_id: 'tt0398286',
        },
      ],
      watchlist: [
        {
          watchlist_id: 1,
          user_id: 0,
          imdb_id: 'tt0241527',
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch opposite personal recommendations')
  }

  return response.json()
}