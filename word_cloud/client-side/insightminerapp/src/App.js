import eng from './Components/SVG/eng.svg'
import Nav from './Components/NavBar/NavBar';
import './App.css';

function App() {
  return (
    <section className="App">
      <Nav />
      <div className="App-section">
        <img src={eng} className="App-logo" />
        <p>
          minerando insights
        </p>
        <a
          className="App-link"
          href="https://github.com/gabrielratao/insight-miner"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Project
        </a>
      </div>
    </section>
  );
}

export default App;
