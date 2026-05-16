import React, { useEffect, useState } from 'react'

export default function WatchingNow({ onNavigate = () => {} }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [timeLeft, setTimeLeft] = useState(4482)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((current) => {
        if (!isPlaying || current <= 0) return current
        return current - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  const togglePlay = () => {
    setIsPlaying((current) => !current)
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden">
      <header className="bg-surface-container-low dark:bg-surface-container-high shadow-sm dark:shadow-none fixed top-0 w-full z-50 rounded-b-lg flex justify-between items-center px-margin-mobile py-stack-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
            <img
              alt="User Avatar"
              data-alt="A high-quality, professional 3D stylized avatar of a friendly young man with a warm smile, wearing a dark green hoodie. The art style is soft and organic with cinematic lighting that emphasizes texture and depth, set against a clean, mint-white background that matches a cozy-tech aesthetic."
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC922NytYovwFvvArzrSj9pQelXkUnSuNXTtoPSqUI-oyHLbkOQaS4OmPuinjOAEvwNuHJGmcKtSDXn2qhCjKBnqifodWMajFM1Gne66hAUdGe_Ee_Max53XGDYFofqqAWShQ7lKOcil8bNp5m1X28mo4v1LZhCb2W6_jHuoJAuzfoZH_uFKryp4UIXFuvjmdKg3_vwmoaFssMjN7drcU83Dvf7FnnOR2UqY9g7TtweBBXZvI8Ku7JrWXvhsi7USWGhDxfbfdThRg"
            />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary dark:text-primary-fixed-dim">MovieBlend</h1>
        </div>
        <button className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest transition-transform active:scale-95" type="button">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-grow pt-24 pb-20 px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto w-full flex flex-col gap-8">
        <section className="bg-surface-variant rounded-lg p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary-container opacity-20" />
          <div className="pet-bounce flex flex-col items-center gap-2">
            <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center relative shadow-lg">
              <span className="material-symbols-outlined text-on-primary-container !text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                pets
              </span>
              <span style={{ color: '#CF0F47' }} className="absolute -bottom-1 -right-1 bg-deep-forest text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                LVL 4
              </span>
            </div>
            <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Cozy Companion</p>
          </div>
          <div className="w-full max-w-xs flex flex-col gap-1">
            <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary-container progress-glow transition-all duration-1000" id="pet-progress" style={{ width: '65%' }} />
            </div>
            <p className="text-[10px] text-outline text-right">Growth: 650/1000xp</p>
          </div>
          <div className="mt-2">
            <h2 className="font-title-md text-title-md text-deep-forest">
              Watching <span className="text-primary italic">Dune: Part Two</span>
            </h2>
            <p className="text-on-surface-variant text-sm mt-1">
              with <span className="font-semibold">Sarah, Marcus, and 2 others</span>
            </p>
          </div>
        </section>

        <section className="bg-surface-container-low rounded-lg p-8 flex flex-col items-center justify-center gap-6 shadow-sm">
          <div className="text-center">
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-2">Remaining Runtime</p>
            <div className="font-headline-lg text-headline-lg text-deep-forest tabular-nums tracking-tight" id="timer">
              {formattedTime}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:scale-105 active:scale-95 transition-all" type="button">
              <span className="material-symbols-outlined !text-3xl">replay_10</span>
            </button>
            <button
              style={{ color: '#CF0F47' }}
              className="w-20 h-20 rounded-full bg-deep-forest flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
              type="button"
              onClick={togglePlay}
            >
              <span className="material-symbols-outlined !text-4xl" id="play-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:scale-105 active:scale-95 transition-all" type="button">
              <span className="material-symbols-outlined !text-3xl">forward_30</span>
            </button>
          </div>
        </section>

        <section className="bg-primary-container text-on-primary-container rounded-lg p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500" id="completion-prompt">
          <div className="flex items-start gap-4">
            <div className="bg-on-primary-container/20 p-2 rounded-full">
              <span className="material-symbols-outlined">question_mark</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md">Is the movie done?</h3>
              <p className="opacity-90 text-sm">Synchronizing everyone's progress...</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button className="flex-1 bg-white text-primary font-bold py-3 rounded-full hover:bg-surface-bright transition-colors active:scale-[0.98]" type="button">
              Yes, rate it!
            </button>
            <button style={{ color: '#CF0F47' }} className="flex-1 bg-deep-forest text-white font-bold py-3 rounded-full hover:bg-opacity-90 transition-colors active:scale-[0.98]" type="button">
              Not yet (Add time)
            </button>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-surface dark:bg-surface-dim shadow-[0_-4px_12px_rgba(8,28,21,0.08)] z-50 rounded-t-lg">
        <button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1.5 hover:bg-surface-container-highest dark:hover:bg-surface-variant transition-all rounded-full group" type="button">
          <span className="material-symbols-outlined group-active:scale-90 transition-transform">home</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container rounded-full px-5 py-1.5 transition-all scale-95" type="button">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            movie_filter
          </span>
          <span className="font-label-sm text-label-sm">Blend</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1.5 hover:bg-surface-container-highest dark:hover:bg-surface-variant transition-all rounded-full group" type="button">
          <span className="material-symbols-outlined group-active:scale-90 transition-transform">history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1.5 hover:bg-surface-container-highest dark:hover:bg-surface-variant transition-all rounded-full group" type="button">
          <span className="material-symbols-outlined group-active:scale-90 transition-transform">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </button>
      </nav>
    </div>
  )
}
