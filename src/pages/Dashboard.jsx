import React from 'react'

export default function Dashboard({ onNavigate = () => {} }) {
  const movieRecommendations = [
    {
      title: 'Everything Everywhere All at Once',
      match: '98% Match',
      tags: ['Sci-Fi', 'Drama'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAew1IQqVl9l5br8PR91C9V93VFUAXqDy32guktaixMISYttF1X5bT6QJj5pwlxpsP1mdUnLktr1SkQwxyCK3Kjn3OA0VL53JA0o3Re9cAjF6HcezFPTYLfPor466vE77oUD0sqiBWJI4k4hwDEAfJGT_6W1AK18vDSj-osheZMVws1-Y73qQfPLVUJnwRU0s70f826h97ojb2Jd8LCS3YXrbIWTaEGnej4gSB7hmJiZxL1i5mTs4_UTCiVaqXHB_uh7UJBoTd3xw',
    },
    {
      title: 'Inception',
      match: '92% Match',
      tags: [],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4sm-B2xHiokU5yFvS-FoS_jgZqUJOjlqg_kFA_eN14JCmRp3FKuIIj2F4_dAkpdwKnTA25QQ7JpIytueuN5FFz3QRdJVphH_2OArS7bZrjIfdUt8ucWz4ECLylOqt7kD4EPZu3ZeCB1IbG739kRGn_yW3PL44rep2AlkBTiudWliU4tfdjhluIc-GFM7Hkho8GGYYDBhchJth4Xvr6HyepGSenuLaTxR38iE-RNhNr56dfp_NbLjU6hDqdb3jRfh5LxUqPerufg',
      description: 'Based on your love for Sci-Fi',
    },
    {
      title: 'Parasite',
      match: '89% Match',
      tags: ['Thriller'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxsg3hD9cLj3iPPSVmhPq4u6nGJDlmX1KymTQYbHs9hrmiXtHmLW6-YJZxyV1K1vdmZ-4b5DfzBOg0W0FigkXp8-VDsClnfH3LdRRGdVbqd7hANkITBf7eBAXPNaOy0IvshAlIU6WAE37YwLM_dWzzQMpea_73duTcwzYOWkTYuHMdHjIggU90jlGsUJDC9iJYwHUXtVlsDsDvZ-2_aSKAdGLWr6OEHBNMOE4ca8izPHlWtszHHtsxD6dW2SbLo5n2IF7DOCjbRQ',
    },
    {
      title: 'Grand Budapest Hotel',
      match: '85% Match',
      description: 'Recommended by Chloe',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE4eWW2uNqxXjDdmuiAWZLSwadfe6X4FV-1y62HP24mDlm6KBAnpwQrjlgSDfowfWYDbQqnzkJoCg3lzHVjHtcC-nz8KOkP7v7SqJ21kag-zAp4BmcA3UJtpltYHOtlbc5RfF5WJt9CBGKhbtSPQ7yvcmldRFU5hheWiI5ngjv6EEIR2vtV4NFfQU9i6HLbI7UqJo_BvdpksEQAI-B-TNvfLj2EPZt2hDyLFyGgIrhV9FpzQ76aNyxL0LeUq5w3l3sU-v9oYsfNg',
    },
    {
      title: 'Lady on Fire',
      match: '94% Match',
      tags: ['Romance'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj6HZD1c0cOwrsaAyEI3m-i3yZQgQcD_ByziaAdQebNX-igYg9gXmmKLS3vizKjxtvP9lFsqGa3qBEGX1Wh-XgM5m9ufAG52ljEwudzvo5zrg5arB3TftEeBjOMScfiSfWg46Uf-69NlvV2CzgCjIXqEQz3XKPDHhcKCRdf45rXbhiXYyljsSQ9SMp92WZvc2EYgUXQn43gik_YDi4PxrV048VafPG59_bYZXo-LKip5PgPIXa2eT4Q8vGmqL5MVHNv-lfgMXrDA',
    },
  ]
  const [liked, setLiked] = React.useState({})
  const [modalMovie, setModalMovie] = React.useState(null)

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
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">MovieBlend</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors active-scale" type="button">
            <span className="material-symbols-outlined text-primary">notifications</span>
          </button>
          <button className="px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-sm active-scale hover:bg-secondary transition-colors" type="button" onClick={() => onNavigate('movie_over')}>
            Test Movie Over
          </button>
        </div>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-5xl mx-auto">
        <section className="mb-stack-lg">
          <p className="font-label-sm text-on-surface-variant mb-1">Welcome back,</p>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Good evening, Alex</h2>
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
                  <span className="font-title-md text-title-md">Live Friend Lobby</span>
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
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
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
          <h3 className="font-title-md text-title-md text-on-surface">For You</h3>
          <div className="flex items-center gap-2 text-primary font-label-sm">
            <span className="material-symbols-outlined text-[18px]">sync</span>
            Synced from IMDb
          </div>
        </div>

          <div className="relative px-2 overflow-hidden">
          <div className="flex gap-4 flex-nowrap animate-slider-drift" id="movie-slider">
            {movieRecommendations.concat(movieRecommendations).map((movie, index) => (
              <div key={`${movie.title}-${index}`} className="min-w-[260px] sm:min-w-[280px] max-w-[280px] snap-start active-scale flex-shrink-0 cursor-pointer" onClick={() => setModalMovie(movie)}>
                <div className="bg-surface-variant rounded-lg overflow-hidden relative group h-full flex flex-col">
                  <div className="relative h-72 w-full overflow-hidden">
                    <img alt={movie.title} className="w-full h-full object-cover" data-alt="Movie poster" src={movie.img} />
                    <div className="absolute top-3 right-3 glass-overlay px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                      </span>
                      <span className="font-label-sm text-on-surface">{movie.match}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-variant flex-grow flex flex-col justify-between">
                    <h4 className="font-title-md text-on-surface leading-tight">{movie.title}</h4>
                    {movie.description ? (
                      <p className="text-on-surface-variant text-label-sm mt-1">{movie.description}</p>
                    ) : (
                      <div className="flex gap-2 mt-2">
                        {(movie.tags || []).map((tag) => (
                          <span key={tag} className="bg-primary-container/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-label-sm uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {modalMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setModalMovie(null)}>
            <div className="bg-surface-variant p-4 rounded-lg max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                  <img alt={modalMovie.title} src={modalMovie.img} className="w-full h-48 object-cover rounded-md" />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h2 className="text-2xl font-bold text-on-surface">{modalMovie.title}</h2>
                  <div className="mt-3">
                    <h3 className="font-title-md text-on-surface mb-1">Cast</h3>
                    {modalMovie.cast ? (
                      <p className="text-on-surface-variant text-body-md">{(modalMovie.cast || []).join(', ')}</p>
                    ) : (
                      <p className="text-on-surface-variant text-body-md">Not available</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-on-surface-variant text-body-md">{modalMovie.description || modalMovie.match || 'No description available.'}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => setModalMovie(null)} className="bg-primary text-on-primary px-4 py-2 rounded-full">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="mb-stack-lg mt-stack-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">Try something new out of the box</h3>
          </div>

          <div className="relative px-2 overflow-hidden">
            <div className="flex gap-4 flex-nowrap animate-slider-drift" id="new-movie-slider">
              {movieRecommendations.concat(movieRecommendations).map((movie, index) => (
                <div key={`${movie.title}-new-${index}`} className="min-w-[260px] sm:min-w-[280px] max-w-[280px] snap-start active-scale flex-shrink-0">
                  <div className="bg-surface-variant rounded-lg overflow-hidden relative group h-full flex flex-col">
                    <div className="relative h-72 w-full overflow-hidden">
                      <img alt={movie.title} className="w-full h-full object-cover" data-alt="Movie poster" src={movie.img} />
                    </div>
                    <div className="p-4 bg-surface-variant flex-grow flex flex-col justify-between">
                      <h4 className="font-title-md text-on-surface leading-tight">{movie.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2">
                          {(movie.tags || []).map((tag) => (
                            <span key={tag} className="bg-primary-container/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-label-sm uppercase">{tag}</span>
                          ))}
                        </div>
                        <div className="text-label-sm text-on-surface-variant">Rating will appear in the Watch Room after watching.</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 rounded-t-lg bg-surface-container-low shadow-[0_-4px_12px_rgba(8,28,21,0.08)] flex justify-around items-center px-4 pb-4 pt-2">
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1.5 active-scale group" type="button">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            home
          </span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 active-scale hover:bg-surface-container-highest rounded-full transition-colors" type="button" onClick={() => onNavigate('create_watch_room')}>
          <span className="material-symbols-outlined">movie_filter</span>
          <span className="font-label-sm text-label-sm">Blend</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 active-scale hover:bg-surface-container-highest rounded-full transition-colors" type="button" onClick={() => onNavigate('room_history')}>
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 active-scale hover:bg-surface-container-highest rounded-full transition-colors" type="button" onClick={() => onNavigate('my_profile')}>
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </button>
      </nav>
    </div>
  )
}
