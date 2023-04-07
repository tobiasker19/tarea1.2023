const axios = require('axios');
const url = 'https://www.freetogame.com/api-doc';
const getData = async url => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}
getData(url);