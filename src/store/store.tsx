import { create } from 'zustand';
import { AnalysisRequestSiteState } from '../types/type';

export const useAnalysisRequestSite = create<AnalysisRequestSiteState>((set) => ({
  contentId: null,
  setContent: (id) =>
    set(() => ({
      contentId: id,
    })),
  clearContent: () =>
    set(() => ({
      contentId: null,
    })),
}));
