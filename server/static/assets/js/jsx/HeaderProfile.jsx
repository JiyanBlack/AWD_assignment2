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
                        <a class="nav-item" onClick={() => { this.props.resetMiddlePanel() }} href="userprofile.html">User Center</a>
                        <a class={"nav-item is-tab" + activeArray[0]} href="userprofile.html">Profile</a>
                        <a class={"nav-item is-tab" + activeArray[1]} href="userprofileMatch.html">Start Matching</a>

                    </div>
                    <div class="nav-right nav-menu">
                        <a class="nav-item is-tab" href="login.html">Log out</a>
                        <a class="nav-item is-tab" href="about.html">About</a>
                    </div>
                </div>
            </nav >
        )
    }
}