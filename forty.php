<?php

namespace SyllabaryDotTech\Theme\Forty;

use Timber\Menu;
use Timber\Site;

class Forty extends Site {
	public function __construct() {
		add_filter( 'timber/context', [$this, 'add_to_context'] );
		add_filter( 'timber/twig', [$this, 'add_to_twig'] );
		add_action( 'init', [$this, 'register_post_types'] );
        add_action( 'init', [$this, 'register_taxonomies'] );
        add_action( 'init', [$this, 'add_menus'] );

        add_action( 'customize_register', [$this, 'add_theme_settings'] );
        add_action( 'wp_enqueue_scripts', [$this, 'add_styles'] );
        add_action( 'wp_enqueue_scripts', [$this, 'add_scripts'] );
        add_action( 'wp_head', [$this, 'add_noscript_styles'] );

        add_filter( 'nav_menu_link_attributes', [$this, 'add_menu_classes'], 1, 3 );

		parent::__construct();
    }
    
	public function register_post_types() {
    }

	public function register_taxonomies() {
    }
    
	public function add_to_context($context) {
		$context['menu']  = new Menu();
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

    public function forty_add_menus() {
        $locations = array(
            'primary'  => __( 'Desktop Primary Menu Links', 'forty' ),
            'actions' => __( 'Desktop Primary Menu Actions', 'forty' ),
            'social'   => __( 'Social Menu', 'forty' ),
        );

        register_nav_menus( $locations );
    }

    public function add_menu_classes($atts, $item, $args) {
        // @TODO: Add special cases to check for to add 'primary' to buttons?
        if ($args->menu == 'actions') {
            $atts['class'] = 'button fit';
        }
        return $atts;
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
