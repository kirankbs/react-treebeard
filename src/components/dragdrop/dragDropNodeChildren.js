'use strict';

import DragDropTreeNode from './DragDropTreeNode';
import React from 'react';

const dragDropNodeChildren = props => {
    const {onToggle, animations, decorators, style, child, index, reorderTreeNodes} = props;
    return (<DragDropTreeNode onToggle={onToggle}
                      animations={animations}
                      decorators={decorators}
                      key={child.id || index}
                      node={child}
                      style={style}
                      reorderTreeNodes={reorderTreeNodes}/>);
};
export default dragDropNodeChildren;
