import React, { Component } from 'react';
import './Footer.css';
import {Row} from 'reactstrap';

class Footer extends Component {
    render() { 
        return ( 
            <div className="footer p-0">
                <span><a  href="https://policies.google.com/terms?hl=fr&gl=ZZ" target="_blank" className="deconone">Conditions générales</a></span>
                <span><a  href="https://policies.google.com/?hl=fr" target="blank" className="deconone">Mentions légales</a></span>
                <Row>
                    <span><a  href="https://www.facebook.com/TheGarden/" target="_blank"><img className="icons"  src="/images/Facebook.png" alt="facebookicon"></img></a></span>
                    
                    <span><a  href="https://www.instagram.com/thegarden/?hl=fr" target="_blank" ><img className="icons"  src="/images/Instagram.png" alt="facebookicon"></img></a></span>
                    
                    <span><a  href="https://twitter.com/thegarden" target="_blank" ><img className="icons"  src="/images/Twitter.png" alt="facebookicon"></img></a></span>
                </Row>
            </div>
         );
    }
}
 
export default Footer;