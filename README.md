# ember-simple-tree

Lightweight, composable tree component for Ember.

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

The styles are included with the component.
All of them use the `tree-*` and `toggle-icon` classes, which you can override in your own CSS.

Basic example:

```handlebars
<Tree @model={{this.tree}} />
```

Standard example:

```handlebars
<Tree @model={{this.tree}} as |node|>
  <node.Toggle />
  <node.Checkbox />
  {{node.model.name}}
</Tree>
```

Upgrading from an older version? See [UPGRADING.md](UPGRADING.md).

### Available actions

#### onCheck

Returns: `node`

Fired when a checkbox state changes.

```handlebars
<Tree @model={{this.tree}} @onCheck={{this.onCheck}} />
```

#### onContextMenu

Returns: `node`

Fired on right click. When set, the browser's context menu is not shown.

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

Displays a checkbox for each node, reflecting `model.isChecked`.
In the block form, render `<node.Checkbox />` instead, since `checkable` has no effect there.

#### chosenId

Default: `undefined`

Accepts: `id`

```handlebars
<Tree @chosenId={{this.someId}} @model={{this.tree}} />
```

Applies the `tree-chosen` class (bold by default) to the node whose `model.id` matches.
When the tree is first rendered, the ancestors of that node are expanded so it's visible.

#### expandDepth

Default: `0`

Accepts: `number`

```handlebars
<Tree @expandDepth={{-1}} @model={{this.tree}} />
```

Expands the tree to a given depth when it's first rendered.
`0` will not expand the tree at all, `-1` will fully expand a tree, a positive number will expand a tree to the given depth.

#### recursiveCheck

Default: `false`

Accepts: `boolean`

```handlebars
<Tree @checkable={{true}} @model={{this.tree}} @recursiveCheck={{true}} />
```

When enabled, checking a node also checks all of its descendants, and each parent is checked,
unchecked or indeterminate based on its children. This also applies when `onSelect` changes `isChecked`.

### Blocks

#### Default block

You may optionally pass a block to the `Tree` component to render each node area with custom HTML.

```handlebars
<Tree
  @chosenId={{this.selectedNode}}
  @expandDepth={{2}}
  @model={{this.model}}
  @onSelect={{this.selectNode}}
  as |node|
>
  <i class="fa text-muted {{if node.model.isExpanded 'fa-folder-open' 'fa-folder'}}">&zwnj;</i>
  {{node.model.name}}
</Tree>
```

The block receives a `node` object with:

- `model`: the node
- `Toggle`: the expand/collapse toggle, ready to render as `<node.Toggle />`
- `Checkbox`: the checkbox, ready to render as `<node.Checkbox />`
- `toggleExpand`: the action to expand or collapse the node, for your own controls
- `toggleCheck`: the action to check or uncheck the node, for your own controls

```handlebars
<Tree @model={{this.tree}} as |node|>
  <button type="button" {{on "click" node.toggleExpand}}>
    {{if node.model.isExpanded "Collapse" "Expand"}}
  </button>
  {{node.model.name}}
</Tree>
```

#### Expanded icon

Default: ▼

Use the `<:expandedIcon>` named block on `Tree` to customize the expanded icon:

```handlebars
<Tree @model={{this.tree}}>
  <:expandedIcon><MyExpandedIcon /></:expandedIcon>
</Tree>
```

#### Collapsed icon

Default: ▶

Use the `<:collapsedIcon>` named block on `Tree` to customize the collapsed icon:

```handlebars
<Tree @model={{this.tree}}>
  <:collapsedIcon><MyCollapsedIcon /></:collapsedIcon>
</Tree>
```

#### Custom icons with the block form

The icon blocks on `Tree` only apply when it renders the toggle itself. In the block form you
render the toggle, so pass the icon blocks to `node.Toggle` instead:

```handlebars
<Tree @model={{this.tree}} as |node|>
  <node.Toggle>
    <:expandedIcon><MyExpandedIcon /></:expandedIcon>
    <:collapsedIcon><MyCollapsedIcon /></:collapsedIcon>
  </node.Toggle>
  {{node.model.name}}
</Tree>
```

### Building a tree

`buildTree` creates the model from a flat list, using `id` and `parentId` for the relationships:

```js
import { buildTree } from 'ember-simple-tree/utils/tree';

buildTree([
  { id: 1, name: 'Root' },
  { id: 2, name: 'Child', parentId: 1 },
]);
```

If your records use other properties for `id` or `name`, pass `valueKey` or `labelKey`. `parentId` must reference the value of `valueKey`:

```js
buildTree(records, { labelKey: 'title', valueKey: 'slug' });
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
- `isSelected` - `boolean` set while the node is hovered
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
