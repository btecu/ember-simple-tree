import { buildTree } from 'ember-simple-tree/utils/tree';
import { module, test } from 'qunit';

module('Unit | Utility | tree', function () {
  module('buildTree', function () {
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
});
