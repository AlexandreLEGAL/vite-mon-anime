import React from 'react'
import { useState } from 'react'

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState(initialState)
    return (
        <div className="searchBar">
            <input type="text" placeholder="Recherche..." onChange={event => {setSearchTerm(event.target.value)}}></input>
        </div>
    )
}