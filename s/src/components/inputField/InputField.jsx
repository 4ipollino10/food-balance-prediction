

const InputField = ({inputType, inputPlaceholder, inputValue, handleInputChange, isCheckboxChecked, handleCheckboxChange, handleKeyDown}) => {
  
  return (
    <div>
      <input
        type={inputType}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={handleInputChange}
        disabled={!isCheckboxChecked}
        onKeyDown={handleKeyDown}
      />
      <input
        type="checkbox"
        checked={isCheckboxChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default InputField;