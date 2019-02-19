import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const standardTree = [{
  id: 0,
  name: 'Root',
  isExpanded: true,
  isSelected: false,
  isVisible: true,
  children: [
    {
      id: 1,
      name: 'First Child',
      isExpanded: true,
      isSelected: false,
      isVisible: true,
      children: []
    },
    {
      id: 2,
      name: 'Second Child',
      isExpanded: true,
      isSelected: false,
      isVisible: true,
      children: [
        {
          id: 3,
          name: 'First Grand Child',
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

module('Integration | Component | light-tree', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{light-tree}}`);

    assert.equal(this.element.textContent.trim(), '');

    this.set('tree', [{
      id: 1,
      isVisible: true
    }]);

    // Template block usage:
    await render(hbs`
      {{#light-tree model=tree}}
        template block text
      {{/light-tree}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it renders a standard tree', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`{{light-tree model=tree}}`);

    assert.equal(findAll('.light-tree-node').length, 4, '4 nodes rendered');
    assert.equal(findAll('.light-tree-branch').length, 5, '5 branches rendered');

    assert.equal(findAll('.light-tree-node')[0].querySelector('.light-tree-label').textContent.trim(), 'Root');
    assert.equal(findAll('.light-tree-node')[1].querySelector('.light-tree-label').textContent.trim(), 'First Child');
    assert.equal(findAll('.light-tree-node')[2].querySelector('.light-tree-label').textContent.trim(), 'Second Child');
    assert.equal(findAll('.light-tree-node')[3].querySelector('.light-tree-label').textContent.trim(), 'First Grand Child');
  });

  test('checkable', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`{{light-tree model=tree checkable=true}}`);

    assert.equal(findAll('input[type=checkbox]').length, 4, '4 checkboxes, one for each node');
    assert.equal(findAll('input[type=checkbox]:checked').length, 0, 'no checkboxes checked');
  });

  test('expands and collapses', async function(assert) {
    this.set('tree', collapsedTree);

    await render(hbs`{{light-tree model=tree}}`);

    assert.equal(findAll('.light-tree-node').length, 1, '1 nodes rendered');

    await click('.toggle-icon');

    assert.equal(findAll('.light-tree-node').length, 3, '3 nodes rendered');

    await click('.toggle-icon');

    assert.equal(findAll('.light-tree-node').length, 1, '1 nodes rendered');
  });

  test('expand all', async function(assert) {
    this.set('tree', collapsedTree);

    await render(hbs`{{light-tree model=tree expandDepth=-1}}`);

    assert.equal(findAll('.light-tree-node').length, 4, 'all nodes rendered');
  });

  test('recursive check', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`{{light-tree model=tree checkable=true recursiveCheck=true}}`);

    assert.equal(findAll('input[type=checkbox]:checked').length, 0, 'no checkboxes checked');

    await click('input[type=checkbox]');

    assert.equal(findAll('input[type=checkbox]:checked').length, 4, 'all checkboxes checked');
  });
});
