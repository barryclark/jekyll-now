import React from 'react';

const NotFound = () => (
  <div className="notfound">
    <img src={require('../../assets/images/logo-black-red.png')} alt="Jekyll Admin" />
    <h1>Huh. It seems that page is Hyde-ing...</h1>
    <h2>The resource you requested was not found.</h2>
  </div>
);

export default NotFound;
