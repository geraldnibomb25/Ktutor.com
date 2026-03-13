import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: body.messages,
  });

  return NextResponse.json(response);
}
```

Then in **Vercel Dashboard → Settings → Environment Variables** add:
```
ANTHROPIC_API_KEY=sk-ant-...
