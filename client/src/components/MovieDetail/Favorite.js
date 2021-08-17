import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import axios from 'axios';

function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0) 

    useEffect(() => {

        const variable = {
            userFrom: props.userFrom,
            movieID: props.movieID,
            movieTitle: props.movieInfo.original_title,
            movieImage: props.movieInfo.backdrop_path,
            movieRunTime: props.movieInfo.runtime
        }


        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Failed to get favorite number.');
                }
            })
    }, [])


    return (
        <div>
            <Button>Add to Favorite</Button>
        </div>
    );
}

export default Favorite;