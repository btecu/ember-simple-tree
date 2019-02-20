# Upgrading

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
