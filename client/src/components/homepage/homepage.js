import React, { useEffect, useState } from 'react';
import {API_URL, API_KEY, IMAGE_URL} from '../config';
import 'antd/dist/antd.css';
import { Typography, Row, Button } from 'antd';
import MainImage from './sections/MainImage';
import GridCard from './sections/GridCard';
import SearchMovie from './sections/SearchMovie';
const { Title } = Typography;


function HomePage() {

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0);
    const [SearchType, setSearchType] = useState("");

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, []); 

    const fetchMovies = (path) => {

        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setMovies([...Movies, ...response.results]);
            setCurrentPage(response.page);
        });
    }

    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    const searchMovies = (newSearchType) => {
        setSearchType(newSearchType);
        const searchEndPoint =`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${newSearchType}`;

        if(newSearchType !== "") {
            fetch(searchEndPoint)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovies([]);
                setMovies([...response.results]);
                setCurrentPage(0);
                setCurrentPage(response.page);
            });
        } else {
            fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovies([]);
                setMovies([...response.results]);
                setCurrentPage(0);
                setCurrentPage(response.page);
            });
        }

    }

    return (
        <div style={{width: '100%', margin: '0'}}>
            <br />
            <br />

            {Movies[0] && 
                <MainImage image={`${IMAGE_URL}w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`} title={Movies[0].original_title} text={Movies[0].overview} />
            }
            <div style={{display:'flex', justifyContent:'center', margin:'1rem auto'}}>
                <SearchMovie 
                    refreshFunction={searchMovies}
                />
            </div>
            

            <div style={{width: '85%', margin: '1rem auto'}}>
                <Title level={2}>Movies by latest</Title>
                <hr />
  
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                    movie.poster_path && 
                    <React.Fragment key={index}>
                        <GridCard image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`} movieID={movie.id} title={movie.title} />
                    </React.Fragment>
                    ))}
                </Row>
                


                <br />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={handleClick}>Load more</Button>
                </div>
            </div>
        </div>
    )
}


export default HomePage