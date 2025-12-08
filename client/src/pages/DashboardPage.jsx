import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMyIncidents = async () => {
            try {
                // If admin, we might want to fetch ALL incidents (using a different endpoint ideally)
                // For now, let's just fetch the user's own incidents or public ones if we add an admin endpoint
                const endpoint = user.role === 'admin' ? '/incidents/public' : '/incidents';
                const response = await api.get(endpoint);
                setIncidents(response.data);
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
                await api.delete(`/incidents/${id}`);
                setIncidents(incidents.filter(inc => inc._id !== id));
            } catch (err) {
                console.error(err);
                alert('Failed to delete report');
            }
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/incidents/${id}/status`, { status: newStatus });
            setIncidents(incidents.map(inc => 
                inc._id === id ? { ...inc, status: newStatus } : inc
            ));
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        }
    };

    if (!user) return <p className="text-center mt-10">Please login to view dashboard.</p>;

    return (
        <div>
            <Hero title="Dashboard" subtitle={`Welcome back, ${user.name}`} />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">
                        {user.role === 'admin' ? 'All Community Reports' : 'My Reports'}
                    </h2>
                    
                    {loading ? <p>Loading...</p> : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Type</th>
                                        <th className="py-3 px-4 text-left">Description</th>
                                        <th className="py-3 px-4 text-left">Date</th>
                                        <th className="py-3 px-4 text-left">Status</th>
                                        <th className="py-3 px-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                    {incidents.map((incident) => (
                                        <tr key={incident._id}>
                                            <td className="py-3 px-4 capitalize">{incident.incidentType}</td>
                                            <td className="py-3 px-4 max-w-xs truncate">{incident.description}</td>
                                            <td className="py-3 px-4">{new Date(incident.createdAt).toLocaleDateString()}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold uppercase
                                                    ${incident.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                                                      incident.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                                                      'bg-red-100 text-red-800'}`}>
                                                    {incident.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                {user.role === 'admin' ? (
                                                    <div className="flex gap-2 flex-wrap">
                                                        <button onClick={() => handleStatusUpdate(incident._id, 'in-progress')} className="text-yellow-600 hover:text-yellow-800 text-sm">In-Progress</button>
                                                        <button onClick={() => handleStatusUpdate(incident._id, 'resolved')} className="text-green-600 hover:text-green-800 text-sm">Resolved</button>
                                                        <button onClick={() => handleDelete(incident._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => handleDelete(incident._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {incidents.length === 0 && <p className="text-center py-4 text-gray-500">No reports found.</p>}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
