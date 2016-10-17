import Ember from 'ember';
import layout from '../templates/components/x-tree';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['tree-branch']
});
