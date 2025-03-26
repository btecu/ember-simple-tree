import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | x-tree-node', function(hooks) {
  setupRenderingTest(hooks);

  test('select event', async function(assert) {
    this.selected = false;
    this.model = {
      name: 'a',
      children: []
    };

    this.set('onSelect', () => {
      this.selected = !this.selected;
    });

    await render(hbs`<XTreeNode @model={{this.model}} @onSelect={{action this.onSelect}} />`);

    await click('.tree-toggle');

    assert.true(this.selected, 'selected');

    await click('.tree-toggle');

    assert.false(this.selected, 'unselected');
  });

  test('contextmenu event', async function(assert) {
    this.rightClicked = false;
    this.model = {
      name: 'a',
      children: []
    };

    this.set('onContextMenu', () => {
      this.rightClicked = true;
    });

    await render(hbs`<XTreeNode @model={{this.model}} @onContextMenu={{action this.onContextMenu}} />`);

    await triggerEvent('.tree-toggle', 'contextmenu');

    assert.true(this.rightClicked, 'right click detected');
  });

  test('chosenId argument', async function (assert) {
    this.model = {
      id: 'foo',
      name: 'a',
      children: [],
    };

    await render(hbs`<XTreeNode @model={{this.model}} @chosenId='foo' />`);
    assert.dom('.tree-chosen').exists('class applied when the chosenId matches model id');

    await render(hbs`<XTreeNode @model={{this.model}} @chosenId='bar' />`);
    assert
      .dom('.tree-chosen')
      .doesNotExist('class not applied when the chosenId does not match model id');
  });

  test('onHover and onHoverOut events', async function(assert) {
    this.hovering = false;
    this.model = {
      name: 'a',
      children: []
    };

    this.set('onHover', () => {
      this.hovering = true;
    });

    this.set('onHoverOut', () => {
      this.hovering = false;
    });

    await render(hbs`
      <XTreeNode
        @model={{this.model}}
        @onHover={{action this.onHover}}
        @onHoverOut={{action this.onHoverOut}}
      />
    `);

    await triggerEvent('.tree-toggle', 'mouseenter');

    assert.true(this.hovering, 'hovering');

    await triggerEvent('.tree-toggle', 'mouseleave');

    assert.false(this.hovering, 'hover out');
  });
});
