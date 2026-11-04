---
title: "Cuando la entrada es una conversación"
description: "Cómo Fandango pasó de generar archivos estructurados a probar intercambios entre protocolos con estado, con FTP y DNS como ejemplos."
date: "2026-11-04"
group: "projects"
---

Un analizador de archivos recibe una entrada y devuelve un resultado. Un servidor de protocolo, en cambio, responde. Eso cambia lo que debe hacer un generador de pruebas: su siguiente mensaje puede depender de la respuesta al anterior.

Después de publicar Fandango, la pregunta volvía una y otra vez: ¿podíamos usar las mismas gramáticas y restricciones que empleábamos para archivos estructurados para describir una conversación entre cliente y servidor?

Con [Fandango 1.1](https://github.com/fandango-fuzzer/fandango), sí. Una especificación puede describir los mensajes de un intercambio y las relaciones entre ellos. Fandango puede actuar como cualquiera de las dos partes, producir un mensaje, leer la respuesta y continuar desde el nuevo estado. El [ejemplo de FTP](https://fandango-fuzzer.github.io/FTP.html) muestra por qué importa: la respuesta del servidor puede determinar un comando posterior o la apertura de un canal de datos adicional. El [ejemplo de DNS](https://fandango-fuzzer.github.io/DNS.html) aplica el mismo enfoque a mensajes binarios y restricciones sobre las respuestas.

También cambia mi forma de pensar en una prueba. Para un archivo, el caso de prueba suele ser el archivo. Para un protocolo, es la interacción: los mensajes enviados, las respuestas observadas y los cambios de estado entre medias. Una petición válida aislada puede decir muy poco si el fallo solo aparece tras una secuencia concreta.

Alexander Liggesmeyer fue el principal responsable de esta parte de Fandango. Es un trabajo de equipo y, si quieres probarlo, la [documentación de protocolos](https://fandango-fuzzer.github.io/Protocols.html) es un punto de partida mejor que esta nota breve.

Este texto reelabora mi [anuncio anterior en jzamudio.com](https://jzamudio.com/fandango-goes-protocol/), de febrero de 2026.
