'use client'
import { AzureOpenAI } from 'openai';
import { useState } from 'react';
import MarkdownRenderer from './md';

const endpoint = process.env["NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT"];
const apiKey = process.env["NEXT_PUBLIC_AZURE_OPENAI_API_KEY"];
const deployment = process.env["NEXT_PUBLIC_AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"];

function Chat() {
    const [response, setResponse] = useState('o(〃＾▽＾〃)o');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event: any) => {
        setResponse('');
        setLoading(true);
        event.preventDefault();
        const apiVersion = "2024-05-01-preview";
        try {
            const prompt = event.target.prompt.value;
            const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });
            const result = await client.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt },
                ],
                max_tokens: 2400,
                model: "",
            });
            for (const choice of result.choices) {
                setResponse(choice.message.content || '');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setResponse(JSON.stringify(error) || '')
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="prompt" className='bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>请输入你的问题:</label>
            <textarea id="prompt" name="prompt" className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="尝试一下GPT4o(2024-05-13)"></textarea>
            <button type="submit" disabled={loading} className="btn btn-outline btn-info">{loading ? '文本生成中...' : '发送'}</button>
            <span className='tips bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>AI助手的回答会显示到下面: </span>
            {response ? <MarkdownRenderer content={response}></MarkdownRenderer> : <span className="loading loading-infinity loading-lg text-info"></span>}
        </form>
    );
}

export default Chat;