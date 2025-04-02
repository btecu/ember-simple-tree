import { set } from '@ember/object';
import { render, findAll, click, triggerEvent } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

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

module('Integration | Component | x-tree', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<XTree />`);

    assert.dom('.tree').hasNoText();

    this.set('tree', [
      {
        id: 1,
        isVisible: true,
      },
    ]);

    await render(hbs`
      <XTree @model={{this.tree}}>
        template block text
      </XTree>
    `);

    assert.dom('.tree').hasText('template block text');
  });

  test('it renders a standard tree', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`<XTree @model={{this.tree}} />`);

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

    await render(hbs`<XTree @checkable={{true}} @model={{this.tree}} />`);

    assert.dom('input[type=checkbox]').exists({ count: 4 }, '4 checkboxes, one for each node');
    assert.dom('input[type=checkbox]:checked').doesNotExist('no checkboxes checked');
  });

  test('expands and collapses', async function (assert) {
    this.set('tree', collapsedTree);

    await render(hbs`<XTree @model={{this.tree}} />`);

    assert.dom('.tree-node').exists({ count: 1 }, '1 node rendered');

    await click('.toggle-icon');

    assert.dom('.tree-node').exists({ count: 3 }, '3 nodes rendered');

    await click('.toggle-icon');

    assert.dom('.tree-node').exists({ count: 1 }, '1 node rendered');
  });

  test('expand all', async function (assert) {
    this.set('tree', collapsedTree);

    await render(hbs`<XTree @model={{this.tree}} @expandDepth={{-1}} />`);

    assert.dom('.tree-node').exists({ count: 4 }, 'all nodes rendered');
  });

  test('recursive check', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`<XTree @model={{this.tree}} @checkable={{true}} @recursiveCheck={{true}} />`);

    assert.dom('input[type=checkbox]:checked').doesNotExist('no checkboxes checked');

    await click('input[type=checkbox]');

    assert.dom('input[type=checkbox]:checked').exists({ count: 4 }, 'all checkboxes checked');
  });

  test('can use alternate icon components via name', async function (assert) {
    this.set('tree', standardTree);

    await render(hbs`
      <XTree
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
      <XTree
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
      <XTree @checkable={{true}} @model={{this.tree}} as |node|>
        {{node.toggle}}
        {{node.checkbox}}
        <span class="tree-label">{{node.model.name}}</span>
      </XTree>
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

    await render(hbs`<XTree @model={{this.tree}} @onSelect={{this.onSelect}} />`);

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

    await render(hbs`<XTree @model={{this.tree}} @onContextMenu={{this.onContextMenu}} />`);
    await triggerEvent('.tree-node span', 'contextmenu');

    assert.strictEqual(this.name, 'Root', 'item from contextMenu event is returned as expected');
  });
});
