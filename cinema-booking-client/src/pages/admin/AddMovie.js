import React from 'react';
import { Link } from 'react-router-dom';
import './addmovie.css';

const AddMovie = () => {
    return (  
    <div className="add-movie-wrap">
        <form>
            <div className="add-input">
                <label>Movie Title </label>
                <input type="text" name="title" required />
            </div>

            <div className="add-input">
                <label>Category </label>
                <input type="text" name="category" required />
            </div>

            <div className="add-input">
                <label>Cast</label>
                <input type="text" name="cast" required />
            </div>

            <div className="add-input">
                <label>Director </label>
                <input type="text" name="pass" required />
            </div>

            <div className="add-input">
                <label>Producer</label>
                <input type="text" name="producer" />
            </div>

            <div className="add-input">
                <label>Synopsis</label>
                <input type="text" name="synopsis" />
            </div>

            <div className="add-input">
                <label>Reviews</label>
                <input type="text" name="reviews" />
            </div>

            <div className="add-input">
                <label>Video Link</label>
                <input type="text" name="link" />
            </div>

            <div className="add-input">
                <label>Show Dates</label>
                <input type="text" name="dates" />
            </div>

            <div className="add-input">
                <label>Show Times</label>
                <input type="text" name="times" />
            </div>

            <br></br>

            <div className="add-center">
            <Link className="submit-movie-btn" to="/adminhome">Submit</Link>
            </div>
        </form>
    </div>
    );
};

export default AddMovie;