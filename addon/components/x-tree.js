import Component from '@ember/component';
import { computed }  from '@ember/object';
import { isEmpty }  from '@ember/utils';
import layout from '../templates/components/x-tree';

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['tree-branch']
});
