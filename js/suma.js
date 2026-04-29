function calcular() {
    // Obtener los valores de los inputs
    let valor1 = parseFloat(document.getElementById("num1").value);
    let valor2 = parseFloat(document.getElementById("num2").value);
    let operacion = document.getElementById("operacion").value;
    let resultado = 0;

    // Verificar la operación seleccionada
    if (isNaN(valor1) || isNaN(valor2)) {
        document.getElementById("resultado").value = "Por favor, ingresa números válidos.";
        return; // Terminar la función si los valores no son válidos
    }

    if (operacion === "suma") {
        resultado = valor1 + valor2;
    } else if (operacion === "resta") {
        resultado = valor1 - valor2;
    } else if (operacion === "multiplicacion") {
        resultado = valor1 * valor2;
    } else if (operacion === "division") {
        if (valor2 !== 0) {
            resultado = valor1 / valor2;
        } else {
            resultado = 'Error: División por cero';
        }
    }

    // Mostrar el resultado en el input de resultado
    document.getElementById("resultado").value = resultado;
}
