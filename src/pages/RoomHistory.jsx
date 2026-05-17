import React, { useEffect } from 'react'

export default function RoomHistory({ onNavigate = () => {} }) {
  useEffect(() => {
    const familyProgress = document.getElementById('family-progress')
    if (familyProgress) {
      const timeout = setTimeout(() => {
        familyProgress.style.width = '94%'
      }, 500)
      return () => clearTimeout(timeout)
    }
    return undefined
  }, [])

  useEffect(() => {
    const observerOptions = { threshold: 0.1 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-4')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.room-entry').forEach((el) => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-4')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-background min-h-screen pb-32 overflow-x-hidden">
      <header className="bg-surface-container-low sticky top-0 z-50 rounded-b-lg shadow-sm flex justify-between items-center w-full px-margin-mobile py-stack-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL1p8JdCWSE5E5BdmB2TEI3ufuZJVN2QXyUKrHRwNUTzyErlNjiK9clgECHm1c82ircZVes8jEzDkh4s6sln8sDM5_zIiXuOGqPMAvSBUqLTTq4oXGMP3g186g4smi6DD7HWs1sPGpy6BJcqDHTehNLhN7N2MZQL5UYr83MVoeio875cH3jLXGnvi6uJh48s4SffPtOwLwzyaQnrS2off47cY2b7mLmdes4BmfZ0VpJC3g0lMunJSDtireD_pGHj0v21jRzwZYKA"
            />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">MovieBlend</h1>
        </div>
        <button className="w-12 h-12 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-highest transition-all duration-200 active:scale-95" type="button">
          <span className="material-symbols-outlined text-2xl" data-icon="notifications">
            notifications
          </span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-margin-mobile mt-stack-lg">
        <section className="mb-stack-lg">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">Room History</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Revisit your favorite cinematic moments and see how your Room Pets are growing.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 group relative overflow-hidden bg-surface-variant rounded-lg p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg room-entry">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-title-md text-title-md text-deep-forest mb-1">Friday Night Crew</h3>
                <p className="text-label-sm font-label-sm text-primary uppercase tracking-wider">Active 2 days ago</p>
              </div>
              <button className="bg-deep-forest text-white px-6 py-2 rounded-full font-label-sm text-label-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform" type="button">
                <span style={{ color: '#CF0F47' }} className="material-symbols-outlined text-lg" data-icon="replay">
                  replay
                </span>
                <p style={{ color: '#CF0F47' }}> Quick-Replay </p>
              </button>
            </div>
            <div className="flex items-center gap-6 mt-auto">
              <div className="relative">
                <div className="w-24 h-24 bg-surface-container-lowest rounded-full p-2 flex items-center justify-center shadow-sm">
                  <img
                    className="w-full h-full object-contain"
                    data-alt="A friendly, organic-shaped digital pet character with soft mint green accents and large expressive eyes, floating against a clean white background. The aesthetic is cozy-tech and inviting, designed for a modern social app."
                    src="mascots/macka.png"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                  Lv.8
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant italic">Sprout Pet Progression</span>
                  <span className="font-label-sm text-label-sm text-deep-forest font-semibold">82%</span>
                </div>
                <div className="w-full h-4 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 bg-surface-container-high rounded-lg p-6 flex flex-col transition-all duration-300 hover:shadow-md room-entry">
            <div className="mb-4">
              <h3 className="font-title-md text-title-md text-on-surface mb-1">Anime Enthusiasts</h3>
              <p className="text-label-sm font-label-sm text-on-surface-variant">Last watched: Suzume</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <div className="w-20 h-20 bg-surface rounded-full p-3 mb-3">
                <img
                  className="w-full h-full object-contain"
                  data-alt="A small, cute robotic pet with a minimalist organic design, featuring glowing blue sensors and soft rounded edges. The character is centered in a warm, nature-inspired digital environment with a soft-focus background."
                  src="mascots/robocat.png"
                />
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold">Level 4 Growth</span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden mb-6">
              <div className="h-full bg-secondary-container rounded-full" style={{ width: '45%' }} />
            </div>
            <button className="w-full py-3 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm font-semibold flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors active:scale-95" type="button">
              <span className="material-symbols-outlined text-lg" data-icon="bolt">
                bolt
              </span>
              Quick-Replay
            </button>
          </div>

          <div className="col-span-1 bg-surface-container-low rounded-lg p-6 flex flex-col transition-all duration-300 hover:shadow-md border border-surface-container-highest room-entry">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-title-md text-title-md text-on-surface">Weekend Thrillers</h3>
              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="more_vert">
                  more_vert
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-surface rounded-lg p-2 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  data-alt="A sleek, modern digital pet mascot with a deep forest green color scheme and minimalist circular details. The design is presented in a bright, high-key studio lighting setting that emphasizes its organic modernist curves."
                  src="mascots/egg.png"
                />
              </div>
              <div className="flex-1">
                <div className="h-3 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container rounded-full" style={{ width: '20%' }} />
                </div>
                <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">Level 1: Seedling</p>
              </div>
            </div>
            <button className="mt-auto w-full py-3 border border-outline rounded-full font-label-sm text-label-sm font-semibold text-deep-forest hover:bg-surface-variant transition-colors flex items-center justify-center gap-2" type="button">
              <span className="material-symbols-outlined text-lg" data-icon="replay">
                replay
              </span>
              Revisit Room
            </button>
          </div>

          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-surface-variant to-secondary-container rounded-lg p-8 relative flex flex-col md:flex-row gap-8 items-center overflow-hidden room-entry">
            <div className="z-10 flex-1">
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-deep-forest mb-2">Family Movie Night</h3>
              <p className="font-body-md text-body-md text-on-secondary-container mb-6 max-w-sm">
                Your pet 'Blinky' is almost ready for its next evolution! Join a room to earn growth points.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="h-6 bg-white/50 rounded-full overflow-hidden p-1">
                    <div className="h-full bg-deep-forest rounded-full transition-all duration-1000 ease-out" id="family-progress" style={{ width: '0%' }} />
                  </div>
                </div>
                <span className="font-title-md text-title-md text-deep-forest">94%</span>
              </div>
              <button className="bg-deep-forest text-white px-8 py-3 rounded-full font-title-md text-title-md hover:scale-105 transition-transform flex items-center gap-2 shadow-lg" type="button">
                <span style={{ color: '#CF0F47' }} className="material-symbols-outlined" data-icon="movie_filter">
                  movie_filter
                </span>
                <p style={{ color: '#CF0F47' }}> Start Session </p>
              </button>
            </div>
            <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-xl p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                className="w-full h-full object-contain"
                data-alt="A sophisticated, high-end 3D character design of a digital room pet. It features a soft, friendly aesthetic with translucent parts and a glowing core. Set in a brightly lit, minimalist environment that feels premium and cozy."
                src="mascots/mis.png"
              />
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="col-span-1 border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low transition-colors group room-entry">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary" data-icon="add">
                add
              </span>
            </div>
            <h4 className="font-title-md text-title-md text-on-surface">Start New Room</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              Create a new group and grow a new pet together
            </p>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-surface dark:bg-surface-dim shadow-[0_-4px_12px_rgba(8,28,21,0.08)] z-50 rounded-t-lg">
        <button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1.5 hover:bg-surface-container-highest dark:hover:bg-surface-variant rounded-full transition-colors active-scale" type="button" onClick={() => onNavigate('dashboard')}>
          <span className="material-symbols-outlined mb-1" data-icon="home">home</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1.5 hover:bg-surface-container-highest dark:hover:bg-surface-variant rounded-full transition-colors active-scale" type="button" onClick={() => onNavigate('create_watch_room')}>
          <span className="material-symbols-outlined mb-1" data-icon="movie_filter">movie_filter</span>
          <span className="font-label-sm text-label-sm">Blend</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container rounded-full px-5 py-1.5 active-scale" type="button" onClick={() => onNavigate('room_history')}>
          <span className="material-symbols-outlined mb-1" data-icon="history">history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1.5 hover:bg-surface-container-highest dark:hover:bg-surface-variant rounded-full transition-colors active-scale" type="button" onClick={() => onNavigate('my_profile')}>
          <span className="material-symbols-outlined mb-1" data-icon="person">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </button>
      </nav>
    </div>
  )
}
