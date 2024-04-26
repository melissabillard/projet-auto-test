import Markup from './markup/markup';

// Layout
import Header from './markup/layout/header/index';
import Footer from './markup/layout/footer/index';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Markup />
      <Footer />
    </div>
  );
}
