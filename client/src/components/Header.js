import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div class="container">
                <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                

                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"></svg>
                    <span class="fs-4">Vite mon anime !</span>
                </a><ul class="nav nav-pills">
                    <li class="nav-item"><Link to="/" class="nav-link active" aria-current="page">Home</Link></li>
                    <li class="nav-item"><Link to="/animes" class="nav-link">Features</Link></li>
                    <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">About</a></li>
                </ul>
                </header>
            </div>
        )
    }
}
