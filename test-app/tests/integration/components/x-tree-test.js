/* eslint-disable ember/no-classic-components */
/* eslint-disable ember/no-classic-classes */

import { module, test } from 'qunit';
import { set }  from '@ember/object';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, click, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';

const standardTree = [{
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
      children: []
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
          children: []
        }
      ]
    }
  ]
}];

const collapsedTree = [{
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
      children: []
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
          children: []
        }
      ]
    }
  ]
}];

module('Integration | Component | x-tree', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<XTree />`);

    assert.strictEqual(this.element.textContent.trim(), '');

    this.set('tree', [{
      id: 1,
      isVisible: true
    }]);

    // Template block usage:
    await render(hbs`
      <XTree @model={{this.tree}}>
        template block text
      </XTree>
    `);

    assert.strictEqual(this.element.textContent.trim(), 'template block text');
  });

  test('it renders a standard tree', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`<XTree @model={{this.tree}} />`);

    assert.strictEqual(findAll('.tree-node').length, 4, '4 nodes rendered');
    assert.strictEqual(findAll('.tree-branch').length, 5, '5 branches rendered');

    assert.strictEqual(findAll('.tree-node')[0].querySelector('.tree-label').textContent.trim(), 'Root');
    assert.strictEqual(findAll('.tree-node')[1].querySelector('.tree-label').textContent.trim(), 'First Child');
    assert.strictEqual(findAll('.tree-node')[2].querySelector('.tree-label').textContent.trim(), 'Second Child');
    assert.strictEqual(findAll('.tree-node')[3].querySelector('.tree-label').textContent.trim(), 'First Grand Child');
  });

  test('checkable', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`<XTree @model={{this.tree}} @checkable={{true}} />`);

    assert.strictEqual(findAll('input[type=checkbox]').length, 4, '4 checkboxes, one for each node');
    assert.strictEqual(findAll('input[type=checkbox]:checked').length, 0, 'no checkboxes checked');
  });

  test('expands and collapses', async function(assert) {
    this.set('tree', collapsedTree);

    await render(hbs`<XTree @model={{this.tree}} />`);

    assert.strictEqual(findAll('.tree-node').length, 1, '1 nodes rendered');

    await click('.toggle-icon');

    assert.strictEqual(findAll('.tree-node').length, 3, '3 nodes rendered');

    await click('.toggle-icon');

    assert.strictEqual(findAll('.tree-node').length, 1, '1 nodes rendered');
  });

  test('expand all', async function(assert) {
    this.set('tree', collapsedTree);

    await render(hbs`<XTree @model={{this.tree}} @expandDepth={{-1}} />`);

    assert.strictEqual(findAll('.tree-node').length, 4, 'all nodes rendered');
  });

  test('recursive check', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`<XTree @model={{this.tree}} @checkable={{true}} @recursiveCheck={{true}} />`);

    assert.strictEqual(findAll('input[type=checkbox]:checked').length, 0, 'no checkboxes checked');

    await click('input[type=checkbox]');

    assert.strictEqual(findAll('input[type=checkbox]:checked').length, 4, 'all checkboxes checked');
  });

  test('can use alternate icon components via name', async function(assert) {
    this.set('tree', standardTree);

    this.owner.register('component:e-a', Component.extend({
      layout: hbs`e`
    }));
    this.owner.register('component:c-a', Component.extend({
      layout: hbs`c`
    }));

    await render(hbs`<XTree @model={{this.tree}} @expandedIcon="e-a" collapsedIcon="c-a" />`);

    assert.strictEqual(find('.toggle-icon').textContent.trim(), 'e', 'alternate icon displayed');
  });

  test('can use alternate icon components passed in', async function(assert) {
    this.set('tree', standardTree);

    this.owner.register('component:e-a', Component.extend({
      layout: hbs`e`
    }));
    this.owner.register('component:c-a', Component.extend({
      layout: hbs`c`
    }));

    await render(hbs`
      <XTree
        @model={{this.tree}}
        @expandedIcon={{component "e-a"}}
        @collapsedIcon={{component "c-a"}}
      />
    `);

    assert.strictEqual(find('.toggle-icon').textContent.trim(), 'e', 'alternate icon displayed');
  });

  test('can use standard block form', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`
      <XTree
        @model={{this.tree}}
        @checkable={{true}}
        as |node|
      >
        {{node.toggle}}
        {{node.checkbox}}
        <span class="tree-label">{{node.model.name}}</span>
      </XTree>
    `);

    assert.strictEqual(findAll('.tree-node').length, 4, '4 nodes rendered');
    assert.strictEqual(findAll('.tree-branch').length, 5, '5 branches rendered');

    assert.strictEqual(findAll('.tree-node')[0].querySelector('.tree-label').textContent.trim(), 'Root');
    assert.strictEqual(findAll('.tree-node')[1].querySelector('.tree-label').textContent.trim(), 'First Child');
    assert.strictEqual(findAll('.tree-node')[2].querySelector('.tree-label').textContent.trim(), 'Second Child');
    assert.strictEqual(findAll('.tree-node')[3].querySelector('.tree-label').textContent.trim(), 'First Grand Child');

    assert.strictEqual(findAll('input[type=checkbox]').length, 4, '4 checkboxes, one for each node');
  });

  test('can disable nodes', async function(assert) {
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

  test('contextMenu event', async function(assert) {
    this.set('onContextMenu', x => this.name = x.name);
    this.set('tree', standardTree);

    await render(hbs`<XTree @model={{this.tree}} @onContextMenu={{this.onContextMenu}} />`);
    await triggerEvent('.tree-node span', 'contextmenu')

    assert.strictEqual(this.name, 'Root', 'item from contextMenu event is returned as expected');
  });
});
