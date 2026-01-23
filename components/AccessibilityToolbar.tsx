 'use client'
 
 import { useEffect, useState } from 'react'
 
 type ToggleKey =
   | 'a11y-text-lg'
   | 'a11y-line'
   | 'a11y-links'
   | 'a11y-reduce-motion'
   | 'a11y-contrast'
   | 'a11y-grayscale'
 
 const toggles: { key: ToggleKey; label: string }[] = [
   { key: 'a11y-text-lg', label: 'Increase text size' },
   { key: 'a11y-line', label: 'Increase line spacing' },
   { key: 'a11y-links', label: 'Highlight links' },
   { key: 'a11y-reduce-motion', label: 'Reduce motion' },
   { key: 'a11y-contrast', label: 'High contrast' },
   { key: 'a11y-grayscale', label: 'Grayscale' },
 ]
 
 export default function AccessibilityToolbar() {
   const [open, setOpen] = useState(false)
   const [active, setActive] = useState<Record<ToggleKey, boolean>>({
     'a11y-text-lg': false,
     'a11y-line': false,
     'a11y-links': false,
     'a11y-reduce-motion': false,
     'a11y-contrast': false,
     'a11y-grayscale': false,
   })
 
   useEffect(() => {
     try {
       const stored = localStorage.getItem('a11y-toggles')
       if (stored) {
         const parsed = JSON.parse(stored) as Record<ToggleKey, boolean>
         setActive(parsed)
         Object.entries(parsed).forEach(([k, v]) => {
           document.documentElement.classList.toggle(k, v)
         })
       }
     } catch {}
   }, [])
 
   const toggle = (key: ToggleKey) => {
     setActive(prev => {
       const next = { ...prev, [key]: !prev[key] }
       document.documentElement.classList.toggle(key, next[key])
       try {
         localStorage.setItem('a11y-toggles', JSON.stringify(next))
       } catch {}
       return next
     })
   }
 
   return (
     <div className="fixed bottom-4 right-4 z-50">
       <button
         aria-expanded={open}
         aria-controls="a11y-panel"
         onClick={() => setOpen(o => !o)}
         className="bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
       >
         Accessibility
       </button>
 
       {open && (
         <div
           id="a11y-panel"
           role="dialog"
           aria-label="Accessibility options"
           className="mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-3"
         >
           <ul className="space-y-2">
             {toggles.map(t => (
               <li key={t.key} className="flex items-center justify-between">
                 <span className="text-sm text-gray-800">{t.label}</span>
                 <label className="inline-flex items-center cursor-pointer">
                   <input
                     type="checkbox"
                     checked={active[t.key]}
                     onChange={() => toggle(t.key)}
                     className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                   />
                 </label>
               </li>
             ))}
           </ul>
           <div className="mt-3 flex justify-end">
             <button
               onClick={() => setOpen(false)}
               className="text-sm text-gray-700 px-3 py-1 rounded hover:bg-gray-100"
             >
               Close
             </button>
           </div>
         </div>
       )}
     </div>
   )
 }
