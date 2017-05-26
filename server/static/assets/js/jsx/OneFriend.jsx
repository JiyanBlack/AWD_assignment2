import React from 'react';

export default class OneFriend extends React.Component {
    constructor() {
        super();
        this.state = {
            clicked: false
        }
    }

    performAction() {
        this.setState({
            clicked: true
        });
        if (this.props.action) this.props.action(this.props.name, this.props.userid);
        if (this.props.addFriend) this.props.addFriend(this.props.name, this.props.userid);
        setTimeout(() => {
            this.setState({
                clicked: false
            });
        }, 1000);
    }

    render() {
        var suffix = <span></span>;
        if (this.state.clicked) {
            suffix = (<span class="icon" >
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </span>)
        }
        return (
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <a onClick={() => this.performAction()}>
                                <p>
                                    <span class="icon">
                                        <i class="fa fa-address-card-o"></i>
                                    </span>
                                    {' ' + this.props.name + ' '}
                                    {suffix}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}