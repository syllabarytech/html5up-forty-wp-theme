(function(blocks, element, blockEditor) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
 
    blocks.registerBlockType(
        'forty/spotlight-section',
        {
            title: 'Section - Spotlights',
            icon: 'excerpt-view',
            category: 'forty-theme',
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
    window.wp.element,
    window.wp.blockEditor
) );
