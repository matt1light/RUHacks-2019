const { Client } = require('@elastic/elasticsearch');
const uuid = require('uuid');
const client = new Client({
    node: 'https://search-ruhackswinwin-5jimc7haccje3e7kc3xrcr5qgq.us-east-2.es.amazonaws.com'
  }
);
// const client = new Client({node: 'http://localhost:9200'})

const putUser = (userdata) => {
    client.create({id: uuid(), body: userdata, index: 'people', type: 'person'}).then((data) => {
        console.log('success?')
        console.log(data);
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
}

module.exports = {putUser}