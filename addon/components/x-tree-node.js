import Component from '@ember/component';
import layout from '../templates/components/x-tree-node';

export default Component.extend({
  layout,
  classNameBindings: ['model.isSelected:tree-highlight'],

  click() {
    this.attrs.select(this.get('model'));
  },

  mouseEnter() {
    let { hover } = this.attrs;
    if (hover) {
      hover(this.get('model'));
    }
  },

  actions: {
    toggleCheck() {
      this.toggleProperty('model.isChecked');
    },

    toggleExpand() {
      this.toggleProperty('model.isExpanded');
    }
  }
});
