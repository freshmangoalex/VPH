import { useEffect, useRef, useState } from 'react';

interface GradientPoint {
  x: number;
  y: number;
  hue: number;
  saturation: number;
  lightness: number;
  size: number;
  speed: number;
  baseSpeed: number; // Store original speed for acceleration/deceleration
  direction: number;
  velocityX: number; // For physics simulation
  velocityY: number; // For physics simulation
  opacity: number; // To control individual opacity
  glowIntensity: number; // For glow effects
  parallaxFactor?: number; // For parallax effect (how much this point moves with scroll)
  isTinsel?: boolean; // Whether this is a tiny tinsel dot
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
  const isScrollingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const scrollYRef = useRef(0);
  const tinselPointsRef = useRef<GradientPoint[]>([]);
  const pointCount = Math.max(5, numPoints);  // Ensure at least 5 points
  const tinselCount = 150; // Number of tiny tinsel points
  
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
          // Purple family - more vibrant
          hue = 273 + (Math.random() * 20 - 10);
          saturation = 80 + (Math.random() * 20 - 10); // Higher saturation for vibrancy
          lightness = 55 + (Math.random() * 10 - 5); // Slightly darker for more contrast
        } else if (colorFamily === 1) {
          // Blue family - more vibrant
          hue = 220 + (Math.random() * 20 - 10);
          saturation = 85 + (Math.random() * 15 - 7.5); // Higher saturation
          lightness = 60 + (Math.random() * 10 - 5);
        } else {
          // Pink family - more vibrant
          hue = 330 + (Math.random() * 40 - 20); // Wider hue range for pinks
          saturation = 90 + (Math.random() * 10 - 5);
          lightness = 65 + (Math.random() * 15 - 7.5);
        }
        
        const baseSpeed = 0.15 + Math.random() * 0.25;
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          hue,
          saturation,
          lightness,
          size: 150 + Math.random() * 300, // Larger size for more coverage
          speed: baseSpeed, // Current speed
          baseSpeed, // Original speed to return to after acceleration
          direction: Math.random() * Math.PI * 2,
          velocityX: 0, // Initial velocity for physics
          velocityY: 0, // Initial velocity for physics
          opacity: 0.3 + Math.random() * 0.2, // Randomize opacity for more depth
          glowIntensity: Math.random() * 0.5 // Random glow intensity
        });
      }
      
      pointsRef.current = points;
    };
    
    // Create tinsel points - the small floating dots
    const createTinselPoints = () => {
      const tinselPoints: GradientPoint[] = [];
      
      for (let i = 0; i < tinselCount; i++) {
        // Choose color family for tinsel (more white/light tones)
        let hue = Math.random() * 360; // Full hue range
        let saturation = 70 + Math.random() * 30; // High saturation
        let lightness = 75 + Math.random() * 20; // Bright
        
        // Randomize parallax factor for depth effect
        const parallaxFactor = 0.1 + Math.random() * 0.9;
        const baseSpeed = 0.3 + Math.random() * 0.6; // Tinsel moves faster than gradients
        
        tinselPoints.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          hue,
          saturation,
          lightness,
          size: 1 + Math.random() * 3, // Tiny dots
          speed: baseSpeed,
          baseSpeed,
          direction: Math.random() * Math.PI * 2,
          velocityX: 0,
          velocityY: 0,
          opacity: 0.2 + Math.random() * 0.6,
          glowIntensity: 0.1 + Math.random() * 0.2,
          parallaxFactor,
          isTinsel: true
        });
      }
      
      tinselPointsRef.current = tinselPoints;
    };
    
    createPoints();
    createTinselPoints();
    
    // Main animation function
    const render = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add blur effect when scrolling for a dreamy look
      if (isScrollingRef.current) {
        ctx.filter = 'blur(1px)';
      } else {
        ctx.filter = 'none';
      }

      // Process each point with physics
      pointsRef.current.forEach(point => {
        // Apply physics effects based on scrolling
        if (isScrollingRef.current) {
          // Accelerate points based on scroll velocity
          const scrollAcceleration = Math.abs(scrollVelocityRef.current) * 0.01;
          const acceleratedSpeed = point.baseSpeed * (1 + scrollAcceleration);
          point.speed = Math.min(acceleratedSpeed, point.baseSpeed * 3); // Cap the max speed
          
          // Add some velocity influenced by scroll direction
          point.velocityY += scrollVelocityRef.current * 0.005;
          
          // Increase glow intensity during scrolling
          point.glowIntensity = Math.min(1.0, point.glowIntensity + 0.05);
        } else {
          // Gradually return to base speed when not scrolling
          if (point.speed > point.baseSpeed) {
            point.speed = Math.max(point.baseSpeed, point.speed * 0.95);
          }
          
          // Dampen velocity when not scrolling
          point.velocityX *= 0.95;
          point.velocityY *= 0.95;
          
          // Reduce glow intensity
          point.glowIntensity = Math.max(0.2, point.glowIntensity * 0.95);
        }
        
        // Add mouse interaction physics
        if (isActiveRef.current) {
          const dx = mousePositionRef.current.x - point.x;
          const dy = mousePositionRef.current.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 400) {
            // Apply attraction force
            const force = (400 - distance) / 400 * sensitivity * 2;
            point.velocityX += (dx / distance) * force;
            point.velocityY += (dy / distance) * force;
            
            // Increase color brightness and glow near mouse
            point.lightness = Math.min(90, point.lightness + 0.3);
            point.glowIntensity = Math.min(1.5, point.glowIntensity + 0.1);
            point.opacity = Math.min(0.8, point.opacity + 0.01);
          } else {
            // Restore original properties over time
            if (point.lightness > 65) {
              point.lightness -= 0.1;
            }
            if (point.opacity > 0.3) {
              point.opacity -= 0.01;
            }
          }
        } else {
          // Restore original properties when inactive
          if (point.lightness > 65) {
            point.lightness -= 0.05;
          }
          if (point.opacity > 0.3) {
            point.opacity -= 0.005;
          }
        }
        
        // Apply physics-based movement
        point.x += Math.cos(point.direction) * point.speed + point.velocityX;
        point.y += Math.sin(point.direction) * point.speed + point.velocityY;
        
        // Bounce off walls with physics
        if (point.x < 0 || point.x > canvas.width) {
          point.direction = Math.PI - point.direction;
          point.velocityX *= -0.5; // Dampen horizontal velocity on bounce
          point.velocityY *= 0.9; // Reduce vertical velocity slightly
        }
        if (point.y < 0 || point.y > canvas.height) {
          point.direction = -point.direction;
          point.velocityY *= -0.5; // Dampen vertical velocity on bounce
          point.velocityX *= 0.9; // Reduce horizontal velocity slightly
        }
        
        // Constrain to canvas
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));
        
        // Draw the gradient with enhanced glow effect
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size + (point.glowIntensity * 50) // Size increases with glow intensity
        );
        
        // Add more color stops for better glow effect
        gradient.addColorStop(0, `hsla(${point.hue}, ${point.saturation}%, ${point.lightness}%, ${point.opacity + 0.2})`);
        gradient.addColorStop(0.3, `hsla(${point.hue}, ${point.saturation}%, ${point.lightness}%, ${point.opacity})`);
        gradient.addColorStop(0.7, `hsla(${point.hue}, ${point.saturation}%, ${Math.max(30, point.lightness - 10)}%, ${point.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${point.hue}, ${point.saturation}%, ${point.lightness}%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size + (point.glowIntensity * 50), 0, Math.PI * 2);
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
    
    const handleScroll = () => {
      // Calculate scroll velocity
      const currentScrollY = window.scrollY;
      scrollVelocityRef.current = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      
      // Set scrolling state
      isScrollingRef.current = true;
      handleUserActivity();
      
      // Reset scrolling state after a short delay
      if (inactiveTimerRef.current !== undefined) {
        window.clearTimeout(inactiveTimerRef.current);
      }
      
      inactiveTimerRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
        scrollVelocityRef.current = 0;
      }, 100) as unknown as number;
    };
    
    // Start animation and add event listeners
    animationRef.current = requestAnimationFrame(render);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
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
      window.removeEventListener('scroll', handleScroll);
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
