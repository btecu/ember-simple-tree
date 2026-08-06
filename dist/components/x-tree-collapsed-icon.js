import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("&#x25B6;");

var xTreeCollapsedIcon = setComponentTemplate(TEMPLATE, templateOnly());

export { xTreeCollapsedIcon as default };
//# sourceMappingURL=x-tree-collapsed-icon.js.map
