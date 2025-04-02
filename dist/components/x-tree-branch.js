import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<ul class=\"tree-branch\">\n  {{#each @model as |child|}}\n    {{#if child.isVisible}}\n      {{#if (has-block)}}\n        <XTreeChildren\n          @checkable={{@checkable}}\n          @recursiveCheck={{@recursiveCheck}}\n          @updateCheckbox={{@updateCheckbox}}\n          @chosenId={{@chosenId}}\n          @onCheck={{@onCheck}}\n          @onContextMenu={{@onContextMenu}}\n          @onSelect={{@onSelect}}\n          @onHover={{@onHover}}\n          @onHoverOut={{@onHoverOut}}\n          @model={{child}}\n          @expandedIcon={{@expandedIcon}}\n          @collapsedIcon={{@collapsedIcon}}\n          as |node|\n        >\n          {{yield node}}\n        </XTreeChildren>\n      {{else}}\n        <XTreeChildren\n          @model={{child}}\n          @checkable={{@checkable}}\n          @recursiveCheck={{@recursiveCheck}}\n          @updateCheckbox={{@updateCheckbox}}\n          @chosenId={{@chosenId}}\n          @onCheck={{@onCheck}}\n          @onContextMenu={{@onContextMenu}}\n          @onSelect={{@onSelect}}\n          @onHover={{@onHover}}\n          @onHoverOut={{@onHoverOut}}\n          @expandedIcon={{@expandedIcon}}\n          @collapsedIcon={{@collapsedIcon}}\n        />\n      {{/if}}\n    {{/if}}\n  {{/each}}\n</ul>");

var xTreeBranch = setComponentTemplate(TEMPLATE, templateOnly());

export { xTreeBranch as default };
//# sourceMappingURL=x-tree-branch.js.map
