(function(blocks, components, element) {
    var el = element.createElement;
 
    var blockStyle = {
        backgroundColor: '#900',
        color: '#fff',
        padding: '20px',
    };
 
    blocks.registerBlockType(
        'forty/spotlight-section',
        {
            title: 'Section - Spotlights',
            icon: 'excerpt-view',
            category: 'forty-theme',
            parent: ['forty/main'],
            example: {},
            edit: function (props) {
                return el(
                    'div',
                    {className: props.className},
                    el(
                        InnerBlocks,
                        {
                            allowedBlocks: [
                                'forty/spotlight',
                            ],
                        }
                    )
                )
            },
            save: function (props) {
                return el(
                    'section',
                    {className: props.className},
                    el(InnerBlocks.Content)
                )
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.components,
    window.wp.element
) );
