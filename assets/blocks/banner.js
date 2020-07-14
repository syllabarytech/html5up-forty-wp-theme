(function(blocks, components, element, blockEditor, data, coreData) {
    var el = element.createElement;
    var MediaUpload = blockEditor.MediaUpload;
	var PlainText = blockEditor.PlainText;
    var RichText = blockEditor.RichText;
    var Icon = components.Icon;
    var Button = components.Button;
    var useSelect = wp.data.useSelect;
    var useEntityProp = wp.coreData.useEntityProp;
 
    blocks.registerBlockType(
        'forty/banner',
        {
            title: 'Banner',
            // description: '',
            icon: 'camera',
            category: 'forty-theme',
            supports: {
                anchor: true,
                customClassName: false,
                multiple: false,
            },
            example: {},
            edit: function(props) {
                var postType = useSelect(
                    function(select) {
                        return select('core/editor').getCurrentPostType();
                    },
                    []
                );

                var [meta, setMeta] = useEntityProp('postType', postType, 'meta')
                var {
                    forty_banner_media_id: mediaID,
                    forty_banner_media_url: mediaURL,
                    forty_banner_heading: heading,
                    forty_banner_content: content
                 } = meta;

                var updateImage = function(value) {
                    setMeta(
                        Object.assign(
                            {},
                            meta,
                            {
                                'forty_banner_media_id': value.id,
                                'forty_banner_media_url': value.url,
                                'forty_banner_media_alt': value.alt,
                            }
                        )
                    );
                };

                var updateHeading = function(value) {
                    setMeta(
                        Object.assign(
                            {},
                            meta,
                            { 'forty_banner_heading': value }
                        )
                    );
                }
                var updateContent = function(value) {
                    setMeta(
                        Object.assign(
                            {},
                            meta,
                            { 'forty_banner_content': value }
                        )
                    );
                }

                return el(
                    'section',
                    {
                        id: 'banner',
                        className: 'major',
                        style: {
                            backgroundImage: mediaID ? 'url(' + mediaURL + ')' : ''
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
                                    value: mediaID,
                                    render: function( obj ) {
                                        return el(
                                            Button,
                                            {
                                                className: 'components-toolbar__control has-icon' + (mediaID ? ' is-pressed' : ''),
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
                                    'h1',
                                    null,
                                    el(
                                        PlainText,
                                        {
                                            inline: true,
                                            placeholder: 'Enter Heading Here',
                                            value: heading,
                                            onChange: updateHeading,
                                            style: {
                                                background: 'transparent'
                                            }
                                        }
                                    )
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
                                        value: content,
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
            save: function() {
                return null;
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.components,
    window.wp.element,
    window.wp.blockEditor,
    window.wp.data,
    window.wp.coreData,
));
