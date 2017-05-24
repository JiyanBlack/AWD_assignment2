import React from 'react';

export default class LeftPanel extends React.Component {
    render() {
        return (
            <div class="tile is-parent">
                <article class="tile is-child notification is-success">
                    <div class="content">
                        <p class="title">Who viewed you:</p>
                        <div class="content">
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}