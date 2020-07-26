(function(blocks, components, element, blockEditor) {
    var el = element.createElement;
	var PlainText = blockEditor.PlainText;
    var MediaUpload = blockEditor.MediaUpload;
    var URLInputButton = blockEditor.URLInputButton;
    var Icon = components.Icon;
    var Button = components.Button;
 
    blocks.registerBlockType(
        'forty/spotlight',
        {
            title: 'Spotlight',
            icon: 'align-left',
            category: 'forty-theme',
            parent: ['forty/spotlight-section'],
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
                },
                buttonText: {
                    type: 'string',
                    source: 'text',
                    selector: '.button',
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
                var updateButtonText = function(value) {
                    return props.setAttributes({buttonText: value})
                }

                return el(
                    'section',
                    null,
                    [
                        el(
                            'span',
                            { className: 'image' },
                            el(
                                'img',
                                {
                                    src: props.attributes.mediaURL,
                                    alt: props.attributes.alt,
                                    dataPosition: 'center center'
                                }
                            )
                        ), el(
                            'div',
                            { className: 'content' },
                            el(
                                'div',
                                { className: 'inner' },
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
                                                                className: 'components-toolbar__control has-icon is-pressed',
                                                                onClick: removeImage,
                                                            },
                                                            el(
                                                                Icon,
                                                                {
                                                                    icon: 'trash'
                                                                }
                                                            )
                                                        );

                                                        return [
                                                            addOrEditImageElement,
                                                            props.attributes.mediaID ? removeImageButtonElement : null
                                                        ];
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
                                                    style: {
                                                        background: 'transparent'
                                                    }
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
                                    ), el(
                                        'span',
                                        {
                                            className: props.attributes.buttonText ? 'button' : ''
                                        },
                                        el(
                                            PlainText,
                                            {
                                                inline: true,
                                                placeholder: 'Enter Button Text Here',
                                                value: props.attributes.buttonText,
                                                onChange: updateButtonText,
                                                style: {
                                                    background: 'transparent'
                                                }
                                            }
                                        )
                                    ),
                                ]
                            )
                        )
                    ]
                )
            },
            save: function(props) {
                if (props.attributes.link && props.attributes.mediaID) {
                    var imageElement = el(
                        'a',
                        {
                            href: props.attributes.link,
                            className: 'image'
                        },
                        el(
                            'img',
                            {
                                src: props.attributes.mediaURL,
                                alt: props.attributes.alt,
                                dataPosition: 'center center'
                            }
                        )
                    );
                } else if (props.attributes.mediaID) {
                    var imageElement = el(
                        'span',
                        {
                            className: 'image'
                        },
                        el(
                            'img',
                            {
                                src: props.attributes.mediaURL,
                                alt: props.attributes.alt,
                                dataPosition: 'center center'
                            }
                        )
                    );
                } else {
                    var imageElement = el(
                        'span',
                        {
                            className: 'image'
                        },
                    );
                }

                if (props.attributes.link && props.attributes.buttonText) {
                    var buttonElement = el(
                        'a',
                        {
                            href: props.attributes.link,
                            className: 'button',
                        },
                        props.attributes.buttonText
                    )
                } else if (props.attributes.buttonText) {
                    var buttonElement = el(
                        'span',
                        {
                            className: 'button',
                        },
                        props.attributes.buttonText
                    )
                } else {
                    var buttonElement = null
                }

                return el(
                    'section',
                    null,
                    [
                        imageElement,
                        el(
                            'div',
                            { className: 'content' },
                            el(
                                'div',
                                { className: 'inner' },
                                [
                                    el(
                                        'header',
                                        {className: 'major'},
                                        el(
                                            'h3',
                                            null,
                                            props.attributes.heading
                                        )
                                    ), el(
                                        'p',
                                        null,
                                        props.attributes.content
                                    ),
                                    buttonElement,
                                ]
                            )
                        )
                    ]
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

/* <section>
    <a href="generic.html" class="image">
        <img src="images/pic08.jpg" alt="" data-position="center center" />
    </a>
    <div class="content">
        <div class="inner">
            <header class="major">
                <h3>Orci maecenas</h3>
            </header>
            <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
            <ul class="actions">
                <li><a href="generic.html" class="button">Learn more</a></li>
            </ul>
        </div>
    </div>
</section> */