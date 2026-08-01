/**
 * 04 — Minimal MCP-style Server (stdio)
 * MCP servers speak JSON-RPC 2.0 over a transport (stdio or HTTP).
 * This is a dependency-free demo showing the two core requests:
 *  - tools/list  → what tools do you have?
 *  - tools/call  → run one of them
 *
 * Try it:
 *   node src/04-mcp-server.js
 *   then paste: {"jsonrpc":"2.0","id":1,"method":"tools/list"}
 *   or:         {"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"echo","arguments":{"text":"hello mcp"}}}
 */

import readline from "node:readline";

const TOOLS = [
  {
    name: "echo",
    description: "Echo back the provided text",
    inputSchema: {
      type: "object",
      properties: { text: { type: "string" } },
      required: ["text"],
    },
  },
  {
    name: "get_time",
    description: "Get the current server time (ISO 8601)",
    inputSchema: { type: "object", properties: {} },
  },
];

function handleToolCall(name, args = {}) {
  switch (name) {
    case "echo":
      return { content: [{ type: "text", text: `Echo: ${args.text}` }] };
    case "get_time":
      return { content: [{ type: "text", text: new Date().toISOString() }] };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function respond(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

function respondError(id, message) {
  process.stdout.write(
    JSON.stringify({ jsonrpc: "2.0", id, error: { code: -32000, message } }) + "\n"
  );
}

const rl = readline.createInterface({ input: process.stdin });
console.error("🔌 MCP-style server listening on stdio...");

rl.on("line", (line) => {
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    return respondError(null, "Parse error: invalid JSON");
  }

  try {
    if (req.method === "tools/list") {
      respond(req.id, { tools: TOOLS });
    } else if (req.method === "tools/call") {
      respond(req.id, handleToolCall(req.params?.name, req.params?.arguments));
    } else {
      respondError(req.id, `Method not found: ${req.method}`);
    }
  } catch (err) {
    respondError(req.id, err.message);
  }
});
