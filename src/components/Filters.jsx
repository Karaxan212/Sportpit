import { categories } from '../utils/categories'

export default function Filters({ selectedCategory, search, onSearch, onSelectCategory }) {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-glow">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-300">Поиск</label>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="По названию или ингредиенту"
          className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-brand-400"
        />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Категории</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategory === category.id ? 'bg-brand-500 text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
