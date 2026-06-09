import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #fff 50%, #f0fdf4 100%)' }}>

      <div className={`w-full max-w-md transition-all duration-500 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

        {/* Main card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

          {/* Green top banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-white mb-1">Order Placed!</h1>
            <p className="text-green-100 text-sm">Successfully sent to WhatsApp</p>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <p className="text-gray-500 text-sm text-center leading-relaxed mb-6">
              Your order is on its way to Raju Food Corner. They'll confirm your order shortly via WhatsApp. 🍽️
            </p>

            {/* Steps */}
            <div className="flex items-start gap-3 mb-6">
              {[
                { icon: '📱', label: 'Order Sent', sub: 'WhatsApp notified' },
                { icon: '✅', label: 'Confirming', sub: 'Restaurant reviewing' },
                { icon: '🚚', label: 'Delivery', sub: 'Coming to you' },
              ].map((s, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1.5 text-lg ${i === 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {s.icon}
                  </div>
                  <p className={`text-xs font-bold ${i === 0 ? 'text-green-700' : 'text-gray-400'}`}>{s.label}</p>
                  <p className="text-[10px] text-gray-400">{s.sub}</p>
                  {i < 2 && (
                    <div className="hidden"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-200 mb-5"></div>

            {/* Contact */}
            <div className="flex items-center gap-4 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📞</div>
              <div>
                <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-0.5">Need help?</p>
                <p className="text-sm text-orange-700 font-semibold">9917326188 &nbsp;·&nbsp; 7535937746</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                to="/menu"
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-center transition-all duration-200 text-white"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
              >
                🛒 Order More Items
              </Link>
              <Link
                to="/"
                className="w-full py-3.5 rounded-2xl font-semibold text-sm text-center text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700 transition-all duration-200 bg-white"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-5">
          Raju Food Corner · Fresh South Indian &amp; Fast Food
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
