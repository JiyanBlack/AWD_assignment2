import React from 'react';

export default class LeftPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        var name = "Your";
        if (this.props.name) name = this.props.name;
        return (
            <div class="tile is-child">
                <article class="notification is-info">
                    <p class="title">{name} Hobbies</p>
                    <p class="subtitle">Built by Highcharts</p>
                    <div id="chart" style={{ maxHeight: '480px', margin: '0 auto' }}></div>
                </article>
            </div>
        );
    }

    componentDidMount() {
        this.updateGraph();
    }

    componentDidUpdate() {
        this.updateGraph();
    }


    updateGraph() {
        var cate = ["Football/Soccer", "Basketball", "Cricket", "Tennis", "Athletics", "Rugby", "Formula 1", "Boxing", "Ice Hockey", "Volleyball", "Golf", "Baseball", "American Football", "MMA", "MotoGP", "Field Hockey", "Cycling", "Badminton", "Swimming", "Snooker", "Table Tennis", "Gymnastics", "Handball", "Wrestling", "Skiing", "Horse", "Racing", "Bicycling", "Hiking", "Boating", "Running", "Dancing", "Party games", "Tabletop Games", "Arcade Games", "Computer Games", "Console Games", "Handheld games", "Mobile games", "Multiplayer games", "Singleplayer games", "Fiction", "Comedy", "Drama", "Horror", "Non-fiction", "Realistic fiction", "Romance novel", "Satire", "Tragedy", "Tragicomedy", "Fantasy", "Watching TV", "Fishing", "Computer Technology", "Music", "Hunting", "Shopping", "Traveling", "Socializing", "Church Activities", "Crafts", "Cooking", "Camping", "Cars", "Animal Care", "Bowling", "Painting", "Theater", "Billiards", "Beach"];
        var userid = this.props.userid;
        var socket = io();
        socket.emit('getInterests', userid);
        console.log('Emit ' + 'getInterests' + ' for user ' + userid);
        socket.on('receiveInterests', (res) => {
            var interests = JSON.parse(res);
            // console.log(interests);
            var colors = Highcharts.getOptions().colors,
                categories = ['Sports', 'Games', 'Reading/Writing', 'Others'],
                data = [{
                    y: 0,
                    color: colors[0],
                    drilldown: {
                        name: 'Sports Type',
                        categories: [],
                        data: [],
                        color: colors[0]
                    }
                }, {
                    y: 0,
                    color: colors[1],
                    drilldown: {
                        name: 'Games Type',
                        categories: [],
                        data: [],
                        color: colors[1]
                    }
                }, {
                    y: 0,
                    color: colors[2],
                    drilldown: {
                        name: 'Reading/Writing Genres',
                        categories: [],
                        data: [],
                        color: colors[2]
                    }
                }, {
                    y: 0,
                    color: colors[3],
                    drilldown: {
                        name: 'Others',
                        categories: [],
                        data: [],
                        color: colors[3]
                    }
                }],
                browserData = [],
                versionsData = [],
                i,
                j,
                dataLen = data.length,
                drillDataLen,
                brightness;

            for (let i = 0; i < 71; i++) {
                if (interests[i] == 1) {
                    if (i < 32) {
                        data[0].y += 1;
                        data[0].drilldown.categories.push(cate[i]);
                        data[0].drilldown.data.push(1);
                    } else if (i < 41) {
                        data[1].y += 1;
                        data[1].drilldown.categories.push(cate[i]);
                        data[1].drilldown.data.push(1);
                    } else if (i < 52) {
                        data[2].y += 1;
                        data[2].drilldown.categories.push(cate[i]);
                        data[2].drilldown.data.push(1);
                    } else {
                        data[3].y += 1;
                        data[3].drilldown.categories.push(cate[i]);
                        data[3].drilldown.data.push(1);
                    }
                }
            }
            // Build the data arrays
            for (i = 0; i < dataLen; i += 1) {

                // add browser data
                browserData.push({
                    name: categories[i],
                    y: data[i].y,
                    color: data[i].color
                });

                // add version data
                drillDataLen = data[i].drilldown.data.length;
                for (j = 0; j < drillDataLen; j += 1) {
                    brightness = 0.2 - (j / drillDataLen) / 5;
                    versionsData.push({
                        name: data[i].drilldown.categories[j],
                        y: data[i].drilldown.data[j],
                        color: Highcharts.Color(data[i].color).brighten(brightness).get()
                    });
                }
            }

            // Create the chart
            Highcharts.chart('chart', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Hobbies Piechart'
                },
                subtitle: {
                    text: 'Built by Highcharts'
                },
                yAxis: {
                    title: {
                        text: 'Total percent market share'
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        center: ['50%', '50%']
                    }
                },
                tooltip: {
                    valueSuffix: ''
                },
                series: [{
                    name: 'Hobbies in this category',
                    data: browserData,
                    size: '70%',
                    dataLabels: {
                        formatter: function () {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color: '#ffffff',
                        distance: -30
                    }
                }, {
                    name: 'boolean',
                    data: versionsData,
                    size: '100%',
                    innerSize: '80%',

                    id: 'versions'
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 400
                        },
                        chartOptions: {
                            series: [{
                                id: 'versions',
                                dataLabels: {
                                    enabled: false
                                }
                            }]
                        }
                    }]
                }
            });
        });
    }


}