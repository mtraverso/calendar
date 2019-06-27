import React from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default class Calendar extends React.Component{
    constructor(props){
        super(props);
        let events = [];
        this.loadData();
    }

    loadData(){
        axios.get("/data").then(function(resp){
            console.log(resp.data);

        });
    }

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    };

    render(){
        return(

            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} dateClick={this.handleDateClick} editable= {true}/>
        )
    }

}