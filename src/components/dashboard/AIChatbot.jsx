import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaRobot, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './AIChatbot.css';

const AIChatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: 'Welkom bij Recruivia AI! 🎯 Je kunt me alles vragen!'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    conversation_history: conversationHistory
                })
            });

            if (!response.ok) throw new Error('Netwerk response was niet ok');
            
            const data = await response.json();
            
            setConversationHistory(prev => [
                ...prev,
                { role: "user", content: input },
                { role: "assistant", content: data.response }
            ]);

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: data.response
            }]);

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: 'Sorry, er ging iets mis. Probeer het later opnieuw.'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <motion.aside 
            className="ai-chatbot"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="chatbot-header">
                <motion.div
             
                    className="robot-icon"
                >
                    <FaRobot />
                </motion.div>
                <h2>Recruivia AI</h2>
            </div>

            <div className="chat-messages" ref={chatRef}>
                <AnimatePresence>
                    {messages.map(message => (
                        <motion.div
                            key={message.id}
                            className={`message ${message.type}`}
                            variants={messageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                        >
                            {message.text}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div 
                            className="typing-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <FaSpinner />
                            </motion.div>
                            <span>Recruivia denkt na...</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.form 
                onSubmit={handleSubmit} 
                className="chat-input"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Stel je vraag aan Recruivia..."
                    className="recruivia-input"
                />
                <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="send-button"
                >
                    <FaPaperPlane />
                </motion.button>
            </motion.form>
        </motion.aside>
    );
};

export default AIChatbot; 