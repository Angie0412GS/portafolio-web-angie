function agregarTarea() {
    // Obtener el valor de la nueva tarea
    let nuevaTareaTexto = document.getElementById("nuevaTarea").value;

    if (nuevaTareaTexto === "") {
        alert("Por favor, ingrese una tarea");
        return;
    }

    // Crear nuevo elemento en la lista
    let nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = nuevaTareaTexto;

    // Crear botón de eliminar
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar");


    // Agregar botón de eliminar al elemento de la lista
    botonEliminar.onclick = function() {
        nuevaTarea.remove();
    };

    nuevaTarea.appendChild(botonEliminar);

    // Agregar el elemento final a la lista
    document.getElementById("listaTareas").appendChild(nuevaTarea);

    // Limpiar el cuadro de texto del nombre de la tarea
    document.getElementById("nuevaTarea").value = "";
}