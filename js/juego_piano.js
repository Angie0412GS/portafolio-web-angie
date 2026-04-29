document.addEventListener('DOMContentLoaded', () => {
    const teclas = document.querySelectorAll('.tecla'); // Selecciona todas las teclas

    // Mapeo de notas a la ruta del archivo de audio
    const notasAudio = {
        'do': new Audio('assets/audio/do.mp3'),
        're': new Audio('assets/audio/re.mp3'),
        'mi': new Audio('assets/audio/mi.mp3'),
        'fa': new Audio('assets/audio/fa.mp3'),
        'sol': new Audio('assets/audio/sol.mp3'),
        'la': new Audio('assets/audio/la.mp3'),
        'si': new Audio('assets/audio/si.mp3')
    };

    // Mapeo de teclas del teclado a notas
    const keyMap = {
        'a': 'do',
        's': 're',
        'd': 'mi',
        'f': 'fa',
        'g': 'sol',
        'h': 'la',
        'j': 'si'
    };

    // Función para reproducir una nota
    function reproducirNota(nota) {
        const audio = notasAudio[nota];
        if (audio) {
            audio.currentTime = 0; // Reinicia el audio si ya está sonando
            audio.play();
        }
    }

    // Manejar clics en las teclas del piano
    teclas.forEach(tecla => {
        tecla.addEventListener('click', () => {
            const nota = tecla.dataset.nota;
            reproducirNota(nota);
            
            // Añadir clase 'activa' para efecto visual
            tecla.classList.add('activa');
            setTimeout(() => {
                tecla.classList.remove('activa');
            }, 100); // Eliminar la clase después de un corto tiempo
        });
    });

    // Manejar pulsaciones de teclas del teclado
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase(); // Convertir a minúscula
        const nota = keyMap[key];

        if (nota) {
            // Encontrar la tecla HTML correspondiente y añadir la clase 'activa'
            const teclaHTML = document.querySelector(`.tecla[data-key="${key}"]`);
            if (teclaHTML && !teclaHTML.classList.contains('activa')) { // Evitar activar repetidamente si se mantiene presionada
                reproducirNota(nota);
                teclaHTML.classList.add('activa');
            }
        }
    });

    // Manejar liberación de teclas del teclado
    document.addEventListener('keyup', (e) => {
        const key = e.key.toLowerCase();
        const teclaHTML = document.querySelector(`.tecla[data-key="${key}"]`);
        if (teclaHTML) {
            teclaHTML.classList.remove('activa');
        }
    });
});