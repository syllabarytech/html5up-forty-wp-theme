(function(blocks, components, element, blockEditor) {
    var el = element.createElement; 
	var PlainText = blockEditor.PlainText;
    var MediaUpload = blockEditor.MediaUpload;
    var URLInputButton = blockEditor.URLInputButton;
    var Icon = components.Icon;
    var Button = components.Button;
    var ButtonGroup = components.ButtonGroup;
 
    blocks.registerBlockType(
        'forty/tile',
        {
            title: 'Tile',
            // description: '',
            icon: 'tablet',
            category: 'forty-theme',
            parent: ['forty/tile-section'],
            supports: {
                anchor: true,
                customClassName: false,
            },
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
                    selector: 'h3',
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
                    return props.setAttributes({
                        mediaURL: value ? value.url : null,
                        mediaID: value ? value.id : null,
                        alt: value ? value.alt : null,
                    });
                };
                var removeImage = function() {
                    updateImage(null);
                }
                var updateHeading = function(value) {
                    return props.setAttributes({heading: value})
                }
                var updateLink = function(value) {
                    return props.setAttributes({link: value})
                }
                var updateContent = function(value) {
                    return props.setAttributes({content: value})
                }

                var background = props.attributes.mediaID
                  ? { backgroundImage: 'url(' + props.attributes.mediaURL + ')' }
                  : {};

                return el(
                    'article',
                    {
                        style: { ...background }
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
                                            var addOrEditImageElement = el(
                                                Button,
                                                {
                                                    className: 'components-toolbar__control has-icon' + (props.attributes.mediaID ? ' is-pressed' : ''),
                                                    isPrimary: true,
                                                    onClick: obj.open,
                                                },
                                                el(
                                                    Icon,
                                                    {
                                                        icon: 'format-image'
                                                    }
                                                )
                                            );

                                            var removeImageButtonElement = el(
                                                Button,
                                                {
                                                    className: 'components-toolbar__control has-icon',
                                                    isDestructive: true,
                                                    onClick: removeImage,
                                                },
                                                el(
                                                    Icon,
                                                    {
                                                        icon: 'trash'
                                                    }
                                                )
                                            );

                                            return el(
                                                ButtonGroup,
                                                {},
                                                [
                                                    addOrEditImageElement,
                                                    props.attributes.mediaID ? removeImageButtonElement : null
                                                ]
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
                            'header',
                            {className: 'major'},
                            el(
                                'h3',
                                null,
                                el(
                                    PlainText,
                                    {
                                        inline: true,
                                        placeholder: 'Enter Heading Here',
                                        value: props.attributes.heading,
                                        onChange: updateHeading,
                                    }
                                )
                            )
                        ), el(
                            'p',
                            null,
                            el(
                                PlainText,
                                {
                                    inline: true,
                                    placeholder: 'Enter Content Here',
                                    value: props.attributes.content,
                                    onChange: updateContent,
                                    style: {
                                        background: 'transparent'
                                    }
                                }
                            )
                        )
                    ]
                );
            },
            save: function(props) {
                var background = props.attributes.mediaID
                  ? { backgroundImage: 'url(' + props.attributes.mediaURL + ')' }
                  : {};
                return el(
                    'article',
                    {
                        style: { ...background }
                    },
                    [
                        props.attributes.mediaID ? el(
                            'span',
                            {
                                className: 'image',
                                style: {
                                    display: 'none'
                                }
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
                            {
                                className: 'major'
                            },
                            [
                                el(
                                    'h3',
                                    null,
                                    props.attributes.link
                                        ? el(
                                            'a',
                                            {
                                                href: props.attributes.link,
                                                className: 'link',
                                            },
                                            props.attributes.heading
                                        )
                                        : props.attributes.heading
                                ),
                                el(
                                    'p',
                                    null,
                                    props.attributes.content
                                )
                            ]
                        ),
                    ]
                );
            },
        },
    );
}(
    window.wp.blocks,
    window.wp.components,
    window.wp.element,
    window.wp.blockEditor,
) );
