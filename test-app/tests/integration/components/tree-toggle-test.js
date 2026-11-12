import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tree-toggle', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.noop = () => {};
  });

  test('it expands and collapses', async function (assert) {
    this.expanded = false;

    this.set('toggleExpand', () => {
      this.expanded = !this.expanded;
    });

    await render(hbs`
      <TreeToggle
        @toggleExpand={{this.toggleExpand}}
      />`);

    assert.false(this.expanded);

    await click('.toggle-icon');

    assert.true(this.expanded);

    await click('.toggle-icon');

    assert.false(this.expanded);
  });

  test('a leaf has no icon', async function (assert) {
    this.model = { children: [] };

    await render(hbs`<TreeToggle @model={{this.model}} @toggleExpand={{this.noop}} />`);

    assert.dom('.toggle-icon').hasText('\u00a0', 'only a non-breaking space');
  });

  test('it renders the default icons', async function (assert) {
    this.set('model', { children: [{}], isExpanded: true });

    await render(hbs`<TreeToggle @model={{this.model}} @toggleExpand={{this.noop}} />`);

    assert.dom('.toggle-icon').hasText('▼');

    this.set('model', { children: [{}], isExpanded: false });

    assert.dom('.toggle-icon').hasText('▶');
  });

  test('it renders custom icons from named blocks', async function (assert) {
    this.set('model', { children: [{}], isExpanded: true });

    await render(hbs`
      <TreeToggle @model={{this.model}} @toggleExpand={{this.noop}}>
        <:expandedIcon>open</:expandedIcon>
        <:collapsedIcon>closed</:collapsedIcon>
      </TreeToggle>
    `);

    assert.dom('.toggle-icon').hasText('open');

    this.set('model', { children: [{}], isExpanded: false });

    assert.dom('.toggle-icon').hasText('closed');
  });

  test('a missing named block falls back to the default icon', async function (assert) {
    this.set('model', { children: [{}], isExpanded: true });

    await render(hbs`
      <TreeToggle @model={{this.model}} @toggleExpand={{this.noop}}>
        <:collapsedIcon>closed</:collapsedIcon>
      </TreeToggle>
    `);

    assert.dom('.toggle-icon').hasText('▼');

    this.set('model', { children: [{}], isExpanded: false });

    assert.dom('.toggle-icon').hasText('closed');
  });
});
