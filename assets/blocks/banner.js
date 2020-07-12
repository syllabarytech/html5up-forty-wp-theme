(function(blocks, components, element, blockEditor) {
    var el = element.createElement;
    var MediaUpload = blockEditor.MediaUpload;
	var PlainText = blockEditor.PlainText;
    var RichText = blockEditor.RichText;
    var Icon = components.Icon;
    var Button = components.Button;
 
    blocks.registerBlockType(
        'forty/banner',
        {
            title: 'Banner',
            // description: '',
            icon: 'camera',
            category: 'forty-theme',
            attributes: {
                mediaID: {
                    type: 'number',
                },
                mediaURL: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'img',
                    attribute: 'src',
                },
                alt: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'img',
                    attribute: 'alt',
                },
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
                var updateImage = function(value) {
                    return props.setAttributes({
                        mediaURL: value.url,
                        mediaID: value.id,
                        alt: value.alt,
                    });
                };
                var updateHeading = function(value) {
                    return props.setAttributes({heading: value})
                }
                var updateContent = function(value) {
                    return props.setAttributes({content: value})
                }

                return el(
                    'section',
                    {
                        id: 'banner',
                        className: 'major',
                        style: {
                            backgroundImage: props.attributes.mediaID ? 'url(' + props.attributes.mediaURL + ')' : ''
                        }
                    },
                    el(
                        'div',
                        {className: 'inner'},
                        [
                            el(
                                MediaUpload, {
                                    onSelect: updateImage,
                                    allowedTypes: 'image',
                                    value: props.attributes.mediaID,
                                    render: function( obj ) {
                                        return el(
                                            Button,
                                            {
                                                className: 'components-toolbar__control has-icon' + (props.attributes.mediaID ? ' is-pressed' : ''),
                                                onClick: obj.open,
                                            },
                                            el(
                                                Icon,
                                                {
                                                    icon: 'format-image'
                                                }
                                            )
                                        );
                                    },
                                }
                            ), el(
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
                            props.attributes.mediaID ? el(
                                'span',
                                {
                                    className: 'image'
                                },
                                el(
                                    'img',
                                    {
                                        src: props.attributes.mediaURL,
                                        alt: props.attributes.alt
                                    }
                                )
                            ) : null, el(
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
                                [
                                    el(
                                        RichText.Content,
                                        {tagName: 'p', value: props.attributes.content}
                                    ),
                                ]
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
