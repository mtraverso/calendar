import React from 'react';
import axios from 'axios';
import moment from 'moment';


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';





export default class MyCalendar extends React.Component{
    constructor(props){
        super(props);
        this.state = {events : []};
        this.loadData = this.loadData.bind(this);

        this.calendarRef = React.createRef();
    }

    componentDidMount(){


        let ev = this.state.events;
        ev.push({date:"2019-06-20",title:"Hola"});
        this.setState({events:ev});

        this.loadData();

    }



    loadData(){
        let self = this;

        axios.get("/data").then(function(resp){

            resp.data.events.forEach(function(ev){

                let startDate = moment(ev.start,'DD/MM/YYYY');
                let endDate = moment(ev.end,'DD/MM/YYYY');


                let event = {title:ev.description};
                if(ev.repeat === 'yearly'){
                    event.rrule = {
                        dtstart:startDate.format("YYYY-MM-DD"),
                        freq:"yearly",
                        until: endDate.add('year',100).format("YYYY-MM-DD")
                    };

                    event.allDay = true;

                }

                let events = self.state.events;
                events.push(event);



                self.setState({events:events});

                self.setState({calendar:<FullCalendar ref={self.calendarRef} defaultView="dayGridMonth" plugins={[ dayGridPlugin,interactionPlugin,rrulePlugin ]} dateClick={self.handleDateClick} events={self.state.events}/>})
            });

        });
    }

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
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