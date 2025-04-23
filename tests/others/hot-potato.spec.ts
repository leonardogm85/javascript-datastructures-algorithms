import { hotPotato } from '../../src/others/hot-potato';

describe('Hot Potato with Queue', () => {
  it('Hot potato game', () => {
    const names: string[] = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
    expect(hotPotato(names, 6).winner).toEqual('Ingrid');
    expect(hotPotato(names, 7).winner).toEqual('John');
    expect(hotPotato(names, 8).winner).toEqual('Jack');
    expect(hotPotato(names, 9).winner).toEqual('Ingrid');
    expect(hotPotato(names, 10).winner).toEqual('Carl');
  });
});
