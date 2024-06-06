import './App.css';
import eng from './Components/SVG/eng.svg'
import Nav from './Components/NavBar/NavBar';
import Loading from './Components/Loading/Loading';
import WordCloud from './Components/WordCloud/WordCloud';
import AuditData from './Components/Audit/Audit';


function App() {
  return (
    <section className="App">
      <Nav />
      <div className='Content'>
        <Loading />
      </div>
    </section>
  );
}

export default App;
