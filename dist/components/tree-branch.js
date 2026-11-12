import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<ul class=\"tree-branch\">\n  {{#each @model as |child|}}\n    {{#if child.isVisible}}\n      {{#if (has-block)}}\n        <TreeChildren\n          @checkable={{@checkable}}\n          @recursiveCheck={{@recursiveCheck}}\n          @updateCheckbox={{@updateCheckbox}}\n          @chosenId={{@chosenId}}\n          @onCheck={{@onCheck}}\n          @onContextMenu={{@onContextMenu}}\n          @onSelect={{@onSelect}}\n          @onHover={{@onHover}}\n          @onHoverOut={{@onHoverOut}}\n          @model={{child}}\n        >\n          <:expandedIcon>{{yield to=\"expandedIcon\"}}</:expandedIcon>\n          <:collapsedIcon>{{yield to=\"collapsedIcon\"}}</:collapsedIcon>\n          <:default as |node|>{{yield node}}</:default>\n        </TreeChildren>\n      {{else}}\n        <TreeChildren\n          @model={{child}}\n          @checkable={{@checkable}}\n          @recursiveCheck={{@recursiveCheck}}\n          @updateCheckbox={{@updateCheckbox}}\n          @chosenId={{@chosenId}}\n          @onCheck={{@onCheck}}\n          @onContextMenu={{@onContextMenu}}\n          @onSelect={{@onSelect}}\n          @onHover={{@onHover}}\n          @onHoverOut={{@onHoverOut}}\n        >\n          <:expandedIcon>{{yield to=\"expandedIcon\"}}</:expandedIcon>\n          <:collapsedIcon>{{yield to=\"collapsedIcon\"}}</:collapsedIcon>\n        </TreeChildren>\n      {{/if}}\n    {{/if}}\n  {{/each}}\n</ul>\n");

var treeBranch = setComponentTemplate(TEMPLATE, templateOnly());

export { treeBranch as default };
//# sourceMappingURL=tree-branch.js.map
