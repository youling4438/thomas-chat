'use client'
import { AzureOpenAI } from 'openai';
import { useState } from 'react';
import MarkdownRenderer from './md';

const endpoint = process.env["NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT"];
const apiKey = process.env["NEXT_PUBLIC_AZURE_OPENAI_API_KEY"];
const deployment4o = process.env["NEXT_PUBLIC_AZURE_OPENAI_CHAT_O_DEPLOYMENT_NAME"];
const deployment4 = process.env["NEXT_PUBLIC_AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"];

function Chat(prop: any) {
    const isGpt4o = prop.isGpt4o;
    const deployment = isGpt4o ? deployment4o : deployment4;
    const [response, setResponse] = useState('o(〃＾▽＾〃)o');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event: any) => {
        setResponse('');
        setLoading(true);
        event.preventDefault();
        const apiVersion = "2024-05-01-preview";
        try {
            const prompt = event.target.prompt.value;
            if (prompt) {
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
                }
            } else {
                setResponse('你似乎没有输入任何问题，༼ つ ◕_◕ ༽つ');
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setResponse(JSON.stringify(error) || '')
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="prompt" className='bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>请输入你的问题:</label>
            <textarea id="prompt" defaultValue="帮我写一首诗来描述软件工程师的日常工作" name="prompt" className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={isGpt4o ? "尝试一下GPT4o(2024-05-13)" : "尝试一下GPT4(0613)"}></textarea>
            <button type="submit" disabled={loading} className="btn btn-outline btn-info">{loading ? '文本生成中...' : '发送'}</button>
            <span className='tips bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>AI助手的回答会显示到下面: </span>
            {response ? <MarkdownRenderer content={response}></MarkdownRenderer> : <span className="loading loading-infinity loading-lg text-info"></span>}
        </form>
    );
}

export default Chat;