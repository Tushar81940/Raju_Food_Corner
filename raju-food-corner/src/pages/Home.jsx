import { Link } from 'react-router-dom';
import { featuredItems } from '../data/menuData';
import { useCart } from '../context/CartContext';

const categories = [
  { name: 'South Indian', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=80' },
  { name: 'Chinese',      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80' },
  { name: 'Burger',       image: 'https://dailydishrecipes.com/wp-content/uploads/2019/05/Garlic-Overload-Burgers-with-Creamy-Garlic-Burger-Sauce-FEATURED.jpg' },
  { name: 'Rice',         image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
  { name: 'Momos',        image: 'https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg' },
  { name: 'Pav Bhaji',    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgNy1mn5ccYNPfYdSC8_r007P0q6GZPiPkdg&s' },
];

const steps = [
  { icon: '🍽️', title: 'Choose Your Meal',   desc: 'Browse our menu and pick your favourite dishes from our wide variety.' },
  { icon: '📱', title: 'Confirm on WhatsApp', desc: 'Your order is sent directly to our WhatsApp. We confirm within minutes.' },
  { icon: '🛵', title: 'Get It Delivered',    desc: 'Sit back and relax. Fresh food arrives hot at your doorstep.' },
];

const FeaturedCard = ({ item }) => {
  const { cart, dispatch } = useCart();
  const qty = cart.find(i => i.id === item.id)?.quantity || 0;
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 w-48 sm:w-auto border border-gray-100">
      <div className="h-40 overflow-hidden bg-gray-100">
        <img
          src={imgErr ? 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' : item.image}
          onError={() => setImgErr(true)}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-900 font-bold text-sm">₹{item.price}</span>
          {qty === 0 ? (
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', item })}
              className="border border-gray-300 hover:border-orange-400 hover:text-orange-600 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg transition bg-white"
            >
              ADD +
            </button>
          ) : (
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-1 py-0.5 bg-white">
              <button onClick={() => dispatch({ type: 'DECREASE', id: item.id })} className="w-5 h-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-bold flex items-center justify-center text-sm transition">−</button>
              <span className="w-4 text-center text-xs font-bold text-gray-800">{qty}</span>
              <button onClick={() => dispatch({ type: 'INCREASE', id: item.id })} className="w-5 h-5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold flex items-center justify-center text-sm transition">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// useState import needed for FeaturedCard
import { useState, useRef, useEffect } from 'react';

const PopularDishes = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animId;
    let pos = 0;
    const speed = 0.5; // px per frame — gentle

    const step = () => {
      pos += speed;
      // when we've scrolled half the duplicated list, reset to 0 seamlessly
      if (pos >= track.scrollWidth / 2) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(step); };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resume);

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
    };
  }, []);

  const allItems = [...featuredItems, ...featuredItems]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex gap-4 w-max">
        {allItems.map((item, idx) => (
          <FeaturedCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=90"
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/65 to-black/25"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              🔥 Now Taking Orders
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 tracking-tight">
              Raju<br />
              <span className="text-orange-400">Food</span> Corner
            </h1>

            <p className="text-gray-300 text-lg md:text-xl font-light mb-2">
              Fresh South Indian &amp; Fast Food
            </p>
            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md leading-relaxed">
              From crispy dosas to steaming momos — authentic flavours made fresh, delivered hot to your door.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl text-base shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                Order Now →
              </Link>
              <a
                href="https://wa.me/919917326188"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-base border border-white/25 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-green-400" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>

            <div className="flex gap-8 mt-10">
              {[{ val: '43+', label: 'Menu Items' }, { val: '6', label: 'Categories' }, { val: 'COD', label: 'Payment' }].map(s => (
                <div key={s.label}>
                  <p className="text-white font-black text-2xl tracking-tight">{s.val}</p>
                  <p className="text-gray-400 text-xs font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero circle image */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-orange-400/40 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=90" alt="Dosa" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
                <span className="text-yellow-500 text-lg">⭐</span>
                <div>
                  <p className="text-xs font-black text-gray-800">Top Rated</p>
                  <p className="text-[10px] text-gray-400">South Indian</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gray-900 text-white rounded-2xl shadow-lg px-3 py-2">
                <p className="text-xs font-bold">🚚 Free Delivery</p>
                <p className="text-[10px] text-gray-400">On all orders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-gray-900 py-3 overflow-hidden">
        <div className="flex gap-10 animate-marquee whitespace-nowrap px-6">
          {['🍽️ Fresh & Homemade', '🚚 Free Home Delivery', '💵 Cash on Delivery', '📞 9917326188', '⏱️ Quick & Fresh', '🥟 Momos • Dosa • Burger • Chinese'].map((t, i) => (
            <span key={i} className="text-gray-400 font-medium text-sm shrink-0">{t}</span>
          ))}
          {['🍽️ Fresh & Homemade', '🚚 Free Home Delivery', '💵 Cash on Delivery', '📞 9917326188', '⏱️ Quick & Fresh', '🥟 Momos • Dosa • Burger • Chinese'].map((t, i) => (
            <span key={`d${i}`} className="text-gray-400 font-medium text-sm shrink-0">{t}</span>
          ))}
        </div>
      </div>

      {/* ── POPULAR DISHES ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-orange-500 font-semibold text-xs tracking-widest uppercase">✦ Most Loved</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 tracking-tight">Our Popular Dishes</h2>
          <p className="text-gray-400 mt-2 text-sm">Explore our most loved menu items</p>
        </div>

        <PopularDishes />

        <div className="text-center mt-8">
          <Link to="/menu" className="inline-block border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-sm bg-white">
            See All Dishes →
          </Link>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-orange-500 font-semibold text-xs tracking-widest uppercase">✦ Browse by</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 tracking-tight">Menu Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/menu?category=${encodeURIComponent(cat.name)}`}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"></div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <p className="text-white font-bold text-sm drop-shadow">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-xs tracking-widest uppercase">✦ Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 tracking-tight">How Does It Work</h2>
          <p className="text-gray-400 mt-2 text-sm">Simple steps to get your favourite food</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-gray-100 group-hover:bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300 text-4xl shadow-sm leading-none">
                <span>{step.icon}</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-4"></div>
              <h3 className="font-bold text-gray-800 text-base mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-gray-950 py-20 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Hungry? Let's fix that.</h2>
          <p className="text-gray-400 mb-8 text-base">Order now and get fresh food delivered to your door.</p>
          <Link
            to="/menu"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl text-base shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Explore Full Menu 🍽️
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-500 py-10 px-4 sm:px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-white font-black text-lg mb-1 tracking-tight">Raju Food Corner</p>
            <p className="text-orange-400 text-sm mb-3">Fresh South Indian & Fast Food</p>
            <p className="text-sm leading-relaxed">Authentic flavours made fresh, delivered fast to your door.</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-sm">Contact Us</p>
            <p className="text-sm">📞 Bipin Prajapati: 9917326188</p>
            <p className="text-sm mt-1">📞 Aniket Prajapati: 7535937746</p>
            <a
              href="https://wa.me/919917326188"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-sm">Quick Links</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/menu" className="hover:text-white transition">Full Menu</Link>
              <Link to="/cart" className="hover:text-white transition">My Cart</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-600">
          © 2025 Raju Food Corner. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
