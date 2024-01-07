"use client"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./homepage.module.css"
import axios from "axios";

import React, { useState } from 'react';
import MyPlot from "@/components/plot/Plot";
import InputField from "@/components/inputField/InputField";

const Home = () => {  
  const [formData, setFormData] = useState({
    product: {
      selectedOption: undefined,
      options: []
    },
    selectedYear: {
      value: null,
    },

    fields: [
      {
        name: 'Численность населения',
        value: '',
        checkbox: false
      },
      {
        name: 'Индекс ориентации правительства на сельское хозяйство',
        value: '',
        checkbox: false
      },
      {
        name: 'ВВП',
        value: '',
        checkbox: false
      },
      {
        name: 'Коэффициент изменения температуры поверхности',
        value: '',
        checkbox: false
      },
      {
        name: 'Коэффициент Джинни',
        value: '',
        checkbox: false
      },
      {
        name: 'Средняя продолжительность жизни',
        value: '',
        checkbox: false
      },
      {
        name: 'Уровень безработицы',
        value: '',
        checkbox: false
      },
    ]
  })

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
      fieldsError: {
        names: [],
        message: ''
      },
      requiredProduct: '',
      requiredYear: '',
      lengthError: {
        names: [],
        message: ''
      },
      dotError: {
        names: [],
        message: ''
      },
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
    fieldsError: {
      names: [],
      message: ''
    },
    requiredProduct: '',
    requiredYear: '',
    lengthError: {
      names: [],
      message: ''
    },
    dotError: {
      names: [],
      message: ''
    },
  });

  const handleFieldCheckboxChange = (fieldName) => {
    clearErrors()
    const updatedFields = formData.fields.map(field => {
      if (field.name === fieldName) {
        return {
          ...field,
          checkbox: !field.checkbox,
          value: ' '
        };
      }
      return field;
    });
    setFormData(prevState => ({
      ...prevState,
      fields: updatedFields
    }));
  };

  const handleFieldValueChange = (fieldName, value) => {
    clearErrors()
    const updatedFields = formData.fields.map(field => {
      if (field.name === fieldName && field.checkbox) {
        return {
          ...field,
          value: value.target.value
        };
      }
      return field;
    });
    setFormData(prevState => ({
      ...prevState,
      fields: updatedFields
    }));
  };

  const handleDropDownClick = () => {
    clearErrors()
    axios.get("http://localhost:8080/api/predict-food-balance")
    .then(response => {
      setFormData(prevFormData => ({
        ...prevFormData,
        product: {
          ...prevFormData.product,
          options: response.data.products
        }
      }))
    })
  }

  const handleYearChange = (date) => {
    clearErrors()
    setFormData(prevFormData => ({
      ...prevFormData,
      selectedYear: {
        ...prevFormData.selectedYear,
        value: date 
      }
    }));
  };

  const handleSelect = (option) => {
    clearErrors() 
    setFormData(prevFormData => ({
      ...prevFormData,
      product: {
        ...prevFormData.product,
        selectedOption: option
      }
    }));
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
  }

  const handlePredictionResponse = (data, request, year) => {
    request.data.push({...data.data, year: year})
  }

  const handleSubmit = async () => {
    clearErrors()
    let errors = {};
    errors.lengthError = {names: [], message: ''};
    errors.dotError = {names: [], message: ''};
    errors.fieldsError = {names: [], message: ''};
    for(let i = 0; i < formData.fields.length; ++i){
      let value = formData.fields[i].value
      console.log(formData.fields[i].name + ' ' + '!' + formData.fields[i].value + '!')
      if(formData.fields[i].checkbox && (value === '' || value === ' ')){
        console.log("!@#!@#!@#!@")
        errors.fieldsError.names.push(formData.fields[i].name)
        errors.fieldsError.message = 'Все выбранные параметры должны быть заполнены'
      }

      if(value.startsWith('.')){
        errors.dotError.names.push(formData.fields[i].name)
        errors.dotError.message = 'Число не может начинаться с "."'
      }

      if (value.includes('.')) {
        const [beforeDot, afterDot] = value.split('.'); 
        if (beforeDot.length > 10 || afterDot.length > 10) { 
          errors.lengthError.names.push(formData.fields[i].name)
          errors.lengthError.message = "Число до или после точки не должно превышать 10 знаков"
        }
      }

      if(value.length > 10) {
        errors.lengthError.names.push(formData.fields[i].name)
        errors.lengthError.message = "Число до или после точки не должно превышать 10 знаков"
      }
    }

    if(formData.product.selectedOption === undefined) {
      errors.requiredProduct = 'Обязательные поля должны быть заполнены'
    }

    if(formData.selectedYear.value === null) {
      errors.requiredYear = 'Обязательные поля должны быть заполнены'
    }

    if(errors.lengthError.message === ''){
      delete errors.lengthError
    }
    if(errors.dotError.message === ''){
      delete errors.dotError
    }
    if(errors.fieldsError.message === ''){
      delete errors.fieldsError
    }

    if (Object.keys(errors).length > 0) {
      setInputError(errors);
      console.log(inputError)
      return
    }
    
    let request = {
      product: Number(formData.product.selectedOption), 
      data: []
    }
  
    for(let i = 2021; i < Number(formData.selectedYear.value.getFullYear()); ++i){
      let response = await axios.post("http://localhost:8080/api/predict-input-data", {year: i})
      handlePredictionResponse(response.data, request, i)
    }

    let predictedYearRespone = await axios.post("http://localhost:8080/api/predict-input-data", {year: Number(formData.selectedYear.value.getFullYear())})
    
    let population = formData.fields.find(field => field.name === 'Численность населения').value
    let surface_temperature_change = formData.fields.find(field => field.name === 'Коэффициент изменения температуры поверхности').value
    let life_expectancy = formData.fields.find(field => field.name === 'Средняя продолжительность жизни').value
    let gini = formData.fields.find(field => field.name === 'Коэффициент Джинни').value 
    let agriculture_orientation = formData.fields.find(field => field.name === 'Индекс ориентации правительства на сельское хозяйство').value
    let unemployment = formData.fields.find(field => field.name === 'Уровень безработицы').value
    let gdp = formData.fields.find(field => field.name === 'ВВП').value

    request.data.push(
      {
        year: Number(formData.selectedYear.value.getFullYear()), 
        population: Number(population === '' || population === ' ' ? predictedYearRespone.data.data.population : population), 
        surface_temperature_change: Number(surface_temperature_change === '' || surface_temperature_change === ' ' ? predictedYearRespone.data.data.surface_temperature_change : surface_temperature_change),
        life_expectancy: Number(life_expectancy === '' || life_expectancy === ' ' ? predictedYearRespone.data.data.life_expectancy : life_expectancy),
        gini: Number(gini === '' || gini === ' ' ? predictedYearRespone.data.data.gini : gini),
        agriculture_orientation: Number(agriculture_orientation === '' || agriculture_orientation === ' ' ? predictedYearRespone.data.data.agriculture_orientation : agriculture_orientation),
        unemployment: Number(unemployment === '' || unemployment ===' ' ? predictedYearRespone.data.data.unemployment : unemployment),
        gdp: Number(gdp === '' || gdp === ' ' ? predictedYearRespone.data.data.gdp : gdp),
      }
    )

    axios.post("http://localhost:8080/api/predict-food-balance", 
    request)
    .then(response => {
      handleResponse(response.data)
    })
  };

  return (
    <div className="content-container">
      <label className={styles.mainText}>Главная страница</label>
      <form className={styles.firstRow}>
        <div className={styles.mainSelect}>
          <label className={styles.secondaryText}><span title="Обязательное поле" className="red-star">*<style jsx>{`
            .red-star {
               color: red;
               font-size: 20px;
               vertical-align: middle;
             }
          `}</style></span>Выберите продукт:</label>
          <select className={styles["rounded-select"]} style={{ borderColor: inputError.requiredProduct === '' || inputError.requiredProduct === undefined ? '#aaa' : 'red'}} value={formData.product.selectedOption} onClick={() => handleDropDownClick()} onChange={(e) => handleSelect(e.target.value)}>
            <option value={undefined} disabled selected hidden>Не выбрано</option>
            {formData.product.options.map((option) => (
              <option value={option.product_id} key={option.product_id}>{option.product_name}</option>
            ))}
          </select>
        </div>
        <div className={styles.mainSelect}>
          <label className={styles.secondaryText}><span title="Обязательное поле" className="red-star">*<style jsx>{`
            .red-star {
               color: red;
               font-size: 20px;
               vertical-align: middle;
             }
          `}</style></span>Выберите год:</label>
          <DatePicker
            className={styles[inputError.requiredYear === '' || inputError.requiredYear === undefined ? "rounded-datePeeker" : "rounded-datePeeker-red"]}
            selected={formData.selectedYear.value}
            onChange={handleYearChange}
            showYearPicker
            dateFormat="yyyy"
          />
        </div>
        <div className={styles.form}>
          {formData.fields.map((field) => (
            <InputField
            inputType="number"
            inputPlaceholder={field.name}
            isError = {inputError.lengthError !== undefined && inputError.lengthError.names.includes(field.name)
             || inputError.dotError !== undefined && inputError.dotError.names.includes(field.name)
             || inputError.fieldsError !== undefined && inputError.fieldsError.names.includes(field.name)}
            inputValue={field.value}
            handleInputChange={(value) => handleFieldValueChange(field.name, value)}
            isCheckboxChecked={field.checkbox}
            handleCheckboxChange={() => handleFieldCheckboxChange(field.name)}
            handleKeyDown={field.name !== 'Численность населения' ? handleKeyDown : handleRationalKeyDown}
            ></InputField>
          ))}
        </div>
        <button
            className={styles.button}
            type="button"
            onClick={handleSubmit}
        >
          Отправить
        </button>
        {}
        {(inputError.requiredProduct || inputError.requiredYear) && <div style={{color: 'red'}}>Обязательные поля должны бать заполнены</div>}
        {inputError.lengthError && <div style={{color: 'red'}}>{inputError.lengthError.message}</div>}
        {inputError.fieldsError && <div style={{color: 'red'}}>{inputError.fieldsError.message}</div>}
        {inputError.dotError && <div style={{color: 'red'}}>{inputError.dotError.message}</div>}
        <div>
          <MyPlot plotDataX={plotExportDataX}  plotDataY={plotExportDataY} plotTitle={"Экспорт"} plotXaxis={"Экспорт, в тыс. тонн"} plotYaxis={"Год"} ></MyPlot>
          <MyPlot plotDataX={plotImportDataX}  plotDataY={plotImportDataY} plotTitle={"Импорт"} plotXaxis={"Импорт, в тыс. тонн"} plotYaxis={"Год"} ></MyPlot>
          <MyPlot plotDataX={plotFoodDataX}  plotDataY={plotFoodDataY} plotTitle={"Потребление"} plotXaxis={"Потребление, в тыс. тонн"} plotYaxis={"Год"} ></MyPlot>
          <MyPlot plotDataX={plotProductionDataX}  plotDataY={plotProductionDataY} plotTitle={"Производство"} plotXaxis={"Производство, в тыс. тонн"} plotYaxis={"Год"} ></MyPlot>
        </div>
      </form>
    </div>
  )
};

export default Home;