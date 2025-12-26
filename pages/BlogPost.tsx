import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, User, ArrowLeft, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = useData();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative">
         <div className="absolute inset-0 bg-slate-900">
             <img
               src={post.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
               className="w-full h-full object-cover opacity-20 blur-sm"
               alt="Background"
               onError={(e) => {
                 e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
               }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
         </div>
         <div className="max-w-4xl mx-auto px-4 relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour au blog
            </Link>
            <div className="flex items-center gap-2 mb-6">
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold">
                        {post.author.charAt(0)}
                    </div>
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
              
              {/* Content Body */}
              <div className="prose prose-lg prose-slate max-w-none">
                  <p className="lead text-xl text-slate-600 font-medium mb-8 border-l-4 border-blue-600 pl-6 py-2">
                      {post.excerpt}
                  </p>

                  <ReactMarkdown
                      components={{
                          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-slate-900 mb-6 mt-8" {...props} />,
                          h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-slate-900 mb-5 mt-8" {...props} />,
                          h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-6" {...props} />,
                          p: ({ node, ...props }) => <p className="text-slate-700 mb-6 leading-relaxed text-lg" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 mb-6 space-y-3 text-slate-700" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-3 text-slate-700" {...props} />,
                          li: ({ node, ...props }) => <li className="text-lg leading-relaxed" {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                          em: ({ node, ...props }) => <em className="italic text-slate-800" {...props} />,
                          a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-700 underline font-medium" {...props} />,
                          blockquote: ({ node, ...props }) => (
                              <blockquote className="border-l-4 border-blue-600 pl-6 py-2 italic text-slate-600 bg-blue-50 rounded-r-lg my-6" {...props} />
                          ),
                          code: ({ node, inline, ...props }: any) =>
                              inline
                                  ? <code className="bg-slate-100 text-red-600 px-2 py-1 rounded text-base font-mono" {...props} />
                                  : <code className="block bg-slate-900 text-cyan-400 p-6 rounded-xl overflow-x-auto font-mono text-sm my-6 shadow-lg" {...props} />,
                          img: ({ node, ...props }) => (
                              <img className="rounded-xl shadow-lg my-8 w-full" {...props} alt={props.alt || ''} />
                          ),
                          hr: ({ node, ...props }) => <hr className="my-8 border-slate-200" {...props} />,
                      }}
                  >
                      {post.content}
                  </ReactMarkdown>
              </div>

              {/* Share Footer */}
              <div className="border-t border-slate-100 mt-12 pt-8 flex items-center justify-between">
                  <span className="font-bold text-slate-900">Partager cet article :</span>
                  <div className="flex gap-4">
                      <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                          <Facebook className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                          <Linkedin className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                          <Twitter className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-800 hover:text-white transition-colors">
                          <Share2 className="w-5 h-5" />
                      </button>
                  </div>
              </div>
          </div>
      </div>
      
      {/* CTA Bottom */}
      <div className="max-w-4xl mx-auto px-4 mt-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Besoin d'aide avec ce sujet ?</h3>
        <Link to="/contact" className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
            Contacter un expert Novitec
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;