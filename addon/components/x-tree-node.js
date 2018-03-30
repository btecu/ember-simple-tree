import Component from '@ember/component';
import { computed }  from '@ember/object';
import layout from '../templates/components/x-tree-node';

export default Component.extend({
  layout,
  classNameBindings: ['model.isSelected:tree-highlight', 'isChosen:tree-chosen'],

  isChosen: computed('model.id', 'chosenId', function() {
    let chosenId = this.get('chosenId');
    return chosenId ? this.get('model.id') === chosenId : false;
  }),

  click() {
    this.attrs.select(this.get('model'));
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
