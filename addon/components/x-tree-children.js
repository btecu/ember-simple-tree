import Component from '@ember/component';
import layout from '../templates/components/x-tree-children';
import { setProperties } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['tree-node'],

  actions: {
    updateCheckbox() {
      if (this.recursiveCheck) {
        let { children } = this.model;

        if (children.length) {
          let isChecked = false;
          let isIndeterminate = false;

          if (children.every(x => x.isChecked)) {
            isChecked = true;
          } else if (children.some(x => x.isChecked || x.isIndeterminate)) {
            isIndeterminate = true;
          }

          setProperties(this.model, { isChecked, isIndeterminate });
        }

        if (this.updateCheckbox) {
          this.updateCheckbox();
        }
      }
    }
  }
});
