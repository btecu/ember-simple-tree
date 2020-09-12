# ember-simple-tree

Lightweight, composable tree component for Ember without any dependency.

## Compatibility

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v3.0 or above
* Node.js v8 or above

If you are using 0.5.x and would like to upgrade to 0.6.0, please note there
are BREAKING CHANGES. For details, see [Upgrading](UPGRADING.md).


## Installation

```bash
ember install ember-simple-tree
```


## Usage

Basic example:

```handlebars
{{x-tree model=tree}}
```

Standard example:

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

Ember Octane example:

```handlebars
<XTree @model={{this.content}} as |node|>
  {{node.toggle}}
  {{node.checkbox}}
  {{node.model.name}}
</XTree>
```

### Available actions

#### onCheck

Returns: `node.model`

Fired when a checkbox state changes.

```handlebars
{{x-tree model=tree onCheck=(action 'onCheck')}}
```

#### onContextMenu

Returns: `node`, `event` 

Fired on contextMenu event.

```handlebars
{{x-tree model=tree onContextMenu=(action 'onContextMenu')}}
```

#### onHover

Returns: `node.model`

Fired when a mouse enters the node.

```handlebars
{{x-tree model=tree onHover=(action 'onHover')}}
```

#### onHoverOut

Returns: `node.model`

Fired when a mouse leaves the node.

```handlebars
{{x-tree model=tree onHoverOut=(action 'onHoverOut')}}
```

#### onSelect

Returns: `node.model`

Fired when a node is selected.

```handlebars
{{x-tree model=tree onSelect=(action 'onSelect')}}
```

### Available options

#### checkable

Default: `false`

Accepts: `boolean`

```handlebars
{{x-tree model=tree checkable=true}}
```

Displays a checkbox for each node.
Use in conjunction with `model.isChecked`.

#### chosenId

Default: `undefined`

Accepts: `id`

```handlebars
{{x-tree model=tree chosenId=someId}}
```

Applies 'chosen' styling (`font-weight: bold;`) to the specified node.
A tree will also auto-expand to a the chosen node if a valid `chosenId` is provided.
`chosenId` should relate to a node's `model.id`.

#### expandDepth

Default: `0`

Accepts: `number`

```handlebars
{{x-tree model=tree expandDepth=-1}}
```

Expands the tree to a given depth.
`0` will not expand the tree at all, a negative number will fully expand a tree, a positive number will expand a tree to the given depth.

#### recursiveCheck

Default: `false`

Accepts: `boolean`

```handlebars
{{x-tree model=tree checkable=true recursiveCheck=true}}
```

When enabled, checking a box will also check children's boxes as well. Also enables indeterminate state for checkboxes.
Has no effect if `checkable` is not enabled.

#### expandedIcon

Default: `x-tree-expanded-icon`,

Accepts: `string` or `Component`

```handlebars
{{x-tree model=tree expandedIcon=(component "my-expanded-icon-component")}}
```
or
```handlebars
{{x-tree model=tree expandedIcon="my-expanded-icon-component"}}
```

Component to use for expanded icon

#### collapsedIcon

Default: `x-tree-collapsed-icon`,

Accepts: `string`

```handlebars
{{x-tree model=tree collapsedIcon=(component "my-collapsed-icon-component")}}
```
or
```handlebars
{{x-tree model=tree collapsedIcon="my-collapsed-icon-component"}}
```

Component to use for collapsed icon

### Blocks

You may optionally pass a block to the `x-tree` component to render each node area with custom HTML.

```handlebars
{{#x-tree
  chosenId=selectedNode
  checkable=isCheckable
  expandDepth=2
  onSelect=(action 'selectNode')
  model=model
  as |node|
}}
  <i class="fa text-muted {{if node.isExpanded 'fa-folder-open' 'fa-folder'}}">&zwnj;</i>
  {{node.model.name}}
{{/x-tree}}
```


### Model structure
The component uses recursion to display the tree.
The model requires specific properties to properly function:
 - `id` - unique identifier
 - `name` - `string` used to display a node
 - `children` - `array` of other nodes
 - `isChecked` - `boolean` used for checkbox state
 - `isDisabled` - `boolean` used to disable actions on a node (onSelect/onCheck)
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
