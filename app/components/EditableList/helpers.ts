export type LayoutPosition = {
  screenX: number;
  screenY: number;
  width: number;
  height: number;
};

export const isOverPosition = (
  x: number,
  y: number,
  position: LayoutPosition
): boolean => {
  const { screenX, screenY, width, height } = position;
  return (
    x > screenX && x < screenX + width && y > screenY && y < screenY + height
  );
};
