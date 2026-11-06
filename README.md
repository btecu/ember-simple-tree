# ember-simple-tree

Lightweight, composable tree component for Ember without any dependency.

## Compatibility

- Ember.js v6.8 or above
- Ember CLI v6.8 or above
- Node.js v22 or above

Supported versions follow the active Ember LTS releases.

## Installation

```bash
ember install ember-simple-tree
```

## Usage

The styles are included with the component. All of them use the `tree-*` and `toggle-icon` classes, which you can override in your own CSS.

Basic example:

```handlebars
<Tree @model={{this.tree}} />
```

Standard example:

```handlebars
<Tree @model={{this.tree}} as |node|>
  {{node.toggle}}
  {{node.checkbox}}
  {{node.model.name}}
</Tree>
```

### Available actions

#### onCheck

Returns: `node`

Fired when a checkbox state changes.

```handlebars
<Tree @model={{this.tree}} @onCheck={{this.onCheck}} />
```

#### onContextMenu

Returns: `node`

Fired on contextMenu event.

```handlebars
<Tree @model={{this.tree}} @onContextMenu={{this.onContextMenu}} />
```

#### onHover

Returns: `node`

Fired when a mouse enters the node.

```handlebars
<Tree @model={{this.tree}} @onHover={{this.onHover}} />
```

#### onHoverOut

Returns: `node`

Fired when a mouse leaves the node.

```handlebars
<Tree @model={{this.tree}} @onHoverOut={{this.onHoverOut}} />
```

#### onSelect

Returns: `node`

Fired when a node is selected.

```handlebars
<Tree @model={{this.tree}} @onSelect={{this.onSelect}} />
```

### Available options

#### checkable

Default: `false`

Accepts: `boolean`

```handlebars
<Tree @checkable={{true}} @model={{this.tree}} />
```

Displays a checkbox for each node.
Use in conjunction with `model.isChecked`.

#### chosenId

Default: `undefined`

Accepts: `id`

```handlebars
<Tree @chosenId={{this.someId}} @model={{this.tree}} />
```

Applies 'chosen' styling (`font-weight: bold;`) to the specified node.
A tree will also auto-expand to a the chosen node if a valid `chosenId` is provided.
`chosenId` should relate to a node's `model.id`.

#### expandDepth

Default: `0`

Accepts: `number`

```handlebars
<Tree @expandDepth={{-1}} @model={{this.tree}} />
```

Expands the tree to a given depth.
`0` will not expand the tree at all, a negative number will fully expand a tree, a positive number will expand a tree to the given depth.

#### recursiveCheck

Default: `false`

Accepts: `boolean`

```handlebars
<Tree @checkable={{true}} @model={{this.tree}} @recursiveCheck={{true}} />
```

When enabled, checking a box will also check children's boxes as well. Also enables indeterminate state for checkboxes.
Has no effect if `checkable` is not enabled.

#### expandedIcon

Default: `tree-expanded-icon`,

Accepts: `string` or `Component`

```handlebars
<Tree @expandedIcon={{component "my-expanded-icon-component"}} @model={{this.tree}} />
```
or
```handlebars
<Tree @expandedIcon="my-expanded-icon-component" @model={{this.tree}} />
```

Component to use for expanded icon

#### collapsedIcon

Default: `tree-collapsed-icon`,

Accepts: `string`

```handlebars
<Tree @collapsedIcon={{component "my-collapsed-icon-component"}} @model={{this.tree}} />
```
or
```handlebars
<Tree @collapsedIcon="my-collapsed-icon-component" @model={{this.tree}} />
```

Component to use for collapsed icon

### Blocks

You may optionally pass a block to the `Tree` component to render each node area with custom HTML.

```handlebars
<Tree
  @checkable={{this.isCheckable}}
  @chosenId={{this.selectedNode}}
  @expandDepth={{2}}
  @model={{this.model}}
  @onSelect={{this.selectNode}}
  as |node|
>
  <i class="fa text-muted {{if node.isExpanded 'fa-folder-open' 'fa-folder'}}">&zwnj;</i>
  {{node.model.name}}
</Tree>
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
