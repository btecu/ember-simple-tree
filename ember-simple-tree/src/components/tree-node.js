import Component from '@glimmer/component';
import { action, set, setProperties } from '@ember/object';
import TreeCheckbox from './tree-checkbox.js';
import TreeToggle from './tree-toggle.js';

export default class TreeNodeComponent extends Component {
  Checkbox = TreeCheckbox;
  Toggle = TreeToggle;

  get isChosen() {
    return this.args.model.id === this.args.chosenId;
  }

  @action
  click() {
    if (this.args.onSelect && !this.args.model.isDisabled) {
      let wasChecked = this.args.model.isChecked;

      this.args.onSelect(this.args.model);

      let { isChecked } = this.args.model;

      if (isChecked !== wasChecked && this.args.recursiveCheck) {
        this.setChildCheckboxesRecursively(this.args.model, isChecked);
        this.args.updateCheckbox();
      }
    }
  }

  @action
  contextMenu(event) {
    if (this.args.onContextMenu) {
      event.preventDefault();
      this.args.onContextMenu(this.args.model);
    }
  }

  @action
  mouseEnter() {
    if (!this.args.model.isDisabled) {
      set(this.args.model, 'isSelected', true);
    }

    if (this.args.onHover) {
      this.args.onHover(this.args.model);
    }
  }

  @action
  mouseLeave() {
    set(this.args.model, 'isSelected', false);

    if (this.args.onHoverOut) {
      this.args.onHoverOut(this.args.model);
    }
  }

  @action
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

  @action
  toggleExpand(event) {
    event.stopPropagation();
    set(this.args.model, 'isExpanded', !this.args.model.isExpanded);
  }

  setChildCheckboxesRecursively(node, isChecked) {
    if (node.children.length) {
      for (let child of node.children) {
        setProperties(child, {
          isChecked,
          isIndeterminate: false,
        });

        this.setChildCheckboxesRecursively(child, isChecked);
      }
    }
  }
}
