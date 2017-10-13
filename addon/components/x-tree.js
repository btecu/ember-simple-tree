import Component from '@ember/component';
import layout from '../templates/components/x-tree';

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['tree-branch']
});
