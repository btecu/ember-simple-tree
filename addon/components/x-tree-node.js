import Component from '@ember/component';
import { computed }  from '@ember/object';
import layout from '../templates/components/x-tree-node';

export default Component.extend({
  layout,
  classNameBindings: ['model.isSelected:tree-highlight', 'isChosen:tree-chosen'],

  isChosen: computed('model.id', 'chosenId', function() {
    return this.get('model.id') === this.get('chosenId');
  }),

  click() {
    let select = this.get('onSelect');
    if (select) {
      select(this.get('model'));
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

  actions: {
    toggleCheck(event) {
      event.stopPropagation();
      this.toggleProperty('model.isChecked');

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
