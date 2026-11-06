import Component from '@glimmer/component';
import { action, set, setProperties } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class={{concat\n    (if @model.isDisabled \"tree-disabled \")\n    (if @model.isSelected \"tree-highlight \")\n    (if this.isChosen \"tree-chosen \")\n    (if @model.children.length \"tree-children\")\n  }}\n  role=\"button\"\n  {{on \"click\" this.click}}\n  {{on \"contextmenu\" this.contextMenu}}\n  {{on \"mouseenter\" this.mouseEnter}}\n  {{on \"mouseleave\" this.mouseLeave}}\n>\n  {{#if (has-block)}}\n    {{yield\n      (hash\n        model=@model\n        toggle=(component\n          \"tree-toggle\"\n          model=@model\n          toggleExpand=this.toggleExpand\n          expandedIcon=@expandedIcon\n          collapsedIcon=@collapsedIcon\n        )\n        checkbox=(component\n          \"tree-checkbox\" model=@model toggleCheck=this.toggleCheck\n        )\n      )\n    }}\n  {{else}}\n    <TreeToggle\n      role=\"presentation\"\n      @model={{@model}}\n      @toggleExpand={{this.toggleExpand}}\n      @expandedIcon={{@expandedIcon}}\n      @collapsedIcon={{@collapsedIcon}}\n    />\n\n    {{#if @checkable}}\n      <TreeCheckbox\n        role=\"presentation\"\n        @model={{@model}}\n        @toggleCheck={{this.toggleCheck}}\n      />\n    {{/if}}\n    <span class=\"tree-label\">\n      {{@model.name}}\n    </span>\n  {{/if}}\n</div>");

class TreeNodeComponent extends Component {
  get isChosen() {
    return this.args.model.id === this.args.chosenId;
  }
  click() {
    if (this.args.onSelect && !this.args.model.isDisabled) {
      let wasChecked = this.args.model.isChecked;
      this.args.onSelect(this.args.model);
      let {
        isChecked
      } = this.args.model;
      if (isChecked !== wasChecked && this.args.recursiveCheck) {
        this.setChildCheckboxesRecursively(this.args.model, isChecked);
        this.args.updateCheckbox();
      }
    }
  }
  static {
    n(this.prototype, "click", [action]);
  }
  contextMenu(event) {
    if (this.args.onContextMenu) {
      event.preventDefault();
      this.args.onContextMenu(this.args.model);
    }
  }
  static {
    n(this.prototype, "contextMenu", [action]);
  }
  mouseEnter() {
    if (!this.args.model.isDisabled) {
      set(this.args.model, 'isSelected', true);
    }
    if (this.args.onHover) {
      this.args.onHover(this.args.model);
    }
  }
  static {
    n(this.prototype, "mouseEnter", [action]);
  }
  mouseLeave() {
    set(this.args.model, 'isSelected', false);
    if (this.args.onHoverOut) {
      this.args.onHoverOut(this.args.model);
    }
  }
  static {
    n(this.prototype, "mouseLeave", [action]);
  }
  toggleCheck(event) {
    event.stopPropagation();
    if (!this.args.model.isDisabled) {
      let isChecked = set(this.args.model, 'isChecked', !this.args.model.isChecked);
      if (this.args.recursiveCheck) {
        this.setChildCheckboxesRecursively(this.args.model, isChecked);
        this.args.updateCheckbox();
      }
      if (this.args.onCheck) {
        this.args.onCheck(this.args.model);
      }
    }
  }
  static {
    n(this.prototype, "toggleCheck", [action]);
  }
  toggleExpand(event) {
    event.stopPropagation();
    set(this.args.model, 'isExpanded', !this.args.model.isExpanded);
  }
  static {
    n(this.prototype, "toggleExpand", [action]);
  }
  setChildCheckboxesRecursively(node, isChecked) {
    if (node.children.length) {
      for (let child of node.children) {
        setProperties(child, {
          isChecked,
          isIndeterminate: false
        });
        this.setChildCheckboxesRecursively(child, isChecked);
      }
    }
  }
}
setComponentTemplate(TEMPLATE, TreeNodeComponent);

export { TreeNodeComponent as default };
//# sourceMappingURL=tree-node.js.map
