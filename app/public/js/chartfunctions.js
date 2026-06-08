function generateCounts(data, serviceNames) {
    const counts = []

    for (let i = 0; i < serviceNames.length; i++) {
        let num = 0
        data.forEach((row) => {
            if (row.title === serviceNames[i]) {
                num++
            }
        });
        counts.push(num);
    }
    return counts;
}

function createChart(counts, serviceNames) {

    const xlabels = serviceNames;

    const chartdata = {
        responsive: true,
        labels: xlabels,
        datasets: [{
            data: counts,
            hoverOffset: 10,
            spacing: 2
        }]
    };

    const chartconfig = {
        type: "pie",
        data: chartdata,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            rotation: 0,
            animation: { animateRotate: true },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            return context.label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Most Booked Services',
                    font: { size: 20 }
                }
            }
        }
    };

    return chartconfig;
}