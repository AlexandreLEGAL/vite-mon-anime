import { useParams } from "react-router";
import useFetch from "../useFetch";

const AnimeDetails = () => {
    const {id} = useParams()
    const {data : anime, isLoading, error} = useFetch('/animes/' + id)
    return ( 
        <div className='anime-details'>
            { isLoading && <div>Chargement...</div> }
            { error && <div>{error}</div> }
            { anime && (
                <div className='container'>
                    <div className="card">
                        <h2>{anime.title}</h2>
                        <a href={anime.url} target="_blank"><img src={anime.image} class="card-img-top img-detail img-responsive" alt="..."></img></a>
                        <p>{anime.rating} &#x2605; </p>
                        <p>Genres: {anime.genres}</p>
                        <p>{anime.summary}</p>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default AnimeDetails;