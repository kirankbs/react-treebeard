'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _decorators = require('../decorators');

var _decorators2 = _interopRequireDefault(_decorators);

var _default = require('../../themes/default');

var _default2 = _interopRequireDefault(_default);

var _animations = require('../../themes/animations');

var _animations2 = _interopRequireDefault(_animations);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _DragDropTreeNode = require('./DragDropTreeNode');

var _DragDropTreeNode2 = _interopRequireDefault(_DragDropTreeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragDropTreeBeard = (_dec = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default), _dec(_class = function (_React$Component) {
    (0, _inherits3.default)(DragDropTreeBeard, _React$Component);

    function DragDropTreeBeard() {
        (0, _classCallCheck3.default)(this, DragDropTreeBeard);
        return (0, _possibleConstructorReturn3.default)(this, (DragDropTreeBeard.__proto__ || (0, _getPrototypeOf2.default)(DragDropTreeBeard)).apply(this, arguments));
    }

    (0, _createClass3.default)(DragDropTreeBeard, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                animations = _props.animations,
                decorators = _props.decorators,
                propsData = _props.data,
                onToggle = _props.onToggle,
                style = _props.style,
                reorderTreeNodes = _props.reorderTreeNodes;

            var data = propsData;
            var styleWithDragDrop = (0, _assign2.default)({}, style.tree.base, {
                position: 'relative',
                width: '100%',
                height: '100%'
            });

            // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
            if (!Array.isArray(data)) {
                data = [data];
            }
            return _react2.default.createElement(
                'ul',
                { style: styleWithDragDrop,
                    ref: function ref(_ref) {
                        return _this2.treeBaseRef = _ref;
                    } },
                data.map(function (node, index) {
                    return _react2.default.createElement(_DragDropTreeNode2.default, { animations: animations,
                        decorators: decorators,
                        key: node.id || index,
                        node: node,
                        onToggle: onToggle,
                        style: style.tree.node,
                        reorderTreeNodes: reorderTreeNodes });
                })
            );
        }
    }]);
    return DragDropTreeBeard;
}(_react2.default.Component)) || _class);


DragDropTreeBeard.propTypes = {
    style: _propTypes2.default.object,
    data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
    onToggle: _propTypes2.default.func,
    decorators: _propTypes2.default.object
};
DragDropTreeBeard.defaultProps = {
    style: _default2.default,
    animations: _animations2.default,
    decorators: _decorators2.default
};

exports.default = DragDropTreeBeard;