import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Navigation />
        <div className="content">
          <h2>Osobe</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
