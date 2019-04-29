import Component from '@ember/component';
import { computed, set, setProperties }  from '@ember/object';
import layout from '../templates/components/x-tree-node';

export default Component.extend({
  layout,
  classNameBindings: [
    'model.isSelected:tree-highlight',
    'isChosen:tree-chosen',
    'model.children.length:tree-children'
  ],

  recursiveCheck: false,

  isChosen: computed('model.id', 'chosenId', function() {
    return this.model.id === this.chosenId;
  }),

  click() {
    let select = this.onSelect;
    if (select) {
      let model = this.model;
      let wasChecked = model.isChecked;

      select(model);

      let isChecked = model.isChecked;
      if (isChecked !== wasChecked && this.recursiveCheck) {
        this.setChildCheckboxesRecursively(model, isChecked);
        this.updateCheckbox();
      }
    }
  },

  mouseEnter() {
    set(this, 'model.isSelected', true);

    let hover = this.onHover;
    if (hover) {
      hover(this.model);
    }
  },

  mouseLeave() {
    set(this, 'model.isSelected', false);

    let hoverOut = this.onHoverOut;
    if (hoverOut) {
      hoverOut(this.model);
    }
  },

  setChildCheckboxesRecursively(node, isChecked) {
    let children = node.children;
    if (children.length) {
      children.forEach(child => {
        setProperties(child, {
          isChecked,
          isIndeterminate: false
        });

        this.setChildCheckboxesRecursively(child, isChecked);
      });
    }
  },

  actions: {
    toggleCheck(event) {
      event.stopPropagation();

      let isChecked = this.toggleProperty('model.isChecked');
      let model = this.model;

      if (this.recursiveCheck) {
        this.setChildCheckboxesRecursively(model, isChecked);
        this.updateCheckbox();
      }

      let check = this.onCheck;
      if (check) {
        check(model);
      }
    },

    toggleExpand() {
      this.toggleProperty('model.isExpanded');
    }
  }
});
