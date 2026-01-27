// Doughmination Portfolio - Interactive Effects

document.addEventListener('DOMContentLoaded', () => {
  // Terminal cursor effect for h1
  const addCursorEffect = () => {
    const h1 = document.querySelector('h1');
    if (h1) {
      const text = h1.textContent;
      h1.innerHTML = text + '<span class="cursor">_</span>';
      
      // Add cursor blink animation
      const style = document.createElement('style');
      style.textContent = `
        .cursor {
          animation: blink 1s infinite;
          color: var(--pastel-green);
          font-weight: bold;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Typing effect for first load (optional - can be removed if too flashy)
  const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    
    type();
  };

  // Add glitch effect on hover for project cards
  const addGlitchEffect = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const h4 = card.querySelector('h4');
        if (h4 && !h4.dataset.glitched) {
          const originalText = h4.textContent;
          const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
          
          // Brief glitch effect
          let glitchCount = 0;
          const glitchInterval = setInterval(() => {
            if (glitchCount < 3) {
              h4.textContent = originalText
                .split('')
                .map(char => Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
                .join('');
              glitchCount++;
            } else {
              clearInterval(glitchInterval);
              h4.textContent = originalText;
            }
          }, 50);
        }
      });
    });
  };

  // Matrix-style rain effect in background (subtle)
  const createMatrixRain = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.15';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(26, 29, 35, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#a8dadc';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  // Smooth scroll reveal animation
  const observeElements = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  };

  // Easter egg: Konami code
  const konamiCode = () => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let position = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === code[position]) {
        position++;
        if (position === code.length) {
          triggerEasterEgg();
          position = 0;
        }
      } else {
        position = 0;
      }
    });
  };

  const triggerEasterEgg = () => {
    const body = document.body;
    body.style.animation = 'rainbow 2s linear';
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      body.style.animation = '';
    }, 2000);

    console.log('🎮 Konami Code Activated! #archbtw');
  };

  // Initialize effects
  addCursorEffect();
  addGlitchEffect();
  createMatrixRain();
  observeElements();
  konamiCode();

  // Add Arch badge pulse on hover
  const archBadge = document.querySelector('.arch-badge');
  if (archBadge) {
    archBadge.addEventListener('mouseenter', () => {
      console.log('I use Arch btw 🐧');
    });
  }
});

// Console easter egg
console.log('%c> sudo neofetch', 'color: #a8dadc; font-family: monospace; font-size: 14px;');
console.log('%c  Doughmination Portfolio v1.0', 'color: #d4c5f9; font-family: monospace;');
console.log('%c  OS: Arch Linux btw 🐧', 'color: #b8e0d2; font-family: monospace;');
console.log('%c  Uptime: Professional AF', 'color: #f1c0e8; font-family: monospace;');
console.log('%c  Shell: Zsh + Vim + Coffee', 'color: #cfe8fc; font-family: monospace;');
console.log('%c> _', 'color: #a8dadc; font-family: monospace; font-size: 14px;');