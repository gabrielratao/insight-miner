import './Loading.css'
import React, { useState } from 'react';
import eng from '../SVG/eng.svg'
import AuditData from '../Audit/Audit';
import WordCloud from '../WordCloud/WordCloud';

export default function Engload() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'audit':
                return <AuditData />;
            case 'start':
                return <WordCloud />;
            default:
                return <div></div>
        }
    }

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
          
          
          <button className='btn-start' 
            onClick={() =>setSelectedComponent('start')}>Começar</button>
          <button className='btn-auditoria' 
            onClick={() =>setSelectedComponent('audit')}>Auditoria</button>
        </div>

        {renderComponent()}
      </div>
    )
};