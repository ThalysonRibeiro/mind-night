"use client"
import React, { useRef, useEffect, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
};

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = (width: number, height: number, count: number) => {
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: random(1, 2),
        speedX: random(-0.05, 0.05),
        speedY: random(-0.05, 0.05),
        opacity: random(0.1, 1),
        opacitySpeed: random(0.005, 0.02),
      });
    }
    return arr;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particlesArr = createParticles(width, height, 160);
    setParticles(particlesArr);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Fundo transparente preto suave
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, width, height);

      particlesArr.forEach((p) => {
        // Atualiza posição
        p.x += p.speedX;
        p.y += p.speedY;

        // Limites da tela, rebote
        if (p.x <= 0 || p.x >= width) p.speedX *= -1;
        if (p.y <= 0 || p.y >= height) p.speedY *= -1;

        // Atualiza opacidade
        p.opacity += p.opacitySpeed;
        if (p.opacity >= 1 || p.opacity <= 0.1) p.opacitySpeed *= -1;

        // Desenha círculo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity.toFixed(2)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Redimensiona canvas quando janela muda
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particlesArr = createParticles(width, height, 160);
      setParticles(particlesArr);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Clique para repulsar partículas próximas
  const handleClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setParticles((oldParticles) =>
      oldParticles.map((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          // Aplica repulsão simples mudando velocidade
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100 * 0.5; // intensidade decrescente
          return {
            ...p,
            speedX: p.speedX + Math.cos(angle) * force,
            speedY: p.speedY + Math.sin(angle) * force,
          };
        }
        return p;
      })
    );
  };

  // Hover "bubble" — partículas ficam maiores perto do mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setParticles((oldParticles) =>
      oldParticles.map((p) => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          return { ...p, size: Math.min(p.size + 0.1, 5) };
        } else {
          return { ...p, size: Math.max(p.size - 0.1, 1) };
        }
      })
    );
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: 'transparent',
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    />
  );
};

export default ParticlesBackground;
