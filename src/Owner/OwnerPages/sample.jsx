// import React, { useMemo, useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
// import { Check, CreditCard, MapPin, Calendar, User2, ChevronRight, ChevronLeft, Star, Home, Bath, Trees, Mountain, Map } from "lucide-react";

// /*
//   Resort/Adventure/Spa/Farm House Booking — Single-File React Prototype
//   - Tailwind-only UI, no external CSS needed
//   - Pages (simulated with local state):
//     1) Home (with Sign in / Sign up modals)
//     2) Locations
//     3) Category selector (Resort / Adventure / Spa / Farm House)
//     4) Details page (gallery + info + CTA)
//     5) Traveller details form
//     6) Detail payment graph (bar + pie)
//     7) Payment
//     8) Success
// */

// const heroUrl = "https://images.unsplash.com/photo-1501117716987-c8e27788cf00?q=80&w=1920&auto=format&fit=crop";

// const sampleImages = [
//   "https://images.unsplash.com/photo-1501117716987-c8e27788cf00?q=80&w=1600&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1502920917128-1aa500764f72?q=80&w=1600&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1600&auto=format&fit=crop",
// ];

// const categoryData = [
//   { key: "resort", label: "Resort", icon: Home, img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop" },
//   { key: "adventure", label: "Adventure", icon: Mountain, img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop" },
//   { key: "spa", label: "Spa", icon: Bath, img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1600&auto=format&fit=crop" },
//   { key: "farm", label: "Farm House", icon: Trees, img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop" },
// ];

// const locations = [
//   { name: "Kerala", img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1600&auto=format&fit=crop" },
//   { name: "Goa", img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop" },
//   { name: "Rajasthan", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1600&auto=format&fit=crop" },
//   { name: "Himachal", img: "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1600&auto=format&fit=crop" },
//   { name: "Andaman", img: "https://images.unsplash.com/photo-1526485797145-8bb66d1dfe48?q=80&w=1600&auto=format&fit=crop" },
//   { name: "Kashmir", img: "https://images.unsplash.com/photo-1524492514798-3b7be0b2ec5c?q=80&w=1600&auto=format&fit=crop" },
// ];

// const priceBreakdown = (
//   base, taxes = 0.12, service = 0.05, discount = 0.1
// ) => {
//   const taxAmt = base * taxes;
//   const svcAmt = base * service;
//   const discAmt = base * discount;
//   const total = base + taxAmt + svcAmt - discAmt;
//   return {
//     base,
//     taxAmt,
//     svcAmt,
//     discAmt,
//     total,
//   };
// };

// const COLORS = ["#0ea5e9", "#22c55e", "#fbbf24", "#ef4444"];

// const Section = ({ title, children, right }) => (
//   <div className="w-full max-w-6xl mx-auto px-4">
//     <div className="flex items-end justify-between mb-4">
//       <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
//       {right}
//     </div>
//     <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-4 md:p-6">{children}</div>
//   </div>
// );

// const Card = ({ children, onClick }) => (
//   <button onClick={onClick} className="text-left bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden">
//     {children}
//   </button>
// );

// const Field = ({ label, children }) => (
//   <label className="space-y-1.5 block">
//     <span className="text-sm font-medium text-slate-700">{label}</span>
//     {children}
//   </label>
// );

// const Modal = ({ open, onClose, title, children }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative" onClick={(e)=>e.stopPropagation()}>
//         <button className="absolute top-3 right-3 text-slate-500 hover:text-slate-700" onClick={onClose}>✕</button>
//         <h3 className="text-lg font-semibold mb-4">{title}</h3>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   const [page, setPage] = useState(1);
//   const [signinOpen, setSigninOpen] = useState(false);
//   const [signupOpen, setSignupOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [adults, setAdults] = useState(2);
//   const [children, setChildren] = useState(0);
//   const [dates, setDates] = useState({ in: "2025-08-17", out: "2025-08-20" });
//   const [traveller, setTraveller] = useState({ name: "", email: "", phone: "" });
//   const [basePrice, setBasePrice] = useState(18000);
//   const [card, setCard] = useState({ holder: "", number: "", expiry: "", cvv: "" });

//   const breakdown = useMemo(() => priceBreakdown(basePrice), [basePrice]);

//   const go = (n) => setPage(n);
//   const next = () => setPage((p) => Math.min(8, p + 1));
//   const back = () => setPage((p) => Math.max(1, p - 1));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800">
//       {/* HERO / NAV */}
//       <header className="relative h-[68vh] md:h-[72vh] overflow-hidden">
//         <img src={heroUrl} alt="hero" className="absolute inset-0 w-full h-full object-cover brightness-50"/>
//         <nav className="relative z-10 max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Map className="w-6 h-6 text-white"/>
//             <span className="text-white text-lg font-semibold tracking-wide">Getaway</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={()=>setSigninOpen(true)} className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 font-medium shadow">Sign in</button>
//             <button onClick={()=>setSignupOpen(true)} className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium shadow">Sign up</button>
//           </div>
//         </nav>
//         <div className="relative z-10 h-full flex items-center">
//           <div className="max-w-6xl mx-auto px-4 w-full">
//             <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-6 md:p-10 text-white shadow-2xl">
//               <h1 className="text-3xl md:text-5xl font-bold leading-tight">Find your perfect Resort, Adventure, Spa, or Farm House</h1>
//               <p className="mt-3 md:mt-4 text-white/90 max-w-2xl">Curated stays and experiences across India. Seamless booking from inspiration to confirmation.</p>
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
//                 <button onClick={()=>go(2)} className="px-4 py-3 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-medium shadow flex items-center justify-center gap-2"><MapPin className="w-5 h-5"/>Choose Location</button>
//                 <button onClick={()=>go(3)} className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium shadow flex items-center justify-center gap-2"><Home className="w-5 h-5"/>Pick Category</button>
//                 <button onClick={()=>go(5)} className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium shadow flex items-center justify-center gap-2"><User2 className="w-5 h-5"/>Traveller</button>
//                 <button onClick={()=>go(7)} className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium shadow flex items-center justify-center gap-2"><CreditCard className="w-5 h-5"/>Payment</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* PAGE CONTROLS */}
//       <div className="max-w-6xl mx-auto px-4 mt-6 mb-2 flex items-center gap-2">
//         <button onClick={back} className="px-3 py-2 rounded-xl bg-white shadow hover:shadow-md flex items-center gap-1"><ChevronLeft className="w-4 h-4"/>Back</button>
//         <div className="text-sm text-slate-500">Page {page} / 8</div>
//         <div className="ml-auto"/>
//         <button onClick={next} className="px-3 py-2 rounded-xl bg-sky-500 text-white shadow hover:bg-sky-600 flex items-center gap-1">Next<ChevronRight className="w-4 h-4"/></button>
//       </div>

//       {/* PAGES */}
//       <div className="space-y-8 pb-16">
//         {page === 1 && (
//           <Section title="Home">
//             <div className="grid md:grid-cols-4 gap-4">
//               {categoryData.map((c) => (
//                 <Card key={c.key} onClick={()=>{ setCategory(c.key); go(3); }}>
//                   <div className="h-44 relative">
//                     <img src={c.img} alt={c.label} className="w-full h-full object-cover" />
//                     <div className="absolute inset-0 bg-black/20"/>
//                     <div className="absolute bottom-0 w-full p-3 text-white font-semibold">{c.label}</div>
//                   </div>
//                   <div className="p-4">
//                     <p className="text-sm text-slate-600">Handpicked {c.label.toLowerCase()} options with flexible cancellation and top ratings.</p>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </Section>
//         )}

//         {page === 2 && (
//           <Section title="Choose a Location">
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {locations.map((loc) => (
//                 <Card key={loc.name} onClick={()=>{ setSelectedLocation(loc.name); go(3); }}>
//                   <div className="h-40 relative">
//                     <img src={loc.img} alt={loc.name} className="w-full h-full object-cover" />
//                     <div className="absolute inset-0 bg-black/10"/>
//                     <div className="absolute bottom-0 w-full p-3 text-white font-semibold">{loc.name}</div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </Section>
//         )}

//         {page === 3 && (
//           <Section title="Select a Category" right={selectedLocation && <div className="text-sm text-slate-500">Location: <span className="font-medium text-slate-700">{selectedLocation}</span></div>}>
//             <div className="grid md:grid-cols-4 gap-4">
//               {categoryData.map(({key, label, icon: Icon, img}) => (
//                 <Card key={key} onClick={()=>{ setCategory(key); go(4); }}>
//                   <div className="h-44 relative">
//                     <img src={img} alt={label} className="w-full h-full object-cover" />
//                     <div className="absolute inset-0 bg-black/20"/>
//                     <div className="absolute bottom-0 w-full p-3 text-white font-semibold flex items-center gap-2"><Icon className="w-5 h-5"/>{label}</div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </Section>
//         )}

//         {page === 4 && (
//           <Section title="Place Details" right={<div className="text-sm text-slate-500">{selectedLocation ? selectedLocation+" · " : ""}{category ? category.charAt(0).toUpperCase()+category.slice(1) : ""}</div>}>
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Gallery */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="col-span-2 h-56 rounded-2xl overflow-hidden"><img src={sampleImages[0]} alt="gallery" className="w-full h-full object-cover"/></div>
//                 <div className="h-40 rounded-2xl overflow-hidden"><img src={sampleImages[1]} alt="gallery" className="w-full h-full object-cover"/></div>
//                 <div className="h-40 rounded-2xl overflow-hidden"><img src={sampleImages[2]} alt="gallery" className="w-full h-full object-cover"/></div>
//               </div>
//               {/* Details */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 text-amber-500">
//                   {[...Array(5)].map((_,i)=>(<Star key={i} className={`w-5 h-5 ${i<4?"fill-amber-400":""}`} />))}
//                   <span className="text-slate-700 font-medium">4.0 (1,284 reviews)</span>
//                 </div>
//                 <p className="text-slate-700 leading-relaxed">Nestled in nature, this {category || "stay"} offers panoramic views, modern amenities, and curated experiences. Enjoy guided tours, spa therapies, and farm-to-table dining.</p>
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div className="p-3 bg-slate-50 rounded-xl">Check-in: <span className="font-medium">3:00 PM</span></div>
//                   <div className="p-3 bg-slate-50 rounded-xl">Check-out: <span className="font-medium">11:00 AM</span></div>
//                   <div className="p-3 bg-slate-50 rounded-xl">Free Wi‑Fi</div>
//                   <div className="p-3 bg-slate-50 rounded-xl">Complimentary Breakfast</div>
//                 </div>
//                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
//                   <div>
//                     <div className="text-sm text-slate-500">Starting from</div>
//                     <div className="text-2xl font-semibold">₹ {basePrice.toLocaleString()}</div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button onClick={()=>go(5)} className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow">Book Now</button>
//                     <button onClick={()=>go(6)} className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border shadow">View Pricing</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Section>
//         )}

//         {page === 5 && (
//           <Section title="Traveller Details" right={<div className="text-sm text-slate-500 flex items-center gap-3"><Calendar className="w-4 h-4"/> <input value={dates.in} onChange={e=>setDates(s=>({...s,in:e.target.value}))} type="date" className="border rounded-lg px-2 py-1"/> → <input value={dates.out} onChange={e=>setDates(s=>({...s,out:e.target.value}))} type="date" className="border rounded-lg px-2 py-1"/></div>}>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <Field label="Full Name">
//                   <input value={traveller.name} onChange={e=>setTraveller(s=>({...s,name:e.target.value}))} placeholder="Irfan Khan" className="w-full px-3 py-2 border rounded-xl"/>
//                 </Field>
//                 <Field label="Email">
//                   <input value={traveller.email} onChange={e=>setTraveller(s=>({...s,email:e.target.value}))} placeholder="you@example.com" className="w-full px-3 py-2 border rounded-xl"/>
//                 </Field>
//                 <Field label="Phone">
//                   <input value={traveller.phone} onChange={e=>setTraveller(s=>({...s,phone:e.target.value}))} placeholder="+91-98765 43210" className="w-full px-3 py-2 border rounded-xl"/>
//                 </Field>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="Adults">
//                     <input type="number" min={1} value={adults} onChange={e=>setAdults(Number(e.target.value))} className="w-full px-3 py-2 border rounded-xl"/>
//                   </Field>
//                   <Field label="Children">
//                     <input type="number" min={0} value={children} onChange={e=>setChildren(Number(e.target.value))} className="w-full px-3 py-2 border rounded-xl"/>
//                   </Field>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="p-4 bg-slate-50 rounded-2xl">
//                   <div className="font-medium mb-2">Summary</div>
//                   <div className="text-sm text-slate-600">{adults} adults, {children} children</div>
//                   <div className="text-sm text-slate-600">{dates.in} → {dates.out}</div>
//                   <div className="mt-2 text-2xl font-semibold">₹ {(breakdown.total).toLocaleString()}</div>
//                 </div>
//                 <button onClick={()=>go(6)} className="w-full px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium shadow">Continue to Price Graph</button>
//               </div>
//             </div>
//           </Section>
//         )}

//         {page === 6 && (
//           <Section title="Detailed Payment Graph" right={<div className="text-sm text-slate-500">Interactive breakdown</div>}>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="h-72 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={[
//                     { name: "Base", value: breakdown.base },
//                     { name: "Tax", value: breakdown.taxAmt },
//                     { name: "Service", value: breakdown.svcAmt },
//                     { name: "Discount", value: -breakdown.discAmt },
//                   ]}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name"/>
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="h-72 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie dataKey="value" data={[
//                       { name: "Base", value: breakdown.base },
//                       { name: "Tax", value: breakdown.taxAmt },
//                       { name: "Service", value: breakdown.svcAmt },
//                       { name: "Discount", value: breakdown.discAmt },
//                     ]} innerRadius={55} outerRadius={90} paddingAngle={2}>
//                       {COLORS.map((c, i) => (
//                         <Cell key={i} fill={c} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//             <div className="mt-4 flex items-center justify-between">
//               <div>
//                 <div className="text-sm text-slate-500">Total Payable</div>
//                 <div className="text-2xl font-semibold">₹ {breakdown.total.toLocaleString()}</div>
//               </div>
//               <button onClick={()=>go(7)} className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium shadow">Proceed to Payment</button>
//             </div>
//           </Section>
//         )}

//         {page === 7 && (
//           <Section title="Payment">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <Field label="Card Holder Name">
//                   <input value={card.holder} onChange={e=>setCard(s=>({...s,holder:e.target.value}))} placeholder="Irfan Khan" className="w-full px-3 py-2 border rounded-xl"/>
//                 </Field>
//                 <Field label="Card Number">
//                   <input value={card.number} onChange={e=>setCard(s=>({...s,number:e.target.value}))} placeholder="1234 5678 9012 3456" className="w-full px-3 py-2 border rounded-xl"/>
//                 </Field>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="Expiry">
//                     <input value={card.expiry} onChange={e=>setCard(s=>({...s,expiry:e.target.value}))} placeholder="MM/YY" className="w-full px-3 py-2 border rounded-xl"/>
//                   </Field>
//                   <Field label="CVV">
//                     <input value={card.cvv} onChange={e=>setCard(s=>({...s,cvv:e.target.value}))} placeholder="***" className="w-full px-3 py-2 border rounded-xl"/>
//                   </Field>
//                 </div>
//                 <button onClick={()=>go(8)} className="w-full px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow flex items-center justify-center gap-2"><CreditCard className="w-5 h-5"/>Pay ₹ {breakdown.total.toLocaleString()}</button>
//               </div>
//               <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
//                 <div className="font-medium">Order Summary</div>
//                 <div className="flex items-center justify-between text-sm"><span>Base</span><span>₹ {breakdown.base.toLocaleString()}</span></div>
//                 <div className="flex items-center justify-between text-sm"><span>Tax (12%)</span><span>₹ {breakdown.taxAmt.toLocaleString()}</span></div>
//                 <div className="flex items-center justify-between text-sm"><span>Service (5%)</span><span>₹ {breakdown.svcAmt.toLocaleString()}</span></div>
//                 <div className="flex items-center justify-between text-sm text-rose-600"><span>Discount</span><span>- ₹ {breakdown.discAmt.toLocaleString()}</span></div>
//                 <div className="border-t pt-2 flex items-center justify-between font-semibold"><span>Total</span><span>₹ {breakdown.total.toLocaleString()}</span></div>
//               </div>
//             </div>
//           </Section>
//         )}

//         {page === 8 && (
//           <Section title="Payment Successful">
//             <div className="grid md:grid-cols-3 gap-6 items-center">
//               <div className="md:col-span-2">
//                 <div className="rounded-2xl overflow-hidden">
//                   <img src={sampleImages[3]} alt="confirmed" className="w-full h-72 object-cover"/>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2 text-emerald-600"><Check className="w-5 h-5"/><span className="font-semibold">Booking Confirmed</span></div>
//                 <div className="text-sm text-slate-600">A confirmation email has been sent to {traveller.email || "your inbox"}. Your stay is secured from <span className="font-medium">{dates.in}</span> to <span className="font-medium">{dates.out}</span>.</div>
//                 <div className="p-4 bg-slate-50 rounded-2xl">
//                   <div className="font-medium mb-1">Guest</div>
//                   <div className="text-sm">{traveller.name || "Guest"} · {adults} adults, {children} children</div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button onClick={()=>go(1)} className="px-4 py-2 rounded-xl bg-white border shadow">Back to Home</button>
//                   <button className="px-4 py-2 rounded-xl bg-sky-500 text-white shadow">Download Itinerary</button>
//                 </div>
//               </div>
//             </div>
//           </Section>
//         )}
//       </div>

//       {/* AUTH MODALS */}
//       <Modal open={signinOpen} onClose={()=>setSigninOpen(false)} title="Sign in">
//         <div className="space-y-3">
//           <Field label="Email">
//             <input type="email" className="w-full px-3 py-2 border rounded-xl" placeholder="you@example.com"/>
//           </Field>
//           <Field label="Password">
//             <input type="password" className="w-full px-3 py-2 border rounded-xl" placeholder="••••••••"/>
//           </Field>
//           <button className="w-full px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium">Sign in</button>
//         </div>
//       </Modal>

//       <Modal open={signupOpen} onClose={()=>setSignupOpen(false)} title="Create account">
//         <div className="space-y-3">
//           <Field label="Full Name">
//             <input className="w-full px-3 py-2 border rounded-xl" placeholder="Your name"/>
//           </Field>
//           <Field label="Email">
//             <input type="email" className="w-full px-3 py-2 border rounded-xl" placeholder="you@example.com"/>
//           </Field>
//           <Field label="Password">
//             <input type="password" className="w-full px-3 py-2 border rounded-xl" placeholder="Create a password"/>
//           </Field>
//           <button className="w-full px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium">Sign up</button>
//         </div>
//       </Modal>

//       <footer className="py-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} Getaway · Crafted with ❤️</footer>
//     </div>
//   );
// }
