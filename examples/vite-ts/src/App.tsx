import { useState } from 'react';
import blitzLogo from './assets/blitz.svg';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from 'blitz-ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="style-mira relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_30%),linear-gradient(160deg,#081120_0%,#0b1220_45%,#111827_100%)] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-8rem] left-[-6rem] h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-4rem] bottom-12 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <section className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
              Blitz UI
            </div>

            <div className="mb-8 flex items-center gap-4">
              <a
                href="https://vite.dev"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                <img
                  src={viteLogo}
                  className="h-12 w-12 drop-shadow-[0_0_24px_rgba(167,139,250,0.45)] transition group-hover:scale-105"
                  alt="Vite logo"
                />
              </a>
              <a
                href="https://react.dev"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                <img
                  src={reactLogo}
                  className="h-12 w-12 drop-shadow-[0_0_24px_rgba(34,211,238,0.45)] transition group-hover:scale-105"
                  alt="React logo"
                />
              </a>
              <a
                href="https://blitz-ui.com"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                <img
                  src={blitzLogo}
                  className="h-12 w-12 drop-shadow-[0_0_24px_rgba(125,211,252,0.35)] transition group-hover:scale-105"
                  alt="Blitz UI logo"
                />
              </a>
            </div>

            <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Blitz UI starter.
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="default"
                size="lg"
                className="bg-white text-slate-950 hover:bg-slate-100"
                onClick={() => setCount((current) => current + 1)}
              >
                Count: {count}
              </Button>
            </div>
          </section>

          <aside className="lg:justify-self-end">
            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">Preview</p>
                    <h2 className="mt-1 text-2xl font-semibold">Button</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
                  </div>
                </div>

                <div className="mt-6 space-y-4 rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-sm text-white/60">
                    Simple interactive example using packaged styles.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="default"
                      className="bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                      onClick={() => setCount((current) => current + 1)}
                    >
                      Increment
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 hover:text-white"
                      onClick={() => setCount(0)}
                    >
                      Reset
                    </Button>
                  </div>

                  <p className="text-3xl font-semibold">{count}</p>
                </div>

                <p className="mt-4 text-sm text-white/50">
                  Edit{' '}
                  <code className="rounded bg-white/8 px-1.5 py-1 text-white/80">src/App.tsx</code>{' '}
                  to customize the layout.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default App;
