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

function Chat() {
    const [response, setResponse] = useState('');
    const handleSubmit = async (event: any) => {
        setResponse('');
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
            setResponse(JSON.stringify(error) || '')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="prompt" className='bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>请输入你的问题:</label>
            <textarea id="prompt" name="prompt" className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Type your message here..."></textarea>
            <button type="submit" className="btn btn-outline btn-info">发送</button>
            <span className='tips bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>AI助手的回答会显示到下面: </span>
            {response ? <MarkdownRenderer content={response}></MarkdownRenderer> : <span className="loading loading-infinity loading-lg"></span>}
        </form>
    );
}

export default Chat;