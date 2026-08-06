import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("&#x25BC;");

var xTreeExpandedIcon = setComponentTemplate(TEMPLATE, templateOnly());

export { xTreeExpandedIcon as default };
//# sourceMappingURL=x-tree-expanded-icon.js.map
