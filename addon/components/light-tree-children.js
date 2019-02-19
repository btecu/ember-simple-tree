import Component from '@ember/component';
import layout from '../templates/components/light-tree-children';
import { get, setProperties } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['light-tree-node'],

  actions: {
    updateCheckbox() {
      if (this.get('recursiveCheck')) {
        let model = this.get('model');
        let children = get(model, 'children');

        if (children.length) {
          let isChecked = false;
          let isIndeterminate = false;

          if (children.every(x => x.isChecked)) {
            isChecked = true;
          } else if (children.some(x => x.isChecked || x.isIndeterminate)) {
            isIndeterminate = true;
          }

          setProperties(model, { isChecked, isIndeterminate });
        }

        if (this.updateCheckbox) {
          this.updateCheckbox();
        }
      }
    }
  }
});
