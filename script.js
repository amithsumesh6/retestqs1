let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

function addProduct() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let qty = document.getElementById("qty").value;

    if (id == "" || name == "" || price == "" || qty == "") {
        alert("Fill all fields");
        return;
    }

    let product = { id, name, price, qty };

    if (editIndex == -1) {
        products.push(product);
    } else {
        products[editIndex] = product;
        editIndex = -1;
        document.getElementById("btn").innerText = "Add Product";
    }

    localStorage.setItem("products", JSON.stringify(products));
    clearForm();
    display();
}

function display() {
    let output = "";
    products.forEach((p, i) => {
        output += `<tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.qty}</td>
        <td>
        <button class="btn btn-warning" onclick="edit(${i})">Edit</button>
        <button class="btn btn-danger" onclick="del(${i})">Delete</button>
        </td></tr>`;
    });

    document.getElementById("output").innerHTML = output;
    document.getElementById("total").innerText = products.length;
    document.getElementById("low").innerText = products.filter(p => p.qty < 5).length;
}

function edit(i) {
    let p = products[i];
    document.getElementById("id").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("qty").value = p.qty;
    editIndex = i;
    document.getElementById("btn").innerText = "Update Product";
}

function del(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    display();
}

function clearForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
}

display();