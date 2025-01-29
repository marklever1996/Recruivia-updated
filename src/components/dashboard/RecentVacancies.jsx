import React from 'react';

const RecentVacancies = ({ vacancies, title }) => {
    return (
        <div className="recent-vacancies">
            <div className="vacancy-list">
                {vacancies.map((vacancy) => (
                    <div key={vacancy.id} className="vacancy-item">
                        <div>
                            <div className="vacancy-title">{vacancy.title}</div>
                            <div className="vacancy-department">{vacancy.department}</div>
                        </div>
                        <div className="vacancy-applicants">
                            {vacancy.applicants} sollicitanten
                        </div>
                        <div className="vacancy-days">
                            {vacancy.daysActive} dagen actief
                        </div>
                        <div className={`vacancy-status status-${vacancy.status.toLowerCase()}`}>
                            {vacancy.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentVacancies; 