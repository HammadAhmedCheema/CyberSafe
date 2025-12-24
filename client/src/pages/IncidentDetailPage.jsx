import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import api, { IMAGE_BASE_URL } from '../services/api';

const IncidentDetailPage = () => {
    const { id } = useParams();
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const response = await api.get(`/incidents/public/${id}`);
                setIncident(response.data);
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
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-red-100 text-red-800';
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!incident) return <div className="text-center py-20">Incident not found</div>;

    return (
        <div>
            <Hero title="Incident Details" subtitle={`Report ID: ${incident._id}`} />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded uppercase">
                                {incident.incidentType}
                            </span>
                            <span className={`text-sm font-semibold px-3 py-1 rounded uppercase ${getStatusColor(incident.status)}`}>
                                {incident.status}
                            </span>
                        </div>
                        
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Description</h2>
                        <div className="prose dark:prose-invert max-w-none mb-8 whitespace-pre-wrap break-words">
                            {incident.description}
                        </div>

                        {incident.image && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Attached Image</h3>
                                <img 
                                    src={`${IMAGE_BASE_URL}/${incident.image}`}
                                    alt="Incident Attachment" 
                                    className="max-w-full h-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                                />
                            </div>
                        )}

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <div>
                                    <p className="font-semibold">Reported By:</p>
                                    <p>{incident.user?.name || 'Anonymous'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">Date Reported:</p>
                                    <p>{new Date(incident.createdAt).toLocaleDateString()} {new Date(incident.createdAt).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link to="/incidents" className="text-primary-blue hover:underline">
                                &larr; Back to Alerts
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IncidentDetailPage;
