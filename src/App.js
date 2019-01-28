import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import AdminArtiste from './Admin/AdminArtiste.jsx';
import AdminHome from './Admin/AdminHome.jsx';
import PageAccueil from './Page/PageAccueil';
import UserFormulaire from './Artiste/UserFormulaire';
import Calendrier from './Calendrier/Calendrier';
import PageConcert from './Artiste/PageConcert';
import PageArtistes from './Artiste/PageArtistes';
import Footer from './Page/Footer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
            <Route exact path="/" component={PageAccueil}></Route>
            <Route path="/adminHome" component={AdminHome}></Route>
            <Route path="/adminArtiste" component={AdminArtiste}></Route>
            <Route path="/userformulaire/:id" component={UserFormulaire}></Route>
            <Route path="/calendrier" component={Calendrier}></Route>
            <Route path="/concert/:id" component={PageConcert}></Route>
            <Route path="/pageartistes" component={PageArtistes}></Route>          
        </Switch>
        <Footer /> 
      </div>
    );
  }
}

export default App;
