
class TodoList {
    constructor() {
        this.items = [];
        // this.itemID = 0;
        this.finished = [];
        this.textExamples = [
            "Meeting",
            "Check up on order",
            "Send invoice reminder",
            "Introduce to CEO",
            "Call",
            "Email",
            "Add new order",
            "Coffee at Starbucks",
            "Send NPS-survey",
            "Remove customer from list",
            "Add new contact person",
            "Schedule a meeting",
            "Present to client",
            "Deliver to customer",
        ]
    }

    collectItem() {
        let collect = new TodoItem();
        this.items.push(collect.item);
        console.log(this.items);
    }

    addNewItem() {
        let date = document.getElementById("todo_date").value;
        console.log(date);
        let customer = document.getElementById("customer_id").value;
        let text = document.getElementById("new_todo").value;
        let item = new TodoItem(text, date, customer);
        item.createHTML();
        item.addToDatabase();
        this.items.push(item);
    }

    async getItems() {
        let items = await mockup.getRandom('todo', 5);
        let companies = await mockup.getRandom('customer', 5);
        companies = companies.map((customer) => {
            return customer.companyName;
        })

        console.log(companies);

        items.forEach((item, i) => {
            let year = 2019 + Math.round(1 - Math.sin(Math.random() * (Math.PI / 2)));
            let month = Math.round(Math.random() * 12 + 1);
            let date = Math.round(Math.random() * 30 + 1);
            let rand = Math.floor(Math.random() * this.textExamples.length) - 1;
            let data = this.textExamples[rand];
            console.log(date);
            let todoItem = new TodoItem(data, `${year}-${month}-${date}`, companies[i]);
            todoItem.createHTML();
        })
    }
}

class Item {
    constructor(finishedItems) {
        this.finishedItems = finishedItems;
    }
}

class TodoItem {
    constructor(text, customer, date) {
        this.item;
        this.text = text;
        this.date = date;
        this.checked = 0;
        this.customer = customer;
        this.i = 0;
        this.itemID = [];
    }

    //Metod för att lägga till ett item
    createHTML() {
        this.item = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "chk";
        this.item.appendChild(checkbox);
        this.item.setAttribute("id", "itemID" + i);
        this.x = document.createTextNode(this.text + "  -  " + this.date + "  -  " + this.customer);
        document.getElementById("current_items_list").appendChild(this.item);
        this.item.appendChild(this.x);
        i++;

        this.itemID++;
        console.log(this.item);

        allTodos.collectItem();

        //Lägger till X för att kunna stänga varje item
        var span = document.createElement("SPAN");
        var text = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(text);
        this.item.appendChild(span);

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }

        for (let i = 0; i < allTodos.items.length; i++) {
            document.getElementById("chk").addEventListener("click", function (e) {
                if (checkbox.checked) {
                    allTodos.finished.push(checkbox);
                    console.log("checked");
                }
            });
        }

        console.log(allTodos.finished);
    }

    addToDatabase() {
        //Sätter in itemet i databasen
        let data = {
            data: this.text,
            rank: Math.round(Math.random() * 100),
            date: this.date,
        };

        mockup.post('todo', data);
    }
}

let allTodos = new TodoList();
let todo = null;

//Lägger till en X för varje nytt item
var LI = document.getElementsByTagName("li");
var i;
for (i = 0; i < LI.length; i++) {
    var span = document.createElement("SPAN");
    var text = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(text);
    LI[i].appendChild(span);
}

// Döljer item om man klickar på X
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

function openDate() {

    var date = document.getElementById('todo_date');
    if (date.style.display === 'block') {
        date.style.display = 'none';
    } else {
        date.style.display = 'block';
    }
};

document.getElementById("todo_date").addEventListener("change", function () {
    var date = this.value;
    console.log(date);
});

function openCustomerId() {
    var customer = document.getElementById("customer_id");
    if (customer.style.display === "block") {
        customer.style.display = "none";
    } else {
        customer.style.display = "block";
    }
};

document.getElementById("customer_id").addEventListener("change", function () {
    var customerID = this.value;
    console.log(customerID);
    document.getElementsByTagName("li").innerHTML = this.value;
});

document.addEventListener("DOMContentLoaded", function () {
    allTodos.getItems();
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        allTodos.addNewItem();
    }
});