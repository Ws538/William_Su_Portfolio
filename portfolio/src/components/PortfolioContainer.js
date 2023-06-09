import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import NavTabs from './NavTabs';
import Home from './pages/home';
import AboutMe from './pages/AboutMe';
import Projects from './pages/projects';
import ContactMe from './pages/contactMe';
import './PortfolioContainer.css';
import SplineViewer from './SplineViewer';


export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState('Home');
  const blobRef = useRef(null);

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'About Me') {
      return <AboutMe />;
    }

    if (currentPage === 'Projects') {
      return <Projects />;
    }

    if (currentPage === 'Contact Me') {
      return < ContactMe />
    }

    
  };

  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;
      const x = clientX;
      const y = clientY;

      if (blobRef.current) {
        blobRef.current.animate(
          {
            left: `${x}px`,
            top: `${y}px`,
          },
          { duration: 2000, fill: 'forwards' }
        );
      }
    };

    document.body.addEventListener('pointermove', handlePointerMove);

    return () => {
      document.body.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <SplineViewer />
      <div id="blob" ref={blobRef}></div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
