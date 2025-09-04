// 색상 어둡게 하는 함수
export const darkenColor =(hexColor: string, amount: number) => {
  const [r, g, b] = hexToRgb(hexColor);
  return `rgb(${Math.floor(r * (1 - amount))}, ${Math.floor(g * (1 - amount))}, ${Math.floor(b * (1 - amount))})`;
}

// HEX -> RGB 변환 함수
export const hexToRgb = (hex: string): [number, number, number] => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
