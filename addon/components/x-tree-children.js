import Ember from 'ember';
import layout from '../templates/components/x-tree-children';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['tree-node']
});
