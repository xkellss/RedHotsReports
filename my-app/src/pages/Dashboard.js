import React from "react";
import classes from './Dashboard.module.css';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale,registerables } from 'chart.js';

Chart.register(...registerables);

function Dashboard({dataReport}){

    const {
        grossSales,
        netSales,
        salesTax,
        weeklyNetSales,
    } = dataReport;

    const chartData = {
        labels: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        datasets: [
            {
                label: 'Net Sales',
                data: weeklyNetSales,
                backgroundColor: 'rgba(200,152,15, 0.6)',
                yAxisID: 'y1',
            },
            {
                label: 'Transaction Count',
                //replace w data
                data: [30,40,25,28,13,19,10],
                type: 'line',
                borderColor: 'rgba(152,16,17, 1)',
                borderWidth: 2,
                yAxisID: 'y2',
            },
        ],
    };
    const chartOptions = {
        scales: {
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y2',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    return(
        <div className={classes.dashboard}>
            <h1>Report Dashboard</h1>
            <div className={classes.sales}>
                <div>Gross Sales: ${grossSales}</div>
                <div>Net Sales: ${netSales}</div>
            </div>
            <div className={classes.chart}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}export default Dashboard;
