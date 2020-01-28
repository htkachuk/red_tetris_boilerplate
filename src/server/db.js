const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

class DatabaseInstance {
    client;
    db;
    async constructor(){
        this.client = new MongoClient(url, {useNewUrlParser: true});
        const dbName = "red_tetris";
        await client.connect();
        this.db = client.db(dbName);
    }

    async getUser(req, res) {
        let users = this.db.collection("users");
        let result = await users.findOne({login: req.body.login});
        res.json({ result: result});
    
    }

    async createUser(req, res) {
        let users = this.db.collection("users");
        if (await users.findOne({login: req.body.login}) !== None) {
            res.json({ error: "user exists"});
        } else {
            let user = {
                login: req.body.login,
                password: req.body.password,
                totalScore: 0
            };
            let result = await users.insertOne(user);
            res.json({ result: result['ops']});
        }
    }
    
    async updateUser(req, res) {

    }

    async deleteUser(req, res) {
        let users = this.db.collection("users");
        let result = await users.findOneAndDelete({login: req.body.login});
        res.json({ result: result});
    }
    async getRoom(req, res) {
        let rooms = this.db.collection("rooms");
        let result = await rooms.findOne({name: req.body.name});
        res.json({ result: result});
    }
    
    async createRoom(req, res) {
        let rooms = this.db.collection("rooms");
        if (await rooms.findOne({name: req.body.name}) !== None) {
            res.json({ error: "user exists"});
        } else {
            let room = {
                name: req.body.mame,
                participants: []
            };
            let result = await rooms.insertOne(room);
            res.json({ result: result['ops']});
        }
    }
    
    async updateRoom(req, res) {}

    async deleteRoom(req, res) {
        let rooms = this.db.collection("rooms");
        let result = await rooms.findOneAndDelete({name: req.body.name});
        res.json({ result: result});
    }
}

const databaseInstance = new DatabaseInstance();
Object.freeze(databaseInstance);

export default databaseInstance;
