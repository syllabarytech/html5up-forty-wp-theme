(function(blocks, components, element, blockEditor) {
    var el = element.createElement; 
	var PlainText = blockEditor.PlainText;
    var MediaUpload = blockEditor.MediaUpload;
    var URLInputButton = blockEditor.URLInputButton;
    var Icon = components.Icon;
    var Button = components.Button;
 
    blocks.registerBlockType(
        'forty/tile',
        {
            title: 'Tile',
            // description: '',
            icon: 'tablet',
            category: 'forty-theme',
            parent: ['forty/tile-section'],
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
                    selector: 'a',
                },
                link: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'a',
                    attribute: 'href',
                },
                content: {
                    type: 'string',
                    source: 'text',
                    selector: 'p',
                }
            },
            example: {},
            edit: function(props) {
                var updateImage = function(value) {
                    console.log(value);
                    return props.setAttributes({
                        mediaURL: value.url,
                        mediaID: value.id,
                        alt: value.alt,
                    });
                };
                var updateHeading = function(value) {
                    return props.setAttributes({heading: value})
                }
                var updateLink = function(value) {
                    return props.setAttributes({link: value})
                }
                var updateContent = function(value) {
                    return props.setAttributes({content: value})
                }

                return el(
                    'article',
                    {
                        style: {
                            backgroundImage: props.attributes.mediaID ? 'url(' + props.attributes.mediaURL + ')' : ''
                        }
                    },
                    [
                        el(
                            'div',
                            {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'row'
                                }
                            },
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
                                    URLInputButton,
                                    {
                                        url: props.attributes.link,
                                        onChange: updateLink,
                                    }
                                )
                            ]
                        ), el(
                            PlainText,
                            {
                                tagName: 'h3',
                                inline: true,
                                placeholder: 'Enter Heading Here',
                                value: props.attributes.heading,
                                onChange: updateHeading,
                            }
                        ), el(
                            PlainText,
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
                    ]
                );
            },
            save: function(props) {
                return el(
                    'article',
                    null,
                    [el(
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
                    ),
                    el(
                        'header',
                        {
                            className: 'major'
                        },
                        [
                            el(
                                'h3',
                                null,
                                el(
                                    'a',
                                    {
                                        href: props.attributes.link,
                                        className: 'link',
                                    },
                                    props.attributes.heading
                                )
                            ),
                            el(
                                'p',
                                null,
                                props.attributes.content
                            )
                        ]
                    )]
                );
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.components,
    window.wp.element,
    window.wp.blockEditor,
) );
