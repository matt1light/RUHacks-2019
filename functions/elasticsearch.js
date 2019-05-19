const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: 'https://search-ruhackswinwin-5jimc7haccje3e7kc3xrcr5qgq.us-east-2.es.amazonaws.com'
  }
);
// const client = new Client({node: 'http://localhost:9200'})

const putPerson = (body, id, index, type) => {
    client.create({id, body, index, type}).then((data) => {
        return true;
    }).catch((error) => {
        console.log(error);
        console.log(error.meta.body.error)
        return false;
    });
}

const deletePerson = (id, index, type) => {
    client.delete({id, index, type}).then((data)=> {
        console.log(data);
        return true;
    }).catch((error) => {
        console.log(error);
        console.log(error.meta.body.error)
        return false;
    })
}

module.exports = {putPerson, deletePerson}