import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const AnimeGrid = (props) => {
    const {data, username} = props;
    const matches = useMediaQuery('(max-width:550px)');
    console.log(matches);
    return (
        <div>
            <ImageList cols={matches ? 2 : 5 } style={{padding:"8px", gap:"16px"}}>
                {
                    data && data.data.documents && data.data.documents.map((val,index)=>{
                        const detailsPath = `/details/${val.anilist_id}/${username}`;
                        return(
                            <Link to={detailsPath} style={{textDecoration:"none"}} key={val.anilist_id}>
                                <Card sx={{ maxWidth: 245, height:"100%"}}>
                                    <CardMedia
                                        component="img"
                                        height="65%"
                                        image={val.cover_image}
                                        alt={val.titles.en}
                                    />
                                    <CardContent sx={{ bgcolor: "#1b1b1b", color:"rgb(255,193,25)", height:"35%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"8px"}}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {val.titles.en}
                                        </Typography>
                                        <Typography color="rgb(255,255,255)">
                                            No. of Episodes {val.episodes_count}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })
                }
            </ImageList>
        </div>
    )
}

export default AnimeGrid
