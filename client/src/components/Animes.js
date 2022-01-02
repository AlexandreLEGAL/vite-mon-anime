import { Link } from "react-router-dom";
import { useState } from "react";
const LOGO_ADN = "https://animedigitalnetwork.fr/images/favicon-32x32.png";
const LOGO_CRUNCHYROLL = "https://www.crunchyroll.com/favicons/favicon-32x32.png";
const LOGO_WAKANIM = "https://d2y6mqrpjbqoe6.cloudfront.net/image/upload/f_auto,q_auto/content/images/favicon.png";

const Animes = ({animes, title}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const allSite = ["ADN", "Crunchyroll", "Wakanim"]
    const [siteFilter, modifySiteFilter] = useState([])
    return (  
        <div classname="anime-list">
            <h2>{title}</h2>
            <div className="searchBar">
                <input className="form-control" type="text" placeholder="Rechercher par titre..." onChange={event => {setSearchTerm(event.target.value)}}></input>
                {/* <input type="checkbox" onChange={event => {modifySiteFilter(event.target.value)}} ></input>
                <input type="checkbox" onChange={event => {modifySiteFilter(event.target.title)}} ></input>
                <input type="checkbox" onChange={event => {modifySiteFilter(event.target.title)}} ></input> */}
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-6 g-3">
            {Object.values(animes)
            // .filter((val) => {
            //     if (siteFilter == []){
            //         return val
            //     } 
            //     // else if (val.site.toLowerCase().includes(siteFilter.toLowerCase())){
            //     //     return val
            //     // }
            // })
            .filter((val) => {
                if (searchTerm == ""){
                    return val
                } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
            }).map((anime)=>(
                <div className="anime-preview col" key={anime.id}>
                    <div class="card view overlay hoverable">
                    <div className="img-fluid img-thumbnail" style={{ 
                        backgroundImage: `url("${anime.image}")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '18.5rem'
                        }}>
                            <a href={anime.url} target="_blank" ><img className="circle" style={{float: "right"}}src={(() => {
                                switch (anime.site) {
                                case "adn":   return LOGO_ADN;
                                case "crunchyroll": return LOGO_CRUNCHYROLL;
                                case "wakanim":  return LOGO_WAKANIM;
                                default:      return "error site";
                                }
                            })()}></img></a>
                        </div>
                            {/* <a href={anime.url} target="_blank" ><img src={anime.image} class="card-img-top" alt="..."></img></a> */}
                            {/* <p>test</p> */}
                        <div class="card-body text-truncate-container">
                            <Link to={`/animes/${anime.id}`}>
                                <h6 class="card-title">{anime.title}</h6>
                            </Link>
                            <p class="card-text">Note : {anime.rating} &#x2605;</p>
                        </div>
                        {/* <button type="button" class="btn btn-primary" onClick={() => handleDelete(anime.id)}>delete anime</button> */}
                    </div> 
                    
                </div>
            ))}
            {/* <div class="col">
                
            </div> */}
            </div>
        </div>
    );
}
export default Animes;