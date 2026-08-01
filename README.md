# 🤖 AI Agents + MCP Playground

Hands-on playground for the hottest GitHub topic of 2026: **AI Agents** and the **Model Context Protocol (MCP)**.

Zero dependencies. Just Node.js ≥ 18. Every example runs instantly.

## 📚 Learn (docs)

| # | Doc | What you'll learn |
|---|---|---|
| 1 | [What are AI Agents?](docs/01-what-are-ai-agents.md) | The Observe → Think → Act loop |
| 2 | [MCP Explained](docs/02-mcp-explained.md) | Why MCP is the "USB-C for AI" |
| 3 | [Agent Skills](docs/03-agent-skills.md) | Skills vs Tools vs MCP |

## ⚡ Run (code)

```bash
git clone https://github.com/ashudhanda/ai-agents-mcp-playground.git
cd ai-agents-mcp-playground

npm run agent    # 01 — basic agent loop
npm run tools    # 02 — tool calling with JSON schemas
npm run memory   # 03 — short-term + long-term memory
npm run mcp      # 04 — minimal MCP-style server over stdio
```

### Try the MCP server

```bash
npm run mcp
# then paste:
{"jsonrpc":"2.0","id":1,"method":"tools/list"}
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"echo","arguments":{"text":"hello mcp"}}}
```

## 🗺️ Roadmap

- [x] Basic agent loop
- [x] Tool calling + schema validation
- [x] Agent memory (short-term + long-term)
- [x] Minimal MCP-style server (stdio, JSON-RPC 2.0)
- [ ] Connect to a real LLM API
- [ ] Multi-agent orchestration example
- [ ] Real MCP SDK example (`@modelcontextprotocol/sdk`)

## 📄 License

[MIT](LICENSE) © 2026 Ashu Dhanda
