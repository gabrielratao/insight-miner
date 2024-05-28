import logo from './SVG/logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
  );
}

export default App;
