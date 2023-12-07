import { DailyWeatherData } from "../hooks/useDailyWeather";

const extractDailyData = (
  dailyWeatherData: DailyWeatherData[] | null | undefined
): any => {
  let weatherCode: any = null;
  let temperatureMax: any = null;
  let temperatureMin: any = null;

  if (!dailyWeatherData) {
    return [null, null, null];
  }

  dailyWeatherData.forEach((entry: DailyWeatherData) => {
    const { time, weather_code, temperature_2m_max, temperature_2m_min } =
      entry.daily;
    if (weather_code) {
      weatherCode = { time, weather_code }
    }
    if (temperature_2m_max) {
      temperatureMax = { time, temperature_2m_max };
    }
    if (temperature_2m_min) {
      temperatureMin = { time, temperature_2m_min };
    }
  });

  return {weatherCode: weatherCode, maxTemp: temperatureMax, minTemp: temperatureMin};
};

export default extractDailyData;
