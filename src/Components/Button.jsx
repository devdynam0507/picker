import React from 'react';

const Button = ({ text, onClick, isImg }) => {
  return (
    <button
      type='button'
      className='bg-picker-yellow p-5 mb-6 rounded-lg text-lg w-full'
      onClick={onClick}
    >
      {text}{' '}
      {isImg && (
        <span className="bg-[url('../public/img/logo-1E.png')] w-16 h-5 bg-contain bg-no-repeat align-sub inline-block"></span>
      )}
    </button>
  );
};

export default Button;
