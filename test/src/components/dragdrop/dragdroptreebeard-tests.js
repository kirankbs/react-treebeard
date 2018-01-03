/*  eslint no-unused-expressions:0  */

'use strict';

import React from 'react';
import {expect} from 'chai';
import DragDropTreeBeard from '../../../../src/components/dragdrop/DragDropTreeBeard';
import animations from '../../../../src/themes/animations';
import decorators from '../../../../src/components/decorators';
import defaultStyle from '../../../../src/themes/default';
import TestUtils from 'react-dom/test-utils';

const data = [
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
    ];

describe('DragDropTreeBeard', () => {
    let dragDropTreeBeard;
    const identity = _ => _;
    beforeEach(() => {
        dragDropTreeBeard = TestUtils.renderIntoDocument(<DragDropTreeBeard data={data} animations={animations}
                                                                            decorators={decorators}
                                                                            style={defaultStyle}
                                                                            reorderTreeNodes={identity}
                                                                            onToggle={identity}/>);
    });
    it('should render ul with drag drop style', () => {
        const ul = TestUtils.findRenderedDOMComponentWithTag(dragDropTreeBeard, 'ul');
        ul.style.position.should.equal('relative');
        ul.style.width.should.equal('100%');
        ul.style.height.should.equal('100%');
    });
    it('should render dragDropTreeNode', () => {
        const treeNodes = TestUtils.scryRenderedDOMComponentsWithTag(dragDropTreeBeard, 'li');
        treeNodes.length.should.equal(7);
        treeNodes[0].innerText.should.equal('example');
        treeNodes[1].innerText.should.equal('node_modules');
        treeNodes[2].innerText.should.equal('src');
        treeNodes[3].innerText.should.equal('themes');
        treeNodes[4].innerText.should.equal('Gulpfile.js');
        treeNodes[5].innerText.should.equal('index.js');
        treeNodes[6].innerText.should.equal('package.json');
    });
    it('should have all required properties for tree beard and drag drop', () => {
        console.log('sdsds', dragDropTreeBeard);
        expect(dragDropTreeBeard.props).to.have.a.property('decorators', decorators);
        expect(dragDropTreeBeard.props).to.have.a.property('animations', animations);
        expect(dragDropTreeBeard.props).to.have.a.property('reorderTreeNodes', identity);
        expect(dragDropTreeBeard.props).to.have.a.property('onToggle', identity);
        expect(dragDropTreeBeard.props).to.have.a.property('style', defaultStyle);
    });
});


