import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | x-tree-branch', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{x-tree-branch}}`);

    assert.equal(this.element.textContent.trim(), '');

    this.set('tree', [{
      id: 1,
      isVisible: true
    }]);

    // Template block usage:
    await render(hbs`
      {{#x-tree-branch model=tree}}
        template block text
      {{/x-tree-branch}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
