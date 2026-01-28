import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plane, MapPin, Calendar, Wallet, Compass,
    Utensils, Cloud, Sun, Info, ArrowRight, Loader2,
    CheckCircle2, Hotel, Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';

const App = () => {
    const [formData, setFormData] = useState({
        destination: '',
        budget: '',
        days: '',
        startDate: '',
        interests: [],
        startLocation: ''
    });

    const [loading, setLoading] = useState(false);
    const [itinerary, setItinerary] = useState(null);

    const interestOptions = [
        'Nature', 'History', 'Shopping', 'Food', 'Adventure', 'Relaxation'
    ];

    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/itinerary', formData);
            setItinerary(response.data);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#ec4899', '#ffffff']
            });
        } catch (error) {
            console.error("Error fetching itinerary:", error);
            alert("Failed to generate itinerary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Plane size={48} color="#6366f1" />
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            WanderWise AI
                        </h1>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Your intelligent companion for the perfect journey.</p>
                </motion.div>
            </header>

            {!itinerary ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ maxWidth: '800px', margin: '0 auto' }}
                >
                    <form onSubmit={handleSubmit} className="grid">
                        <div className="grid grid-cols-2">
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Starting Location</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#6366f1' }} />
                                    <input
                                        className="glass-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                        placeholder="e.g. London"
                                        required
                                        value={formData.startLocation}
                                        onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Destination</label>
                                <div style={{ position: 'relative' }}>
                                    <Compass size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#6366f1' }} />
                                    <input
                                        className="glass-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                        placeholder="e.g. Paris"
                                        required
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Total Budget ($)</label>
                                <div style={{ position: 'relative' }}>
                                    <Wallet size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#6366f1' }} />
                                    <input
                                        type="number"
                                        className="glass-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                        placeholder="Budget"
                                        required
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Number of Days</label>
                                <div style={{ position: 'relative' }}>
                                    <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#6366f1' }} />
                                    <input
                                        type="number"
                                        className="glass-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                        placeholder="e.g. 5"
                                        required
                                        value={formData.days}
                                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '600' }}>Your Interests</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {interestOptions.map(interest => (
                                    <button
                                        key={interest}
                                        type="button"
                                        onClick={() => handleInterestToggle(interest)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            border: '1px solid var(--glass-border)',
                                            background: formData.interests.includes(interest) ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                            color: 'white',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Generating Itinerary...
                                </>
                            ) : (
                                <>
                                    Create Itinerary
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fade-in"
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem' }}>Trip to {itinerary.destination}</h2>
                        <button
                            onClick={() => setItinerary(null)}
                            className="btn-primary"
                            style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
                        >
                            Start New Plan
                        </button>
                    </div>

                    <div className="grid grid-cols-2" style={{ marginBottom: '2rem' }}>
                        <div className="glass-card">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6366f1' }}>
                                <Cloud /> Weather Info
                            </h3>
                            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>{itinerary.weather}</p>
                            <p style={{ color: '#94a3b8' }}>Best time to visit: {itinerary.bestTime}</p>
                        </div>
                        <div className="glass-card">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#ec4899' }}>
                                <Wallet /> Budget Breakdown
                            </h3>
                            <div className="grid grid-cols-2" style={{ fontSize: '0.9rem' }}>
                                <div>Hotel: ${itinerary.budgetBreakdown.accommodation}</div>
                                <div>Food: ${itinerary.budgetBreakdown.food}</div>
                                <div>Fun: ${itinerary.budgetBreakdown.activities}</div>
                                <div>Misc: ${itinerary.budgetBreakdown.emergency}</div>
                            </div>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Your Daily Itinerary</h3>
                    <div className="grid">
                        {itinerary.itinerary.map((day, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card"
                                style={{ marginBottom: '1rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h4 style={{ color: 'var(--primary)', fontWeight: '700' }}>Day {day.day}: {day.title}</h4>
                                    <div style={{ fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.2)', padding: '4px 12px', borderRadius: '20px' }}>
                                        <Sun size={14} style={{ marginRight: '4px' }} /> Outdoor Activities
                                    </div>
                                </div>

                                <div className="grid">
                                    {day.activities.map((act, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                            <div style={{ color: '#94a3b8', fontSize: '0.8rem', paddingTop: '4px' }}>{act.time}</div>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{act.place}</div>
                                                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{act.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: '1.5rem', padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Utensils size={16} color="#ec4899" />
                                        <span style={{ fontSize: '0.9rem' }}>Lunch: {day.meals[0].restaurant}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Info size={16} color="#6366f1" />
                                        <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>Tip: {day.travelTip}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2" style={{ marginTop: '2rem' }}>
                        <div className="glass-card">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6366f1' }}>
                                <Hotel /> Suggested Hotels
                            </h3>
                            {itinerary.hotels.map((hotel, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: i < 2 ? '1px solid var(--glass-border)' : 'none' }}>
                                    <span>{hotel.name}</span>
                                    <span style={{ color: '#10b981' }}>{hotel.price} ({hotel.type})</span>
                                </div>
                            ))}
                        </div>
                        <div className="glass-card">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#ec4899' }}>
                                <Navigation /> Travel Tips
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#94a3b8' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Book museum tickets in advance.</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Keep a digital copy of your passport.</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Use local SIM cards for maps.</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Respect local customs and attire.</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            )}

            <footer style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b', fontSize: '0.9rem' }}>
                <p>© 2026 WanderWise AI Travel Planner. All journeys begin with a single click.</p>
            </footer>

            <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default App;
