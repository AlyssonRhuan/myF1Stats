import { Alert } from 'react-native';
import api from './api';

const GLOBAL = require('../Global');
const FIRST_YEAR_F1 = 1950;

export async function getConstructors(year, setConstructors) {
    try {
        setConstructors(undefined);
        let response = await api.get((year == undefined ? GLOBAL.YEAR : year) + '/constructorStandings.json');
        setConstructors(
            response.data.MRData.total > 2 ? [
                response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0],
                response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[1],
                response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[2]
            ] : []);
    }
    catch (e) {
        error(e);
    }
}

export async function getYearContent(year, setYearContent) {
    try {
        setYearContent(undefined);
        const url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=' + (year == undefined ? GLOBAL.YEAR : year) + '_Formula_One_season';
        let response = await api.get(url);
        let keys = Object.keys(response.data.query.pages);
        setYearContent(response.data.query.pages[keys[0]].extract)
    }
    catch (e) {
        error(e);
    }
}

export async function getPilots(year, setPilots) {
    try {
        setPilots(undefined)
        let response = await api.get((year == undefined ? GLOBAL.YEAR : year) + '/driverStandings.json');
        setPilots([
            response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0],
            response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[1],
            response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[2]
        ]);
    }
    catch (e) {
        error(e);
    }
}

export function onSelectYear(year, setSelectedYear, setConstructors, setPilots, setYearContent, setNextRace) {
    setConstructors(undefined);
    setPilots(undefined);
    setYearContent(undefined);
    setNextRace(undefined);

    GLOBAL.YEAR = year;
    setSelectedYear(year)

    getConstructors(year, setConstructors);
    getPilots(year, setPilots);
    getYearContent(year, setYearContent);
    getNextRace(setNextRace);
}

export function getYears(setYears) {
    const currentYear = new Date().getFullYear();
    var yearsArray = [];
    for (var i = currentYear; i >= FIRST_YEAR_F1; i--) {
        yearsArray.push(i);
    }
    setYears(yearsArray);
}

export async function getNextRace(setNextRace) {
    try {
        let response = await api.get('current/last/results.json');
        let nextRound = (response.data.MRData.RaceTable.Races[0].round - 1) + 2;
        let currentSeason = response.data.MRData.RaceTable.Races[0].season;
        let nextRace = undefined;

        if (currentSeason == GLOBAL.YEAR) {
            response = await api.get(GLOBAL.YEAR + '.json');
            response.data.MRData.RaceTable.Races.map((circuit, key) => {
                if (circuit.round == nextRound) {
                    nextRace = circuit;
                }
            });
        }

        setNextRace(nextRace === undefined ? 'FINISHED_SEASON' : nextRace);
    }
    catch (e) {
        error(e);
    }
}

export function error(e) {
    console.error(e.response ? e.response.data.message : e.message);
}