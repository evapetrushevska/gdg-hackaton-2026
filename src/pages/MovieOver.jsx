import React, { useEffect, useState } from 'react'

export default function MovieOver({ onNavigate = () => {}, selectedMovieData = null }) {
  console.log('MovieOver received selectedMovieData:', selectedMovieData)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [hoverStar, setHoverStar] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ratings, setRatings] = useState({
    favoriteActor: null,
    emotion: null,
    starRating: null,
    engagement: null,
  })

  const getGenres = (movie) => {
    if (!movie?.genres) return []
    return String(movie.genres)
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll("'", '')
      .split(',')
      .map((genre) => genre.trim())
      .filter(Boolean)
  }

  const defaultMovie = {
    title: 'Dune: Part Two',
    poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE4eWW2uNqxXjDdmuiAWZLSwadfe6X4FV-1y62HP24mDlm6KBAnpwQrjlgSDfowfWYDbQqnzkJoCg3lzHVjHtcC-nz8KOkP7v7SqJ21kag-zAp4BmcA3UJtpltYHOtlbc5RfF5WJt9CBGKhbtSPQ7yvcmldRFU5hheWiI5ngjv6EEIR2vtV4NFfQU9i6HLbI7UqJo_BvdpksEQAI-B-TNvfLj2EPZt2hDyLFyGgIrhV9FpzQ76aNyxL0LeUq5w3l3sU-v9oYsfNg',
    overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie et odio in blandit. Morbi congue risus tortor, eget tincidunt massa vestibulum eget. Mauris venenatis ultricies mi id condimentum. Donec eget lacinia nibh, a tincidunt nunc. Suspendisse interdum laoreet velit et efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas iaculis ut urna at viverra. Vestibulum feugiat sit amet arcu quis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla euismod eleifend nulla, eu fringilla tellus volutpat id. Nullam purus dolor, gravida at est vitae, interdum dignissim massa.',
    cast: [
      { name: 'Ethan Hawke', role: 'The Grabber' },
      { name: 'Mason Thames', role: 'Finney "Finn" Shaw' },
      { name: 'Madeleine McGraw', role: 'Gwen' },
    ],
  }

  // Build movie object with proper fallbacks for API data
  const buildMovieObject = (data) => {


    if (!data) return defaultMovie

    // Extract cast names if available, otherwise generate placeholders
    let castArray = []
    if (data.cast && Array.isArray(data.cast)) {
      castArray = data.cast
    } else if (data.cast && typeof data.cast === 'string') {
      // Parse cast string if it's a string
      castArray = data.cast
        .split(',')
        .slice(0, 3)
        .map((name) => ({ name: name.trim(), role: 'Character' }))
    } else {
      // Use default cast
      castArray = defaultMovie.cast
    }

    return {
      title: data.title || 'Unknown Movie',
      poster_url: data.poster_url || defaultMovie.poster_url,
      overview: data.overview || data.description || defaultMovie.overview,
      cast: castArray,
      release_date: data.release_date || 'Unknown',
      genres: data.genres || [],
      vote_average: data.vote_average || 0,
      vote_count: data.vote_count || 0,
    }
  }

  const movie = buildMovieObject(selectedMovieData)

  const questions = [
    {
      title: 'Favorite Character',
      subtitle: 'Who was your favorite character or actor?',
      type: 'actor',
      options: movie.cast.map((actor) => actor.role),
    },
    {
      title: 'What emotion did you feel?',
      subtitle: 'Tell us about your main emotion during the movie.',
      type: 'emotion',
      options: ['Excited', 'Moved', 'Entertained', 'Bored', 'Scared'],
    },
    {
      title: 'Rate the Movie',
      subtitle: 'Give it a rating from 1 to 10 stars.',
      type: 'stars',
      options: Array.from({ length: 10 }, (_, i) => i + 1),
    },
    {
      title: 'Engagement Level',
      subtitle: 'How engaged were you during the movie?',
      type: 'engagement',
      options: ['Fully Engaged', 'Background Watching'],
    },
  ]

  useEffect(() => {
    const t = setTimeout(() => {
      setShowRatingModal(true)
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (showThankYou) {
      const t = setTimeout(() => {
        onNavigate('watch_room_lobby')
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [showThankYou, onNavigate])

  const handleAnswer = (answer) => {
    const questionKeys = ['favoriteActor', 'emotion', 'starRating', 'engagement']
    setRatings((prev) => ({
      ...prev,
      [questionKeys[currentQuestion]]: answer,
    }))

    if (questions[currentQuestion].type === 'stars') {
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          setShowRatingModal(false)
          setShowThankYou(true)
        }
      }, 500)
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowRatingModal(false)
      setShowThankYou(true)
      // TODO: sync ratings with room members or backend
    }
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="bg-background text-on-background min-h-screen pt-24 pb-32 px-margin-mobile font-body-md selection:bg-secondary-container overflow-y-auto custom-scrollbar">
      <div className="max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">Movie Over</h1>
        <p className="text-on-surface-variant">Thanks for watching — the rating prompt will appear shortly.</p>
      </header>

      <main>
        <section className="bg-surface-variant rounded-lg overflow-hidden max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-4 p-4">
            <div className="w-full md:w-2/5 rounded-2xl overflow-hidden shadow-sm">
              <img alt={movie.title} src={movie.poster_url} className="w-full h-full object-cover max-h-[240px]" />
            </div>
            <div className="w-full md:w-3/5 flex flex-col items-start text-left gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-bold leading-tight text-on-surface">{movie.title}</h1>
                <div className="mt-3 space-y-2">
                  <div>
                    <h3 className="font-label-md font-bold text-on-surface text-sm">
                      Cast: <span className="text-on-surface-variant font-normal text-label-sm"> {movie.cast.slice(0, 3).map((actor) => actor.name).join(', ')}</span>
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-label-md text-sm font-bold">Description: </h3>
                    <p className="text-on-surface-variant text-label-sm line-clamp-3">{movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-surface-variant p-8 rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-title-md text-title-md">{question.title}</h3>
                <span className="text-label-sm text-on-surface-variant">{currentQuestion + 1}/{questions.length}</span>
              </div>
              <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <p className="text-on-surface-variant text-body-md mb-6">{question.subtitle}</p>

            <div className="space-y-2">
              {question.type === 'stars' ? (
                <div className="flex justify-center gap-1">
                  {question.options.map((star) => {
                    const active = hoverStar ? star <= hoverStar : ratings.starRating ? star <= ratings.starRating : false
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverStar(star)}
                        onMouseLeave={() => setHoverStar(null)}
                        onClick={() => !isSubmitting && handleAnswer(star)}
                        disabled={isSubmitting}
                        className={`text-3xl transition-colors ${
                          active ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                        } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        ★
                      </button>
                    )
                  })}
                </div>
              ) : (
                question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`w-full py-3 px-4 rounded-lg font-label-md transition-colors text-left ${
                      (question.type === 'actor' && ratings.favoriteActor === option) ||
                      (question.type === 'emotion' && ratings.emotion === option) ||
                      (question.type === 'engagement' && ratings.engagement === option)
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    {option}
                  </button>
                ))
              )}
            </div>

            {currentQuestion === questions.length - 1 && ratings.engagement && (
              <button
                onClick={() => handleAnswer(ratings.engagement)}
                className="w-full mt-6 bg-primary text-on-primary py-3 rounded-full font-title-md active-scale"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      )}

      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-surface-variant p-8 rounded-lg max-w-md w-full mx-4 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-primary-container p-3 rounded-full">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>
            <h3 className="font-headline-md text-on-surface mb-2">Thank you for rating!</h3>
            <p className="text-on-surface-variant text-body-md">Your feedback has been recorded. Redirecting to watch room...</p>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
