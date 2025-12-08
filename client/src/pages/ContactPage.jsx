import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        incidentType: '',
        description: '', // Changed from 'message' to match backend model
        image: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const heroData = {
        title: "Contact & Report Incidents",
        subtitle: "Get in touch with our security team or report suspicious activities and potential threats."
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            alert("You must be logged in to submit a report.");
            navigate('/login');
            return;
        }

        if (!formData.incidentType || !formData.description) {
            alert("Please fill out all required fields.");
            return;
        }

        if (formData.image && formData.image.size > 5 * 1024 * 1024) {
            alert("File is too large. Maximum size is 5MB.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        const data = new FormData();
        data.append('incidentType', formData.incidentType);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await api.post('/incidents', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSubmitStatus('success');
            setFormData({ incidentType: '', description: '', image: null });
            // Reset file input manually if needed, or rely on state reset
            document.getElementById('image').value = ''; 
        } catch (error) {
            console.error("Error submitting report: ", error);
            setSubmitStatus(error.response?.data?.message || 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Hero title={heroData.title} subtitle={heroData.subtitle} />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 text-center">Security Incident Report Form</h3>
                        
                        {!user && (
                            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
                                <p>Please <a href="/login" className="font-bold underline">login</a> to submit a report.</p>
                            </div>
                        )}

                        {submitStatus === 'success' && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                                <p className="font-bold">Success!</p>
                                <p>Your report has been submitted. Our team will review it shortly.</p>
                            </div>
                        )}
                        {submitStatus === 'error' && (
                             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                                <p className="font-bold">Error!</p>
                                <p>{submitStatus === 'error' ? 'There was a problem submitting your report. Please try again later.' : submitStatus}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name and Email are handled by Auth now, so we don't need them in the form */}
                            
                            <div>
                                <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Incident Type *</label>
                                <select id="incidentType" name="incidentType" value={formData.incidentType} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-blue focus:border-primary-blue">
                                    <option value="">Select an incident type...</option>
                                    <option value="phishing">Phishing Email</option>
                                    <option value="malware">Malware Detection</option>
                                    <option value="data-breach">Data Breach</option>
                                    <option value="suspicious-activity">Suspicious Activity</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Incident Description *</label>
                                <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-blue focus:border-primary-blue" placeholder="Provide detailed information..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Screenshot (Optional)</label>
                                <input type="file" id="image" name="image" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                <p className="mt-1 text-xs text-gray-500">Max file size: 5MB. Supported formats: JPG, PNG, GIF.</p>
                            </div>
                            <div className="text-right">
                                <button type="submit" disabled={isSubmitting || !user} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue disabled:bg-gray-400">
                                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;