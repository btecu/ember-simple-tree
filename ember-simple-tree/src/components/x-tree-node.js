import Component from '@glimmer/component';
import { action, set, setProperties } from '@ember/object';

export default class TreeNodeComponent extends Component {
  get classes() {
    let classes = [];
    let { isDisabled, isSelected, id, children } = this.args.model;

    if (isDisabled) {
      classes.push('tree-disabled');
    }

    if (isSelected) {
      classes.push('tree-highlight');
    }

    if (id === this.args.chosenId) {
      classes.push('tree-chosen');
    }

    if (children?.length > 0) {
      classes.push('tree-children');
    }

    return classes.join(' ');
  }

  @action
  click() {
    if (this.args.onSelect && !this.args.model.isDisabled) {
      let wasChecked = this.args.model.isChecked;

      this.args.onSelect(this.args.model);

      let { isChecked } = this.args.model;
      if (isChecked !== wasChecked && this.args.recursiveCheck) {
        this.setChildCheckboxesRecursively(this.args.model, isChecked);
        this.updateCheckbox();
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
      this.args.onHoverOut(this.model);
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
        this.args.onCheck(this.model);
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
