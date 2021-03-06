import React from 'react';
import ReactDOM from 'react-dom';
import HeaderProfile from './HeaderProfile.jsx';
import MiddlePanel from './MiddlePanel.jsx';
import MatchQuality from './MatchQuality.jsx';
import MatchLists from './MatchLists.jsx';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
class Layout extends React.Component {
    constructor() {
        super();
        var initialId = Cookies.get('userid').toString();
        this.state = {
            'isForm': true,
            'userid': initialId,
            'topMatch': [],
        }
    }

    personAction(username, userid) {
        var socket = io();
        socket.emit('addOneFriend', JSON.stringify({ from: this.state.userid, target: userid }));
    }

    generateFormOrState() {
        console.log(this.state);
        if (this.state.isForm)
            return (
                <div>
                    <form class="match-form" id="matching-form"></form>
                </div>
            )
        else return (
            <div class="tile is-ancestor">
                <div class="tile is-parent is-vertical is-9">
                    <MatchQuality userid={this.state.userid} />
                    <MiddlePanel userid={this.state.userid} />
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification is-primary">
                        <p class="title">Your Top 10 Match</p>
                        <p class="subtitle">Click to add friends</p>
                        <MatchLists people={this.state.topMatch} action={this.personAction.bind(this)} />
                    </article>
                </div>
            </div>
        )
    }



    render() {
        return (
            <div>
                <HeaderProfile active={'match'} />
                <div class="row">
                    <div class="container">
                        {this.generateFormOrState()}
                    </div>
                    <div class="btn-container">
                        <a class="button is-large is-primary" id="match" type="submit" name="submit" value="Match">Submit</a>
                        <span> </span><span> </span>
                        <a class="button is-warning is-large" id="reset" type="reset" name="reset" value="Reset" >Reset</a>

                    </div>
                </div>

            </div >
        )
    }

    componentDidMount() {
        const that = this;
        const socket = io();

        socket.on('updateMatchSuccess', (topMatch) => {
            topMatch = JSON.parse(topMatch);
            this.setState({
                'isForm': false,
                'topMatch': topMatch
            });
        });

        var matchingDom = {
            "matchingForm": document.getElementById("matching-form"),
            "match": document.getElementById("match"),
            "reset": document.getElementById("reset")
        };

        var hobbies = {
            "Sports": [
                "Football/Soccer",
                "Basketball",
                "Cricket",
                "Tennis",
                "Athletics",
                "Rugby",
                "Formula 1",
                "Boxing",
                "Ice Hockey",
                "Volleyball",
                "Golf",
                "Baseball",
                "American Football",
                "MMA",
                "MotoGP",
                "Field Hockey",
                "Cycling",
                "Badminton",
                "Swimming",
                "Snooker",
                "Table Tennis",
                "Gymnastics",
                "Handball",
                "Wrestling",
                "Skiing",
                "Horse",
                "Racing",
                "Bicycling",
                "Hiking",
                "Boating",
                "Running",
                "Dancing"
            ],
            "Games": [
                "Party games",
                "Tabletop Games",
                "Arcade Games",
                "Computer Games",
                "Console Games",
                "Handheld games",
                "Mobile games",
                "Multiplayer games",
                "Singleplayer games"
            ],
            "Reading/Writing": [
                "Fiction",
                "Comedy",
                "Drama",
                "Horror",
                "Non-fiction",
                "Realistic fiction",
                "Romance novel",
                "Satire",
                "Tragedy",
                "Tragicomedy",
                "Fantasy"
            ],
            "Others": [
                "Watching TV",
                "Fishing",
                "Computer Technology",
                "Music",
                "Hunting",
                "Shopping",
                "Traveling",
                "Socializing",
                "Church Activities",
                "Crafts",
                "Cooking",
                "Camping",
                "Cars",
                "Animal Care",
                "Bowling",
                "Painting",
                "Theater",
                "Billiards",
                "Beach"
            ]
        }

        var hobbyCheckboxes = {};

        function matchingRun() {
            // create checkboxes from hobbies object
            Object.keys(hobbies).forEach(function (hobby) {
                var fieldset = createFieldSet(hobby);
                addCheckbox(fieldset, hobbies[hobby]);
                matchingDom.matchingForm.appendChild(fieldset);
            });

            // submit result
            matchingDom.match.addEventListener("click", function (event) {
                event.preventDefault();
                var result = {};
                var resultArray = [];
                var keys = [];
                var hobbyNum = 0;
                // generate result
                Object.keys(hobbyCheckboxes).forEach(function (key) {
                    if (hobbyCheckboxes[key].checked) {
                        result[key] = 1;
                        resultArray.push(1);
                        hobbyNum += 1;
                    } else {
                        result[key] = 0;
                        resultArray.push(0);
                    }
                    keys.push(key);
                });
                // generate alert string
                var resultString = "See the dev console for more details.\n";
                Object.keys(result).forEach(function (onehobby) {
                    resultString = resultString + onehobby + " : " + result[onehobby] + "\n";
                });
                console.log(resultString, hobbyNum);
                // emit event to server

                socket.emit('updateMatch', JSON.stringify({ userid: that.state.userid, interests: resultArray }));
            });
        }

        function addCheckbox(fieldset, hobbylist) {
            hobbylist.forEach(function (onehobby) {
                var checkboxSpan = createCheckbox(onehobby);
                fieldset.appendChild(checkboxSpan);
            });

            function createCheckbox(content) {
                var span = document.createElement("span");
                var checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.setAttribute("value", content);
                hobbyCheckboxes[content] = checkbox;
                checkbox.addEventListener("change", function (event) {
                    var isChecked = event.target.checked;
                    if (isChecked) {
                        event.target.parentNode.style["font-weight"] = "bold";
                    } else {
                        event.target.parentNode.style["font-weight"] = "normal";
                    }
                });
                matchingDom.reset.addEventListener("click", function (event) {
                    event.preventDefault();
                    checkbox.checked = false;
                    checkbox.parentNode.style["font-weight"] = "normal";
                });
                span.appendChild(checkbox);
                span.appendChild(document.createTextNode(content));
                return span;
            }
        }

        function createFieldSet(legend) {
            var fieldset = document.createElement("fieldset");
            var legendNode = document.createElement("legend");
            legendNode.innerText = legend;
            fieldset.appendChild(legendNode);
            return fieldset;
        }

        matchingRun();
    }

}


const app = document.getElementById('app');
ReactDOM.render(< Layout />, app);