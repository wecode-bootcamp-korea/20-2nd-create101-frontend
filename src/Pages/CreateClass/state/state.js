import { atom } from 'recoil';

export const titleState = atom({ key: 'titleState', default: '' });

export const valueState = atom({
  key: 'valueState',
  default: { category: '', subCategory: '', target: '' },
});

export const monthState = atom({
  key: 'monthState',
  default: { min: 0, max: 24 },
});

export const priceState = atom({
  key: 'priceState',
  default: { min: 0, max: 1000000 },
});

export const descState = atom({ key: 'descState', default: '' });
