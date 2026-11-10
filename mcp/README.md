# ViralForge MCP server

零依赖的 MCP stdio server（newline-delimited JSON-RPC 2.0）。

```json
{
  "mcpServers": {
    "viralforge": {
      "command": "node",
      "args": ["/absolute/path/to/viralforge/mcp/server.mjs"]
    }
  }
}
```

Tools: `list_cases`, `get_case`, `analyze_video`, `build_project`。

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"cli","version":"1"}}}' \
  | node mcp/server.mjs
```
