import React from 'react';

export default class LeftPanel extends React.Component {
    render() {
        return (
            <div class="tile is-parent is-vertical is-3">
                <article class="tile is-child notification is-primary">
                    <p class="title">Hi!</p>
                    <p class="subtitle" id="username">username</p>
                    <p>friends list</p>
                </article>
            </div>
        );
    }
}