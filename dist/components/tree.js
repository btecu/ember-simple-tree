import "./../styles/tree.css"
import Component from '@glimmer/component';
import { getDescendents, getAncestors } from '../utils/tree.js';
import { set } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

;

var TEMPLATE = precompileTemplate("<div class=\"tree\">\n  {{#if (has-block)}}\n    <TreeBranch\n      @checkable={{@checkable}}\n      @recursiveCheck={{@recursiveCheck}}\n      @chosenId={{@chosenId}}\n      @onCheck={{@onCheck}}\n      @onContextMenu={{@onContextMenu}}\n      @onSelect={{@onSelect}}\n      @onHover={{@onHover}}\n      @onHoverOut={{@onHoverOut}}\n      @model={{@model}}\n    >\n      <:expandedIcon>\n        {{#if (has-block \"expandedIcon\")}}\n          {{yield to=\"expandedIcon\"}}\n        {{else}}\n          &#x25BC;\n        {{/if}}\n      </:expandedIcon>\n      <:collapsedIcon>\n        {{#if (has-block \"collapsedIcon\")}}\n          {{yield to=\"collapsedIcon\"}}\n        {{else}}\n          &#x25B6;\n        {{/if}}\n      </:collapsedIcon>\n      <:default as |node|>\n        {{yield node}}\n      </:default>\n    </TreeBranch>\n  {{else}}\n    <TreeBranch\n      @checkable={{@checkable}}\n      @recursiveCheck={{@recursiveCheck}}\n      @chosenId={{@chosenId}}\n      @onCheck={{@onCheck}}\n      @onContextMenu={{@onContextMenu}}\n      @onSelect={{@onSelect}}\n      @onHover={{@onHover}}\n      @onHoverOut={{@onHoverOut}}\n      @model={{@model}}\n    >\n      <:expandedIcon>\n        {{#if (has-block \"expandedIcon\")}}\n          {{yield to=\"expandedIcon\"}}\n        {{else}}\n          &#x25BC;\n        {{/if}}\n      </:expandedIcon>\n      <:collapsedIcon>\n        {{#if (has-block \"collapsedIcon\")}}\n          {{yield to=\"collapsedIcon\"}}\n        {{else}}\n          &#x25B6;\n        {{/if}}\n      </:collapsedIcon>\n    </TreeBranch>\n  {{/if}}\n</div>\n");

class TreeComponent extends Component {
  constructor() {
    super(...arguments);

    // Make sure chosen item is highlighted and expanded-to in the tree
    if (this.args.chosenId !== null && this.args.chosenId !== undefined) {
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
//# sourceMappingURL=tree.js.map
