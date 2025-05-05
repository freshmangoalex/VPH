import { useEffect, useRef, useState } from 'react';

interface GradientPoint {
  x: number;
  y: number;
  hue: number;
  saturation: number;
  lightness: number;
  size: number;
  speed: number;
  direction: number;
}

interface InteractiveBackgroundProps {
  numPoints?: number;
  sensitivity?: number;
  className?: string;
}

export default function InteractiveBackground({
  numPoints = 5,
  sensitivity = 0.03,
  className = ''
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  const pointsRef = useRef<GradientPoint[]>([]);
  const animationRef = useRef<number>();
  const inactiveTimerRef = useRef<number>();
  const isActiveRef = useRef(false);
  const pointCount = Math.max(5, numPoints);  // Ensure at least 5 points
  
  // Setup canvas and points
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // Create initial points
    const createPoints = () => {
      const points: GradientPoint[] = [];
      
      for (let i = 0; i < pointCount; i++) {
        // Choose color family (Purple, Blue, or Pink)
        const colorFamily = Math.floor(Math.random() * 3);
        
        let hue: number;
        let saturation: number;
        let lightness: number;
        
        if (colorFamily === 0) {
          // Purple family
          hue = 273 + (Math.random() * 15 - 7.5);
          saturation = 29 + (Math.random() * 10 - 5);
          lightness = 46 + (Math.random() * 10 - 5);
        } else if (colorFamily === 1) {
          // Blue family
          hue = 217 + (Math.random() * 15 - 7.5);
          saturation = 74 + (Math.random() * 10 - 5);
          lightness = 59 + (Math.random() * 10 - 5);
        } else {
          // Pink family
          hue = 350 + (Math.random() * 15 - 7.5);
          saturation = 90 + (Math.random() * 10 - 5);
          lightness = 71 + (Math.random() * 10 - 5);
        }
        
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          hue,
          saturation,
          lightness,
          size: 150 + Math.random() * 300, // Larger size for more coverage
          speed: 0.15 + Math.random() * 0.25, // Slightly slower for smoother movement
          direction: Math.random() * Math.PI * 2
        });
      }
      
      pointsRef.current = points;
    };
    
    createPoints();
    
    // Main animation function
    const render = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Process each point
      pointsRef.current.forEach(point => {
        // Move points in a floating manner
        point.x += Math.cos(point.direction) * point.speed;
        point.y += Math.sin(point.direction) * point.speed;
        
        // Bounce off walls
        if (point.x < 0 || point.x > canvas.width) {
          point.direction = Math.PI - point.direction;
        }
        if (point.y < 0 || point.y > canvas.height) {
          point.direction = -point.direction;
        }
        
        // Constrain to canvas
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));
        
        // If mouse is active, have points gently move toward mouse
        if (isActiveRef.current) {
          const dx = mousePositionRef.current.x - point.x;
          const dy = mousePositionRef.current.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 400) {
            point.x += (dx / distance) * sensitivity * 5;
            point.y += (dy / distance) * sensitivity * 5;
            
            // Increase color brightness near mouse
            point.lightness = Math.min(85, point.lightness + 0.1);
          } else {
            // Restore original lightness over time
            if (point.lightness > 71) {
              point.lightness -= 0.05;
            }
          }
        } else {
          // Restore original lightness when inactive
          if (point.lightness > 71) {
            point.lightness -= 0.02;
          }
        }
        
        // Draw the gradient for this point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size
        );
        
        gradient.addColorStop(0, `hsla(${point.hue}, ${point.saturation}%, ${point.lightness}%, 0.3)`);
        gradient.addColorStop(1, `hsla(${point.hue}, ${point.saturation}%, ${point.lightness}%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    // Event handlers
    const handleResize = () => {
      resizeCanvas();
      // Adjust existing points to fit new dimensions
      pointsRef.current = pointsRef.current.map(point => ({
        ...point,
        x: (point.x / canvas.width) * window.innerWidth,
        y: (point.y / canvas.height) * window.innerHeight
      }));
    };
    
    const handleUserActivity = () => {
      isActiveRef.current = true;
      
      if (inactiveTimerRef.current !== undefined) {
        window.clearTimeout(inactiveTimerRef.current);
      }
      
      inactiveTimerRef.current = window.setTimeout(() => {
        isActiveRef.current = false;
      }, 2000) as unknown as number;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      handleUserActivity();
    };
    
    // Start animation and add event listeners
    animationRef.current = requestAnimationFrame(render);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleUserActivity);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (inactiveTimerRef.current !== undefined) {
        window.clearTimeout(inactiveTimerRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, [numPoints, sensitivity]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-70 transition-opacity duration-1000 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
