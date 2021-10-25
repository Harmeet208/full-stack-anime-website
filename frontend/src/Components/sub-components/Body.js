import React, { useState, useEffect } from 'react';
import AnimeGrid from './AnimeGrid';
import LoadingComp from '../../Images/loading.gif'
import './Body.css';


const Body = (props) => {
    const {name, username} = props;
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`https://api.aniapi.com/v1/anime?${name ? "title=" : ""}${name}`)
            .then(res => res.json())
            .then(jsonRes => setData(jsonRes));
    }, [name]);

    return (
        <div className="Body-Container">
            {data ? <AnimeGrid username={username} data={data} /> : <img src={LoadingComp} className="loading" alt="Loading GIF" /> }
        </div>
    )
}
export default Body;