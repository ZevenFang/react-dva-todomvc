import expect from 'expect';
import todo from '../../models/todo';

describe('todo', () => {

  describe('reducer', () => {
    it('it should save', () => {
      expect(todo.reducers['add']({data: []}, { row: { text: 'test', complete: false }}))
        .toEqual({ data: [{ text: 'test', complete: false }] });
    });
  })
});
