import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog: React.FC = () => {
  const { posts } = useData();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Actualités & Ressources TI</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Conseils d'experts sur la cybersécurité, le cloud et la gestion technologique pour les PME québécoises.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full border border-slate-100">
              <div className="h-48 overflow-hidden relative group bg-slate-200 flex items-center justify-center">
                <img
                  src={post.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:translate-x-1 transition-transform"
                >
                  Lire l'article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>
           
           <h2 className="text-3xl font-bold mb-4 relative z-10">Ne manquez aucune alerte sécurité</h2>
           <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
             Recevez nos bulletins d'alerte (Novigard Alert) et nos conseils mensuels. Pas de spam, promis.
           </p>
           
           <form className="max-w-md mx-auto flex gap-4 relative z-10 flex-col sm:flex-row">
             <input 
              type="email" 
              placeholder="Votre courriel professionnel" 
              className="flex-grow px-6 py-3 rounded-xl text-slate-900 border-none focus:ring-2 focus:ring-blue-300 outline-none"
             />
             <button type="button" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-xl transition-colors">
               S'abonner
             </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;