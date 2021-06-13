import Controller from '@ember/controller';
import { buildTree } from 'ember-simple-tree/utils/tree';

export default class ApplicationController extends Controller {
  get tree() {
    return buildTree(this.args.model);
  }
}
