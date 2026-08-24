import { useState } from 'react';
import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { Download, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const { gallery, t } = useAppContext();
  
  const [selectedImage, setSelectedImage] = useState<{url: string, title: string} | null>(null);

  return (
    <div className="py-4">
      <SectionTitle title={t('digitalDarshan')} subtitle={t('digitalDarshanSub')} />

      <div className="flex items-center gap-2 mb-4 mt-6">
        <ImageIcon size={18} className="text-emerald-400" />
        <h3 className="font-bold text-sm uppercase tracking-widest text-white/80">{t('festivalMemories')}</h3>
      </div>
      
      {(!Array.isArray(gallery) || gallery.length === 0) ? (
        <div className="text-center py-12 px-4 border border-white/10 rounded-2xl bg-black/20">
          <ImageIcon size={48} className="mx-auto text-white/20 mb-3" />
          <p className="text-white/60 font-bold uppercase tracking-wider text-sm mb-1">No Memories Yet</p>
          <p className="text-white/40 text-xs">Photos added from the admin panel will appear here.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <AnimatePresence>
            {gallery.map((img: any) => {
              const isNew = Date.now() - img.id < 1000 * 60 * 60 * 24; // Added in the last 24 hours (simulated logic based on ID)
              
              return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                key={img.id} 
                className="relative group rounded-xl overflow-hidden aspect-square border border-white/10 shadow-lg cursor-pointer"
                onClick={() => setSelectedImage({ url: img.url, title: img.title })}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {isNew && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-black text-[9px] font-extrabold uppercase px-2 py-1 rounded-full shadow-lg z-10">
                    New
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502]/90 via-[#0a0502]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 pointer-events-none">
                  <p className="text-white text-[10px] font-bold uppercase tracking-wider mb-2">{img.title}</p>
                  <a href={img.url} download={`${img.title}.jpg`} onClick={e => e.stopPropagation()} className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full self-start transition-colors border border-white/20 pointer-events-auto">
                    <Download size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-full object-contain max-h-[80vh] rounded-lg" />
              <div className="flex justify-between items-center mt-4">
                <p className="text-white font-bold text-lg">{selectedImage.title}</p>
                <button onClick={() => setSelectedImage(null)} className="text-white/50 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
