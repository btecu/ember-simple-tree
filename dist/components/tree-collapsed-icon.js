import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("&#x25B6;");

var treeCollapsedIcon = setComponentTemplate(TEMPLATE, templateOnly());

export { treeCollapsedIcon as default };
//# sourceMappingURL=tree-collapsed-icon.js.map
