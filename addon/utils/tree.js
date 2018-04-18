import { A } from '@ember/array';
import { get, set } from '@ember/object';
import { isEmpty } from '@ember/utils';

/* Build a tree (nested objects) from a plain array
 * using `id` and `parentId` as references for the
 * relationships. The `name` property is expected
 * for rendering. Optionally, `valueKey` can be
 * passed for `id` and `labelKey` for `name`.
 * If the model is flat, it will return a list.
 */
export function buildTree(model, options = {}) {
  let tree = {};
  let roots = A();

  if (isEmpty(model)) {
    return roots;
  }

  // Set defaults and add all nodes to tree
  model.forEach(node => {
    // Alternative name for `id`
    if (options.valueKey) {
      set(node, 'id', get(node, options.valueKey));
    }

    // Alternative name for `name`
    if (options.labelKey) {
      set(node, 'name', get(node, options.labelKey));
    }

    // Defaults
    set(node, 'children', A());
    set(node, 'isVisible', get(node, 'isVisible') || true);
    set(node, 'isExpanded', get(node, 'isExpanded') || false);

    tree[get(node, 'id')] = node;
  });

  // Connect all children to their parent
  model.forEach(node => {
    let child = tree[get(node, options.valueKey || 'id')];
    let parent = get(node, 'parentId');

    if (isEmpty(parent)) {
      roots.pushObject(child);
    } else {
      get(tree[parent], 'children').pushObject(child);
    }
  });

  return roots;
}

// Gets all descendents of a tree (array)
// Returns a flat list of all descenents, including the top level of the tree
export function getDescendents(tree, depth = -1) {
  let descendents = A();

  if (depth < 0) { // Unlimited depth
    tree.forEach(node => {
      descendents.pushObject(node);
      descendents.pushObjects(getDescendents(node.children));
    });
  } else if (depth > 0) {
    tree.forEach(node => {
      descendents.pushObject(node);
      descendents.pushObjects(getDescendents(node.children, depth - 1));
    });
  }

  return descendents;
}

// Gets all ancestors of a childNode given a tree (array)
// Returns a flat list of ancestors, including the childNode
export function getAncestors(tree, childNode) {
  let ancestors = A();
  let childId = childNode.get('id');

  tree.forEach(node => {
    if (!ancestors.isAny('id', childId)) {
      if (node.id === childId) {
        ancestors.pushObject(node);
      } else if (node.children.length > 0) {
        ancestors.pushObjects(getAncestors(node.children, childNode));
        if (ancestors.length > 0) {
          ancestors.pushObject(node);
        }
      }
    }
  });

  return ancestors;
}

// Gets the direct parent of a childNode given a flat list
// Returns single object (parent) or undefined
export function getParent(list, childNode) {
  return list.find(x => x.children.find(y => y.id === childNode.get('id')));
}