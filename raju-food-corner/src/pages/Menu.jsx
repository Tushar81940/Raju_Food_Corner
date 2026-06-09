import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { menuItems, categories } from '../data/menuData';
import MenuCard from '../components/MenuCard';

const categoryImages = {
  'South Indian': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=80',
  'Chinese':      'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80',
  'Burger':       'https://dailydishrecipes.com/wp-content/uploads/2019/05/Garlic-Overload-Burgers-with-Creamy-Garlic-Burger-Sauce-FEATURED.jpg',
  'Rice':         'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80',
  'Momos':        'https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg',
  'Pav Bhaji':    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgNy1mn5ccYNPfYdSC8_r007P0q6GZPiPkdg&s',
};

const Menu = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const heroBg = activeCategory !== 'All' ? categoryImages[activeCategory] : 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-44 md:h-56 overflow-hidden">
        <img src={heroBg} alt="" className="w-full h-full object-cover transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
            {activeCategory === 'All' ? 'Full Menu' : activeCategory}
          </h1>
          <p className="text-gray-300 text-sm">Raju Food Corner — Fresh &amp; Delicious</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Search */}
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
          />
          {search ? (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-base leading-none">✕</button>
          ) : (
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wider">
          {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          {search ? ` matching "${search}"` : ''}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">😕</p>
            <p className="text-gray-400 text-lg font-medium">No items found</p>
            <p className="text-gray-400 text-sm mt-1">Try searching something else</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="mt-5 bg-red-600 text-white px-6 py-2 rounded-xl font-semibold text-sm hover:bg-red-700 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
