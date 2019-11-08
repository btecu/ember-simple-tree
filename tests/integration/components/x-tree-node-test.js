import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | x-tree-node', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{x-tree-node}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#x-tree-node}}
        template block text
      {{/x-tree-node}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('select event', async function(assert) {
    this.selected = false;
    this.model = {
      name: 'a',
      children: []
    };
    this.set('onSelect', () => {
      this.selected = !this.selected;
    });

    await render(hbs`{{x-tree-node model=model onSelect=(action onSelect)}}`);

    await click('.tree-toggle');

    assert.equal(this.selected, true, 'selected');

    await click('.tree-toggle');

    assert.equal(this.selected, false, 'unselected');
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

    await render(hbs`{{x-tree-node model=model onContextMenu=(action onContextMenu)}}`);

    await triggerEvent('.tree-toggle', 'contextmenu');

    assert.equal(this.rightClicked, true, 'right click detected');
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

    await render(hbs`{{x-tree-node model=model onHover=(action onHover) onHoverOut=(action onHoverOut)}}`);

    await triggerEvent('.tree-toggle', 'mouseenter');

    assert.equal(this.hovering, true, 'hovering');

    await triggerEvent('.tree-toggle', 'mouseleave');

    assert.equal(this.hovering, false, 'hover out');
  });
});
