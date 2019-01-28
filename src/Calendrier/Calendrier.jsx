import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import dates from 'react-big-calendar/lib/utils/dates';
import './react-big-calendar-bis.css';
import './Calendrier.css';
import {Container, Row, Col} from 'reactstrap';
import Menu from '../Page/Menu';



const messages = {
    allDay: 'Journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: 'Aujourd\'hui',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Evénement', // Or anything you want
    showMore: total => `+ ${total} événement(s) supplémentaire(s)`
}


moment.locale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
const localizer = BigCalendar.momentLocalizer(moment);

class Calendrier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liste: [],
            evts: [],
        };
        this.eventPropGetter = this.eventPropGetter.bind(this);
        this.onClickEvent = this.onClickEvent.bind(this);
    }

    componentDidMount() {

        fetch("http://92.175.11.66:3000/squareunix/api/artistes")
            .then(response => response.json())
            .then((datas) => {
                let myEventsList = datas.map(artiste => {
                    let toto = {};
                    toto.title = artiste.nom;
                    toto.allDay = true;
                    let dayDebut = moment(artiste.dateDebut).utc().add(1, "day").format("YYYY, MM, DD");
                    toto.start = new Date (dayDebut);
                    let dayFin = moment(artiste.dateFin).utc().add(2, "day").format("YYYY, MM, DD");
                    toto.end = new Date (dayFin);
                    toto.nombrePlaces = artiste.nombrePlaces;
                    toto.src = artiste.src;
                    toto.id = artiste.id;
                    return toto;
                });
                
                this.setState({liste: datas, evts: myEventsList});
            });
            

        }

    eventPropGetter (event) {
        
        let borderColor = (event.nombrePlaces === 0) ? 'red' : (event.nombrePlaces < 2000) ? 'orange' : 'green';
        let style = {
            borderRadius: '5px',
            opacity: 0.8,
            color: 'black',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: borderColor,
            display: 'block',
            height: '50px',
        };
        return {
            style: style
        };
    
    }

    onClickEvent() {
       
       const id = arguments[0].id;
       this.props.history.push(`/concert/${id}`);
      
    }

    render() {

        return (
            <div className="cal">
               <Menu /> 
                <BigCalendar
                    localizer={localizer}
                    onSelectEvent={this.onClickEvent}
                    events={this.state.evts}
                    startAccessor="start"
                    endAccessor="end"
                    max={dates.add(dates.endOf(new Date(2030, 31, 12), 'day'), -1, 'hours')}
                    step={60}
                    showMultiDayTimes={true}
                    eventPropGetter={(this.eventPropGetter)}
                    messages={messages}
                    
                />
                <Container className="encadre">
                    <h5>Légende</h5>
                    <Row className="ligney">
                        <Col xs="12" lg="6">
                            <Row>
                                <Col xs="4" className="rougeEncadre">Complet</Col>
                                <Col xs="4" className="orangeEncadre">- de 2000 places restantes</Col>
                                <Col xs="4" className="vertEncadre">+ de 2000 places restantes</Col>
                            </Row>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }    
}

export default Calendrier;