import React from "react";
import classes from './Dashboard.module.css';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale,registerables } from 'chart.js';

Chart.register(...registerables);

function Dashboard({dataReport}){

    const {
        weeklyNetSales,
        weeklyTransactions,
        weeklyDates
    } = dataReport;

    const chartData = {
        labels: weeklyDates,
        datasets: [
            {
                label: 'Net Sales',
                data: weeklyNetSales,
                backgroundColor: 'rgba(200,152,15, 0.6)',
                yAxisID: 'y1',
            },
            {
                label: 'Transaction Count',
                //get data
                data: weeklyTransactions,
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
        height: 100,
        plugins: {
            title: {
                display: true,
                text: 'Title Sales By Period'
            }
        }
    };
    return(
        <div className={classes.dashboard}>
            <div className={classes.chart}>
                <Bar data={chartData} width={13} height={4} options={chartOptions} />
            </div>
        </div>
    )
}export default Dashboard;
