import React,{useState, useEffect} from 'react';
import '../App.css';
import parse from 'html-react-parser';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
  ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      border: '1px solid rgba(255,193,25,0.25)',
      color: "#fff",
      overflow: 'hidden',
      borderRadius: 4,
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        boxShadow: `rgba(255,193,25,0.25) 0 0 0 2px`,
        borderColor: `rgb(255,193,25)`
      },
    },
  }));

const RightContainer = (props) =>{
    const {content} = props;
    return(
        <div className="right-container">
            <div className="details">
                <p>Japanese Title : {content.titles.jp}</p>
            </div>
            <div className="genres">
                <span 
                style={{  color: "white", fontFamily: "Montserrat,Arial", 
                    lineHeight: "1.1em", fontWeight:"500", marginBottom:"8px" }}
                >
                    Genres  
                </span>
                {content.genres.map(genre=>{
                    return <span className="genre">{genre}</span>
                })}
            </div>
            <div className="other-details">Season Year : {content.season_year}</div>
        </div>
    )
}


const MainContainer = (props) =>{
    const {username, content} = props;
    // console.log("props",props);
    const description = parse(content.descriptions.en);
    const trailUrl = content.trailer_url;
    let history = useHistory();
    return(
        <div className="main-container">
            <Button variant="text" style={{color:"#fff", marginTop:"8px"}} onClick={()=>history.push(`/home/${username}`)}>HOME</Button>
            <a href={trailUrl} target="__blank" className="trailer"><span className="icon">{<PlayArrowIcon />}</span>{trailUrl ? "Watch Trailer" : "No Trailer Available"}</a>
            <div className="description">{description}</div>
        </div>
    )
}

const Reviews = (props)=>{
    const {id, username} = props;
    const [review, setReview] = useState('');
    const [reviewData, setReviewData] = useState([]);
    const obj = {
        username: username,
        id: id,
        review: review
    }

    useEffect(()=>{
        axios.post("https://anime-website-project.herokuapp.com/details/review/getreview", {id})
            .then(res=>setReviewData(res.data));
    },[id]);
       
    function handleClick(){
        const reviewTrim = review.trim();
        if(reviewTrim.length<20){
            alert("Please Add More Than 20 Characters");
        }else{
            axios.post("https://anime-website-project.herokuapp.com/details/review", obj)
            .then(res=>{
                if(res.data==="Review Added"){
                    alert(res.data);
                }
            });
        }
    }
    
    return(
        <div className="reviews-container">
            <div style={{fontSize: "28px", color:"white", fontWeight: "200", fontFamily: "Montserrat,Arial", padding:"8px"}}>Reviews</div>
            <RedditTextField
                onChange={(e)=>setReview(e.target.value)}
                value={review}
                placeholder="Enter Review"
                variant="filled"
                style={{ margin: 9, width: "100%"}}
            />
            <Button onClick={()=>{handleClick()}} style={{backgroundColor:"#ffc119", margin: 9}} variant="contained" size="large">Submit</Button>
            <div className="reviews">
                <div style={{fontSize: "20px", color:"white", fontWeight: "200", fontFamily: "Montserrat,Arial", padding:"8px"}}>Other Reviews</div>
                {reviewData.map((element)=>{
                    return(
                        <div className="review-element"> 
                            <p style={{fontSize: "14px", color:"white", fontWeight: "600", fontFamily: "Montserrat,Arial", marginBottom:"-4px"}}>Review From : &#64;{element.username}</p>
                            <p style={{fontSize: "12px", fontWeight:"100", color:"white", fontFamily: "Montserrat,Arial", textTransform: 'capitalize'}}>{element.review}</p>
                        </div>
                    ) 
                })}
            </div>
        </div>
    )
}

const Details = (props) => {
    const id = props.match.params.id;
    const username = props.match.params.username;
    const [data, setData] = useState();
    
    useEffect(() => {
        fetch(`https://api.aniapi.com/v1/anime?anilist_id=${id}`)
            .then(res => res.json())
            .then(jsonRes => setData(jsonRes))
    }, [id]);
    
    return (
        <div>
            {
                data && data.data.documents && data.data.documents.map((val,index)=>{
                    return(
                        <div className="details-container">
                            <div className="heading-container">{val.titles.en}</div>
                            <div className="sub-container">
                                <div className="image-container"><img src={val.cover_image} alt={val.titles.en} className="image" /></div>
                                <MainContainer username={username} content={val} />
                                <RightContainer content={val} />
                            </div>
                            <Reviews id={id} username={username} />
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Details
