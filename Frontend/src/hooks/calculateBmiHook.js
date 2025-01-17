import { GoogleGenerativeAI } from "@google/generative-ai";

async function calculateBmi({
    ht,
    wt,
    gender
}){
    try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });   
        
        let prompt = `
        "Calculate the exact BMI of a ${gender} having height: ${ht} and weight: ${wt} in one line answer. For Example 28.11.

        in another line suggest the person is underweight or overweight
        `;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (e) {
        console.log("Error: ", e.message);
    }
}

export default calculateBmi;