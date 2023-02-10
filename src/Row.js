import { useState,useEffect} from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url=" http://image.tmdb.org/t/p/original/";
function Row( {title,fetchUrl,IsLargeRow} ) {
 const [movies,SetMovies]=useState([]);
 const[trailerUrl,SetTrailerUrl]=useState("");
 //use effect is used to run a snippet of code based on condition
 useEffect(()=>{
    
    //if [] it's empty it only run once....but if it contain movies variable the code is going to run whenever the movie changes
    async function fetchdata()
    {
        //await will wait for request to comeback
       const request=await axios.get(fetchUrl);
    //in the above line axios is appending base url to diff gen urls https://api.themoviedb.org/3//trending/all/week?api_key=${API_KEY}&language=en-US
    // console.log(request.data.results);
    SetMovies(request.data.results);
    return request;
    }fetchdata();
 },[fetchUrl])
const handleclick = (movie)=>{
   if(trailerUrl)
   {
    SetTrailerUrl("");
   }
   else{
     movieTrailer(movie?.name || "").then((url)=>{
      // https://www.youtube.com/watch?v=XtMThy8QKqU
      const urlParams=new URLSearchParams(new URL(url).search);
      SetTrailerUrl(urlParams.get("v"));
     }).catch((error)=>console.log(error))
   }
};
 const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,}
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      {/* row container */}
      <div className="row_posts">
         {/*container-->movie posters in a row*/}
        {movies.map(movie => (
          <img onClick={()=>handleclick(movie)} key={movie.id} className={`${IsLargeRow?"postlarge":"row_post"}`} src={`${base_url}${IsLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />))}
      </div>
      
     
    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row
