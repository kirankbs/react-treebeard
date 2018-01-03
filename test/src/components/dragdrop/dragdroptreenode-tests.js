/*  eslint no-unused-expressions:0  */

'use strict';
import React from 'react';
import DragDropTreeNode, {
    sourceCollect,
    targetCollect,
    treeNodeSource,
    TreeNodeTarget,
    validateDragDropType
} from '../../../../src/components/dragdrop/DragDropTreeNode';
import TestUtils from 'react-dom/test-utils';
import {animations, decorators} from '../../../../src/index';
import defaultStyle from '../../../../src/themes/default';
import sinon from 'sinon';
import {expect} from 'chai';
import {wrapDragDropComponentInTestContext} from '../../utils/factory';


const data = {
    name: 'react-treebeard',
    toggled: true,
    children: [
        {
            name: 'example',
            children: [
                {name: 'app.js', type: '01'},
                {name: 'data.js', type: '01'},
                {name: 'index.html', type: '01'},
                {name: 'styles.js', type: '01'},
                {name: 'webpack.config.js', type: '01'}
            ],
            type: '0'
        },
        {
            name: 'node_modules',
            loading: true,
            children: [],
            type: '0'
        },
        {
            name: 'src',
            children: [
                {
                    name: 'components',
                    children: [
                        {name: 'decorators.js', type: '00201'},
                        {name: 'treebeard.js', type: '00201'}
                    ], type: '02'
                },
                {name: 'index.js', type: '02'}
            ],
            type: '0'
        },
        {
            name: 'themes',
            children: [
                {name: 'animations.js', type: '03'},
                {name: 'default.js', type: '03'}
            ],
            type: '0'
        },
        {name: 'Gulpfile.js', type: '0'},
        {name: 'index.js', type: '0'},
        {name: 'package.json', type: '0'}
    ]
};

describe('dragdroptreenode', () => {
    const identity = el => el;
    let decoratedComponent;
    let componentWithContext;
    const reorderTreeNodes = sinon.spy();
    beforeEach(() => {
        const OriginalDragDropTreeNode = DragDropTreeNode.DecoratedComponent;
        decoratedComponent = TestUtils.renderIntoDocument(
            <OriginalDragDropTreeNode
                node={{}}
                animations={animations}
                decorators={decorators}
                connectDragSource={identity}
                connectDropTarget={identity}
                style={defaultStyle.tree.node}
                isOver={false}
                isDragging={false}/>);
        const DragDropTreeNodeContext = wrapDragDropComponentInTestContext(DragDropTreeNode);
        componentWithContext = TestUtils.renderIntoDocument(
            <DragDropTreeNodeContext
                node={{}}
                animations={animations}
                decorators={decorators}
                connectDragSource={identity}
                connectDropTarget={identity}
                style={defaultStyle.tree.node}
                reorderTreeNodes={reorderTreeNodes}
                isDragging={() => true}
                isOver={() => true}/>
        );
    });
    it('should display default placeholder on tree node while dragging', () => {
        const OriginalTreeNode = DragDropTreeNode.DecoratedComponent;
        const identity = el => el;

        const root = TestUtils.renderIntoDocument(
            <OriginalTreeNode
                node={{}}
                animations={animations}
                decorators={decorators}
                connectDragSource={identity}
                connectDropTarget={identity}
                style={defaultStyle.tree.node}
                isDragging={true}
                isOver={true}/>
        );
        const liPlaceholder = TestUtils.findRenderedDOMComponentWithTag(root, 'li');
        liPlaceholder.style.border.should.equal('1px dashed gray');
    });
    it('should display component in tree beard while not dragging', () => {
        const li = TestUtils.findRenderedDOMComponentWithTag(componentWithContext, 'li');
        li.style.display.should.equal('block');
    });
    it('should not display component in tree while dragging', () => {
        const backend = componentWithContext.getManager().getBackend();
        const dragDropTreeNode = TestUtils.findRenderedComponentWithType(componentWithContext, DragDropTreeNode);
        backend.simulateBeginDrag([dragDropTreeNode.getHandlerId()]);
        const li = TestUtils.findRenderedDOMComponentWithTag(componentWithContext, 'li');
        li.style.display.should.equal('none');
    });
    it('should wrap component with drag drop features', () => {
        const connectDragSource = sinon.stub().returns(<div></div>);
        const connectDropTarget = sinon.stub().returns(<div></div>);
        const OriginalDragDropTreeNode = DragDropTreeNode.DecoratedComponent;
        decoratedComponent = TestUtils.renderIntoDocument(
            <OriginalDragDropTreeNode
                node={{}}
                animations={animations}
                decorators={decorators}
                connectDragSource={connectDragSource}
                connectDropTarget={connectDropTarget}
                style={defaultStyle.tree.node}
                isOver={false}
                isDragging={false}/>
        );
        connectDragSource.should.be.called.once;
        connectDropTarget.should.be.called.once;
    });
    describe('drag drop properties', () => {
        it('should have connectDragSource', () => {
            expect(decoratedComponent.props).to.have.property('connectDragSource');
        });
        it('should have connectDropTarget', () => {
            expect(decoratedComponent.props).to.have.property('connectDropTarget');
        });
        it('should have isOver', () => {
            expect(decoratedComponent.props).to.have.property('isOver');
        });
        it('should have isDragging', () => {
            expect(decoratedComponent.props).to.have.property('isDragging');

        });
    });

});

describe('sourceCollect', () => {
    const identity = el => el;
    it('should return properties for drag event', () => {
        const connect = {dragSource: () => identity};
        const monitor = {isDragging: () => false};
        const actual = sourceCollect(connect, monitor);
        actual.connectDragSource.should.equal(identity);
        actual.isDragging.should.equal(false);
    });
});

describe('targetCollect', () => {
    const identity = el => el;
    it('should return properties for drop event', () => {
        const connect = {dropTarget: () => identity};
        const monitor = {isOver: () => false, canDrop: () => false};
        const actual = targetCollect(connect, monitor);
        actual.connectDropTarget.should.equal(identity);
        actual.isOver.should.equal(false);
        actual.canDrop.should.equal(false);
    });
});

describe('treeNodeSource lifecycle method', () => {
    it('beginDrag should return source node while dragging', () => {
        const props = {node: 'node'};
        treeNodeSource.beginDrag(props).should.equal('node');
    });
    it('endDrag should call method given in props which will reorder nodes', () => {
        const reorderTreeNodes = sinon.spy();
        const monitor = {getItem: () => 'source node', getDropResult: () => 'target node'};
        const props = {reorderTreeNodes: reorderTreeNodes};
        treeNodeSource.endDrag(props, monitor);
        reorderTreeNodes.should.be.called.once;
    });
    it('endDrag should not call reorderTreeNodes in its absence', () => {
        const reorderTreeNodes = sinon.spy();
        const monitor = {getItem: () => 'source node', getDropResult: () => 'target node'};
        treeNodeSource.endDrag({}, monitor);
        reorderTreeNodes.should.not.be.called.once;
    });
});

describe('treeNodeTarget lifecycle method', () => {
    it('drop should return dropped node ', () => {
        const monitor = {didDrop: () => false};
        const props = {node: 'node'};
        TreeNodeTarget.drop(props, monitor).should.equal('node');
    });
    it('drop should return none if drop handled already ', () => {
        const monitor = {didDrop: () => true};
        let props = {node: 'node'};
        expect(TreeNodeTarget.drop(props, monitor)).to.equal(undefined);
    });
});

describe('validateDragDropType', () => {
    it('returns type for a child node', () => {
        validateDragDropType({node: {name: 'child', dragDropType: '00'}}).should.equal('00');
    });
    it('returns type root for a child node if type is not present', () => {
        validateDragDropType({node: {name: 'child'}}).should.equal('root');
    });
    it('returns type root for a root node', () => {
        validateDragDropType({node: {name: 'root'}}).should.equal('root');
    });
});
