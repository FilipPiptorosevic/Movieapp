import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

function MainImage(props) {
    return (
        <div style={{
            backgroundImage: `url('${props.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
            height: "500px",
            width: "100%",
            position: "relative",
        }}>

            <div>
                <div style={{position: "absolute", maxWidth: "500px", bottom: "2rem", marginLeft: "2rem"}}>
                    <Title style={{color: "white"}} level={2}>{props.title}</Title>
                    <p style={{color: "white", fontSize: "1rem"}}>{props.text}</p>
                </div>
            </div>

        </div>
    )
}

export default MainImage