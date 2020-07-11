(function(blocks, components, element, blockEditor) {
    var el = element.createElement;
	var PlainText = blockEditor.PlainText;
	var RichText = blockEditor.RichText;
 
    blocks.registerBlockType(
        'forty/banner-section',
        {
            title: 'Section - Banner',
            // description: '',
            icon: 'camera',
            category: 'forty-theme',
            attributes: {
                heading: {
                    type: 'string',
                    source: 'text',
                    selector: 'h1',
                },
                content: {
                    type: 'string',
                    source: 'html',
                    selector: 'p',
                },
            },
            example: {},
            edit: function(props) {
                var updateHeading = function(value) {
                    return props.setAttributes({heading: value})
                }
                var updateContent = function(value) {
                    return props.setAttributes({content: value})
                }

                return el(
                    'section',
                    {id: 'banner', className: 'major'},
                    el(
                        'div',
                        {className: 'inner'},
                        [
                            el(
                                'header',
                                {className: 'major'},
                                el(
                                    PlainText,
                                    {
                                        tagName: 'h1',
                                        inline: true,
                                        placeholder: 'Enter Heading Here',
                                        value: props.attributes.heading,
                                        onChange: updateHeading,
                                        style: {
                                            background: 'transparent'
                                        }
                                    }
                                )
                            ),
                            el(
                                'div',
                                {className: 'content'},
                                el(
                                    RichText,
                                    {
                                        tagName: 'p',
                                        inline: true,
                                        placeholder: 'Enter Content Here',
                                        value: props.attributes.content,
                                        onChange: updateContent,
                                        style: {
                                            background: 'transparent'
                                        }
                                    }
                                )
                            ),
                        ]
                    )
                )
            },
            save: function(props) {
                return el(
                    'section',
                    {id: 'banner', className: 'major'},
                    el(
                        'div',
                        {className: 'inner'},
                        [
                            el(
                                'header',
                                {className: 'major'},
                                el(
                                    'h1',
                                    null,
                                    props.attributes.heading
                                )
                            ), el(
                                'div',
                                {className: 'content'},
                                el(
                                    RichText.Content,
                                    {tagName: 'p', value: props.attributes.content}
                                )
                            ),
                        ]
                    )
                );
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.components,
    window.wp.element,
    window.wp.blockEditor,
));
