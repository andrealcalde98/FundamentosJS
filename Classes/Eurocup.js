export default class Eurocup {
    constructor(name, teams = []) {
        this.name = name;
        this.Matches = [];
        this.NextRound = [];
        this.losers = []; // array para 3r y 4to puesto
        this.setupTeams(teams);
    }

    random() {
        return Math.floor(Math.random() * (6 - 0)) + 0;
    }

    setupTeams(teamNames) {
        this.teams = [];
        for (const teamName of teamNames) {
            const team = this.customizeTeam(teamName);
            this.teams.push(team);
        }
    }

    customizeTeam(teamName) {
        return {
            name: teamName,
        }
    }

    scheduleTournament() {
        const round = ["OCTAVOS", "QUARTOS", "SEMIS", "FINAL!",];

        for (let i = 0; i < 4; i++) {
            if (i === 3) {
                // Ronda Final, donde muestra el campeón
                console.log("\n " + round[i] + " \n =========\n");
                this.FinalRoundConfig();
            } else if (i === 2) {
                // Ronda Semis, donde calcula el tercer y cuarto puesto
                console.log("\n " + round[i] + " \n =========\n");
                this.SemisConfig();
            } else {
                // Otras rondas sin configuración previa
                console.log("\n " + round[i] + " \n =========\ \n");
                this.OtherRoundConfig();
            }
        }
    }

    FinalRoundConfig() {
        this.initSchedule(); // crea la tabla con las celdas vacías (template {home: 'Home', away: 'Away'})
        this.setLocalTeams(); // hace un set de cada partido.home
        this.setAwayTeams(); // hace un set de cada partido.away
        this.setResult(); // simulamos el partido y lo repetimos si hace falta
        this.setWinner(); // setea los ganadores              
        this.ShowFinalist(); // muestra el Campeon en la ultima ronda
        this.SetTeamsNextRound(); //vacia el array y lo prepara para la siguiente ronda
    }

    SemisConfig() {
        this.initSchedule(); // crea la tabla con las celdas vacías (template {home: 'Home', away: 'Away'})
        this.setLocalTeams(); // hace un set de cada partido.home
        this.setAwayTeams(); // hace un set de cada partido.away
        this.setResult(); // simulamos el partido y lo repetimos si hace falta
        this.setWinner(); // setea los ganadores     
        this.ShowSemifinalist(); // muestra el tercer puesto
        this.SetTeamsNextRound(); //vacia el array y lo prepara para la siguiente ronda
    }

    OtherRoundConfig() {
        this.initSchedule(); // crea la tabla con las celdas vacías (template {home: 'Home', away: 'Away'})
        this.setLocalTeams(); // hace un set de cada partido.home
        this.setAwayTeams(); // hace un set de cada partido.away
        this.setResult(); // simulamos el partido y lo repetimos si hace falta
        this.setWinner(); // setea los ganadores
        this.SetTeamsNextRound(); //vacia el array y lo prepara para la siguiente ronda
    }

    initSchedule() {
        const numberOfMatches1Round = this.teams.length / 2; // numero de partidos por ronda
        const Quali = 1; //un partido por cada manga "tie" -> Q1, Q2
        let y = 0;

        for (let i = 0; i < numberOfMatches1Round; i++) {
            // const tie = []; // matchDay ===> jornada
            y++;
            const match = {
                tie: `Q${y}`,
                home: 'Home',
                away: 'Away',
                homeGoals: 0,
                awayGoals: 0,
                winner: 'winner'
            }
            this.Matches.push(match);

        }
    }

    setLocalTeams() {
        const teamNames = this.teams.map(team => team.name); // array de nombres de los equipos
        let teamIndex = 0; // rellena
        const maxHomeTeams = this.teams.length / 2 - 1; // rellenamos los locales por ronda

        // teams.length === 16 (depende de la ronda)
        // debemos rellenar x espacios para los locales

        this.Matches.forEach(match => {
            match.home = teamNames[teamIndex];
            teamIndex++;
            if (teamIndex > maxHomeTeams) {
                teamIndex = 0;
            }
        })
    }


    setAwayTeams() {
        const teamNames = this.teams.map(team => team.name); // array de nombres de los equipos
        let teamIndex = this.teams.length - 1; // comemzamos por el final, "ganador primera llave vs ganador última llave"
        const maxAwayTeams = this.teams.length / 2; //llegamos hasta la ultima posicion a rellenar, la mitad del array

        // teams.length === 16
        // debemos rellenar 8 espacios para los visitantes

        this.Matches.forEach(match => {
            match.away = teamNames[teamIndex];
            teamIndex--;
            if (teamIndex < maxAwayTeams) {
                teamIndex = 0;
            }
        })
    }

    setResult() {
        this.Matches.forEach(match => {
            do {   // repetimos el partido hasta que no haya empate
                match.homeGoals = this.random();
                match.awayGoals = this.random();
            } while (match.homeGoals == match.awayGoals);
        })
    }

    setWinner() {
        this.Matches.forEach(match => {
            if (match.homeGoals > match.awayGoals) {
                match.winner = match.home;
                // const winnerTeam = this.teams.filter(team => team.name === match.winner)[0];
                this.NextRound.push(match.winner);
                console.log(`${match.home} ${match.homeGoals} - ${match.awayGoals} ${match.away} | Ganador -> ${match.winner}`)
            } else {
                match.winner = match.away;
                // const winnerTeam = this.teams.filter(team => team.name === match.winner)[0];
                this.NextRound.push(match.winner);
                console.log(`${match.home} ${match.homeGoals} - ${match.awayGoals} ${match.away} | Ganador -> ${match.winner}`)
            }
        })
    }

    ShowSemifinalist() {
        let loser1Goals = 0;
        let loser2Goals = 0;
        let numero = 0; // numero que indicara cual de los dos equipos del array es el ganador

        this.Matches.forEach(match => {  // recuperamos perdedores para el tercer y cuarto puesto
            if (match.homeGoals > match.awayGoals) {
                this.losers.push(match.away);
            } else {
                this.losers.push(match.home);
            }
        })

        do {   // repetimos el partido hasta que no haya empate
            loser1Goals = this.random();
            loser2Goals = this.random();
        } while (loser1Goals == loser2Goals);

        // devolvemos la posicion del equipo que gana
        if (loser1Goals > loser2Goals) {
            numero = 0;
        } else {
            numero = 1;
        }

        console.log("\n " + "TERCER PUESTO" + " \n =========\ \n");

        // pintamos por pantalla equipos, resultado y ganador
        console.log(`${this.losers[0]} ${loser1Goals} - ${loser2Goals} ${this.losers[1]} | Ganador -> ${this.losers[numero]}`)
    }

    ShowFinalist() {
        this.Matches.forEach(match => {
            console.log(`\n==========================================`);
            console.log(`=== ${match.winner} Campeona de la Euro 2020 ===`);
            console.log('==========================================');
        })
    }

    SetTeamsNextRound() {
        this.teams = [] //vaciamos teams
        this.teams = this.NextRound.slice(); // pasamos a teams los ganadores de la ronda
        this.Matches = []; // vaciamos array de partidos para la siguinte ronda
        this.NextRound = []; // vaciamos array para ganadores
        this.setupTeams(this.teams);
        // console.log(this.teams);
    }
}