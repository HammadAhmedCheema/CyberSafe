import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { supabase } from '../services/supabaseClient';

const IncidentsPage = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const { data, error } = await supabase
                    .from('incidents')
                    .select('*, profiles(name)')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                setIncidents(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load incidents.');
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'border-green-500/50 text-green-400 bg-green-500/10';
            case 'in-progress': return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10';
            default: return 'border-red-500/50 text-red-400 bg-red-500/10';
        }
    };

    return (
        <div>
            <Hero title="Community Alerts" subtitle="Real-time security incidents reported by the community." />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {loading && <p className="text-center">Loading alerts...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {incidents.map((incident) => (
                            <div key={incident.id} className="glass-card hover:border-glow-blue transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="border border-blue-500/50 text-blue-400 bg-blue-500/10 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                        {incident.incident_type}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getStatusColor(incident.status)}`}>
                                        {incident.status}
                                    </span>
                                </div>
                                <p className="text-slate-300 mb-6 line-clamp-3 text-sm font-light leading-relaxed">{incident.description}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                                        <p>REF: {incident.profiles?.name || 'Anonymous'}</p>
                                        <p>{new Date(incident.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <Link to={`/incidents/${incident.id}`} className="text-neon-blue hover:text-white transition-colors text-xs font-bold uppercase tracking-tighter">
                                        Access File &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IncidentsPage;
