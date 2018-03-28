import { A } from '@ember/array';
import { get } from '@ember/object';
import { isPresent, isEmpty } from '@ember/utils';
import ObjectProxy from '@ember/object/proxy';

/* Build a tree (nested objects) from a plain array
 * using `id` and `parentId` as references for the
 * relationships. The `name` property is expected
 * for rendering. Optionally, `valueKey` can be
 * passed for `id` and `labelKey` for `name`.
 * If the model is flat, it will return a list.
 */
export function buildTree(model, options) {
  let tree = {};
  let roots = A();

  if (isEmpty(model)) {
    return roots;
  }

  let element = model[0] || get(model, 'firstObject');
  if (typeof element !== 'object') {
    // Not a model of objects, hence it should be a flat list
    return buildFlatList(model);
  }

  // Add all nodes to tree
  model.forEach(node => {
    let child = {
      content: node,
      children: A(),
      isSelected: false,
      isVisible: true
    };

    // Alternative name for `id`
    if (options.valueKey) {
      child.id = get(node, options.valueKey);
    }

    // Alternative name for `name`
    if (options.labelKey) {
      child.name = get(node, options.labelKey);
    }

    // Decide if node is expanded
    if (isPresent(options.isExpanded)) {
      child.isExpanded = options.isExpanded;
    }

    // Proxy options to keep model intact
    tree[get(child, 'id')] = ObjectProxy.create(child);
  });

  // Connect all children to their parent
  model.forEach(node => {
    let child = tree[get(node, options.valueKey || 'id')];
    let parent = get(node, 'parentId');

    if (isEmpty(parent)) {
      roots.push(child);
    } else {
      tree[parent].children.push(child);
    }
  });

  return roots;
}

// Builds a list of proxies from a model of values
export function buildFlatList(model) {
  let list = model.map(node => ObjectProxy.create({
    content: node,
    id: node,
    name: node,
    isSelected: false,
    isVisible: true
  }));

  return A(list);
}

export function getDescendents(tree) {
  let descendents = A();

  tree.forEach(node => {
    descendents.pushObject(node);
    descendents.pushObjects(getDescendents(node.children));
  });

  return descendents;
}
