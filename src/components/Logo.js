import React from 'react';

const Logo = ({ name, image }) =>
  <div className='logo'>
    <img alt = {name} src={image} />
    <p style = {{ color : 'black'}}>{name}</p>
  </div>

export default Logo;