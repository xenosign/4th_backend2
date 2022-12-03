// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://tetz:qwer1234@cluster0.sdiakr0.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;

// 2.2 ver
// let MongoClient = require('mongodb').MongoClient;

// let uri =
//   'mongodb://tetz:qwer1234@ac-qaewsnn-shard-00-00.sdiakr0.mongodb.net:27017,ac-qaewsnn-shard-00-01.sdiakr0.mongodb.net:27017,ac-qaewsnn-shard-00-02.sdiakr0.mongodb.net:27017/?ssl=true&replicaSet=atlas-11lsyw-shard-0&authSource=admin&retryWrites=true&w=majority';

// const client = MongoClient.connect(uri);
