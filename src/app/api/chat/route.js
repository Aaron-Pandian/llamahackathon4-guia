import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Transform messages to handle image attachments
    const transformedMessages = messages.map(message => {
      if (message.files && message.files.length > 0) {
        // Create content array with text and images
        const content = [];
        
        // Add text content if present
        if (message.content && message.content.trim()) {
          content.push({
            type: "text",
            text: message.content
          });
        }
        
        // Add image content
        message.files.forEach(file => {
          if (file.type?.startsWith('image/')) {
            content.push({
              type: "image_url",
              image_url: {
                url: file.url
              }
            });
          }
        });

        return {
          role: message.role,
          content: content
        };
      } else {
        // Regular text message
        return {
          role: message.role,
          content: message.content
        };
      }
    });

    console.log('Sending to Llama API:', JSON.stringify(transformedMessages, null, 2));

    const response = await fetch('https://api.llama.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages: transformedMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Llama API error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Llama API response to match expected format
    const transformedResponse = {
      id: data.id,
      choices: [{
        message: {
          role: data.completion_message.role,
          content: data.completion_message.content.text
        }
      }],
      usage: {
        prompt_tokens: data.metrics.find(m => m.metric === "num_prompt_tokens")?.value || 0,
        completion_tokens: data.metrics.find(m => m.metric === "num_completion_tokens")?.value || 0,
        total_tokens: data.metrics.find(m => m.metric === "num_total_tokens")?.value || 0
      }
    };

    return NextResponse.json(transformedResponse);
  } catch (error) {
    console.error('Error calling Llama API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Llama API', details: error.message },
      { status: 500 }
    );
  }
}