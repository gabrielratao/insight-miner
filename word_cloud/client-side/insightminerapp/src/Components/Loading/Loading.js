import './Loading.css'
import eng from '../SVG/eng.svg'

export default function Engload() {
    return(
        <div className="loading">
        <img src={eng} className="App-logo" />
        <p>
          minerando ideias
        </p>
        
        <div className='section-loading'>
            {/*<a
            className="App-link"
            href="https://github.com/gabrielratao/insight-miner"
            target="_blank"
            rel="noopener noreferrer"
            >
            About Project
             </a>*/}
            <button 
            className='btn-about'>About Project</button>
            <button className='btn-start'>Começar</button>
        </div>
      </div>
    )
};