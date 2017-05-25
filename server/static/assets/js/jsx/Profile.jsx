import React from 'react';
import ReactDOM from 'react-dom';
import HeaderProfile from './HeaderProfile.jsx';
import LeftPanel from './LeftPanel.jsx';
import RightPanel from './RightPanel.jsx';
import MiddlePanel from './MiddlePanel.jsx';

class Layout extends React.Component {
    constructor() {
        super();
        var initialId = '233';
        this.state = {
            name: "",
            userid: initialId,
            displayid: initialId,
            chartName: null,
            friends: [],
            viewed: []
        }
    }

    componentDidMount() {
        var socket = io();
        console.log('getProfile for ' + this.state.userid);
        socket.emit('getProfile', this.state.userid);
        socket.on('receiveProfile', (userinfo) => {
            var userinfo = JSON.parse(userinfo);
            this.setState({
                name: userinfo.name,
                userid: userinfo.userid,
                friends: userinfo.friends,
                viewed: userinfo.viewed
            });
        });
    }

    resetMiddlePanel() {
        this.setState({
            displayid: this.state.userid,
            chartName: null
        })
    }

    changeMiddlePanel(name, userid) {
        this.setState({
            displayid: userid,
            chartName: name
        });
    }

    render() {
        // console.log(this.state);
        return (
            <div style={{ 'height': '100%' }}>
                <HeaderProfile resetMiddlePanel={this.resetMiddlePanel.bind(this)} />
                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-9">
                        <div class="tile">
                            <LeftPanel changeMiddlePanel={this.changeMiddlePanel.bind(this)} friends={this.state.friends} name={this.state.name} />
                            <MiddlePanel userid={this.state.displayid} name={this.state.chartName} />
                        </div>
                    </div>
                    <RightPanel />
                </div>
            </div>
        )
    }
}

const app = document.getElementById('app');
ReactDOM.render(< Layout />, app);