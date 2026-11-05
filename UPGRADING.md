# Upgrading

## from 0.9.x to 0.10.0

The `@expandedIcon` and `@collapsedIcon` arguments have been removed. Use named
blocks on `XTree` instead:

```
<XTree @model={{this.tree}}>
  <:expandedIcon><MyExpandedIcon /></:expandedIcon>
  <:collapsedIcon><MyCollapsedIcon /></:collapsedIcon>
</XTree>
```

When using the block form of `XTree`, `node.toggle` and `node.checkbox` are no
longer curried components. Use `node.Toggle` and `node.Checkbox` with explicit
arguments instead:

```
<XTree @checkable={{true}} @model={{this.tree}} as |node|>
  <node.Toggle @model={{node.model}} @toggleExpand={{node.toggleExpand}} />
  <node.Checkbox @model={{node.model}} @toggleCheck={{node.toggleCheck}} />
  <span class="tree-label">{{node.model.name}}</span>
</XTree>
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
