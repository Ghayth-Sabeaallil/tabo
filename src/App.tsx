import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import AboutPage from './Pages/About';
import Item from './Pages/Item';
import Apartments from './Pages/Apartments';
import Farms from './Pages/Farms';
import Villas from './Pages/Villas';
import Shops from './Pages/Shops';
import NoPageFound from './Pages/NoPageFound';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/villas" element={<Villas />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/item" element={<Item />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </Router>
  );
}

export default App;