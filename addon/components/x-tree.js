import Component from '@glimmer/component';
import { getAncestors, getDescendents } from '../utils/tree';
import { get, set } from '@ember/object';

export default class TreeComponent extends Component {
  get collapsedIcon() {
    return this.args.collapsedIcon ?? 'x-tree-collapsed-icon';

  }

  get expandedIcon() {
    return this.args.expandedIcon ?? 'x-tree-expanded-icon';
  }

  constructor() {
    super(...arguments);

    // Make sure chosen item is highlighted and expanded-to in the tree
    if (this.args.chosenId) {
      let chosen = getDescendents(this.args.model).findBy('id', this.args.chosenId);
      if (chosen) {
        getAncestors(this.args.model, chosen).forEach(x => {
          /* eslint-disable ember/no-get */
          if (get(x, 'id') !== this.args.chosenId) {
            set(x, 'isExpanded', true);
          }
        });
      }
    }

    // Expand to given depth
    if (this.args.expandDepth) {
      getDescendents(this.args.model, this.args.expandDepth).setEach('isExpanded', true);
    }
  }
}
