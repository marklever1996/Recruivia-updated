import React from 'react';

const VacancyMetrics = ({ metrics }) => {
    const metricItems = [
        {
            label: "Actieve Vacatures",
            value: metrics.activeVacancies,
            id: "active"
        },
        {
            label: "Totaal Sollicitanten",
            value: metrics.totalApplicants,
            id: "total"
        },
        {
            label: "Gem. Sollicitanten per Vacature",
            value: metrics.averageApplicants,
            id: "average"
        },
        {
            label: "Conversie Ratio",
            value: metrics.conversionRate,
            id: "conversion"
        }
    ];

    return (
        <div className="metrics-grid">
            {metricItems.map((metric) => (
                <div key={metric.id} className="metric-card">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                </div>
            ))}
        </div>
    );
};

export default VacancyMetrics; 