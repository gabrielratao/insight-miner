import './Loading.css'
import eng from '../SVG/eng.svg'

export default function Engload() {
    return(
        <div className="loading">
        <img src={eng} className="App-logo" />
        
        <div className='section-loading'>
            {/*<a
            className="App-link"
            href="https://github.com/gabrielratao/insight-miner"
            target="_blank"
            rel="noopener noreferrer"
            >
            About Project
             </a>
             <p>Minerando ideias</p>
             */}
          
          
          <button className='btn-start'>Começar</button>
          <button className='Auditoria'>Auditoria</button>
        </div>
      </div>
    )
};