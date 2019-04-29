import Component from '@ember/component';
import layout from '../templates/components/x-tree';
import { getDescendents, getAncestors } from '../utils/tree';
import { set }  from '@ember/object';

export default Component.extend({
  layout,
  expandDepth: 0,
  recursiveCheck: false,
  classNames: ['tree'],

  expandedIcon: 'x-tree-expanded-icon',
  collapsedIcon: 'x-tree-collapsed-icon',

  init() {
    this._super(...arguments);
    let tree = this.model;

    // Make sure chosen item is highlighted and expanded-to in the tree
    let chosenId = this.chosenId;
    if (chosenId) {
      let chosen = getDescendents(tree).findBy('id', chosenId);
      if (chosen) {
        getAncestors(tree, chosen).forEach(x => {
          if (x.id !== chosenId) {
            set(x, 'isExpanded', true);
          }
        });
      }
    }

    // Expand to given depth
    let expandDepth = this.expandDepth;
    if (expandDepth) {
      getDescendents(tree, expandDepth).setEach('isExpanded', true);
    }
  }
});
