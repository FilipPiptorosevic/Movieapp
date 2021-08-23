import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0) 
    const [Favorited, setFavorited] = useState(false);
    const user = useSelector(state => state.user)

    const variable = {
        userFrom: props.userFrom,
        movieID: props.movieID,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }

    const addRemoveFavorite = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if(Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Failed to remove from Favorites');
                    }
                })

        } else {
            axios.post('/api/favorite/addToFavorite', variable)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Failed to add to Favorites');
                    }
                })
        }
    }

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Failed to get favorite number.');
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('Failed to get favorite info');
                }
            })
    }, [])


    return (
        <div>
            <Button onClick={addRemoveFavorite}>{!Favorited || (user.userData && !user.userData.isAuth) ? "Add to Favorites " : "Remove from Favorites "}{FavoriteNumber}</Button>
        </div>
    );
}

export default Favorite;