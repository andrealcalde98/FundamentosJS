export default class Eurocup {
    constructor(name, teams = []) {
        this.name = name;
        this.RoundOf16 = [];
        this.setupTeams(teams);

    }

    random() {
        return Math.floor(Math.random() * (10 - 0)) + 0;
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
            matchesWon: 0,
            matchesDraw: 0,
            matchesLost: 0
        }
    }

    scheduleRound() {
        this.initSchedule(); // crea la tabla con las celdas vacías (template {home: 'Home', away: 'Away'})
        this.setLocalTeams(); // hace un set de cada partido.home
        this.setAwayTeams(); // hace un set de cada partido.away
        this.setResult(); // simulamos el partido y lo repetimos si hace falta
        this.setWinner(); // muestra el ganador

    }

    initSchedule() {
        const numberOfMatches1Round = this.teams.length / 2; // numero de partidos por ronda "8"
        const Quali = 1; //un partido por cada manga "tie" -> Q1, Q2
        let y = 0;

        for (let i = 0; i < numberOfMatches1Round; i++) {
            const tie = []; // matchDay ===> jornada
            y++;
            for (let j = 0; j < Quali; j++) {
                const match = {
                    tie: `Q${y}`,
                    home: 'Home',
                    away: 'Away',
                    homeGoals: 0,
                    awayGoals: 0,
                    winner: 'winner'
                };
                tie.push(match);
            }
            // ya tenemos todos los partidos de una jornada
            this.RoundOf16.push(tie) // añadimos la jornada a la planificación
        }

    }

    setLocalTeams() {
        const teamNames = this.teams.map(team => team.name); // array de nombres de los equipos
        let teamIndex = 0; // rellena
        const maxHomeTeams = this.teams.length / 2 - 1; // llegamos hasta la posicion 7

        // teams.length === 16
        // debemos rellenar 8 espacios para los locales

        this.RoundOf16.forEach(tie => {
            tie.forEach(match => {
                match.home = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0;
                }
            })
        })
    }


    setAwayTeams() {
        const teamNames = this.teams.map(team => team.name); // array de nombres de los equipos
        let teamIndex = 8; // rellenamos a traves de la segunda mitad
        const maxAwayTeams = this.teams.length; //llegamos hasta la posicion 16

        // teams.length === 16
        // debemos rellenar 8 espacios para los visitantes

        this.RoundOf16.forEach(tie => {
            tie.forEach(match => {
                match.away = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > maxAwayTeams) {
                    teamIndex = 0;
                }
            })
        })
    }

    setResult() {
        this.RoundOf16.forEach(tie => {
            tie.forEach(match => {
                match.homeGoals = this.random();
                match.awayGoals = this.random();
                while (match.homeGoals == match.awayGoals) {
                    match.awayGoals = this.random();
                }
            })
        })
    }

    setWinner() {

        this.RoundOf16.forEach(tie => {
            tie.forEach(match => {
                if (match.homeGoals > match.awayGoals) {
                    match.winner = match.home;
                } else
                    match.winner = match.away;
            })
        })



    }
















}