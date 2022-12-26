import React, { useState} from 'react';
import './App.css';
import Clear from './image/Clear.jpg'
import Cloudy from './image/Cloudy.jpg'
import Rainy from './image/Rainy.jpg'
import Snow from './image/Snow.jpg'
import Overcast from './image/Overcast.jpg'
import icon from './image/icon.png'
import { useEffect } from 'react';
import temp from './image/temperature.png'
import local from './image/local.png'
import time from './image/time.png'
import text from './image/text.png'
function App() {
  const[city,setCity]=useState("");
  const[cityinfo,setCityInfo]=useState({}); 

useEffect(() => {
  handelFeach();
},[]
);


  const handelFeach =() => {
  
  fetch(`http://api.weatherapi.com/v1/current.json?key=a4c3fe670e3e43a4b66211854220912&q=${city}&aqi=no`)
  .then((response) => response.json())
  .then((data) => setCityInfo({
    name: data.location.name,
    country: data.location.country,
   
  current:data.current.temp_f,
   
  time:data.location.localtime ,
  condition:data.current.condition.text
  }));


};
console.log(cityinfo)

  return (
    <div className="App" style={
      cityinfo.condition?.toLowerCase() === "clear"|| 
      cityinfo.condition?.toLowerCase() === "sunny"
      ?{backgroundImage:`url(${Clear})`}
      :cityinfo.condition?.includes("cloudy")
      ?{backgroundImage:`url(${Cloudy})`}
      :cityinfo.condition?.toLowerCase().includes("rainy")
      ?{backgroundImage:`url(${Rainy})`}
      :cityinfo.condition?.toLowerCase().includes("snow")
      ?{backgroundImage:`url(${Snow})`}
      :{backgroundImage:`url(${Overcast})`}

  }>
      

      <div>
            <div className="header">
            React Weather
            </div>
            <div className="city">
                <div>
                  <input type="text" name="city" value={city} 
                  className="form" placeholder="Entrer votre city"
                  onChange={(event)=>setCity(event.target.value)}/>
                </div>
                <div>
                  <button onClick={handelFeach} className="ff"><img src={icon} alt="icon"   className='ic'/></button>
                </div>
          
            </div>
        <div className='info'>
              <div className='Ti'>
                <img src={time} alt="icon" className='ic' />
                <h1>{cityinfo.time}</h1>
              </div>
        
            <div className='L'>
              <img src={local} alt="icon" className='ic' />
              <div className='name'> 
                  <h1>{cityinfo.name}</h1>
                  <h1>{cityinfo.country}</h1>
              </div>
    
            </div>
          <div className='T'>
              <img src={temp} alt="icon" className='ict' />
              <h1 className='tem'>{cityinfo.current} </h1>
          </div>
          <div className='text'>
              <img src={text} alt="icon" className='ic' /> 
              <h1>{cityinfo.condition}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
