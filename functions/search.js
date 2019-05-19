const request = require("request");

const getMatch = (student) => { 
    const promise = new Promise((resolve, reject) => {
        const options = { method: 'POST',
        url: 'https://search-ruhackswinwin-5jimc7haccje3e7kc3xrcr5qgq.us-east-2.es.amazonaws.com/people/_search',
        headers: 
        { 'postman-token': 'd1a1f04a-8b2a-2e72-5751-49672590a19c',
            'cache-control': 'no-cache',
            'content-type': 'application/json' },
        body: 
        { query: 
            { bool: 
                { should: 
                    [ 
                    { match: { 'tasks.trash': student.tasks.trash } },
                    { match: { 'tasks.dishes': student.tasks.dishes } }, 
                    { match: { 'tasks.vacuum': student.tasks.vacuum } },
                    { match: { 'tasks.cook': student.tasks.cook } }, 
                    { match: { 'tasks.drive': student.tasks.drive } },
                    { match: { 'tasks.feed_pets': student.tasks.feed_pets } }, 
                    { match: { 'tasks.walk_pets': student.tasks.walk_pets } },
                    { match: { 'tasks.bathroom': student.tasks.bathroom } }, 
                    { match: { 'tasks.groceries': student.tasks.groceries } },
                    { match: { 'tasks.mop': student.tasks.mop } }, 
                    { match: { 'tasks.plants': student.tasks.plants } },
                    { match: { 'tasks.mow_lawn': student.tasks.mow_lawn } }, 
                    { match: { 'tasks.driveway': student.tasks.driveway } },
                    { match: { 'school': student.school.toLowerCase()} },
                ],
                filter: [
                    {
                        term: {city: student.city.toLowerCase()}
                    },
                    {
                        term: {class: 'senior'}
                    }
                ]
                } 
            } 
        },
    json: true };

    request(options, (error, response, body) => {
        if (error) reject(new Error(error));

        console.log(body);
        resolve(body.hits.hits);
    }
    )
    }
)
        return promise;
};

module.exports = {getMatch};