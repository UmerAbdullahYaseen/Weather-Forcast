import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import * as useWeatherModule from './hooks/useWeather';
import * as useDailyWeatherModule from './hooks/useDailyWeather';

jest.mock('./hooks/useWeather');
jest.mock('./hooks/useDailyWeather');

test('renders the App component', async () => {
  // Mock the data returned by useWeather and useDailyWeather
  const mockWeatherData = {
    error: null,
    loading: false,
    weeklyWeatherData: { /* your mock data */ }
  };

  const mockDailyWeatherData = {
    errorDaily: null,
    loadingDaily: false,
    dailyWeatherData: { /* your mock data */ }
  };

  // Provide manual implementation for the mocked modules
  useWeatherModule.default.mockImplementation(() => mockWeatherData);
  useDailyWeatherModule.default.mockImplementation(() => mockDailyWeatherData);

  // Arrange & Act
  const { findByTestId } = render(<App />);

  // Wait for the component to finish rendering
  const rootElement = await findByTestId('root');

  // Assert
  expect(rootElement).toBeInTheDocument();
});



