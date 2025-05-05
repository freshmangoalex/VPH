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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState<GradientPoint[]>([]);
  const animationRef = useRef<number>();
  const inactiveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(false);
  
  // Setup canvas and create initial points
  useEffect(() => {
    const setupCanvas = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
      
      // Create initial gradient points
      const initialPoints: GradientPoint[] = [];
      
      for (let i = 0; i < numPoints; i++) {
        // Choose one of the three color families (Purple, Blue, or Pink)
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
        
        initialPoints.push({
          x: Math.random() * width,
          y: Math.random() * height,
          hue,
          saturation,
          lightness,
          size: 100 + Math.random() * 200,
          speed: 0.2 + Math.random() * 0.3,
          direction: Math.random() * Math.PI * 2
        });
      }
      
      setPoints(initialPoints);
    };
    
    setupCanvas();
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [numPoints]);
  
  // Handle mouse movement and user activity
  useEffect(() => {
    const handleUserActivity = () => {
      setIsActive(true);
      
      if (inactiveTimerRef.current) {
        clearTimeout(inactiveTimerRef.current);
      }
      
      inactiveTimerRef.current = setTimeout(() => {
        setIsActive(false);
      }, 2000);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      handleUserActivity();
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleUserActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleUserActivity);
      
      if (inactiveTimerRef.current) {
        clearTimeout(inactiveTimerRef.current);
      }
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || points.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updatedPoints = [...points];
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each point
      updatedPoints.forEach((point, index) => {
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
        if (isActive) {
          const dx = mousePosition.x - point.x;
          const dy = mousePosition.y - point.y;
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
        
        // Update the point in our array
        updatedPoints[index] = point;
      });
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    animationRef.current = requestAnimationFrame(render);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [points, isActive, mousePosition, sensitivity]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-70 transition-opacity duration-1000 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
