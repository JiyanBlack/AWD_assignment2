import React from 'react';

export default class MatchQuality extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div class="tile is-child">
                <article class="notification is-info">
                    <p class="title">Your Match Quality</p>
                    <p class="subtitle">Built by Highcharts</p>
                    <div id="matchChart" style={{ maxHeight: '480px', margin: '0 auto' }}></div>
                </article>
            </div>
        );
    }

    updateGraph() {
        var userid = this.props.userid;
        var socket = io();
        socket.emit('getTopMatch', userid);
        socket.on('receiveTopMatch', (result) => {
            var result = JSON.parse(result);
            var chartData = result.map((obj) => { return [obj.name, obj.rankMark] });
            console.log(chartData);
            Highcharts.chart('matchChart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Your Top Match'
                },
                subtitle: {
                    text: 'The match points are based on your hobbies.'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: 0,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Match Points'
                    }
                },
                legend: {
                    enabled: true
                },
                tooltip: {
                    pointFormat: 'Match Points: <b>{point.y:.1f}</b>'
                },
                series: [{
                    name: 'Match Points',
                    data: chartData,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        });
    }

    componentDidMount() {
        this.updateGraph();
    }

    componentDidUpdate() {
        this.updateGraph();
    }
}