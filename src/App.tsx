import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
const Home = lazy(() => import('./Pages/Home'))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </Router>
  );
}

export default App;