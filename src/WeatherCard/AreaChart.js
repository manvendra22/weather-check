import React from 'react';
import moment from 'moment';
import suncalc from 'suncalc'
import {
    AreaChart, Area, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

import sun from '../icons/sun_dot.svg'

function CustomizedAxisTick(props) {
    const {
        x, y, index, payload
    } = props;

    let anchor = ['start', 'middle', 'end']

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={10} textAnchor={anchor[index]} fill="#666667" fontSize={12} fontWeight={500} >{payload.value}</text>
        </g>
    );
}

function CustomizedDot(props) {
    const {
        cx, cy, payload
    } = props;

    const currentTime = moment().format('ha')

    return (
        payload.time === currentTime && <image x={cx} y={cy-20} width={30} height={30} xlinkHref={sun} alt="dotIcon" />
    );
}

export default function MainChart(props) {
    const { data = [], lat, lon, sunrise, sunset} = props

    const chartData = data.slice(0, 24).map(element => {
        let time = moment.unix(element.dt)
        let position = suncalc.getPosition(time, lat, lon)

        return {
            time: time.format('ha'),
            altitude: position.altitude,
            actualTime: time.format('HH')
        }
    });

    const sunriseTime = moment.unix(sunrise).format('HH')
    const sunsetTime = moment.unix(sunset).format('HH')

    const filteredData = chartData.filter(element => element.actualTime >= (Number(sunriseTime)-2) && element.actualTime <= (Number(sunsetTime)+2))
    let length = filteredData.length
    let mid = Math.round(length/2)

    const ticksData = [filteredData[0].time, filteredData[mid].time, filteredData[length - 1].time]

    return (
        <ResponsiveContainer width='100%' height={150}>
            <AreaChart
                data = {
                    filteredData
                }
                margin={{ top: 10, left: 20, right: 20, bottom: 20 }}
            >
                <XAxis dataKey="time" height={50} ticks={ticksData} tick={<CustomizedAxisTick />} tickSize={15} axisLine={false} />
                <YAxis hide={true} />
                <Area type="basis" dataKey="altitude" stroke="#FBE2AC" fill="#FBE2AC" fillOpacity={0.8} dot={<CustomizedDot />} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
