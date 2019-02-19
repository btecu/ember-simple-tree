import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | light-tree-toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('it expands and collapses', async function(assert) {
    this.expanded = false;
    this.set('toggleExpand', () => {
      this.expanded = !this.expanded;
    });

    await render(hbs`
      {{light-tree-toggle
        toggleExpand=(action toggleExpand)
        expandedIcon="light-table-expanded-icon"
        collapsedIcon="light-table-collapsed-icon"
      }}`);

    assert.equal(this.element.textContent.trim(), '');
    assert.equal(this.expanded, false);

    await click('.toggle-icon');

    assert.equal(this.expanded, true);

    await click('.toggle-icon');

    assert.equal(this.expanded, false);
  });
});
