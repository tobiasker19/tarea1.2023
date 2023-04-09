const express = require('express');
const axios = require('axios');
const redis = require('redis');
const responseTime = require('response-time');
const {promisify} = require('util')

//Connecting to redis
const client = redis.createClient({
    host: "localhost",
    port: 6379,
});

const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)

const app = express();

(async () => {
    await client.connect(); 
});

client.on('ready', () => {
    console.log('Connected succesfully');
});

client.on("error", (err) => {
    console.log(`${err}`);
});

app.use(responseTime());

app.get("/games", async (req, res) => {
    try{
         //Response from cache
        const reply = await GET_ASYNC("games");
        if (reply) return res.json(JSON.parse(reply));

        const response = await axios.get(
        "https://www.freetogame.com/api/games"
        );

        await SET_ASYNC("games", JSON.stringify(response.data));
        res.json(response.data);
    } catch (error) {
        console.log(error);
    }
    });

    app.get("/games?:category", async (req, res) => {
        try{
            const reply = await GET_ASYNC(req.params.category);
            //const reply = await GET_ASYNC(req.originalUrl);
            if (reply) return res.json(JSON.parse(reply));    

            const response = await axios.get(
                'https://www.freetogame.com/api/games?' + req.params.category
                );

            await SET_ASYNC(req.params.category, JSON.stringify(response.data)); 
                
            return res.json(response.data);    
        } catch (error) {
            return res.status(error.response.status).json({ message: error.message });
        }
        });    

app.listen(3000);
console.log("Server listen on port 3000");