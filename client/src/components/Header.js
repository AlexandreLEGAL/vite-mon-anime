import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div class="container">
                <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                

                <Link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"></svg>
                    <span class="fs-4">Vite mon anime !</span>
                </Link>
                <ul class="nav nav-pills">
                    <li class="nav-item"><Link to="/" class="nav-link active" aria-current="page">Accueil</Link></li>
                    {/* <li class="nav-item"><Link to="/animes" class="nav-link">Animes de la saison</Link></li> */}
                    <li class="nav-item"><Link to="/faq" class="nav-link">FAQ</Link></li>
                    <li class="nav-item"><Link to="/about" class="nav-link">A Propos</Link></li>
                </ul>
                </header>
            </div>
        )
    }
}
