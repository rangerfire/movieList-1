import React from 'react';
import axios from 'axios';
import ShowMovies from './ShowMovies';
import "../Styles/MovieListPage.css";

import { connect } from 'react-redux';
import Selector from '../Selector';
import { actions } from '../ActionCreator';

const pageBaseURL = 'https://api.themoviedb.org/3/';
const action = 'movie/popular?api_key=';
const ApiKey = '43d2c15376ca311ed501203d6c7cf47f';
const lang = '&language=en-US';
const page = '&page=1';

const url = ''.concat(pageBaseURL,action,ApiKey,lang,page);;

class movieListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        axios.get(url)
        .then( res => {
            const response = res.data;
            this.setState({
                data: response.results.slice()
            });
            console.log(this.state.data);
        });
    }    

    render() {
        const movieList = this.state.data.slice().map(movie => 
            <ShowMovies 
                key={movie.id} movieData={movie}
                addOneLikedMovie={this.props.addOneLikedMovie}
                addOneBlockedMovie={this.props.addOneBlockedMovie}
            />
        );
        return (
            <div className="movieListPage">
                <div className="sortArea">
                    <button>Title</button>
                    <button>Vote Count</button>
                    <button>Average Score</button>
                    <button>Release Date</button>
                </div>
                <p></p>
                <div className="line"></div>
                <div className="paginationArea">
                    <button>Prev</button>
                    <p className="pageText">1/300</p>
                    <button>Next</button>
                </div>
                <div className="line"></div>
                <div className="ShowMovies">
                    {movieList}
                </div>
            </div>
        );       
    }
}

const mapStateToProps = (state) => ({
    LikedMovies: Selector.LikedMoviesSelector(state),
    BlockedMovies: Selector.BlockedMoviesSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    addOneLikedMovie: (movieData) => dispatch( actions.addOneLikedMovie(movieData) ),
    addOneBlockedMovie: (movieData) => dispatch ( actions.addOneBlockedMovie(movieData) ),
    deleteOneLikedMovie: (movieData) => dispatch( actions.deleteOneLikedMovie(movieData) ),
    deleteOneBlockedMovie: (movieData) => dispatch( actions.deleteOneBlockedMovie(movieData) )
});

export default connect(mapStateToProps, mapDispatchToProps)(movieListPage);

