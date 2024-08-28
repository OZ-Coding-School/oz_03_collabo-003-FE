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

export interface QnA {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  answer?: {
    admin_id: number;
    content: string;
    created_at: string;
  } | null;
}

export interface Content {
  id: number;
  title: string;
  site_url: string;
  thumbnail: string;
  site_description: string;
  category: string;
  detailedInfo?: string;
  review?: {
    id: number;
    user_id: number;
    user_name?: string;
    comment: string;
    rating: number;
  };
  qna?: QnA;
  viewCount?: number;
  likeCount?: number;
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

export type PaymentBtnProps = {
  methodId: string;
  imgSrc: string;
  name: string;
  isSelected: boolean;
  onClick: (methodId: string) => void;
};

export type AnalysisRequestSiteState = {
  contentId: number | null;
  setContent: (id: number) => void;
  clearContent: () => void;
};

export interface Analyst {
  id: number;
  name: string;
  image: string;
  intro: string;
  link?: string;
  merit: string;
  oneWord: string;
}
