import React from "react";
import { WeatherData } from "../hooks/useWeather";
import { wmo_mapper } from "../utils/wmo";

interface SideBarProps {
  tempratureUnit: string;
  weeklyWeatherData: WeatherData | null | any;
  dailyWeatherData: WeatherData | null | any;
  error: string | null;
  loading: boolean;
}

const SideBar = ({

  tempratureUnit,
  dailyWeatherData,
}: SideBarProps) => {
  const options = { weekday: "short", day: "numeric", month: "short" } as const;
  const currentDate = new Date();
  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 20;
  const weatherCodesMapper = wmo_mapper;

  return (
    <div className="flex flex-col bg-darkblue w-full lg:w-1/3 p-7 lg:p-4 xl:p-7 space-y-10 overflow-x-hidden">
      <>
        <div className="relative -mx-36 flex justify-center items-center">
          <img
            src="/images/Cloud-background.png"
            alt="bg"
            className="opacity-10 absolute max-w-52"
          />
          {
            <img
              src={
                isDayTime
                  ? weatherCodesMapper[
                      dailyWeatherData?.weatherCode?.weather_code[0]
                    ]?.day?.image
                  : weatherCodesMapper[
                      dailyWeatherData?.weatherCode?.weather_code[0]
                    ]?.night?.image
              }
              alt="weather"
              style={{ width: '300px', height: '300px', maxHeight: '500px' }}
            />
          }
        </div>
        <div className="flex flex-col items-center justify-evenly flex-grow pt-6">
          <h2 className="text-gray-150 text-3xl font-medium">Today's Weather</h2>
          <h1 className="text-gray-150 text-[144px] font-medium">
            {dailyWeatherData?.maxTemp?.temperature_2m_max[0]
              ? Math.floor(dailyWeatherData.maxTemp.temperature_2m_max[0])
              : ""}{" "}
            <span className="text-3xl text-gray-250">
              &deg;{tempratureUnit == "celcius" ? "C" : "F"}
            </span>
          </h1>
          <h1 className="text-3xl text-gray-250">
          {isDayTime
              ? weatherCodesMapper[dailyWeatherData?.weatherCode?.weather_code[0]]
                  ?.day.description
              : weatherCodesMapper[dailyWeatherData?.weatherCode?.weather_code[0]]
                  ?.night.description}
          </h1>
          <p className="text-gray-350 text-lg">Today &bull; {formatted}</p>
        </div>
      </>
    </div>
  );
};

export default SideBar;
