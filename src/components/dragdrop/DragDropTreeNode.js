'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from '../header';
import {DragSource, DropTarget} from 'react-dnd';
import dragDropNodeChildren from './dragDropNodeChildren';
import defaultStyle from '../../themes/default';


export const treeNodeSource = {
    beginDrag(props) {
        return props.node;
    },
    endDrag(props, monitor) {
        if (props.reorderTreeNodes) {
            props.reorderTreeNodes(monitor.getItem(), monitor.getDropResult());
        }
    }
};
export const TreeNodeTarget = {
    drop(props, monitor) {
        if (!monitor.didDrop()) {
            return props.node;
        }
    }
};
export const sourceCollect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});
export const targetCollect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});
export const validateDragDropType = props => props.node.name !== 'root' ? props.node.dragDropType || 'root' : 'root';

@DragSource(validateDragDropType, treeNodeSource, sourceCollect)
@DropTarget(validateDragDropType, TreeNodeTarget, targetCollect)
class DragDropTreeNode extends React.Component {
    onClick = () => {
        const {node, onToggle} = this.props;
        const {toggled} = node;

        if (onToggle) {
            onToggle(node, !toggled);
        }
    }

    animations = () => {
        const {animations, node} = this.props;

        if (animations === false) {
            return false;
        }

        const anim = Object.assign({}, animations, node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props)
        };
    }

    decorators = () => {
        // Merge Any Node Based Decorators Into The Pack
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }
    getStyle = () => {
        const {style, isDragging, isOver} = this.props;
        return {
            styleWithDragDrop: Object.assign({}, style.base, {
                display: isDragging ? 'none' : 'block',
                cursor: 'pointer'
            }, isOver ? {border: '1px dashed gray'} : {}),
            placeHolderStyle: style.placeHolderStyle || defaultStyle.tree.node.placeHolderStyle
        };
    }

    render() {
        const {connectDragSource, connectDropTarget} = this.props;
        const decorators = this.decorators();
        const animations = this.animations();
        return connectDragSource(connectDropTarget(
            <li ref={ref => this.topLevelRef = ref}
                style={this.getStyle().styleWithDragDrop}>
                {this.renderHeader(decorators, animations)}
                {this.renderDrawer(decorators, animations)}
            </li>
        ));
    }

    renderDrawer = (decorators, animations) => {
        const {node: {toggled}} = this.props;

        if (!animations && !toggled) {
            return null;
        } else if (!animations && toggled) {
            return this.renderChildren(decorators, animations);
        }

        const {animation, duration, ...restAnimationInfo} = animations.drawer;
        return (
            <VelocityTransitionGroup {...restAnimationInfo}
                                     ref={ref => this.velocityRef = ref}>
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }

    renderHeader = (decorators, animations) => {
        const {node, style} = this.props;

        return (
            <NodeHeader animations={animations}
                        decorators={decorators}
                        node={Object.assign({}, node)}
                        onClick={this.onClick}
                        style={style}/>
        );
    }

    renderChildren = decorators => {
        const {animations, decorators: propDecorators, node, style, reorderTreeNodes} = this.props;
        if (node.loading) {
            return this.renderLoading(decorators);
        }

        let children = node.children;
        if (!Array.isArray(children)) {
            children = children ? [children] : [];
        }

        return (
            <ul style={style.subtree}
                ref={ref => this.subtreeRef = ref}>
                {children.map((child, index) => dragDropNodeChildren({
                        ...this._eventBubbles(),
                        animations,
                        decorators,
                        style,
                        child,
                        index,
                        reorderTreeNodes
                    })
                )}
            </ul>
        );
    }

    renderLoading = (decorators) => {
        const {style} = this.props;

        return (
            <ul style={style.subtree}>
                <li>
                    <decorators.Loading style={style.loading}/>
                </li>
            </ul>
        );
    }

    _eventBubbles = () => {
        const {onToggle} = this.props;

        return {
            onToggle
        };
    }
}

DragDropTreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onToggle: PropTypes.func
};

export default DragDropTreeNode;
