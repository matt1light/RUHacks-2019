const VALUE_OFF_RENT = {
    bathroom: 20,
    cook: 10,
    dishes: 5,
    drive: 5,
    driveway: 10,
    feed_pets: 2,
    groceries: 5,
    laundry: 25,
    mop: 20,
    mow_lawn: 10,
    plants: 30,
    trash: 5,
    vacuum: 20,
    walk_pets: 5,
}

const FREQUENCY = {
    bathroom: 2,
    cook: 15,
    dishes: 30,
    drive: 6,
    driveway: 2,
    feed_pets: 30,
    groceries: 2,
    laundry: 2,
    mop: 4,
    mow_lawn: 2,
    plants: 1,
    trash: 4,
    vacuum: 4,
    walk_pets: 30,
}

const VALUE_OFF_RENT_1 = {
    bathroom: 5,
    cook: 5,
    dishes: 2,
    drive: 2,
    driveway: 4,
    feed_pets: 1,
    groceries:3,
    laundry: 5,
    mop: 5,
    mow_lawn: 4,
    plants: 1,
    trash: 3,
    vacuum: 5,
    walk_pets: 2,
}

const FREQUENCY_1 = {
    bathroom: 2,
    cook: 15,
    dishes: 30,
    drive: 6,
    driveway: 2,
    feed_pets: 30,
    groceries: 2,
    laundry: 2,
    mop: 4,
    mow_lawn: 2,
    plants: 30,
    trash: 4,
    vacuum: 4,
    walk_pets: 30,
}

let sum = 0

let BaseRent = 1000;

Object.keys(VALUE_OFF_RENT).forEach((key) => {
    sum += VALUE_OFF_RENT[key] * FREQUENCY[key];
})

let rent = BaseRent - sum;
console.log(rent);