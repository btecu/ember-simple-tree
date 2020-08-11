import Component from '@ember/component';
import layout from '../templates/components/x-tree';
import { getDescendents, getAncestors } from '../utils/tree';
import { get, set }  from '@ember/object';

export default Component.extend({
  layout,
  expandDepth: 0,
  lazyRenderChildren: false,
  recursiveCheck: false,
  classNames: ['tree'],

  expandedIcon: 'x-tree-expanded-icon',
  collapsedIcon: 'x-tree-collapsed-icon',

  init() {
    this._super(...arguments);

    // Make sure chosen item is highlighted and expanded-to in the tree
    if (this.chosenId) {
      let chosen = getDescendents(this.model).findBy('id', this.chosenId);
      if (chosen) {
        getAncestors(this.model, chosen).forEach(x => {
          if (get(x, 'id') !== this.chosenId) {
            set(x, 'isExpanded', true);
          }
        });
      }
    }

    // Expand to given depth
    if (this.expandDepth) {
      getDescendents(this.model, this.expandDepth).setEach('isExpanded', true);
    }
  }
});
