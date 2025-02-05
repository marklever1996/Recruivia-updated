import React, { useState } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import './AIChatbot.css';

const AIChatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: 'Hallo! Ik ben je AI assistent. Hoe kan ik je helpen met recruitment?'
        }
    ]);
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Voeg gebruikersbericht toe
        setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'user',
            text: input
        }]);
        
        // Reset input
        setInput('');

        // Simuleer bot antwoord (later te vervangen door echte API call)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: 'Dit is een voorbeeld antwoord. De chatbot functionaliteit wordt later geïmplementeerd.'
            }]);
        }, 1000);
    };

    return (
        <aside className="ai-chatbot">
            <div className="chatbot-header">
                <FaRobot />
                <h2>AI Assistent</h2>
            </div>

            <div className="chat-messages">
                {messages.map(message => (
                    <div 
                        key={message.id} 
                        className={`message ${message.type}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Stel een vraag..."
                />
                <button type="submit">
                    <FaPaperPlane />
                </button>
            </form>
        </aside>
    );
};

export default AIChatbot; 