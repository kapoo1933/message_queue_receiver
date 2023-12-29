import { MongoClient, ServerApiVersion, Collection } from 'mongodb';
import 'dotenv/config';

const URI = process.env.DB_CONN_STRING;
/**
 * create a new database client shared throughout the application
 */
const db_client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export { db_client };