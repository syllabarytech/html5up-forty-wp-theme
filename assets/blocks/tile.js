(function(blocks, components, element, editor) {
    var el = element.createElement; 
	var RichText = editor.RichText;
	var PlainText = editor.PlainText;
    var MediaUpload = editor.MediaUpload;
    var URLInputButton = editor.URLInputButton;
 
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

                return el('article', null, [
                    el(
                        MediaUpload, {
                            onSelect: updateImage,
                            allowedTypes: 'image',
                            value: props.attributes.mediaID,
                            render: function( obj ) {
                                return el(
                                    components.Button,
                                    {
                                        className: props.attributes.mediaID
                                            ? 'image-button'
                                            : 'button button-large',
                                        onClick: obj.open,
                                    },
                                    ! props.attributes.mediaID
                                        ? 'Upload Image'
                                        : el( 'img', { src: props.attributes.mediaURL } )
                                );
                            },
                        }
                    ), el(
                        'h3',
                        null,
                        [
                            el(
                                URLInputButton, {
                                    url: props.attributes.link,
                                    onChange: updateLink,
                                }
                            ), el(
                                PlainText,
                                {
                                    tagName: 'h3',
                                    inline: true,
                                    placeholder: 'Enter Heading Here',
                                    value: props.attributes.heading,
                                    onChange: updateHeading,
                                }
                            )
                        ]
                    ), el(
                        PlainText,
                        {
                            tagName: 'p',
                            inline: true,
                            placeholder: 'Enter Content Here',
                            value: props.attributes.content,
                            onChange: updateContent,
                        }
                    )
                ]);
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
    window.wp.editor,
) );
