import { set } from '@ember/object';
import { render, find, findAll, click, triggerEvent } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { buildTree } from 'ember-simple-tree/utils/tree';

const standardTree = [
  {
    id: 0,
    name: 'Root',
    isDisabled: false,
    isExpanded: true,
    isSelected: false,
    isVisible: true,
    children: [
      {
        id: 1,
        name: 'First Child',
        isDisabled: false,
        isExpanded: true,
        isSelected: false,
        isVisible: true,
        children: [],
      },
      {
        id: 2,
        name: 'Second Child',
        isDisabled: false,
        isExpanded: true,
        isSelected: false,
        isVisible: true,
        children: [
          {
            id: 3,
            name: 'First Grand Child',
            isDisabled: false,
            isExpanded: true,
            isSelected: false,
            isVisible: true,
            children: [],
          },
        ],
      },
    ],
  },
];

const collapsedTree = [
  {
    id: 0,
    name: 'Root',
    isExpanded: false,
    isSelected: false,
    isVisible: true,
    children: [
      {
        id: 1,
        name: 'First Child',
        isExpanded: false,
        isSelected: false,
        isVisible: true,
        children: [],
      },
      {
        id: 2,
        name: 'Second Child',
        isExpanded: false,
        isSelected: false,
        isVisible: true,
        children: [
          {
            id: 3,
            name: 'First Grand Child',
            isExpanded: false,
            isSelected: true,
            isVisible: true,
            children: [],
          },
        ],
      },
    ],
  },
];

module('Integration | Component | tree', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Tree />`);

    assert.dom('.tree').hasNoText();

    this.set('tree', [
      {
        id: 1,
        isVisible: true,
      },
    ]);

    await render(hbs`
      <Tree @model={{this.tree}}>
        template block text
      </Tree>
    `);

    assert.dom('.tree').hasText('template block text');
  });

  test('it renders a standard tree', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`<Tree @model={{this.tree}} />`);

    assert.dom('.tree-node').exists({ count: 4 }, '4 nodes rendered');
    assert.dom('.tree-branch').exists({ count: 5 }, '5 branches rendered');

    let nodes = findAll('.tree-node');
    assert.dom('.tree-label', nodes.at(0)).hasText('Root');
    assert.dom('.tree-label', nodes.at(1)).hasText('First Child');
    assert.dom('.tree-label', nodes.at(2)).hasText('Second Child');
    assert.dom('.tree-label', nodes.at(3)).hasText('First Grand Child');
  });

  test('checkable', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`<Tree @checkable={{true}} @model={{this.tree}} />`);

    assert.dom('input[type=checkbox]').exists({ count: 4 }, '4 checkboxes, one for each node');
    assert.dom('input[type=checkbox]:checked').doesNotExist('no checkboxes checked');
  });

  test('expands and collapses', async function (assert) {
    this.set('tree', collapsedTree);

    await render(hbs`<Tree @model={{this.tree}} />`);

    assert.dom('.tree-node').exists({ count: 1 }, '1 node rendered');

    await click('.toggle-icon');

    assert.dom('.tree-node').exists({ count: 3 }, '3 nodes rendered');

    await click('.toggle-icon');

    assert.dom('.tree-node').exists({ count: 1 }, '1 node rendered');
  });

  test('expand all', async function (assert) {
    this.set('tree', collapsedTree);

    await render(hbs`<Tree @model={{this.tree}} @expandDepth={{-1}} />`);

    assert.dom('.tree-node').exists({ count: 4 }, 'all nodes rendered');
  });

  test('recursive check', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`<Tree @model={{this.tree}} @checkable={{true}} @recursiveCheck={{true}} />`);

    assert.dom('input[type=checkbox]:checked').doesNotExist('no checkboxes checked');

    await click('input[type=checkbox]');

    assert.dom('input[type=checkbox]:checked').exists({ count: 4 }, 'all checkboxes checked');
  });

  test('recursive check when onSelect changes isChecked', async function (assert) {
    let [root] = buildTree([
      { id: 1, parentId: null, name: 'Root', isExpanded: true },
      { id: 2, parentId: 1, name: 'First Child' },
      { id: 3, parentId: 1, name: 'Second Child' },
    ]);

    let [first, second] = root.children;

    this.tree = [root];
    this.onSelect = (node) => set(node, 'isChecked', !node.isChecked);

    await render(hbs`
      <Tree
        @checkable={{true}}
        @model={{this.tree}}
        @onSelect={{this.onSelect}}
        @recursiveCheck={{true}}
      />
    `);

    let labels = findAll('.tree-label');

    await click(labels[1]);

    assert.true(first.isChecked, 'selected child is checked');
    assert.false(root.isChecked, 'parent is not checked');
    assert.true(root.isIndeterminate, 'parent is indeterminate');

    await click(labels[2]);

    assert.true(root.isChecked, 'parent is checked once all children are');
    assert.false(root.isIndeterminate, 'parent is no longer indeterminate');

    await click(labels[0]);

    assert.false(root.isChecked, 'parent is unchecked');
    assert.false(first.isChecked, 'first child is unchecked with its parent');
    assert.false(second.isChecked, 'second child is unchecked with its parent');
  });

  test('can use alternate icon components via name', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`
      <Tree
        @collapsedIcon="collapsed-icon"
        @expandedIcon="expanded-icon"
        @model={{this.tree}}
      />
    `);

    assert.dom('.toggle-icon').hasText('e', 'alternate icon displayed');
  });

  test('can use alternate icon components passed in', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`
      <Tree
        @collapsedIcon={{component "collapsed-icon"}}
        @expandedIcon={{component "expanded-icon"}}
        @model={{this.tree}}
      />
    `);

    assert.dom('.toggle-icon').hasText('e', 'alternate icon displayed');
  });

  test('can use standard block form', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`
      <Tree @checkable={{true}} @model={{this.tree}} as |node|>
        {{node.toggle}}
        {{node.checkbox}}
        <span class="tree-label">{{node.model.name}}</span>
      </Tree>
    `);

    assert.dom('.tree-node').exists({ count: 4 }, '4 nodes rendered');
    assert.dom('.tree-branch').exists({ count: 5 }, '5 branches rendered');

    let nodes = findAll('.tree-node');
    assert.dom('.tree-label', nodes.at(0)).hasText('Root');
    assert.dom('.tree-label', nodes.at(1)).hasText('First Child');
    assert.dom('.tree-label', nodes.at(2)).hasText('Second Child');
    assert.dom('.tree-label', nodes.at(3)).hasText('First Grand Child');

    assert.dom('input[type=checkbox]').exists({ count: 4 }, '4 checkboxes, one for each node');
  });

  test('can disable nodes', async function (assert) {
    this.selected = false;

    this.set('onSelect', () => {
      this.selected = !this.selected;
    });

    this.set('tree', standardTree);

    await render(hbs`<Tree @model={{this.tree}} @onSelect={{this.onSelect}} />`);

    await click('.tree-node span');

    assert.true(this.selected, 'tree nodes can be selected');
    set(standardTree[0], 'isDisabled', true);

    await click('.tree-node span');
    assert.true(this.selected, 'disabled tree nodes cannot be selected');
    set(standardTree[0], 'isDisabled', false);

    await click('.tree-node span');
    assert.false(this.selected, 're-enabled tree nodes can be selected again');
  });

  test('contextMenu event', async function (assert) {
    this.set('onContextMenu', (x) => (this.name = x.name));
    this.set('tree', standardTree);

    await render(hbs`<Tree @model={{this.tree}} @onContextMenu={{this.onContextMenu}} />`);
    await triggerEvent('.tree-node span', 'contextmenu');

    assert.strictEqual(this.name, 'Root', 'item from contextMenu event is returned as expected');
  });

  module('styles', function () {
    test('they are shipped with the component', async function (assert) {
      this.tree = buildTree([
        { id: 1, name: 'Root', isDisabled: true, isExpanded: true },
        { id: 2, parentId: 1, name: 'Child' },
      ]);

      await render(hbs`<Tree @chosenId={{1}} @model={{this.tree}} />`);

      let style = (selector) => getComputedStyle(find(selector));

      assert.strictEqual(style('.tree-node').listStyleType, 'none', '.tree-node');
      assert.strictEqual(style('.tree-branch').paddingLeft, '0px', '.tree-branch');
      assert.strictEqual(style('.tree-node .tree-branch').marginTop, '0px', 'nested .tree-branch');
      assert.notStrictEqual(style('.tree-node .tree-branch').paddingLeft, '0px', 'nested .tree-branch is indented');
      assert.strictEqual(style('.tree-chosen').fontWeight, '700', '.tree-chosen');
      assert.strictEqual(style('.tree-disabled').cursor, 'not-allowed', '.tree-disabled');
      assert.strictEqual(style('.toggle-icon').cursor, 'pointer', '.toggle-icon');
    });
  });
});
