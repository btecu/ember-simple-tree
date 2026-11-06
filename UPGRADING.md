# Upgrading

## from 0.9.x to 0.10.0

**Requirements:** Ember.js v6.8 and Node.js v22 or above are required.

**Styles:** the styles are shipped with the component again. If you copied them
into your app you can remove them, otherwise make sure yours still take effect.

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
