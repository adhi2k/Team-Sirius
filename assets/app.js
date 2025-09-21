// Render simple view-only donut charts using conic-gradient for modern browsers.
// Accessible labels provided via aria-label on .donut container.

function renderDonuts(){
  document.querySelectorAll('.donut').forEach(el=>{
    const segs = (el.getAttribute('data-segments')||'').split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
    const cols = (el.getAttribute('data-colors')||'').split(',').map(s=>s.trim());
    if(!segs.length || segs.length!==cols.length) return;
    const sum = segs.reduce((a,b)=>a+b,0);
    let acc = 0;
    const stops = segs.map((v,i)=>{
      const start = (acc/sum)*100; acc+=v;
      const end = (acc/sum)*100;
      return `${cols[i]} ${start}% ${end}%`;
    }).join(', ');
    el.style.background = `conic-gradient(${stops})`;
  });
}

document.addEventListener('DOMContentLoaded', renderDonuts);
