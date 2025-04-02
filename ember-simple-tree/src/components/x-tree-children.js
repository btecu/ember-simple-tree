import Component from '@glimmer/component';
import { action, setProperties } from '@ember/object';

export default class TreeChildrenComponent extends Component {
  @action
  updateCheckbox() {
    if (this.args.recursiveCheck) {
      let { children } = this.args.model;

      if (children.length) {
        let isChecked = false;
        let isIndeterminate = false;

        if (children.every((x) => x.isChecked)) {
          isChecked = true;
        } else if (children.some((x) => x.isChecked || x.isIndeterminate)) {
          isIndeterminate = true;
        }

        setProperties(this.args.model, { isChecked, isIndeterminate });
      }

      if (this.args.updateCheckbox) {
        this.args.updateCheckbox();
      }
    }
  }
}
