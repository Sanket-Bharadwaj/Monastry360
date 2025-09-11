import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

interface ThreePanoramaViewerProps {
  imageUrl: string;
  title: string;
  className?: string;
}

export default function ThreePanoramaViewer({ imageUrl, title, className }: ThreePanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const rafRef = useRef<number | null>(null);
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mouse interaction state
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create sphere geometry (inward-facing)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert to see from inside

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sphereRef.current = sphere;
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading panorama texture:', error);
        setError('Failed to load panorama image');
        setIsLoading(false);
      }
    );

    // Store refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Mouse event handlers
    const handleMouseDown = (event: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseRef.current.isDown) return;

      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;

      rotationRef.current.x += deltaY * 0.005;
      rotationRef.current.y += deltaX * 0.005;

      // Clamp vertical rotation
      rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));

      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const fov = camera.fov + event.deltaY * 0.05;
      camera.fov = Math.max(20, Math.min(100, fov));
      camera.updateProjectionMatrix();
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      // Apply rotation to camera
      cameraRef.current.rotation.x = rotationRef.current.x;
      cameraRef.current.rotation.y = rotationRef.current.y;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 400;
      
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      
      resizeObserver.disconnect();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometry.dispose();
    };
  }, [imageUrl]);

  const resetView = () => {
    rotationRef.current = { x: 0, y: 0 };
    if (cameraRef.current) {
      cameraRef.current.fov = 75;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>360° Panorama - {title}</span>
          <div className="flex gap-2">
            <Button onClick={resetView} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={toggleFullscreen} variant="outline" size="sm">
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4 mr-2" />
              ) : (
                <Maximize2 className="h-4 w-4 mr-2" />
              )}
              {isFullscreen ? 'Exit' : 'Fullscreen'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className="relative w-full h-96 bg-black rounded-b-lg overflow-hidden"
          style={{ cursor: mouseRef.current?.isDown ? 'grabbing' : 'grab' }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading 360° view...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            </div>
          )}
        </div>
        {!isLoading && !error && (
          <div className="p-4 bg-muted/50 text-xs text-muted-foreground">
            <p>Drag to look around • Scroll to zoom • Click fullscreen for better experience</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
