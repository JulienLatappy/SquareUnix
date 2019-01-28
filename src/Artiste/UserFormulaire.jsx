import React from 'react';
import { Form, FormGroup, Label, Input, InputGroupAddon, Row, InputGroup, Container, Col  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Bouton from '../Component/Bouton' ;
import './UserFormulaire.css';
import Menu from '../Page/Menu';



class Userform extends React.Component {
        constructor(props) {
            super(props);
            this.state = { 
                formulaire : [],
                hide : 'non',
                show : 'oui',
                
                placeRes: "",
                prixTotal : 0,
             };
             this.handleChange=this.handleChange.bind(this);
             this.handleSubmit=this.handleSubmit.bind(this);
        }
        
        componentDidMount() {
          const id = this.props.match.params.id;

        fetch("http://92.175.11.66:3000/squareunix/api/artistes/"+ id)
          .then(res => res.json())
          .then(datas => {
            this.setState({
              formulaire : datas
            });
          })
          .catch(err=> {
            console.log("ERROR", err)
          });
        }

        handleChange(e) {
          this.setState({
            placeRes: e.target.value,
            prixTotal : this.state.formulaire.prixPlace * e.target.value,
          });
        }

        handleSubmit(e){
          e.preventDefault();
          
          this.state.formulaire.nombrePlaces = this.state.formulaire.nombrePlaces - this.state.placeRes;
          this.setState({
            formulaire : this.state.formulaire.nombrePlaces,           
            
          });

          const datas = {
            ...this.state.formulaire
          }
          const url = "http://92.175.11.66:3000/squareunix/api/artistes";

        fetch(url + "/" + datas.id, {
            method: 'PUT',
            body: JSON.stringify(datas),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
          if (response.ok) {
            alert(`Réservation effectuée ! Vous avez réservé ${this.state.placeRes} place(s) pour un prix total de ${this.state.prixTotal} €`);
            this.props.history.push(`/`);
            
        }
          
        });
    }
          
          
  

  render() {
    return (
      <div className="pageformulaire">
     <Menu />
      <Container >
        
        <Row>
          <Col lg="6" className="placeaffiche">
          <img src={this.state.formulaire.src} alt={this.state.formulaire.nom} className="affiche" />
          </Col>
          <Col lg="6">
      <Form onSubmit={this.handleSubmit} className="formulaire">
        <FormGroup>
          <Input required type="Lastname" name="Lastname" placeholder="Nom *"/>
        </FormGroup>
        <FormGroup>
          <Input required type="Firstname" name="Firstname" placeholder="Prénom *"/>
        </FormGroup>
        <FormGroup>
          <Input type="tel" name="tel" placeholder="Téléphone"/>
        </FormGroup>
        <FormGroup>
          <Input required type="mail" name="mail" placeholder="E-Mail *"/>
        </FormGroup> 
        <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Date du concert :</InputGroupAddon>     
            <Input id="dateDebut" type="date" name="dateDebut" value={this.state.formulaire.datedebut} />
            </InputGroup>
            <InputGroup> 
            <InputGroupAddon className="prixbillet" addonType="prepend">Prix du billet à l'unité : {this.state.formulaire.prixPlace} €</InputGroupAddon>
          </InputGroup>                                       
          </FormGroup>
        <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Nombre de place(s)</InputGroupAddon>
          <Input required placeholder="Nombre De Place(s)" type="number" name="nbPlace" step="1" value={this.state.placeRes} onChange={this.handleChange} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Prix Total</InputGroupAddon>
            <Input disabled type="url" name="url" placeholder={this.state.prixTotal +" €"} />
            </InputGroup>
          </FormGroup>
          <p className="obli rouge">* Champs obligatoires</p>
          <div className="option">
        <Row className="optionrow">
          <Col md="6" className="check">
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> Parking
          </Label>
        </FormGroup>
        </Col>
        <Col md="6" className="check">
        <FormGroup check inline>
          <Label check>
             <Input type="checkbox" /> P.M.R.
          </Label>
        </FormGroup>
        </Col>
        </Row>
        <Row className="optionrow">
          <Col md="6" className="check">
        <FormGroup check>
              <Label check inline>
                <Input type="radio" name="radio2" />{' '}
                Billet(s) à retirer à l'accueil  
              </Label>
            </FormGroup>
            </Col>
            <Col md="6" className="check">
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" />{' '}
                E-Billet(s)
              </Label>
            </FormGroup>
            </Col>
        </Row>
        <Row >
        <Col className="cgu">
        <FormGroup check inline>
          <Label check>
             <Input required type="checkbox" /> C.G.U.*
          </Label>
        </FormGroup>
        </Col>
        </Row>
        </div>
        <Row className="placebouton">
          <Bouton name='Valider' hide={this.state.hide}/>
          <Link to={{pathname: '/' }}><Bouton name='Annuler' hide={this.state.hide}/></Link>
        </Row>
        
      </Form>
     
      </Col>
      </Row>
      </Container>
      
      </div>
    );
  }
}



export default Userform;