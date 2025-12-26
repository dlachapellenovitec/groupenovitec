import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bold, Italic, Heading1, Heading2, List, Link as LinkIcon, Image, Code, Eye, Edit3, Type } from 'lucide-react';

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ value, onChange, placeholder = 'Écrivez votre article en Markdown...' }) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'split'>('split');
  const [cursorPosition, setCursorPosition] = useState(0);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    // Restaurer le focus et la sélection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Gras', action: () => insertMarkdown('**', '**') },
    { icon: Italic, label: 'Italique', action: () => insertMarkdown('_', '_') },
    { icon: Heading1, label: 'Titre 1', action: () => insertMarkdown('# ', '') },
    { icon: Heading2, label: 'Titre 2', action: () => insertMarkdown('## ', '') },
    { icon: List, label: 'Liste', action: () => insertMarkdown('- ', '') },
    { icon: LinkIcon, label: 'Lien', action: () => insertMarkdown('[', '](url)') },
    { icon: Image, label: 'Image', action: () => insertMarkdown('![alt](', ')') },
    { icon: Code, label: 'Code', action: () => insertMarkdown('`', '`') },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 rounded-t-lg">
        <div className="flex items-center justify-between gap-2">
          {/* Formatting buttons */}
          <div className="flex gap-1 flex-wrap">
            {toolbarButtons.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={btn.action}
                className="p-2 hover:bg-slate-200 rounded transition-colors text-slate-600 hover:text-slate-900"
                title={btn.label}
              >
                <btn.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* View mode tabs */}
          <div className="flex gap-1 bg-white rounded-lg p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'edit' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              Éditer
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'split' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Type className="w-3 h-3" />
              Split
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3 h-3" />
              Aperçu
            </button>
          </div>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="flex-grow flex overflow-hidden bg-white rounded-b-lg border border-slate-200 border-t-0">
        {/* Edit mode */}
        {(activeTab === 'edit' || activeTab === 'split') && (
          <div className={`${activeTab === 'split' ? 'w-1/2 border-r border-slate-200' : 'w-full'} flex flex-col`}>
            <div className="text-xs font-medium text-slate-500 px-3 py-2 bg-slate-50 border-b border-slate-100">
              Markdown
            </div>
            <textarea
              id="markdown-editor"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-grow p-4 bg-white text-slate-900 font-mono text-sm resize-none focus:outline-none"
              style={{ minHeight: '500px' }}
            />
          </div>
        )}

        {/* Preview mode */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div className={`${activeTab === 'split' ? 'w-1/2' : 'w-full'} flex flex-col overflow-auto`}>
            <div className="text-xs font-medium text-slate-500 px-3 py-2 bg-slate-50 border-b border-slate-100">
              Aperçu
            </div>
            <div className="flex-grow p-4 overflow-auto prose prose-slate max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-slate-900 mb-4 mt-6" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-slate-900 mb-3 mt-5" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-slate-900 mb-2 mt-4" {...props} />,
                  p: ({ node, ...props }) => <p className="text-slate-700 mb-4 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700" {...props} />,
                  li: ({ node, ...props }) => <li className="text-slate-700" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                  code: ({ node, inline, ...props }: any) =>
                    inline
                      ? <code className="bg-slate-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono" {...props} />
                      : <code className="block bg-slate-900 text-cyan-400 p-4 rounded-lg overflow-x-auto font-mono text-sm my-4" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-600 pl-4 italic text-slate-600 my-4" {...props} />,
                  img: ({ node, ...props }) => <img className="rounded-lg shadow-md my-4 max-w-full" {...props} />,
                }}
              >
                {value || '*Aucun contenu à prévisualiser*'}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Help text */}
      <div className="text-xs text-slate-500 mt-2 px-2">
        💡 <strong>Astuce:</strong> Utilisez les boutons de formatage ou tapez directement en Markdown.
        <span className="ml-2">
          <code className="bg-slate-100 px-1 rounded">**gras**</code>{' '}
          <code className="bg-slate-100 px-1 rounded">_italique_</code>{' '}
          <code className="bg-slate-100 px-1 rounded"># Titre</code>{' '}
          <code className="bg-slate-100 px-1 rounded">- liste</code>
        </span>
      </div>
    </div>
  );
};

export default BlogEditor;
