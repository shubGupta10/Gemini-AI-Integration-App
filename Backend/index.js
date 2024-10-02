import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:5173"
}))


app.get("/", (req, res) => {
    res.send("Hello World of AI users");
})

dotenv.config()


const generateAI = async (prompt) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.error(error);
    }
}



app.post("/api/content", async (req, res) => {
    try {
        const data = req.body.question;
        const result = await generateAI(data);
        res.send({
            "result": result
        })
    } catch (error) {
        console.error("Error" + error)
    }
})




app.listen(5000, () => {
    console.log("Server is up and running")
})