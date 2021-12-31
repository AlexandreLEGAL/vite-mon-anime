import { useEffect, useState } from "react"
import Animes from "./components/Animes"
import useFetch from "./useFetch"

const Home = () => {
    const { data: animes, isLoading, error} = useFetch('/animes')
    // const handleDelete = (id) => {
    //     const newAnimes = animes.filter(anime => anime.id !== id)
    //     setAnimes(newAnimes);
    // }
    return (  
        <div className="home container">
            {error && <div>{error}</div>}
            {isLoading && <div>Chargement ...</div>}
            {/* {animes &&<Animes animes={animes} title="Tous les animes !" handleDelete={handleDelete} />} */}
            {animes &&<Animes animes={animes} title="Tous les animes de la saison !" />}
        </div>
    );
}
 
export default Home;