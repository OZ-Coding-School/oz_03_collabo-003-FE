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

export interface Content {
  id: number;
  title: string;
  link: string;
  image: string;
  description: string;
  category: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  businessName: string | null;
  businessNumber: number | null;
  phoneNumber: number | null;
  points: number;
}
