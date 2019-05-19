const rentCalc = require('./rent');
const search = require('./search');

// student

// const populateMatches = (student) => {
//     console.log('matches are being made for student', student);
//     const matches = search.getMatch(student);
//     console.log('matches were found with esearch', matches);
//     const matchObjects = matches.map(element => ({
//         id: element._source.id,
//         rent: rentCalc.getRent(student.tasks, element._source.base_rent),
//         selected: false
//     }));
//     console.log('match objects are populated', matchObjects);
//     return matchObjects;
// }


    const prepMatches = (matches) => {
        const promise = new Promise((resolve, reject)=>{
            // console.log('matches are being made for student', student);
            // const matches = search.getMatch(student);
            // console.log('matches were found with esearch', matches);
            resolve(matches).catch((error)=> reject(error));
        })
        return promise;
    }


    const populateMatches = ({matches, student}) => {
        const promise = new Promise((resolve, reject)=>{
            const matchObjects = matches.map(element => ({
                id: element._source.id,
                rent: rentCalc.getRent(student.tasks, element._source.base_rent),
                selected: false
            }))
            console.log('match objects are populated', matchObjects);
            resolve(matchObjects).catch((error) => reject(error));
        });
        return promise;
    }

module.exports = {populateMatches, prepMatches}


// match
// iterate through matches
    // calculate rent for each one
    // format an object for each
// send an api call to firestore to add the new fields
    // id of match,
    // rent,
    // selected initially false