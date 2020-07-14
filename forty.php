<?php

namespace SyllabaryDotTech\Theme\Forty;

use Timber\Menu;
use Timber\Site;
use WP_Customize_Control;

class Forty extends Site {
    public function __construct() {
        add_filter('timber/context', [$this, 'add_to_context']);
        add_filter('timber/twig', [$this, 'add_to_twig']);
        add_filter('block_categories', [$this, 'register_block_categories'], 10, 1);

        add_action('init', [$this, 'register_post_types']);
        add_action('init', [$this, 'register_taxonomies']);
        add_action('init', [$this, 'register_blocks']);
        add_action('init', [$this, 'register_metadata']);
        add_action('init', [$this, 'add_menus']);

        add_action('customize_register', [$this, 'add_theme_settings']);
        add_action('wp_enqueue_scripts', [$this, 'add_styles']);
        add_action('wp_enqueue_scripts', [$this, 'add_scripts']);
        add_action('wp_head', [$this, 'add_noscript_styles']);
        add_action('enqueue_block_editor_assets', [$this, 'add_block_editor_styles']);

        parent::__construct();
    }
    
    public function register_post_types() {
    }

    public function register_taxonomies() {
    }

    public function register_metadata() {
        register_post_meta('', 'forty_banner_media_id', ['type' => 'number', 'single' => true, 'show_in_rest' => true]);
        register_post_meta('', 'forty_banner_media_url', ['type' => 'string', 'single' => true, 'show_in_rest' => true]);
        register_post_meta('', 'forty_banner_media_alt', ['type' => 'string', 'single' => true, 'show_in_rest' => true]);
        register_post_meta('', 'forty_banner_heading', ['type' => 'string', 'single' => true, 'show_in_rest' => true]);
        register_post_meta('', 'forty_banner_content', ['type' => 'string', 'single' => true, 'show_in_rest' => true]);
    }

    public function register_block_categories($categories) {
        // Use unshift here to put this category before the rest
        array_unshift($categories, [
            'slug' => 'forty-theme',
            'title' => sprintf('%s (%s)', __('Forty'), __('Theme')),
            'icon' => 'admin-appearance',
        ]);

        return $categories;
    }

    public function register_blocks() {
        if (!function_exists('register_block_type')) {
            return;
        }

        // @TODO: Maybe look into block style variations for sections
        $blocks = [
            'banner' => [
                'file' => 'banner.js',
                'dependencies' => ['wp-blocks', 'wp-components', 'wp-element', 'wp-block-editor', 'wp-data', 'wp-core-data'],
            ],

            'generic' => [
                'file' => 'sections/generic.js',
                'dependencies' => ['wp-blocks', 'wp-element', 'wp-block-editor'],
            ],

            'button-group' => [
                'file' => 'button-group.js',
                'dependencies' => ['wp-blocks', 'wp-element', 'wp-block-editor'],
            ],
            'button' => [
                'file' => 'button.js',
                'dependencies' => ['wp-blocks', 'wp-element', 'wp-block-editor'],
            ],

            'heading' => [
                'file' => 'heading.js',
                'dependencies' => ['wp-blocks', 'wp-components', 'wp-element', 'wp-block-editor', 'wp-keycodes'],
            ],

            'spotlights' => [
                'file' => 'sections/spotlights.js',
                'dependencies' => ['wp-blocks', 'wp-element', 'wp-block-editor'],
            ],
            'spotlight' => [
                'file' => 'spotlight.js',
                'dependencies' => ['wp-blocks', 'wp-components', 'wp-element', 'wp-block-editor'],
            ],

            'tiles' => [
                'file' => 'sections/tiles.js',
                'dependencies' => ['wp-blocks', 'wp-element', 'wp-block-editor'],
            ],
            'tile' => [
                'file' => 'tile.js',
                'dependencies' => ['wp-blocks', 'wp-components', 'wp-element', 'wp-block-editor'],
            ],
        ];

        foreach ($blocks as $block => ['file' => $file, 'dependencies' => $dependencies]) {
            $blockName = "forty/${block}";
            $scriptName = "${block}-block";
            $fileURI = get_template_directory_uri() . "/assets/blocks/${file}";
            $blockConfiguration = ['editor_script' => $scriptName];

            wp_register_script($scriptName, $fileURI, $dependencies);
            register_block_type($blockName, $blockConfiguration);
        }
    }
    
    public function add_to_context($context) {
        $context['menu']['primary'] = new Menu('primary');
        $context['menu']['actions'] = new Menu('actions');

        $context['site']  = $this;

        return $context;
    }
    
    public function add_to_twig($twig) {
        return $twig;
    }
    
    public function add_styles() {
        wp_enqueue_style( 'fontawesome', get_template_directory_uri() . '/assets/css/fontawesome-all.min.css', false );
        wp_enqueue_style( 'source-sans-pro', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300italic,600,600italic', false );
        wp_enqueue_style( 'style', get_template_directory_uri() . '/style.css', ['fontawesome', 'source-sans-pro'] );
    }

    public function add_scripts() {
        wp_enqueue_script( 'jquery', get_template_directory_uri() . '/assets/js/jquery.min.js', false, false, true );
        wp_enqueue_script( 'jquery.scrolly', get_template_directory_uri() . '/assets/js/jquery.scrolly.min.js', ['jquery'], false, true );
        wp_enqueue_script( 'jquery.scrollex', get_template_directory_uri() . '/assets/js/jquery.scrollex.min.js', ['jquery'], false, true );
        wp_enqueue_script( 'browser', get_template_directory_uri() . '/assets/js/browser.min.js', false, false, true );
        wp_enqueue_script( 'breakpoints', get_template_directory_uri() . '/assets/js/breakpoints.min.js', false, false, true );
        wp_enqueue_script( 'util', get_template_directory_uri() . '/assets/js/util.js', false, false, true );
        wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/js/main.js', ['jquery.scrolly', 'jquery.scrollex', 'browser', 'breakpoints', 'util' ], false, true );
    }

    public function add_noscript_styles() {
        printf('<noscript><link rel="stylesheet" href="%s" /></noscript>',  get_template_directory_uri() . '/assets/css/noscript.css');
    }

    public function add_block_editor_styles() {
        wp_enqueue_style( 'block-style', get_template_directory_uri() . '/block.style.css', false );
    }

    public function add_menus() {
        $locations = array(
            'primary'  => __( 'Desktop Primary Menu Links', 'forty' ),
            'actions' => __( 'Desktop Primary Menu Actions', 'forty' ),
        );

        register_nav_menus( $locations );
    }

    public function add_theme_settings($wpc) {
        // $wpc->add_section('footer', ['title' => 'Footer Configuration']);
        $wpc->add_panel('footer', [
            'title' => 'Footer Configuration',
            'description' => 'This panel is used for managing the content displayed in the site footer.'
        ]);

        $wpc->add_section('footer_contact', [
            'title' => 'Contact Details',
            'description' => 'Your contact information displayed in the site footer.',
            'panel' => 'footer',
        ]);
        $wpc->add_setting('footer_contact_form', ['default' => true, 'type' => 'theme_mod']);
        $wpc->add_setting('footer_contact_email', ['default' => '', 'type' => 'theme_mod']);
        $wpc->add_setting('footer_contact_phone', ['default' => '', 'type' => 'theme_mod']);
        $wpc->add_setting('footer_contact_address', ['default' => '', 'type' => 'theme_mod']);

        $wpc->add_section('footer_social', [
            'title' => 'Social Media Accounts',
            'description' => 'Your social media accounts to link in the site footer.',
            'panel' => 'footer',
        ]);
        $wpc->add_setting('footer_social_twitter', ['default' => '', 'type' => 'theme_mod']);
        $wpc->add_setting('footer_social_facebook', ['default' => '', 'type' => 'theme_mod']);
        $wpc->add_setting('footer_social_instagram', ['default' => '', 'type' => 'theme_mod']);
        $wpc->add_setting('footer_social_github', ['default' => '', 'type' => 'theme_mod']);
        $wpc->add_setting('footer_social_linkedin', ['default' => '', 'type' => 'theme_mod']);

        $wpc->add_section('footer_attributions', [
            'title' => 'Attributions',
            'description' => 'Attribution details.',
            'panel' => 'footer',
        ]);
        $wpc->add_setting('footer_attribution_html5up', ['default' => true, 'type' => 'theme_mod']);
        $wpc->add_setting('footer_attribution_syllabary', ['default' => true, 'type' => 'theme_mod']);

        $wpc->add_section('footer_copyright', [
            'title' => 'Copyright',
            'panel' => 'footer',
        ]);
        $wpc->add_setting('footer_copyright', ['default' => '', 'type' => 'theme_mod']);

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_contact_form', [
            'label' => 'Show Contact Form',
            'description' => 'This also requires an email address to be provided below.',
            'section' => 'footer_contact',
            'settings' => 'footer_contact_form',
            'type' => 'checkbox'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_contact_email', [
            'label' => 'Email',
            'section' => 'footer_contact',
            'settings' => 'footer_contact_email',
            'type' => 'email'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_contact_phone', [
            'label' => 'Phone',
            'section' => 'footer_contact',
            'settings' => 'footer_contact_phone',
            'type' => 'tel'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_contact_address', [
            'label' => 'Address',
            'section' => 'footer_contact',
            'settings' => 'footer_contact_address',
            'type' => 'textarea'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_social_twitter', [
            'label' => 'Twitter Username',
            'description' => 'https://twitter.com/<strong>[username]</strong>',
            'section' => 'footer_social',
            'settings' => 'footer_social_twitter',
            'type' => 'text'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_social_facebook', [
            'label' => 'Facebook Username',
            'description' => 'https://www.facebook.com/<strong>[username]</strong>',
            'section' => 'footer_social',
            'settings' => 'footer_social_facebook',
            'type' => 'text'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_social_instagram', [
            'label' => 'Instagram Username',
            'description' => 'https://www.instagram.com/<strong>[username]</strong>/',
            'section' => 'footer_social',
            'settings' => 'footer_social_instagram',
            'type' => 'text'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_social_github', [
            'label' => 'GitHub Username',
            'description' => 'https://github.com/<strong>[username]</strong>/',
            'section' => 'footer_social',
            'settings' => 'footer_social_github',
            'type' => 'text'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_social_linkedin', [
            'label' => 'LinkedIn Username',
            'description' => 'https://www.linkedin.com/in/<strong>[username]</strong>/',
            'section' => 'footer_social',
            'settings' => 'footer_social_linkedin',
            'type' => 'text'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_attribution_html5up', [
            'label' => 'HTML5UP Attribution',
            'description' => 'Attribute design to <a href="https://html5up.net/">HTML5UP</a>. Required unless theme was purchased through <a href="https://pixelarity.com/">Pixelarity</a>.',
            'section' => 'footer_attributions',
            'settings' => 'footer_attribution_html5up',
            'type' => 'checkbox'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_attribution_syllabary', [
            'label' => 'Syllabary Attribution',
            'description' => 'Attribute WordPress port to <a href="https://syllabary.tech/">Syllabary</a>. Optional.',
            'section' => 'footer_attributions',
            'settings' => 'footer_attribution_syllabary',
            'type' => 'checkbox'
        ]));

        $wpc->add_control(new WP_Customize_Control($wpc, 'footer_copyright', [
            'label' => 'Copyright Holder',
            'section' => 'footer_copyright',
            'settings' => 'footer_copyright',
            'type' => 'text'
        ]));
    }
}
