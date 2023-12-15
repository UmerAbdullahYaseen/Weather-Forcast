import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from './SideBar';

// Mock data with additional values for testing
const mockDailyWeatherData = {
  maxTemp: {
    temperature_2m_max: [28, 24],
  },
  weatherCode: {
    weather_code: ['some_code'],
  },
};

describe('SideBar Component', () => {
  it('renders SideBar component with weather data', () => {
    const { getByText, getByAltText } = render(
      <SideBar
        tempratureUnit="celcius"
        dailyWeatherData={mockDailyWeatherData}
      />
    );

    // Check if the temperature is rendered
    const temperatureElement = getByText(/.*\s*°C.*/);
    expect(temperatureElement).toBeInTheDocument();

    // Check if the weather description is rendered
    const weatherDescriptionElement = getByText(/.*\s*°C.*/);
    expect(weatherDescriptionElement).toBeInTheDocument();

    // Check if the date is rendered
    const dateElement = getByText(/Today • \w+, \w+ \d+/);
    expect(dateElement).toBeInTheDocument();

    // Check if the weather image is rendered
    const weatherImage = getByAltText(/weather/);
    expect(weatherImage).toBeInTheDocument();
  });
});
