import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Bouton from '../Component/Bouton';
import Menu from '../Page/Menu';
import ListeArtiste from './ListeArtiste';
import './AdminHome.css';


const height = "280px";
const width = "350px";

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
          liste: [],
        
        };
       
    }
    componentDidMount() {
        fetch("http://92.175.11.66:3000/squareunix/api/artistes")
            .then(response => response.json())
            .then(datas => {
                this.setState({
                    liste: datas,
                })
            })
    }
 
    render() {    
          
        return (
            <div>   
                <Menu />
                <Container fluid={true} className="StyleArtiste">
                    <Link to={{pathname: '/adminArtiste', state: {id: "00", typeAction: "C"}}}><Bouton hide="non"  name="Création Artiste "/></Link>
                    <ul className="liste">
                        {this.state.liste.map((artiste) => (
                            
                            <ListeArtiste id={artiste.id} datas={artiste} src={artiste.src} alt={artiste.nom} height={height} width={width}/>
                        ))
                        }
                    </ul>  
                </Container>  
            </div>    
        );
    }          
}


export default AdminHome;