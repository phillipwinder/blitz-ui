# Agent Handoff Prompt

```text
Your context window is near capacity. Do not start new scope.

1) Finish only the current atomic task safely.
2) Update /Users/pw/git/blitz-ui/WORKLOG.md with a complete handoff using this structure:

## Context for next session
- Goal:
- Current status:
- Blocking issues:
- Next task:

## Decisions
- Date:
- Decision:
- Why:

## Changed files
- `path/to/file` - what changed and why

## Notes
- Commands run:
- Test results:
- Follow-ups:

3) After updating WORKLOG.md, reply with:
- One-paragraph summary of what was completed
- Exact files changed
- Exact next 1-3 steps for the next agent
- Any blockers/risks

4) Then stop. Do not continue implementation after handoff.
```
