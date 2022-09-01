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
    const counts = useSelector(state => state.tasks.tasksStatusCounts)

    const monthNum = counts.map(item => item.month)
    const labels = nameMonth.map((elem, index) => {
        if (monthNum.includes(index + 1)) {
            return nameMonth[index]
        }
    }).filter(item => item)
    console.log(labels, monthNum)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Число задач по месяцам',
            },
        },
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