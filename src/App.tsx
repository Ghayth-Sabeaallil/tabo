import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Item from './Pages/Item';
import Apartments from './Pages/Apartments';
import Farms from './Pages/Farms';
import Villas from './Pages/Villas';
import Shops from './Pages/Shops';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/villas" element={<Villas />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/item" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;