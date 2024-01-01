import express from "express"
import cors from "cors"

import { connectClient } from "./db";

const router = express.Router();
router.use(cors())
router.use(express.json())

router.get("/contests", async (req, res) => {
    const client = await connectClient()

   const contests = await client
        .collection("contests")
        .find()
        .project({
            id: 1,
            categoryName: 1,
            contestName: 1,
            _id: 0,
        })
        .toArray();

    res.send({contests})
})

router.get("/contests/:contestId", async (req, res) => {
    const client = await connectClient()

    const contest = await client
        .collection("contests")
        .find({ od: req.params.contestId })

    res.send({ contest })
})

router.post("/contests/:contestId", async (req, res) => {
    const client = await connectClient()
  
    const { newnameValue } = req.body

    const doc = await client
        .collection("contests")
        .findOneAndUpdate(
            { id: req.params.contestId },
            {
                $push: {
                    names: {
                        id: newnameValue.toLowerCase().replace(/\s/g, "-"),
                        name: newnameValue,
                        timestamp: new Date(),
                    },
                },
            },
            { returnDocument: "after" },
        )
    //doc.value
    res.send( { updateContest: doc.value })

})

router.post("/contest/", async (req,res) => {
    const { contestName, categoryName, description } = req.body

    const client = await connectClient()
    const doc = await client.collection("contests").insertOne({
        id: contestName.toLowerCase().replace(/\s/g, "."),
        contestName, 
        categoryName,
        description,
        names: [],
    })

    const constest = await client
        .collection('"contests')
        .findOne({ _id: doc.insertedId})
})

export default router