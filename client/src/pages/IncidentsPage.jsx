import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import api from '../services/api';

const IncidentsPage = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await api.get('/incidents/public');
                setIncidents(response.data);
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
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-red-100 text-red-800';
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
                            <div key={incident._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-primary-blue">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">
                                        {incident.incidentType}
                                    </span>
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded uppercase ${getStatusColor(incident.status)}`}>
                                        {incident.status}
                                    </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{incident.description}</p>
                                <div className="flex justify-between items-end">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <p>Reported by: {incident.user?.name || 'Anonymous'}</p>
                                        <p>{new Date(incident.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <Link to={`/incidents/${incident._id}`} className="text-primary-blue hover:underline text-sm font-medium">
                                        Read More
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
