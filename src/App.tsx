import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
const Home = lazy(() => import('./Pages/Home'))
const About = lazy(() => import('./Pages/About'))
const ContactUs = lazy(() => import('./Pages/ContactUs'))
const Search = lazy(() => import('./Pages/Search'))
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'))



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={ContactUs} />
        <Route path="/search" Component={Search} />
        <Route path="/privacyPolicy" Component={PrivacyPolicy} />

      </Routes>
    </Router>
  );
}

export default App;