(function(blocks, element, blockEditor) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;

    blocks.registerBlockType(
        'forty/generic-section',
        {
            title: 'Section - Generic',
            icon: 'align-center',
            category: 'forty-theme',
            supports: {
                anchor: true,
                customClassName: false,
            },
            example: {},
            edit: function() {
                return el(
                    'section',
                    null,
                    el(
                        'div',
                        { className: 'inner' },
                        el(InnerBlocks)
                    )
                );
            },
            save: function() {
                return el(
                    'section',
                    null,
                    el(
                        'div',
                        { className: 'inner' },
                        el(InnerBlocks.Content)
                    )
                );
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor,
) );
