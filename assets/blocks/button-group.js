(function(blocks, element, blockEditor) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
 
    blocks.registerBlockType(
        'forty/button-group',
        {
            title: 'Button Group',
            icon: 'tablet',
            category: 'forty-theme',
            attributes: {
            },
            example: {},
            edit: function (props) {
                return el(
                    'ul',
                    {className: 'actions'},
                    el(
                        InnerBlocks,
                        {
                            allowedBlocks: [
                                'forty/button',
                            ],
                        }
                    )
                )
            },
            save: function (props) {
                return el(
                    'ul',
                    {className: 'actions'},
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
