import React from 'react';
import axios from 'axios';
import moment from 'moment';


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import {toDuration} from "@fullcalendar/moment";

export default class MyCalendar extends React.Component{
    constructor(props){
        super(props);
        this.state = {events : []};
        this.loadData = this.loadData.bind(this);

        this.calendarRef = React.createRef();
    }

    componentDidMount(){


        let ev = this.state.events;
        ev.push({date:"2019-06-20 13:00",title:"Hola",allDay:"false",duration:'00:30'});
        this.setState({events:ev});

        this.loadData();

    }



    loadData(){
        let self = this;

        axios.get("/data").then(function(resp){

            resp.data.events.forEach(function(ev){

                let startDate = moment(ev.start,'DD/MM/YYYY');
                let endDate = moment(ev.end,'DD/MM/YYYY');
                let allDay = ev.allDay;
                let duration = ev.duration;
                debugger;

                let event = {title:ev.description};
                if(ev.repeat){
                    event.rrule = {
                        dtstart:startDate.format("YYYY-MM-DD hh:mm"),
                        freq:ev.repeat,
                        until: endDate.format("YYYY-MM-DD hh:mm"),

                    };

                    event.allDay = allDay;
                    if(!allDay){
                        if(duration) {
                            event.duration = duration;
                        }else{
                            event.duration = '00:30';
                        }
                    }

                }

                let events = self.state.events;
                events.push(event);



                self.setState({events:events});

                self.setState({calendar:<FullCalendar ref={self.calendarRef} defaultView="dayGridMonth" plugins={[ dayGridPlugin,interactionPlugin,rrulePlugin ]} dateClick={self.handleDateClick} eventClick={self.handleEventClick} events={self.state.events}/>})
            });

        });
    }

    handleDateClick = (arg) => { // bind with an arrow function
        console.log(arg)
    };

    handleEventClick = (arg) => { // bind with an arrow function
        console.log(arg)
    };

    render(){
        console.log(this.state.events);
        let self = this;
        return(
            <div>
            {self.state.calendar}
            </div>
        )
    }

}