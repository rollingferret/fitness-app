// import OpenAI from "openai";
// import dotenv from "dotenv";
// import https from 'https';
const https = require('https');


// import OpenAI from "openai";
// import AWS from 'aws-sdk';


const OpenAI = require("openai");
const AWS = require('aws-sdk');
const dotenv = require("dotenv");
dotenv.config();

const awsKey = process.env.AWS_ACCESS_KEY_ID;
const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    accessKeyId: awsKey,
    secretAccessKey: awsSecretKey
 });

 const BucketName = "socrates-quiz-covers";






const key = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey: key });



async function getquiz(topic, level) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant who takes a user supplied topic and proficiency level (beginner, intermediate or advanced) as input and generates a JSON output of a quiz made up of 10 questions. The quiz JSON output will have three keys.  The three keys are title, user and questionsArray.  You will create a title value and the value for the user key will be an empty string.  The questionsArray is where in the JSON output the 10 questions will be placed.  Under the questionsArray key, each question is an object with four keys.  The four keys are question, options, answer and response.  The response key will have a value of an empty string.  The options key's value is an array with four possible answers to the question from a through d.  All options must have a letter a through d.  The answer key's value will appear exactly as the correct option including both the letter from a through d and the description associated with it." }, {role: "user", content: `topic: ${topic}, level: ${level}`}],
        model: "gpt-3.5-turbo-1106",
        response_format: {type: "json_object"}
    });


    return completion.choices[0]
}

const getCoverImage = async (topic) => {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `A picture describing topic ${topic}. use vector style  `,
        n: 1,
        size: "1024x1024",
        response_format: "url"
      });

    const url = response.data[0].url;
    const Key = `public/${topic}.jpg`

    return new Promise((resolve,reject)=>{
        https.get(url, (res) => {
            const s3Params = {
               Bucket: BucketName,
               Key: Key,
               Body: res
            };
            s3.upload(s3Params, (err,data) => {
                if (err) {
                reject(err);

                } else {
                resolve (data.Location)
               // return data.Location;
                }
            })
        })


    })


}







module.exports = {getquiz, getCoverImage}
