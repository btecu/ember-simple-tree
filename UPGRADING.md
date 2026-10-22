# Upgrading

## from 0.9.x to 0.10.0

**Requirements:** Ember.js v6.8 and Node.js v22 or above are required.

**Renamed components:** `XTree` is now `Tree`, and the other components lost their
`x-` prefix too, such as `XTreeNode` becoming `TreeNode`. Update your templates.
If your app already has a component with one of these names, yours will take precedence:

```handlebars
{{! Before }}
<XTree @model={{this.tree}} />

{{! After }}
<Tree @model={{this.tree}} />
```

**Styles:** the styles are shipped with the component again. If you copied them
into your app you can remove them, otherwise make sure yours still take effect.

The `@expandedIcon` and `@collapsedIcon` arguments have been removed. Use named
blocks on `Tree` instead:

```
<Tree @model={{this.tree}}>
  <:expandedIcon><MyExpandedIcon /></:expandedIcon>
  <:collapsedIcon><MyCollapsedIcon /></:collapsedIcon>
</Tree>
```

When using the block form of `Tree`, `node.toggle` and `node.checkbox` are no
longer curried components. Use `node.Toggle` and `node.Checkbox` with explicit
arguments instead:

```
<Tree @checkable={{true}} @model={{this.tree}} as |node|>
  <node.Toggle @model={{node.model}} @toggleExpand={{node.toggleExpand}} />
  <node.Checkbox @model={{node.model}} @toggleCheck={{node.toggleCheck}} />
  <span class="tree-label">{{node.model.name}}</span>
</Tree>
```

## from 0.5.x to 0.6.0

If you are using the block form of the {{x-tree}} component,
the expand/collapse toggle and the checkbox are no longer
included in the custom HTML. Furthermore, the value yielded
is no longer the model for the node, but an object containing
the model and the components that are included.

To upgrade, convert:

```
{{#x-tree
  model=tree
  checkable=true
  as |node|
}}
  {{node.name}}
{{/x-tree}}
```

to

```
{{#x-tree
  model=tree
  checkable=true
  as |node|
}}
  {{node.toggle}}
  {{node.checkbox}}
  {{node.model.name}}
{{/x-tree}}
```
