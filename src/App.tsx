import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
const Home = lazy(() => import('./Pages/Home'))
const About = lazy(() => import('./Pages/About'))
const ContactUs = lazy(() => import('./Pages/ContactUs'))
const Item = lazy(() => import('./Pages/Item'))



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={ContactUs} />
        <Route path="/item" Component={Item} />

      </Routes>
    </Router>
  );
}

export default App;