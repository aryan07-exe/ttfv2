import React from 'react';
import './NextComponent.css';

const NextComponent = () => {
    return (
        <section className="next-component">
            <div className="content-wrapper">
                <h2 className="section-title">Experience the Extraordinary</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <span className="count">01</span>
                        <h3>Curated Destinations</h3>
                        <p>Hand-picked locations that redefine luxury and adventure.</p>
                    </div>
                    <div className="service-card">
                        <span className="count">02</span>
                        <h3>Bespoke Itineraries</h3>
                        <p>Tailored journeys designed around your unique desires.</p>
                    </div>
                    <div className="service-card">
                        <span className="count">03</span>
                        <h3>Global Concierge</h3>
                        <p>24/7 support across every time zone on the planet.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NextComponent;
