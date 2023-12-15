// __mocks__/react-chartjs-2.ts
import React from 'react';

const mockChart: React.FC = ({ children }) => React.createElement('div', null, children);


export const Chart = jest.fn();
export const Line = mockChart;
export const Bar = mockChart;
// Add more chart types if needed

export { mockChart };
