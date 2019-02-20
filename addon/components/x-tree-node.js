import Component from '@ember/component';
import { computed, get, setProperties }  from '@ember/object';
import layout from '../templates/components/x-tree-node';

export default Component.extend({
  layout,
  classNameBindings: [
    'model.isSelected:x-tree-highlight',
    'isChosen:x-tree-chosen',
    'model.children.length:x-tree-children'
  ],

  recursiveCheck: false,

  isChosen: computed('model.id', 'chosenId', function() {
    return this.get('model.id') === this.get('chosenId');
  }),

  click() {
    let select = this.get('onSelect');
    if (select) {
      let model = this.get('model');
      let wasChecked = model.get('isChecked');

      select(model);

      let isChecked = model.get('isChecked');
      if (isChecked !== wasChecked && this.get('recursiveCheck')) {
        this.setChildCheckboxesRecursively(model, isChecked);
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
  },

  actions: {
    toggleCheck(event) {
      event.stopPropagation();

      let isChecked = this.toggleProperty('model.isChecked');
      let model = this.get('model');

      if (this.get('recursiveCheck')) {
        this.setChildCheckboxesRecursively(model, isChecked);
        this.updateCheckbox();
      }

      let check = this.get('onCheck');
      if (check) {
        check(model);
      }
    },

    toggleExpand() {
      this.toggleProperty('model.isExpanded');
    }
  }
});
