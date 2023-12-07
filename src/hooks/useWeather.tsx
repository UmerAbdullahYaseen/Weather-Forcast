import { useEffect, useState } from "react";

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  hourly: HourlyData;
}

export interface UseWeatherHook {
  weeklyWeatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const useWeather = (tempratureUnit: string): UseWeatherHook => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<WeatherData | null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    latitude: number,
    longitude: number
  ): Promise<void> => {
    try {
      const urlQueryParams = new URLSearchParams();
      urlQueryParams.set("latitude", `${latitude}`);
      urlQueryParams.set("longitude", `${longitude}`);
      urlQueryParams.set("hourly", "temperature_2m"); 
      urlQueryParams.set("forecast_days", `10`)
      if (tempratureUnit == "fahrenheit") {
        urlQueryParams.set("temperature_unit", "fahrenheit");
      }
      const weatherUrl = "https://api.open-meteo.com/v1/forecast";
      const response = await fetch(weatherUrl + "?" + urlQueryParams);
      const data: WeatherData = await response.json();
      setWeeklyWeatherData(data);
    } catch (error: any) {
      setError(error.message || "Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setError("Error getting location");
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
      setError("Geolocation is not supported by your browser");
    }
  }, [tempratureUnit]);

  return { weeklyWeatherData, loading, error };
};

export default useWeather;
