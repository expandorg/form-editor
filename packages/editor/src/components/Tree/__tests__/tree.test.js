import ModulesTreeEditor from '../ModulesTreeEditor';

const getData = () => [
  {
    id: 1,
    modules: [
      { id: 11, modules: [] },
      { id: 12, modules: [{ id: 121 }, { id: 122 }] },
      { id: 13, modules: [] },
    ],
  },
  {
    id: 2,
    modules: [
      { id: 21, modules: [] },
      { id: 22, modules: [] },
      { id: 23, modules: [] },
    ],
  },
];

describe('modules tree', () => {
  describe('ModulesTreeEditor', () => {
    const te = new ModulesTreeEditor();

    describe('findByPath()', () => {
      const modules = getData();

      it('should find right element', () => {
        expect(te.findByPath(modules, [0, 1]).id).toEqual(12);
        expect(te.findByPath(modules, [0, 1, 1]).id).toEqual(122);
        expect(te.findByPath(modules, [1, 2]).id).toEqual(23);
      });

      it('should return undefined on empty', () => {
        expect(te.findByPath(modules, [])).toEqual(undefined);
      });
    });

    describe('pathOnRemoved()', () => {
      it('should return modified path', () => {
        expect(te.pathOnRemoved([0], [1, 1])).toEqual([0, 1]);
        expect(te.pathOnRemoved([0, 0], [1, 1])).toEqual([1, 1]);
        expect(te.pathOnRemoved([1, 2], [1, 1])).toEqual([1, 1]);
      });
    });

    describe('push()', () => {
      it('should insert at the end', () => {
        const modules = getData();
        te.push(modules, { id: 999 });
        expect(modules[2]).toEqual({ id: 999 });
      });
    });

    describe('removeAt()', () => {
      it('should remove an element', () => {
        const modules = getData();
        te.removeAt(modules, [0, 1]);

        expect(modules[0].modules).toEqual([
          { id: 11, modules: [] },
          { id: 13, modules: [] },
        ]);
        te.removeAt(modules, [1, 2]);
        expect(modules[1].modules).toEqual([
          { id: 21, modules: [] },
          { id: 22, modules: [] },
        ]);
      });

      it('should remove last element', () => {
        const modules = getData();
        te.removeAt(modules, [1, 2]);
        expect(modules[1].modules).toEqual([
          { id: 21, modules: [] },
          { id: 22, modules: [] },
        ]);
      });
    });

    describe('insertAt()', () => {
      it('should insert in empty erray', () => {
        const modules = getData();
        te.insertAt(modules, [0, 2, 0], { id: 999 });
        expect(modules[0].modules[2].modules[0]).toEqual({ id: 999 });
      });

      it('should insert in the middle', () => {
        const m1 = getData();
        te.insertAt(m1, [0, 1, 1], { id: 999 });
        expect(m1[0].modules[1].modules).toEqual([
          { id: 121 },
          { id: 999 },
          { id: 122 },
        ]);

        const m2 = getData();
        te.insertAt(m2, [0, 1, 0], { id: 999 });
        expect(m2[0].modules[1].modules).toEqual([
          { id: 999 },
          { id: 121 },
          { id: 122 },
        ]);
      });
    });

    const getM = () => [
      { id: 0, modules: [] },
      { id: 1, modules: [] },
      {
        id: 2,
        modules: [
          { id: 21, modules: [] },
          { id: 22, modules: [] },
          { id: 23, modules: [] },
        ],
      },
      { id: 3, modules: [] },
    ];

    describe('moveAt()', () => {
      it('should move element forward in same level', () => {
        const m1 = getData();
        te.moveAt(m1, [1, 0], [1, 1]);
        expect(m1[1].modules).toEqual([
          { id: 22, modules: [] },
          { id: 21, modules: [] },
          { id: 23, modules: [] },
        ]);
        const m2 = getData();
        te.moveAt(m2, [1, 0], [1, 2]);
        expect(m2[1].modules).toEqual([
          { id: 22, modules: [] },
          { id: 23, modules: [] },
          { id: 21, modules: [] },
        ]);
      });

      it('should move element backward in same level', () => {
        const m2 = getData();
        te.moveAt(m2, [1, 2], [1, 1]);
        expect(m2[1].modules).toEqual([
          { id: 21, modules: [] },
          { id: 23, modules: [] },
          { id: 22, modules: [] },
        ]);
      });

      it('should move element forward between levels', () => {
        const m1 = getData();
        te.moveAt(m1, [0, 0], [1, 1]);
        expect(m1[1].modules).toEqual([
          { id: 21, modules: [] },
          { id: 11, modules: [] },
          { id: 22, modules: [] },
          { id: 23, modules: [] },
        ]);

        const m2 = getM();
        te.moveAt(m2, [1], [2, 0]);
        expect(m2).toEqual([
          { id: 0, modules: [] },
          {
            id: 2,
            modules: [
              { id: 1, modules: [] },
              { id: 21, modules: [] },
              { id: 22, modules: [] },
              { id: 23, modules: [] },
            ],
          },
          { id: 3, modules: [] },
        ]);

        const m3 = getM();
        te.moveAt(m3, [0], [2, 0]);
        expect(m3).toEqual([
          { id: 1, modules: [] },
          {
            id: 2,
            modules: [
              { id: 0, modules: [] },
              { id: 21, modules: [] },
              { id: 22, modules: [] },
              { id: 23, modules: [] },
            ],
          },
          { id: 3, modules: [] },
        ]);
      });

      it('should move element backward between levels', () => {
        const m4 = getM();
        te.moveAt(m4, [2, 0], [2]);
        expect(m4).toEqual([
          { id: 0, modules: [] },
          { id: 1, modules: [] },
          { id: 21, modules: [] },
          {
            id: 2,
            modules: [{ id: 22, modules: [] }, { id: 23, modules: [] }],
          },
          { id: 3, modules: [] },
        ]);
      });
    });
  });
});
