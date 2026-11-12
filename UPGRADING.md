# Upgrading

## from 0.9.x to 0.10.0

### Breaking changes

**Requirements:** Ember.js v6.8, Ember CLI v6.8 and Node.js v22 or above are required.

**Renamed components:** `XTree` is now `Tree`, and the other components lost their
`x-` prefix too: `XTreeBranch`, `XTreeChildren`, `XTreeNode`, `XTreeToggle` and
`XTreeCheckbox` are now `TreeBranch`, `TreeChildren`, `TreeNode`, `TreeToggle` and
`TreeCheckbox`. Update your templates. If your app already has a component with one
of these names, yours will take precedence:

```handlebars
{{! Before }}
<XTree @model={{this.tree}} />

{{! After }}
<Tree @model={{this.tree}} />
```

**Styles:** the styles are shipped with the component again. If you copied them
into your app you can remove them, otherwise make sure yours still take effect.

**Icon arguments removed:** `@expandedIcon` and `@collapsedIcon` have been removed.
Use named blocks on `Tree` instead:

```handlebars
{{! Before }}
<Tree @expandedIcon="my-expanded-icon" @collapsedIcon="my-collapsed-icon" @model={{this.tree}} />

{{! After }}
<Tree @model={{this.tree}}>
  <:expandedIcon><MyExpandedIcon /></:expandedIcon>
  <:collapsedIcon><MyCollapsedIcon /></:collapsedIcon>
</Tree>
```

**Icon components removed:** `tree-expanded-icon` and `tree-collapsed-icon`
(formerly `x-tree-expanded-icon` and `x-tree-collapsed-icon`) no longer exist.
The default icons (▼ and ▶) are now rendered inline.
If you rendered or extended these components yourself, replace them with your own component or markup.

**Yielded `node.toggle` and `node.checkbox` renamed:** in the block form
of `Tree`, they are now `node.Toggle` and `node.Checkbox`, rendered with angle brackets.
Custom icons go on `node.Toggle`, since the icon blocks on `Tree` only apply when it renders the toggle itself:

```handlebars
{{! Before }}
<Tree @expandedIcon="my-expanded-icon" @checkable={{true}} @model={{this.tree}} as |node|>
  {{node.toggle}}
  {{node.checkbox}}
  <span class="tree-label">{{node.model.name}}</span>
</Tree>

{{! After }}
<Tree @checkable={{true}} @model={{this.tree}} as |node|>
  <node.Toggle>
    <:expandedIcon><MyExpandedIcon /></:expandedIcon>
  </node.Toggle>
  <node.Checkbox />
  <span class="tree-label">{{node.model.name}}</span>
</Tree>
```

### Fixes

## from 0.5.x to 0.6.0

If you are using the block form of the `{{x-tree}}` component,
the expand/collapse toggle and the checkbox are no longer
included in the custom HTML. Furthermore, the value yielded
is no longer the model for the node, but an object containing
the model and the components that are included.

To upgrade, convert:

```handlebars
{{#x-tree
  model=tree
  checkable=true
  as |node|
}}
  {{node.name}}
{{/x-tree}}
```

to

```handlebars
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
