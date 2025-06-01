import os
import requests
import json
import firebase_admin
from firebase_admin import credentials, firestore
from support import read_pdf_images_tool

"""
# Access to Firebase database - WAITING ON UPDATE
cred = credentials.Certificate("path/to/your-service-account.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
"""

# Assign API Key to Global Variable
os.environ["LLAMA_API_KEY"] = "LLM|2160892144409992|uQm46ykYRMzgyx3a5JdTNfK_P8g"

# SDK Instant to Pull API Key
from llama_api_client import LlamaAPIClient
client = LlamaAPIClient()

# Inital request for Llama
payload = {
    "model": "Llama-4-Maverick-17B-128E-Instruct-FP8",
    "messages": [
        {"role": "user", "content": "Summarize the following PDF..."}
    ],
    "tools": [read_pdf_images_tool],
}

# Fetch data from Firebase 
image_urls = [...]  # List of URLs you fetch
title = "Form G-325A Biographic Information"
pdf_metadata = pdf_metadata = {"page_count": len(image_urls), "title": title}

# LLM views prompts and decides to use the tool
response = client.chat.completions.create(
    model="Llama-4-Maverick-17B-128E-Instruct-FP8",
    messages=payload["messages"],
    tools=payload["tools"],
    max_completion_tokens=2048,
    temperature=0.6,
)

print(response)
completion_message = response.completion_message.model_dump()

# Complete tool call if requested
messages.append(completion_message)
for tool_call in completion_message.get("tool_calls", []):
    if tool_call["function"]["name"] == "read_pdf_images":
        # This is where you would parse the model's arguments, but in this flow, you supply the actual values.
        result = read_pdf_images(image_urls=image_urls, pdf_metadata=pdf_metadata)

        messages.append(
            {
                "role": "tool",
                "tool_call_id": tool_call["id"],
                "content": result,
            },
        )

# LLM responds to tool result ie images
response = client.chat.completions.create(
    model="Llama-4-Maverick-17B-128E-Instruct-FP8",
    messages=messages,
    tools=tools,
    max_completion_tokens=2048,
    temperature=0.6,
)

print(response)

"""
Tarvus Integration

import requests
import json

# 1. User uploads images (handled in your app, resulting in image_urls)
image_urls = [...]  # URLs of uploaded images

# 2. Llama: Start conversation and process form images
tools = [...]  # Your read_pdf_images tool definition, as above
messages = [
    {"role": "user", "content": "Please explain how to fill out this form, step by step."}
]

# First Llama turn
response = requests.post(
    "https://api.llama.example.com/chat/completions",
    headers={...},
    json={
        "model": "Llama-4-Maverick-17B-128E-Instruct-FP8",
        "messages": messages,
        "tools": tools,
        "max_completion_tokens": 2048,
        "temperature": 0.6,
    }
)
response_data = response.json()
completion_message = response_data["completion_message"]

# Fulfill tool call
tool_call = completion_message["tool_calls"][0]
tool_call_id = tool_call["id"]
# (Assume tool_args construction or just use image_urls and metadata as before)
result = llama_tool_process(image_urls=image_urls, pdf_metadata={...})

messages.append(completion_message)
messages.append({
    "role": "tool",
    "tool_call_id": tool_call_id,
    "content": result,
})

# Llama responds with step-by-step output
response = requests.post(
    "https://api.llama.example.com/chat/completions",
    headers={...},
    json={
        "model": "Llama-4-Maverick-17B-128E-Instruct-FP8",
        "messages": messages,
        "tools": tools,
        "max_completion_tokens": 2048,
        "temperature": 0.6,
    }
)
final_response = response.json()
step_by_step_explanation = final_response["completion_message"]["content"]

# 3. Tarvus: Generate video from step-by-step explanation
tarvus_payload = {
    "script": step_by_step_explanation,
    # Optionally, provide additional data like voice, style, etc.
}
tarvus_response = requests.post(
    "https://api.tarvus.ai/videos/generate",
    headers={"Authorization": "Bearer <YOUR_TARVUS_API_KEY>", "Content-Type": "application/json"},
    json=tarvus_payload,
)
tarvus_result = tarvus_response.json()
video_url = tarvus_result["video_url"]

# 4. Send video URL back to user, and optionally add to Llama conversation
messages.append({"role": "user", "content": f"Can you show this as a video?"})
messages.append({"role": "assistant", "content": f"Here is a video explanation: {video_url}"})

# (Continue conversation if needed)
"""