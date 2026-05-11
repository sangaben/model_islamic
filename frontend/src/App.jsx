import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CampusProvider } from './context/CampusContext';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page components
import Home from './pages/Home';
import About from './pages/About';
import Campuses from './pages/Campuses';
import CampusDetail from './pages/CampusDetail';
import Admissions from './pages/Admissions';
import Apply from './pages/Apply';
import Academics from './pages/Academics';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <CampusProvider>
        {/* Main container with full width and proper structure */}
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
          <Navbar />
          
          {/* Main content area - takes remaining space */}
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/campuses" element={<Campuses />} />
              <Route path="/campuses/:id" element={<CampusDetail />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/admissions/apply" element={<Admissions />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/news" element={<News />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </CampusProvider>
    </Router>
  );
}

export default App;