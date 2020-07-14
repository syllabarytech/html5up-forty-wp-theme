(function(blocks, element, blockEditor) {
    var el = element.createElement;
	var PlainText = blockEditor.PlainText;
    var URLInputButton = blockEditor.URLInputButton;
 
    blocks.registerBlockType(
        'forty/button',
        {
            title: 'Button Group',
            icon: 'tablet',
            category: 'forty-theme',
            parent: ['forty/button-group'],
            supports: {
                anchor: true,
                customClassName: false,
            },
            attributes: {
                link: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'a',
                    attribute: 'href',
                },
                content: {
                    type: 'string',
                    source: 'text',
                    selector: 'a',
                }
            },
            example: {},
            edit: function (props) {
                var updateContent = function(value) {
                    return props.setAttributes({content: value})
                }
                var updateLink = function(value) {
                    return props.setAttributes({link: value})
                }

                return el(
                    'li',
                    null,
                    el(
                        'span',
                        {className: 'button'},
                        [
                            el(
                                URLInputButton,
                                {
                                    url: props.attributes.link,
                                    onChange: updateLink,
                                }
                            ),
                            el(
                                PlainText,
                                {
                                    inline: true,
                                    placeholder: 'Enter Text Here',
                                    value: props.attributes.content,
                                    onChange: updateContent,
                                    style: {
                                        background: 'transparent'
                                    }
                                }
                            ),
                        ]
                    )
                )
            },
            save: function (props) {
                var href = props.attributes.link ? {'href': props.attributes.link} : {};
                return el(
                    'li',
                    null,
                    el(
                        'a',
                        {
                            className: 'button',
                            ...href
                        },
                        props.attributes.content
                    )
                )
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
) );
