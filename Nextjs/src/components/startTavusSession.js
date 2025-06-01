export const startTavusSession = async ({
  lang,
  messages,
  setLoadingTavus,
}) => {
  console.log(messages);
  const context = [
    ...messages,
    {
      role: "user",
      content:
        "You are to treat the images provided in this chat as documents/forms I need to fill out these documents and you will help me",
    },
  ]
    .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
    .join("\n");

  const response = await fetch("/api/start-tavus-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversational_context: context, language: lang }),
  });

  const data = await response.json();

  if (data?.conversation_url) {
    window.location.href = data.conversation_url;
  } else {
    setLoadingTavus(false);
    alert("Could not start AI session.");
  }
};
