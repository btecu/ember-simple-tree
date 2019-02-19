# ember-light-tree

Lightweight, composable tree component for Ember without any dependency.

This is based on ember-simple-tree with non-compatible changes to enable
customizeability and the ability to compose and substitute your own
components.


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.16 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```bash
ember install ember-light-tree
```


## Usage

Basic example:

```handlebars
{{light-tree model=tree}}
```


### Available actions

#### onCheck

Returns: `node`

Fired when a checkbox state changes.

```handlebars
{{light-tree model=tree onCheck=(action 'onCheck')}}
```

#### onHover

Returns: `node`

Fired when a mouse enters the node.

```handlebars
{{light-tree model=tree onHover=(action 'onHover')}}
```

#### onHoverOut

Returns: `node`

Fired when a mouse leaves the node.

```handlebars
{{light-tree model=tree onHoverOut=(action 'onHoverOut')}}
```

#### onSelect

Returns: `node`

Fired when a node is selected.

```handlebars
{{light-tree model=tree onSelect=(action 'onSelect')}}
```

### Available options

#### checkable

Default: `false`

Accepts: `boolean`

```handlebars
{{light-tree model=tree checkable=true}}
```

Displays a checkbox for each node.
Use in conjunction with `model.isChecked`.

#### chosenId

Default: `undefined`

Accepts: `id`

```handlebars
{{light-tree model=tree chosenId=someId}}
```

Applies 'chosen' styling (`font-weight: bold;`) to the specified node.
A tree will also auto-expand to a the chosen node if a valid `chosenId` is provided.
`chosenId` should relate to a node's `model.id`.

#### expandDepth

Default: `0`

Accepts: `number`

```handlebars
{{light-tree model=tree expandDepth=-1}}
```

Expands the tree to a given depth.
`0` will not expand the tree at all, a negative number will fully expand a tree, a positive number will expand a tree to the given depth.

#### recursiveCheck

Default: `false`

Accepts: `boolean`

```handlebars
{{light-tree model=tree checkable=true recursiveCheck=true}}
```

When enabled, checking a box will also check children's boxes as well. Also enables indeterminate state for checkboxes.
Has no effect if `checkable` is not enabled.

#### expandedIcon

Default: `light-tree-expanded-icon`,

Accepts: `string` or `Component`

```handlebars
{{light-tree model=tree expandedIcon=(component "my-expanded-icon-component")}}
```
or
```handlebars
{{light-tree model=tree expandedIcon="my-expanded-icon-component"}}
```

Component to use for expanded icon

#### collapsedIcon

Default: `light-tree-collapsed-icon`,

Accepts: `string`

```handlebars
{{light-tree model=tree collapsedIcon=(component "my-collapsed-icon-component")}}
```
or
```handlebars
{{light-tree model=tree collapsedIcon="my-collapsed-icon-component"}}
```

Component to use for collapsed icon

### Blocks

You may optionally pass a block to the `light-tree` component to render each node area with custom HTML.
The node area is the area directly to the right of each arrow (and possibly checkbox) in the tree.
The Node yields back the model for each area so that you can use attributes dynamically.

```handlebars
{{#light-tree
  chosenId=selectedNode
  checkable=isCheckable
  expandDepth=2
  onSelect=(action 'selectNode')
  model=model as |node|}}
    <i class="fa text-muted {{if node.isExpanded 'fa-folder-open' 'fa-folder'}}">&zwnj;</i>
    {{node.name}}
{{/light-tree}}
```


### Model structure
The component uses recursion to display the tree.
The model requires specific properties to properly function:
 - `id` - unique identifier
 - `name` - `string` used to display a node
 - `children` - `array` of other nodes
 - `isChecked` - `boolean` used for checkbox state
 - `isExpanded` - `boolean` used to expand a node (children)
 - `isIndeterminate` - `boolean` used for checkbox "indeterminate" state
 - `isSelected` - `boolean` optionally used for hover state
 - `isVisible` - `boolean` used to display or hide a node

```js
[{
  id: 0,
  name: 'Root',
  isExpanded: true,
  isSelected: false,
  isVisible: true,
  children: [
    {
      id: 1,
      name: 'First Child',
      isExpanded: true,
      isSelected: false,
      isVisible: true,
      children: []
    },
    {
      id: 2,
      name: 'Second Child',
      isExpanded: true,
      isSelected: false,
      isVisible: true,
      children: [
        {
          id: 3,
          name: 'First Grand Child',
          isExpanded: true,
          isSelected: true,
          isVisible: true,
          children: []
        }
      ]
    }
  ]
}]
```

A utility class is provided to convert a flat structure into a tree structure and vice-versa.
