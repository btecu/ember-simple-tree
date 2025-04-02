import Component from '@glimmer/component';
import { getDescendents, getAncestors } from '../utils/tree.js';
import { set } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div class=\"tree\">\n  {{#if (has-block)}}\n    <XTreeBranch\n      @checkable={{@checkable}}\n      @recursiveCheck={{@recursiveCheck}}\n      @chosenId={{@chosenId}}\n      @onCheck={{@onCheck}}\n      @onContextMenu={{@onContextMenu}}\n      @onSelect={{@onSelect}}\n      @onHover={{@onHover}}\n      @onHoverOut={{@onHoverOut}}\n      @model={{@model}}\n      @expandedIcon={{this.expandedIcon}}\n      @collapsedIcon={{this.collapsedIcon}}\n      as |node|\n    >\n      {{yield node}}\n    </XTreeBranch>\n  {{else}}\n    <XTreeBranch\n      @model={{@model}}\n      @checkable={{@checkable}}\n      @recursiveCheck={{@recursiveCheck}}\n      @chosenId={{@chosenId}}\n      @onCheck={{@onCheck}}\n      @onContextMenu={{@onContextMenu}}\n      @onSelect={{@onSelect}}\n      @onHover={{@onHover}}\n      @onHoverOut={{@onHoverOut}}\n      @expandedIcon={{this.expandedIcon}}\n      @collapsedIcon={{this.collapsedIcon}}\n    />\n  {{/if}}\n</div>");

class TreeComponent extends Component {
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
      let chosen = getDescendents(this.args.model).find(x => x.id === this.args.chosenId);
      if (chosen) {
        getAncestors(this.args.model, chosen).filter(x => x.id !== this.args.chosenId).forEach(x => set(x, 'isExpanded', true));
      }
    }

    // Expand to given depth
    if (this.args.expandDepth) {
      getDescendents(this.args.model, this.args.expandDepth).setEach('isExpanded', true);
    }
  }
}
setComponentTemplate(TEMPLATE, TreeComponent);

export { TreeComponent as default };
//# sourceMappingURL=x-tree.js.map
