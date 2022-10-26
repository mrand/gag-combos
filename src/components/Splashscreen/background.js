import React from 'react';
import './background.css';
import gagsObj from '../../features/combos/gags.json';
import { Gag } from '../../features/combos/Combo';


const gagColors = {
  "Toon-Up": "#c55ae8",
  "Trap":    "#e8e65a",
  "Lure":    "#33bd35",
  "Sound":   "#5470ef",
  "Throw":   "#ed9f32",
  "Squirt":  "#f55bd6",
  "Drop":    "#32eaed"
};

function parseJSON() {
  let tracks = Object.keys(gagsObj["Organic"]);
  let thisTrack;
  let thisGag;

  let gagImages = [];
  tracks.map((track, j) => {
    thisTrack = gagsObj['Non-Organic'][track];
    thisTrack.map((gag, k) => {
      thisGag = new Gag(track, k+1, false);
      gagImages.push({
        "name": thisGag.name,
        "src":  thisGag.image,
        "bg":   gagColors[thisGag.track]
      });
    })
  })
  return gagImages
}


function shuffle(array) {
  let curr_idx = array.length;
  let rand_idx;
  // while there are elements left to shuffle
  while (curr_idx != 0) {
    // swap random remaining element with current element
    rand_idx = Math.floor(Math.random() * curr_idx);
    curr_idx--;
    [array[curr_idx], array[rand_idx]] = [array[rand_idx], array[curr_idx]];
  }
  return array;
}


function configureImages() {
  let gagImages = parseJSON();
  let copy = JSON.parse(JSON.stringify(gagImages));
  gagImages = gagImages.concat(copy).concat(copy).concat(copy).concat(copy).concat(copy).concat(copy);
  let shuffledImages = shuffle(gagImages);
  return shuffledImages;
}


/*
  NOTE: This is used to generate the image, but is not used in the actual page.
  I wrote this code to make the image, then screenshotted it for use in the homepage.
*/
export default function Background() {
  const shuffledImages = configureImages();
  return (
    <div id='image-grid'>
      {
        shuffledImages.map((image, i) => {
          return (
            <div 
              key={i} 
              className='img-wrap' 
              style={{background:image.bg}}
            >
              <img src={image.src} alt={image.name} />
            </div>
          )
          
        })
      }
    </div>
  );
}