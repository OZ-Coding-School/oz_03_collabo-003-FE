import { ButtonProps } from '../../../types/type';

const BtnNav = ({ onClick, children, className = '' }: ButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`h-[28px] w-[75px] rounded-[5px] px-[10px] text-[14px] shadow-custom-dark transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default BtnNav;
