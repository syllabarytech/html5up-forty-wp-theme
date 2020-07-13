(function(blocks, element, blockEditor) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
 
    blocks.registerBlockType(
        'forty/tile-section',
        {
            title: 'Section - Tiles',
            icon: 'tablet',
            category: 'forty-theme',
            attributes: {
            },
            supports: {
                anchor: true,
                customClassName: false,
            },
            example: {},
            edit: function (props) {
                return el(
                    'div',
                    {className: props.className},
                    el(
                        InnerBlocks,
                        {
                            allowedBlocks: [
                                'forty/tile',
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
    window.wp.element,
    window.wp.blockEditor
) );
