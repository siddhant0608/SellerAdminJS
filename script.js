let totalValue = 0; // Initialize the total value
const productList = document.getElementById("productList");
const totalValueElement = document.getElementById("totalValue");

function saveToCrud(event) {
    event.preventDefault();
    const price = parseFloat(event.target.price.value);
    const productName = event.target.productName.value;

    const obj = {
        price,
        productName
    };

    axios.post("https://crudcrud.com/api/c1b31a409f694ea7846b5432834dfd22/customerOrder", obj)
        .then((response) => {
            displayOrders(response.data);
            totalValue += price;
            updateTotalValue();
            clearFormFields(event.target);
            console.log(response);
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/c1b31a409f694ea7846b5432834dfd22/customerOrder")
        .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                displayOrders(response.data[i]);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

function clearFormFields(form) {
    form.price.value = "";
    form.productName.value = "";
}

function displayOrders(obj) {
    const listItem = document.createElement("li");
    listItem.textContent = `${obj.productName} - ₹${obj.price.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Product";
    deleteButton.onclick = () => {
        axios
            .delete(`https://crudcrud.com/api/c1b31a409f694ea7846b5432834dfd22/customerOrder/${obj._id}`)
            .then((response) => {
                console.log(response);
                if (totalValue > 0) {
                    totalValue -= obj.price;
                    updateTotalValue();
                }
                productList.removeChild(listItem);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    listItem.appendChild(deleteButton);
    productList.appendChild(listItem);
}

function updateTotalValue() {
    totalValueElement.textContent = `Total Value Worth of Products: ₹${totalValue.toFixed(2)}`;
}
