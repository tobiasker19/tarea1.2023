const axios = require('axios');
const platform = 'pc';
const url = `https://www.freetogame.com/api/games?platform=${platform}`;
const getData = async url => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}
getData(url);
