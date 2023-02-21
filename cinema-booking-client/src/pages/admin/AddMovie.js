import React from 'react';
import './addmovie.css';

const AddMovie = () => {
    return (
        <div>
            
    <div className="form">
      <form>
        <div className="input-container">
          <label>Movie Title </label>
          <input type="text" name="title" required />
        </div>
        <div className="input-container">
          <label>Category </label>
          <input type="text" name="category" required />
        </div>
        <div className="input-container">
          <label>Cast</label>
          <input type="text" name="cast" required />
        </div>
        <div className="input-container">
          <label>Director </label>
          <input type="text" name="pass" required />
        </div>
        <div className="input-container">
          <label>Producer</label>
          <input type="text" name="producer" />
        </div>
        <div className="input-container">
          <label>Synopsis</label>
          <input type="text" name="synopsis" />
        </div>
        <div className="input-container">
          <label>Reviews</label>
          <input type="text" name="reviews" />
        </div>
        <div className="input-container">
          <label>Video Link</label>
          <input type="text" name="link" />
        </div>
        <div className="input-container">
          <label>Show Dates</label>
          <input type="text" name="dates" />
        </div>
        <div className="input-container">
          <label>Show Times</label>
          <input type="text" name="times" />
        </div>
        <br></br>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>

        </div>
    );
};

export default AddMovie;