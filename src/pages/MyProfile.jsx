import React, { useEffect, useMemo, useState } from 'react'
import { getUserMovieDatabase } from '../api/recommendations'

export default function MyProfile({ onNavigate = () => {} }) {
  const [watchedMovies, setWatchedMovies] = useState([])
  const [watchlistMovies, setWatchlistMovies] = useState([])
  const [activeTab, setActiveTab] = useState('watched')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    async function loadUserMovies() {
      try {
        const data = await getUserMovieDatabase('user1')

        setWatchedMovies(data.watched || [])
        setWatchlistMovies(data.watchlist || [])
      } catch (error) {
        console.error(error)
        setErrorMessage('Could not load your movie database.')
      } finally {
        setIsLoading(false)
      }
    }

    loadUserMovies()
  }, [])

  const moviesToShow = activeTab === 'watched' ? watchedMovies : watchlistMovies

  const filteredMovies = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()

    if (!search) return moviesToShow

    return moviesToShow.filter((movie) =>
      String(movie.title || '').toLowerCase().includes(search)
    )
  }, [moviesToShow, searchTerm])

  const getPoster = (movie) => {
    return movie?.poster_url || 'https://placehold.co/300x450/png?text=No+Poster'
  }

  const getYear = (movie) => {
    return movie?.release_date ? movie.release_date.slice(0, 4) : 'Unknown'
  }

  const getRating = (movie) => {
    if (movie?.user_rating) return movie.user_rating
    if (movie?.vote_average) return Number(movie.vote_average).toFixed(1)
    return 'N/A'
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

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24">
      <header className="sticky top-0 z-50 bg-surface-container-low shadow-sm px-margin-mobile py-stack-sm flex justify-between items-center w-full rounded-b-lg">
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

        <button
          className="p-2 rounded-full hover:bg-surface-container-highest transition-colors active:scale-95 duration-200"
          type="button"
        >
          <span className="material-symbols-outlined text-primary">notifications</span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-margin-mobile pt-stack-lg space-y-8">
        <section className="bg-surface-variant rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              <img
                alt="Alex Rivers"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL1p8JdCWSE5E5BdmB2TEI3ufuZJVN2QXyUKrHRwNUTzyErlNjiK9clgECHm1c82ircZVes8jEzDkh4s6sln8sDM5_zIiXuOGqPMAvSBUqLTTq4oXGMP3g186g4smi6DD7HWs1sPGpy6BJcqDHTehNLhN7N2MZQL5UYr83MVoeio875cH3jLXGnvi6uJh48s4SffPtOwLwzyaQnrS2off47cY2b7mLmdes4BmfZ0VpJC3g0lMunJSDtireD_pGHj0v21jRzwZYKA"
              />
            </div>

            <div className="absolute bottom-1 right-1 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
          </div>

          <div className="text-center md:text-left space-y-2">
            <h2 className="font-headline-lg text-headline-lg text-deep-forest">
              Alex Rivers
            </h2>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
  <div className="text-center">
    <span className="block font-bold text-headline-lg-mobile text-primary">
      {watchedMovies.length}
    </span>
    <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
      Movies Watched
    </span>
  </div>

  <div className="w-px h-10 bg-outline-variant self-center hidden md:block" />

  <div className="text-center">
    <span className="block font-bold text-headline-lg-mobile text-primary">
      {watchlistMovies.length}
    </span>
    <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
      Watchlist
    </span>
  </div>

  <div className="w-px h-10 bg-outline-variant self-center hidden md:block" />

  <div className="text-center">
    <span className="block font-bold text-headline-lg-mobile text-primary">
      384
    </span>
    <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
      XP
    </span>
  </div>
</div>
          </div>

          <div className="ml-auto flex flex-col gap-2 w-full md:w-auto">
            <button
              className="bg-deep-forest text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined">add</span>
              <p style={{ color: '#CF0F47' }}>Manually Add Movie</p>
            </button>

            <button
              className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined">sync</span>
              Resync IMDb
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-title-md text-title-md text-deep-forest">My Friends</h3>
            <button className="text-primary text-label-sm font-semibold hover:underline" type="button">
              View All
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {[
              {
                name: 'Sarah',
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC50KtP1OI3aiYM0F6pziy56gJoDKe-Pzm_L0B0_JQaN7Dl_BGREcQlyC85XgacRRknQoPicn-omeNK-TkxKNXTh5QYapvjba3_Bw34UmFE6zJAnkv1bJbflA06FIeBkbM_YOPJPTUhhzITE_XC1F9k0gBVOQ3ik6ePBzZ3FaX0AnKp1TNteTono5aqypaiembUrQz7glsKMtG4AHr3RyrpKS3SP7NZS-y9PteTc5YABXd9RuJdY9VywfHQ4aZFP_eG9GLhSs4duw',
                border: 'border-primary-container',
              },
              {
                name: 'David K.',
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvo3OsTasuibKmAwBP9wwV-me-XSHgwKgnc2r379ZMjXKFEkX9KrGVz1EGn8Oh1r9SD2KzWnPaeNWxQ6cBbB7H9zA74j_D9wU6ZhBR8Tk-rdVwYOBv3lZ6zWqHGLxZh65rgiWG2vMDLfc45LK0-B8dznOrnUnJYM83Hi9XyHJkUPBMsRMT10YWYUeC0zVDD6X6nxZBQcKb5yudL2QSEVguFNPF12cLkk0Oyc8UM0js1vKfK1SkbZ8tMstoT-RKwC2GSyAyOZYrVQ',
              },
              {
                name: 'Elena',
                src: '/mascots/profilepic1.jpg',
              },
            ].map((friend) => (
              <div key={friend.name} className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className={`w-16 h-16 rounded-full p-1 ${friend.border || 'border-transparent'}`}>
                  <img className="w-full h-full object-cover rounded-full" data-alt={friend.name} src={friend.src} />
                </div>
                <span className="text-label-sm font-medium">{friend.name}</span>
              </div>
            ))}

            <button className="flex-shrink-0 flex flex-col items-center gap-2" type="button">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest border-2 border-dashed border-outline-variant flex items-center justify-center text-outline">
                <span style={{ color: 'white' }} className="material-symbols-outlined">
                  person_add
                </span>
              </div>
              <span className="text-label-sm font-medium">Add New</span>
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h3 className="font-title-md text-title-md text-deep-forest">
                My Movie Database
              </h3>

              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('watched')}
                  className={`px-4 py-2 rounded-full text-label-sm font-semibold transition-colors ${
                    activeTab === 'watched'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  Watched
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('watchlist')}
                  className={`px-4 py-2 rounded-full text-label-sm font-semibold transition-colors ${
                    activeTab === 'watchlist'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  Watchlist
                </button>
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container transition-all"
                placeholder="Search movies..."
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
            </div>
          </div>

          {isLoading && (
            <p className="text-on-surface-variant text-sm">
              Loading movie database...
            </p>
          )}

          {errorMessage && (
            <p className="text-primary text-sm">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && filteredMovies.length === 0 && (
            <p className="text-on-surface-variant text-sm">
              No movies found.
            </p>
          )}

          {!isLoading && filteredMovies.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredMovies.map((movie) => (
                <button
                  type="button"
                  key={`${movie.source_type}-${movie.tmdb_id || movie.imdb_id}`}
                  onClick={() => setSelectedMovie(movie)}
                  className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-surface-container shadow-sm hover:shadow-md transition-all duration-300 text-left"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-alt={movie.title}
                    src={getPoster(movie)}
                    alt={movie.title}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <h4 className="text-white font-bold text-title-md leading-tight">
                      {movie.title}
                    </h4>

                    <p className="text-white/80 text-xs mt-1">
                      {getYear(movie)}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {getMovieTags(movie).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[9px] font-label-sm uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-primary text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-[12px] font-bold text-deep-forest">
                      {getRating(movie)}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 md:hidden bg-deep-forest/80 backdrop-blur px-3 py-2 rounded-lg">
                    <h4 className="text-white font-bold text-sm leading-tight line-clamp-2">
                      {movie.title}
                    </h4>
                  </div>
                </button>
              ))}

              <div className="aspect-[2/3] rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 text-outline-variant hover:border-primary-container hover:text-primary-container transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-[48px] group-hover:scale-110 transition-transform">
                  add_circle
                </span>
                <span className="font-semibold text-label-sm">Explore More</span>
              </div>
            </div>
          )}
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
                    TMDb Rating
                  </h3>
                  <p className="text-on-surface-variant">
                    {selectedMovie.vote_average}/10 · {selectedMovie.vote_count} votes
                  </p>
                </div>

                {selectedMovie.user_rating && (
                  <div className="mt-4">
                    <h3 className="font-title-md text-on-surface mb-1">
                      Your Rating
                    </h3>
                    <p className="text-primary font-bold">
                      {selectedMovie.user_rating}/10
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="font-title-md text-on-surface mb-1">
                    Overview
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    {selectedMovie.overview || 'No overview available.'}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedMovie(null)}
                    className="bg-primary text-on-primary px-5 py-2 rounded-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full bg-surface shadow-[0_-4px_12px_rgba(8,28,21,0.08)] flex justify-around items-center px-4 pb-4 pt-2 z-50 rounded-t-lg">
        <button
          className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale"
          type="button"
          onClick={() => onNavigate('dashboard')}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>

        <button
          className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale"
          type="button"
          onClick={() => onNavigate('create_watch_room')}
        >
          <span className="material-symbols-outlined">movie_filter</span>
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
          className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1.5 active-scale"
          type="button"
        >
          <span className="material-symbols-outlined active-nav-icon">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </button>
      </nav>
    </div>
  )
}