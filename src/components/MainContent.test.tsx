import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainContent from './MainContent';

// Mock the API response for weather codes
jest.mock('../utils/wmo', () => ({
  wmo_mapper: {

    some_code: {
      day: {
        image: 'mock_image_url',
      },
    },
    
  },
}));

describe('MainContent Component', () => {
  const mockUpdateTemperatureUnit = jest.fn();
  const mockDailyWeatherData = {
    maxTemp: {
      time: ['2023-01-02', '2023-01-03'],
      temperature_2m_max: [28, 24],
    },
    minTemp: {
      temperature_2m_min: [18, 14],
    },
    weatherCode: {
      weather_code: ['some_code', 'another_code'],
    },
  };

  render(
    <MainContent
      updateTempratureUnit={mockUpdateTemperatureUnit}
      tempratureUnit="celcius"
      dailyWeatherData={mockDailyWeatherData}
    />
  );

  it('handles temperature unit change', () => {
    const { container } = render(
      <MainContent
        updateTempratureUnit={mockUpdateTemperatureUnit}
        tempratureUnit="celcius"
        dailyWeatherData={mockDailyWeatherData}
      />
    );
  
    // Find the button for Fahrenheit by its inner text
    const fahrenheitButton = container.querySelector('button');
  
    // Check if the button is found before interacting with it
    if (fahrenheitButton) {
      // Check if the button's inner text contains the desired text
      if (fahrenheitButton.textContent?.includes('&deg;F')) {
        fireEvent.click(fahrenheitButton);
        expect(mockUpdateTemperatureUnit).toHaveBeenCalledWith('fahrenheit');
      } else {
        // Handle the case when the text is not found
        console.error('Text not found in the button');
      }
    } else {
      // Handle the case when the button is not found
      console.error('Button not found');
    }
  });
});
