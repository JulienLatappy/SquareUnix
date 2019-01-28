import React, { Component } from 'react';
import Bouton from '../Component/Bouton';
import Vignette from '../Admin/Vignette';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './PageArtistes.css';
import Menu from '../Page/Menu';

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
        
        
        
    }
    render() {
        
        return (
            <div>     
                <Menu />
                <Container fluid={true} className="StyleArtiste">
                    <ul className="liste">
                        {this.state.liste.map((artiste) => (
                          
                            <li key={artiste.id} className="listeItem">
                                <Row className="ligne">
                                    <Col lg="4">
                                        <Vignette src={artiste.src} alt={artiste.nom} height={height} width={width}/>   
                                    </Col>
                                    <Col lg="4" className="infos">
                                       
                                            <h3 className="noir">{artiste.nom}</h3>
                                            <p className="noir">Du {moment(artiste.dateDebut).utc().add(1,"day").format("DD/MM/YYYY")} au {moment(artiste.dateFin).utc().add(1,"day").format("DD/MM/YYYY")}</p>
                                            <p className="noir">Billet au prix de {artiste.prixPlace} €</p>
                                      
                                    </Col>
                                    <Col lg="4">
                                        <div className="clsBtn">
                                        <Link to={{pathname: `/concert/${artiste.id}`}}><Bouton hide="non" name="Plus d'infos" onClickButton={this.envoi} /></Link>
                                        </div>
                                    </Col>
                                </Row>
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