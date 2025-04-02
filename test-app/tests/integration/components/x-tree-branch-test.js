import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | x-tree-branch', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<XTreeBranch />`);

    assert.dom('.tree-branch').hasNoText();

    this.set('tree', [
      {
        id: 1,
        isVisible: true,
      },
    ]);

    await render(hbs`
      <XTreeBranch @model={{this.tree}}>
        template block text
      </XTreeBranch>
    `);

    assert.dom('.tree-branch').hasText('template block text');
  });
});
