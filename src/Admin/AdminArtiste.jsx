

import React from 'react';
import { Form, FormGroup, Input, Row, Col, InputGroupAddon, InputGroup, Container, Label } from 'reactstrap';
import moment from 'moment';
import Bouton from '../Component/Bouton';
import { Link } from 'react-router-dom';
import './AdminArtiste.css';


class AdminArtiste extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formulaire: {
                nom: "",
                lienTeaser: "",
                dateDebut: "",
                dateFin: "",
                lienSite: "",
                lienFacebook: "",
                lienInstagram: "",
                lienTwitter: "",
                prixPlace: 0,
                styleMusical: "",
                nombrePlaces: 0,
                src: ""
            },
            modif: false,
            titre: "",
            hide: "non",
            show: "oui",


        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.updateData = this.updateData.bind(this);

    }
    componentDidMount() {
        const datas = this.props.location.state.datas;
        const typeAction = this.props.location.state.typeAction;
       
        let messTitre = "";
        if (typeAction === "M") {
            const result = datas;

            messTitre = "Modification Artiste";
            let dateDebutLong = result.dateDebut;
            result.dateDebut = moment(dateDebutLong).format("YYYY-MM-DD");
            let dateFinLong = result.dateFin;
            result.dateFin = moment(dateFinLong).format("YYYY-MM-DD");
            this.setState({ formulaire: result, titre: messTitre });

        } else {
            messTitre = "Création Artiste";
            this.setState({ titre: messTitre });
        }
    }

    sendData(data, form) {
        fetch("http://92.175.11.66:3000/squareunix/api/artistes", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {

                    return response.json();
                } else {
                    console.log('Something happened wrong');
                }
            }).then(() => {
                alert('Votre création a bien été effectuée !');
                form.reset();
                let toto = {
                    nom: "",
                    lienTeaser: "",
                    dateDebut: "",
                    dateFin: "",
                    lienSite: "",
                    lienFacebook: "",
                    lienInstagram: "",
                    lienTwitter: "",
                    prixPlace: 0,
                    styleMusical: "",
                    nombrePlaces: 0,
                    src: ""
                }
                this.setState({ formulaire: toto, modif: false });
            });
    }

    updateData(data) {
        const url = "http://92.175.11.66:3000/squareunix/api/artistes";

        fetch(url + "/" + data.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Votre modification a bien été effectuée !');
                this.setState({ modif: false, hide: "oui", show: "non" });
            }
        });
    }

    handleChange(e) {
        let toto = this.state.formulaire;
        toto[e.target.name] = e.target.value;
        this.setState({ formulaire: toto, modif: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        const typeAction = this.props.location.state.typeAction;
        if (this.state.modif) {
            const data = {
                ...this.state.formulaire,
                dateDebut: moment(this.state.formulaire.dateDebut).valueOf(),
                dateFin: moment(this.state.formulaire.dateFin).valueOf(),
            }
            if (typeAction === "M") {
                this.updateData(data);
            } else {
                this.sendData(data, e.target);
            }
        } else {
            alert('Aucune modification effectuée !');
        }
    }
    render() {
        return (
            <Container fluid={true} className="adminArtiste">
                <h1>{this.state.titre}</h1>
                <hr className="hr" />
                <Form onSubmit={this.handleSubmit} className="mt-5">
                    <Row form>
                        <Col md={6}>
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label className="mb-0" for="nom" md={4}>Nom Artiste <span className="rouge">*</span> : </Label>
                                <Col md={8}>
                                    <Input required placeholder="Nom" id="name" type="text" name="nom" value={this.state.formulaire.nom} onChange={this.handleChange} />
                                </Col>

                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label className="mb-0" for="styleMusical" md={4}>Style Musical : </Label>
                                <Col md={8}>
                                    <Input id="select" type="select" name="styleMusical" value={this.state.formulaire.styleMusical} onChange={this.handleChange}>
                                        <option>Rock</option>
                                        <option>Metal</option>
                                        <option>Pop</option>
                                        <option>Jazz</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row form>
                        <Col md={6}>
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label className="mb-0" for="dateDebut" md={4}>Date Début Concert <span className="rouge">*</span> : </Label>
                                <Col md={8}>
                                    <Input required id="dateDebut" type="date" name="dateDebut" value={this.state.formulaire.dateDebut} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="dateFin" md={4}>Date Fin Concert <span className="rouge">*</span> : </Label>
                                <Col md={8}>
                                    <Input required id="dateFin" type="date" name="dateFin" value={this.state.formulaire.dateFin} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row form>
                        <Col md="6">
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="lienTeaser" md={4}>Lien Teaser : </Label>
                                <Col md={8}>
                                    <Input id="lienTeaser" type="url" name="lienTeaser" placeholder="URL lien teaser" value={this.state.formulaire.lienTeaser} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="lienImage" md={4}>Lien Image : </Label>
                                <Col md={8}>
                                    <Input id="lienImage" type="url" name="src" placeholder="URL lien image" value={this.state.formulaire.src} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row form>
                        <Col md="6">
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="lienSite" md={4}>Lien Site : </Label>
                                <Col md={8}>
                                    <Input id="lienSite" type="url" name="lienSite" placeholder="URL lien site artiste" value={this.state.formulaire.lienSite} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="facebook" md={4}>Lien Facebook : </Label>
                                <Col md={8}>
                                    <Input id="facebook" type="url" name="lienFacebook" placeholder="URL lien Facebook" value={this.state.formulaire.lienFacebook} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row form>
                        <Col md="6">
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="lienInsta" md={4}>Lien Instagram : </Label>
                                <Col md={8}>
                                    <Input id="lienInsta" type="url" name="lienInstagram" placeholder="URL lien Instagram" value={this.state.formulaire.lienInstagram} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="lienTwit" md={4}>Lien Twitter : </Label>
                                <Col md={8}>
                                    <Input id="lienTwit" type="url" name="lienTwitter" placeholder="URL lien Twitter" value={this.state.formulaire.lienTwitter} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row form>
                        <Col md="6">
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="prix" md={4}>Prix Place : </Label>

                                <Col md={8}>
                                    <InputGroup>
                                        <Input id="prix" placeholder="0" type="number" name="prixPlace" step="1" value={this.state.formulaire.prixPlace} onChange={this.handleChange} />
                                        <InputGroupAddon addonType="append">€</InputGroupAddon>
                                    </InputGroup>
                                </Col>

                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup row className="mr-0 ml-0 formu">
                                <Label for="nbPlaces" md={4}>Nombre Places : </Label>
                                <Col md={8}>
                                    <Input id="nbPlaces" placeholder="0" type="number" name="nombrePlaces" step="500" value={this.state.formulaire.nombrePlaces} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <p className="obli rouge">* Champs obligatoires</p>
                    <br />
                    <Row className="ligneBoutons">
                        <Bouton hide={this.state.hide} name="Valider" />
                        <Link to={{ pathname: '/adminHome' }}><Bouton hide={this.state.hide} name="Annuler" /></Link>
                        <Link to={{ pathname: '/adminHome' }}><Bouton hide={this.state.show} name="Retour" /></Link>
                    </Row>
                </Form>


            </Container>
        );
    }
}
export default AdminArtiste;