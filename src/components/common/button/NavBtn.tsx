import { ButtonProps } from '../../../types/type';

const NavBtn = ({ onClick, children, className = '' }: ButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`h-[35px] w-[80px] rounded-[5px] px-[10px] text-[14px] shadow-custom-light transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default NavBtn;
