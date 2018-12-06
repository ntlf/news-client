import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native-safari-view', () => ({
  show: () => {}
}));

jest.mock('AsyncStorage', () => ({
  AsyncStorage: {
    setItem: jest.fn(
      () =>
        new Promise(resolve => {
          resolve(null);
        })
    ),
    multiSet: jest.fn(
      () =>
        new Promise(resolve => {
          resolve(null);
        })
    ),
    getItem: jest.fn(
      () =>
        new Promise(resolve => {
          resolve(null);
        })
    ),
    multiGet: jest.fn(
      () =>
        new Promise(resolve => {
          resolve(null);
        })
    ),
    removeItem: jest.fn(
      () =>
        new Promise(resolve => {
          resolve(null);
        })
    ),
    getAllKeys: jest.fn(
      () =>
        new Promise(resolve => {
          resolve(null);
        })
    ),
    multiRemove: jest.fn(() => ({
      then: jest.fn()
    }))
  }
}));

global.fetch = jest.fn(() => new Promise(resolve => resolve()));
