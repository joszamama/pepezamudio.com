---
title: "Compás y el margen para arriesgar en investigación"
description: "Aceptaron nuestro artículo sobre pruebas centradas en características en ASE 2026. El resultado también me hizo pensar en cómo la financiación condiciona las preguntas que puede hacerse un grupo."
date: "2026-11-04"
group: "research"
---

Nuestro artículo [«Feature-Focused Test Generation»](https://doi.org/10.1145/3832783.3837479) fue aceptado en ASE 2026. Lo escribí con Gaetano Sapia, Alexi Turcotte, David Benavides, Marcel Böhme y Andreas Zeller. Del proyecto salió [Compás](https://github.com/fandango-fuzzer/compas), una herramienta para dirigir pruebas basadas en gramáticas hacia la característica que te interesa.

Imagina que tienes una gramática para archivos PNG y que acaba de cambiar el decodificador de animaciones. Un generador puede producir PNG válidos, pero quizá dedique casi todo el tiempo a imágenes que nunca ejercitan la animación. Puedes añadir restricciones a mano para cada prueba, o generar un corpus enorme y esperar que algunas entradas lleguen al código adecuado. Yo quería que las opciones de la gramática fueran útiles para quien prueba el programa.

Compás extrae un modelo de características de una especificación de Fandango. Las alternativas, las partes opcionales y las restricciones se convierten en opciones que el investigador puede examinar. Elige un valor —PNG animados, por ejemplo— y Compás produce una especificación más pequeña para esa elección, una *porción*. Fandango genera las pruebas a partir de ella. Cada prueba conserva la etiqueta de su característica, lo que facilita relacionar la entrada con el código que ha ejercitado.

Esa relación importa más allá de una campaña de fuzzing. Si cambia un controlador de animaciones, quiero saber qué pruebas son relevantes sin pedirle a alguien que reconozca a simple vista el archivo binario correcto. El [artículo](https://doi.org/10.1145/3832783.3837479) contiene la evaluación; también está aquí la [copia de los autores](/papers/feature-focused-test-generation.pdf).

## Lo que me hizo pensar la aceptación

Ver a la Universidad de Sevilla, CISPA y el Instituto Max Planck de Seguridad y Privacidad en un mismo artículo significó mucho para mí. Estudié en Sevilla y ahora hago el doctorado en CISPA. Esta colaboración reunió a personas que han influido en mi forma de pensar tanto sobre ingeniería del software como sobre pruebas de seguridad.

También me recordó una conversación que tuve con David Benavides durante el grado. Me preguntaba por qué las colaboraciones entre grupos españoles y grandes centros de investigación del resto de Europa parecían menos frecuentes de lo que podrían ser. Hay muchas razones, pero una se ha vuelto más concreta para mí desde que me fui: el margen que tiene un grupo para probar una idea incierta.

Un grupo pequeño con financiación limitada quizá tenga que elegir proyectos capaces de producir pronto un artículo. Un grupo mayor y con más recursos puede dejar que alguien dedique tiempo a aprender un área nueva, apueste por cruzar disciplinas y, a veces, se equivoque. Esas decisiones se acumulan. Influyen en quién puede viajar, quién recibe comentarios tempranos y qué preguntas merece la pena intentar responder. La diferencia de financiación no solo ralentiza: cambia las preguntas que se pueden plantear.

Estoy describiendo una ventaja de la que disfruto ahora. Mi trabajo con Marcel en MPI me dio tiempo para aprender, y la colaboración con David y mis compañeros dejó crecer una idea poco habitual. Agradezco esa libertad. Me gustaría que dependiera menos del lugar donde un investigador joven empieza su carrera. Me enorgullece que parte de este artículo venga de Sevilla.

Si estás pensando en hacer un doctorado y tienes la posibilidad de trabajar fuera, te animaría a conocer otro entorno de investigación. Soy consciente de que «si puedes» encierra muchas dificultades. A mí la experiencia me cambió la idea de lo que un grupo de investigación debería poder ofrecer a sus estudiantes.

Esta es una versión más breve y revisada de mi [publicación original en jzamudio.com](https://jzamudio.com/feature-focused-test-generation/), de julio de 2026.
