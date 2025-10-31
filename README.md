# ember-simple-tree

Lightweight, composable tree component for Ember without any dependency.

## Compatibility

- Ember.js v4.12 or above
- Ember CLI v4.12 or above
- Node.js v18 or above

## Installation

```bash
ember install ember-simple-tree
```

## Usage

Basic example:

```handlebars
<XTree @model={{this.tree}} />
```

Standard example:

```handlebars
<XTree @model={{this.tree}} as |node|>
  {{node.toggle}}
  {{node.checkbox}}
  {{node.model.name}}
</XTree>
```

### Available actions

#### onCheck

Returns: `node`

Fired when a checkbox state changes.

```handlebars
<XTree @model={{this.tree}} @onCheck={{this.onCheck}} />
```

#### onContextMenu

Returns: `node`

Fired on contextMenu event.

```handlebars
<XTree @model={{this.tree}} @onContextMenu={{this.onContextMenu}} />
```

#### onHover

Returns: `node`

Fired when a mouse enters the node.

```handlebars
<XTree @model={{this.tree}} @onHover={{this.onHover}} />
```

#### onHoverOut

Returns: `node`

Fired when a mouse leaves the node.

```handlebars
<XTree @model={{this.tree}} @onHoverOut={{this.onHoverOut}} />
```

#### onSelect

Returns: `node`

Fired when a node is selected.

```handlebars
<XTree @model={{this.tree}} @onSelect={{this.onSelect}} />
```

### Available options

#### checkable

Default: `false`

Accepts: `boolean`

```handlebars
<XTree @checkable={{true}} @model={{this.tree}} />
```

Displays a checkbox for each node.
Use in conjunction with `model.isChecked`.

#### chosenId

Default: `undefined`

Accepts: `id`

```handlebars
<XTree @chosenId={{this.someId}} @model={{this.tree}} />
```

Applies 'chosen' styling (`font-weight: bold;`) to the specified node.
A tree will also auto-expand to a the chosen node if a valid `chosenId` is provided.
`chosenId` should relate to a node's `model.id`.

#### expandDepth

Default: `0`

Accepts: `number`

```handlebars
<XTree @expandDepth={{-1}} @model={{this.tree}} />
```

Expands the tree to a given depth.
`0` will not expand the tree at all, a negative number will fully expand a tree, a positive number will expand a tree to the given depth.

#### recursiveCheck

Default: `false`

Accepts: `boolean`

```handlebars
<XTree @checkable={{true}} @model={{this.tree}} @recursiveCheck={{true}} />
```

When enabled, checking a box will also check children's boxes as well. Also enables indeterminate state for checkboxes.
Has no effect if `checkable` is not enabled.

#### expandedIcon

Default: `x-tree-expanded-icon`,

Accepts: `string` or `Component`

```handlebars
<XTree @expandedIcon={{component "my-expanded-icon-component"}} @model={{this.tree}} />
```
or
```handlebars
<XTree @expandedIcon="my-expanded-icon-component" @model={{this.tree}} />
```

Component to use for expanded icon

#### collapsedIcon

Default: `x-tree-collapsed-icon`,

Accepts: `string`

```handlebars
<XTree @collapsedIcon={{component "my-collapsed-icon-component"}} @model={{this.tree}} />
```
or
```handlebars
<XTree @collapsedIcon="my-collapsed-icon-component" @model={{this.tree}} />
```

Component to use for collapsed icon

### Blocks

You may optionally pass a block to the `XTree` component to render each node area with custom HTML.

```handlebars
<XTree
  @checkable={{this.isCheckable}}
  @chosenId={{this.selectedNode}}
  @expandDepth={{2}}
  @model={{this.model}}
  @onSelect={{this.selectNode}}
  as |node|
>
  <i class="fa text-muted {{if node.isExpanded 'fa-folder-open' 'fa-folder'}}">&zwnj;</i>
  {{node.model.name}}
</XTree>
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

## License

This project is licensed under the [MIT License](LICENSE.md).
