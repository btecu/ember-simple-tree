import Component from '@ember/component';
import layout from '../templates/components/x-tree-branch';

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['x-tree-branch']
});
