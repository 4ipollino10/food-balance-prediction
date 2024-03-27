"use client"
import React, { useState } from 'react';
import styles from "./input.module.css"
import { Anonymous_Pro } from 'next/font/google'

const inter = Anonymous_Pro(
  { 
    subsets: ['latin'],
    weight: '400'
  }
)

const infoData = [
  {
    key: 'Численность населения',
    value: 'Крутейшая блять численность населения'
  },
  {
    key: 'AOI',
    value: 'AOI-Индекс ориентации правительства на сельское хозяйство характеризует уровень внимания, отдаваемого правительством развитию сельского хозяйства.\nЕсли значение индекса AOI превышает 1, то это говорит о высокой ориентации на сельскохозяйственный сектор, затраты на который превышают его вклад в экономическую добавленную стоимость. Значение AOI меньше 1 отражает более низкую ориентацию на сельское хозяйство, тогда как AOI, равный 1, показывает нейтралитет в ориентации правительства на сельскохозяйственный сектор.'
  },
  {
    key: 'ВВП',
    value: 'я ввп я ввп'
  },
  {
    key: 'Изменение температуры',
    value: 'тепереатура хуй'
  },
  {
    key: 'Коэффициент Джинни',
    value: 'где карта джинни'
  },
  {
    key: 'Средняя продолжительность жизни',
    value: '60 лет'
  },
  {
    key: 'Уровень безработицы',
    value: 'у нас все работают'
  }
] 

const InputField = ({inputType, inputPlaceholder, inputValue, handleInputChange, isCheckboxChecked, handleCheckboxChange, handleKeyDown, isError, onQuestionClick, isInfo}) => {
  
  const mapInfoData = () => {
    let data = infoData.find(x => x.key === inputPlaceholder)

    return data.value
  }

  const [questionMarkData, setQuestionMarkData] = useState({
    title: inputPlaceholder,
    text: mapInfoData()
  })

  const handleClick = () => {
    onQuestionClick(questionMarkData);
  };

  return (
    <div className={styles.block}>
      <div className={styles.hidden} aria-hidden={'true'}>
       {inputPlaceholder}
     </div>
      <input
        className={!isCheckboxChecked ? styles.closedInput : isError ? styles.openErrorInput : styles.openNonErrorInput}
        type={inputType}
        placeholder={inputPlaceholder}
        value={inputValue}
        style={inter.style}
        onChange={handleInputChange}
        disabled={!isCheckboxChecked}
        onKeyDown={handleKeyDown}
      />
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isCheckboxChecked}
        onChange={handleCheckboxChange}
      />
      {isInfo ? <button className={styles.questionMark}
        type='button'
        onClick={handleClick}
      >
        <p className={inter.className} style={{color: 'white', fontSize: '34px'}}>?</p>
      </button> : null }
    </div>
  );
};

//{ backgroundColor: isCheckboxChecked ? 'white' : '#cfd8e6', borderColor: isError ? 'red' : '#ccc'}
export default InputField;