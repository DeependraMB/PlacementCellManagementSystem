//  Gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { json } = require("express");
const dotenv = require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


async function gemini(applicantResume) {


  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Evaluate the provided resume. It is the fresher resume with no experience and provide a score out of 100. Additionally, highlight any missing elements in the resume and suggest relevant additions.

    Applicant's Resume:
    ${applicantResume}

    Response Format Must be like this content must be chang based on the resume:
    {
      "score": "0-100",
      "missing": [
        "- Point 1.",
        "- Point 2.",
        "- Point 3.",
        "- Point 4.",
        "- Point 5.",
        "- Point 6."
      ],
      "add": [
        "- Point 1.",
        "- Point 2.",
        "- Point 3.",
        "- Point 4.",
        "- Point 5.",
        "- Point 6."
      ]
    }`;

   

  const result = await model.generateContent(prompt);

  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}
module.exports = { gemini };