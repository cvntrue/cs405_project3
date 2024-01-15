/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
  constructor(meshDrawer, trs, parent = null) {
    this.meshDrawer = meshDrawer;
    this.trs = trs;
    this.parent = parent;
    this.children = [];

    if (parent) {
      this.parent.__addChild(this);
    }
  }

  __addChild(node) {
    this.children.push(node);
  }

  draw(mvp, modelView, normalMatrix, modelMatrix) {
    // Get the node's transformation matrix and multiply it with the parent's matrices
    var transformationMatrix = this.trs.getTransformationMatrix();
    [mvp, modelView, normalMatrix, modelMatrix] = [
      mvp,
      modelView,
      normalMatrix,
      modelMatrix,
    ].map((matrix) => MatrixMult(matrix, transformationMatrix));

    // Draw the MeshDrawer if it exists
    this.meshDrawer &&
      this.meshDrawer.draw(mvp, modelView, normalMatrix, modelMatrix);

    // Draw the children nodes using the same matrices
    this.children.forEach((child) =>
      child.draw(mvp, modelView, normalMatrix, modelMatrix)
    );
  }
}
