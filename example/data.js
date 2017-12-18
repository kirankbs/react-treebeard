'use strict';

export default {
    name: 'react-treebeard',
    toggled: true,
    children: [
        {
            name: 'example',
            children: [
                { name: 'app.js', type: '01' },
                { name: 'data.js', type: '01' },
                { name: 'index.html', type: '01' },
                { name: 'styles.js', type: '01' },
                { name: 'webpack.config.js', type: '01' }
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
                        { name: 'decorators.js', type: '00201' },
                        { name: 'treebeard.js', type: '00201' }
                    ], type: '02'
                },
                { name: 'index.js', type: '02' }
            ],
            type: '0'
        },
        {
            name: 'themes',
            children: [
                { name: 'animations.js', type: '03' },
                { name: 'default.js', type: '03' }
            ],
            type: '0'
        },
        { name: 'Gulpfile.js', type: '0'},
        { name: 'index.js', type: '0' },
        { name: 'package.json', type: '0' }
    ]
};
