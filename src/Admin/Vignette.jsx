import React from 'react';

function Vignette(props) {
    return (
        <img src={props.src} alt={props.alt} height={props.height} width={props.width} />
    );
}

export default Vignette;