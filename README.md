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

#### hover

Returns: `node`

Fired when a node is hovered.


#### select

Returns: `node`

Fired when a node is selected.


### Available options

#### checkable

Default: `false`

Accepts: `boolea`

```handlebars
{{x-tree model=tree checkable=true}}
```

Displays a checkbox for each node.
Use in conjunction with `isChecked`.


### Model structure
The component uses recursion to display the tree.
The model requires specific properties to properly function:
 - `id` - unique identifier
 - `name` - `string` used to display a node
 - `children` - `array` of other nodes
 - `isChecked` - `boolean` used for a checkbox state
 - `isExpanded` - `boolean` used to expand a node (children)
 - `isSelected` - `boolean` optionally used for hover state
 - `isVisible` - `boolean` used to display or hide a node

```js
{
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
}
```
