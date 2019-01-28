import React, { Component } from 'react';
import './PageAccueil.css';
import Media from '../Page/Media';
import Menu from '../Page/Menu';
import { Link } from "react-router-dom";


class PageAccueil extends Component {
    render() { 
        return ( 
            
            <div>
                <img className="image img-fluid" src="/images/welcometoMSG.png" alt=""></img>
                <Media />
                <Menu />
                <Link to={{ pathname: `/adminhome/` }}><div id="lienadmin"></div></Link>
 
            </div>
        );
    }
}
 
export default PageAccueil;


