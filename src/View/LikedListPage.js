import React, { Fragment } from 'react';
import axios from 'axios';
import ShowLikedMovie from './ShowLikedMovie';
//redux
import { connect } from 'react-redux';
import Selector from '../Selector';
import { actions } from '../ActionCreator';

class LikedListPage extends React.Component {
    render() {
        const likedMovies = this.props.LikedMovies.map( movie => 
            <ShowLikedMovie 
                key={movie.id} movieData={movie} 
                deleteOneLikedMovie={this.props.deleteOneLikedMovie}
                addOneBlockedMovie={this.props.addOneBlockedMovie}
            />
        );

        return (
            <Fragment>
                <h1>Movie List of Liked</h1>
                <div className="ShowLikedMovie">
                    {likedMovies}
                </div>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(LikedListPage);