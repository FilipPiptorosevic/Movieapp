import React from 'react';
import { Col }  from 'antd';

function GridCard(props) {

    if(props.actor) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position: "relative"}}>
                        <img style={{width: "100%", height: "320px"}} alt="img" src={props.image}/>
                        <p style={{textAlign:'center', fontSize:'20px'}}>{props.name}</p>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position: "relative"}}>
                    <a style={{color:'black'}} href={`/movie/${props.movieID}`}>
                        <img style={{width: "100%", height: "320px"}} alt="img" src={props.image}/>
                        <p style={{textAlign:'center', fontSize:'20px'}}>{props.title}</p>
                    </a>
                </div>
            </Col>
        )
    }

   
}

export default GridCard