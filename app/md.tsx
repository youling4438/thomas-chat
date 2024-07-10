import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';  
import 'highlight.js/styles/github.css';
import './md.css';

const markdown = `  
# 这是一个标题  
  
这是一个段落。  
  
- 这是一个列表项  
- 这是另一个列表项  
  
**这是加粗的文本**  
  
~~这是删除线文本~~  
  
| 表头1 | 表头2 |  
|-------|-------|  
| 单元格1 | 单元格2 |  
| 单元格3 | 单元格4 |  
`;

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {  
    return (
        <div className="markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
        </div>
    );
}

export default MarkdownRenderer;  