import React, { useEffect, useState } from 'react'
import requests from './requests';
import axios from './axios';
import './Banner.css';

function Banner() {

    const [movie,SetMovie]=useState([]);
    useEffect(
        ()=>{

            async function fetchdata()
            {
        //await will wait for request to comeback
        const request=await axios.get(requests.fetchTrending);
        SetMovie(request.data.results[Math.floor(Math.random() * request.data.results.length-1)]);
        return request;
            }
            fetchdata();
        },[]
    );
   
    const truncate = (str, len) => {
        if(str)
        {
            var n=str.length;
        }
        if (n > len) {
           if (len <= 3) {
              return str.slice(0, len - 3) + "...";
           }
           else {
              return str.slice(0, len) + "...";
           };
        }
        else {
           return str;
        };
     };
 

  return (
    <header className="banner" 
        style={{backgroundSize:"cover",
                backgroundImage:`url("http://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backdrop_Position:"center center",}}>
               
             
        <div className="banner_content">
        {/* title */}
        <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className='banner_buttons'>
           <a href="https://www.netflix.com/in/"><button className="banner_button">play</button></a>
           <a href="https://www.netflix.com/in/"><button className="banner_button">MyList</button></a>


{/* buttons 2 */}
        </div>
        <h1 className='banner_description'>{truncate(movie?.overview,150)}</h1>
      
        {/* discription */}

        </div>
       
    <div className='banner_fade'></div>
      
    </header>
  )
}

export default Banner
