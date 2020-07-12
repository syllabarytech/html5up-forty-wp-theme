(function(blocks, element, blockEditor) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;

    blocks.registerBlockType(
        'forty/main',
        {
            title: 'Main',
            icon: 'media-text',
            category: 'forty-theme',
            example: {},
            edit: function() {
                return el(
                    'div',
                    {id: 'main'},
                    el(
                        InnerBlocks,
                        {
                            allowedBlocks: [
                                'forty/generic-section',
                                'forty/spotlight-section',
                                'forty/tile-section',
                            ],
                        }
                    )
                );
            },
            save: function() {
                return el(
                    'div',
                    {id: 'main'},
                    el(InnerBlocks.Content)
                );
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor,
) );
