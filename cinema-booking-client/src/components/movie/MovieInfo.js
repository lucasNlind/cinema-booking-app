import './movieInfo.css';
import {Link} from 'react-router-dom';

function MovieInfo() {
    return (
        <div className="movie">
            <Link to="/single"><img className="movieImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CasablancaPoster-Gold.jpg/220px-CasablancaPoster-Gold.jpg" alt="Casablanca"/></Link>

            <div className="movieInformation">
                <div className="postTitle">Casablanca</div>
                <Link className="bookBtn" to="/single">Book Tickets</Link>
            </div>
        
        </div>
    );
}

export default MovieInfo;