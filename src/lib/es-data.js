// Public-facing Spanish copy for records shared by the English and Spanish pages.
export const projectCopy = {
  Fandango: { kind: 'Fuzzing basado en lenguajes', description: 'Genera pruebas a partir de gramáticas, restricciones escritas en Python y búsqueda evolutiva.', label: 'Herramienta de código abierto' },
  'Compás': { kind: 'Pruebas centradas en características', description: 'Un prototipo que acota una gramática a las características que se quieren poner a prueba.', label: 'Herramienta de código abierto' },
  Fanbase: { kind: 'Especificaciones reutilizables', description: 'Una colección pública de especificaciones de formatos para Fandango, con una herramienta para encontrarlas e instalarlas.', label: 'Herramienta de código abierto' },
};

export const contributionCopy = {
  'https://github.com/flamapy/z3_metamodel/pull/6': { title: 'Usé división real en las restricciones aritméticas de Z3', detail: 'PR #6 integrado · los operandos enteros ya no se truncan: 13/8 es 1,625, no 1' },
  'https://github.com/flamapy/z3_metamodel/pull/7': { title: 'Añadí floor y ceil al backend de Z3', detail: 'PR #7 integrado · los modelos válidos que los usan se analizan en lugar de rechazarse' },
  'https://github.com/flamapy/z3_metamodel/pull/10': { title: 'Traté los literales con punto como constantes', detail: 'PR #10 integrado · \'a.b\' se compara como texto, no como atributo de una característica' },
  'https://github.com/flamapy/z3_metamodel/pull/12': { title: 'Añadí una suite de conformidad basada en un oráculo', detail: 'PR #12 integrado · 15 modelos verificados a mano protegen el backend de Z3 frente a regresiones' },
  'https://github.com/flamapy/flamapy/pull/4': { title: 'Avisé cuando un backend descarta restricciones numéricas', detail: 'PR #4 integrado · sat y bdd ya no dan recuentos como exactos tras ignorar la aritmética sin avisar' },
  'https://github.com/flamapy/fm_metamodel/pull/109': { title: 'Rechacé limpiamente modelos UVL sin característica raíz', detail: 'PR #109 integrado · una FlamaException sustituye al fallo por AttributeError' },
  'https://github.com/flamapy/bdd_metamodel/pull/38': { title: 'Corregí el recuento de grupos de cardinalidad en BDD', detail: 'PR #38 integrado · codifica los límites de grupos con un solo hijo y otros casos no estándar' },
  'https://github.com/Universal-Variability-Language/uvl-parser/pull/81': { title: 'Controlé los atributos muy anidados en Python', detail: 'PR #81 integrado · devuelve un error de sintaxis en lugar de un RecursionError sin capturar' },
  'https://github.com/Universal-Variability-Language/uvl-parser/pull/82': { title: 'Permití espacios al final de archivos UVL', detail: 'PR #82 integrado · Java y JavaScript ahora coinciden con Python al final del archivo' },
  'https://github.com/Universal-Variability-Language/uvl-parser/pull/83': { title: 'Corregí las características tras comentarios de bloque', detail: 'PR #83 integrado · conserva la indentación en Python cuando hay código tras el comentario' },
  'https://github.com/Universal-Variability-Language/uvl-parser/pull/84': { title: 'Corregí los hijos de grupos tras líneas de comentarios', detail: 'PR #84 integrado · corrige la indentación en JavaScript tras una línea de comentario' },
  'tensorflow/tensorflow': { title: 'Corregí un desbordamiento de int16 en GatherNd', detail: 'PR #129560 integrado · rechaza cantidades de índices que desbordan el tipo usado por el núcleo' },
  'EsotericSoftware/kryo': { title: 'Limité la memoria asignada durante la deserialización', detail: 'PR #1284 integrado · valida los tamaños declarados antes de reservar memoria' },
  'J-F-Liu/lopdf': { title: 'Limité el anidamiento de objetos PDF', detail: 'PR #503 integrado · corrige el desbordamiento de pila descrito en RUSTSEC-2026-0187' },
  'py-pdf/pypdf': { title: 'Corregí la recuperación de referencias cruzadas en PDF malformados', detail: 'PR #3841 integrado · evita un UnboundLocalError durante la recuperación' },
};

export const advisoryCopy = {
  'CVE-2026-77429': { title: 'Reserva de memoria sin límites a partir de las dimensiones de un ráster', role: 'Aviso público · investigador acreditado' },
  'CVE-2026-77301': { title: 'Reserva de memoria sin límites a partir del tamaño declarado de un ZIP', role: 'Aviso público · investigador acreditado' },
  'CVE-2026-62297': { title: 'Reserva de memoria sin límites a partir de las dimensiones de un PSD', role: 'Aviso público · investigador acreditado' },
  'CVE-2026-59991': { title: 'Reserva de memoria sin límites con geometría PSD manipulada', role: 'Aviso público · investigador acreditado' },
  'RUSTSEC-2026-0187': { title: 'Desbordamiento de pila por objetos PDF muy anidados', role: 'Vulnerabilidad de RustSec · informe y corrección' },
  'GO-2026-5781': { title: 'Desbordamiento de pila por objetos PDF muy anidados', role: 'Base de datos de vulnerabilidades de Go · investigador acreditado' },
  'RUSTSEC-2026-0192': { title: 'Aviso sobre un paquete sin mantenimiento', role: 'Nota informativa de RustSec · aviso presentado' },
};

export const honorCopy = {
  '2026': { title: 'Google PhD Fellowship', distinction: 'Ingeniería del software y lenguajes de programación', institution: 'Google Research', detail: 'Concedida por mi investigación sobre pruebas de software complejo.' },
  '2023': { title: 'Distinción de honor al Trabajo Fin de Máster', distinction: 'Mejor trabajo', institution: 'Universidad de Sevilla', detail: 'El artículo sobre XatkitSPL está disponible en la biblioteca de SISTEDES.' },
  '2022': { title: 'Distinción de honor al Trabajo Fin de Grado', distinction: 'Entre el 5 % mejor', institution: 'Universidad de Sevilla', detail: 'El artículo sobre WebSPL está disponible en la biblioteca de SISTEDES.' },
};

export const collaborationCopy = {
  'CISPA Helmholtz Center for Information Security': { place: 'Saarbrücken, Alemania', work: 'Fandango, Compás, inyección XML y pruebas basadas en lenguajes' },
  'Max Planck Institute for Security and Privacy': { place: 'Bochum, Alemania', work: 'Generación de pruebas centradas en características con Compás' },
  'University of Seville': { institution: 'Universidad de Sevilla', place: 'Sevilla, España', work: 'Compás, WebSPL, XatkitSPL y líneas de productos software' },
  'TU Graz': { place: 'Graz, Austria', work: 'Análisis de modelos de características en sistemas de recomendación' },
  'Universidad Pablo de Olavide': { place: 'Sevilla, España', work: 'Optimización y algoritmos heurísticos' },
  'LIST · University of Luxembourg': { institution: 'LIST · Universidad de Luxemburgo', place: 'Luxemburgo', work: 'XatkitSPL · generación de chatbots con líneas de productos software' },
  'ZHAW Zurich University of Applied Sciences': { place: 'Winterthur, Suiza', work: 'Fuzzing personalizado para un módulo GNSS' },
};

export const translateRecords = (records, lookup, key) => records.map((record) => ({ ...record, ...lookup[record[key]] }));
