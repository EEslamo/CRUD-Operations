let title = document.querySelector("#title");
let allcost = document.querySelectorAll("#allcost input");
let count = document.querySelector("#count");
let department = document.querySelector("#department");
let creatbtn = document.querySelector(".btn");
let tbody = document.querySelector("#tbody");
let clearbtn = document.querySelector("#clearbtn");
let countbtn = document.querySelector("#countbtn");
let invalidspan = document.querySelectorAll(".invalid-span");
// localStorage.clear()

let products;

let mood = "create";

let globalId;

if (localStorage.products != null) {
    products = JSON.parse(localStorage.products);
} else {
    products = [];
}


let gettotal = () => {
    price = allcost[0].value;
    tax = allcost[1].value;
    discount = allcost[2].value;
    let taxtcost = +price * (+tax / 100);
    totalcost = (+taxtcost + +price) - +discount;
    allcost[3].value = Math.ceil(totalcost);
    if (allcost[3].value < 0) {
        window.alert("can not be a negative number");
    }
}

for (let i = 0; i < allcost.length; i++) {
    allcost[i].addEventListener("keyup", gettotal);
}

let clearInputs = () => {
    for (let i = 0; i < allcost.length; i++) {
        allcost[i].value = "";
    }
    title.value = "";
    count.value = "";
    department.value = "";
}

let creatobject = () => {
    let newproduct = {
        title: title.value,
        price: allcost[0].value,
        tax: allcost[1].value,
        discount: allcost[2].value,
        total: allcost[3].value,
        count: count.value,
        dep: department.value
    }

    if (newproduct.title.trim() == "" || newproduct.price.trim() == "" || newproduct.tax.trim() == "" ||
        newproduct.discount.trim() == "" || newproduct.count.trim == "" || newproduct.dep.trim() == "") {
            for (let i = 0; i < invalidspan.length; i++) {
                invalidspan[i].classList.remove("invalid-span");
                
            }
        // invalidspan.classList.remove("invalid-span");
        // title.classList.add("invalid");
        // price.classList.add("invalid");

    } else {
        for (let i = 0; i < invalidspan.length; i++) {
            invalidspan[i].classList.add("invalid-span");
            
        }

        if (mood == 'create') {
            if (count.value > 1) {
                for (let i = 1; i <= count.value; i++) {
                    products.push(newproduct);
                }
            } else {
                products.push(newproduct);
            }
        } else {
            products[globalId] = newproduct;
            mood = "create";
            creatbtn.innerHTML = "Add this product";
            creatbtn.classList.replace("btn-update", "btn");
            count.classList.remove("none");
        }

        clearInputs();
        renderTask();
        localStorage.setItem("products", JSON.stringify(products));
    }

}

let deleteItem = (i) => {
    products.splice(i, 1);
    localStorage.products = JSON.stringify(products);
    clearInputs();
    renderTask();
}

let update = (i) => {
    mood = "update";
    globalId = i;
    title.value = products[i].title;
    allcost[0].value = products[i].price;
    allcost[1].value = products[i].tax;
    allcost[2].value = products[i].discount;
    allcost[3].value = products[i].total;
    department.value = products[i].dep;
    count.classList.add("none");
    creatbtn.innerHTML = `Update Data : ${i+1}`;
    creatbtn.classList.replace("btn", 'btn-update');
}

let renderTask = () => {
    let table = "";
    for (let i = 0; i < products.length; i++) {
        table +=
            `<tr>
        <td>${i+1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].tax}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].dep}</td>
        <td> <a onclick='update(${i})'> <i class="fa-solid fa-pen-to-square"></i> </a> 
         <a onclick='deleteItem(${i})'> <i class="fa-solid fa-trash-can"></i> </a> 
         </td>
        </tr>`
    }

    tbody.innerHTML = table;

    if (products.length == 0) {
        clearbtn.style.display = 'none';
    } else {
        clearbtn.style.display = 'block';
    }

}
renderTask();
creatbtn.addEventListener("click", creatobject);


let clearall = () => {
    localStorage.clear();
    products.splice(0);
    renderTask();
}

clearbtn.addEventListener("click", clearall)