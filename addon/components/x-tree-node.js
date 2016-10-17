import Ember from 'ember';
import layout from '../templates/components/x-tree-node';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  classNameBindings: ['model.isSelected:tree-highlight'],

  mouseEnter(event) {
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
