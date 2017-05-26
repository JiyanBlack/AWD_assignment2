import React from 'react';
import ReactDOM from 'react-dom';
import HeaderProfile from './HeaderProfile.jsx';
import LeftPanel from './LeftPanel.jsx';
import RightPanel from './RightPanel.jsx';
import MiddlePanel from './MiddlePanel.jsx';
import MatchQuality from './MatchQuality.jsx';
import Cookies from 'js-cookie';

class Layout extends React.Component {
    constructor() {
        super();
        var initialId = Cookies.get('userid');
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
                viewed: userinfo.viewed,
            });
            console.log(userinfo);
        });
    }

    resetMiddlePanel() {
        this.setState({
            displayid: this.state.userid,
            chartName: null
        })
    }

    viewFriend(name, userid) {
        this.setState({
            displayid: userid,
            chartName: name
        });
        var socket = io();
        socket.emit('addOneView', JSON.stringify({ userid: this.state.userid, target: userid }));

    }

    render() {
        // console.log(this.state);
        return (
            <div style={{ 'height': '100%' }}>
                <HeaderProfile resetMiddlePanel={this.resetMiddlePanel.bind(this)} />
                <div class="tile is-ancestor">
                    <div class="tile is-vertical">
                        <div class="tile">
                            <LeftPanel action={this.viewFriend.bind(this)} friends={this.state.friends} name={this.state.name} />
                            <MiddlePanel userid={this.state.displayid} name={this.state.chartName} />
                        </div>
                    </div>
                    <RightPanel people={this.state.viewed} userid={this.state.userid} />
                </div>
            </div>
        )
    }
}

const app = document.getElementById('app');
ReactDOM.render(< Layout />, app);