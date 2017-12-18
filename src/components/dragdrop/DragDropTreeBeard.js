'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import defaultDecorators from '../decorators';
import defaultTheme from '../../themes/default';
import defaultAnimations from '../../themes/animations';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragDropTreeNode from './DragDropTreeNode';
import dragDropNodeChildren from './dragDropNodeChildren';

class DragDropTreeBeard extends React.Component {

    render() {
        const {animations, decorators, data: propsData, onToggle, style, isOver, reorderTreeNodes} = this.props;
        let data = propsData;
        const styleWithDragDrop = Object.assign({}, style.tree.base, {
            position: 'relative',
            width: '100%',
            height: '100%'
        });

        // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
        if (!Array.isArray(data)) {
            data = [data];
        }
        return (
            <ul style={styleWithDragDrop}
                ref={ref => this.treeBaseRef = ref}>
                {data.map((node, index) =>
                    <DragDropTreeNode animations={animations}
                                      decorators={decorators}
                                      key={node.id || index}
                                      node={node}
                                      onToggle={onToggle}
                                      style={style.tree.node}
                                      reorderTreeNodes={reorderTreeNodes}/>
                )}
                {isOver &&
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow'
                }}/>
                }
            </ul>
        );
    }

}

DragDropTreeBeard.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    decorators: PropTypes.object
};
DragDropTreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default DragDropContext(HTML5Backend)(DragDropTreeBeard);
