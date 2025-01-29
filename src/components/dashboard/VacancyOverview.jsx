import React from 'react';
import { PlusIcon, SparklesIcon, TemplateIcon } from '../icons';

const VacancyOverview = ({ quickActions }) => {
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'plus':
                return <PlusIcon />;
            case 'sparkles':
                return <SparklesIcon />;
            case 'template':
                return <TemplateIcon />;
            default:
                return null;
        }
    };

    return (
        <div className="vacancy-overview">
            {quickActions.map((action, index) => (
                <button 
                    key={index} 
                    className="quick-action"
                    onClick={() => console.log(`Action clicked: ${action.action}`)}
                >
                    {getIcon(action.icon)}
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    );
};

export default VacancyOverview; 