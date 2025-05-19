import React, { useState, useEffect } from 'react';
import './css/Portfolio.css';

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const allProjects = [
    { id: 1, title: "Kitchen Reno", category: "Kitchen", image: "/images/kitchen1.jpg" },
    { id: 2, title: "Bathroom Update", category: "Bathroom", image: "/images/bathroom1.jpg" },
    { id: 3, title: "Living Room Upgrade", category: "Living Room", image: "/images/living1.jpg" },
    { id: 4, title: "Roofing Fix", category: "Roofing", image: "/images/roof1.jpg" },
    { id: 5, title: "Deck Build", category: "Outdoor", image: "/images/deck1.jpg" },
    { id: 6, title: "Modern Kitchen", category: "Kitchen", image: "/images/kitchen2.jpg" },
  ];

  const categories = ["All", "Kitchen", "Bathroom", "Living Room", "Roofing", "Outdoor"];

  const filteredProjects = selectedCategory === "All"
    ? allProjects
    : allProjects.filter(project => project.category === selectedCategory);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

// ready to connect to the backend, but will stay consistant and use axios instead of fetch

//   useEffect(() => {
//     fetch('http://localhost:5000/api/portfolio')
//       .then(res => res.json())
//       .then(data => setAllProjects(data))
//       .catch(err => console.error('Error fetching portfolio:', err));
//   }, []);
  

  return (
    <div className="portfolio-container">
      <h1>Our Work</h1>
      <div className="portfolio-dropdown">
        <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
        >
            {categories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
            ))}
        </select>
      </div>


      <div className="portfolio-gallery">
        {currentProjects.map(project => (
          <div key={project.id} className="portfolio-item">
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.category}</p>
          </div>
        ))}
      </div>

      <div className="portfolio-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
