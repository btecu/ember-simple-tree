import Component from '@ember/component';
import layout from '../templates/components/x-tree-checkbox';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['tree-checkbox'],

  actions: {
    // IE requires a change action to be set or it will
    // attempt to mutate the checked attribute
    noop() { }
  }
});
