import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, profileLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Only redirect if user is loaded and we have confirmation they are NOT an admin.
        // We wait for the role to be populated from the profile fetch.
        if (user && user.role) {
            if (user.role !== 'admin') {
                navigate('/');
            }
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchMyIncidents = async () => {
            try {
                let query = supabase
                    .from('incidents')
                    .select('*, profiles(name)')
                    .order('created_at', { ascending: false });

                if (user.role !== 'admin') {
                    query = query.eq('user_id', user.id);
                }

                const { data, error } = await query;
                if (error) throw error;
                setIncidents(data);
            } catch (err) {
                console.error("Failed to fetch incidents", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchMyIncidents();
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this report?')) {
            try {
                const { error } = await supabase
                    .from('incidents')
                    .delete()
                    .eq('id', id);
                
                if (error) throw error;
                setIncidents(incidents.filter(inc => inc.id !== id));
            } catch (err) {
                console.error(err);
                alert('Failed to delete report: ' + err.message);
            }
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('incidents')
                .update({ status: newStatus })
                .eq('id', id);
            
            if (error) throw error;
            setIncidents(incidents.map(inc => 
                inc.id === id ? { ...inc, status: newStatus } : inc
            ));
        } catch (err) {
            console.error(err);
            alert('Failed to update status: ' + err.message);
        }
    };

    if (!user || profileLoading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <div className="text-center animate-pulse text-neon-blue font-mono tracking-widest uppercase">
                    Verifying Access Protocol...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            <Hero title="Control Center" subtitle={`Admin Protocol: ${user.name}`} />
            <section className="py-20">
                <div className="container">
                    <div className="flex justify-between items-end mb-10">
                        <h2 className="section-title">
                            {user.role === 'admin' ? 'Community Feed' : 'My Reports'}
                        </h2>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-20 animate-pulse text-neon font-mono">Scanning database...</div>
                    ) : (
                        <div className="glass overflow-hidden border-glow-blue">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="bg-white/5 border-bottom border-white/10">
                                            <th className="py-5 px-8 text-left text-neon-blue font-bold uppercase tracking-widest text-xs">Type</th>
                                            <th className="py-5 px-8 text-left text-neon-blue font-bold uppercase tracking-widest text-xs">Description</th>
                                            <th className="py-5 px-8 text-left text-neon-blue font-bold uppercase tracking-widest text-xs">Date</th>
                                            <th className="py-5 px-8 text-left text-neon-blue font-bold uppercase tracking-widest text-xs">Status</th>
                                            <th className="py-5 px-8 text-left text-neon-blue font-bold uppercase tracking-widest text-xs">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {incidents.map((incident) => (
                                            <tr key={incident.id} className="hover:bg-white/[0.02] transition">
                                                <td className="py-6 px-8">
                                                    <span className="text-neon-purple font-mono capitalize">{incident.incident_type}</span>
                                                </td>
                                                <td className="py-6 px-8 flex flex-col gap-1">
                                                    <p className="max-w-xs truncate text-slate-300 font-light">{incident.description}</p>
                                                    <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">{incident.profiles?.name || 'Anonymous'}</p>
                                                </td>
                                                <td className="py-6 px-8 text-slate-500 font-mono text-xs">
                                                    {new Date(incident.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-6 px-8">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter
                                                        ${incident.status === 'resolved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                                          incident.status === 'in-progress' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                                                          'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                        {incident.status}
                                                    </span>
                                                </td>
                                                <td className="py-6 px-8">
                                                    {user.role === 'admin' ? (
                                                        <div className="flex gap-4">
                                                            <button 
                                                                onClick={() => handleStatusUpdate(incident.id, 'in-progress')}
                                                                className="text-xs text-yellow-500/70 hover:text-yellow-400 transition underline-offset-4 hover:underline"
                                                            >
                                                                Update Status
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(incident.id)}
                                                                className="text-xs text-red-500/70 hover:text-red-400 transition"
                                                            >
                                                                Terminate
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleDelete(incident.id)}
                                                            className="text-xs text-red-500/70 hover:text-red-400 transition"
                                                        >
                                                            Delete Report
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {incidents.length === 0 && (
                                <div className="text-center py-20 text-gray-600 font-light italic">
                                    No records found in current segment.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
