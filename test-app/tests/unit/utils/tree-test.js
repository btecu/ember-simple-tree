import { buildTree, getAncestors, getDescendents, getParent } from 'ember-simple-tree/utils/tree';
import { module, test } from 'qunit';

// Root (1) > First (2), Second (3) > Grand Child (4), and Other (5)
function records() {
  return [
    { id: 1, parentId: null, name: 'Root' },
    { id: 2, parentId: 1, name: 'First' },
    { id: 3, parentId: 1, name: 'Second' },
    { id: 4, parentId: 3, name: 'Grand Child' },
    { id: 5, parentId: null, name: 'Other' },
  ];
}

function ids(nodes) {
  return nodes.map((x) => x.id);
}

module('Unit | Utility | tree', function () {
  module('buildTree', function () {
    test('it returns an empty list without records', function (assert) {
      assert.strictEqual(buildTree([]).length, 0, 'empty list');
      assert.strictEqual(buildTree(null).length, 0, 'null');
      assert.strictEqual(buildTree(undefined).length, 0, 'undefined');
    });

    test('it links children to their parent', function (assert) {
      let tree = buildTree(records());
      let root = tree.at(0);

      assert.deepEqual(ids(tree), [1, 5], 'records without a parent are roots');
      assert.deepEqual(ids(root.children), [2, 3]);
      assert.deepEqual(ids(root.children.at(1).children), [4]);
      assert.strictEqual(root.children.at(0).children.length, 0, 'leaves have an empty list');
    });

    test('a record without `parentId` is a root', function (assert) {
      let tree = buildTree([
        { id: 1 },
        { id: 2, parentId: undefined },
        { id: 3, parentId: null },
        { id: 4, parentId: '' },
      ]);

      assert.deepEqual(ids(tree), [1, 2, 3, 4]);
    });

    test('a parent can come after its children', function (assert) {
      let tree = buildTree([
        { id: 2, parentId: 1 },
        { id: 1, parentId: null },
      ]);

      assert.deepEqual(ids(tree), [1]);
      assert.deepEqual(ids(tree.at(0).children), [2]);
    });

    test('an id of 0 can be a parent', function (assert) {
      let tree = buildTree([{ id: 0 }, { id: 1, parentId: 0 }]);

      assert.deepEqual(ids(tree), [0]);
      assert.deepEqual(ids(tree.at(0).children), [1]);
    });

    test('it sets the defaults', function (assert) {
      let node = buildTree([{ id: 1 }]).at(0);

      assert.false(node.isChecked, 'isChecked');
      assert.false(node.isDisabled, 'isDisabled');
      assert.false(node.isExpanded, 'isExpanded');
      assert.false(node.isSelected, 'isSelected');
      assert.true(node.isVisible, 'isVisible');
    });

    test('it keeps the state of a record', function (assert) {
      let node = buildTree([
        { id: 1, isChecked: true, isDisabled: true, isExpanded: true, isSelected: true, isVisible: false },
      ]).at(0);

      assert.true(node.isChecked, 'isChecked');
      assert.true(node.isDisabled, 'isDisabled');
      assert.true(node.isExpanded, 'isExpanded');
      assert.true(node.isSelected, 'isSelected');
      assert.false(node.isVisible, 'isVisible');
    });

    test('`valueKey` is used for `id`', function (assert) {
      let tree = buildTree([{ slug: 'root', name: 'Root' }], { valueKey: 'slug' });

      assert.strictEqual(tree.length, 1);
      assert.strictEqual(tree.at(0).id, 'root');
      assert.strictEqual(tree.at(0).name, 'Root');
    });

    test('`labelKey` is used for `name`', function (assert) {
      let tree = buildTree([{ id: 1, title: 'Root' }], { labelKey: 'title' });

      assert.strictEqual(tree.at(0).id, 1);
      assert.strictEqual(tree.at(0).name, 'Root');
    });

    test('`parentId` references the value of `valueKey`', function (assert) {
      let tree = buildTree(
        [
          { slug: 'root', title: 'Root' },
          { slug: 'child', parentId: 'root', title: 'Child' },
          { slug: 'grand-child', parentId: 'child', title: 'Grand Child' },
        ],
        { labelKey: 'title', valueKey: 'slug' },
      );

      let root = tree.at(0);
      let child = root.children.at(0);

      assert.strictEqual(tree.length, 1);
      assert.strictEqual(child.name, 'Child');
      assert.strictEqual(child.children.at(0).name, 'Grand Child');
    });
  });

  module('getDescendents', function () {
    test('it returns all nodes in order, including the roots', function (assert) {
      assert.deepEqual(ids(getDescendents(buildTree(records()))), [1, 2, 3, 4, 5]);
    });

    test('a negative depth returns all nodes', function (assert) {
      assert.deepEqual(ids(getDescendents(buildTree(records()), -1)), [1, 2, 3, 4, 5]);
      assert.deepEqual(ids(getDescendents(buildTree(records()), -5)), [1, 2, 3, 4, 5]);
    });

    test('a depth of 0 returns nothing', function (assert) {
      assert.deepEqual(ids(getDescendents(buildTree(records()), 0)), []);
    });

    test('it limits the depth', function (assert) {
      assert.deepEqual(ids(getDescendents(buildTree(records()), 1)), [1, 5], 'only the roots');
      assert.deepEqual(ids(getDescendents(buildTree(records()), 2)), [1, 2, 3, 5]);
      assert.deepEqual(ids(getDescendents(buildTree(records()), 3)), [1, 2, 3, 4, 5]);
      assert.deepEqual(ids(getDescendents(buildTree(records()), 10)), [1, 2, 3, 4, 5], 'deeper than the tree');
    });

    test('it handles an empty tree', function (assert) {
      assert.deepEqual(getDescendents(buildTree([])).length, 0);
    });
  });

  module('getAncestors', function () {
    test('it returns the node and its ancestors, closest first', function (assert) {
      let tree = buildTree(records());
      let grandChild = getDescendents(tree).find((x) => x.id === 4);

      assert.deepEqual(ids(getAncestors(tree, grandChild)), [4, 3, 1]);
    });

    test('a root only returns itself', function (assert) {
      let tree = buildTree(records());

      assert.deepEqual(ids(getAncestors(tree, tree.at(1))), [5]);
    });

    test('it stops at the branch of the node', function (assert) {
      let tree = buildTree(records());
      let first = tree.at(0).children.at(0);

      assert.deepEqual(ids(getAncestors(tree, first)), [2, 1], 'siblings are not included');
    });

    test('a node outside of the tree returns nothing', function (assert) {
      assert.strictEqual(getAncestors(buildTree(records()), { id: 99 }).length, 0);
    });
  });

  module('getParent', function () {
    test('it finds the parent in the list', function (assert) {
      let tree = buildTree(records());

      assert.strictEqual(getParent(tree, tree.at(0).children.at(1)), tree.at(0));
    });

    test('it only looks at the nodes of the list', function (assert) {
      let tree = buildTree(records());
      let second = tree.at(0).children.at(1);
      let grandChild = second.children.at(0);

      assert.strictEqual(getParent(tree, grandChild), undefined, 'the parent is not a root');
      assert.strictEqual(getParent(getDescendents(tree), grandChild), second, 'with all the nodes');
    });

    test('a root has no parent', function (assert) {
      let tree = buildTree(records());

      assert.strictEqual(getParent(tree, tree.at(0)), undefined);
    });
  });
});
