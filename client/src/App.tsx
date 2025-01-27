import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import AboutPage from './Pages/About';
import Item from './Pages/Item';
import Apartments from './Pages/Apartments';
import Farms from './Pages/Farms';
import Villas from './Pages/Villas';
import Shops from './Pages/Shops';
import NoPageFound from './Pages/NoPageFound';

import Dashboard from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/villas" element={<Villas />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/item" element={<Item />} />
        <Route path="*" element={<NoPageFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;