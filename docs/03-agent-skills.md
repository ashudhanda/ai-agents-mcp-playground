# Agent Skills

**Skills** are the newest trend in the agent ecosystem (late 2025 → 2026): instead of hard-coding behavior, you give an agent a *folder of instructions* it loads on demand.

## Anatomy of a skill

```
my-skill/
├── SKILL.md        # instructions + when to use this skill
├── references/     # extra docs the agent can read
└── scripts/        # helper scripts the agent can run
```

## Why skills > giant system prompts

| Giant prompt | Skills |
|---|---|
| Always in context (wastes tokens) | Loaded only when relevant |
| One blob, hard to maintain | Modular, versioned in git |
| Can't ship executable helpers | Bundles scripts + references |

## Skills vs Tools vs MCP

- **Tool** → a single function the model can call (`get_weather`)
- **MCP server** → a standard way to *expose* tools/resources to any client
- **Skill** → *knowledge + procedure*: teaches the agent **how** and **when** to use its tools for a task

## Rule of thumb

> Tools give an agent **hands**, MCP gives it **plugs**, skills give it **training**.
