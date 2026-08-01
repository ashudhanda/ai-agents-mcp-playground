/**
 * 02 — Tool Calling
 * How agents expose tools to an LLM: each tool has a name, description,
 * and a JSON schema for its inputs (exactly how OpenAI/Anthropic/MCP do it).
 */

// --- Tool registry: definition + implementation ---
const toolRegistry = {
  get_weather: {
    description: "Get current weather for a city",
    inputSchema: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    },
    handler: ({ city }) => ({ city, temp: 31, condition: "Sunny" }),
  },
  calculate: {
    description: "Evaluate a simple math expression",
    inputSchema: {
      type: "object",
      properties: { expression: { type: "string" } },
      required: ["expression"],
    },
    handler: ({ expression }) => {
      // NOTE: never use eval() in production — this is a demo
      const safe = /^[-+*/().\d\s]+$/.test(expression);
      if (!safe) throw new Error("Unsafe expression");
      return { expression, result: Function(`return (${expression})`)() };
    },
  },
};

// --- Minimal schema validation ---
function validate(schema, args) {
  for (const key of schema.required ?? []) {
    if (!(key in args)) throw new Error(`Missing required arg: ${key}`);
  }
}

// --- Dispatcher: what the agent runtime does when the LLM picks a tool ---
function callTool(name, args) {
  const tool = toolRegistry[name];
  if (!tool) throw new Error(`Unknown tool: ${name}`);
  validate(tool.inputSchema, args);
  return tool.handler(args);
}

// --- Simulate LLM tool calls ---
const llmToolCalls = [
  { name: "get_weather", args: { city: "Delhi" } },
  { name: "calculate", args: { expression: "(1024 * 8) / 2" } },
];

for (const call of llmToolCalls) {
  console.log(`🔧 LLM calls ${call.name}(${JSON.stringify(call.args)})`);
  console.log("   ↳ result:", callTool(call.name, call.args));
}
