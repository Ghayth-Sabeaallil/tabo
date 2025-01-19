import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
const HomePage = lazy(() => import('./Pages/Home'))
const AboutPage = lazy(() => import('./Pages/About'))
const ContactUsPage = lazy(() => import('./Pages/ContactUs'))
const SearchPage = lazy(() => import('./Pages/Search'))
const PrivacyPolicyPage = lazy(() => import('./Pages/PrivacyPolicy'))
const ItemPage = lazy(() => import('./Pages/Item'))




function App() {
  return (
    <Router basename="/tabo">
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={AboutPage} />
        <Route path="/contact" Component={ContactUsPage} />
        <Route path="/search" Component={SearchPage} />
        <Route path="/privacyPolicy" Component={PrivacyPolicyPage} />
        <Route path="/item" Component={ItemPage} />
      </Routes>
    </Router>
  );
}

export default App;