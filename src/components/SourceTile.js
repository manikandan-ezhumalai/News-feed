import React from 'react';

const SourceTile = ({ name, image, url }) =>
    <div className='source-grid-element'>
        <img src={image} alt = {name}/>
        <p style = {{ color : "black" }}>{name}</p>
    </div>

export default SourceTile