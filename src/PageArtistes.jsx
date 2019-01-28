import React, { Component } from 'react';
import Bouton from './Bouton';
import Vignette from './Vignette';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import './PageArtistes.css';

const height = "200px";
const width = "300px";

class PageArtistes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liste: [],            
           
        };
        this.envoi = this.envoi.bind(this);
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

    envoi() {
        
        
        /*this.props.history.push(`/concert/${id}`);*/
    }
    render() {
        
        return (
            <div>     
                <Container fluid={true} className="StyleArtiste">
                    <ul className="liste">
                        {this.state.liste.map((artiste) => (
                            <li key={artiste.id} className="ligne">
                                <Vignette src={artiste.src} alt={artiste.nom} height={height} width={width}/>    
                                <div className="infos">
                                    <h3 className="noir">{artiste.nom}</h3>
                                    <p className="noir">Du {moment(artiste.dateDebut).utc().format("DD/MM/YYY")} au {moment(artiste.dateFin).utc().format("DD/MM/YYYY")}</p>
                                    <p className="noir">Billet à partir de {artiste.prixPlace} €</p>
                                </div>
                                <Link to={{pathname: `/concert/${artiste.id}`}}><Bouton hide="non" name="Plus d'infos" onClickButton={this.envoi} /></Link>
                            </li>
                            ))
                        }
                    </ul>  
                </Container>  
            </div>   
        )
    }

}

export default PageArtistes;