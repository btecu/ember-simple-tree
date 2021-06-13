import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNames: ['tree-checkbox'],

  actions: {
    // IE requires a change action to be set or it will
    // attempt to mutate the checked attribute
    noop() { }
  }
});
