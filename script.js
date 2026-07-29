const N=192,c=document.querySelector('#canvas'),x=c.getContext('2d'),a=[],load=document.querySelector('#load'),bar=document.querySelector('#progress');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';let n=0,ok=0,last=-1;function f(){let h=document.querySelector('.hero'),p=Math.max(0,Math.min(1,-h.getBoundingClientRect().top/(h.offsetHeight-innerHeight)));return Math.round(p*(N-1))}function draw(i){if(!ok||i===last)return;last=i;let im=a[i],w=c.width,h=c.height,k=Math.max(w/im.width,h/im.height);x.fillStyle='#060606';x.fillRect(0,0,w,h);x.drawImage(im,(w-im.width*k)/2,(h-im.height*k)/2,im.width*k,im.height*k)}function size(){let d=Math.min(devicePixelRatio,2);c.width=innerWidth*d;c.height=innerHeight*d;draw(f())}size();for(let i=0;i<N;i++){let im=new Image;im.onload=()=>{bar.style.width=`${++n/N*100}%`;if(n===N){ok=1;draw(0);load.classList.add('done')}};im.src=`frames/frame_${String(i).padStart(5,'0')}.png`;a.push(im)}addEventListener('resize',size);addEventListener('scroll',()=>requestAnimationFrame(()=>draw(f())),{passive:true});let m=document.querySelector('#movement');m.onclick=()=>m.classList.toggle('active');document.querySelectorAll('.faqs button').forEach(b=>b.onclick=()=>b.classList.toggle('on'));let cur=document.querySelector('#cursor');if(matchMedia('(hover:hover)').matches)addEventListener('pointermove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});document.querySelector('#form').onsubmit=async e=>{
  e.preventDefault();
  const f=e.currentTarget, o=document.querySelector('#message');
  if(!(f.name.value && f.email.validity.valid)){
    o.textContent='Please enter your name and a valid email address.';
    return;
  }
  const btn=f.querySelector('button[type="submit"]');
  const originalLabel=btn.innerHTML;
  btn.disabled=true; btn.style.opacity='.6';
  o.textContent='Sending...';
  try{
    const res=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}});
    if(res.ok){
      o.textContent='Reservation noted — our atelier will contact you within 48 hours.';
      f.reset();
    } else {
      o.textContent='Something went wrong — please email us directly at atelier@gokboru.com.';
    }
  } catch(err){
    o.textContent='Something went wrong — please email us directly at atelier@gokboru.com.';
  } finally {
    btn.disabled=false; btn.style.opacity=''; btn.innerHTML=originalLabel;
  }
};

/* ---- Collection carousel (native CSS scroll-snap + geometric index detection) ---- */
/* Centering itself is done entirely by the browser's snap engine (CSS). The only JS job left is figuring out
   which slide is currently centered — done here by directly comparing element positions (always correct,
   unlike the old ratio-threshold approach which some slides never reliably crossed). */
(function(){
  const track=document.querySelector('#sTrack');
  if(!track)return;
  const slides=[...track.children];
  const dots=[...document.querySelectorAll('#sDots button')];

  function nearestIndex(){
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width/2;
    let best=0, bestDist=Infinity;
    slides.forEach((s,i)=>{
      const r = s.getBoundingClientRect();
      const c = r.left + r.width/2;
      const d = Math.abs(c-centerX);
      if(d<bestDist){bestDist=d;best=i;}
    });
    return best;
  }

  function refreshActive(){
    const i = nearestIndex();
    slides.forEach((s,j)=>s.classList.toggle('active', j===i));
    dots.forEach((d,j)=>d.classList.toggle('on', j===i));
  }

  function goTo(i){
    const n = (i+slides.length)%slides.length;
    slides[n].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  }

  let scrollTimer;
  track.addEventListener('scroll', ()=>{
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(refreshActive, 90);
  }, {passive:true});

  document.querySelector('.s-nav.prev').onclick=()=>goTo(nearestIndex()-1);
  document.querySelector('.s-nav.next').onclick=()=>goTo(nearestIndex()+1);
  dots.forEach((d,i)=>d.onclick=()=>goTo(i));

  addEventListener('resize', ()=>{ clearTimeout(scrollTimer); scrollTimer=setTimeout(refreshActive, 90); });
  refreshActive();
})();

/* ---- Performance cards: click to focus/center (added) ---- */
(function(){
  const grid = document.querySelector('#perfGrid');
  if(!grid) return;
  const cards = [...grid.children];
  cards.forEach(card=>{
    card.addEventListener('click', ()=>{
      if(card.classList.contains('active')) return;
      cards.forEach(c=>c.classList.remove('active'));
      card.classList.add('active');
      const others = cards.filter(c=>c!==card);
      card.style.order = 1;
      others[0].style.order = 0;
      others[1].style.order = 2;
    });
  });
})();

/* ---- Product card lightbox (added) ---- */
(function(){
  const lb = document.querySelector('#lightbox');
  const lbImg = document.querySelector('#lbImg');
  const lbClose = document.querySelector('#lbClose');
  if(!lb || !lbImg) return;
  function open(src, alt){
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
  }
  document.querySelectorAll('.p-card .p-media img').forEach(img=>{
    img.parentElement.addEventListener('click', ()=>open(img.src, img.alt));
  });
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e=>{ if(e.target===lb) close(); });
  addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
})();

/* ---- Mobile menu toggle (added) ---- */
(function(){
  const burger = document.querySelector('#burger');
  const mnav = document.querySelector('#mnav');
  if(!burger || !mnav) return;
  function toggle(open){
    const isOpen = open !== undefined ? open : !burger.classList.contains('open');
    burger.classList.toggle('open', isOpen);
    mnav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    mnav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  burger.addEventListener('click', ()=>toggle());
  mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>toggle(false)));
})();

/* ---- Scroll-reveal animation for section content (added) ---- */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll('.craft h2,.craft .features article,.spec>div,.perf h2,.cards h2,.voices blockquote,.faq>div,.faqs button,.reserve h2,.reserve form');
  targets.forEach(el=>el.classList.add('reveal'));
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -8% 0px'});
  targets.forEach(el=>io.observe(el));
})();


/* ---- Magnetic buttons + cursor grow-on-hover (added) ---- */
(function(){
  if(!matchMedia('(hover:hover)').matches) return;
  const cur = document.querySelector('#cursor');
  function magnetize(el, strength){
    el.addEventListener('mousemove', e=>{
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${(x/r.width*strength).toFixed(1)}px, ${(y/r.height*strength).toFixed(1)}px)`;
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
  }
  document.querySelectorAll('.cta,.ghost,.pre,.mnav-cta').forEach(el=>magnetize(el,14));
  document.querySelectorAll('.s-nav').forEach(el=>magnetize(el,10));
  if(cur){
    document.querySelectorAll('a,button,.p-card,.perf-card').forEach(el=>{
      el.addEventListener('mouseenter', ()=>cur.classList.add('big'));
      el.addEventListener('mouseleave', ()=>cur.classList.remove('big'));
    });
  }
})();

/* ---- 3D tilt on watch imagery (added) — applied to inner elements so it never fights the carousel's own scale/blur transform ---- */
(function(){
  if(!matchMedia('(hover:hover)').matches) return;
  function tilt(el, max){
    el.addEventListener('mousemove', e=>{
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width - 0.5;
      const py = (e.clientY - r.top)/r.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${(px*max).toFixed(2)}deg) rotateX(${(-py*max).toFixed(2)}deg) scale(1.05)`;
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
  }
  document.querySelectorAll('.s-slide img').forEach(el=>tilt(el,16));
  document.querySelectorAll('.p-media').forEach(el=>tilt(el,10));
})();

/* ---- Text scramble on section eyebrow labels (added) ---- */
(function(){
  const CHARS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  function scramble(el){
    const final = el.textContent;
    let iter = 0;
    clearInterval(el._scrambleTimer);
    el._scrambleTimer = setInterval(()=>{
      el.textContent = final.split('').map((ch,i)=>{
        if(ch===' '||ch==='·') return ch;
        if(i < iter) return final[i];
        return CHARS[Math.floor(Math.random()*CHARS.length)];
      }).join('');
      iter += final.length/16;
      if(iter >= final.length){
        el.textContent = final;
        clearInterval(el._scrambleTimer);
      }
    }, 32);
  }
  const targets = document.querySelectorAll('.hero-copy>p,.craft>p,.spec>div>p,.perf>p,.voices>p,.faq>div>p,.reserve>div>p,.cards>p');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ return; }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        scramble(en.target);
        io.unobserve(en.target);
      }
    });
  }, {threshold:0.4});
  targets.forEach(el=>io.observe(el));
})();

/* ---- Count-up animation for stat numbers (added) ---- */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function countUp(el){
    const node = el.firstChild;
    if(!node) return;
    const raw = node.textContent.trim();
    const m = raw.match(/^([^\d]*)([\d,]+)$/);
    if(!m) return;
    const prefix = m[1];
    const target = parseInt(m[2].replace(/,/g,''),10);
    const hasComma = m[2].includes(',');
    const dur = 1300, start = performance.now();
    function frame(t){
      const p = Math.min((t-start)/dur,1);
      const eased = 1-Math.pow(1-p,3);
      const cur = Math.round(target*eased);
      node.textContent = prefix + (hasComma ? cur.toLocaleString('en-US') : String(cur));
      if(p<1) requestAnimationFrame(frame);
      else node.textContent = prefix + m[2];
    }
    requestAnimationFrame(frame);
  }
  const targets = document.querySelectorAll('.numbers b,.perf-stat');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        countUp(en.target);
        io.unobserve(en.target);
      }
    });
  }, {threshold:0.5});
  targets.forEach(el=>io.observe(el));
})();

/* ---- Cookie consent banner (added) ---- */
(function(){
  const banner = document.querySelector('#cookieBanner');
  if(!banner) return;
  const KEY = 'gokboru_cookie_choice';
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch(e){}
  if(!saved){
    setTimeout(()=>banner.classList.add('show'), 900);
  }
  function choose(value){
    try { localStorage.setItem(KEY, value); } catch(e){}
    banner.classList.remove('show');
  }
  document.querySelector('#cookieAccept').onclick = ()=>choose('accepted');
  document.querySelector('#cookieDecline').onclick = ()=>choose('declined');
})();
