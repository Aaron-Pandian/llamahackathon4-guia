export const POST = async (req) => {
  const body = await req.json();
  const { conversational_context, language } = body;

  const tavusRes = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "x-api-key": process.env.TAVUS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replica_id: "rb17cf590e15", // Replace with real ID
      persona_id: "pf98fba53201",
      conversation_name: "Follow-up Session",
      conversational_context,
      custom_greeting: `Hello! Let's continue in ${language}.`,
      properties: {
        language,
        enable_recording: false,
        enable_closed_captions: false,
        apply_greenscreen: false,
      },
    }),
  });

  let data;
  try {
    data = await tavusRes.json();
  } catch (err) {
    console.error("Tavus returned no JSON:", err);
    return new Response("Tavus returned invalid response", { status: 500 });
  }
  
  if (tavusRes.ok && data.conversation_url) {
    return new Response(
      JSON.stringify({ conversation_url: data.conversation_url }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    console.error("Tavus error:", data);
    return new Response("Tavus API failed", { status: 500 });
  }
};
