"use client"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./homepage.module.css"
import axios from "axios";

import React, { useState } from 'react';
import MyPlot from "@/components/plot/Plot";
import InputField from "@/components/inputField/InputField";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [options, setOptions] = useState([]);
  
  const [selectedYear, setSelectedYear] = useState(null);
  
  const [population, setPopulation] = useState('');
  const [isPopulationCheckboxChecked, setIsPopulationCheckboxChecked] = useState(false);
  
  const [gaoi, setGaoi] = useState('');
  const [isGaoiCheckboxChecked, setIsGaoiCheckboxChecked] = useState(false);

  const [temperature, setTemperature] = useState('');
  const [isTemperatureCheckboxChecked, setIsTemperatureCheckboxChecked] = useState(false);
  
  const [gdp, setGdp] = useState('');
  const [isGdpCheckboxChecked, setIsGdpCheckboxChecked] = useState(false);

  const [avgLife, setAvgLife] = useState('');
  const [isAvgLifeCheckboxChecked, setIsAvgLifeCheckboxChecked] = useState(false);

  const [unemploymentRate, setUnemploymentRate] = useState('');
  const [isUnemploymentRateCheckboxChecked, setIsUnemploymentRateCheckboxChecked] = useState(false);

  const [ginnyCoef, setGinnyCoef] = useState('');
  const [isGinnyCoefCheckboxChecked, setIsGinnyCoefCheckboxChecked] = useState(false);

  const [plotExportDataX, setPlotExportDataX] = useState([]);
  const [plotExportDataY, setPlotExportDataY] = useState([]);
  const [plotImportDataX, setPlotImportDataX] = useState([]);
  const [plotImportDataY, setPlotImportDataY] = useState([]);
  const [plotFoodDataX, setPlotFoodDataX] = useState([]);
  const [plotFoodDataY, setPlotFoodDataY] = useState([]);
  const [plotProductionDataX, setPlotProductionDataX] = useState([]);
  const [plotProductionDataY, setPlotProductionDataY] = useState([]);
  
  const clearErrors = () => {
    setInputError({
      fieldsError: '',
      negativeError: '',
      yearError: '',
      productError: '',
      dotError: ''
    });
  };
  
  const handleKeyDown = (event) => {
    if (event.key === '+' || event.key === '-' || event.key === ',') {
      event.preventDefault();
    }
  };

  const handleRationalKeyDown = (event) => {
    if (event.key === '+' || event.key === '-' || event.key === '.' || event.key === ',') {
      event.preventDefault();
    }
  };

  const [inputError, setInputError] = useState({
    fieldsError: '',
    negativeError: '',
    yearError: '',
    productError: '',
  });

  const handlePopulationCheckboxChange = () => {
    clearErrors()
    setIsPopulationCheckboxChecked(!isPopulationCheckboxChecked);
    setPopulation(''); 
  };

  const handlePopulationChange = (e) => {
    clearErrors()
    if (isPopulationCheckboxChecked) {
      setPopulation(e.target.value);
      
    }
  };

  const handleTemperatureCheckboxChange = () => {
    clearErrors()
    setIsTemperatureCheckboxChecked(!isTemperatureCheckboxChecked);
    setTemperature(' '); 
  };

  const handleTemperatureChange = (e) => {
    clearErrors()
    if (isTemperatureCheckboxChecked) {
      setTemperature(e.target.value);
    }
  };

  const handleGdpCheckboxChange = () => {
    clearErrors()
    setIsGdpCheckboxChecked(!isGdpCheckboxChecked);
    setGdp(' '); 
  };

  const handleGdpChange = (e) => {
    clearErrors()
    if (isGdpCheckboxChecked) {
      setGdp(e.target.value);
    }
  };

  const handleAvgLifeCheckboxChange = () => {
    clearErrors()
    setIsAvgLifeCheckboxChecked(!isAvgLifeCheckboxChecked);
    setAvgLife(' '); 
  };

  const handleAvgLifeChange = (e) => {
    clearErrors()
    if (isAvgLifeCheckboxChecked) {
      setAvgLife(e.target.value);
    }
  };

  const handleUnemploymentRateCheckboxChange = () => {
    clearErrors()
    setIsUnemploymentRateCheckboxChecked(!isUnemploymentRateCheckboxChecked);
    setUnemploymentRate(' '); 
  };

  const handleUnemploymentRateChange = (e) => {
    clearErrors()
    if (isUnemploymentRateCheckboxChecked) {
      setUnemploymentRate(e.target.value);
    }
  };

  const handleGinnyCoefCheckboxChange = () => {
    clearErrors()
    setIsGinnyCoefCheckboxChecked(!isGinnyCoefCheckboxChecked);
    setGinnyCoef(' '); 
  };

  const handleGinnyCoefChange = (e) => {
    clearErrors()
    if (isGinnyCoefCheckboxChecked) {
      setGinnyCoef(e.target.value);
    }
  };

  const handleGaoiCheckboxChange = () => {
    clearErrors()
    setIsGaoiCheckboxChecked(!isGaoiCheckboxChecked);
    setGaoi(' '); 
  };

  const handleGaoiChange = (e) => {
    clearErrors()
    if (isGaoiCheckboxChecked) {
      setGaoi(e.target.value);
    }
  };

  const handleDropDownClick = () => {
    clearErrors()
    axios.get("http://localhost:8080/api/predict-food-balance")
    .then(response => {
      setOptions(response.data.products)
    })
  }

  const handleYearChange = (date) => {
    clearErrors()
    setSelectedYear(date);
  };

  const handleSelect = (option) => {
    clearErrors() 
    setSelectedOption(option);
  };

  const handleResponse = (response) => {
    let exx = []
    let exy = []
    let imx = []
    let imy = []
    let foodx = []
    let foody = []
    let prodx = []
    let prody = []

    for(let i = 0; i < response.data.length; i++){
      exx[i] = response.data[i].year
      exy[i] = response.data[i].export_quantity

      imx[i] = response.data[i].year
      imy[i] = response.data[i].import_quantity
      
      foodx[i] = response.data[i].year
      foody[i] = response.data[i].food_quantity
      
      prodx[i] = response.data[i].year
      prody[i] = response.data[i].production_quantity
    }

    setPlotExportDataX([...exx])
    setPlotExportDataY([...exy])

    setPlotImportDataX([...imx])
    setPlotImportDataY([...imy])

    setPlotFoodDataX([...foodx])
    setPlotFoodDataY([...foody])

    setPlotProductionDataX([...prodx])
    setPlotProductionDataY([...prody])

    console.log(plotExportDataX)
  }

  const handleSubmit = () => {
    let errors = {};
    if(isPopulationCheckboxChecked && population === ''
      || isAvgLifeCheckboxChecked && avgLife === ''
      || isGaoiCheckboxChecked && gaoi === ''
      || isGdpCheckboxChecked && gdp === ''
      || isGinnyCoefCheckboxChecked && ginnyCoef === ''
      || isTemperatureCheckboxChecked && temperature === ''
      || isUnemploymentRateCheckboxChecked && unemploymentRate === ''
      ){
      errors.fieldsError = 'Все выбранные параметры должны быть заполнены'
    }

    if(selectedOption === undefined){
      errors.productError = 'Продукт обязан быть выбран'
    }
    
    if(selectedYear === null){
      errors.yearError = 'Год обязан быть выбран'
    }

    console.log(gaoi)
    if (gaoi.startsWith('.') || temperature.startsWith('.') || gdp.startsWith('.') || avgLife.startsWith('.') || unemploymentRate.startsWith('.') || ginnyCoef.startsWith('.')) {
      errors.dotError = 'Число не может начинаться с "."'
    }

    if (Object.keys(errors).length > 0) {
      setInputError(errors);
      return
    }
    
    let request = {
      product: Number(selectedOption), 
      data: []
    }
  
    request.data.push(
      {
        year: Number(selectedYear.getFullYear()), 
        population: Number(population), 
        electricity: Number(temperature)
      }
    )

    console.log(request)
    axios.post("http://localhost:8080/api/predict-food-balance", 
    request)
    .then(response => {
      handleResponse(response.data)
    })
  };

  return (
    <div className="content-container">
      Главная страница
      <form>
        <div>
          <select value={selectedOption} onFocus={() => handleDropDownClick()} onChange={(e) => handleSelect(e.target.value)}>
            <option value={undefined} disabled selected hidden>Выберите продукт</option>
            {options.map((option) => (
              <option value={option.product_id} key={option.product_id}>{option.product_name}</option>
            ))}
          </select>
          {inputError.productError && <div style={{color: 'red'}}>{inputError.productError}</div>}
        </div>
        <div>
          <label>Выберите год:</label>
          <DatePicker
            selected={selectedYear}
            onChange={handleYearChange}
            showYearPicker
            dateFormat="yyyy"
          />
          {inputError.yearError && <div style={{color: 'red'}}>{inputError.yearError}</div>}
        </div>
        <div className={styles.form}>
          <div>
            <InputField
              inputType="number"
              inputPlaceholder="Численность населения"
              inputValue={population}
              handleInputChange={handlePopulationChange}
              isCheckboxChecked={isPopulationCheckboxChecked}
              handleCheckboxChange={handlePopulationCheckboxChange}
              handleKeyDown={handleRationalKeyDown}
              ></InputField>
          </div>
          <div>
            <InputField 
              inputType="number"
              inputPlaceholder="Коэффициент изменения температуры поверхности"
              inputValue={temperature}
              handleInputChange={handleTemperatureChange}
              isCheckboxChecked={isTemperatureCheckboxChecked}
              handleCheckboxChange={handleTemperatureCheckboxChange}
              handleKeyDown={handleKeyDown}
            ></InputField>
          </div>
          
          <div>
            <InputField 
              inputType="number"
              inputPlaceholder="ВВП"
              inputValue={gdp}
              handleInputChange={handleGdpChange}
              isCheckboxChecked={isGdpCheckboxChecked}
              handleCheckboxChange={handleGdpCheckboxChange}
              handleKeyDown={handleKeyDown}
              ></InputField>
          </div>
          
          <div>
            <InputField 
              inputType="number"
              inputPlaceholder="Средняя продолжительность жизни"
              inputValue={avgLife}
              handleInputChange={handleAvgLifeChange}
              isCheckboxChecked={isAvgLifeCheckboxChecked}
              handleCheckboxChange={handleAvgLifeCheckboxChange}
              handleKeyDown={handleKeyDown}
              ></InputField>
          </div>
          
          <div>
            <InputField 
              inputType="number"
              inputPlaceholder="Уровень безработицы"
              inputValue={unemploymentRate}
              handleInputChange={handleUnemploymentRateChange}
              isCheckboxChecked={isUnemploymentRateCheckboxChecked}
              handleCheckboxChange={handleUnemploymentRateCheckboxChange}
              handleKeyDown={handleKeyDown}
              ></InputField>
          </div>
          
          <div>
            <InputField 
              inputType="number"
              inputPlaceholder="Коэффициент Джинни"
              inputValue={ginnyCoef}
              handleInputChange={handleGinnyCoefChange}
              isCheckboxChecked={isGinnyCoefCheckboxChecked}
              handleCheckboxChange={handleGinnyCoefCheckboxChange}
              handleKeyDown={handleKeyDown}
              ></InputField>
          </div>
          
          <div>
            <InputField 
              inputType="number"
              inputPlaceholder="Индекс ориентации правительства на сельское хозяйство"
              inputValue={gaoi}
              handleInputChange={handleGaoiChange}
              isCheckboxChecked={isGaoiCheckboxChecked}
              handleCheckboxChange={handleGaoiCheckboxChange}
              handleKeyDown={handleKeyDown}
              ></InputField>
          </div>  
        </div>
        <div>
        </div>
        <button type="button" onClick={handleSubmit}>Отправить</button>
        {inputError.fieldsError && <div style={{color: 'red'}}>{inputError.fieldsError}</div>}
        {inputError.dotError && <div style={{color: 'red'}}>{inputError.dotError}</div>}

        <div>
          <MyPlot plotDataX={plotExportDataX}  plotDataY={plotExportDataY} plotTitle={"Экспорт"} plotXaxis={"Экспорт"} plotYaxis={"Год"} ></MyPlot>
          <MyPlot plotDataX={plotImportDataX}  plotDataY={plotImportDataY} plotTitle={"Импорт"} plotXaxis={"Импорт"} plotYaxis={"Год"} ></MyPlot>
          <MyPlot plotDataX={plotFoodDataX}  plotDataY={plotFoodDataY} plotTitle={"Потребление"} plotXaxis={"Потребление"} plotYaxis={"Год"} ></MyPlot>
          <MyPlot plotDataX={plotProductionDataX}  plotDataY={plotProductionDataY} plotTitle={"Производство"} plotXaxis={"Производство"} plotYaxis={"Год"} ></MyPlot>
        </div>
      </form>
    </div>
  )
};

export default Home;