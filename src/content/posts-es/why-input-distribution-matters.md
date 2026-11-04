---
title: "Por qué importa la distribución de las entradas"
description: "La pregunta detrás de mi artículo para el simposio doctoral de ISSTA y de UniFuzz: ¿qué partes del espacio de entradas visita realmente un fuzzer basado en gramáticas?"
date: "2026-11-04"
group: "research"
---

Una gramática puede describir muchas entradas válidas mientras el generador insiste en producir siempre una pequeña parte de ellas. Si resulta más fácil llegar a derivaciones cortas, un fuzzer puede llenar su corpus de ejemplos pequeños y parecidos. Que sean válidos no me dice si he probado las partes del formato que me interesan.

Esa pregunta me llevó a mi artículo del simposio doctoral de ISSTA 2024, [«Shaping Test Inputs in Grammar-Based Fuzzing»](https://doi.org/10.1145/3650212.3685553), y a [UniFuzz](https://github.com/joszamama/unifuzz), un prototipo temprano para generar conjuntos de pruebas con distribuciones elegidas. La idea inicial era sencilla: si un campo o una estructura importa para la prueba, quiero poder indicar con qué frecuencia debe aparecer.

Piensa en un formato con una rama opcional. La gramática dice que ambos caminos son legales. No garantiza que cien pruebas generadas exploren ambos en una proporción útil. La distribución del conjunto es otra decisión de prueba, tanto si la tomamos expresamente como si dejamos que un algoritmo la tome por nosotros.

UniFuzz experimenta con hacer visible esa decisión. Combina una gramática con restricciones de distribución para ciertos valores y busca una población de entradas que se ajuste mejor a la forma elegida. El [repositorio](https://github.com/joszamama/unifuzz) contiene el prototipo y ejemplos; la [copia del artículo](/papers/shaping-test-inputs-grammar-based-fuzzing.pdf) explica la pregunta de investigación. Era un trabajo inicial, sin pretender que todas las gramáticas o distribuciones se pudieran tratar igual de bien.

En proyectos posteriores sigo volviendo a lo mismo: ¿qué ejercitó *realmente* el generador? Contar el tamaño de un corpus es fácil. Ver las partes del espacio de entradas que deja sin tocar cuesta más y, a menudo, resulta más interesante.

Reelaborado a partir de mi [nota anterior sobre UniFuzz](https://jzamudio.com/better-distributed-grammar-based-fuzzing/) y mi [entrada sobre ISSTA](https://jzamudio.com/shaping-test-inputs-in-grammar-based-fuzzing-issta-2024/).
