import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
const Home = lazy(() => import('./Pages/Home'))
const About = lazy(() => import('./Pages/About'))
const ContactUs = lazy(() => import('./Pages/ContactUs'))


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={ContactUs} />
      </Routes>
    </Router>
  );
}

export default App;