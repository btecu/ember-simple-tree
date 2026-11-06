import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("&#x25BC;");

var treeExpandedIcon = setComponentTemplate(TEMPLATE, templateOnly());

export { treeExpandedIcon as default };
//# sourceMappingURL=tree-expanded-icon.js.map
