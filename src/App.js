import Markup from './markup/markup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './markup/pages/home/index';
import Page1 from './markup/pages/page-1/index';
import Page2 from './markup/pages/page-2/index';
import Page3 from './markup/pages/page-3/index';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page-1" element={<Page1 />} />
          <Route path="/page-2" element={<Page2 />} />
          <Route path="/page-3" element={<Page3 />} />
        </Routes>
      </Router>
      <Markup />
    </div>
  );
}
