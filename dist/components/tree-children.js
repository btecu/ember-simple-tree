import Component from '@glimmer/component';
import { setProperties, action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<li class=\"tree-node\">\n  {{#if (has-block)}}\n    <TreeNode\n      @checkable={{@checkable}}\n      @recursiveCheck={{@recursiveCheck}}\n      @updateCheckbox={{this.updateCheckbox}}\n      @chosenId={{@chosenId}}\n      @onCheck={{@onCheck}}\n      @onContextMenu={{@onContextMenu}}\n      @onSelect={{@onSelect}}\n      @onHover={{@onHover}}\n      @onHoverOut={{@onHoverOut}}\n      @model={{@model}}\n    >\n      <:expandedIcon>{{yield to=\"expandedIcon\"}}</:expandedIcon>\n      <:collapsedIcon>{{yield to=\"collapsedIcon\"}}</:collapsedIcon>\n      <:default as |node|>{{yield node}}</:default>\n    </TreeNode>\n\n    {{#if @model.isExpanded}}\n      <TreeBranch\n        @checkable={{@checkable}}\n        @recursiveCheck={{@recursiveCheck}}\n        @updateCheckbox={{this.updateCheckbox}}\n        @chosenId={{@chosenId}}\n        @onCheck={{@onCheck}}\n        @onContextMenu={{@onContextMenu}}\n        @onSelect={{@onSelect}}\n        @onHover={{@onHover}}\n        @onHoverOut={{@onHoverOut}}\n        @model={{@model.children}}\n      >\n        <:expandedIcon>{{yield to=\"expandedIcon\"}}</:expandedIcon>\n        <:collapsedIcon>{{yield to=\"collapsedIcon\"}}</:collapsedIcon>\n        <:default as |node|>{{yield node}}</:default>\n      </TreeBranch>\n    {{/if}}\n  {{else}}\n    <TreeNode\n      @model={{@model}}\n      @checkable={{@checkable}}\n      @recursiveCheck={{@recursiveCheck}}\n      @updateCheckbox={{this.updateCheckbox}}\n      @chosenId={{@chosenId}}\n      @onCheck={{@onCheck}}\n      @onContextMenu={{@onContextMenu}}\n      @onSelect={{@onSelect}}\n      @onHover={{@onHover}}\n      @onHoverOut={{@onHoverOut}}\n    >\n      <:expandedIcon>{{yield to=\"expandedIcon\"}}</:expandedIcon>\n      <:collapsedIcon>{{yield to=\"collapsedIcon\"}}</:collapsedIcon>\n    </TreeNode>\n    {{#if @model.isExpanded}}\n      <TreeBranch\n        @model={{@model.children}}\n        @checkable={{@checkable}}\n        @recursiveCheck={{@recursiveCheck}}\n        @updateCheckbox={{this.updateCheckbox}}\n        @chosenId={{@chosenId}}\n        @onCheck={{@onCheck}}\n        @onContextMenu={{@onContextMenu}}\n        @onSelect={{@onSelect}}\n        @onHover={{@onHover}}\n        @onHoverOut={{@onHoverOut}}\n      >\n        <:expandedIcon>{{yield to=\"expandedIcon\"}}</:expandedIcon>\n        <:collapsedIcon>{{yield to=\"collapsedIcon\"}}</:collapsedIcon>\n      </TreeBranch>\n    {{/if}}\n  {{/if}}\n</li>\n");

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
//# sourceMappingURL=tree-children.js.map
