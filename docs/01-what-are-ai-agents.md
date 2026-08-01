# What are AI Agents?

An **AI agent** is a program that uses an LLM as its "brain" to decide *what to do next* — not just generate text.

## The core loop

```
Observe → Think → Act → Repeat
```

1. **Observe** — read the user request + current context
2. **Think** — the LLM plans the next step
3. **Act** — call a tool (search, run code, hit an API)
4. **Repeat** — feed the result back until the goal is done

## Agent vs plain chatbot

| Chatbot | Agent |
|---|---|
| Answers in one shot | Works in loops |
| No tools | Calls tools/APIs |
| Stateless | Has memory & goals |
| "Tell me" | "Do it for me" |

## Why agents exploded in 2025–2026

- Models got good at **function/tool calling**
- **MCP (Model Context Protocol)** standardized how agents talk to tools
- Frameworks made multi-step planning reliable

Next: [MCP explained →](./02-mcp-explained.md)
