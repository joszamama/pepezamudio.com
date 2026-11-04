// Public-facing Spanish copy for records shared by the English and Spanish pages.
export const projectCopy = {
  Fandango: { kind: 'Fuzzing basado en lenguajes', description: 'Genera pruebas a partir de gramáticas, restricciones escritas en Python y búsqueda evolutiva.', label: 'Herramienta de código abierto' },
  'Compás': { kind: 'Pruebas centradas en características', description: 'Un prototipo que acota una gramática a las características que se quieren poner a prueba.', label: 'Herramienta de código abierto' },
  Fanbase: { kind: 'Especificaciones reutilizables', description: 'Una colección pública de especificaciones de formatos para Fandango, con una herramienta para encontrarlas e instalarlas.', label: 'Herramienta de código abierto' },
};

export const contributionCopy = {
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
