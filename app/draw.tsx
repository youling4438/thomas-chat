'use client'
import { AzureOpenAI } from 'openai';
import { useState } from 'react';
import { ImageGenerateParams } from 'openai/src/resources/images.js';

const endpoint = process.env["NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT"] || "end-point";
const apiKey = process.env["NEXT_PUBLIC_AZURE_OPENAI_API_KEY"] || "api-key";
const deployment = process.env["NEXT_PUBLIC_AZURE_OPENAI_DALLE_DEPLOYMENT_NAME"] || "deployment-name";

function Draw() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('/Dalle3.png');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: any) => {
        setLoading(true);
        setImageUrl('');
        event.preventDefault();
        const apiVersion = "2024-05-01-preview";
        try {
            const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });
            const params: ImageGenerateParams = {
                prompt: prompt,
                model: 'dall-e-3',
                n: 1,
                response_format: 'url',
                quality: 'hd',
                size: '1024x1024',
                style: 'vivid',
            };
            const result = await client.images.generate(params);
            setImageUrl(result.data[0].url!);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputText" className='bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>描述要创建的图像。例如“西雅图天际线的水彩画”:</label>
                <input
                    id="inputText"
                    type="text"
                    style={{ display: 'block', margin: '20px 0' }}
                    value={prompt}
                    className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="尝试一下DALL-E 3"
                />
                <button type="submit" disabled={loading} className="btn btn-outline btn-info">{loading ? '图片生成中...' : '生成图片'}</button>
                <span className='tips bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>AI助手生成的图片会显示到下面: </span>
                {imageUrl ? <div style={{ marginTop: '20px' }}>
                    <img src={imageUrl} className='border rounded-lg shadow-md' alt="Example Image" width={512} height={512} /> 
                </div> : <span className="loading loading-infinity loading-lg text-info"></span>}
            </form>
        </div>
    );
}

export default Draw;