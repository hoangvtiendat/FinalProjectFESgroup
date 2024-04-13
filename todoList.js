
function render() {
    // console.log("ok")




    listTodo = localStorage.getItem("listTodo") ? JSON.parse(localStorage.getItem("listTodo")) : [];
    listDoing = localStorage.getItem("listDoing") ? JSON.parse(localStorage.getItem("listDoing")) : [];
    listCompleted = localStorage.getItem("listCompleted") ? JSON.parse(localStorage.getItem("listCompleted")) : [];
    listBlocked = localStorage.getItem("listBlocked") ? JSON.parse(localStorage.getItem("listBlocked")) : [];

    let renderTodo = listTodo.map(function (value, index) {

        return `
        
            <div class="box"  draggable = "true">

            <div class="function">
                    <button onclick="edit(${index}, 'todo')" class="edit"></button>
                    <button onclick="deletee(${index}, 'todo')" class="delete"></button>
                    <input type="text" class="indexBox" name="" id="">

                </div>
                <div class="linkBox">${value.link}</div>
                <div class="titleBox">${value.title}</div>
                <div class="lineBox"></div>
                <div class="contentBox">${value.content}</div>

                <div class="timeBox">
                    <img src="clock.png" alt="">
                    <div class="time">${value.formatDate}</div>
                </div>
            </div>

                `

    });
    let listboxTodo = document.getElementById("listboxTodo");
    listboxTodo.innerHTML = renderTodo.join("");



    let renderDoing = listDoing.map(function (value, index) {

        return `
        
            <div class="box"  draggable = "true">

            <div class="function">
                    <button onclick="edit(${index}, 'doing')" class="edit"></button>
                    <button onclick="deletee(${index}, 'doing')" class="delete"></button>
                    <input type="text" class="indexBox" name="" id="">

                </div>
                <div class="linkBox">${value.link}</div>
                <div class="titleBox">${value.title}</div>
                <div class="lineBox"></div>
                <div class="contentBox">${value.content}</div>

                <div class="timeBox">
                    <img src="clock.png" alt="">
                    <div class="time">${value.formatDate}</div>
                </div>
            </div>

                `

    });
    let listboxDoing = document.getElementById("listboxDoing");
    listboxDoing.innerHTML = renderDoing.join("");


    let renderCompleted = listCompleted.map(function (value, index) {

        return `
        
            <div class="box"  draggable = "true">

            <div class="function">
                    <button onclick="edit(${index}, 'completed')" class="edit"></button>
                    <button onclick="deletee(${index}, 'completed')" class="delete"></button>
                    <input type="text" class="indexBox" name="" id="">

                </div>
                <div class="linkBox">${value.link}</div>
                <div class="titleBox">${value.title}</div>
                <div class="lineBox"></div>
                <div class="contentBox">${value.content}</div>

                <div class="timeBox">
                    <img src="clock.png" alt="">
                    <div class="time">${value.formatDate}</div>
                </div>
            </div>

                `

    });
    let listboxCompleted = document.getElementById("listboxCompleted");
    listboxCompleted.innerHTML = renderCompleted.join("");


    let renderBlocked = listBlocked.map(function (value, index) {

        return `
        
            <div class="box" draggable = "true">

            <div class="function">
                    <button onclick="edit(${index}, 'blocked')" class="edit"></button>
                    <button onclick="deletee(${index}, 'blocked')" class="delete"></button>
                    <input type="text" class="indexBox" name="" id="">

                </div>
                <div class="linkBox">${value.link}</div>
                <div class="titleBox">${value.title}</div>
                <div class="lineBox"></div>
                <div class="contentBox">${value.content}</div>

                <div class="timeBox">
                    <img src="clock.png" alt="">
                    <div class="time">${value.formatDate}</div>
                </div>
            </div>

                `

    });
    let listboxBlocked = document.getElementById("listboxBlocked");
    listboxBlocked.innerHTML = renderBlocked.join("");
    document.getElementById("numberTodo").innerText = listTodo.length;
    document.getElementById("numberDoing").innerText = listDoing.length;
    document.getElementById("numberCompleted").innerText = listCompleted.length;
    document.getElementById("numberBlocked").innerText = listBlocked.length;


}


let lists = document.querySelectorAll(".listbox")
let listboxTodo = document.getElementById("listboxTodo");
let listboxDoing = document.getElementById("listboxDoing");
let listboxCompleted = document.getElementById("listboxCompleted");
let listboxBlocked = document.getElementById("listboxBlocked");
let selected = null;
for (list of lists) {
    list.addEventListener("dragstart", function (e) {
        console.log("dragstart")
        selected = e.target;


        //keo tha vao listDoing
        listboxDoing.addEventListener("dragover", function (e) {

            e.preventDefault();
            console.log("dragoverDoing")
        });

        listboxDoing.addEventListener("drop", function (e) {
            e.preventDefault();
            if (selected.parentElement !== listboxDoing) {
                listboxDoing.appendChild(selected);
                console.log(selected)
                console.log(selected.querySelector(".linkBox").innerText)


                listDoing = localStorage.getItem("listDoing") ? JSON.parse(localStorage.getItem("listDoing")) : [];


                listDoing.push(
                    {
                        link: selected.querySelector(".linkBox").innerText,
                        title: selected.querySelector(".titleBox").innerText,
                        content: selected.querySelector(".contentBox").innerText,
                        formatDate: selected.querySelector(".time").innerText
                    });
                localStorage.setItem("listDoing", JSON.stringify(listDoing));

                let indexToRemove1 = listTodo.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove1 !== -1) {
                    listTodo.splice(indexToRemove1, 1);
                    localStorage.setItem("listTodo", JSON.stringify(listTodo));
                }

                let indexToRemove3 = listCompleted.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove3 !== -1) {
                    listCompleted.splice(indexToRemove3, 1);
                    localStorage.setItem("listCompleted", JSON.stringify(listCompleted));
                }
                let indexToRemove4 = listBlocked.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove4 !== -1) {
                    listBlocked.splice(indexToRemove4, 1);
                    localStorage.setItem("listBlocked", JSON.stringify(listBlocked));
                }

                console.log("ok")
            }
            else{
                console.log("fail")
            }
            selected = null;
            console.log("drop")
            render();


        });



        //keo tha vao listTodo
        listboxTodo.addEventListener("dragover", function (e) {

            e.preventDefault();
            console.log("dragoverTodo")
        });

        listboxTodo.addEventListener("drop", function (e) {
            e.preventDefault();

            if (selected.parentElement !== listboxTodo) {
                listboxTodo.appendChild(selected);
                console.log(selected)
                console.log(selected.querySelector(".linkBox").innerText)
                listTodo = localStorage.getItem("listTodo") ? JSON.parse(localStorage.getItem("listTodo")) : [];

                listTodo.push(
                    {
                        link: selected.querySelector(".linkBox").innerText,
                        title: selected.querySelector(".titleBox").innerText,
                        content: selected.querySelector(".contentBox").innerText,
                        formatDate: selected.querySelector(".time").innerText
                    });
                localStorage.setItem("listTodo", JSON.stringify(listTodo));


                let indexToRemove2 = listDoing.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove2 !== -1) {
                    listDoing.splice(indexToRemove2, 1);
                    localStorage.setItem("listDoing", JSON.stringify(listDoing));
                }
                let indexToRemove3 = listCompleted.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove3 !== -1) {
                    listCompleted.splice(indexToRemove3, 1);
                    localStorage.setItem("listCompleted", JSON.stringify(listCompleted));
                }
                let indexToRemove4 = listBlocked.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove4 !== -1) {
                    listBlocked.splice(indexToRemove4, 1);
                    localStorage.setItem("listBlocked", JSON.stringify(listBlocked));
                }



            }
            selected = null;
            console.log("drop")
            render();

        });


        //keo tha vao listCompleted
        listboxCompleted.addEventListener("dragover", function (e) {

            e.preventDefault();
            console.log("dragoverCompleted")
        });

        listboxCompleted.addEventListener("drop", function (e) {
            e.preventDefault();

            if (selected.parentElement !== listboxCompleted) {
                listboxCompleted.appendChild(selected);
                console.log(selected)
                console.log(selected.querySelector(".linkBox").innerText)
                listCompleted = localStorage.getItem("listCompleted") ? JSON.parse(localStorage.getItem("listCompleted")) : [];

                listCompleted.push(
                    {
                        link: selected.querySelector(".linkBox").innerText,
                        title: selected.querySelector(".titleBox").innerText,
                        content: selected.querySelector(".contentBox").innerText,
                        formatDate: selected.querySelector(".time").innerText
                    });
                localStorage.setItem("listCompleted", JSON.stringify(listCompleted));

                let indexToRemove1 = listTodo.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove1 !== -1) {
                    listTodo.splice(indexToRemove1, 1);
                    localStorage.setItem("listTodo", JSON.stringify(listTodo));
                }

                let indexToRemove2 = listDoing.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove2 !== -1) {
                    listDoing.splice(indexToRemove2, 1);
                    localStorage.setItem("listDoing", JSON.stringify(listDoing));
                }

                let indexToRemove4 = listBlocked.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove4 !== -1) {
                    listBlocked.splice(indexToRemove4, 1);
                    localStorage.setItem("listBlocked", JSON.stringify(listBlocked));
                }



            } selected = null;
            console.log("drop")
            render();

        });



        //keo tha vao listBlocked
        listboxBlocked.addEventListener("dragover", function (e) {

            e.preventDefault();
            console.log("dragoverBlocked")
        });

        listboxBlocked.addEventListener("drop", function (e) {
            e.preventDefault();

            if (selected.parentElement !== listboxBlocked) {
                listboxBlocked.appendChild(selected);
                console.log(selected)
                console.log(selected.querySelector(".linkBox").innerText)
                listBlocked = localStorage.getItem("listBlocked") ? JSON.parse(localStorage.getItem("listBlocked")) : [];
                listBlocked.push(
                    {
                        link: selected.querySelector(".linkBox").innerText,
                        title: selected.querySelector(".titleBox").innerText,
                        content: selected.querySelector(".contentBox").innerText,
                        formatDate: selected.querySelector(".time").innerText
                    });
                localStorage.setItem("listBlocked", JSON.stringify(listBlocked));

                let indexToRemove1 = listTodo.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove1 !== -1) {
                    listTodo.splice(indexToRemove1, 1);
                    localStorage.setItem("listTodo", JSON.stringify(listTodo));
                }

                let indexToRemove2 = listDoing.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove2 !== -1) {
                    listDoing.splice(indexToRemove2, 1);
                    localStorage.setItem("listDoing", JSON.stringify(listDoing));
                }
                let indexToRemove3 = listCompleted.findIndex(item => item.link === selected.querySelector(".linkBox").innerText);
                if (indexToRemove3 !== -1) {
                    listCompleted.splice(indexToRemove3, 1);
                    localStorage.setItem("listCompleted", JSON.stringify(listCompleted));
                }




            } selected = null;
            console.log("drop")
            render();

        });






    })



}





function exit() {
    document.querySelector(".containerAddNew").style.display = "none";
    document.getElementById("link").value = "";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("link").style.border = "1px solid grey";
    document.getElementById("title").style.border = "1px solid grey";
    document.getElementById("content").style.border = "1px solid grey";
}

function newTask() {
    document.querySelector(".containerAddNew").style.display = "flex"
    document.querySelector(".checkTodo").style.display = "none";
    document.querySelector(".titleBoxAdd").style.display = "inline-block";
    document.querySelector(".titleBoxEdit").style.display = "none"
    document.querySelector(".btnUpdate").style.display = "none"
    document.querySelector(".btnSubmit").style.display = "inline-block"

}


function validated() {
    let boxElement = document.querySelector(".boxAdd");
    let inpElement = boxElement.querySelectorAll(".inpBoxAdd");

    // console.log(inpElement);

    for (let i = 0; i < inpElement.length; i++) {
        if (inpElement[i].value.trim() === "") {
            // console.log("err")
            inpElement[i].style.border = "1px solid red";
        }
        else {
            inpElement[i].style.border = "1px solid green";
        }
    }
}
// var listTodo;

// var listCompleted;
// var listBlocked;

listTodo = localStorage.getItem("listTodo") ? JSON.parse(localStorage.getItem("listTodo")) : [];
listDoing = localStorage.getItem("listDoing") ? JSON.parse(localStorage.getItem("listDoing")) : [];
listCompleted = localStorage.getItem("listCompleted") ? JSON.parse(localStorage.getItem("listCompleted")) : [];
listBlocked = localStorage.getItem("listBlocked") ? JSON.parse(localStorage.getItem("listBlocked")) : [];


var typeList;


function edit(index, type) {

    document.getElementById("link").style.border = "1px solid green";
    document.getElementById("title").style.border = "1px solid green";
    document.getElementById("content").style.border = "1px solid green";
    typeList = type;
    console.log("typeList: ", typeList)
    if (type === 'todo') {
        document.getElementById("ckTodo").checked = true;

        document.getElementById("link").value = listTodo[index].link;
        document.getElementById("title").value = listTodo[index].title;
        document.getElementById("content").value = listTodo[index].content;



    }
    else if (type === 'doing') {
        document.getElementById("ckDoing").checked = true;
        document.getElementById("link").value = listDoing[index].link;
        document.getElementById("title").value = listDoing[index].title;
        document.getElementById("content").value = listDoing[index].content;
    }
    else if (type === 'completed') {
        document.getElementById("ckCompleted").checked = true;
        document.getElementById("link").value = listCompleted[index].link;
        document.getElementById("title").value = listCompleted[index].title;
        document.getElementById("content").value = listCompleted[index].content;
    }
    else if (type === 'blocked') {
        document.getElementById("ckTodo").checked = false;
        document.getElementById("ckDoing").checked = false;
        document.getElementById("ckCompleted").checked = false;
        document.getElementById("ckBlocked").checked = true;
        document.getElementById("link").value = listBlocked[index].link;
        document.getElementById("title").value = listBlocked[index].title;
        document.getElementById("content").value = listBlocked[index].content;
    }

    else {
        console.log("err ck")
    }
    document.querySelector(".containerAddNew").style.display = "flex"
    document.querySelector(".checkTodo").style.display = "flex";
    document.querySelector(".titleBoxAdd").style.display = "none";
    document.querySelector(".titleBoxEdit").style.display = "inline-block"
    document.querySelector(".btnUpdate").style.display = "inline-block"
    document.querySelector(".btnSubmit").style.display = " none"




    console.log("link:  ", listTodo[index].link);


    document.querySelector(".indexBox").value = index;
    // console.log("index: ", index)
    // console.log("type: ", typeList);
    // console.log("type: ", type);



}

function update() {
    let checkVal = false
    let boxElement = document.querySelector(".boxAdd");
    let inpElement = boxElement.querySelectorAll(".inpBoxAdd");
    validated();
    let dem = 0;
    for (let i = 0; i < inpElement.length; i++) {
        // console.log("check: ", inpElement[i].style.border)
        if (inpElement[i].style.border === "1px solid green") {
            dem = dem + 1;
            // console.log("green: ", dem)

        }

    }
    if (dem === inpElement.length) {

        checkVal = true;
    }
    else {
        dem = 0;
        // console.log("errr")
    }
    // console.log("dem: ", dem)

    if (checkVal) {
        let index = document.querySelector(".indexBox").value;
        deletee(index, typeList);


        console.log("type: ", typeList);
        let link = document.getElementById("link").value;
        let title = document.getElementById("title").value;
        let content = document.getElementById("content").value;
        const currentDate = new Date();
        const formatDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })




        // if (typeList === 'todo') {
        //     listTodo.push({
        //         link: link,
        //         title: title,
        //         content: content
        //     });
        // }
        // else if (typeList === 'doing') {



        //     listDoing.push({
        //         link: link,
        //         title: title,
        //         content: content
        //     });


        // }
        // else if (typeList === 'completed') {

        //     listCompleted.push({
        //         link: link,
        //         title: title,
        //         content: content
        //     });

        // }
        // else if (typeList === 'blocked') {


        //     listBlocked.push({
        //         link: link,
        //         title: title,
        //         content: content
        //     });
        // }

        // else {
        //     console.log("err")
        // }



        // console.log("index: ", index);

        document.querySelector(".containerAddNew").style.display = "none";
        document.getElementById("link").value = "";
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        let radioButton = document.querySelectorAll('input[type="radio"][name="radio"]');
        let selectedRadio = null;




        radioButton.forEach(function (button) {
            if (button.checked) {
                selectedRadio = button;
                return;
            }
        });



        console.log("slt: ", selectedRadio.id);


        if (selectedRadio && selectedRadio.id === "ckTodo") {

            listTodo.push(
                {
                    link: link,
                    title: title,
                    content: content,
                    formatDate: formatDate
                });
            localStorage.setItem("listTodo", JSON.stringify(listTodo));
            console.log("radioTodo")
        }

        else if (selectedRadio && selectedRadio.id === "ckDoing") {


            listDoing.push(
                {
                    link: link,
                    title: title,
                    content: content,
                    formatDate: formatDate

                });
            localStorage.setItem("listDoing", JSON.stringify(listDoing));
            console.log("radioDoing")


        }
        else if (selectedRadio && selectedRadio.id === "ckCompleted") {


            listCompleted.push(
                {
                    link: link,
                    title: title,
                    content: content,
                    formatDate: formatDate

                });
            localStorage.setItem("listCompleted", JSON.stringify(listCompleted));
            console.log("radioCompleted")

        }

        else if (selectedRadio && selectedRadio.id === "ckBlocked") {


            listBlocked.push(
                {
                    link: link,
                    title: title,
                    content: content,
                    formatDate: formatDate

                });
            localStorage.setItem("listBlocked", JSON.stringify(listBlocked));
            console.log("radioBlocked")

        }
        else {
            alert("ERROR")
        }
        render();
    }




}

function deletee(index, type) {
    if (type === 'todo') {

        listTodo.splice(index, 1);
        localStorage.setItem("listTodo", JSON.stringify(listTodo));



    }
    else if (type === 'doing') {
        listDoing.splice(index, 1);
        localStorage.setItem("listDoing", JSON.stringify(listDoing));


    }
    else if (type === 'completed') {
        listCompleted.splice(index, 1);
        localStorage.setItem("listCompleted", JSON.stringify(listCompleted));


    }
    else if (type === 'blocked') {
        listBlocked.splice(index, 1);
        localStorage.setItem("listBlocked", JSON.stringify(listBlocked));


    }

    else {
        console.log("err")
    }
    console.log("xoa thanh cong")
    render();
}



function submit() {

    let checkVal = false
    let boxElement = document.querySelector(".boxAdd");
    let inpElement = boxElement.querySelectorAll(".inpBoxAdd");
    validated();
    let dem = 0;
    for (let i = 0; i < inpElement.length; i++) {
        // console.log("check: ", inpElement[i].style.border)
        if (inpElement[i].style.border === "1px solid green") {
            dem = dem + 1;
            // console.log("green: ", dem)

        }

    }
    if (dem === inpElement.length) {
        1

        checkVal = true;
    }
    else {
        dem = 0;
        // console.log("errr")
    }
    // console.log("dem: ", dem)

    if (checkVal) {
        // console.log("ok")
        let link = document.getElementById("link").value;
        let title = document.getElementById("title").value;
        let content = document.getElementById("content").value;

        const currentDate = new Date();
        const formatDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        // console.log("link: ", link);
        // console.log("title: ", title);
        // console.log("content: ", content);

        listTodo = localStorage.getItem("listTodo") ? JSON.parse(localStorage.getItem("listTodo")) : [];

        listTodo.push(
            {
                link: link,
                title: title,
                content: content,
                formatDate: formatDate
            });
        localStorage.setItem("listTodo", JSON.stringify(listTodo));
        document.querySelector(".containerAddNew").style.display = "none";
        document.querySelector("#link").value = "";
        document.querySelector("#title").value = "";
        document.querySelector("#content").value = "";


        document.getElementById("numberTodo").innerText = listTodo.length;


        console.log("lenght: ", listTodo.length);
        render();
    }
}


document.querySelector('.animation').addEventListener('animationend', function () {
    this.style.display = 'none';
});

// document.querySelector(".containerAddNew").addEventListener("onclick", exit);



render();

