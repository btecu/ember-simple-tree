import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<span class=\"tree-toggle\">\n  <span role=\"button\" class=\"toggle-icon\" {{on \"click\" @toggleExpand}}>\n    {{#if @model.children.length}}\n      {{#if @model.isExpanded}}\n        {{component @expandedIcon}}\n      {{else}}\n        {{component @collapsedIcon}}\n      {{/if}}\n    {{else}}\n      &nbsp;\n    {{/if}}\n  </span>\n</span>");

var treeToggle = setComponentTemplate(TEMPLATE, templateOnly());

export { treeToggle as default };
//# sourceMappingURL=tree-toggle.js.map
