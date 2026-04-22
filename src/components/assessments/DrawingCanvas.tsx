"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Eraser, Undo2, RotateCcw, Minus, Plus } from "lucide-react";

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  template?: "six-shapes" | "life-graph";
  onExport: (dataUrl: string) => void;
}

function drawSixShapesTemplate(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "#C8C0B8";
  ctx.lineWidth = 1.8;
  ctx.setLineDash([]);

  const colW = w / 3;
  const rowH = h / 2;
  const size = Math.min(colW, rowH) * 0.2;

  // 1) Circle - top left
  const cx1 = colW * 0.5, cy1 = rowH * 0.5;
  ctx.beginPath();
  ctx.arc(cx1, cy1, size, 0, Math.PI * 2);
  ctx.stroke();

  // 2) Square - top center
  const cx2 = colW * 1.5, cy2 = rowH * 0.5;
  ctx.strokeRect(cx2 - size, cy2 - size, size * 2, size * 2);

  // 3) Triangle - top right
  const cx3 = colW * 2.5, cy3 = rowH * 0.5;
  ctx.beginPath();
  ctx.moveTo(cx3, cy3 - size);
  ctx.lineTo(cx3 + size, cy3 + size);
  ctx.lineTo(cx3 - size, cy3 + size);
  ctx.closePath();
  ctx.stroke();

  // 4) Diamond - bottom left
  const cx4 = colW * 0.5, cy4 = rowH * 1.5;
  ctx.beginPath();
  ctx.moveTo(cx4, cy4 - size);
  ctx.lineTo(cx4 + size, cy4);
  ctx.lineTo(cx4, cy4 + size);
  ctx.lineTo(cx4 - size, cy4);
  ctx.closePath();
  ctx.stroke();

  // 5) Cross - bottom center
  const cx5 = colW * 1.5, cy5 = rowH * 1.5;
  const t = size * 0.35;
  ctx.beginPath();
  ctx.moveTo(cx5 - t, cy5 - size);
  ctx.lineTo(cx5 + t, cy5 - size);
  ctx.lineTo(cx5 + t, cy5 - t);
  ctx.lineTo(cx5 + size, cy5 - t);
  ctx.lineTo(cx5 + size, cy5 + t);
  ctx.lineTo(cx5 + t, cy5 + t);
  ctx.lineTo(cx5 + t, cy5 + size);
  ctx.lineTo(cx5 - t, cy5 + size);
  ctx.lineTo(cx5 - t, cy5 + t);
  ctx.lineTo(cx5 - size, cy5 + t);
  ctx.lineTo(cx5 - size, cy5 - t);
  ctx.lineTo(cx5 - t, cy5 - t);
  ctx.closePath();
  ctx.stroke();

  // 6) S-curve / wave - bottom right
  const cx6 = colW * 2.5, cy6 = rowH * 1.5;
  ctx.beginPath();
  ctx.moveTo(cx6 - size, cy6);
  ctx.bezierCurveTo(cx6 - size * 0.3, cy6 - size, cx6 + size * 0.3, cy6 + size, cx6 + size, cy6);
  ctx.stroke();
}

function drawLifeGraphTemplate(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, w, h);

  const left = 70, right = 30, top = 40, bottom = 55;
  const gw = w - left - right;
  const gh = h - top - bottom;
  const centerY = top + gh / 2;

  // Grid lines (horizontal)
  ctx.strokeStyle = "#E8E0D8";
  ctx.lineWidth = 0.8;
  for (let i = 0; i <= 10; i++) {
    const y = top + (gh / 10) * i;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(left + gw, y);
    ctx.stroke();
  }

  // Grid lines (vertical - per 5 years)
  const ages = [0, 5, 10, 15, 20, 25, 30];
  for (let i = 0; i < ages.length; i++) {
    const x = left + (gw / (ages.length - 1)) * i;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, top + gh);
    ctx.stroke();
  }

  // Center line (neutral / 보통) - thicker
  ctx.strokeStyle = "#C8C0B8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(left, centerY);
  ctx.lineTo(left + gw, centerY);
  ctx.stroke();

  // Axes
  ctx.strokeStyle = "#A09888";
  ctx.lineWidth = 1.5;
  // Y axis
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, top + gh);
  ctx.stroke();
  // X axis
  ctx.beginPath();
  ctx.moveTo(left, top + gh);
  ctx.lineTo(left + gw, top + gh);
  ctx.stroke();

  // Labels
  ctx.fillStyle = "#8C7A6A";
  ctx.font = "12px Pretendard, sans-serif";
  ctx.textAlign = "center";

  // X-axis labels (ages)
  for (let i = 0; i < ages.length; i++) {
    const x = left + (gw / (ages.length - 1)) * i;
    ctx.fillText(`${ages[i]}세`, x, top + gh + 20);
  }

  // Y-axis labels
  ctx.textAlign = "right";
  const yLabels = ["매우 좋음", "", "좋음", "", "", "보통", "", "", "나쁨", "", "매우 나쁨"];
  for (let i = 0; i < yLabels.length; i++) {
    if (yLabels[i]) {
      const y = top + (gh / 10) * i;
      ctx.fillText(yLabels[i], left - 8, y + 4);
    }
  }

  // Axis titles
  ctx.fillStyle = "#6E5E4E";
  ctx.font = "bold 13px Pretendard, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("나이", left + gw / 2, h - 8);

  ctx.save();
  ctx.translate(16, top + gh / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("감정의 높낮이", 0, 0);
  ctx.restore();
}

export default function DrawingCanvas({
  width = 800,
  height = 600,
  template,
  onExport,
}: DrawingCanvasProps) {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#1C1410");
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const historyRef = useRef<ImageData[]>([]);

  const drawTemplateBackground = useCallback(() => {
    const bgCanvas = bgCanvasRef.current;
    if (!bgCanvas) return;
    const ctx = bgCanvas.getContext("2d");
    if (!ctx) return;

    if (template === "six-shapes") {
      drawSixShapesTemplate(ctx, width, height);
    } else if (template === "life-graph") {
      drawLifeGraphTemplate(ctx, width, height);
    } else {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
    }
  }, [template, width, height]);

  useEffect(() => {
    drawTemplateBackground();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (template) {
      // Transparent foreground for template mode
      ctx.clearRect(0, 0, width, height);
    } else {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
    }
    saveHistory();
  }, [width, height, template, drawTemplateBackground]);

  function saveHistory() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, width, height);
    historyRef.current = [...historyRef.current, data];
    if (historyRef.current.length > 50) {
      historyRef.current = historyRef.current.slice(-50);
    }
  }

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);

    if (tool === "eraser" && template) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = lineWidth * 4;
    } else if (tool === "eraser") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = lineWidth * 4;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function endDraw() {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.globalCompositeOperation = "source-over";
    }
    saveHistory();
  }

  function undo() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (historyRef.current.length > 1) {
      historyRef.current = historyRef.current.slice(0, -1);
      const prev = historyRef.current[historyRef.current.length - 1];
      ctx.putImageData(prev, 0, 0);
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (template) {
      ctx.clearRect(0, 0, width, height);
    } else {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
    }
    saveHistory();
  }

  function handleExport() {
    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = canvasRef.current;
    if (!bgCanvas || !fgCanvas) return;

    // Merge both canvases
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(bgCanvas, 0, 0);
    ctx.drawImage(fgCanvas, 0, 0);
    onExport(offscreen.toDataURL("image/png"));
  }

  const colors = [
    "#1C1410", "#9C5030", "#547E68", "#506E8E",
    "#7E5E78", "#C9A07A", "#E74C3C", "#2ECC71",
  ];

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); setTool("pen"); }}
              className="w-7 h-7 rounded-full border-2 transition-transform cursor-pointer"
              style={{
                backgroundColor: c,
                borderColor: color === c && tool === "pen" ? "var(--color-primary)" : "transparent",
                transform: color === c && tool === "pen" ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <div className="w-px h-6 bg-border-light" />

        <div className="flex items-center gap-1">
          <button
            onClick={() => setLineWidth(Math.max(1, lineWidth - 1))}
            className="p-1.5 rounded-[var(--radius-sm)] hover:bg-bg-warm transition-colors cursor-pointer"
          >
            <Minus size={14} />
          </button>
          <span className="text-xs text-text-muted w-6 text-center">{lineWidth}</span>
          <button
            onClick={() => setLineWidth(Math.min(20, lineWidth + 1))}
            className="p-1.5 rounded-[var(--radius-sm)] hover:bg-bg-warm transition-colors cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="w-px h-6 bg-border-light" />

        <button
          onClick={() => setTool(tool === "eraser" ? "pen" : "eraser")}
          className={`p-2 rounded-[var(--radius-sm)] transition-colors cursor-pointer ${
            tool === "eraser" ? "bg-primary text-white" : "hover:bg-bg-warm text-text-muted"
          }`}
        >
          <Eraser size={16} />
        </button>
        <button
          onClick={undo}
          className="p-2 rounded-[var(--radius-sm)] hover:bg-bg-warm text-text-muted transition-colors cursor-pointer"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={clearCanvas}
          className="p-2 rounded-[var(--radius-sm)] hover:bg-bg-warm text-text-muted transition-colors cursor-pointer"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Canvas */}
      <div className="relative border border-border-light rounded-[var(--radius-md)] overflow-hidden bg-white">
        <canvas
          ref={bgCanvasRef}
          width={width}
          height={height}
          className="w-full touch-none"
          style={{ aspectRatio: `${width} / ${height}`, display: "block" }}
        />
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="absolute inset-0 w-full touch-none"
          style={{ aspectRatio: `${width} / ${height}`, display: "block" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>

      <button
        onClick={handleExport}
        className="w-full py-3 bg-primary text-white rounded-[var(--radius-sm)] text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
      >
        검사 완료 및 저장
      </button>
    </div>
  );
}
