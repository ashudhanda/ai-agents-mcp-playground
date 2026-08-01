/**
 * 03 — Agent Memory
 * Agents need two kinds of memory:
 *  - Short-term: the conversation / working context (fits in the prompt)
 *  - Long-term: facts stored outside the prompt, retrieved when relevant
 */

// --- Short-term memory: a sliding window of recent messages ---
class ShortTermMemory {
  constructor(maxMessages = 6) {
    this.maxMessages = maxMessages;
    this.messages = [];
  }
  add(role, content) {
    this.messages.push({ role, content });
    // keep only the most recent N messages (context window limit)
    if (this.messages.length > this.maxMessages) this.messages.shift();
  }
  context() {
    return this.messages;
  }
}

// --- Long-term memory: keyword-scored fact store (stand-in for a vector DB) ---
class LongTermMemory {
  constructor() {
    this.facts = [];
  }
  remember(fact) {
    this.facts.push(fact.toLowerCase());
  }
  recall(query, topK = 2) {
    const words = query.toLowerCase().split(/\s+/);
    return this.facts
      .map((fact) => ({
        fact,
        score: words.filter((w) => fact.includes(w)).length,
      }))
      .filter((f) => f.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map((f) => f.fact);
  }
}

// --- Demo ---
const shortTerm = new ShortTermMemory();
const longTerm = new LongTermMemory();

longTerm.remember("User prefers dark mode in every app");
longTerm.remember("User is building a portfolio site with 60fps animations");
longTerm.remember("User codes in JavaScript and Java");

shortTerm.add("user", "Suggest a stack for my portfolio site");

const query = "portfolio site stack";
const recalled = longTerm.recall(query);

console.log("💬 Short-term context:", shortTerm.context());
console.log("🧠 Recalled long-term facts:", recalled);
console.log("\n➡️  Both get injected into the prompt before the LLM answers.");
