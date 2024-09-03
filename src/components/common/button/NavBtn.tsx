import { ButtonProps } from '../../../types/type';

const NavBtn = ({ onClick, children, className = '' }: ButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`h-[35px] w-[60px] whitespace-nowrap rounded-[5px] px-[5px] text-[12px] shadow-custom-light transition-colors duration-300 sm:w-[80px] sm:px-[10px] sm:text-[14px] ${className}`}
    >
      {children}
    </button>
  );
};

export default NavBtn;
