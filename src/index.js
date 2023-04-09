const express = require("express");
const axios = require("axios");
const redis = require("redis");
const responseTime = require("response-time");
const app = express();

//Connecting to redis
const client = redis.createClient({
    host: "localhost",
    port: 6379,
});

(async () => {
    await client.connect(); 
});


client.on("ready", () => {
    console.log("Connected succesfully");
});

client.on("error", (err) => {
    console.log(err);
});

app.use(responseTime());

app.get("/games", async (req, res) => {
    const response = await axios.get("https://www.freetogame.com/api/games");

    client.set('games', JSON.stringify(response.data), (err, reply) => {
        if (err) console.log(reply);

        console.log(reply);

        res.json(response.data);
    });
});


app.listen(3000);
console.log("Server listen on port 3000");