// Marian AI quiz generator — produces MCQ/true-false questions from a topic.
// Returns structured JSON via Lovable AI Gateway tool calling.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

interface Body {
  subject?: string;
  topic: string;
  grade_level?: string;
  count?: number;
  difficulty?: "easy" | "medium" | "hard";
  kind?: "quiz" | "exam" | "trivia";
}

const tool = {
  type: "function",
  function: {
    name: "create_quiz",
    description: "Create a quiz with multiple-choice questions",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              prompt: { type: "string" },
              kind: { type: "string", enum: ["mcq", "true_false"] },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string", description: "Unique letter id like a,b,c,d" },
                    text: { type: "string" },
                  },
                  required: ["id", "text"],
                  additionalProperties: false,
                },
                minItems: 2,
                maxItems: 4,
              },
              correct_option_ids: {
                type: "array",
                items: { type: "string" },
                minItems: 1,
              },
              explanation: { type: "string" },
              points: { type: "number" },
            },
            required: ["prompt", "kind", "options", "correct_option_ids", "explanation", "points"],
            additionalProperties: false,
          },
        },
      },
      required: ["title", "description", "questions"],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    if (!body?.topic || typeof body.topic !== "string") {
      return new Response(JSON.stringify({ error: "topic is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const count = Math.min(Math.max(body.count ?? 8, 3), 20);
    const difficulty = body.difficulty ?? "medium";
    const kind = body.kind ?? "quiz";

    const sys = `You are Marian AI, an expert Kenyan CBE/CBC educator for St. Mary's Senior School, Bomet.
Generate accurate, age-appropriate ${kind} questions aligned with the Kenyan curriculum.
- Subject: ${body.subject ?? "General"}
- Grade level: ${body.grade_level ?? "Grade 10"}
- Difficulty: ${difficulty}
- Generate exactly ${count} questions.
- Use clear, unambiguous prompts. Prefer MCQ with 4 options; use true_false sparingly.
- Provide a short explanation for the correct answer.
- Each question worth 1 point unless complex (then 2).
- Return ONLY via the create_quiz tool.`;

    const user = `Create ${count} ${difficulty} ${kind} questions about: ${body.topic}.`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: "create_quiz" } },
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Top up Lovable AI." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error", detail: text }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const call = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) {
      return new Response(JSON.stringify({ error: "No tool call returned", raw: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const parsed = JSON.parse(call.function.arguments);
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
