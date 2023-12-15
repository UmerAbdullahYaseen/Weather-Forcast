import React from "react";
import { wmo_mapper } from "../utils/wmo";
import SmallCard from "./SmallCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

interface MainContentProps {
  updateTempratureUnit: (unit: string) => void;
  tempratureUnit: string;
  dailyWeatherData: any;
}

const MainContent = ({
  updateTempratureUnit,
  tempratureUnit,
  dailyWeatherData,
}: MainContentProps) => {
  const reloadPage = () => {
    window.location.reload();
  };



  
  const weatherCodesMapper = wmo_mapper;

  return (
    <div className="text-gray-150 p-10 flex-grow">
      <div className="space-x-3 text-right">
       <button onClick={reloadPage} className="flex items-center">
        <FontAwesomeIcon icon={faSync} className="text-blue-500 mr-3" size="lg" />
        Refresh Weather
       </button>
        <button
          onClick={() => updateTempratureUnit("celcius")}
          className={`${
            tempratureUnit === "celcius"
              ? "bg-gray-150 text-darkblue"
              : "bg-[#585676] text-gray-150"
          } rounded-full w-10 h-10  font-bold text-xl`}
        >
          &deg;C
        </button>
        <button
          onClick={() => updateTempratureUnit("fahrenheit")}
          className={`${
            tempratureUnit === "fahrenheit"
              ? "bg-gray-150 text-darkblue"
              : "bg-[#585676] text-gray-150"
          } rounded-full w-10 h-10  font-bold text-xl`}
        >
          &deg;F
        </button>
      </div>

      <div className="my-10">
        <h3 className="text-2xl font-bold mb-5">Weekly Weather</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
          {Array.from({ length: 10 }, (_, index) => {
            if (index >= 1 && index < 8) {
              return (
                <SmallCard
                  key={index} // Don't forget to add a unique key when mapping in React
                  dayTitle={dailyWeatherData?.maxTemp?.time[index]}
                  img={
                    weatherCodesMapper[
                      dailyWeatherData?.weatherCode?.weather_code[index]
                    ]?.day?.image
                  }
                  max={dailyWeatherData.maxTemp?.temperature_2m_max[index]}
                  min={dailyWeatherData.minTemp?.temperature_2m_min[index]}
                  temp={tempratureUnit == "celcius" ? "C" : "F"}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
