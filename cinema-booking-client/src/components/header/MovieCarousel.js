import './movieCarousel.css';

function MovieCarousel() {
    return (
        <div className="header">
            <iframe className="hero-trailer" width="880" height="515" src="https://www.youtube.com/embed/oHY7D7K58BM?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    );
}

export default MovieCarousel;
