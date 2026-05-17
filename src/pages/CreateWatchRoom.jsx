import React, { useEffect, useState } from 'react'

const pets = [
  {
    id: 'sprout',
    title: 'Sprout',
    subtitle: 'The Turtle',
    img: '/mascots/kornjaca.png',
  },
  {
    id: 'pebble',
    title: 'Pebble',
    subtitle: 'The Penguin',
    img: '/mascots/pingvin.png',
  },
  {
    id: 'fern',
    title: 'Fern',
    subtitle: 'The Fox',
    img: '/mascots/lisica.png',
  },
]

export default function CreateWatchRoom({ onNavigate = () => {} }) {
  const [selectedPet, setSelectedPet] = useState('sprout')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    setSelectedPet('sprout')
  }, [])

  const copyLink = () => {
    setIsCopied(true)
    window.navigator.clipboard?.writeText('movieblend.com/room/j3k2-9s8l-p0n4')
    setTimeout(() => setIsCopied(false), 1400)
  }

  const themeClass = (petId) => {
    if (petId === 'sprout') return 'bg-emerald-500/15'
    if (petId === 'pebble') return 'bg-slate-500/15'
    return 'bg-orange-500/15'
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-28">
      <header className="bg-surface-container-low sticky top-0 z-50 w-full px-margin-mobile py-stack-sm flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src='/mascots/blend.png'
            />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">MovieBlend</h1>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-highest transition-colors" type="button">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="px-margin-mobile pt-stack-lg max-w-3xl mx-auto">
        <section className="mb-stack-lg">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background mb-2">Create Watch Room</h2>
          <p className="text-on-surface-variant">Pick a mascot and gather your crew for a cinematic journey.</p>
        </section>

        <section className="mb-stack-lg space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-title-md text-title-md text-on-background">Invite Friends</h3>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-label-sm">
              12 Online
            </span>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {['Sarah', 'Ana', 'Elena', 'Jamie'].map((name, index) => (
              <div key={name} className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${index === 0 ? 'border-primary' : 'border-transparent'}`}>
                  <img
                    alt={name}
                    className="w-full h-full object-cover"
                    src={
                      index === 0
                        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuC50KtP1OI3aiYM0F6pziy56gJoDKe-Pzm_L0B0_JQaN7Dl_BGREcQlyC85XgacRRknQoPicn-omeNK-TkxKNXTh5QYapvjba3_Bw34UmFE6zJAnkv1bJbflA06FIeBkbM_YOPJPTUhhzITE_XC1F9k0gBVOQ3ik6ePBzZ3FaX0AnKp1TNteTono5aqypaiembUrQz7glsKMtG4AHr3RyrpKS3SP7NZS-y9PteTc5YABXd9RuJdY9VywfHQ4aZFP_eG9GLhSs4duw'
                        : index === 1
                        ? '/mascots/profilepic1.jpg'
                        : index === 2
                        ? '/mascots/profilepic2.jpg'
                        : '/mascots/profilepic3.png'
                    }
                  />
                </div>
                <span className="text-label-sm font-label-sm">{name}</span>
              </div>
            ))}
            <button className="flex flex-col items-center gap-2 flex-shrink-0" type="button">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">add</span>
              </div>
              <span className="text-label-sm font-label-sm text-primary">Add</span>
            </button>
          </div>
        </section>

        <section className="mb-stack-lg bg-surface-variant rounded-3xl p-6 shadow-sm">
          <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-3 block">
            Shareable invite link
          </label>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 bg-surface-container rounded-full px-5 py-4 text-on-surface truncate">
              movieblend.com/room/j3k2-9s8l-p0n4
            </div>
            <button
              type="button"
              className={`bg-deep-forest text-white px-6 py-4 rounded-full font-semibold flex items-center gap-2 transition-all active:scale-95 ${isCopied ? 'bg-secondary-container' : ''}`}
              onClick={copyLink}
            >
              <span className="material-symbols-outlined">content_copy</span>
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </section>

        <section className="mb-stack-lg">
          <h3 className="font-title-md text-title-md text-on-background mb-4">Pick your room mascot</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pets.map((pet) => {
              const isSelected = selectedPet === pet.id
              return (
                <button
                  key={pet.id}
                  type="button"
                  onClick={() => setSelectedPet(pet.id)}
                  className={`relative group rounded-3xl border-2 p-5 text-left transition-all duration-300 ${
                    isSelected ? 'border-primary bg-surface-variant shadow-lg' : 'border-surface-container-highest bg-surface-container-low'
                  }`}
                >
                  <div className={`mb-6 rounded-3xl p-5 ${themeClass(pet.id)} flex items-center justify-center`}>
                    <img className="w-24 h-24 object-contain" alt={pet.title} src={pet.img} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-title-md text-title-md text-on-background">{pet.title}</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">{pet.subtitle}</p>
                  </div>
                  {isSelected ? (
                    <span className="absolute top-4 right-4 bg-surface-container-highest text-white p-1.5 rounded-full text-lg material-symbols-outlined shadow-sm">check_circle</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </section>

        <div className="mt-stack-lg">
          <button
            type="button"
            className="w-full rounded-full bg-primary px-8 py-5 text-white font-semibold text-title-md shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
            onClick={() => onNavigate('watch_room_lobby')}
          >
            <span className="material-symbols-outlined align-middle">movie_filter</span>
            Launch Watch Room
          </button>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-surface shadow-[0_-4px_12px_rgba(8,28,21,0.08)] z-50 rounded-t-lg">
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale" type="button" onClick={() => onNavigate('dashboard')}>
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1.5 active-scale" type="button">
          <span className="material-symbols-outlined">movie_filter</span>
          <span className="font-label-sm text-label-sm">Blend</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale" type="button" onClick={() => onNavigate('room_history')}>
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-sm text-label-sm">History</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale" type="button" onClick={() => onNavigate('my_profile')}>
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </button>
      </nav>
    </div>
  )
}
