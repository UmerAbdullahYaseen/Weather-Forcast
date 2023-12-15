import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LineChart from './Chart';

// Mock the react-chartjs-2 module
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mock-chart">{/* Mocked Chart Component */}</div>,
}));

describe('LineChart Component', () => {
  const mockData = {
    tempratureUnit: 'celcius',
    weeklyWeatherData: {
      hourly: {
        time: [new Date().toISOString()],
        temperature_2m: [25],
      },
    },
    error: null,
    loading: false,
  };

  it('renders LineChart component with data', () => {
    const { getByTestId } = render(
      <LineChart
        tempratureUnit={mockData.tempratureUnit}
        weeklyWeatherData={mockData.weeklyWeatherData}
        error={mockData.error}
        loading={mockData.loading}
      />
    );

    // Assert that the container with the class "bg-darkblue" is rendered
    const chartContainer = getByTestId('mock-chart').closest('.bg-darkblue');
    expect(chartContainer).toBeInTheDocument();
  });

  
});
