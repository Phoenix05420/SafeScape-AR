import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface Props {
  value: string;
  size?: number;
}

// Deterministic matrix generator for valid visual QR-like representation
function generateMatrix(text: string, count = 21): boolean[][] {
  const matrix: boolean[][] = [];
  let seed = 0;
  for (let i = 0; i < text.length; i++) {
    seed = (seed * 31 + text.charCodeAt(i)) % 1000000;
  }

  for (let r = 0; r < count; r++) {
    matrix[r] = [];
    for (let c = 0; c < count; c++) {
      // Corner alignment markers (Standard QR visual structure)
      const inTopLeft = r < 7 && c < 7;
      const inTopRight = r < 7 && c >= count - 7;
      const inBottomLeft = r >= count - 7 && c < 7;

      if (inTopLeft || inTopRight || inBottomLeft) {
        const localR = inBottomLeft ? r - (count - 7) : r;
        const localC = inTopRight ? c - (count - 7) : c;
        const isBorder = localR === 0 || localR === 6 || localC === 0 || localC === 6;
        const isCenter = localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4;
        matrix[r][c] = isBorder || isCenter;
      } else {
        seed = (seed * 1103515245 + 12345) % 2147483648;
        matrix[r][c] = seed % 2 === 0;
      }
    }
  }
  return matrix;
}

export const QRCodeView: React.FC<Props> = ({ value, size = 160 }) => {
  const count = 21;
  const matrix = React.useMemo(() => generateMatrix(value, count), [value]);
  const cellSize = size / count;

  return (
    <View style={[styles.container, { width: size + 16, height: size + 16 }]}>
      <Svg width={size} height={size}>
        <Rect x="0" y="0" width={size} height={size} fill="#ffffff" />
        {matrix.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <Rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#0f172a"
              />
            ) : null
          )
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
