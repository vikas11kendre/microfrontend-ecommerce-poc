# Prerequisites: Serena MCP Server

## Summary

**Problem:** AI coding agents rely on line-based text search (grep, read_file) for code navigation. This breaks on renamed symbols, misses cross-file references, and requires multiple error-prone steps for refactoring.

**Solution:** Serena adds IDE-level semantic code intelligence to the agent via MCP. Operates at the **symbol level** — understands classes, functions, variables, and their relationships across files. Cross-file renames, reference lookups, and refactoring become single atomic calls instead of 8-12 fragile steps.

**Result:** Faster, more reliable code changes in multi-file codebases. Agent navigates and edits by meaning, not by text patterns.

**Why this project:** This is a TypeScript/Vue monorepo with 4+ packages sharing types, components, and state. Symbol-level operations prevent the agent from breaking imports, missing usages, or duplicating logic during cross-package refactoring.

**Simultaneous use:** OpenCode and Claude Code can run Serena side by side. Each spawns its own MCP server instance. Same project entry (Step 4) works for both — only `--context` differs per client.

---

## Step 1: Install uv

Serena requires `uv` (Python package manager).

Download and install from: https://docs.astral.sh/uv/getting-started/installation/

Verify:
```
uv --version
```

## Step 2: Install Serena

```
uv tool install -p 3.13 serena-agent@latest --prerelease=allow
```

Verify:
```
serena --version
```

## Step 3: Initialize Serena

```
serena init
```

Creates global config at `~/.serena/serena_config.yml`. One-time only.

## Step 4: Create Project Entry

Run once per project. Must be done **manually** (interactive prompts block agents).

Auto-detect all languages (interactive — pick which languages to enable):
```
serena project create "<absolute-path-to-project>"
```

Skip prompts — specify languages explicitly (recommended). Detect with `serena project create "<path>"` once to see detection output, then:
```
serena project create --name "<project-name>" --language typescript --language vue "<absolute-path-to-project>"
```

Example:
```
serena project create --name "microfrontend-ecommerce-poc" --language typescript --language vue "E:\Interview prep\microfrontend-ecommerce-poc"
```

Creates `.serena/project.yml` inside the project directory.

## Step 5: Configure MCP Client

### Option A: OpenCode

Add to `.opencode/opencode.json`:

```json
"mcp": {
  "<project-name>": {
    "type": "local",
    "command": ["serena", "start-mcp-server", "--context", "ide", "--project", "<project-name>"],
    "enabled": true,
    "timeout": 60000
  }
}
```

| Field | Value |
|---|---|
| `--context` | `ide` — minimal tool set for terminal-based clients |
| `--project` | Project **name** from Step 4 (use name, not path — path with spaces breaks) |
| `timeout` | `60000` (60s) — language server init takes time |

### Option B: Claude Code

Auto-setup (recommended):
```
serena setup claude-code
```

Manual — add to `~/.claude.json` or `.claude/settings.json`:
```json
{
  "mcpServers": {
    "serena": {
      "command": "serena",
      "args": ["start-mcp-server", "--context", "claude-code", "--project", "<project-name>"]
    }
  }
}
```

System prompt override (counteracts Claude Code bias toward built-in tools):
```
claude --system-prompt="$(serena prompts print-cc-system-prompt-override)"
```

Hooks (`.claude/settings.json`) — recommends Serena tools over repeated grep/read calls:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "serena-hooks remind --client=claude-code" }]
      },
      {
        "matcher": "mcp__serena__*",
        "hooks": [{ "type": "command", "command": "serena-hooks auto-approve --client=claude-code" }]
      }
    ],
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "serena-hooks activate --client=claude-code" }]
      }
    ],
    "SessionEnd": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "serena-hooks cleanup --client=claude-code" }]
      }
    ]
  }
}
```

Also set `export MCP_TIMEOUT=60000` in shell profile (Serena startup can be slow).

## Step 6: Verify Setup (Manual)

Start MCP server standalone and check for errors:
```
serena start-mcp-server --context ide --project <project-name>
```

Expected output: `Starting MCP server with ## tools` — no error messages.

## Step 7: Start Client

**OpenCode:** Restart in project directory. First prompt:
> activate the project using serena and read initial instructions

**Claude Code:** Start normally. Hooks auto-activate project. Or prompt:
> activate the project using serena and read initial instructions

Serena tools (`find_symbol`, `rename_symbol`, `find_referencing_symbols`, etc.) available alongside built-in tools.

## Dashboard

Web dashboard auto-opens at `http://localhost:24282/dashboard/index.html` when MCP server starts. Shows active tools, config, logs, tool call stats. Can modify languages/modes live.

Manual open: `serena dashboard-viewer http://localhost:24282/dashboard/index.html`

Disable auto-open: add `web_dashboard_open_on_launch: False` to `~/.serena/serena_config.yml`.

## Updating

```
uv tool upgrade serena-agent --prerelease=allow
```

## Uninstalling

```
uv tool uninstall serena-agent
```
