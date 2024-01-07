import styles from "./input.module.css"

const InputField = ({inputType, inputPlaceholder, inputValue, handleInputChange, isCheckboxChecked, handleCheckboxChange, handleKeyDown, isError}) => {
    
  return (
    <div className={styles.block}>
      <div className={styles.hidden} aria-hidden={'true'}>
       {inputPlaceholder}
     </div>
      <input
        className={styles.input}
        type={inputType}
        placeholder={inputPlaceholder}
        value={inputValue}
        style={{ backgroundColor: isCheckboxChecked ? 'white' : '#cfd8e6', borderColor: isError ? 'red' : '#ccc'}}
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
    </div>
  );
};

export default InputField;