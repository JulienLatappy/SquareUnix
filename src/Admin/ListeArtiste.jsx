import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import Vignette from './Vignette';
import Bouton from '../Component/Bouton';
import './ListeArtiste.css';

class ListeArtiste extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
       
    }

    edit() {

    }
 
    delete() {
        if (window.confirm('Voulez-vous vraiment supprimer ?')) {
            const id = this.props.id;
            const url = "http://92.175.11.66:3000/squareunix/api/artistes";
            fetch(url + "/" + id, {
                method: 'DELETE'
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log('success');
                    document.location.reload(true);
                    return response;
                } else {
                   console.log('Something happened wrong');
                }
            }); 
        }   
        
    }


    render() {
        
        return (       
            <li key={this.props.id} className="ficheArtiste">
                <Col md="4" className="Vignette"><Vignette src={this.props.src} alt={this.props.alt} height={this.props.height} width={this.props.width} /></Col>
                <Col md="4" className="titreVignette">{this.props.alt.toUpperCase()}</Col>
                <Col md="4" className="boutonVignette">
                    <Link to={{pathname: '/adminArtiste', state: {typeAction: "M", datas: this.props.datas}}}>
                        <Bouton hide="non" name="Modification" onClickButton={this.edit} />
                    </Link>
                    <Bouton hide="non" name="Suppression" onClickButton={this.delete} />
                </Col>
            </li>
        );    
    }

}

export default ListeArtiste;

