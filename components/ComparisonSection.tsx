const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 13.5L9.5 18L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6L18 18M6 18L18 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ComparisonSection() {
  const rows = [
    {
      label: "Prix",
      without: "Devis reçus au fil de l’eau, écarts de prix peu lisibles.",
      with: "5+ devis alignés sur le même volume et les mêmes options.",
    },
    {
      label: "Temps passé",
      without: "2–3 jours de recherches, appels et visites techniques.",
      with: "Un dossier unique, devis reçus sans relances ni visites.",
    },
    {
      label: "Stress & risques",
      without: "Qualité des déménageurs difficile à vérifier, risque d’arnaque.",
      with: "Pros contrôlés (assurances, avis) et support en cas de souci.",
    },
    {
      label: "Lisibilité des devis",
      without: "Formats différents, difficile de comparer ligne par ligne.",
      with: "Même dossier, colonnes alignées : vous voyez qui propose quoi.",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-4 md:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm text-white/85">
          <thead>
            <tr>
              <th className="w-40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                Aspect
              </th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                Sans comparateur
              </th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6BCFCF]">
                Avec notre comparateur
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="align-top px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                  {row.label}
                </td>
                <td className="align-top px-3 py-3">
                  <div className="flex items-start gap-2 text-white/70">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 text-red-300">
                      <CrossIcon className="h-3 w-3" />
                    </span>
                    <span>{row.without}</span>
                  </div>
                </td>
                <td className="align-top px-3 py-3">
                  <div className="flex items-start gap-2 text-emerald-100">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span>{row.with}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

