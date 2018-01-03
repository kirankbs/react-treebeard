'use strict';

Object.defineProperty(exports, "__esModule", {
                  value: true
});

var _DragDropTreeNode = require('./DragDropTreeNode');

var _DragDropTreeNode2 = _interopRequireDefault(_DragDropTreeNode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dragDropNodeChildren = function dragDropNodeChildren(props) {
                  var onToggle = props.onToggle,
                      animations = props.animations,
                      decorators = props.decorators,
                      style = props.style,
                      child = props.child,
                      index = props.index,
                      reorderTreeNodes = props.reorderTreeNodes;

                  return _react2.default.createElement(_DragDropTreeNode2.default, { onToggle: onToggle,
                                    animations: animations,
                                    decorators: decorators,
                                    key: child.id || index,
                                    node: child,
                                    style: style,
                                    reorderTreeNodes: reorderTreeNodes });
};
exports.default = dragDropNodeChildren;