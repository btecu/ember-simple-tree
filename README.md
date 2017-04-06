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

Accepts: `boolean`

```handlebars
{{x-tree model=tree checkable=true}}
```

Displays a checkbox for each node.
Use in conjunction with `isChecked`.

### Blocks

You may optionally pass a block to both the `x-tree` and `x-tree-node`
components to render nodes with custom HTML.

```handlebars
{{#x-tree model=branches as |nodes|}}
  {{menu-children class='tree-node' model=nodes select=(action 'select') someProperty=7}}
{{/x-tree}}

{{!-- menu-children.hbs --}}

{{menu-node model=model select=select hover=hover someProperty=7}}

{{#if model.isExpanded}}
  {{#x-tree model=model.children select=select hover=hover as |nodes|}}
    {{menu-children model=nodes select=select hover=hover someProperty=7}}
  {{/x-tree}}
{{/if}}

{{!-- menu-node.hbs --}}

{{#x-tree-node model=model select=select}}
  <span class="toggle-icon" {{action 'toggleExpand' bubbles=false}}>
    {{#if model.children.length}}
      {{#if model.isExpanded}}
        &#x25BC;
      {{else}}
        &#x25B6;
      {{/if}}
    {{else}}
      &nbsp;&nbsp;
    {{/if}}
  </span>

  {{#if someProperty}}
    <div>{{model.name}} has {{someProperty}}</div>
  {{else}}
    <div>{{model.name}}</div>
  {{/if}}
{{/x-tree-node}}
```


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
