import react from 'react';
import './Header.css'
import logo from '../SVG/logo.svg'



export default function Header() {
    
    return (
        <header className="headNav">
            <div className='iconNav'>
                <img src={logo} className='logoNav'/>
                <h2>InsightMiner</h2>
            </div>
            <nav className='conectNav'>
                <a className=''></a>
                <a href='' className='aNav'>Contact</a>
                <a href='https://github.com/gabrielratao/insight-miner/blob/main/README.md' 
                target='blanke'
                className='aNav'>About</a>
            </nav>
        </header>
    )
}