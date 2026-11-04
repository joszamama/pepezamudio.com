// Talk locations from Pepe's CV, public proceedings, and the 2023 GRAFO blog note.
// The SE 2026 talk appears in the conference's public program.
export const talkStops = [
  {
    id: 'santiago', city: 'Santiago de Compostela', country: 'Spain', year: '2022', lat: 42.88, lon: -8.54,
    talks: [{ event: 'SISTEDES / JISBD 2022', title: 'WebSPL: automatic website generation with software product lines', url: 'https://hdl.handle.net/11705/JISBD/2022/2185' }],
  },
  {
    id: 'ciudad-real', city: 'Ciudad Real', country: 'Spain', year: '2023', lat: 38.98, lon: -3.93,
    talks: [{ event: 'SISTEDES / JISBD 2023', title: 'Optimizing chatbot generation with software product lines', url: 'https://hdl.handle.net/11705/JISBD/2023/9205' }],
  },
  {
    id: 'madrid', city: 'Madrid', country: 'Spain', year: '2023', lat: 40.42, lon: -3.70,
    talks: [{ event: 'GRAFO VI Workshop 2023', title: 'Heuristic algorithms for weighted dominating sets', url: 'https://doi.org/10.1016/j.matcom.2024.09.010' }],
  },
  {
    id: 'vienna', city: 'Vienna', country: 'Austria', year: '2024', lat: 48.21, lon: 16.37,
    talks: [{ event: 'ISSTA 2024', title: 'Shaping Test Inputs in Grammar-Based Fuzzing', url: 'https://doi.org/10.1145/3650212.3685553' }],
  },
  {
    id: 'trondheim', city: 'Trondheim', country: 'Norway', year: '2025', lat: 63.43, lon: 10.40,
    talks: [
      { event: 'FUZZING 2025', title: 'Personalized fuzzing of a GNSS module', url: 'https://doi.org/10.1145/3713081.3731722' },
      { event: 'ISSTA 2025', title: 'Fandango: Evolving Language-Based Testing', url: 'https://doi.org/10.1145/3728915' },
      { event: 'ISSTA 2025', title: 'XAVIER: Grammar-Based Testing for XML Injection Attacks', url: 'https://doi.org/10.1145/3713081.3731736' },
    ],
  },
  {
    id: 'seville', city: 'Seville', country: 'Spain', year: '2025', lat: 37.39, lon: -5.99,
    talks: [{ event: 'INNOSOFT 2025', title: 'Research abroad and Ph.D. life' }],
  },
  {
    id: 'bern', city: 'Bern', country: 'Switzerland', year: '2026', lat: 46.95, lon: 7.45,
    talks: [{ event: 'SE 2026', title: 'Fandango: Evolving Language-Based Testing', url: 'https://se2026.inf.unibe.ch/en/program/' }],
  },
  {
    id: 'daejeon', city: 'Daejeon', country: 'South Korea', year: '2026', lat: 36.35, lon: 127.38,
    talks: [{ event: 'ICST 2026', title: 'Constraint-Driven Fuzzing at Scale with Fandango', url: 'https://doi.org/10.1109/ICST69053.2026.00033' }],
  },
  {
    id: 'montreal', city: 'Montréal', country: 'Canada', year: '2026', lat: 45.50, lon: -73.57,
    talks: [
      { event: 'FSE 2026', title: 'How to test complex systems automatically and systematically', url: 'https://doi.org/10.1145/3803437.3804899' },
      { event: 'SSBSE 2026', title: 'Search-Based Generation of Complex Inputs with Fandango', url: 'https://doi.org/10.1007/978-3-032-30699-9_15' },
    ],
  },
  {
    id: 'munich', city: 'Munich', country: 'Germany', year: '2026', lat: 48.14, lon: 11.58,
    talks: [{ event: 'ASE 2026', title: 'Feature-Focused Test Generation', url: 'https://doi.org/10.1145/3832783.3837479' }],
  },
];

export const mapPosition = ({ lon, lat }) => ({
  x: (lon + 140) / 290 * 100,
  y: (76 - lat) / 66 * 100,
});
