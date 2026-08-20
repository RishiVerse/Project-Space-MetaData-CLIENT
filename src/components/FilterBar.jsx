const filterConfig = [
  ['objectType', 'Object Type', ['All objects', 'Planet', 'Moon', 'Nebula', 'Galaxy', 'Star', 'Deep Space']],
  ['mission', 'Mission', ['All missions', 'NASA', 'JWST', 'Hubble', 'Apollo', 'Juno', 'Cassini']],
  ['year', 'Year', ['Any year', '2020–now', '2010–2019', '2000–2009', 'Before 2000']],
  ['scale', 'Scale', ['All scales', 'Planetary', 'Deep space']],
];

export function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-bar" aria-label="Atlas filters">
      {filterConfig.map(([name, label, options]) => (
        <label className="filter-control" key={name}>
          <span>{label}</span>
          <select value={filters[name]} onChange={(event) => onChange(name, event.target.value)}>
            {options.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      ))}
    </div>
  );
}
