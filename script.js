function obtenerHora() {
    const horaActual = new Date();
    const hora = horaActual.getHours();
    const minutos = horaActual.getMinutes();
    const segundos = horaActual.getSeconds();
    const horaFormateada = `${hora}:${minutos}:${segundos}`;
    document.getElementById("hora-valor").textContent = horaFormateada;
}
function obtenerFecha() {
    const fechaActual = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', options);
    document.getElementById("fecha-valor").textContent = fechaFormateada;
}
function agregarItem() {
    const itemName = document.getElementById("item-name").value;
    if (itemName) {
        const listaCompras = document.getElementById("lista-compras");
        const listItem = document.createElement("li");
        listItem.textContent = itemName;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hecho";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            listItem.style.transition = "opacity 0.5s ease-in-out"; 
            listItem.style.opacity = 0; 
            setTimeout(() => {
                listaCompras.removeChild(listItem);
            }, 500); 

            eliminarItemLocalStorage(itemName);
        });

        listItem.appendChild(deleteButton);
        listaCompras.appendChild(listItem);

        agregarItemLocalStorage(itemName);

        document.getElementById("item-name").value = "";

        setTimeout(() => {
            listItem.classList.add("show");
        }, 100);
    }
}
document.getElementById("add-button").addEventListener("click", agregarItem);

document.getElementById("item-name").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarItem();
    }
});

function agregarItemLocalStorage(itemName) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.push(itemName);
    localStorage.setItem("items", JSON.stringify(items));
}

function eliminarItemLocalStorage(itemName) {
    let items = JSON.parse(localStorage.getItem("items"));
    items = items.filter(item => item !== itemName);
    localStorage.setItem("items", JSON.stringify(items));
}
function cargarItemsLocalStorage() {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }

    const listaCompras = document.getElementById("lista-compras");
    items.forEach(itemName => {
        const listItem = document.createElement("li");
        listItem.textContent = itemName;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            listItem.style.transition = "opacity 0.5s ease-in-out";
            listItem.style.opacity = 0; 
            setTimeout(() => {
                listaCompras.removeChild(listItem);
            }, 500); 

            eliminarItemLocalStorage(itemName);
        });

        listItem.appendChild(deleteButton);
        listaCompras.appendChild(listItem);

        setTimeout(() => {
            listItem.classList.add("show");
        }, 100);
    });
}
setInterval(obtenerHora, 1000);
setInterval(obtenerFecha, 60000);
obtenerHora();
obtenerFecha();
cargarItemsLocalStorage();
