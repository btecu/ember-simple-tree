/* eslint-disable ember/no-get */
import Component from '@ember/component';
import { computed, get, set, setProperties } from '@ember/object';
import layout from '../templates/components/x-tree-node';

export default Component.extend({
  layout,
  classNameBindings: [
    'model.isDisabled:tree-disabled',
    'model.isSelected:tree-highlight',
    'isChosen:tree-chosen',
    'model.children.length:tree-children'
  ],

  recursiveCheck: false,

  isChosen: computed('model.id', 'chosenId', function() {
    return get(this, 'model.id') === this.chosenId;
  }),

  click() {
    if (this.onSelect && !get(this, 'model.isDisabled')) {
      let wasChecked = get(this, 'model.isChecked');

      this.onSelect(this.model);

      let isChecked = get(this, 'model.isChecked');
      if (isChecked !== wasChecked && this.recursiveCheck) {
        this.setChildCheckboxesRecursively(this.model, isChecked);
        this.updateCheckbox();
      }
    }
  },

  contextMenu(event) {
    if (this.onContextMenu) {
      event.preventDefault();
      this.onContextMenu(this, event);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this._handleMouseEnter = this.handleMouseEnter.bind(this);
    this._handleMouseLeave = this.handleMouseLeave.bind(this);
    this.element.addEventListener('mouseenter', this._handleMouseEnter);
    this.element.addEventListener('mouseleave', this._handleMouseLeave);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.element.removeEventListener('mouseenter', this._handleMouseEnter);
    this.element.removeEventListener('mouseleave', this._handleMouseLeave);
  },

  handleMouseEnter() {
    if (!get(this, 'model.isDisabled')) {
      set(this, 'model.isSelected', true);
    }


    if (this.onHover) {
      this.onHover(this.model);
    }
  },

  handleMouseLeave() {
    set(this, 'model.isSelected', false);

    if (this.onHoverOut) {
      this.onHoverOut(this.model);
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
      if (!get(this, 'model.isDisabled')) {
        let isChecked = this.toggleProperty('model.isChecked');

        if (this.recursiveCheck) {
          this.setChildCheckboxesRecursively(this.model, isChecked);
          this.updateCheckbox();
        }

        if (this.onCheck) {
          this.onCheck(this.model);
        }
      }
    },

    toggleExpand() {
      this.toggleProperty('model.isExpanded');
    }
  }
});
