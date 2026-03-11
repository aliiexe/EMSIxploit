export default function NewsPage() {
  return (
    <>
      <section className="px-6 py-[8rem] sm:px-8 md:px-10" data-animated-section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            Latest from the Club
          </h1>
          <p className="mt-6 text-lg leading-[1.7] text-[var(--text-muted)]">
            Meetups, workshops, CTF prep, and announcements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24 sm:px-8 md:px-10" data-animated-section>
        <div className="glass-card p-10 text-center">
          <p className="leading-[1.7] text-[var(--text-muted)]">
            News and events will be listed here. You can add MDX posts under{" "}
            <code className="rounded-[0.75rem] bg-[var(--glass-bg)] px-2 py-0.5 font-mono text-sm text-[var(--accent)]">content/news/</code> or
            connect a CMS later.
          </p>
        </div>
      </section>
    </>
  );
}
