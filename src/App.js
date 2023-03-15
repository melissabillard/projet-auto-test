import './App.css';
import Markup from './markup/markup';

// Layout
import Header from './markup/layout/header/header';
import Footer from './markup/layout/footer/footer';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Markup />
      <Footer />
    </div>
  );
}
