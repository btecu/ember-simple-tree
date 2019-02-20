import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { buildTree } from 'ember-simple-tree/utils/tree';

export default Controller.extend({
  tree: computed('model', function() {
    return buildTree(this.get('model'));
  })
});
