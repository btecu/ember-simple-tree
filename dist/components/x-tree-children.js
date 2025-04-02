import Component from '@glimmer/component';
import { setProperties, action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<li class=\"tree-node\">\n  {{#if (has-block)}}\n    <XTreeNode\n      @checkable={{@checkable}}\n      @recursiveCheck={{@recursiveCheck}}\n      @updateCheckbox={{this.updateCheckbox}}\n      @chosenId={{@chosenId}}\n      @onCheck={{@onCheck}}\n      @onContextMenu={{@onContextMenu}}\n      @onSelect={{@onSelect}}\n      @onHover={{@onHover}}\n      @onHoverOut={{@onHoverOut}}\n      @model={{@model}}\n      @expandedIcon={{@expandedIcon}}\n      @collapsedIcon={{@collapsedIcon}}\n      as |node|\n    >\n      {{yield node}}\n    </XTreeNode>\n\n    {{#if @model.isExpanded}}\n      <XTreeBranch\n        @checkable={{@checkable}}\n        @recursiveCheck={{@recursiveCheck}}\n        @updateCheckbox={{this.updateCheckbox}}\n        @chosenId={{@chosenId}}\n        @onCheck={{@onCheck}}\n        @onContextMenu={{@onContextMenu}}\n        @onSelect={{@onSelect}}\n        @onHover={{@onHover}}\n        @onHoverOut={{@onHoverOut}}\n        @model={{@model.children}}\n        @expandedIcon={{@expandedIcon}}\n        @collapsedIcon={{@collapsedIcon}}\n        as |node|\n      >\n        {{yield node}}\n      </XTreeBranch>\n    {{/if}}\n  {{else}}\n    <XTreeNode\n      @model={{@model}}\n      @checkable={{@checkable}}\n      @recursiveCheck={{@recursiveCheck}}\n      @updateCheckbox={{this.updateCheckbox}}\n      @chosenId={{@chosenId}}\n      @onCheck={{@onCheck}}\n      @onContextMenu={{@onContextMenu}}\n      @onSelect={{@onSelect}}\n      @onHover={{@onHover}}\n      @onHoverOut={{@onHoverOut}}\n      @expandedIcon={{@expandedIcon}}\n      @collapsedIcon={{@collapsedIcon}}\n    />\n    {{#if @model.isExpanded}}\n      <XTreeBranch\n        @model={{@model.children}}\n        @checkable={{@checkable}}\n        @recursiveCheck={{@recursiveCheck}}\n        @updateCheckbox={{this.updateCheckbox}}\n        @chosenId={{@chosenId}}\n        @onCheck={{@onCheck}}\n        @onContextMenu={{@onContextMenu}}\n        @onSelect={{@onSelect}}\n        @onHover={{@onHover}}\n        @onHoverOut={{@onHoverOut}}\n        @expandedIcon={{@expandedIcon}}\n        @collapsedIcon={{@collapsedIcon}}\n      />\n    {{/if}}\n  {{/if}}\n</li>");

class TreeChildrenComponent extends Component {
  updateCheckbox() {
    if (this.args.recursiveCheck) {
      let {
        children
      } = this.args.model;
      if (children.length) {
        let isChecked = false;
        let isIndeterminate = false;
        if (children.every(x => x.isChecked)) {
          isChecked = true;
        } else if (children.some(x => x.isChecked || x.isIndeterminate)) {
          isIndeterminate = true;
        }
        setProperties(this.args.model, {
          isChecked,
          isIndeterminate
        });
      }
      if (this.args.updateCheckbox) {
        this.args.updateCheckbox();
      }
    }
  }
  static {
    n(this.prototype, "updateCheckbox", [action]);
  }
}
setComponentTemplate(TEMPLATE, TreeChildrenComponent);

export { TreeChildrenComponent as default };
//# sourceMappingURL=x-tree-children.js.map
