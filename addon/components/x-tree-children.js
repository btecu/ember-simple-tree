import Component from '@ember/component';
import layout from '../templates/components/x-tree-children';

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['tree-node']
});
