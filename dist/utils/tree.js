import { A } from '@ember/array';
import { set } from '@ember/object';
import { isEmpty } from '@ember/utils';

/* Build a tree (nested objects) from a plain array
 * using `id` and `parentId` as references for the
 * relationships. The `name` property is expected
 * for rendering. Optionally, `valueKey` can be
 * passed for `id` and `labelKey` for `name`.
 * If the model is flat, it will return a list.
 */
function buildTree(model, options = {}) {
  let tree = {};
  let roots = A();
  if (isEmpty(model)) {
    return roots;
  }

  // Set defaults and add all nodes to tree
  model.forEach(node => {
    // Alternative name for `id`
    if (options.valueKey) {
      set(node, 'id', node.options?.valueKey);
    }

    // Alternative name for `name`
    if (options.labelKey) {
      set(node, 'name', node.options?.labelKey);
    }

    // Defaults
    set(node, 'children', A());
    set(node, 'isChecked', node.isChecked ?? false);
    set(node, 'isDisabled', node.isDisabled ?? false);
    set(node, 'isExpanded', node.isExpanded ?? false);
    set(node, 'isSelected', node.isSelected ?? false);
    set(node, 'isVisible', node.isVisible ?? true);
    tree[node.id] = node;
  });

  // Connect all children to their parent
  model.forEach(node => {
    let key = options.valueKey ? node[options.valueKey] : node.id;
    let child = tree[key];
    if (isEmpty(node.parentId)) {
      roots.pushObject(child);
    } else {
      let parent = tree[node.parentId];
      parent.children.pushObject(child);
    }
  });
  return roots;
}

// Returns a flat list of all descenents, including the root
function getDescendents(tree, depth = -1) {
  let descendents = A();
  if (depth < 0) {
    // Unlimited depth
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

// Returns a flat list of ancestors, including the child
function getAncestors(tree, childNode) {
  let ancestors = A();
  let childId = childNode.id;
  tree.forEach(node => {
    if (!ancestors.isAny('id', childId)) {
      if (node.id === childId) {
        ancestors.pushObject(node);
      } else if (node.children?.length > 0) {
        ancestors.pushObjects(getAncestors(node.children, childNode));
        if (ancestors.length > 0) {
          ancestors.pushObject(node);
        }
      }
    }
  });
  return ancestors;
}

// Returns the parent of a child
function getParent(list, childNode) {
  return list.find(x => x.children.find(y => y.id === childNode.id));
}

export { buildTree, getAncestors, getDescendents, getParent };
//# sourceMappingURL=tree.js.map
