import { module, test } from 'qunit';
import { set }  from '@ember/object';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, click } from '@ember/test-helpers';
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
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{x-tree}}`);

    assert.equal(this.element.textContent.trim(), '');

    this.set('tree', [{
      id: 1,
      isVisible: true
    }]);

    // Template block usage:
    await render(hbs`
      {{#x-tree model=tree}}
        template block text
      {{/x-tree}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it renders a standard tree', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`{{x-tree model=tree}}`);

    assert.equal(findAll('.tree-node').length, 4, '4 nodes rendered');
    assert.equal(findAll('.tree-branch').length, 5, '5 branches rendered');

    assert.equal(findAll('.tree-node')[0].querySelector('.tree-label').textContent.trim(), 'Root');
    assert.equal(findAll('.tree-node')[1].querySelector('.tree-label').textContent.trim(), 'First Child');
    assert.equal(findAll('.tree-node')[2].querySelector('.tree-label').textContent.trim(), 'Second Child');
    assert.equal(findAll('.tree-node')[3].querySelector('.tree-label').textContent.trim(), 'First Grand Child');
  });

  test('checkable', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`{{x-tree model=tree checkable=true}}`);

    assert.equal(findAll('input[type=checkbox]').length, 4, '4 checkboxes, one for each node');
    assert.equal(findAll('input[type=checkbox]:checked').length, 0, 'no checkboxes checked');
  });

  test('expands and collapses', async function(assert) {
    this.set('tree', collapsedTree);

    await render(hbs`{{x-tree model=tree}}`);

    assert.equal(findAll('.tree-node').length, 1, '1 nodes rendered');

    await click('.toggle-icon');

    assert.equal(findAll('.tree-node').length, 3, '3 nodes rendered');

    await click('.toggle-icon');

    assert.equal(findAll('.tree-node').length, 1, '1 nodes rendered');
  });

  test('expand all', async function(assert) {
    this.set('tree', collapsedTree);

    await render(hbs`{{x-tree model=tree expandDepth=-1}}`);

    assert.equal(findAll('.tree-node').length, 4, 'all nodes rendered');
  });

  test('recursive check', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`{{x-tree model=tree checkable=true recursiveCheck=true}}`);

    assert.equal(findAll('input[type=checkbox]:checked').length, 0, 'no checkboxes checked');

    await click('input[type=checkbox]');

    assert.equal(findAll('input[type=checkbox]:checked').length, 4, 'all checkboxes checked');
  });

  test('can use alternate icon components via name', async function(assert) {
    this.set('tree', standardTree);

    this.owner.register('component:e-a', Component.extend({
      layout: hbs`e`
    }));
    this.owner.register('component:c-a', Component.extend({
      layout: hbs`c`
    }));

    await render(hbs`{{x-tree model=tree expandedIcon="e-a" collapsedIcon="c-a"}}`);

    assert.equal(find('.toggle-icon').textContent.trim(), 'e', 'alternate icon displayed');
  });

  test('can use alternate icon components passed in', async function(assert) {
    this.set('tree', standardTree);

    this.owner.register('component:e-a', Component.extend({
      layout: hbs`e`
    }));
    this.owner.register('component:c-a', Component.extend({
      layout: hbs`c`
    }));

    await render(hbs`{{x-tree model=tree expandedIcon=(component "e-a") collapsedIcon=(component "c-a")}}`);

    assert.equal(find('.toggle-icon').textContent.trim(), 'e', 'alternate icon displayed');
  });

  test('can use standard block form', async function(assert) {
    this.set('tree', standardTree);

    await render(hbs`
      {{#x-tree
        model=tree
        checkable=true
        as |node|
      }}
        {{node.toggle}}
        {{node.checkbox}}
        <span class="tree-label">{{node.model.name}}</span>
      {{/x-tree}}
    `);

    assert.equal(findAll('.tree-node').length, 4, '4 nodes rendered');
    assert.equal(findAll('.tree-branch').length, 5, '5 branches rendered');

    assert.equal(findAll('.tree-node')[0].querySelector('.tree-label').textContent.trim(), 'Root');
    assert.equal(findAll('.tree-node')[1].querySelector('.tree-label').textContent.trim(), 'First Child');
    assert.equal(findAll('.tree-node')[2].querySelector('.tree-label').textContent.trim(), 'Second Child');
    assert.equal(findAll('.tree-node')[3].querySelector('.tree-label').textContent.trim(), 'First Grand Child');

    assert.equal(findAll('input[type=checkbox]').length, 4, '4 checkboxes, one for each node');
  });

  test('can disable nodes', async function(assert) {
    this.selected = false;
    this.set('onSelect', () => {
      this.selected = !this.selected;
    });
    this.set('tree', standardTree);

    await render(hbs`{{x-tree model=tree onSelect=(action onSelect)}}`);
    
    await click('.tree-node span');

    assert.equal(this.selected, true, 'tree nodes can be selected');
    set(standardTree[0], 'isDisabled', true);

    await click('.tree-node span');
    assert.equal(this.selected, true, 'disabled tree nodes cannot be selected');
    set(standardTree[0], 'isDisabled', false);

    await click('.tree-node span');
    assert.equal(this.selected, false, 're-enabled tree nodes can be selected again');
  });
});
