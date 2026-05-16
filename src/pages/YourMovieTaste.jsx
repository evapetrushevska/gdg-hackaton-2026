import React, { useState } from 'react'

export default function YourMovieTaste({ onNavigate = () => {} }) {
  const [selected, setSelected] = useState('')
  const options = [
    {
      title: 'Wholesome Comedies',
      description: 'Laughter and lightheartedness',
      icon: 'sentiment_very_satisfied',
    },
    {
      title: 'Cozy Mysteries',
      description: 'Intrigue with a soft touch',
      icon: 'search_insights',
    },
    {
      title: 'Studio Ghibli Vibes',
      description: 'Whimsical, organic animation',
      icon: 'forest',
    },
    {
      title: 'Indie Dramas',
      description: 'Heartfelt, human stories',
      icon: 'local_cafe',
    },
  ]

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col items-center">
      <header className="w-full max-w-2xl px-margin-mobile py-stack-lg">
        <div className="flex flex-col gap-stack-sm">
          <div className="flex justify-between items-center text-label-sm font-label-sm text-outline">
            <span>Step 2 of 5</span>
            <span>Personalizing your den</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary-container w-[40%] rounded-full transition-all duration-700 ease-out relative">
              <div className="absolute inset-0 shimmer" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-2xl px-margin-mobile flex flex-col justify-center gap-stack-lg pb-32">
        <div className="space-y-stack-sm text-center md:text-left">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">
            What kind of movies make you feel at home?
          </h1>
          <p className="text-on-surface-variant font-body-md opacity-80">
            We'll use your cinematic taste to find the perfect Watch Room and shared pet for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter mt-stack-md" id="options-grid">
          {options.map((option) => {
            const isActive = selected === option.title
            return (
              <button
                key={option.title}
                type="button"
                className={`option-card group flex items-center p-6 bg-surface-container-low hover:bg-surface-variant rounded-lg transition-all duration-300 text-left border-2 border-transparent active:scale-95 ${
                  isActive ? 'active' : ''
                }`}
                onClick={() => setSelected(option.title)}
              >
                <div className={`icon-container w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mr-5 transition-colors duration-300 ${
                  isActive ? 'bg-primary text-on-primary' : ''
                }`}>
                  <span className="material-symbols-outlined text-3xl">{option.icon}</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface">{option.title}</h3>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">{option.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </main>

      <footer className="fixed bottom-0 w-full max-w-2xl bg-gradient-to-t from-background via-background to-transparent px-margin-mobile pb-10 pt-6">
        <button
          type="button"
          className={`w-full py-4 px-8 rounded-full font-title-md text-title-md shadow-lg transition-all duration-300 ${
            selected
              ? 'bg-primary text-white hover:scale-[1.02] active:scale-95'
              : 'bg-outline-variant text-on-surface opacity-50 cursor-not-allowed'
          }`}
          style={!selected ? { color: '#CF0F47' } : undefined}
          disabled={!selected}
          onClick={() => selected && onNavigate('dashboard')}
        >
          Continue to My Dashboard
        </button>
      </footer>
    </div>
  )
}
