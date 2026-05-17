import React, { useEffect, useState } from 'react'
import { getBlendedRecommendations } from '../api/recommendations'

export default function WatchRoomLobby({ onNavigate = () => {}, setSelectedMovieData = () => {} }) {
  const [blendedMovies, setBlendedMovies] = useState([])
  const [isLoadingBlend, setIsLoadingBlend] = useState(true)
  const [blendError, setBlendError] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    async function loadBlendedRecommendations() {
      try {
        const data = await getBlendedRecommendations(['user1', 'user2', 'user3'])
        setBlendedMovies(data.recommendations || [])
      } catch (error) {
        console.error(error)
        setBlendError('Could not load blended recommendations.')
      } finally {
        setIsLoadingBlend(false)
      }
    }

    loadBlendedRecommendations()
  }, [])

  const getPoster = (movie) => {
    return movie?.poster_url || 'https://placehold.co/300x450/png?text=No+Poster'
  }

  const getMatchText = (movie) => {
    const score = Number(movie?.score || 0)
    return `${Math.round(score * 100)} Match`
  }

  const getShortScore = (movie) => {
    const score = Number(movie?.score || 0)
    return Math.round(score * 100)
  }

const calculateDynamicXP = (movie, isTopMovie = false) => {
  const score = Number(movie?.score || 0)

  // Higher match = higher XP
  // Example: 0.90 match = 145 XP, 0.40 match = 70 XP
  const reward = Math.round(10 + (score * 150))

  return `${reward} XP`
}

  const getYear = (movie) => {
    return movie?.release_date ? movie.release_date.slice(0, 4) : 'Unknown'
  }

  const getMovieTags = (movie) => {
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

  const topMovie = blendedMovies[0]
  const smallerMovies = blendedMovies.slice(1, 6)

  return (
    <div className="bg-background text-on-background min-h-screen pb-24 font-body-md text-body-md overflow-y-auto custom-scrollbar">
      <header className="fixed top-0 left-0 w-full z-40 bg-surface-container-low shadow-sm px-margin-mobile py-stack-sm flex justify-between items-center rounded-b-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src='/mascots/blend.png'
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

          
        </div>
      </header>

      <main className="px-margin-mobile pt-24 space-y-stack-lg max-w-5xl mx-auto">
        <section className="relative overflow-hidden bg-surface-variant p-6 rounded-lg shadow-sm border border-primary-fixed/20">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="organic-shape bg-primary-container/20 p-8 relative animate-pulse">
              <span
                className="material-symbols-outlined text-primary text-6xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pets
              </span>
              <div className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-label-sm shadow-sm">
               Preparing...
              </div>
            </div>

            <div>
              <h2 className="font-title-md text-title-md text-deep-forest mb-1">
                Waiting for consensus...
              </h2>
              <p className="text-on-surface-variant opacity-80">
                3/4 friends have voted for the room mascot.
              </p>
            </div>

            <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[60%] transition-all duration-1000 ease-out rounded-full shadow-[0_0_12px_rgba(11,105,71,0.3)]" />
            </div>
          </div>
        </section>

        <section className="space-y-stack-sm">
          <h3 className="font-title-md text-title-md px-1">Room Members</h3>

          <div className="grid grid-cols-2 gap-gutter">
            <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
              <img
                className="w-10 h-10 rounded-full"
                alt="Sarah"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1KSS1VwdIn8QaSmZ3F74G8fnN5g7dw_TD98PMG2yaOEdNyNEC0-gzqI7ub0EmgPsuRbYvMXWchfieyxegGuZ8PGXDDh-Lw3BLse-Fr5hdluezIai04xTLNslsWK_Wnaw240yYQJMtzuyig8W8PFuH-IV3UkDilmFt1rdYPvIrEMJi67qK5-LVPrspMsZkQoF1VGF6Hv1kswtdnnLvLLS3xrwXI6astVwxqaZPrzedMO3Mp1TD8fCm6cQXLxIRqvqBpICxfSTTqw"
              />
              <div>
                <p className="font-title-md text-[14px]">Sarah</p>
                <div className="flex items-center gap-1 text-primary">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                  <span className="text-label-sm font-label-sm">Pengu</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
              <img
                alt="Marcus"
                className="w-10 h-10 rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByTy4lTIi2UTb1V2fNtSWLeMHGy9mTFkA6DFAtwFJlT5dGbiFlldGqf7W-gKnQV1w-iGH3CMe3szC4CpoHxowglRTqPHLNGVLHfAdOitmpvlA900MNNtQn8wZp6tvAwxCY6YtC80hyKH70evi11KXTImXQcvZls2STIfXn8ympz1AJpdP_ZgcH28_TXCulMKlYTxbYFQ9wc8B6eV4iXW2sBfZK9zklEjdmQ54aPziVogkCmfMlrZAEZ4-XkSrw5L8R71EtfXF5fA"
              />
              <div>
                <p className="font-title-md text-[14px]">Marcus</p>
                <div className="flex items-center gap-1 text-primary">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    cruelty_free
                  </span>
                  <span className="text-label-sm font-label-sm">Rabbit</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg ring-2 ring-primary">
              <img
                className="w-10 h-10 rounded-full"
                alt="You"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL1p8JdCWSE5E5BdmB2TEI3ufuZJVN2QXyUKrHRwNUTzyErlNjiK9clgECHm1c82ircZVes8jEzDkh4s6sln8sDM5_zIiXuOGqPMAvSBUqLTTq4oXGMP3g186g4smi6DD7HWs1sPGpy6BJcqDHTehNLhN7N2MZQL5UYr83MVoeio875cH3jLXGnvi6uJh48s4SffPtOwLwzyaQnrS2off47cY2b7mLmdes4BmfZ0VpJC3g0lMunJSDtireD_pGHj0v21jRzwZYKA"
              />
              <div>
                <p className="font-title-md text-[14px]">You</p>
                <div className="flex items-center gap-1 text-primary">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                  <span className="text-label-sm font-label-sm">Pengu</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-surface-container-highest/50 rounded-lg opacity-60">
              <div className="w-10 h-10 rounded-full bg-surface-dim flex items-center justify-center">
                <span className="material-symbols-outlined text-outline">hourglass_empty</span>
              </div>
              <div>
                <p className="font-title-md text-[14px]">Elena</p>
                <p className="text-label-sm font-label-sm italic">Choosing...</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-stack-md">
          <div className="flex justify-between items-end px-1">
            <div>
              <h3 className="font-headline-lg-mobile text-[22px] leading-tight text-deep-forest">
                The Definitive 5
              </h3>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                Matched for your group
              </p>
            </div>
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
          </div>

          {isLoadingBlend && (
            <p className="text-label-sm text-on-surface-variant px-1">
              Loading blended recommendations...
            </p>
          )}

          {blendError && (
            <p className="text-label-sm text-primary px-1">
              {blendError}
            </p>
          )}

          {!isLoadingBlend && !blendError && blendedMovies.length === 0 && (
            <p className="text-label-sm text-on-surface-variant px-1">
              No blended recommendations found.
            </p>
          )}

          {topMovie && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setSelectedMovie(topMovie)}
                className="relative group overflow-hidden rounded-lg bg-surface-container h-80 shadow-sm hover:shadow-md transition-shadow w-full text-left"
              >
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={topMovie.title}
                  src={getPoster(topMovie)}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex justify-between items-center mb-1 gap-3">
                    <div>
                      <h4 className="text-on-surface font-title-md text-title-md">
                        {topMovie.title}
                      </h4>

                      <p className="text-on-surface-variant text-label-sm mt-1">
                        {getMovieTags(topMovie).join(', ')} · {getYear(topMovie)}
                      </p>

                      <div className="flex items-center gap-1 bg-secondary/20 text-secondary px-2 py-0.5 rounded-full border border-secondary/30">
                        <span className="material-symbols-outlined text-[12px]">stars</span>
                        <span className="text-[10px] font-bold">{calculateDynamicXP(topMovie, true)}</span>
                      </div>
                    </div>

                    <div className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full text-label-sm font-bold whitespace-nowrap">
                      {getMatchText(topMovie)}
                    </div>
                  </div>

                  <p className="text-on-surface text-label-sm line-clamp-3">
                    {topMovie.overview || 'No overview available.'}
                  </p>
                </div>
              </button>

              <div className="flex gap-gutter overflow-x-auto pb-4 px-1 custom-scrollbar snap-x">
                {smallerMovies.map((movie) => (
                  <button
                    type="button"
                    key={movie.tmdb_id || movie.imdb_id}
                    onClick={() => setSelectedMovie(movie)}
                    className="flex-shrink-0 w-48 snap-start space-y-2 text-left"
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden relative shadow-sm">
                      <img
                        className="w-full h-full object-cover"
                        alt={movie.title}
                        src={getPoster(movie)}
                      />

                      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {getShortScore(movie)}
                      </div>
                      <div className="bg-primary text-on-primary px-2 py-1 rounded-md text-[11px] font-black shadow-lg animate-pulse">
                        +{calculateDynamicXP(movie)}
                      </div>
                    </div>
                    <div className="bg-secondary text-on-secondary px-2 py-0.5 rounded-full text-[9px] font-black shadow-lg">
                      +{calculateDynamicXP(movie)}
                    </div>
                    <h5 className="font-title-md text-[14px] truncate px-1">
                      {movie.title}
                    </h5>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="bg-surface-container-low rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-[20px]">forum</span>
            <h4 className="font-title-md text-[14px] text-deep-forest">Chatter Room</h4>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <span className="font-bold text-label-sm text-primary">Sarah:</span>
              <p className="text-label-sm text-on-surface-variant">
                Pengu is definitely the cutest choice! 💖
              </p>
            </div>

            <div className="flex gap-2">
              <span className="font-bold text-label-sm text-primary">Marcus:</span>
              <p className="text-label-sm text-on-surface-variant">
                I don't know, a Rabbit feels more cozy...
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 bg-surface rounded-full px-4 py-2 border border-outline-variant/30">
            <input
              className="bg-transparent border-none focus:ring-0 text-label-sm w-full p-0"
              placeholder="Type a message..."
              type="text"
            />
            <button className="text-primary active:scale-90 transition-transform" type="button">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </section>
      </main>

      {selectedMovie && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="bg-surface-variant rounded-lg max-w-3xl w-full overflow-hidden shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-surface-container">
                <img
                  src={getPoster(selectedMovie)}
                  alt={selectedMovie.title}
                  className="w-full h-96 md:h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-5">
                <h2 className="text-2xl font-bold text-on-surface">
                  {selectedMovie.title}
                </h2>

                <p className="text-on-surface-variant text-sm mt-1">
                  {selectedMovie.release_date || 'Release date unknown'}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {getMovieTags(selectedMovie).map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary-container/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-label-sm uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <h3 className="font-title-md text-on-surface mb-1">
                    Group Match
                  </h3>
                  <p className="text-on-surface-variant">
                    {getMatchText(selectedMovie)}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="font-title-md text-on-surface mb-1">
                    TMDb Rating
                  </h3>
                  <p className="text-on-surface-variant">
                    {selectedMovie.vote_average}/10 · {selectedMovie.vote_count} votes
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="font-title-md text-on-surface mb-1">
                    Overview
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    {selectedMovie.overview || 'No overview available.'}
                  </p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMovie(null)}
                    className="bg-surface-container text-on-surface px-5 py-2 rounded-full"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Watch button clicked', selectedMovie)
                      setSelectedMovieData(selectedMovie)
                      setSelectedMovie(null)
                      onNavigate('movie_over')
                    }}
                    className="bg-primary text-on-primary px-5 py-2 rounded-full"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-surface shadow-[0_-4px_12px_rgba(8,28,21,0.08)] z-50 rounded-t-lg">
        <button
          className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale"
          type="button"
          onClick={() => onNavigate('dashboard')}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>

        <button
          className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1.5 active-scale"
          type="button"
          onClick={() => onNavigate('create_watch_room')}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            movie_filter
          </span>
          <span className="font-label-sm text-label-sm">Blend</span>
        </button>

        <button
          className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale"
          type="button"
          onClick={() => onNavigate('room_history')}
        >
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </button>

        <button
          className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale"
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