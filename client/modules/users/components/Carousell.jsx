import React from 'react';


export default class Carousell extends React.Component {
  componentDidMount() {
 $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('.carousel-slider').carousel({fullWidth: true, padding:200},setTimeout(autoplay, 4500));
  function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4500);
     } // activate the menu
  }    


 render() {
    return (
/*<div className="row">
  <div className=" card-panel remove-padding " data-indicators="true">
    
   
      
         <img className="" src="/images/HomePage.jpg" width = "100%;" />
   
 
  </div>
   </div>
*/
<div className="row carousel-container ">
 <div className="carousel carousel-slider col s12 ">
    <div className="carousel-item " >
    <img className="card-panel remove-padding " src="/images/HomePagev2-2.jpg" /></div>

    <div className="carousel-item " >
    <img className="card-panel remove-padding " src="/images/Test.jpg" /></div>

     <div className="carousel-item " >
    <img className="card-panel remove-padding " src="/images/hpbdsg.jpg" /></div>



  </div>





   </div>



        );
  }
}

/* 
   <div className="carousel-item white-text" href="#two!">
     
         <img className="carousel " src="/images/HomePage.jpg" />
    </div>
    <div className="carousel-item white-text" href="#three!">
 
         
         <img className="carousel" src="/images/HomePage.jpg" />
    </div>
    <div className="carousel-item" href="#four!">
  
         <img className="carousel " src="/images/HomePage.jpg" />
          </div>
          */