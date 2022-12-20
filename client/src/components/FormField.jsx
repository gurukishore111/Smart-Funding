import React from 'react';

function FormField({ label, isTextArea, ...inputOtherProps }) {
  return (
    <label className="flex-1 w-full flex flex-col">
      {label && (
        <span className="font-poppins font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {label}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          rows={10}
          className="py-[15px] sm:px-[25px] px-[15px]  outline-none border-[1px] border-[#3a3a43] bg-transparent font-poppins text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          {...inputOtherProps}
        ></textarea>
      ) : (
        <input
          required
          step="0.1"
          className="py-[15px] sm:px-[25px] px-[15px]  outline-none border-[1px] border-[#3a3a43] bg-transparent font-poppins text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          {...inputOtherProps}
        />
      )}
    </label>
  );
}

export default FormField;
