import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Search from './Pages/Search';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Item from './Pages/Item';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/item" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;