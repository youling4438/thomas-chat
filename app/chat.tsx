'use client'
import { AzureOpenAI } from 'openai';
import { useState } from 'react';
import MarkdownRenderer from './md';

// const examplePrompts = [
//     "How are you today?",
//     "What is Azure OpenAI?",
//     "Why do children love dinosaurs?",
//     "Generate a proof of Euler's identity",
//     "Describe in single words only the good things that come into your mind about your mother.",
// ];
const endpoint = process.env["NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT"] || "end-point";
const apiKey = process.env["NEXT_PUBLIC_AZURE_OPENAI_API_KEY"] || "api-key";
const deployment = process.env["NEXT_PUBLIC_AZURE_OPENAI_DEPLOYMENT_NAME"] || "deployment-name";

function MyComponent() {
    const [response, setResponse] = useState('');
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const apiVersion = "2024-05-01-preview";
        try {
            const prompt = event.target.prompt.value;
            const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });
            const result = await client.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    // { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
                    // { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI?" },
                    // { role: "user", content: "Do other Azure AI services support this too?" },
                    { role: "user", content: prompt },
                ],
                max_tokens: 2400,
                model: "",
            });
            for (const choice of result.choices) {
                setResponse(choice.message.content || '');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="prompt">Prompt:</label>
            <input type="text" id="prompt" name="prompt" />
            <button type="submit">Submit</button>
            {response ? <MarkdownRenderer content={response}></MarkdownRenderer> : <h3>Ai的回答会显示到这儿</h3>}
        </form>
    );
}

export default MyComponent;