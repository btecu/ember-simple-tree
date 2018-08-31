import Component from '@ember/component';
import layout from '../templates/components/x-tree-children';

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['tree-node'],

  actions: {
    updateCheckbox() {
      if (this.get('recursiveCheck')) {
        let model = this.get('model');
        let children = model.get('children');

        if (children.length) {
          if (children.every(x => x.isChecked)) {
            model.setProperties({
              isChecked: true,
              isIndeterminate: false
            });
          } else if (children.some(x => x.isChecked || x.isIndeterminate)) {
            model.setProperties({
              isChecked: false,
              isIndeterminate: true
            });
          } else {
            model.setProperties({
              isChecked: false,
              isIndeterminate: false
            });
          }
        }

        this.sendAction('updateCheckbox');
      }
    }
  }
});
