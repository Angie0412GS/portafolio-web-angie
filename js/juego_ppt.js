document.addEventListener('DOMContentLoaded', () => {
    const opciones = ['piedra', 'papel', 'tijera'];
    let puntuacionJugador = 0;
    let puntuacionComputadora = 0;

    const puntuacionJugadorSpan = document.getElementById('puntuacionJugador');
    const puntuacionComputadoraSpan = document.getElementById('puntuacionComputadora');
    const mensajeEleccionP = document.getElementById('mensajeEleccion');
    const resultadoJuegoP = document.getElementById('resultadoJuego');
    const botonesOpcion = document.querySelectorAll('.btn-opcion');
    const reiniciarBtn = document.getElementById('reiniciarJuegoBtn');

    function obtenerEleccionComputadora() {
        const indiceAleatorio = Math.floor(Math.random() * opciones.length);
        return opciones[indiceAleatorio];
    }

    function determinarGanador(jugador, computadora) {
        if (jugador === computadora) {
            return 'empate';
        } else if (
            (jugador === 'piedra' && computadora === 'tijera') ||
            (jugador === 'papel' && computadora === 'piedra') ||
            (jugador === 'tijera' && computadora === 'papel')
        ) {
            return 'jugador';
        } else {
            return 'computadora';
        }
    }

    function jugarRonda(eleccionJugador) {
        const eleccionComputadora = obtenerEleccionComputadora();

        mensajeEleccionP.textContent = `Tú elegiste: ${eleccionJugador.charAt(0).toUpperCase() + eleccionJugador.slice(1)}. La computadora eligió: ${eleccionComputadora.charAt(0).toUpperCase() + eleccionComputadora.slice(1)}.`;

        const ganador = determinarGanador(eleccionJugador, eleccionComputadora);

        resultadoJuegoP.className = 'resultado'; // Resetear clases de color

        if (ganador === 'jugador') {
            puntuacionJugador++;
            resultadoJuegoP.textContent = '¡Ganaste esta ronda!';
            resultadoJuegoP.classList.add('ganado');
        } else if (ganador === 'computadora') {
            puntuacionComputadora++;
            resultadoJuegoP.textContent = 'Perdiste esta ronda.';
            resultadoJuegoP.classList.add('perdido');
        } else {
            resultadoJuegoP.textContent = '¡Es un empate!';
            resultadoJuegoP.classList.add('empate');
        }

        actualizarMarcador();
        verificarFinDelJuego();
    }

    function actualizarMarcador() {
        puntuacionJugadorSpan.textContent = puntuacionJugador;
        puntuacionComputadoraSpan.textContent = puntuacionComputadora;
    }

    function verificarFinDelJuego() {
        // Puedes establecer un límite de puntuación, por ejemplo, el primero en llegar a 5
        // Si no hay límite, el juego es continuo hasta reiniciar
        const limitePuntuacion = 5;
        if (puntuacionJugador >= limitePuntuacion || puntuacionComputadora >= limitePuntuacion) {
            let mensajeFinal = '';
            if (puntuacionJugador >= limitePuntuacion) {
                mensajeFinal = '¡Felicidades! ¡Has ganado el juego!';
                resultadoJuegoP.classList.add('ganado');
            } else {
                mensajeFinal = 'La computadora ha ganado el juego. ¡Mejor suerte la próxima!';
                resultadoJuegoP.classList.add('perdido');
            }
            resultadoJuegoP.textContent = mensajeFinal;
            deshabilitarOpciones();
            reiniciarBtn.classList.remove('oculto');
        }
    }

    function deshabilitarOpciones() {
        botonesOpcion.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.7'; // Indicar que están deshabilitados
            btn.style.cursor = 'not-allowed';
        });
    }

    function habilitarOpciones() {
        botonesOpcion.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
    }

    function reiniciarJuego() {
        puntuacionJugador = 0;
        puntuacionComputadora = 0;
        actualizarMarcador();
        mensajeEleccionP.textContent = '';
        resultadoJuegoP.textContent = '';
        resultadoJuegoP.className = 'resultado';
        reiniciarBtn.classList.add('oculto');
        habilitarOpciones();
    }

    botonesOpcion.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const opcionSeleccionada = e.currentTarget.dataset.opcion;
            jugarRonda(opcionSeleccionada);
        });
    });

    reiniciarBtn.addEventListener('click', reiniciarJuego);

    // Iniciar el juego al cargar
    reiniciarJuego();
});
