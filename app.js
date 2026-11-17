'use strict';
const viewer=document.getElementById('viewer');
const viewerImage=document.getElementById('viewer-image');
let lastTrigger=null;
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
 lastTrigger=button;viewerImage.src=button.dataset.zoom;viewerImage.alt=button.querySelector('img').alt;viewer.showModal();
}));
document.getElementById('close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer){const box=viewer.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)viewer.close();}});
viewer.addEventListener('close',()=>{if(lastTrigger)lastTrigger.focus();});
const current=document.querySelector('aside [aria-current]');
if(current&&window.innerWidth<=760)current.scrollIntoView({block:'nearest',inline:'center'});
document.addEventListener('keydown',event=>{
 if(viewer.open||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||/INPUT|TEXTAREA|SELECT|BUTTON|A|SUMMARY/.test(document.activeElement.tagName))return;
 const items=[...document.querySelectorAll('aside nav a')];const n=items.indexOf(current);
 if(event.key==='ArrowRight'&&items[n+1]){event.preventDefault();location.href=items[n+1].href;}
 if(event.key==='ArrowLeft'&&items[n-1]){event.preventDefault();location.href=items[n-1].href;}
});
