import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-mini";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: process.env.GITHUB_TOKEN
});

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("🌧️ Rainwater Recharge Assistant Backend is running!");
});

// STEP 1: Feasibility Check
app.post("/api/feasibility", async (req, res) => {
  try {
    const { area, rainfall, avlarea, groundwater, runoff,infiltration } = req.body;
    // const prompt = `
    //   You are a rainwater recharge expert.
    //   Given the following information:
    //   - Plot area: ${area} sqm
    //   - Annual rainfall: ${rainfall} mm
    //   - Location: ${location}
    //   - Soil Type: ${soilType || "not provided"}
    //   Determine if building a rainwater recharge tank is feasible.
    //   Give a short YES/NO answer and a concise reasoning.
    // `;
    const prompt = `
        You are an environmental engineer.  
Given site data, decide if a rainwater recharge tank is feasible.  

Normalize these inputs which are values of x:  
- area = ${area}÷ 1000  
- rain = ${rainfall} ÷ 2000  
- land = ${avlarea} ÷ 500  
- gw = 1 – ${groundwater} ÷ 20  
- runoff = ${runoff}

Weights & bias:  
- rain 0.18, area 0.15, runoff 0.08, gw 0.12, land 0.08,  
  bias –0.05  

Score formula: S = Σ(weights · x) + bias  

Decision thresholds:  
- S ≥ 0.4 → Feasible  
- 0.35 ≤ S < 0.5 → Marginal  
- S < 0.35 → Not feasible  
Don't show the calculations 
Output requirements:  
1. A short natural-language recommendation for humans (1–2 sentences).  
2. A compact JSON with:  
   - "score": S  
   - "decision": "Feasible", "Marginal", or "Not feasible"  
   - "confidence": 0–1  
   - "key_factors": 2–3 most important contributors  
   - "summary": ≤60 words explanation`;
    const completion = await client.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: "You are an expert in rainwater harvesting." },
        { role: "user", content: prompt }
      ]
    });
    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// STEP 2: Cost Estimation
app.post("/api/cost", async (req, res) => {
  try {
    const { area, rainfall, avlarea,groundwater,infiltration } = req.body;
    const prompt = `
      You are an engineer estimating rainwater recharge tank costs in India.
Given site data (area, rainfall, structure type if suggested earlier), provide approximate construction cost and cost range.
Use typical rates:
- area = ${area}
- rainfall = ${rainfall} 
- land = ${avlarea} 
- gw =  ${groundwater} 
- runoff_coeff = 0.8
•	Excavation ₹300–600/m³
•	Gravel/filter media ₹2,500–5,000/m³
•	RCC lining ₹7,000–12,000/m³
•	Filters & first flush ₹2,000–6,000 (lump)
•	Labour & misc ₹5,000–20,000
Follow these rules:
1.	Estimate total recharge volume = area × rainfall × runoff_coeff × 0.001 × 0.4 (capture fraction).
2.	Choose structure type: 
o	Pit/trench if ${infiltration} ≥ 0.3 and groundwater < 10 m
o	Shaft if limited space or deep water table
3.	Estimate total cost (INR) by scaling volume and structure type.
4.	Return concise JSON: 
5.	{
6.	  "structure_type": "Recharge Pit",
7.	  "estimated_cost_inr": 75000,
8.	  "cost_range_inr": "70,000–90,000",
9.	  "reasoning": "Moderate size pit with standard filter and lining."
}

    `;
    const completion = await client.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: "You are an expert in rainwater harvesting cost estimation." },
        { role: "user", content: prompt }
      ]
    });
    res.json({ cost: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// STEP 3: Maintenance Cost
app.post("/api/maintenance", async (req, res) => {
  try {
    const { area, rainfall, location } = req.body;
    const prompt = `
      For a rainwater recharge tank on a ${area} sqm plot in ${location} with ${rainfall} mm annual rainfall,
      estimate the yearly maintenance cost. Give a concise estimate.
    `;
    const completion = await client.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: "You are an expert in rainwater harvesting maintenance." },
        { role: "user", content: prompt }
      ]
    });
    res.json({ maintenance: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
