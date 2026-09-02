// Bespoke SVG illustrations for the Platform page's feature sections --
// deliberately not stock photography or product screenshots we don't have.
// Each reads as a technical/instrument-panel diagram of the concept it
// illustrates, in the site's ink/amber palette.

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-lg border border-border bg-card/60 p-8">
      {children}
    </div>
  )
}

export function DataModelIllustration() {
  const outputs = [-60, -30, 0, 30, 60]
  return (
    <Frame>
      <svg viewBox="0 0 320 200" className="h-full w-full max-w-sm" role="presentation">
        {outputs.map((angle, i) => {
          const x = 160 + Math.cos((angle * Math.PI) / 180) * 120
          const y = 100 + Math.sin((angle * Math.PI) / 180) * 55 - 20
          return (
            <g key={i}>
              <line x1={160} y1={100} x2={x} y2={y} stroke="#3a4155" strokeWidth={1} />
              <rect x={x - 22} y={y - 10} width={44} height={20} rx={4} fill="#171f28" stroke="#3a4155" />
            </g>
          )
        })}
        <circle cx={160} cy={100} r={30} fill="#171f28" stroke="#e0a53f" strokeWidth={2} />
        <circle cx={160} cy={100} r={10} fill="#e0a53f" />
      </svg>
    </Frame>
  )
}

export function EvidenceTrailIllustration() {
  return (
    <Frame>
      <svg viewBox="0 0 320 200" className="h-full w-full max-w-sm" role="presentation">
        <rect x={40} y={70} width={110} height={60} rx={6} fill="#171f28" stroke="#3a4155" strokeWidth={1.5} />
        <text x={95} y={95} textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="#e0a53f">
          14.2
        </text>
        <text x={95} y={112} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#7a818a">
          tCO2e
        </text>
        <line x1={150} y1={100} x2={200} y2={100} stroke="#e0a53f" strokeWidth={1.5} strokeDasharray="4 3" />
        <rect x={205} y={65} width={80} height={70} rx={4} fill="none" stroke="#5b6478" strokeWidth={1.5} />
        <line x1={218} y1={82} x2={272} y2={82} stroke="#5b6478" strokeWidth={2} />
        <line x1={218} y1={94} x2={272} y2={94} stroke="#5b6478" strokeWidth={2} />
        <line x1={218} y1={106} x2={255} y2={106} stroke="#5b6478" strokeWidth={2} />
        <line x1={218} y1={118} x2={262} y2={118} stroke="#5b6478" strokeWidth={2} />
      </svg>
    </Frame>
  )
}

export function UncertaintyIllustration() {
  const cells = [1, 0.8, 1, 0.4, 1, 1, 0.4, 0.8, 1, 1, 0.4, 1]
  return (
    <Frame>
      <svg viewBox="0 0 320 200" className="h-full w-full max-w-sm" role="presentation">
        {cells.map((v, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          const x = 60 + col * 55
          const y = 40 + row * 45
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={44}
              height={32}
              rx={3}
              fill={v < 1 ? "none" : "#171f28"}
              stroke={v < 1 ? "#e0a53f" : "#3a4155"}
              strokeDasharray={v < 1 ? "3 2" : undefined}
              strokeWidth={1.5}
            />
          )
        })}
      </svg>
    </Frame>
  )
}

export function EnergyMonitoringIllustration() {
  const energy = [30, 45, 60, 55, 70, 85, 78, 90, 82, 65, 50, 40]
  const carbon = [20, 30, 42, 38, 48, 58, 54, 62, 57, 46, 36, 28]
  const toPoints = (series: number[]) =>
    series.map((v, i) => `${20 + i * 24},${150 - v}`).join(" ")
  return (
    <Frame>
      <svg viewBox="0 0 320 200" className="h-full w-full max-w-sm" role="presentation">
        <line x1={20} y1={150} x2={300} y2={150} stroke="#3a4155" strokeWidth={1} />
        <polyline points={toPoints(energy)} fill="none" stroke="#5b6478" strokeWidth={2} />
        <polyline points={toPoints(carbon)} fill="none" stroke="#e0a53f" strokeWidth={2} />
      </svg>
    </Frame>
  )
}

export function SupplierNetworkIllustration() {
  const suppliers = [-70, -35, 0, 35, 70]
  return (
    <Frame>
      <svg viewBox="0 0 320 200" className="h-full w-full max-w-sm" role="presentation">
        <rect x={130} y={80} width={60} height={40} rx={6} fill="#171f28" stroke="#e0a53f" strokeWidth={2} />
        {suppliers.map((_, i) => {
          const nodeY = 165
          const nodeX = 40 + i * 60
          return (
            <g key={i}>
              <line x1={160} y1={100} x2={nodeX + 12} y2={nodeY} stroke="#3a4155" strokeWidth={1} />
              <circle cx={nodeX + 12} cy={nodeY} r={12} fill="#171f28" stroke="#5b6478" strokeWidth={1.5} />
            </g>
          )
        })}
      </svg>
    </Frame>
  )
}
