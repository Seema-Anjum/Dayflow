export default function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between gap-3 pl-2">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-ink-900">{value}</h2>
          {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
        </div>
        {Icon && <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon size={19} /></span>}
      </div>
    </div>
  );
}
