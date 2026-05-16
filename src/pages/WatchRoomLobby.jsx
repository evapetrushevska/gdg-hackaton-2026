import React from 'react'

export default function WatchRoomLobby({ onNavigate = () => {} }) {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24 font-body-md text-body-md overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 z-50 bg-surface-container-low flex justify-between items-center w-full px-margin-mobile py-stack-sm shadow-sm">
        <div className="flex items-center gap-3">
          <img
            alt="User profile photo"
            className="w-10 h-10 rounded-full border-2 border-primary-fixed"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRNvw8lprirxPATTAXrOBP4QBNGvXhYHY9VbNd6kfSvy07BrwWMcCk5gYXlqXg4IBz9Yb1trGbxjGrjA1ZXNTSpwqcvx5dyT6tuwXjUc44CwYHfD8Yz3b6TNe6M5_TJQbGjk-NYfCqa9UhbT6sSvwDeP1ilIpd7Lzom2mDYgWHjylIhl8TJRJ0PTrP58cRFDn_dsw7dpuduPYJ1lO8HPw7FNr7NqDMDYcj2XPRb3JsLYlj38Gp4WG--8FzizeNeQVHsStoZS_y2Q"
          />
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">MovieBlend</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-all duration-200 active:scale-95" type="button">
          <span className="material-symbols-outlined text-primary">notifications</span>
        </button>
      </header>

      <main className="px-margin-mobile pt-stack-md space-y-stack-lg max-w-5xl mx-auto">
        <section className="relative overflow-hidden bg-surface-variant p-6 rounded-lg shadow-sm border border-primary-fixed/20">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="organic-shape bg-primary-container/20 p-8 relative animate-pulse">
              <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                pets
              </span>
              <div className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-label-sm shadow-sm">
                Hatching...
              </div>
            </div>
            <div>
              <h2 className="font-title-md text-title-md text-deep-forest mb-1">Waiting for consensus...</h2>
              <p className="text-on-surface-variant opacity-80">3/5 friends have voted for the room mascot.</p>
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
              <img className="w-10 h-10 rounded-full" data-alt="A friendly young woman with a warm smile, softly lit by golden hour sunlight, wearing casual modern attire in a cozy indoor setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1KSS1VwdIn8QaSmZ3F74G8fnN5g7dw_TD98PMG2yaOEdNyNEC0-gzqI7ub0EmgPsuRbYvMXWchfieyxegGuZ8PGXDDh-Lw3BLse-Fr5hdluezIai04xTLNslsWK_Wnaw240yYQJMtzuyig8W8PFuH-IV3UkDilmFt1rdYPvIrEMJi67qK5-LVPrspMsZkQoF1VGF6Hv1kswtdnnLvLLS3xrwXI6astVwxqaZPrzedMO3Mp1TD8fCm6cQXLxIRqvqBpICxfSTTqw" />
              <div>
                <p className="font-title-md text-[14px]">Sarah</p>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    eco
                  </span>
                  <span className="text-label-sm font-label-sm">Axolotl</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
              <img
                alt="A professional man in his 30s with a neat beard, looking directly at the camera with a confident yet approachable expression. Minimalist background."
                className="w-10 h-10 rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByTy4lTIi2UTb1V2fNtSWLeMHGy9mTFkA6DFAtwFJlT5dGbiFlldGqf7W-gKnQV1w-iGH3CMe3szC4CpoHxowglRTqPHLNGVLHfAdOitmpvlA900MNNtQn8wZp6tvAwxCY6YtC80hyKH70evi11KXTImXQcvZls2STIfXn8ympz1AJpdP_ZgcH28_TXCulMKlYTxbYFQ9wc8B6eV4iXW2sBfZK9zklEjdmQ54aPziVogkCmfMlrZAEZ4-XkSrw5L8R71EtfXF5fA"
              />
              <div>
                <p className="font-title-md text-[14px]">Marcus</p>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    cruelty_free
                  </span>
                  <span className="text-label-sm font-label-sm">Rabbit</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg ring-2 ring-primary">
              <img className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMPfodnSaKr11yr7Nth3rNy_EBn6zU5XD6NCwnLp5kzbNIPM28M796dF45IDG-PxZbJev1O1nmIL5YbnLVrF1uAQHn-d_d8WovohMUZb2_MOtnkLv6_d2kD_V67rCJ7xOf7V2xNlDh0ka9iPRWAta69U6ECllwSCn5oY9pKbhlhG5PWBPTuosZysicaI5FdKCv5pcrldmp7K6Yz0SKEIhsdvZc7pCVgzEtnkazHhybus8d_kiMOROYPze2FAbQ10S0jdmBVQcqBA" />
              <div>
                <p className="font-title-md text-[14px]">You</p>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    eco
                  </span>
                  <span className="text-label-sm font-label-sm">Axolotl</span>
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
              <h3 className="font-headline-lg-mobile text-[22px] leading-tight text-deep-forest">The Definitive 5</h3>
              <p className="text-label-sm font-label-sm text-on-surface-variant">Matched for your group</p>
            </div>
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
          </div>
          <div className="space-y-4">
            <div className="relative group overflow-hidden rounded-lg bg-surface-container h-80 shadow-sm hover:shadow-md transition-shadow">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="A cinematic, low-angle shot of a glowing futuristic city at night, with neon reflections in puddles on the ground. Deep teals and vibrant greens dominate the palette, creating a moody, atmospheric science fiction vibe. Soft bokeh lights in the background."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXGR2p-eTpGDrE8LVwJ3VPYyVy8Wy_Mf_mrs5QjAogDrf1gLwI4LYkQkWOzFE2i5sUPlcP9qkx5RB7NsLq3LqD42xv87L4vVkcOGhtPumpTrOiEXHAKHb-VWqip3WD2BaxVPKSVJRh9t59Puov00OtjF9xCFRcSeshDgXx6lhFhbanyvM646eb8r0_ki1xbxtHqGNWOwJ6LDv4Afb9aY7SrDearcxa3wIOlpqNzd8IOZjCQdhSHkFx_7p0RxvM_fWzzruUyM2j3w"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <h4 className="text-on-surface font-title-md text-title-md">Neon Horizon</h4>
                    <p className="text-on-surface-variant text-label-sm mt-1">Cast: Timothée Chalamet, Zendaya, Austin Butler</p>
                  </div>
                  <div className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full text-label-sm font-bold">9.8 Match</div>
                </div>
                <p className="text-on-surface text-label-sm line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                </p>
              </div>
            </div>
            <div className="flex gap-gutter overflow-x-auto pb-4 px-1 custom-scrollbar snap-x">
              <div className="flex-shrink-0 w-48 snap-start space-y-2">
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="A sun-drenched, vintage cinematic landscape of a rolling meadow during the golden hour. A single lone oak tree stands in the center, with soft lens flares and warm, nostalgic sepia tones. Calm, peaceful aesthetic."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgJ7rJEBkXfiziLcTQqHZrAbkV53sZymQJpjkCzu0Ukuq-3QfN798qIoUKTd535K-cmvIE7I7b1kCIZWaoL2r-vfHP_50k6do0CG4D5fbT-GzcKBDCNHj8RLxPLl0uLB3w5NR6AtbGRbn3FtTikEGvBH-Rh5FVs46snt5g_AnadPohYn2dl7aFmU-NJJCWajOOUYFQTRUZfKwxr6h1dH6LkPkngzBQRttZS4yhfRxxipu7Pv7FlsTZYpMGu8G6gvKrhogcdH9rrQ"
                  />
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold">9.4</div>
                </div>
                <h5 className="font-title-md text-[14px] truncate px-1">Golden Echoes</h5>
              </div>
              <div className="flex-shrink-0 w-48 snap-start space-y-2">
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Abstract art featuring dark, swirling oceanic waves under a pale moonlight. The composition is dramatic and high-contrast, utilizing deep forest greens and midnight blues with bright white sea foam. Moody and mysterious."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnURE9TiWTn4wkFIiK0t73NRHbSOWK6hDAlU6c_otTBkWBjarcjdNLFC-2cxLssBww20NqbJfUfUQ62ECq7tdJ-J1sZE4C8s_4OIaefIxhUPi_eZX5WjZ6dqwJlXPdhUG7gPS5dfcJnbOoh5alnDODJZ2CSEx5udMmu8aAzfBhib8KGlZDeS307-BZrWtmr6w8Q7xK7EAdxh9w02DDZuJblvX8-ZxelB_28ev9jU5HPT_q-1CtMSBi5Tok4njo-vY5FQse05685g"
                  />
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold">9.1</div>
                </div>
                <h5 className="font-title-md text-[14px] truncate px-1">Midnight Tides</h5>
              </div>
              <div className="flex-shrink-0 w-48 snap-start space-y-2">
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Vibrant, high-saturated abstract explosion of colored smoke and light. Primarily using magenta, teal, and lime green. The lighting is theatrical and dynamic, creating a sense of energy and chaos. Modern pop art style."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHI0fcPFsUj2eRgdxM2XDQM8HKWmFWuuj74P6-7J-om4Vmz_kNZL9UYqzJkPTRtiSVUA1UTFN_J_OwyG2w7HbSGqkZoHb5FSp44WfvoK1YPs7Yk_INTLH-1TFGB7iHyozJ_i_-RY0J721Kr5SvJPveLIvXLJhV3G7gqF34xrXZD7JOnmlVVkocIzbNzOmBZdraAH-QeslV7VvDyDsqTpqc9NdunL73nX7_Iyu4fRcKDd2O1Ml4W_GJ_any1BT_RQzukyLVyqT9NQ"
                  />
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold">8.7</div>
                </div>
                <h5 className="font-title-md text-[14px] truncate px-1">Chromatic Chaos</h5>
              </div>
              <div className="flex-shrink-0 w-48 snap-start space-y-2">
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Minimalist architectural shot of a spiraling concrete staircase in a bright, airy gallery. Strong geometric shadows and clean lines. The palette is muted greys and off-whites, emphasizing structure and form. High-key lighting."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTY7b0LtuE8ejBqAiOT5HZv2H8Ur-iSudK-tdSwvj2XVLwPd5yrNiFZRm01PMEZxUX5f2bBT2adx1MNFRM2kiduwncSi2UrH89SHZCBqm41cMGo8lX8jx27G6Xdn7i6X6WrExEgwMwhH5F11om041bj8ocJLxewI-oUVL2HWRxSGl8kbyEj2oU6m8gZA9Kfw_gJncrma-egID1PPD5oQ-R16FfBHgflyaBk4QG3VzJndWGUnO4iyOUF-5yFJRFLg58frxXoKaoGg"
                  />
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold">8.5</div>
                </div>
                <h5 className="font-title-md text-[14px] truncate px-1">Linear Paths</h5>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-[20px]">forum</span>
            <h4 className="font-title-md text-[14px] text-deep-forest">Room Chatter</h4>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <span className="font-bold text-label-sm text-primary">Sarah:</span>
              <p className="text-label-sm text-on-surface-variant">The Axolotl is definitely the cutest choice! 💖</p>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-label-sm text-primary">Marcus:</span>
              <p className="text-label-sm text-on-surface-variant">I don't know, a Rabbit feels more cozy...</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-surface rounded-full px-4 py-2 border border-outline-variant/30">
            <input className="bg-transparent border-none focus:ring-0 text-label-sm w-full p-0" placeholder="Type a message..." type="text" />
            <button className="text-primary active:scale-90 transition-transform" type="button">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-surface shadow-[0_-4px_12px_rgba(8,28,21,0.08)] z-50 rounded-t-lg">
        <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 hover:bg-surface-container-highest rounded-full transition-colors active-scale" type="button" onClick={() => onNavigate('dashboard')}>
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1.5 active-scale" type="button" onClick={() => onNavigate('create_watch_room')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            movie_filter
          </span>
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
