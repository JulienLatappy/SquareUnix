import React, { Component } from "react";
import "./PageConcert.css";
import { Row, Col, Container } from "reactstrap";
import Bouton from "../Component/Bouton";
import { Link } from "react-router-dom";
import moment from 'moment';
import Extrait from './Extrait';
import Menu from '../Page/Menu';



class PageConcert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockage: [],
      dateDebut: "",
      dateFin: "",
      affichageLien: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch("http://92.175.11.66:3000/squareunix/api/artistes/" + id)
      .then(res => res.json())
      .then(datas => {
        let debut = moment(datas.dateDebut).utc().add(1,"day").format("DD/MM/YYYY");
        let fin = moment(datas.dateFin).utc().add(1,"day").format("DD/MM/YYYY");
        let tempAffichageLien = datas.lienSite.slice(8);
        
        this.setState({
          stockage: datas,
          dateDebut: debut,
          dateFin: fin,
          affichageLien: tempAffichageLien,
        });
      })
      .catch(err => {
          console.log("ERROR", err)
      });
  }


  handleClick() { 
  }
  render() {
    return (
      <div>
        <Menu />
        <Container fluid className="ecartPageConcert">
          <Row className="lignex">
            <Col className="vignette" md="5" xs="12">
              <img className="img-fluid affiche" src={this.state.stockage.src} alt={this.state.stockage.nom}/>
            </Col>

            <Col md="7">
              <div className="ArtisteInfos">
                <p className="textInfos titre">{this.state.stockage.nom}</p>
                <p className="textInfos">
                  Du {this.state.dateDebut} au{" "}
                  {this.state.dateFin}
                </p>
                <p className="textInfos">
                  Billet au prix de {this.state.stockage.prixPlace} €
                </p>
                <p className="textInfos">
                  {this.state.stockage.nombrePlaces} places disponibles
                </p>

                <Link to={{ pathname: `/userformulaire/${this.state.stockage.id}` }}>
                  <Bouton
                    name="Réserver"
                    hide="non"
                    onClick={this.handleClick}
                  />
                </Link>

                <p className="lienartiste">

                  <a target="_blank" href={this.state.stockage.lienSite}>
                    {this.state.affichageLien}
                  </a>
                </p>
                  <div className="ConcertIcons">
                    <span>
                      <a href={this.state.stockage.lienFacebook} target="_blank">
                        <img
                          className="iconsConcert"
                          src="/images/FacebookConcert.png"
                          alt="facebookicon"
                        />
                      </a>
                    </span>
                    <span>
                      <a href={this.state.stockage.lienInstagram} target="_blank">
                        <img
                          className="iconsConcert"
                          src="/images/InstagramConcert.png"
                          alt="facebookicon"
                        />
                      </a>
                    </span>
                    <span>
                      <a href={this.state.stockage.lienTwitter} target="_blank">
                        <img
                          className="iconsConcert"
                          src="/images/TwitterConcert.png"
                          alt="facebookicon"
                        />
                      </a>
                    </span>
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PageConcert;
