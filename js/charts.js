// Simple canvas line chart renderer to avoid heavy dependencies
// Provides lightweight drawing without requestAnimationFrame usage

function formatLabel(value, formatter) {
  if (typeof formatter === 'function') {
    return formatter(value);
  }
  return String(value);
}

export function renderSimpleLineChart(canvas, labels = [], values = [], options = {}) {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width || canvas.clientWidth;
  const height = canvas.height || canvas.clientHeight;
  const padding = options.padding ?? 40;
  const lineColor = options.lineColor ?? '#00C49A';
  const fillColor = options.fillColor ?? 'rgba(0, 196, 154, 0.1)';
  const gridColor = options.gridColor ?? '#E5E7EB';
  const axisColor = options.axisColor ?? '#9CA3AF';
  const yFormatter = options.yFormatter ?? ((value) => value.toFixed(0));
  const xFormatter = options.xFormatter ?? ((value) => value);
  const showMarkers = options.showMarkers ?? false;
  const yPaddingFactor = options.yPadding ?? 0.1;
  const baseline = options.baseline ?? 'auto';
  const gridLines = Math.max(1, options.gridLines ?? 4);

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.font = '12px "Inter", sans-serif';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (!Array.isArray(values) || values.length === 0) {
    ctx.fillStyle = axisColor;
    ctx.textAlign = 'center';
    ctx.fillText('No data available', width / 2, height / 2);
    ctx.restore();
    return;
  }

  let minValue = Math.min(...values);
  let maxValue = Math.max(...values);

  if (baseline === 'zero') {
    minValue = Math.min(0, minValue);
    maxValue = Math.max(0, maxValue);
  } else if (typeof baseline === 'number' && Number.isFinite(baseline)) {
    minValue = Math.min(baseline, minValue);
    maxValue = Math.max(baseline, maxValue);
  }

  const range = maxValue - minValue;
  if (range === 0) {
    const buffer = Math.abs(maxValue) || 1;
    minValue -= buffer * 0.05;
    maxValue += buffer * 0.05;
  } else {
    const paddingAmount = range * yPaddingFactor;
    minValue -= paddingAmount;
    maxValue += paddingAmount;
  }

  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const toX = (index) => {
    if (values.length === 1) {
      return padding + plotWidth / 2;
    }
    return padding + (index / (values.length - 1)) * plotWidth;
  };

  const toY = (value) => {
    if (maxValue === minValue) {
      return padding + plotHeight / 2;
    }
    const ratio = (value - minValue) / (maxValue - minValue);
    return padding + (1 - ratio) * plotHeight;
  };

  const points = values.map((value, index) => ({
    x: toX(index),
    y: toY(value),
    label: labels[index] ?? ''
  }));

  // Draw background grid lines
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= gridLines; i += 1) {
    const ratio = i / gridLines;
    const y = padding + ratio * plotHeight;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();

    const value = maxValue - ratio * (maxValue - minValue);
    ctx.fillStyle = axisColor;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatLabel(value, yFormatter), padding - 8, y);
  }
  ctx.setLineDash([]);

  // Draw axes
  ctx.strokeStyle = axisColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Draw area fill
  if (points.length > 1) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  // Draw line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = options.lineWidth ?? 2;
  ctx.stroke();

  // Optional markers
  if (showMarkers) {
    ctx.fillStyle = lineColor;
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, options.markerRadius ?? 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Draw selected X labels (first, mid, last)
  const labelCount = points.length;
  const xLabelPositions = [];
  if (labelCount <= 3) {
    for (let i = 0; i < labelCount; i += 1) {
      xLabelPositions.push(i);
    }
  } else {
    xLabelPositions.push(0, Math.floor((labelCount - 1) / 2), labelCount - 1);
  }

  ctx.fillStyle = axisColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  xLabelPositions.forEach((index) => {
    const point = points[index];
    ctx.fillText(formatLabel(point.label, xFormatter), point.x, height - padding + 8);
  });

  ctx.restore();
}
