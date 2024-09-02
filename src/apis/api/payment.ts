import { baseInstance } from '../utils/instance';

export const paymentAPI = {
  refund: async () => {
    const { data } = await baseInstance.get('/payments/refund/');
    return data;
  },

  verify: async () => {
    const { data } = await baseInstance.post('/payments/verify/');
    return data;
  },
};
