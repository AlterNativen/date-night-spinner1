import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { DateOption } from "@shared/schema";

interface SpinnerWheelProps {
  onSpin: () => void;
  onSpinComplete: (result: string) => void;
  isSpinning: boolean;
}

export default function SpinnerWheel({ onSpin, onSpinComplete, isSpinning }: SpinnerWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [canSpin, setCanSpin] = useState(true);

  
  const { data: options = [] } = useQuery<DateOption[]>({
    queryKey: ["/api/date-options"],
  });

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || options.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Higher resolution for crisp rendering
    const scale = window.devicePixelRatio || 1;
    const size = 320;
    canvas.width = size * scale;
    canvas.height = size * scale;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(scale, scale);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 150;
    const totalWeight = options.reduce((acc, opt) => acc + opt.weight, 0);
    let startAngle = 0;

    ctx.clearRect(0, 0, size, size);



    // Draw outer shadow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fill();

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#8B4513";
    ctx.fill();

    options.forEach((opt, index) => {
      const sliceAngle = (2 * Math.PI * opt.weight) / totalWeight;
      
      // Draw slice with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, opt.color);
      gradient.addColorStop(1, opt.color + '88');
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "center";
      
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "600 9px 'Lora', serif";
      ctx.strokeStyle = "#2D1810";
      ctx.lineWidth = 2;
      ctx.strokeText(opt.label, radius * 0.7, 2);
      ctx.fillText(opt.label, radius * 0.7, 2);
      ctx.restore();

      startAngle += sliceAngle;
    });

    // Draw center circle with gradient
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
    centerGradient.addColorStop(0, "#8B4513");
    centerGradient.addColorStop(1, "#5D2A0A");
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const spin = () => {
    if (isSpinning || options.length === 0) return;
    
    onSpin();
    
    const totalWeight = options.reduce((acc, opt) => acc + opt.weight, 0);
    const randomValue = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    let winningIndex = 0;
    
    for (let i = 0; i < options.length; i++) {
      cumulativeWeight += options[i].weight;
      if (randomValue <= cumulativeWeight) {
        winningIndex = i;
        break;
      }
    }

    const spinAmount = Math.random() * 720 + 1440; // 4-6 full rotations
    const finalRotation = currentRotation + spinAmount;
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      canvas.style.transform = `rotate(${finalRotation}deg)`;
      
      setTimeout(() => {
        canvas.style.transition = "";
        setCurrentRotation(finalRotation % 360);
        
        onSpinComplete("");
      }, 3000);
    }
  };

  useEffect(() => {
    drawWheel();
  }, [options]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `rotate(${currentRotation}deg)`;
    }
  }, [currentRotation]);

  useEffect(() => {
    setCanSpin(!isSpinning);
  }, [isSpinning]);

  return (
    <div className="flex justify-center items-center">
      <div className="relative inline-block">
        <canvas 
          ref={canvasRef}
          className="wheel-shadow rounded-full cursor-pointer transition-opacity hover:opacity-90"
          onClick={spin}
          style={{ 
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
            width: '320px',
            height: '320px',
            display: 'block'
          }}
        />
        {/* Pointer */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 pointer-events-none z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600 drop-shadow-lg"></div>
        </div>
        {/* Spin instruction */}
        {!isSpinning && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 pointer-events-none">
            <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs">
              Click to spin
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
