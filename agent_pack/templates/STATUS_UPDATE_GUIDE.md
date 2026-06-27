# Status Update Guide

When a step starts:

```json
"status": "in_progress",
"started_at": "YYYY-MM-DD HH:mm"
```

When done:

```json
"status": "done",
"completed_at": "YYYY-MM-DD HH:mm",
"report": "agent_pack/reports/001_name_REPORT.md"
```

Then set the next `pending` step to:

```json
"status": "open"
```

If blocked:

```json
"status": "blocked",
"report": "agent_pack/reports/xxx_REPORT.md"
```

Do not mark a step done without a report.