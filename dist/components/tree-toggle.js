import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<span class=\"tree-toggle\">\n  <span role=\"button\" class=\"toggle-icon\" {{on \"click\" @toggleExpand}}>\n    {{#if @model.children.length}}\n      {{#if @model.isExpanded}}\n        {{#if (has-block \"expandedIcon\")}}\n          {{yield to=\"expandedIcon\"}}\n        {{else}}\n          &#x25BC;\n        {{/if}}\n      {{else}}\n        {{#if (has-block \"collapsedIcon\")}}\n          {{yield to=\"collapsedIcon\"}}\n        {{else}}\n          &#x25B6;\n        {{/if}}\n      {{/if}}\n    {{else}}\n      &nbsp;\n    {{/if}}\n  </span>\n</span>\n");

var TreeToggle = setComponentTemplate(TEMPLATE, templateOnly());

export { TreeToggle as default };
//# sourceMappingURL=tree-toggle.js.map
