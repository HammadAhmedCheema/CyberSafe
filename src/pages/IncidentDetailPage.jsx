import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { supabase } from '../services/supabaseClient';

const IncidentDetailPage = () => {
    const { id } = useParams();
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const { data, error } = await supabase
                    .from('incidents')
                    .select('*, profiles(name)')
                    .eq('id', id)
                    .single();
                
                if (error) throw error;
                setIncident(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load incident details.');
            } finally {
                setLoading(false);
            }
        };

        fetchIncident();
    }, [id]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'border-green-500/50 text-green-400 bg-green-500/10';
            case 'in-progress': return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10';
            default: return 'border-red-500/50 text-red-400 bg-red-500/10';
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!incident) return <div className="text-center py-20">Incident not found</div>;

    return (
        <div>
            <Hero title="Incident Details" subtitle={`Report ID: ${incident.id}`} />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto glass p-10 border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/5 blur-3xl rounded-full -mr-32 -mt-32" />
                        
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                            <span className="border border-blue-500/50 text-blue-400 bg-blue-500/10 text-xs font-bold px-3 py-1 rounded uppercase tracking-widest">
                                {incident.incident_type}
                            </span>
                            <span className={`text-xs font-bold px-3 py-1 rounded border uppercase tracking-widest ${getStatusColor(incident.status)}`}>
                                {incident.status}
                            </span>
                        </div>
                        
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neon-blue mb-4">Transmission Content</h2>
                        <div className="text-slate-200 text-lg font-light leading-relaxed mb-10 whitespace-pre-wrap break-words">
                            {incident.description}
                        </div>

                        {incident.image_url && (
                            <div className="mb-8">
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neon-blue mb-4">Visual Evidence</h3>
                                <img 
                                    src={incident.image_url.startsWith('http') ? incident.image_url : supabase.storage.from('incident-images').getPublicUrl(incident.image_url).data.publicUrl}
                                    alt="Incident Attachment" 
                                    className="max-w-full h-auto rounded-2xl shadow-2xl border border-white/10"
                                />
                            </div>
                        )}

                        <div className="border-t border-white/5 pt-8 mt-10">
                            <div className="flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase font-mono tracking-widest text-slate-500">
                                <div>
                                    <p className="font-bold text-white/40 mb-1">Source node:</p>
                                    <p className="text-neon-purple">{incident.profiles?.name || 'Anonymous'}</p>
                                </div>
                                <div className="md:text-right">
                                    <p className="font-bold text-white/40 mb-1">Timestamp:</p>
                                    <p>{new Date(incident.created_at).toLocaleDateString()} {new Date(incident.created_at).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link to="/incidents" className="text-neon-blue hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
                                &larr; Return to Central Alerts
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IncidentDetailPage;
