import React from 'react';


export default class Parallax extends React.Component {
  componentDidMount() {
    // activate the menu
 $(document).ready(function(){
      $('.parallax').parallax();
    });}


 render() {
    return (
      <div className=" col s12 ">
  <div  className="parallax-container ">
      <div className="parallax card-panel"><img src="/images/HomePage.jpg" /></div>
    </div></div>);
  }
}