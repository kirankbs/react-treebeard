'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateDragDropType = exports.targetCollect = exports.sourceCollect = exports.TreeNodeTarget = exports.treeNodeSource = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _velocityReact = require('velocity-react');

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _reactDnd = require('react-dnd');

var _dragDropNodeChildren = require('./dragDropNodeChildren');

var _dragDropNodeChildren2 = _interopRequireDefault(_dragDropNodeChildren);

var _default = require('../../themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var treeNodeSource = exports.treeNodeSource = {
    beginDrag: function beginDrag(props) {
        return props.node;
    },
    endDrag: function endDrag(props, monitor) {
        if (props.reorderTreeNodes) {
            props.reorderTreeNodes(monitor.getItem(), monitor.getDropResult());
        }
    }
};
var TreeNodeTarget = exports.TreeNodeTarget = {
    drop: function drop(props, monitor) {
        if (!monitor.didDrop()) {
            return props.node;
        }
    }
};
var sourceCollect = exports.sourceCollect = function sourceCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};
var targetCollect = exports.targetCollect = function targetCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};
var validateDragDropType = exports.validateDragDropType = function validateDragDropType(props) {
    return props.node.name !== 'root' ? props.node.dragDropType || 'root' : 'root';
};

var DragDropTreeNode = (_dec = (0, _reactDnd.DragSource)(validateDragDropType, treeNodeSource, sourceCollect), _dec2 = (0, _reactDnd.DropTarget)(validateDragDropType, TreeNodeTarget, targetCollect), _dec(_class = _dec2(_class = function (_React$Component) {
    (0, _inherits3.default)(DragDropTreeNode, _React$Component);

    function DragDropTreeNode() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DragDropTreeNode);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DragDropTreeNode.__proto__ || (0, _getPrototypeOf2.default)(DragDropTreeNode)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
            var _this$props = _this.props,
                node = _this$props.node,
                onToggle = _this$props.onToggle;
            var toggled = node.toggled;


            if (onToggle) {
                onToggle(node, !toggled);
            }
        }, _this.animations = function () {
            var _this$props2 = _this.props,
                animations = _this$props2.animations,
                node = _this$props2.node;


            if (animations === false) {
                return false;
            }

            var anim = (0, _assign2.default)({}, animations, node.animations);
            return {
                toggle: anim.toggle(_this.props),
                drawer: anim.drawer(_this.props)
            };
        }, _this.decorators = function () {
            // Merge Any Node Based Decorators Into The Pack
            var _this$props3 = _this.props,
                decorators = _this$props3.decorators,
                node = _this$props3.node;

            var nodeDecorators = node.decorators || {};

            return (0, _assign2.default)({}, decorators, nodeDecorators);
        }, _this.getStyle = function () {
            var _this$props4 = _this.props,
                style = _this$props4.style,
                isDragging = _this$props4.isDragging,
                isOver = _this$props4.isOver;

            return {
                styleWithDragDrop: (0, _assign2.default)({}, style.base, {
                    display: isDragging ? 'none' : 'block',
                    cursor: 'pointer'
                }, isOver ? { border: '1px dashed gray' } : {}),
                placeHolderStyle: style.placeHolderStyle || _default2.default.tree.node.placeHolderStyle
            };
        }, _this.renderDrawer = function (decorators, animations) {
            var toggled = _this.props.node.toggled;


            if (!animations && !toggled) {
                return null;
            } else if (!animations && toggled) {
                return _this.renderChildren(decorators, animations);
            }

            var _animations$drawer = animations.drawer,
                animation = _animations$drawer.animation,
                duration = _animations$drawer.duration,
                restAnimationInfo = (0, _objectWithoutProperties3.default)(_animations$drawer, ['animation', 'duration']);

            return _react2.default.createElement(
                _velocityReact.VelocityTransitionGroup,
                (0, _extends3.default)({}, restAnimationInfo, {
                    ref: function ref(_ref2) {
                        return _this.velocityRef = _ref2;
                    } }),
                toggled ? _this.renderChildren(decorators, animations) : null
            );
        }, _this.renderHeader = function (decorators, animations) {
            var _this$props5 = _this.props,
                node = _this$props5.node,
                style = _this$props5.style;


            return _react2.default.createElement(_header2.default, { animations: animations,
                decorators: decorators,
                node: (0, _assign2.default)({}, node),
                onClick: _this.onClick,
                style: style });
        }, _this.renderChildren = function (decorators) {
            var _this$props6 = _this.props,
                animations = _this$props6.animations,
                propDecorators = _this$props6.decorators,
                node = _this$props6.node,
                style = _this$props6.style,
                reorderTreeNodes = _this$props6.reorderTreeNodes;

            if (node.loading) {
                return _this.renderLoading(decorators);
            }

            var children = node.children;
            if (!Array.isArray(children)) {
                children = children ? [children] : [];
            }

            return _react2.default.createElement(
                'ul',
                { style: style.subtree,
                    ref: function ref(_ref3) {
                        return _this.subtreeRef = _ref3;
                    } },
                children.map(function (child, index) {
                    return (0, _dragDropNodeChildren2.default)((0, _extends3.default)({}, _this._eventBubbles(), {
                        animations: animations,
                        decorators: decorators,
                        style: style,
                        child: child,
                        index: index,
                        reorderTreeNodes: reorderTreeNodes
                    }));
                })
            );
        }, _this.renderLoading = function (decorators) {
            var style = _this.props.style;


            return _react2.default.createElement(
                'ul',
                { style: style.subtree },
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(decorators.Loading, { style: style.loading })
                )
            );
        }, _this._eventBubbles = function () {
            var onToggle = _this.props.onToggle;


            return {
                onToggle: onToggle
            };
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DragDropTreeNode, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                connectDragSource = _props.connectDragSource,
                connectDropTarget = _props.connectDropTarget;

            var decorators = this.decorators();
            var animations = this.animations();
            return connectDragSource(connectDropTarget(_react2.default.createElement(
                'li',
                { ref: function ref(_ref4) {
                        return _this2.topLevelRef = _ref4;
                    },
                    style: this.getStyle().styleWithDragDrop },
                this.renderHeader(decorators, animations),
                this.renderDrawer(decorators, animations)
            )));
        }
    }]);
    return DragDropTreeNode;
}(_react2.default.Component)) || _class) || _class);


DragDropTreeNode.propTypes = {
    style: _propTypes2.default.object.isRequired,
    node: _propTypes2.default.object.isRequired,
    decorators: _propTypes2.default.object.isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]).isRequired,
    onToggle: _propTypes2.default.func
};

exports.default = DragDropTreeNode;