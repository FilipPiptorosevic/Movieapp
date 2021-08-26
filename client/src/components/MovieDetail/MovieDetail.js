import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL, API_KEY, IMAGE_URL, BACKDROP_SIZE } from '../config';
import MainImage from '../homepage/sections/MainImage'
import 'antd/dist/antd.css';
import { Descriptions, Button, Row } from 'antd';
import GridCard from '../homepage/sections/GridCard';
import Favorite from './Favorite';
import Comments from './Comments';
import LikeDislike from './LikeDislike';


function MovieDetail(props) {

    const movieID = props.match.params.movieID;
    const [Movie, setMovie] = useState([]);
    const [Crew, setCrew] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const [CommentLists, setCommentLists] = useState([]);
    const movieVariable = {
        movieID: movieID
    }

    useEffect(() => {


        fetch( `${API_URL}movie/${movieID}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setMovie(response);

                fetch(`${API_URL}movie/${movieID}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        setCrew(response.cast);
                    })

            })

            axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })
            
        
    }, [])

    const handleClick = () => {
        setActorToggle(!ActorToggle);
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment));
    }


    return (
        <div>
            {Movie && 
                <MainImage image={`${IMAGE_URL}${BACKDROP_SIZE}${Movie.backdrop_path}`} title={Movie.original_title} text={Movie.overview} />
            }

            <div style={{width:'85%', margin:'1rem auto'}}>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Favorite userFrom={localStorage.getItem('userId')} movieID={movieID} movieInfo={Movie}/>
                </div>

                <Descriptions title="Movie informations" bordered='true'>
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="Release date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="Average vote">{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="Vote count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="Popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <br />
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button onClick={handleClick}>Toogle Actor View</Button>
                </div>

                {ActorToggle && 
                    <Row gutter={[16, 16]}>
                    {Crew && Crew.map((crew, index) => (
                        <React.Fragment key={index}>
                            {crew.profile_path && <GridCard actor image={`${IMAGE_URL}w500${crew.profile_path}`}/>}
                        </React.Fragment>
                    ))}
                </Row>
                }

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislike movie movieID={movieID} userID={localStorage.getItem('userId')} />
                </div>

                <Comments CommentLists={CommentLists} postID={movieID} refreshFunction={updateComment}/>

            </div>
        </div>
    );
};

export default MovieDetail;