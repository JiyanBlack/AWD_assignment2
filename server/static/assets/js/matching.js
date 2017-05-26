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
        // generate result
        Object.keys(hobbyCheckboxes).forEach(function (key) {
            if (hobbyCheckboxes[key].checked)
                result[key] = 1;
            else
                result[key] = 0;
        });
        // generate alert string
        var resultString = "See the dev console for more details.\n";
        Object.keys(result).forEach(function (onehobby) {
            resultString = resultString + onehobby + " : " + result[onehobby] + "\n";
        });
        console.log(resultString);
        alert(resultString);
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
                event.target.parentNode.style["font-weight"] = "300";
            }
        });
        matchingDom.reset.addEventListener("click", function (event) {
            event.preventDefault();
            checkbox.checked = false;
            checkbox.parentNode.style["font-weight"] = "300";
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
