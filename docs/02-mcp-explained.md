# MCP — Model Context Protocol

**MCP** is an open protocol (by Anthropic, late 2024) that standardizes how AI models connect to external tools and data.

Think of it as **"USB-C for AI"** — one plug, works everywhere.

## The problem it solves

Before MCP: every app wrote custom glue code for every tool.

```
N apps × M tools = N×M custom integrations 😵
```

After MCP:

```
N apps + M tools = each implements MCP once ✅
```

## Architecture

```
┌────────────┐      ┌────────────┐      ┌────────────┐
│  MCP Host  │ ──▶ │ MCP Client │ ──▶ │ MCP Server │
│ (Claude,   │      │ (protocol  │      │ (your tool:│
│  IDE, app) │      │  handler)  │      │  DB, API..)│
└────────────┘      └────────────┘      └────────────┘
```

## Core primitives

| Primitive | What it is | Example |
|---|---|---|
| **Tools** | Functions the model can call | `search_files`, `run_query` |
| **Resources** | Data the model can read | file contents, DB rows |
| **Prompts** | Reusable prompt templates | "summarize this repo" |

## Transports

- **stdio** — local servers (spawned as child process)
- **Streamable HTTP** — remote servers

See a working example: [`src/04-mcp-server.js`](../src/04-mcp-server.js)
