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
                'file' => 'sections/banner.js',
                'dependencies' => ['wp-blocks', 'wp-components', 'wp-element', 'wp-block-editor'],
            ],

            'spotlights' => [
                'file' => 'sections/spotlights.js',
                'dependencies' => ['wp-blocks', 'wp-components', 'wp-element'],
            ],
            'spotlight' => [
                'file' => 'items/spotlight.js',
                'dependencies' => ['wp-blocks', 'wp-components', 'wp-element'],
            ],

            'tiles' => [
                'file' => 'sections/tiles.js',
                'dependencies' => ['wp-blocks', 'wp-element', 'wp-block-editor'],
            ],
            'tile' => [
                'file' => 'items/tile.js',
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
        $context['menu']['social'] = new Menu('social');

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
            'social'   => __( 'Social Menu', 'forty' ),
        );

        register_nav_menus( $locations );
    }

    public function add_theme_settings($wpc) {
        $wpc->add_setting('logo_text_primary', ['default' => 'Forty', 'type' => 'theme_mod']);
        $wpc->add_setting('logo_text_secondary', ['default' => 'By HTML5UP', 'type' => 'theme_mod']);

        $wpc->add_control(new WP_Customize_Control($wpc, 'logo_text_primary', [
            'label' => __('Primary Logo Text', 'forty'),
            'section' => 'title_tagline',
            'settings' => 'logo_text_primary',
            'type' => 'text'
        ]));
        $wpc->add_control(new WP_Customize_Control($wpc, 'logo_text_secondary', [
            'label' => __('Secondary Logo Text', 'forty'),
            'section' => 'title_tagline',
            'settings' => 'logo_text_secondary',
            'type' => 'text'
        ]));
    }
}
