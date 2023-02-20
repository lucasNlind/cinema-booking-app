import './previewInfo.css';
import { Link } from 'react-router-dom';


function PreviewInfo() {
    return (
        <div className="singleMovieInfo">
            <div className="singleMovieWrap">
                <div className="headerPreview">
                    <img className="singleMovieImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CasablancaPoster-Gold.jpg/220px-CasablancaPoster-Gold.jpg" alt="Casablanca Poster"/>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/BkL9l7qovsE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <h2 className="singleMovieTitle">
                    CASABLANCA
                </h2>
                <div className="movieInfo">
                    <p className="category">Genre: Romance</p>
                    <p className="cast">Cast: Humphrey Bogart, Ingrid Bergman, Paul Henreid, Peter Lorre</p>
                    <p className="director">Director: Michael Curtiz</p>
                    <p className="producer">Producer: Hal B. Wallis</p>
                    <p classname="summary">Casablanca is a 1942 American romantic drama film directed by Michael Curtiz, and starring Humphrey Bogart, Ingrid Bergman, and Paul Henreid.
                     Filmed and set during World War II, it focuses on an American expatriate (Bogart) who must choose between his love for a woman (Bergman) and helping her husband 
                     (Henreid), a Czechoslovak resistance leader, escape from the Vichy-controlled city of Casablanca to continue his fight against the Germans. </p>
                    <p className="reviews">8.5/10 IMDb</p>
                    <p className="fileRatingCode">Rated PG</p>
                </div>

                <div className="ticketBooking">
                    <h2 className="selectTime">
                        Select Showtime
                    </h2>

                    <div className="showtimes">
                        Feb 22nd <br/>
                        <Link to="/ticketselect"><button className="times">7:00</button>
                        <button className="times">8:30</button></Link>
                        <br/>

                        Feb 24th <br/>
                        <Link to="/ticketselect"><button className="times">9:00</button>
                        <button className="times">10:15</button></Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PreviewInfo;