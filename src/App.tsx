import React from "react";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import { useState } from "react";
import Chart from "./components/Chart";
import useWeather from "./hooks/useWeather";
import useDailyWeather from "./hooks/useDailyWeather";

const App = () => {
  const [tempratureUnit, setTempratureUnit] = useState('celcius');
  const updateTempratureUnit = (unit: string) => {
    setTempratureUnit(unit);
  }

  const {error, loading, weeklyWeatherData} = useWeather(tempratureUnit);
  const {errorDaily, loadingDaily, dailyWeatherData} = useDailyWeather(tempratureUnit);

  if(!loading && !loadingDaily && !error && !errorDaily) {
    return (
      <div data-testid="root" className="bg-[#100E1D]">
        <div className="flex flex-col lg:flex-row">
          <SideBar dailyWeatherData={dailyWeatherData} tempratureUnit={tempratureUnit} error={error} loading={loading} weeklyWeatherData={weeklyWeatherData} />
       <MainContent dailyWeatherData={dailyWeatherData} tempratureUnit={tempratureUnit} updateTempratureUnit={updateTempratureUnit} />
        </div>
        <div className="mt-10 p-5">
          <Chart tempratureUnit={tempratureUnit}  error={error} loading={loading} weeklyWeatherData={weeklyWeatherData} />
        </div>
      </div>
    );
  }
  return <></>
};

export default App;
