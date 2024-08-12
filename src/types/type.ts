import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface CategoryItem {
  label: string;
  href: string;
}

export interface Category {
  title: string;
  href: string;
  items: CategoryItem[];
}

export interface DropdownMenuProps {
  data: Category[];
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
