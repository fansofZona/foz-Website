const average = [[0,0],[5,.031],[10,.047],[15,.056],[20,.061],[30,.066],[40,.068],[50,.069]];
const baseline = [[0,0],[5,.028],[10,.041],[15,.049],[20,.053],[30,.057],[40,.058],[50,.059]];
const points = (data: number[][]) => data.map(([x,y]) => `${44+x*7.6},${222-y*2400}`).join(" ");

/** Values transcribed from expected-threat-college-soccer.mdx. */
export function ResearchVisual() {
  return (
    <figure className="my-8">
      <svg viewBox="0 0 450 285" role="img" aria-label="Accumulated expected threat per possession. Average rises from zero to 0.069 over 50 seconds; league baseline reaches 0.059.">
        {[0,.02,.04,.06,.08].map(y => <g key={y}><line x1="44" x2="424" y1={222-y*2400} y2={222-y*2400} className="chart-grid"/><text x="32" y={226-y*2400} textAnchor="end" className="chart-label">{y.toFixed(2)}</text></g>)}
        {[0,10,20,30,40,50].map(x => <text key={x} x={44+x*7.6} y="248" textAnchor="middle" className="chart-label">{x}</text>)}
        <polyline points={points(baseline)} fill="none" strokeWidth="2" strokeDasharray="5 6" className="chart-baseline"/>
        <polyline points={points(average)} fill="none" strokeWidth="3" strokeLinejoin="round" className="chart-average"/>
        {average.map(([x,y]) => <circle key={x} cx={44+x*7.6} cy={222-y*2400} r="3" fill="var(--color-rain)"/>)}
        <text x="44" y="14" className="chart-label">Accumulated xT / possession</text>
        <text x="234" y="278" textAnchor="middle" className="chart-label">Possession duration (seconds)</text>
      </svg>
      <figcaption className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-body-sm"><span className="text-rain">Average possession</span><span className="text-cloud">Dashed: league baseline</span></figcaption>
    </figure>
  );
}
