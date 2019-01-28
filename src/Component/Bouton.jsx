import React from 'react';
import { Button } from 'reactstrap';
import './Bouton.css';

function Bouton(props) {
	
	let cache = (props.hide === "oui") ? "tailleBouton mr-2 ml-2 cache" : "tailleBouton mr-2 ml-2";	
	
	return (
		<Button onClick={props.onClickButton} className={cache} size="lg" color="secondary">{props.name}</Button>
	);
	
}

export default Bouton;

