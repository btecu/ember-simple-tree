import Component from '@ember/component';
import layout from '../templates/components/x-tree';
import { getDescendents, getAncestors } from '../utils/tree';
import { get, set }  from '@ember/object';

export default Component.extend({
  layout,
  expandDepth: 0,
  recursiveCheck: false,
  classNames: ['light-tree'],

  init() {
    this._super(...arguments);
    let tree = this.get('model');

    // Make sure chosen item is highlighted and expanded-to in the tree
    let chosenId = this.get('chosenId');
    if (chosenId) {
      let chosen = getDescendents(tree).findBy('id', chosenId);
      if (chosen) {
        getAncestors(tree, chosen).forEach(x => {
          if (get(x, 'id') !== chosenId) {
            set(x, 'isExpanded', true);
          }
        });
      }
    }

    // Expand to given depth
    let expandDepth = this.get('expandDepth');
    if (expandDepth) {
      getDescendents(tree, expandDepth).setEach('isExpanded', true);
    }
  }
});
