import { teams } from './teams.js'

import Eurocup from './Classes/Eurocup.js'

// const teamNames = Eurocup2020.teams.map(function (equipo) {
//     return equipo.name
// });

// teamNames.forEach(teamName => {
//     console.log(teamName)
// })

const Eurocup2020 = new Eurocup('Eurocup 2020', teams);

console.log('===================================');
console.log('==== Comienza la Eurocopa 2020 ====');
console.log('=================================== \n');

console.log('Equipos participantes Playoffs \n');

console.table(teams);

Eurocup2020.scheduleTournament();


// console.log(Eurocup2020.RoundOf);
