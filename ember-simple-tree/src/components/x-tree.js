import Component from '@glimmer/component';
import { getAncestors, getDescendents } from '../utils/tree.js';
import { set } from '@ember/object';

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
      let chosen = getDescendents(this.args.model).find((x) => x.id === this.args.chosenId);
      if (chosen) {
        getAncestors(this.args.model, chosen)
          .filter((x) => x.id !== this.args.chosenId)
          .forEach((x) => set(x, 'isExpanded', true));
      }
    }

    // Expand to given depth
    if (this.args.expandDepth) {
      getDescendents(this.args.model, this.args.expandDepth).setEach('isExpanded', true);
    }
  }
}
