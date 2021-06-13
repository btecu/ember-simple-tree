import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | x-tree-toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('it expands and collapses', async function(assert) {
    this.expanded = false;
    this.set('toggleExpand', () => {
      this.expanded = !this.expanded;
    });

    await render(hbs`
      <XTreeToggle
        @toggleExpand={{action this.toggleExpand}}
        @expandedIcon="x-tree-expanded-icon"
        @collapsedIcon="x-tree-collapsed-icon"
      />`);

    assert.equal(this.element.textContent.trim(), '');
    assert.equal(this.expanded, false);

    await click('.toggle-icon');

    assert.equal(this.expanded, true);

    await click('.toggle-icon');

    assert.equal(this.expanded, false);
  });
});
