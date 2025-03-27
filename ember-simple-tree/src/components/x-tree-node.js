import Component from '@glimmer/component';
import { action, get, set, setProperties } from '@ember/object';

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
    if (this.args.onSelect && !get(this.args.model, 'isDisabled')) {
      let wasChecked = get(this.args.model, 'isChecked');

      this.args.onSelect(this.args.model);

      let isChecked = get(this.args.model, 'isChecked');
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
    if (!get(this.args.model, 'isDisabled')) {
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
    if (!get(this.args.model, 'isDisabled')) {
      let isChecked = set(this.args.model, 'isChecked', !get(this.args.model, 'isChecked'));

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
    let children = get(node, 'children');
    if (children.length) {
      children.forEach(child => {
        setProperties(child, {
          isChecked,
          isIndeterminate: false
        });

        this.setChildCheckboxesRecursively(child, isChecked);
      });
    }
  }
}
