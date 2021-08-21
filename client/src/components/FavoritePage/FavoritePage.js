import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './favorite.css';

function FavoritePage() {

    const variable = {userFrom : localStorage.getItem('userId')}
    const [FavoritedMovies, setFavoritedMovies] = useState([]);


        useEffect(() => {
            getFavoriteMovies();
    }, [])

    const getFavoriteMovies = () => {
        axios.post('/api/favorite/getFavorites', variable)
        .then(response => {
            if(response.data.success) {
                setFavoritedMovies(response.data.favorites);
            } else {
                alert('Failed to get Favorites');
            }
        })
    }

    const removeOnClick = (movieID) => {

        const variables = {
            movieID: movieID,
            userFrom: localStorage.getItem('userId')
        }

        axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        getFavoriteMovies();
                    } else {
                        alert('Failed to remove from Favorites');
                    }
                })

    }

    const renderBody = FavoritedMovies.map((movie, index) => {

        return <tr>
            <td>{movie.movieTitle}</td>
            <td>{movie.movieRunTime}</td>
            <td><button onClick={() => removeOnClick(movie.movieID)}>Remove</button></td>
        </tr>

    })

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2>My Favorites</h2>
            <hr />
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Runtime</th>
                        <th>Remove from Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBody}
                </tbody>
            </table>
        </div>
    );
}

export default FavoritePage;