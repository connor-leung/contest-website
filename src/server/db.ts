import { MongoClient } from "mongodb"

import { DATABASE_NAME, MONGODB_URI } from "./config"

let connectedClient;

export const connectClient = async () => {
    if (connectedClient) {
        return connectedClient.db(DATABASE_NAME)
    }

    //creates client
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    await client.db(DATABASE_NAME).command({ ping: 1 })
    console.info("Connected to MongoDB")

    connectedClient = client;

    return client.db(DATABASE_NAME)
}

export const stopClient = async () => {
    await connectedClient?.close();
}

