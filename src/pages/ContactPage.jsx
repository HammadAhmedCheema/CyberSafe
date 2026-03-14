import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import { supabase } from '../services/supabaseClient';
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
            let imageUrl = null;

            // 1. Upload image if present
            if (formData.image) {
                const fileExt = formData.image.name.split('.').pop();
                const fileName = `${user.id}/${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('incident-images')
                    .upload(filePath, formData.image);

                if (uploadError) throw uploadError;
                imageUrl = filePath;
            }

            // 2. Create incident record
            const { error: insertError } = await supabase
                .from('incidents')
                .insert([
                    {
                        user_id: user.id,
                        incident_type: formData.incidentType,
                        description: formData.description,
                        image_url: imageUrl,
                        status: 'open'
                    }
                ]);

            if (insertError) throw insertError;

            setSubmitStatus('success');
            setFormData({ incidentType: '', description: '', image: null });
            if (document.getElementById('image')) {
                document.getElementById('image').value = ''; 
            }
        } catch (error) {
            console.error("Error submitting report: ", error);
            setSubmitStatus(error.message || 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Hero title={heroData.title} subtitle={heroData.subtitle} />
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto glass p-10 border-white/5">
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neon-blue mb-10 text-center">Security Transmission Protocol</h3>
                        
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
                                <label htmlFor="incidentType" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Target Incident Class *</label>
                                <select id="incidentType" name="incidentType" value={formData.incidentType} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-neon-blue transition-colors appearance-none">
                                    <option value="" className="bg-black">Select an incident type...</option>
                                    <option value="phishing" className="bg-black">Phishing Email</option>
                                    <option value="malware" className="bg-black">Malware Detection</option>
                                    <option value="data-breach" className="bg-black">Data Breach</option>
                                    <option value="suspicious-activity" className="bg-black">Suspicious Activity</option>
                                    <option value="other" className="bg-black">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Detailed Intel Report *</label>
                                <textarea id="description" name="description" rows="5" value={formData.description} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-neon-blue transition-colors placeholder:text-white/10" placeholder="Provide detailed information regarding the breach..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Visual Evidence (Optional)</label>
                                <input type="file" id="image" name="image" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-white/5 file:text-slate-300 hover:file:bg-white/10 file:transition-colors" />
                                <p className="mt-2 text-[10px] text-slate-600 uppercase tracking-widest">Max file size: 5MB / Formats: JPG, PNG, GIF</p>
                            </div>
                            <div className="pt-4">
                                <button type="submit" disabled={isSubmitting || !user} className="w-full py-4 px-6 border border-neon-blue bg-neon-blue/10 text-neon-blue text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-neon-blue hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                                    {isSubmitting ? 'Transmitting...' : 'Upload Report'}
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