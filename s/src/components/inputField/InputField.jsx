import styles from "./input.module.css"

const InputField = ({inputType, inputPlaceholder, inputValue, handleInputChange, isCheckboxChecked, handleCheckboxChange, handleKeyDown}) => {
  
  return (
    <div className={styles.block}>
      <input
        className={styles.input}
        type={inputType}
        placeholder={inputPlaceholder}
        value={inputValue}
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