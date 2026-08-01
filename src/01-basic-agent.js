/**
 * 01 — Basic Agent Loop
 * The simplest possible agent: Observe → Think → Act → Repeat.
 * No API key needed — the "LLM" here is mocked so you can see the loop clearly.
 */

// --- Mock LLM: decides the next action based on state ---
function llmThink(goal, history) {
  if (history.length === 0) {
    return { action: "plan", input: goal };
  }
  if (history.length === 1) {
    return { action: "work", input: "execute step 1 of plan" };
  }
  return { action: "finish", input: "goal completed" };
}

// --- Tools the agent can use ---
const tools = {
  plan: (input) => `Plan created for: "${input}"`,
  work: (input) => `Did work: ${input}`,
  finish: (input) => `DONE: ${input}`,
};

// --- The agent loop ---
async function runAgent(goal) {
  const history = [];
  console.log(`\n🎯 Goal: ${goal}\n`);

  while (true) {
    // 1. THINK — ask the LLM what to do next
    const decision = llmThink(goal, history);
    console.log(`🧠 Think → action=${decision.action}`);

    // 2. ACT — run the chosen tool
    const result = tools[decision.action](decision.input);
    console.log(`⚡ Act   → ${result}`);

    // 3. OBSERVE — record the result
    history.push({ decision, result });

    if (decision.action === "finish") break;
  }

  console.log(`\n✅ Agent finished in ${history.length} steps.`);
}

runAgent("Summarize today's trending GitHub repos");
