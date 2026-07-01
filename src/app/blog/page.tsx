// Feed shell for blog.hugobayoud.fr. Reading real Shorts is issue 002;
// for now the feed renders its heading and an empty state.
export default function BlogFeedPage() {
  const hasShorts = false;

  return (
    <main className="mt-6">
      <h2 className="text-xl font-[family-name:var(--font-tt-trailers-bold)] tracking-wide mb-6">
        Mes shorts
      </h2>

      {!hasShorts && (
        <p className="opacity-60 text-sm py-16 text-center">
          Rien ici pour l’instant. Reviens bientôt.
        </p>
      )}
    </main>
  );
}
