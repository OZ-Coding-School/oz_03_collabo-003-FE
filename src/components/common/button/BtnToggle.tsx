import React, { useState } from 'react';

interface ToggleButtonProps {
  children?: React.ReactNode;
  initialChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

const BtnToggle: React.FC<ToggleButtonProps> = ({ initialChecked = false, onToggle, children }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onToggle) {
      onToggle(newChecked);
    }
  };

  return (
    <button onClick={handleToggle} type='button'>
      {children}
      <div></div>
    </button>
  );
};

export default BtnToggle;
