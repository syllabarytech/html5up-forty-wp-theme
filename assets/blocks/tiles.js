(function(blocks, element, blockEditor) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
 
    var headerStyle = {
        background: '#f3f4f5',
        border: '1px solid #e2e4e7',
        'border-bottom': '0px',
        padding: '0px 10px',
    };

    var blockStyle = {
        border: '1px solid #e2e4e7',
    };
 
    blocks.registerBlockType(
        'forty/tile-section',
        {
            title: 'Section - Tiles',
            icon: 'tablet',
            category: 'forty-theme',
            attributes: {
            },
            example: {},
            edit: function (props) {
                return [
                    el(
                        'div',
                        {style: headerStyle},
                        "Section - Tiles"
                    ), el(
                        'div',
                        {className: props.className, style: blockStyle},
                        el(InnerBlocks)
                    )
                ]
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
