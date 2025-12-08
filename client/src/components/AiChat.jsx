import React, { useState } from 'react';

const API_KEY = "AIzaSyAfHXpbcTozcg9gV9F_elGkfgPwJP3G-4E";

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

    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

    try {
      const apiResponse = await fetch(
        API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': API_KEY, 
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
        const errorBody = await apiResponse.json();
        console.error("API Error Response:", errorBody);
        throw new Error(`API request failed with status ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      const aiText = data.candidates[0].content.parts[0].text;
      setResponse(aiText);

    } catch (err) {
      console.error("Error calling Gemini API:", err);
      setError("Sorry, I couldn't get a response. Please check that your API key is correct and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-chat-container">
      <h3 className="ai-chat-title">Ask AI</h3>
      <div className="ai-response-box">
        {isLoading && <p className="loading-text">Thinking...</p>}
        {error && <p className="error-text">{error}</p>}
        {response && <p className="response-text">{response}</p>}
      </div>
      <form onSubmit={handlePromptSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a cybersecurity question..."
            className="chat-input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="send-button"
          >
            {isLoading ? 'Wait...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChat;