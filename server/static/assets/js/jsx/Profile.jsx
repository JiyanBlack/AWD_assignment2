import React from 'react';
import ReactDOM from 'react-dom';
import HeaderProfile from './HeaderProfile.jsx';
import LeftPanel from './LeftPanel.jsx';
import RightPanel from './RightPanel.jsx';
import MiddlePanel from './MiddlePanel.jsx';

class Layout extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <HeaderProfile />

                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-9">
                        <div class="tile">
                            <LeftPanel />
                            <MiddlePanel userid={100} />
                        </div>
                    </div>
                    <RightPanel />
                </div>
            </div>
        )
    }
}

const app = document.getElementById('app');
ReactDOM.render(< Layout />, app);