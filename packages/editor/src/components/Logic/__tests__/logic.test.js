import { ModuleLogic } from '../logic';

describe('logic', () => {
  describe('ModuleLogic', () => {
    describe('has()', () => {
      it('should return true if module has logic and no if module has no logic', () => {
        expect(ModuleLogic.has({ logic: {} })).toEqual(true);
        expect(ModuleLogic.has({})).toEqual(false);
      });
    });

    describe('get()', () => {
      it('should return logic if module has logic', () => {
        const logic = { test: 123 };
        expect(ModuleLogic.get({ name: 'test', logic })).toEqual(logic);
      });

      it('should return empty if module has no logic', () => {
        expect(ModuleLogic.get({})).toEqual({});
      });
    });

    describe('set()', () => {
      it('should set logic for module with no logic', () => {
        expect(ModuleLogic.set({ name: 'test' }, 'test', 123)).toEqual({
          name: 'test',
          logic: { test: 123 },
        });
      });

      it('should extend exisitng logic', () => {
        expect(
          ModuleLogic.set({ name: 'test', logic: { test1: 1 } }, 'test2', 2)
        ).toEqual({
          name: 'test',
          logic: { test1: 1, test2: 2 },
        });
      });

      it('should update existing logic action', () => {
        expect(
          ModuleLogic.set({ name: 'test', logic: { test: 1 } }, 'test', 2)
        ).toEqual({
          name: 'test',
          logic: { test: 2 },
        });
      });
    });

    describe('unset()', () => {
      it('should not modify module without logic', () => {
        expect(ModuleLogic.unset({ name: 'test' }, 'test')).toEqual({
          name: 'test',
        });
      });

      it('should unset logic action', () => {
        expect(
          ModuleLogic.unset(
            {
              name: 'test',
              logic: { test: 1, test2: 2 },
            },
            'test'
          )
        ).toEqual({ name: 'test', logic: { test2: 2 } });
      });

      it('should remove logic if last action', () => {
        expect(
          ModuleLogic.unset({ name: 'test', logic: { test: 1 } }, 'test')
        ).toEqual({ name: 'test' });
      });
    });
  });
});
