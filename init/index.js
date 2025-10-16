if(process.env.NODE_ENV != "production") {
    const path = require("path");
    require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
    console.log("Loaded .env variables");
    console.log(process.env.ATLASDB_URL);
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '68f0a2da4707a612e591ea1d'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();