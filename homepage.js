  const els = document.querySelectorAll('.reveal, .reveal-img');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e, i)=>{
      if(e.isIntersecting){
        setTimeout(()=> e.target.classList.add('in'), i * 90);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));

  // tap-to-open menus (works for both touch and click; also keeps
  // desktop hover menus open once tapped so the buttons stay reachable)
  const menuFigures = document.querySelectorAll('.gallery figure.has-menu');
  menuFigures.forEach(fig=>{
    const frame = fig.querySelector('.img-frame');
    frame.addEventListener('click', (e)=>{
      e.stopPropagation();
      const isOpen = fig.classList.contains('open');
      menuFigures.forEach(f => f.classList.remove('open'));
      if(!isOpen) fig.classList.add('open');
    });
  });
  document.addEventListener('click', ()=>{
    menuFigures.forEach(f => f.classList.remove('open'));
  });
  document.addEventListener('touchstart', (e)=>{
    const insideMenu = e.target.closest('.gallery figure.has-menu');
    if(!insideMenu){
      menuFigures.forEach(f => f.classList.remove('open'));
    }
  }, { passive:true });
