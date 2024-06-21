import './NavBar.css'
import React, { useState } from 'react'
import WordCloud from '../WordCloud/WordCloud';
import AuditData from '../Audit/Audit';

//Cria componente para navegar entre os componentes principais
export default function Navigator () {
    const [selectedComponent, setSelectedComponent] = useState(null);

    //Switch para alternar entre os comps
    const renderComponent = () => {
        switch (selectedComponent) {
            case 'wordCloud':
                return <WordCloud />;
            case 'auditData':
                return <AuditData />;
        }
    }

    return (
        <section className='content'>
            <div className='navigator'>
                <button onClick={() => setSelectedComponent('wordCloud')} className='btn-navigator'>WordCloud</button>
                <button onClick={() => setSelectedComponent('auditData')} className='btn-navigator'>Audit Data</button>
            </div>
            <div className='mainContent'>
                {renderComponent()}
            </div>
        </section>
        
    )
}