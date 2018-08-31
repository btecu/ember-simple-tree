import Component from '@ember/component';
import { computed }  from '@ember/object';
import layout from '../templates/components/x-tree-node';

export default Component.extend({
  layout,
  classNameBindings: ['model.isSelected:tree-highlight', 'isChosen:tree-chosen'],

  isChosen: computed('model.id', 'chosenId', function() {
    return this.get('model.id') === this.get('chosenId');
  }),

  recursiveCheck: false,

  click() {
    let select = this.get('onSelect');
    if (select) {
      let wasChecked = this.get('model.isChecked');
      select(this.get('model'));
      let isChecked = this.get('model.isChecked');
      if (isChecked !== wasChecked && this.get('recursiveCheck')) {
        this.setChildCheckboxesRecursively(this.get('model'), isChecked);
        this.updateCheckbox();
      }
    }
  },

  mouseEnter() {
    this.set('model.isSelected', true);
    let hover = this.get('onHover');
    if (hover) {
      hover(this.get('model'));
    }
  },

  mouseLeave() {
    this.set('model.isSelected', false);
    let hoverOut = this.get('onHoverOut');
    if (hoverOut) {
      hoverOut(this.get('model'));
    }
  },

  setChildCheckboxesRecursively(node, isChecked) {
    let children = node.get('children');
    if (children.length) {
      children.forEach(child => {
        child.setProperties({
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
      this.toggleProperty('model.isChecked');
      if (this.get('recursiveCheck')) {
        let isChecked = this.get('model.isChecked');
        this.setChildCheckboxesRecursively(this.model, isChecked);
        this.updateCheckbox();
      }

      let check = this.get('onCheck');
      if (check) {
        check(this.get('model'));
      }
    },

    toggleExpand() {
      this.toggleProperty('model.isExpanded');
    }
  }
});
