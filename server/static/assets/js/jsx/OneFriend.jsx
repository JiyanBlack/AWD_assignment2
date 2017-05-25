import React from 'react';

export default class OneFriend extends React.Component {

    render() {

        return (
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <a onClick={() => this.props.action(this.props.name, this.props.userid)}>
                                <span class="icon">
                                    <i class="fa fa-address-card-o"></i>
                                </span>
                                <p class="title is-6">{this.props.name}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}