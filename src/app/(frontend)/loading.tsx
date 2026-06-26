import Image from 'next/image'

export default function Loading() {
  return (
    <main
      className="flex min-h-[calc(100svh-88px)] items-center justify-center bg-[linear-gradient(135deg,rgba(12,36,48,0.86),rgba(8,16,20,0.94))] px-5 text-white"
      aria-label="Page loading"
      aria-busy="true"
    >
      <div className="page-loader text-center">
        <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
          <span className="page-loader__ring absolute inset-0 rounded-full border border-white/20" />
          <span className="page-loader__ring page-loader__ring--delay absolute inset-3 rounded-full border border-[var(--skyBlue)]/60" />
          <Image
            src="/images/logo.svg"
            alt="Cybernaut"
            width={70}
            height={53}
            priority
            className="relative z-10 h-auto w-[70px]"
          />
        </div>

        <p className="mt-6 font-roboto-condensed text-sm font-semibold uppercase tracking-[0.18em] text-white/82">
          Loading
        </p>
        <div className="page-loader__bar mx-auto mt-4 h-[3px] w-44 overflow-hidden rounded-full bg-white/18">
          <span className="block h-full w-1/2 rounded-full bg-[var(--skyBlue)]" />
        </div>
      </div>
    </main>
  )
}
