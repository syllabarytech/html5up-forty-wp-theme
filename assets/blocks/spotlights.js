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
            example: {},
            edit: function() {
                return el(
                    'p',
                    { style: blockStyle },
                    'Hello World, step 1 (from the editor).'
                );
            },
            save: function() {
                return el(
                    'p',
                    { style: blockStyle },
                    'Hello World, step 1 (from the frontend).'
                );
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.components,
    window.wp.element
) );
