# ember-simple-tree

Simple tree component for Ember without any dependency.

## Installation

```bash
ember install ember-simple-tree
```


## Usage

Basic example:

```handlebars
{{x-tree model=tree}}
```


### Available actions

#### onCheck

Returns: `node`

Fired when a checkbox state changes.

```handlebars
{{x-tree model=tree onCheck=(action 'onCheck')}}
```

#### onHover

Returns: `node`

Fired when a mouse enters the node.

```handlebars
{{x-tree model=tree onHover=(action 'onHover')}}
```

#### onHoverOut

Returns: `node`

Fired when a mouse leaves the node.

```handlebars
{{x-tree model=tree onHoverOut=(action 'onHoverOut')}}
```

#### onSelect

Returns: `node`

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

### Blocks

You may optionally pass a block to the `x-tree` component to render each node area with custom HTML.
The node area is the area directly to the right of each arrow (and possibly checkbox) in the tree.
The Node yields back the model for each area so that you can use attributes dynamically.

```handlebars
{{#x-tree
  chosenId=selectedNode
  checkable=isCheckable
  expandDepth=2
  onSelect=(action 'selectNode')
  model=model as |node|}}
    <i class="fa text-muted {{if node.isExpanded 'fa-folder-open' 'fa-folder'}}">&zwnj;</i>
    {{node.name}}
{{/x-tree}}
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
