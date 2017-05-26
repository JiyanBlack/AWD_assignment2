import React from 'react';
import OneFriend from './OneFriend.jsx';

export default class LeftPanel extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div class="tile is-child is-3">
                <article class="notification is-primary">
                    <p class="title">Hi!</p>
                    <p class="subtitle" id="username">{this.props.name}</p>
                    <aside class="menu">
                        <div class="menu-label" style={{ height: '400px', 'overflowY': 'scroll' }}>
                            {this.props.friends.map((obj) => { return (<OneFriend key={obj.userid} action={this.props.action} name={obj.name} userid={obj.userid} />) })}
                        </div>
                    </aside>
                </article>
            </div>
        );
    }
}