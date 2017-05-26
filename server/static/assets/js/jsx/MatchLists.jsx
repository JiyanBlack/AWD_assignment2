import React from 'react';
import OneFriend from './OneFriend.jsx';

export default class MatchList extends React.Component {
    render() {
        return (
            <aside class="menu">
                <div class="menu-label" >
                    {this.props.people.map((obj) => { return (<OneFriend key={obj.userid} action={this.props.action} name={obj.name} userid={obj.userid} addFriend={this.props.addFriend} />) })}
                </div>
            </aside>
        );
    }
}