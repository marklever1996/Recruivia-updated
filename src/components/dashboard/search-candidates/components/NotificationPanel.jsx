import React from 'react';
import { motion } from 'framer-motion';
import './NotificationPanel.css';

const NotificationPanel = () => {
    const notifications = [
        { id: 1, text: "Nieuwe kandidaat match voor Senior React Developer", time: "1 uur geleden" },
        { id: 2, text: "Sarah Johnson heeft je bericht gelezen", time: "2 uur geleden" },
        { id: 3, text: "3 nieuwe kandidaten in je pipeline", time: "1 dag geleden" }
    ];

    return (
        <aside className="dashboard-notifications">
            <h2>Notificaties</h2>
            <div className="notifications-list">
                {notifications.map(notification => (
                    <motion.div 
                        key={notification.id}
                        className="notification-item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p>{notification.text}</p>
                        <span className="notification-time">{notification.time}</span>
                    </motion.div>
                ))}
            </div>
        </aside>
    );
};

export default NotificationPanel; 