import React, { useRef, useEffect, useState } from 'react';
import { AtlasAnimationConfig } from '../config/atlas.config';

interface AnimatedSpriteProps {
  src: string;
  frameWidth: number;
  frameHeight: number;
  animation: AtlasAnimationConfig;
  mode?: 'idle' | 'walk' | 'action';
  scale?: number;
  className?: string;
  interactive?: boolean;
}

export const AnimatedSprite: React.FC<AnimatedSpriteProps> = ({
  src,
  frameWidth,
  frameHeight,
  animation,
  mode = 'idle',
  scale = 3,
  className = '',
  interactive = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentMode, setCurrentMode] = useState<'idle' | 'walk' | 'action'>(mode);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameIndex = 0;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImgError(false);
      renderLoop(performance.now());
    };

    img.onerror = () => {
      setImgError(true);
    };

    const renderLoop = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Disable image smoothing for sharp 16-bit pixel art
      ctx.imageSmoothingEnabled = false;

      // Determine active frames
      let frames = animation.idle;
      if (currentMode === 'walk' && animation.walk && animation.walk.length > 0) {
        frames = animation.walk;
      } else if (currentMode === 'action' && animation.action && animation.action.length > 0) {
        frames = animation.action;
      }

      if (!frames || frames.length === 0) {
        frames = [0];
      }

      const fps = animation.fps || 4;
      const interval = 1000 / fps;

      if (time - lastTime >= interval) {
        lastTime = time;
        frameIndex = (frameIndex + 1) % frames.length;
      }

      const frameNumber = frames[frameIndex] || 0;

      // Calculate column and row in spritesheet
      const cols = Math.max(1, Math.floor(img.width / frameWidth));
      const col = frameNumber % cols;
      const row = Math.floor(frameNumber / cols);

      const sx = col * frameWidth;
      const sy = row * frameHeight;

      // Clear & Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        sx,
        sy,
        frameWidth,
        frameHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [src, frameWidth, frameHeight, animation, currentMode]);

  const targetWidth = frameWidth * scale;
  const targetHeight = frameHeight * scale;

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none relative ${className}`}
      onClick={() => {
        if (!interactive) return;
        // Cycle between idle -> action -> walk on click
        if (currentMode === 'idle' && animation.action) setCurrentMode('action');
        else if (currentMode === 'action' && animation.walk) setCurrentMode('walk');
        else setCurrentMode('idle');
      }}
    >
      <canvas
        ref={canvasRef}
        width={targetWidth}
        height={targetHeight}
        style={{
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          imageRendering: 'pixelated',
        }}
        className={`pixelated transition-transform duration-200 ${
          interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
        }`}
        title={interactive ? 'Klicken, um Animation zu wechseln' : undefined}
      />

      {imgError && (
        <div className="text-[10px] text-rose-400 font-pixel text-center">
          Sprite fehlt
        </div>
      )}
    </div>
  );
};
