
function checkValid() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    console.log(email);
    console.log(password);

    var checkus = /^(?=.*[a-z])(?=.*[!@#$%^&*._ ])[a-z!@#$%^&*._]+$/
    var checkpw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[a-zA-Z\d!@_#$%^&*]+$/

    var check = 0
    if (!checkus.test(email)) {
        console.log("username error")
        check += 1;
        document.querySelector(".errEmail").style.display = "inline-block";

    }
    else {
        console.log("username ok")

        document.querySelector(".errEmail").style.display = "none";
    }
    if (!checkpw.test(password)) {
        console.log("password error")
        check += 1
        document.querySelector(".errPassword").style.display = "inline-block";
    }
    else {
        console.log("password ok")

        document.querySelector(".errPassword").style.display = "none";
    }
    if (check != 0) {
        return false

    }
    else {
        document.querySelector(".errPassword").style.display = "";
        document.querySelector(".errEmail").style.display = "";
        return true;
    }








}
function login() {

    if (checkValid() === true) {
        const formData = {
            login: email.value,
            password: password.value
        }

        // console.log( "email: ", us, "\npw: ", pw);
        const post = fetch("https://recruitment-api.pyt1.stg.jmr.pl/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });


        post.then(reponsive => {
            if (reponsive.ok) {
                return reponsive.json(); // Chuyển đổi phản hồi JSON thành đối tượng JavaScript
            } else {
                throw new Error('Network response was not ok');

            }
        }).then(data => {
            if (data.status === 'ok') {
                window.location.href = 'todoList.html';
            } else {
                document.querySelector(".errPassword").style.display = "inline-block";
                document.querySelector(".errEmail").style.display = "inline-block";

            }
        }).catch(er => {
            console.log("error:", er);
        }).finally(function () {
            console.log("done")
        })

    }


}

function openmask() {
    document.querySelector(".openmask").style.display = "none";
    document.querySelector(".closemask").style.display = "inline-block";
    document.querySelector("#password").type = "password";


}

function closemask() {
    document.querySelector(".openmask").style.display = "inline-block";
    document.querySelector(".closemask").style.display = " none";
    document.querySelector("#password").type = " text";

}



