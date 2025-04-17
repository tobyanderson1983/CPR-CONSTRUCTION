//Portfolio.js

import React, { useEffect, useState } from 'react';
import "./css/Portfolio.css";

function Portfolio() {
    const projects = [
        { id: 1, title: "Project A", description: "A description of Project A" },
        { id: 2, title: "Project B", description: "A description of Project B" },
        { id: 3, title: "Project C", description: "A description of Project C" }
    ];

    return (
        <div className="portfolio-container">
            <section className="portfolio-gallery">
                {projects.map(project => (
                    <div key={project.id} className="portfolio-item">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Portfolio;
