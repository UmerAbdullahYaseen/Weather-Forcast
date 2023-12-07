import { useEffect, useState } from "react";
import extractDailyData from "../utils/extractDailyData";

export interface DailyWeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: {
      time: string;
      weather_code?: string;
      temperature_2m_max?: string;
      temperature_2m_min?: string;
    };
    daily: {
      time: string[];
      weather_code?: number[];
      temperature_2m_max?: number[];
      temperature_2m_min?: number[]; 
    };
  }

export interface UseWeatherHook {
  dailyWeatherData?: any;
  loadingDaily: boolean;
  errorDaily: string | null;
}

const useDailyWeather = (tempratureUnit: string): UseWeatherHook => {
  const [dailyWeatherData, setDailyWeatherData] =
    useState<any>(null);
  const [loadingDaily, setLoadingDaily] = useState<boolean>(true);
  const [errorDaily, setErrorDaily] = useState<string | null>(null);

  const fetchData = async (
    latitude: number,
    longitude: number
  ): Promise<void> => {
    try {
      const urlQueryParams$1 = new URLSearchParams();
      const urlQueryParams$2 = new URLSearchParams();
      const urlQueryParams$3 = new URLSearchParams();

      urlQueryParams$1.set("latitude", `${latitude}`);
      urlQueryParams$1.set("longitude", `${longitude}`);
      

      urlQueryParams$2.set("latitude", `${latitude}`);
      urlQueryParams$2.set("longitude", `${longitude}`);

      urlQueryParams$3.set("latitude", `${latitude}`);
      urlQueryParams$3.set("longitude", `${longitude}`);

      urlQueryParams$1.set("forecast_days", `10`);
      urlQueryParams$1.set('daily','weather_code');

      urlQueryParams$2.set("forecast_days", `10`);
      urlQueryParams$2.set('daily','temperature_2m_max');

      
      urlQueryParams$3.set("forecast_days", `10`);
      urlQueryParams$3.set('daily','temperature_2m_min');

      if (tempratureUnit == "fahrenheit") {
        urlQueryParams$1.set("temperature_unit", "fahrenheit");
        urlQueryParams$2.set("temperature_unit", "fahrenheit");
        urlQueryParams$3.set("temperature_unit", "fahrenheit");
      }
      const weatherUrl = "https://api.open-meteo.com/v1/forecast";
      const responseArray = await Promise.all([
        fetch(weatherUrl + "?" + urlQueryParams$1),
        fetch(weatherUrl + "?" + urlQueryParams$2),
        fetch(weatherUrl + "?" + urlQueryParams$3)
      ]);
      
      // Assuming each response is JSON, you can parse them like this
      const dataArray: DailyWeatherData[] = await Promise.all(responseArray.map(response => response.json()));
      setDailyWeatherData(extractDailyData(dataArray));
    } catch (error: any) {
      setErrorDaily(error.message || "Error fetching weather data");
    } finally {
      setLoadingDaily(false);
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
          setErrorDaily("Error getting location");
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
      setErrorDaily("Geolocation is not supported by your browser");
    }
  }, [tempratureUnit]);
  return { loadingDaily, errorDaily, dailyWeatherData };
};

export default useDailyWeather;
