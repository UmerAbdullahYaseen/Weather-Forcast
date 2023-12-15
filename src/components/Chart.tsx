import React from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { WeatherData } from "../hooks/useWeather";

Chart.register(...registerables);

interface LineChartProps {
  tempratureUnit: string,
  weeklyWeatherData: WeatherData | null
  error: string | null,
  loading: boolean,
}

const LineChart = ({ tempratureUnit, error, loading, weeklyWeatherData }: LineChartProps) => {
  const labels = weeklyWeatherData?.hourly?.time?.map((time) =>
    new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", day: '2-digit' })
  ) || [];
  const temperatureData = weeklyWeatherData?.hourly?.temperature_2m || [];
  const tempratureSign = tempratureUnit == 'celcius' ? '(°C)' : '(°F)'

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature " + tempratureSign,
        backgroundColor: "rgb(136 134 157)",
        borderColor: "rgb(136 134 157)",
        data: temperatureData,
      },
    ],
  };

  if (!loading && !error) {
    return (
      <div style={{ position: "relative", margin: "auto", height: '50vh' }} className="bg-darkblue p-5">
          <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    );
  }

  return <></>;
};

export default LineChart;