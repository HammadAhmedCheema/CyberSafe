import React, { useState } from 'react';

const AiChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setError(null);

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const API_URL = import.meta.env.VITE_GEMINI_API_URL || "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    if (!API_KEY) {
        setError("API Key is missing. Please configure VITE_GEMINI_API_KEY.");
        setIsLoading(false);
        return;
    }

    try {
      // Using query parameter for API key is more reliable for direct browser calls (CORS)
      const urlWithKey = `${API_URL}?key=${API_KEY}`;
      
      const apiResponse = await fetch(
        urlWithKey,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a cybersecurity expert. Answer the following question concisely and clearly: "${prompt}"`
              }]
            }]
          }),
        }
      );

      if (!apiResponse.ok) {
        if (apiResponse.status === 429) {
          throw new Error("API Quota Exhausted. Please wait a minute or check your Gemini API plan.");
        }
        const errorBody = await apiResponse.json().catch(() => ({}));
        console.error("API Error Response:", errorBody);
        throw new Error(`API request failed with status ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      const aiText = data.candidates[0].content.parts[0].text;
      setResponse(aiText);

    } catch (err) {
      console.error("Error calling Gemini API:", err);
      setError(err.message.includes("Quota") ? err.message : "Sorry, I couldn't get a response. Please check your network or API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass p-8 max-w-4xl mx-auto border-glow-blue my-20">
      <h3 className="section-title">Cyber Intelligence: Ask AI</h3>
      <div className="min-h-[200px] mb-8 glass-card border-white/5 bg-black/20 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center gap-3 p-4">
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
            <p className="text-neon animate-pulse font-mono text-sm">Processing signal...</p>
          </div>
        )}
        {error && <p className="text-red-400 p-4 font-mono text-sm border-l-2 border-red-500 bg-red-500/10 m-4 rounded">{error}</p>}
        {response && (
          <div className="p-6 animate-in">
            <div className="text-neon-purple font-mono text-xs mb-2 uppercase tracking-widest opacity-70">Decrypted Response</div>
            <p className="text-gray-300 leading-relaxed font-light">{response}</p>
          </div>
        )}
        {!isLoading && !response && !error && (
            <div className="p-12 text-center text-text-muted font-light italic">
                Awaiting connection. Input cybersecurity query below.
            </div>
        )}
      </div>
      <form onSubmit={handlePromptSubmit}>
        <div className="flex gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Search the cyber-archive..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/30 transition-all font-light"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary px-8"
          >
            {isLoading ? 'Wait...' : 'Connect'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChat;