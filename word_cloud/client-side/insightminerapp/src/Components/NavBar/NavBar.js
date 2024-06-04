import react from 'react';
import './NavBar.css'
import logo from '../SVG/logo.svg'



export default function Nav() {
    return (
        <header className="headNav">
            <div className='iconNav'>
                <img src={logo} className='logoNav'/>
                <h2>InsightMiner</h2>
            </div>
            <nav className='navBar'>
                <a href='' className='aNav'>Contact</a>
                <a href='' className='aNav'>About</a>
            </nav>
        </header>
    )
}