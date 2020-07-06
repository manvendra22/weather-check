import React from 'react';
import moment from 'moment';

import { getWeather } from '../../utility/utility'

function DayCard(props) {
    const { data } = props
    const { dt, temp, weather } = data

    const weatherDetails = getWeather(weather?.[0].id)
    const day = moment.unix(dt).format('ddd');

    return (
        <div className="dayCard">
            <div className="mb-3">{day}</div>
            <div className="mb-5"><span>{Math.round(temp?.max)}&deg;</span> <span className="secondaryTextColor">{Math.round(temp?.min)}&deg;</span></div>
            <div className="mb-5">
                <img src={weatherDetails.icon} alt="dayIcon" className="smallIcon" />
            </div>
            <div className="smallText secondaryTextColor">{weatherDetails.label}</div>
        </div>
    );
}

export default DayCard;