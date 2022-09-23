import React from 'react';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart() {
    const nameMonth = useSelector(state => state.calendar.nameMonth)
    const counts = useSelector(state => state.tasks.tasksCounts)
    const textColor = useSelector(state => state.theme.theme) === 'dark' ? '#f5f6f7' : '#1C1E21'
    const gridColor = useSelector(state => state.theme.theme) === 'dark' ? 'rgba(245, 246, 247, .2)' : 'rgba(28, 30, 33, .2)'

    const monthNum = counts.map(item => item.month)
    const labels = nameMonth.filter((elem, index) => {
        if (monthNum.includes(index + 1)) {
            return nameMonth[index]
        }
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: textColor }
            },
            title: {
                display: true,
                text: 'Число задач по месяцам',
                color: textColor,
            },
        },
        scales: {
            yAxes: {
                ticks: { color: textColor },
                grid: { color: gridColor }
            },
            xAxes: {
                ticks: { color: textColor },
                grid: {
                    color: gridColor
                }
            }
        }
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'В процессе',
                data: counts.map(item => item.inProgressCounts),
                backgroundColor: 'rgba(253, 99, 61, .75)',
            },
            {
                label: 'Завершен',
                data: counts.map(item => item.closedCounts),
                backgroundColor: 'rgba(103, 203, 101, .75)',
            },
            {
                label: 'Заморожен',
                data: counts.map(item => item.frozenCounts),
                backgroundColor: 'rgba(39, 161, 255, .75)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}