document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const celdas = document.querySelectorAll('.celda');
    const mensajeTurno = document.getElementById('mensajeTurno');
    const turnoActualSpan = document.getElementById('turnoActual');
    const resultadoJuegoP = document.getElementById('resultadoJuegoTriqui');
    const reiniciarBtn = document.getElementById('reiniciarTriquiBtn');

    let tableroEstado = ['', '', '', '', '', '', '', '', ''];
    let jugadorActual = 'X';
    let juegoActivo = true;

    // Todas las combinaciones ganadoras (índices del tablero)
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    function iniciarJuego() {
        tableroEstado = ['', '', '', '', '', '', '', '', ''];
        jugadorActual = 'X';
        juegoActivo = true;
        resultadoJuegoP.textContent = '';
        resultadoJuegoP.className = 'resultado-juego'; // Resetear clases de color
        reiniciarBtn.classList.add('oculto');
        turnoActualSpan.textContent = jugadorActual;
        mensajeTurno.classList.remove('oculto'); // Asegurarse de que el mensaje de turno sea visible

        celdas.forEach(celda => {
            celda.textContent = '';
            celda.classList.remove('X', 'O', 'marcada');
            celda.addEventListener('click', manejarClickCelda, { once: true }); // Solo un clic por celda
        });
    }

    function manejarClickCelda(evento) {
        const celdaClicada = evento.target;
        const indiceCeldaClicada = parseInt(celdaClicada.dataset.celdaIndice);

        if (tableroEstado[indiceCeldaClicada] !== '' || !juegoActivo) {
            return; // No hacer nada si la celda ya está marcada o el juego ha terminado
        }

        tableroEstado[indiceCeldaClicada] = jugadorActual;
        celdaClicada.textContent = jugadorActual;
        celdaClicada.classList.add(jugadorActual, 'marcada');

        verificarResultado();
    }

    function verificarResultado() {
        let haGanado = false;
        for (let i = 0; i < combinacionesGanadoras.length; i++) {
            const combinacion = combinacionesGanadoras[i];
            let val1 = tableroEstado[combinacion[0]];
            let val2 = tableroEstado[combinacion[1]];
            let val3 = tableroEstado[combinacion[2]];

            if (val1 === '' || val2 === '' || val3 === '') {
                continue; // Si alguna celda está vacía, no es una combinación ganadora aún
            }
            if (val1 === val2 && val2 === val3) {
                haGanado = true;
                break;
            }
        }

        if (haGanado) {
            resultadoJuegoP.textContent = `¡El jugador ${jugadorActual} ha ganado!`;
            resultadoJuegoP.classList.add('ganador');
            juegoActivo = false;
            reiniciarBtn.classList.remove('oculto');
            mensajeTurno.classList.add('oculto'); // Ocultar mensaje de turno
            deshabilitarCeldas();
            return;
        }

        let empate = !tableroEstado.includes(''); // Si no hay celdas vacías, es un empate
        if (empate) {
            resultadoJuegoP.textContent = '¡Es un empate!';
            resultadoJuegoP.classList.add('empate');
            juegoActivo = false;
            reiniciarBtn.classList.remove('oculto');
            mensajeTurno.classList.add('oculto'); // Ocultar mensaje de turno
            return;
        }

        // Si no ha ganado ni es empate, cambia de turno
        jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
        turnoActualSpan.textContent = jugadorActual;
    }

    function deshabilitarCeldas() {
        celdas.forEach(celda => {
            celda.removeEventListener('click', manejarClickCelda);
            celda.classList.add('marcada'); // Asegura que no se puedan volver a marcar
        });
    }

    reiniciarBtn.addEventListener('click', iniciarJuego);

    // Iniciar el juego cuando la página carga
    iniciarJuego();
});