import React, { useEffect, useState } from 'react'
import {
  getPersonalRecommendations,
  getOppositePersonalRecommendations,
} from '../api/recommendations'

export default function Dashboard({ onNavigate = () => {} }) {
  const [movieRecommendations, setMovieRecommendations] = useState([])
  const [oppositeRecommendations, setOppositeRecommendations] = useState([])

  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true)
  const [isLoadingOpposite, setIsLoadingOpposite] = useState(true)

  const [recommendationError, setRecommendationError] = useState('')
  const [oppositeError, setOppositeError] = useState('')

  const [liked, setLiked] = useState({})
  const [modalMovie, setModalMovie] = useState(null)

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const data = await getPersonalRecommendations('user1')
        setMovieRecommendations(data.recommendations || [])
      } catch (error) {
        console.error(error)
        setRecommendationError('Could not load recommendations.')
      } finally {
        setIsLoadingRecommendations(false)
      }
    }

    loadRecommendations()
  }, [])

  useEffect(() => {
    async function loadOppositeRecommendations() {
      try {
        const data = await getOppositePersonalRecommendations()
        setOppositeRecommendations(data.recommendations || [])
      } catch (error) {
        console.error(error)
        setOppositeError('Could not load opposite recommendations.')
      } finally {
        setIsLoadingOpposite(false)
      }
    }

    loadOppositeRecommendations()
  }, [])

  const getPoster = (movie) => {
    return movie?.poster_url || movie?.img || 'https://placehold.co/300x450/png?text=No+Poster'
  }

  const getMatchText = (movie, isOpposite = false) => {
    if (movie?.match) return movie.match

    if (isOpposite && movie?.opposite_score !== undefined) {
      const oppositeScore = Number(movie.opposite_score || 0)
      return `${Math.round((1 - oppositeScore) * 100)} Different`
    }

    const score = Number(movie?.score || 0)
    return `${Math.round(score * 100)} Match`
  }

  const getMovieTags = (movie) => {
    if (movie?.tags) return movie.tags

    if (!movie?.genres) return []

    return String(movie.genres)
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll("'", '')
      .split(',')
      .map((genre) => genre.trim())
      .filter(Boolean)
      .slice(0, 3)
  }

  const handleLike = (movie) => {
    const key = movie.tmdb_id || movie.imdb_id || movie.title

    setLiked((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }

  const renderMovieCard = (movie, index, suffix = '', isOpposite = false) => {
    const key = `${movie.tmdb_id || movie.imdb_id || movie.title}-${index}-${suffix}`
    const movieKey = movie.tmdb_id || movie.imdb_id || movie.title

    return (
      <div
        key={key}
        className="min-w-[260px] sm:min-w-[280px] max-w-[280px] snap-start active-scale flex-shrink-0 cursor-pointer"
        onClick={() => setModalMovie({ ...movie, isOpposite })}
      >
        <div className="bg-surface-variant rounded-lg overflow-hidden relative group h-full flex flex-col">
          <div className="relative h-72 w-full overflow-hidden">
            <img
              alt={movie.title}
              className="w-full h-full object-cover"
              data-alt="Movie poster"
              src={getPoster(movie)}
            />

            <div className="absolute top-3 right-3 glass-overlay px-3 py-1 rounded-full flex items-center gap-1">
              <span
                className="material-symbols-outlined text-primary text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isOpposite ? 'explore' : 'favorite'}
              </span>

              <span className="font-label-sm text-on-surface">
                {getMatchText(movie, isOpposite)}
              </span>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                handleLike(movie)
              }}
              className="absolute top-3 left-3 glass-overlay px-2 py-1 rounded-full flex items-center justify-center"
            >
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                style={{
                  fontVariationSettings: liked[movieKey] ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                favorite
              </span>
            </button>
          </div>

          <div className="p-4 bg-surface-variant flex-grow flex flex-col justify-between">
            <div>
              <h4 className="font-title-md text-on-surface leading-tight">
                {movie.title}
              </h4>

              {movie.overview ? (
                <p className="text-on-surface-variant text-label-sm mt-1 line-clamp-2">
                  {movie.overview}
                </p>
              ) : (
                <p className="text-on-surface-variant text-label-sm mt-1">
                  No overview available.
                </p>
              )}
            </div>

            <div className="flex gap-2 mt-3 flex-wrap">
              {getMovieTags(movie).map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-container/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-label-sm uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="font-body-md text-on-background selection:bg-secondary-container">
      <header className="fixed top-0 left-0 w-full z-40 bg-surface-container-low shadow-sm px-margin-mobile py-stack-sm flex justify-between items-center rounded-b-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL1p8JdCWSE5E5BdmB2TEI3ufuZJVN2QXyUKrHRwNUTzyErlNjiK9clgECHm1c82ircZVes8jEzDkh4s6sln8sDM5_zIiXuOGqPMAvSBUqLTTq4oXGMP3g186g4smi6DD7HWs1sPGpy6BJcqDHTehNLhN7N2MZQL5UYr83MVoeio875cH3jLXGnvi6uJh48s4SffPtOwLwzyaQnrS2off47cY2b7mLmdes4BmfZ0VpJC3g0lMunJSDtireD_pGHj0v21jRzwZYKA"
            />
          </div>

          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
            MovieBlend
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors active-scale"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">notifications</span>
          </button>

          <button
            className="px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-sm active-scale hover:bg-secondary transition-colors"
            type="button"
            onClick={() => onNavigate('movie_over')}
          >
            Test Movie Over
          </button>
        </div>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-5xl mx-auto">
        <section className="mb-stack-lg">
          <p className="font-label-sm text-on-surface-variant mb-1">
            Welcome back,
          </p>

          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Good evening, Alex
          </h2>
        </section>

        <section className="mb-stack-lg">
          <div className="bg-primary-container text-on-primary-container p-6 rounded-lg relative overflow-hidden shadow-sm">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-subtle-pulse absolute inline-flex h-full w-full rounded-full bg-white" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                  </span>

                  <span className="font-title-md text-title-md">
                    Live Friend Lobby
                  </span>
                </div>

                <p className="text-on-primary-container/80 text-body-md max-w-md">
                  Sam, Chloe, and 2 others are watching 'Interstellar'. Join the conversation!
                </p>
              </div>

              <button
                style={{ color: '#CF0F47' }}
                className="bg-deep-forest text-white py-3 px-8 rounded-full font-title-md text-title-md active-scale self-start md:self-center flex items-center gap-2"
                type="button"
                onClick={() => onNavigate('watch_room_lobby')}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                Join Room
              </button>
            </div>
          </div>

          <div className="mt-6 flex -space-x-3 overflow-hidden">
            <img
              alt="Friend 1"
              className="inline-block h-10 w-10 rounded-full ring-2 ring-primary-container"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRNvw8lprirxPATTAXrOBP4QBNGvXhYHY9VbNd6kfSvy07BrwWMcCk5gYXlqXg4IBz9Yb1trGbxjGrjA1ZXNTSpwqcvx5dyT6tuwXjUc44CwYHfD8Yz3b6TNe6M5_TJQbGjk-NYfCqa9UhbT6sSvwDeP1ilIpd7Lzom2mDYgWHjylIhl8TJRJ0PTrP58cRFDn_dsw7dpuduPYJ1lO8HPw7FNr7NqDMDYcj2XPRb3JsLYlj38Gp4WG--8FzizeNeQVHsStoZS_y2Q"
            />
            <img
              alt="Friend 2"
              className="inline-block h-10 w-10 rounded-full ring-2 ring-primary-container"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1KSS1VwdIn8QaSmZ3F74G8fnN5g7dw_TD98PMG2yaOEdNyNEC0-gzqI7ub0EmgPsuRbYvMXWchfieyxegGuZ8PGXDDh-Lw3BLse-Fr5hdluezIai04xTLNslsWK_Wnaw240yYQJMtzuyig8W8PFuH-IV3UkDilmFt1rdYPvIrEMJi67qK5-LVPrspMsZkQoF1VGF6Hv1kswtdnnLvLLS3xrwXI6astVwxqaZPrzedMO3Mp1TD8fCm6cQXLxIRqvqBpICxfSTTqw"
            />
            <img
              alt="Friend 3"
              className="inline-block h-10 w-10 rounded-full ring-2 ring-primary-container"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByTy4lTIi2UTb1V2fNtSWLeMHGy9mTFkA6DFAtwFJlT5dGbiFlldGqf7W-gKnQV1w-iGH3CMe3szC4CpoHxowglRTqPHLNGVLHfAdOitmpvlA900MNNtQn8wZp6tvAwxCY6YtC80hyKH70evi11KXTImXQcvZls2STIfXn8ympz1AJpdP_ZgcH28_TXCulMKlYTxbYFQ9wc8B6eV4iXW2sBfZK9zklEjdmQ54aPziVogkCmfMlrZAEZ4-XkSrw5L8R71EtfXF5fA"
            />
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-container text-on-secondary-container ring-2 ring-primary-container font-label-sm">
              +2
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between mb-stack-md">
          <h3 className="font-title-md text-title-md text-on-surface">
            For You
          </h3>

          <div className="flex items-center gap-2 text-primary font-label-sm">
            <span className="material-symbols-outlined text-[18px]">sync</span>
            Synced from IMDb
          </div>
        </div>

        {isLoadingRecommendations && (
          <p className="text-on-surface-variant text-sm mb-4">
            Loading recommendations...
          </p>
        )}

        {recommendationError && (
          <p className="text-primary text-sm mb-4">
            {recommendationError}
          </p>
        )}

        {!isLoadingRecommendations && movieRecommendations.length === 0 && !recommendationError && (
          <p className="text-on-surface-variant text-sm mb-4">
            No recommendations found.
          </p>
        )}

        {movieRecommendations.length > 0 && (
          <div className="relative px-2 overflow-hidden">
            <div className="flex gap-4 flex-nowrap animate-slider-drift" id="movie-slider">
              {movieRecommendations.concat(movieRecommendations).map((movie, index) =>
                renderMovieCard(movie, index, 'for-you', false)
              )}
            </div>
          </div>
        )}

        {modalMovie && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={() => setModalMovie(null)}
          >
            <div
              className="bg-surface-variant p-4 rounded-lg max-w-3xl w-full mx-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                  <img
                    alt={modalMovie.title}
                    src={getPoster(modalMovie)}
                    className="w-full h-72 object-cover rounded-md"
                  />
                </div>

                <div className="w-full md:w-1/2 text-left">
                  <h2 className="text-2xl font-bold text-on-surface">
                    {modalMovie.title}
                  </h2>

                  <div className="mt-3">
                    <h3 className="font-title-md text-on-surface mb-1">
                      Genres
                    </h3>

                    <div className="flex gap-2 flex-wrap">
                      {getMovieTags(modalMovie).map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary-container/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-label-sm uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-title-md text-on-surface mb-1">
                      {modalMovie.isOpposite ? 'Difference' : 'Match'}
                    </h3>

                    <p className="text-on-surface-variant text-body-md">
                      {getMatchText(modalMovie, modalMovie.isOpposite)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-title-md text-on-surface mb-1">
                      Overview
                    </h3>

                    <p className="text-on-surface-variant text-body-md">
                      {modalMovie.overview || 'No overview available.'}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setModalMovie(null)}
                      className="bg-primary text-on-primary px-4 py-2 rounded-full"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="mb-stack-lg mt-stack-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface">
                Try something new out of the box
              </h3>

              <p className="text-on-surface-variant text-sm mt-1">
                Movies least similar to your usual taste.
              </p>
            </div>

            <span className="material-symbols-outlined text-primary">
              travel_explore
            </span>
          </div>

          {isLoadingOpposite && (
            <p className="text-on-surface-variant text-sm mb-4">
              Loading out-of-the-box recommendations...
            </p>
          )}

          {oppositeError && (
            <p className="text-primary text-sm mb-4">
              {oppositeError}
            </p>
          )}

          {!isLoadingOpposite && oppositeRecommendations.length === 0 && !oppositeError && (
            <p className="text-on-surface-variant text-sm mb-4">
              No out-of-the-box recommendations found.
            </p>
          )}

          {oppositeRecommendations.length > 0 && (
            <div className="relative px-2 overflow-hidden">
              <div className="flex gap-4 flex-nowrap animate-slider-drift" id="new-movie-slider">
                {oppositeRecommendations.concat(oppositeRecommendations).map((movie, index) =>
                  renderMovieCard(movie, index, 'opposite', true)
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 rounded-t-lg bg-surface-container-low shadow-[0_-4px_12px_rgba(8,28,21,0.08)] flex justify-around items-center px-4 pb-4 pt-2">
        <button
          className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1.5 active-scale group"
          type="button"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>

        <button
          className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 active-scale hover:bg-surface-container-highest rounded-full transition-colors"
          type="button"
          onClick={() => onNavigate('create_watch_room')}
        >
          <span className="material-symbols-outlined">movie_filter</span>
          <span className="font-label-sm text-label-sm">Blend</span>
        </button>

        <button
          className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 active-scale hover:bg-surface-container-highest rounded-full transition-colors"
          type="button"
          onClick={() => onNavigate('room_history')}
        >
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </button>

        <button
          className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 active-scale hover:bg-surface-container-highest rounded-full transition-colors"
          type="button"
          onClick={() => onNavigate('my_profile')}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </button>
      </nav>
    </div>
  )
}