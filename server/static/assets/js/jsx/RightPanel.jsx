import React from 'react';
import MatchLists from './MatchLists.jsx';
import io from 'socket.io-client';

export default class LeftPanel extends React.Component {

    personAction(username, userid) {
        var socket = io();
        socket.emit('addOneFriend', JSON.stringify({ from: this.props.userid, target: userid }));
    }

    render() {
        return (
            <div class="tile is-child  is-3">
                <article class="notification is-primary">
                    <div class="content">
                        <p class="title">Who viewed you</p>
                        <p class="subtitle">Click to add friends</p>
                        <div class="content" style={{ height: '400px', 'overflowY': 'scroll' }}>
                            <MatchLists people={this.props.people} action={this.personAction.bind(this)} addFriend={this.props.addFriend} />
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}