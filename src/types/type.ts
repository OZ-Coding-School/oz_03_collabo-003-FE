import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
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
  main_category?: string;
  semi_category?: string;
  main_category_id?: number;
  semi_category_id?: number;
  detailedInfo?: string;
  review?: {
    id: number;
    user_id: number;
    user_name?: string;
    comment: string;
    rating: number;
  };
  qna?: QnA;
  viewer?: number;
  is_analyzed?: boolean;
  rating?: number;
  ratingParticipation?: number;
  isBookmarked?: boolean;
  user_id?: number;
  like_count?: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  business_name: string | null;
  business_number: number | null;
  phone_number: number | null;
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
  username: string;
  image: string;
  intro: string;
  link?: string;
  merit: string;
  summary: string;
}

export interface SemiCategory {
  id: number;
  label: string;
  slug: string;
}

export interface Category {
  id: number;
  categories: string;
  slug: string;
  semiCategories: SemiCategory[];
}

export type AnalysisContent = {
  contentId: number;
  clientId: number;
  title: string;
  site_url: string;
  thumbnail: string;
  site_description: string;
  main_category: string;
  status: string;
};
