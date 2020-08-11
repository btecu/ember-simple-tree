import Component from '@ember/component';
import layout from '../templates/components/x-tree-children';
import { later, run } from '@ember/runloop';
import { setProperties } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['tree-node'],

  renderChildren: true, // private
  lazyRenderChildren: false,
  lazyRenderChildrenTimeout: 500,

  init() {
    this._super(...arguments);
    if(this.lazyRenderChildren && this.model.nodeDepth > 0) {
      this.toggleProperty('renderChildren');
    }
  },

  didInsertElement() {
    this._super(...arguments);
    if(!this.renderChildren) {
      run('afterRender', () => {
        later(this, 'toggleRenderChildren', this.lazyRenderChildrenTimeout);
      });
    }
  },

  toggleRenderChildren() {
    if (this.isDestroying || this.isDestroyed) {
      return;
    }
    this.toggleProperty('renderChildren');
  },

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
