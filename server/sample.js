var registerDom = {
    "username": document.getElementById("username"),
    "password": document.getElementById("password")
};

function onlyNumberAndLetters(input) {
        return /^[a-z0-9]+$/i.test(input);
}

function onlyNumber(input) {
        return /^[0-9]+$/i.test(input);

}

function onlyLetters(input) {
        return /^[a-z]+$/i.test(input);
}

document.getElementById("button").onclick(function(){}
// validate function
);

var usernameTestResult = onlyNumberAndLetters(registerDom.username.value);
var passwordTestResult = onlyNumberAndLetters(registerDom.username.value);
if (usernameTestResult) {
    alert("True");
}
