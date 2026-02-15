
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Lock, Save, Trash2, Plus, MessageSquare, Calendar, Layout, 
  Briefcase, Award, Zap, Loader2, CheckCircle, Image as ImageIcon, 
  User, List, Link as LinkIcon, Type, PlusCircle, Clock, Star, Edit3
} from 'lucide-react';
import { db } from '../lib/firebase';
import { 
  collection, getDocs, deleteDoc, doc, updateDoc, 
  addDoc, query, orderBy, setDoc, getDoc 
} from 'firebase/firestore';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'messages' | 'appointments' | 'content'>('messages');
  const [contentTab, setContentTab] = useState<'hero' | 'about' | 'portfolio' | 'services' | 'experience' | 'skills'>('hero');
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Data States
  const [messages, setMessages] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  
  // Content States
  const [heroData, setHeroData] = useState({
    greeting: "Hello, It's Me",
    name: "John Kendric",
    title: "Frontend Developer",
    bio: "I specialize in crafting high-performance, visually stunning web experiences.",
    imageUrl: "https://picsum.photos/seed/kendric/800/800",
    facebook: "#", twitter: "#", instagram: "#", linkedin: "#"
  });
  const [aboutData, setAboutData] = useState({
    heading: 'About Me',
    subheading: 'Frontend Developer!',
    description1: '',
    description2: '',
    imageUrl: ''
  });
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [servicesItems, setServicesItems] = useState<any[]>([]);
  const [experienceItems, setExperienceItems] = useState<any[]>([]);
  const [skillsItems, setSkillsItems] = useState<any[]>([]);

  // Editing States
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === 'Jahid') {
      setIsAuthenticated(true);
      setError('');
      fetchAllData();
    } else {
      setError('Invalid Access Code');
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const msgSnap = await getDocs(query(collection(db, "messages"), orderBy("createdAt", "desc")));
      setMessages(msgSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const appSnap = await getDocs(query(collection(db, "appointments"), orderBy("createdAt", "desc")));
      setAppointments(appSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const heroSnap = await getDoc(doc(db, "content", "hero"));
      if (heroSnap.exists()) setHeroData(heroSnap.data() as any);

      const aboutSnap = await getDoc(doc(db, "content", "about"));
      if (aboutSnap.exists()) setAboutData(aboutSnap.data() as any);

      const portSnap = await getDocs(collection(db, "projects"));
      setPortfolioItems(portSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const servSnap = await getDocs(collection(db, "services"));
      setServicesItems(servSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const expSnap = await getDocs(query(collection(db, "experience"), orderBy("order", "asc")));
      setExperienceItems(expSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const skillSnap = await getDocs(query(collection(db, "skills"), orderBy("percentage", "desc")));
      setSkillsItems(skillSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (col: string, id: string) => {
    if (!window.confirm("Delete this forever?")) return;
    await deleteDoc(doc(db, col, id));
    fetchAllData();
  };

  const saveContent = async (col: string, id: string, data: any) => {
    setSaveLoading(true);
    try {
      if (id) {
        await updateDoc(doc(db, col, id), data);
      } else {
        await addDoc(collection(db, col), data);
      }
      alert("Updated successfully!");
      fetchAllData();
      return true;
    } catch (err) {
      alert("Update failed");
      return false;
    } finally {
      setSaveLoading(false);
    }
  };

  const saveHero = async () => {
    setSaveLoading(true);
    await setDoc(doc(db, "content", "hero"), heroData);
    setSaveLoading(false);
    alert("Hero updated!");
  };

  const saveAbout = async () => {
    setSaveLoading(true);
    await setDoc(doc(db, "content", "about"), aboutData);
    setSaveLoading(false);
    alert("About updated!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-6xl bg-[#1f242d] border border-[#0ef]/20 rounded-[2.5rem] overflow-hidden shadow-2xl h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-[#0ef]/10 flex justify-between items-center bg-[#323946]/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#0ef]/10 rounded-2xl flex items-center justify-center text-[#0ef]">
              <Lock size={24} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Admin <span className="text-[#0ef]">Control</span></h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center"><X /></button>
        </div>

        {!isAuthenticated ? (
          <div className="flex-grow flex items-center justify-center p-8">
            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-6 text-center">
              <input 
                type="password" 
                placeholder="ACCESS CODE" 
                value={accessCode} 
                onChange={e => setAccessCode(e.target.value)}
                className="w-full bg-[#323946] border border-[#0ef]/20 rounded-2xl p-5 text-center font-bold tracking-[0.5em] focus:border-[#0ef] outline-none"
              />
              <button className="w-full bg-[#0ef] text-[#1f242d] font-bold py-4 rounded-2xl">Unlock</button>
              {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            </form>
          </div>
        ) : (
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-56 bg-[#323946]/20 border-r border-[#0ef]/5 p-4 space-y-2 flex-shrink-0">
              {['messages', 'appointments', 'content'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold capitalize transition-all ${activeTab === tab ? 'bg-[#0ef] text-[#1f242d]' : 'text-gray-400 hover:bg-white/5'}`}
                >
                  {tab === 'messages' ? <MessageSquare size={18}/> : tab === 'appointments' ? <Calendar size={18}/> : <Layout size={18}/>}
                  <span>{tab}</span>
                </button>
              ))}
            </div>

            {/* Main Area */}
            <div className="flex-grow overflow-y-auto p-6 md:p-10 custom-scrollbar">
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-6">User Messages</h3>
                  {messages.map(m => (
                    <div key={m.id} className="bg-[#323946]/40 p-6 rounded-2xl border border-white/5">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-[#0ef]">{m.fullName}</h4>
                        <button onClick={() => deleteItem('messages', m.id)} className="text-red-500/50 hover:text-red-500"><Trash2 size={16}/></button>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{m.email}</p>
                      <p className="bg-[#1f242d] p-3 rounded-xl text-sm italic">"{m.message}"</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="grid md:grid-cols-2 gap-4">
                   {appointments.map(a => (
                     <div key={a.id} className="bg-[#323946]/40 p-5 rounded-2xl border border-white/5 flex gap-4">
                        <div className="w-10 h-10 bg-[#0ef]/10 rounded-xl flex items-center justify-center text-[#0ef]"><Calendar size={20}/></div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="font-bold">{a.name}</h4>
                            <button onClick={() => deleteItem('appointments', a.id)} className="text-red-500/50 hover:text-red-500"><Trash2 size={16}/></button>
                          </div>
                          <p className="text-xs text-[#0ef]">{a.service}</p>
                          <p className="text-xs text-gray-400">{a.date} @ {a.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-10">
                  {/* Content Sub-Nav */}
                  <div className="flex gap-4 border-b border-white/5 pb-4 overflow-x-auto scrollbar-hide">
                    {['hero', 'about', 'services', 'portfolio', 'experience', 'skills'].map(c => (
                      <button 
                        key={c} onClick={() => setContentTab(c as any)}
                        className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap ${contentTab === c ? 'bg-[#0ef]/10 text-[#0ef] border border-[#0ef]/20' : 'text-gray-500 hover:text-white'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  {contentTab === 'hero' && (
                    <div className="space-y-6 max-w-2xl">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input value={heroData.name} onChange={e => setHeroData({...heroData, name: e.target.value})} placeholder="Name" className="bg-[#323946] p-4 rounded-xl border border-white/5 outline-none"/>
                        <input value={heroData.title} onChange={e => setHeroData({...heroData, title: e.target.value})} placeholder="Title" className="bg-[#323946] p-4 rounded-xl border border-white/5 outline-none"/>
                      </div>
                      <textarea value={heroData.bio} onChange={e => setHeroData({...heroData, bio: e.target.value})} rows={3} placeholder="Bio" className="w-full bg-[#323946] p-4 rounded-xl border border-white/5 outline-none"/>
                      <input value={heroData.imageUrl} onChange={e => setHeroData({...heroData, imageUrl: e.target.value})} placeholder="Image URL" className="w-full bg-[#323946] p-4 rounded-xl border border-white/5 outline-none"/>
                      <div className="grid grid-cols-2 gap-4">
                        <input value={heroData.facebook} onChange={e => setHeroData({...heroData, facebook: e.target.value})} placeholder="Facebook Link" className="bg-[#323946] p-4 rounded-xl border border-white/5 outline-none text-xs"/>
                        <input value={heroData.twitter} onChange={e => setHeroData({...heroData, twitter: e.target.value})} placeholder="Twitter Link" className="bg-[#323946] p-4 rounded-xl border border-white/5 outline-none text-xs"/>
                      </div>
                      <button onClick={saveHero} className="bg-[#0ef] text-[#1f242d] px-8 py-3 rounded-xl font-bold">Save Hero Changes</button>
                    </div>
                  )}

                  {contentTab === 'about' && (
                    <div className="space-y-6 max-w-2xl">
                       <input value={aboutData.heading} onChange={e => setAboutData({...aboutData, heading: e.target.value})} placeholder="Heading" className="w-full bg-[#323946] p-4 rounded-xl border border-white/5 outline-none"/>
                       <textarea value={aboutData.description1} onChange={e => setAboutData({...aboutData, description1: e.target.value})} rows={4} placeholder="Description 1" className="w-full bg-[#323946] p-4 rounded-xl border border-white/5 outline-none"/>
                       <textarea value={aboutData.description2} onChange={e => setAboutData({...aboutData, description2: e.target.value})} rows={4} placeholder="Description 2" className="w-full bg-[#323946] p-4 rounded-xl border border-white/5 outline-none"/>
                       <button onClick={saveAbout} className="bg-[#0ef] text-[#1f242d] px-8 py-3 rounded-xl font-bold">Save About Changes</button>
                    </div>
                  )}

                  {contentTab === 'services' && (
                    <div className="space-y-8">
                       <button onClick={() => setEditingService({title: '', description: '', icon: 'code'})} className="flex items-center gap-2 text-[#0ef] font-bold"><Plus size={18}/> Add Service</button>
                       {editingService && (
                         <div className="bg-[#323946] p-6 rounded-2xl space-y-4 border border-[#0ef]/20">
                           <input value={editingService.title} onChange={e => setEditingService({...editingService, title: e.target.value})} placeholder="Service Title" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                           <textarea value={editingService.description} onChange={e => setEditingService({...editingService, description: e.target.value})} placeholder="Service Description" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                           <div className="flex gap-4">
                            <button onClick={async () => { if(await saveContent('services', editingService.id, editingService)) setEditingService(null); }} className="bg-[#0ef] text-[#1f242d] px-6 py-2 rounded-lg font-bold">Save</button>
                            <button onClick={() => setEditingService(null)} className="text-gray-400">Cancel</button>
                           </div>
                         </div>
                       )}
                       <div className="grid md:grid-cols-2 gap-4">
                        {servicesItems.map(s => (
                          <div key={s.id} className="bg-[#323946]/40 p-4 rounded-xl flex justify-between items-center">
                            <div>
                              <h5 className="font-bold">{s.title}</h5>
                              <p className="text-xs text-gray-400 line-clamp-1">{s.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setEditingService(s)} className="text-[#0ef]"><Edit3 size={16}/></button>
                              <button onClick={() => deleteItem('services', s.id)} className="text-red-500"><Trash2 size={16}/></button>
                            </div>
                          </div>
                        ))}
                       </div>
                    </div>
                  )}

                  {contentTab === 'portfolio' && (
                    <div className="space-y-8">
                       <button onClick={() => setEditingProject({title: '', category: 'Web App', image: '', description: '', techStack: '', gallery: []})} className="flex items-center gap-2 text-[#0ef] font-bold"><Plus size={18}/> New Project</button>
                       {editingProject && (
                         <div className="bg-[#323946] p-8 rounded-3xl space-y-4 border border-[#0ef]/20">
                            <input value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} placeholder="Title" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                            <input value={editingProject.image} onChange={e => setEditingProject({...editingProject, image: e.target.value})} placeholder="Main Image URL" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                            
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500">Gallery URLs</label>
                              <div className="flex gap-2">
                                <input value={newGalleryUrl} onChange={e => setNewGalleryUrl(e.target.value)} placeholder="Add gallery image URL" className="flex-grow bg-[#1f242d] p-3 rounded-xl outline-none text-sm"/>
                                <button type="button" onClick={() => { if(newGalleryUrl) { setEditingProject({...editingProject, gallery: [...(editingProject.gallery || []), newGalleryUrl]}); setNewGalleryUrl(''); } }} className="bg-[#0ef]/20 text-[#0ef] px-4 rounded-xl">+</button>
                              </div>
                              <div className="flex gap-2 overflow-x-auto py-2">
                                {(editingProject.gallery || []).map((url:string, i:number) => (
                                  <div key={i} className="relative w-12 h-12 flex-shrink-0">
                                    <img src={url} className="w-full h-full object-cover rounded-lg"/>
                                    <button onClick={() => { const ng = [...editingProject.gallery]; ng.splice(i,1); setEditingProject({...editingProject, gallery: ng}); }} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"><X size={10}/></button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <input value={editingProject.techStack} onChange={e => setEditingProject({...editingProject, techStack: e.target.value})} placeholder="Tech Stack (comma separated)" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                            <textarea value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} placeholder="Short Description" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                            
                            <div className="flex gap-4">
                              <button onClick={async () => { if(await saveContent('projects', editingProject.id, editingProject)) setEditingProject(null); }} className="bg-[#0ef] text-[#1f242d] px-6 py-3 rounded-xl font-bold">Save Project</button>
                              <button onClick={() => setEditingProject(null)} className="text-gray-400">Cancel</button>
                            </div>
                         </div>
                       )}
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {portfolioItems.map(p => (
                           <div key={p.id} className="relative group aspect-video rounded-xl overflow-hidden border border-white/5">
                              <img src={p.image} className="w-full h-full object-cover"/>
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                                <button onClick={() => setEditingProject(p)} className="text-[#0ef]"><Edit3/></button>
                                <button onClick={() => deleteItem('projects', p.id)} className="text-red-500"><Trash2/></button>
                              </div>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}

                  {contentTab === 'experience' && (
                    <div className="space-y-6">
                      <button onClick={() => setEditingExperience({role: '', company: '', period: '', description: '', order: experienceItems.length})} className="flex items-center gap-2 text-[#0ef] font-bold"><Plus size={18}/> Add Experience</button>
                      {editingExperience && (
                         <div className="bg-[#323946] p-6 rounded-2xl space-y-4 border border-[#0ef]/20">
                            <input value={editingExperience.role} onChange={e => setEditingExperience({...editingExperience, role: e.target.value})} placeholder="Role" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                            <input value={editingExperience.company} onChange={e => setEditingExperience({...editingExperience, company: e.target.value})} placeholder="Company" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                            <input value={editingExperience.period} onChange={e => setEditingExperience({...editingExperience, period: e.target.value})} placeholder="Period (e.g. 2021 - Present)" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                            <textarea value={editingExperience.description} onChange={e => setEditingExperience({...editingExperience, description: e.target.value})} placeholder="Work description" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                            <div className="flex gap-4">
                              <button onClick={async () => { if(await saveContent('experience', editingExperience.id, editingExperience)) setEditingExperience(null); }} className="bg-[#0ef] text-[#1f242d] px-6 py-2 rounded-lg font-bold">Save</button>
                              <button onClick={() => setEditingExperience(null)} className="text-gray-400">Cancel</button>
                            </div>
                         </div>
                      )}
                      <div className="space-y-2">
                        {experienceItems.map(exp => (
                          <div key={exp.id} className="bg-[#323946]/40 p-4 rounded-xl flex justify-between items-center">
                            <div>
                              <h5 className="font-bold">{exp.role} <span className="text-gray-500">at</span> {exp.company}</h5>
                              <p className="text-xs text-[#0ef]">{exp.period}</p>
                            </div>
                            <div className="flex gap-3">
                              <button onClick={() => setEditingExperience(exp)} className="text-[#0ef]"><Edit3 size={16}/></button>
                              <button onClick={() => deleteItem('experience', exp.id)} className="text-red-500"><Trash2 size={16}/></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {contentTab === 'skills' && (
                    <div className="space-y-6">
                      <button onClick={() => setEditingSkill({name: '', percentage: 90, icon: '⚛️'})} className="flex items-center gap-2 text-[#0ef] font-bold"><Plus size={18}/> Add Skill</button>
                      {editingSkill && (
                        <div className="bg-[#323946] p-6 rounded-2xl space-y-4 border border-[#0ef]/20 max-w-sm">
                           <input value={editingSkill.name} onChange={e => setEditingSkill({...editingSkill, name: e.target.value})} placeholder="Skill Name" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                           <input type="number" value={editingSkill.percentage} onChange={e => setEditingSkill({...editingSkill, percentage: parseInt(e.target.value)})} placeholder="Percentage (0-100)" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                           <input value={editingSkill.icon} onChange={e => setEditingSkill({...editingSkill, icon: e.target.value})} placeholder="Emoji or Icon Code" className="w-full bg-[#1f242d] p-4 rounded-xl outline-none"/>
                           <div className="flex gap-4">
                            <button onClick={async () => { if(await saveContent('skills', editingSkill.id, editingSkill)) setEditingSkill(null); }} className="bg-[#0ef] text-[#1f242d] px-6 py-2 rounded-lg font-bold">Save</button>
                            <button onClick={() => setEditingSkill(null)} className="text-gray-400">Cancel</button>
                           </div>
                        </div>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {skillsItems.map(sk => (
                          <div key={sk.id} className="bg-[#323946]/40 p-3 rounded-xl flex items-center justify-between">
                            <span className="font-bold text-sm">{sk.icon} {sk.name}</span>
                            <div className="flex gap-2">
                              <button onClick={() => setEditingSkill(sk)} className="text-[#0ef]"><Edit3 size={14}/></button>
                              <button onClick={() => deleteItem('skills', sk.id)} className="text-red-500"><Trash2 size={14}/></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const EmptyState = ({ msg }: { msg: string }) => (
  <div className="text-center py-20 bg-[#323946]/10 rounded-3xl border border-dashed border-white/5">
    <Zap size={48} className="text-gray-600 mx-auto mb-4" />
    <p className="text-gray-400">{msg}</p>
  </div>
);

export default AdminPanel;
