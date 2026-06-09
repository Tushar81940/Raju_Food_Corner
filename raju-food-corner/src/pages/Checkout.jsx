import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// ── Defined OUTSIDE to prevent remount on every keystroke ──

const StepBadge = ({ n }) => (
  <span className="w-6 h-6 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0">
    {n}
  </span>
);

const Field = ({ label, name, type = 'text', placeholder, rows, value, onChange, error }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    {rows ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition ${
          error ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'
        }`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={name === 'mobile' ? 10 : undefined}
        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition ${
          error ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'
        }`}
      />
    )}
    {error && (
      <p className="text-orange-600 text-xs mt-1 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// ── Main component ──

const Checkout = () => {
  const { cart, totalAmount, dispatch } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', mobile: '', address: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Cart is empty</h2>
        <Link to="/menu" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold text-sm transition">
          Add Items First
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.mobile.trim()) errs.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) errs.mobile = 'Enter a valid 10-digit mobile number';
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handlePlaceOrder = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const itemLines = cart.map(i => `  ${i.name} x ${i.quantity} = ₹${i.price * i.quantity}`).join('\n');
    const message =
      `🍽️ New Order - Raju Food Corner\n\n` +
      `Customer Name: ${form.name}\n` +
      `Mobile: ${form.mobile}\n` +
      `Delivery Address: ${form.address}\n\n` +
      `Items Ordered:\n${itemLines}\n\n` +
      `---------------------\n` +
      `Total Amount: ₹${totalAmount}\n` +
      `Payment Mode: Cash on Delivery\n` +
      `---------------------\n\n` +
      `Please confirm this order.`;
    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
      setLoading(false);
      window.open(`https://wa.me/919917326188?text=${encodeURIComponent(message)}`, '_blank');
      navigate('/order-success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Checkout</h1>
          <p className="text-gray-400 text-sm mt-0.5">Fill in your details to place the order</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 grid md:grid-cols-5 gap-6">

        {/* Left: Form */}
        <div className="md:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
              <StepBadge n="1" /> Delivery Details
            </p>
            <div className="flex flex-col gap-4">
              <Field
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Field
                label="Mobile Number"
                name="mobile"
                type="tel"
                placeholder="10-digit mobile number"
                value={form.mobile}
                onChange={handleChange}
                error={errors.mobile}
              />
              <Field
                label="Delivery Address"
                name="address"
                placeholder="House No., Street, Area, City..."
                rows={3}
                value={form.address}
                onChange={handleChange}
                error={errors.address}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
              <StepBadge n="2" /> Payment Method
            </p>
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-green-800 text-sm">Cash on Delivery</p>
                <p className="text-green-600 text-xs">Pay when your order arrives</p>
              </div>
              <span className="text-xl">💵</span>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
              <StepBadge n="3" /> Order Summary
            </p>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-2 items-center">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">× {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800 flex-shrink-0">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-black text-gray-800 text-sm">Total</span>
              <span className="font-black text-gray-900 text-xl">₹{totalAmount}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white hover:-translate-y-0.5'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                Placing Order...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Place Order via WhatsApp
              </>
            )}
          </button>
          <p className="text-center text-gray-400 text-xs">Redirects to WhatsApp with your order pre-filled</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
