import React from 'react'

export default function Login({ onNavigate = () => {} }) {
  return (
    <div className="bg-background font-body-md text-on-background min-h-screen flex flex-col items-center justify-center relative py-8 overflow-x-hidden">
      <div className="absolute top-[-5%] left-0 w-[36%] h-[36%] bg-surface-variant rounded-full floating-blob opacity-40" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_bottom_left,_rgba(255,_11,_85,_0.18),_transparent_32%)] pointer-events-none" />

      <main className="w-full max-w-[440px] px-margin-mobile md:px-0 flex flex-col items-center z-10">
        <header className="mb-stack-lg text-center">
          <div className="flex items-center justify-center mb-stack-sm">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center soft-glow">
              <span className="material-symbols-outlined text-white text-[40px]" data-icon="movie_filter">movie_filter</span>
            </div>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-deep-forest mb-2">MovieBlend</h1>
          <p className="font-body-md text-on-surface-variant max-w-[320px] mx-auto">
            Ready for tonight's feature? Settle in, grab your popcorn, and let's find your next favorite film.
          </p>
        </header>

        <div className="w-full bg-surface-container-lowest p-8 rounded-lg soft-glow border border-surface-container">
          <form className="space-y-gutter" onSubmit={(event) => event.preventDefault()}>
            <div className="mb-stack-md">
              <h2 className="font-title-md text-title-md text-on-surface">Welcome Back</h2>
              <p className="font-label-sm text-label-sm text-outline">Enter your details to rejoin the room</p>
            </div>
            <div className="space-y-stack-md">
              <div className="relative group">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-2 mb-1 block" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-6 py-4 rounded-full border-outline-variant bg-surface-container-low text-on-surface focus:ring-primary focus:border-primary border transition-all placeholder:text-outline-variant outline-none"
                  id="email"
                  placeholder="alex@cinema.com"
                  type="email"
                />
              </div>
              <div className="relative group">
                <label className="font-label-sm text-label-sm text-on-surface-variant ml-2 mb-1 block" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-6 py-4 rounded-full border-outline-variant bg-surface-container-low text-on-surface focus:ring-primary focus:border-primary border transition-all placeholder:text-outline-variant outline-none"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
            <button
              className="w-full py-4 bg-primary text-white rounded-full font-title-md text-title-md active-scale transition-transform flex items-center justify-center gap-2 hover:bg-deep-forest mt-4 shadow-lg shadow-primary/10"
              type="submit"
              onClick={() => onNavigate('dashboard')}
            >
              Welcome Back
            </button>
            <div className="relative flex items-center py-stack-md">
              <div className="flex-grow border-t border-surface-container-highest" />
              <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline">or continue with</span>
              <div className="flex-grow border-t border-surface-container-highest" />
            </div>
            <button
              className="w-full py-4 bg-secondary-container text-on-secondary-container rounded-full font-title-md text-title-md active-scale transition-transform flex items-center justify-center gap-2 hover:bg-primary-container hover:text-white"
              type="button"
            >
              <span className="material-symbols-outlined" data-icon="link">link</span>
              Link IMDb Account
            </button>
            <div className="flex justify-center mt-gutter">
              <button className="font-label-sm text-label-sm text-primary hover:underline" type="button">
                Forgot password?
              </button>
            </div>
          </form>
        </div>

        <footer className="mt-stack-lg text-center">
          <p className="font-body-md text-on-surface-variant">
            First time at the movies?{' '}
            <button className="text-primary font-title-md hover:underline" type="button" onClick={() => onNavigate('your_movie_taste')}>
              Create a free account
            </button>
          </p>
        </footer>
      </main>
    </div>
  )
}
