'use strict';

import React, {Component} from 'react';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';

export const createDecorators = (spec) => {
    spec = spec || {};
    return {
        Loading: (props) => {
            return spec.loading ? <spec.loading {...props}/> : <div/>;
        },
        Toggle: (props) => {
            return spec.toggle ? <spec.toggle {...props}/> : <div/>;
        },
        Header: (props) => {
            return spec.header ? <spec.header {...props}/> : <div/>;
        },
        Container: (props) => {
            return spec.container ? <spec.container {...props}/> : <div/>;
        }

    };
};

export const createAnimations = () => {
    return {
        toggle: () => {
            return {
                animation: 'fadeOut',
                duration: 0
            };
        },
        drawer: () => {
            return {
                enter: {
                    animation: 'slideDown',
                    duration: 0
                },
                leave: {
                    animation: 'slideUp',
                    duration: 0
                }
            };
        }
    };
};

export const wrapDragDropComponentInTestContext = (DecoratedComponent) => {
    @DragDropContext(TestBackend)
    class TestContextContainer extends Component {
        render() {
            return <DecoratedComponent {...this.props} />;
        }
    }

    return TestContextContainer;
}
