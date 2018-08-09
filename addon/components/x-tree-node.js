import Component from '@ember/component';
import { computed, observer }  from '@ember/object';
import layout from '../templates/components/x-tree-node';

export default Component.extend({
  layout,
  classNameBindings: ['model.isSelected:tree-highlight', 'isChosen:tree-chosen'],

  isChosen: computed('model.id', 'chosenId', function() {
    return this.get('model.id') === this.get('chosenId');
  }),

  syncCheckbox: false,

  __childrenCheckboxObserver: observer('model.children.@each.isChecked', function() {
    if (this.get('syncCheckbox')) {
      const children = this.get('model.children');
      const allChildrenAreChecked = children.every(this._isChecked);
      const someChildrenAreChecked = children.some(this._isChecked);
      if (someChildrenAreChecked && !allChildrenAreChecked) {
        this.set('model.isChecked', true);
        this.set('model.isIndeterminate', true);
      } else if (someChildrenAreChecked) {
        this.set('model.isChecked', true);
        this.set('model.isIndeterminate', false);
      } else {
        this.set('model.isChecked', false);
        this.set('model.isIndeterminate', false);
      }
    }
  }),

  _isChecked(node) {
    return node.isChecked;
  },

  click() {
    let select = this.get('select');
    if (select) {
      select(this.get('model'));
    }
  },

  mouseEnter() {
    this.set('model.isSelected', true);
    let hover = this.get('hover');
    if (hover) {
      hover(this.get('model'));
    }
  },
  mouseLeave() {
    this.set('model.isSelected', false);
    let hoverOut = this.get('hoverOut');
    if (hoverOut) {
      hoverOut(this.get('model'));
    }
  },

  setChildCheckboxesRecursively(parentNode, checkValue) {
    const children = parentNode.children;
    if (children.length) {
      children.setEach('isChecked', checkValue);
      children.forEach((child) => {
        this.setChildCheckboxesRecursively(child, checkValue);
      });
    }
  },

  actions: {
    toggleCheck(event) {
      event.stopPropagation();
      this.toggleProperty('model.isChecked');
      if (this.get('syncCheckbox')) {
        const checkValue = this.get('model.isChecked');
        this.setChildCheckboxesRecursively(this.get('model'), checkValue);
      }
    },
    toggleExpand() {
      this.toggleProperty('model.isExpanded');
    }
  }
});
