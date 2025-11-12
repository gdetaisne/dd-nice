export default function DevisOptions() {
  return (
    <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
      {/* Option 1 : Devis précis (photos IA) - RECOMMANDÉ */}
      <div className="card-glass rounded-2xl p-6 md:p-8 border-2 border-[#6bcfcf] hover:scale-[1.02] transition-all duration-300 relative">
        {/* Badge recommandé */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#6bcfcf] px-4 py-1 text-xs font-semibold text-[#04163a]">
            ⭐ Recommandé
          </span>
        </div>

        <div className="flex items-center gap-3 mb-6 mt-2">
          <div className="text-4xl">📸</div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-white">Devis précis</h3>
            <p className="text-white/70 text-sm">Avec photos IA</p>
          </div>
        </div>
        
        <ul className="space-y-3 mb-8 text-sm text-white/85">
          <li className="flex items-start gap-2">
            <span className="text-[#6bcfcf] text-lg mt-0.5">✓</span>
            <span><strong className="text-white">Volume IA exact</strong> → devis vraiment comparables</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#6bcfcf] text-lg mt-0.5">✓</span>
            <span>3-5 photos par pièce <span className="text-white/60">(30 min)</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#6bcfcf] text-lg mt-0.5">✓</span>
            <span><strong className="text-white">Précision 95%</strong> → aucune surprise le jour J</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#6bcfcf] text-lg mt-0.5">✓</span>
            <span>3-5 devis garantis sous 7 jours</span>
          </li>
        </ul>
        
        <a 
          href="/inventaire-ia/" 
          className="btn-primary w-full text-center inline-block"
        >
          Comparer 5 devis précis
        </a>
        
        <p className="text-white/50 text-xs mt-4 text-center">
          Pour un résultat fiable et sans mauvaise surprise
        </p>
      </div>

      {/* Option 2 : Estimation rapide (sans photos) */}
      <div className="card-glass rounded-2xl p-6 md:p-8 border-2 border-white/20 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">⚡</div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-white">Estimation rapide</h3>
            <p className="text-white/70 text-sm">Sans photos</p>
          </div>
        </div>
        
        <ul className="space-y-3 mb-8 text-sm text-white/85">
          <li className="flex items-start gap-2">
            <span className="text-[#6bcfcf] text-lg mt-0.5">✓</span>
            <span>Formulaire simple <span className="text-white/60">(30 secondes)</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#6bcfcf] text-lg mt-0.5">✓</span>
            <span>Estimation approximative immédiate</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 text-lg mt-0.5">⚠</span>
            <span className="text-white/70">Moins précis → risque de variation jour J</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/40 text-lg mt-0.5">•</span>
            <span className="text-white/60">Bon pour avoir une première idée de budget</span>
          </li>
        </ul>
        
        <a 
          href="/estimation-rapide/" 
          className="btn-secondary w-full text-center inline-block"
        >
          Estimer mon budget
        </a>
        
        <p className="text-white/50 text-xs mt-4 text-center">
          Pour une première idée sans engagement
        </p>
      </div>
    </div>
  );
}

