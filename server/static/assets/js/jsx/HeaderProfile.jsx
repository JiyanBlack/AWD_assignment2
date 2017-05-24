import React from 'react';

export default class HeaderProfile extends React.Component {
    render() {
        var activeArray = [" is-active", ""];
        if (this.props.active && this.props.active == "match") {
            activeArray = ["", " is-active"];
        }
        return (
            <nav class="nav has-shadow">
                <div class="container">
                    <div class="nav-left">
                        <a class="nav-item" href="userprofile.html">User Center</a>
                        <a class={"nav-item is-tab" + activeArray[0]} href="userprofile.html">Profile</a>
                        <a class={"nav-item is-tab" + activeArray[1]} href="userprofileMatch.html">Start Matching</a>
                        <a class="nav-item is-tab">Log out</a>
                    </div>
                </div>
            </nav>
        )
    }
}