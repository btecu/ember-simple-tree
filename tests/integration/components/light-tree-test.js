import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

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
});
