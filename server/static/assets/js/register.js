var Hashes = require('jshashes');
var Cookies = require('js-cookie');
var registerDom = {
    "submit": document.getElementById("btn_submit"),
    "usernameHint": document.getElementById("username-hint"),
    "passwordHint": document.getElementById("password-hint"),
    "username": document.getElementById("username"),
    "password": document.getElementById("password"),
    "description": document.getElementById("description"),
    "errorDiv": document.getElementById("errorDiv")
};
var registerForm = document.getElementById("registerForm");
var validateFuncs = {
    "onlyNumberAndLetters": function onlyNumberAndLetters(input) {
        return /^[a-z0-9]+$/i.test(input);
    },
    "onlyNumber": function onlyNumber(input) {
        return /^[0-9]+$/i.test(input);
    },
    "onlyLetters": function onlyLetters(input) {
        return /^[a-z]+$/i.test(input);
    }
};

function registerRun() {
    var MD5 = new Hashes.MD5;
    registerDom.submit.addEventListener('click', function (event) {
        //event.preventDefault();
        clearError();
        var isValidUsername = validateUsername();
        var isValidPassword = validatePassword();
        if (isValidUsername && isValidPassword) {
            //var successMsg = ["Register successfully! " + "username: " + registerDom.username.value + ", password: " + registerDom.password.value];
            //dispMsg(successMsg, registerDom.errorDiv);
            var hash = MD5.hex(registerDom.username.value + registerDom.password.value);

            registerDom.password.value = hash;
            // console.log(hash);
            // registerForm.submit();

            var data = { name: registerDom.username.value, password: hash, description: registerDom.description.value };
            var sendData = JSON.stringify(data);
            fetch("/register_newUser",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    method: "POST",
                    body: sendData,
                }).then((res) => {
                    return res.json().then((response) => {
                        if (response.error) {
                            var msgs = [];
                            msgs.push(response.error);
                            dispMsg(msgs, registerDom.usernameHint);
                            // registerDom.usernameHint.value=;
                        }
                        else {
                            Cookies.set('userid', response.userid);
                            setTimeout(() => window.location.href = "userprofile.html", 2000);
                        }
                    })
                });
        }
        else
            console.log("don't submit");
    });
}

function validateUsername() {
    var username = registerDom.username.value;
    var msgs = [];
    if (username.length <= 4 || username.length >= 20) {
        msgs.push("Username length should be between 5 and 20.");
    }

    if (!validateFuncs.onlyNumberAndLetters(username)) {
        msgs.push("Username can only be numbers and letters.");
    }
    if (msgs.length > 0) {
        dispMsg(msgs, registerDom.usernameHint);
        return false;
    } else {
        return true;
    }
}

function validatePassword() {
    var msgs = [];
    var password = registerDom.password.value;
    if (password.length <= 7 || password.length >= 20) {
        msgs.push("Password length should be between 8 and 20.");
    }
    if (!validateFuncs.onlyNumberAndLetters(password)) {
        msgs.push("Password can only be numbers and letters.");
    }
    if (validateFuncs.onlyLetters(password)) {
        msgs.push("Password need contain numbers.");
    }
    if (validateFuncs.onlyNumber(password)) {
        msgs.push("Password need contain letters.");
    }
    if (msgs.length > 0) {
        dispMsg(msgs, registerDom.passwordHint);
        return false;
    } else {
        return true;
    }
}

function dispMsg(msgs, errorDiv) {
    var innerhtml = "";
    for (var i = 0; i < msgs.length; i++) {
        innerhtml = innerhtml + "<div>" + msgs[i] + "</div>"
    }
    errorDiv.innerHTML = innerhtml;
}

function clearError() {
    registerDom.errorDiv.innerHTML = "";
    registerDom.usernameHint.innerHTML = "";
    registerDom.passwordHint.innerHTML = "";
}

registerRun();