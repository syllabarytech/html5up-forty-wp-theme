<?php

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require $composer;
}

function forty_enqueue_styles() {
    wp_enqueue_style( 'fontawesome', get_template_directory_uri() . '/assets/css/fontawesome-all.min.css', false );
    wp_enqueue_style( 'source-sans-pro', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300italic,600,600italic', false );
    wp_enqueue_style( 'style', get_template_directory_uri() . '/style.css', ['fontawesome', 'source-sans-pro'] );
}

function forty_enqueue_scripts() {
    wp_enqueue_script( 'jquery', get_template_directory_uri() . '/assets/js/jquery.min.js', false, false, true );
    wp_enqueue_script( 'jquery.scrolly', get_template_directory_uri() . '/assets/js/jquery.scrolly.min.js', ['jquery'], false, true );
    wp_enqueue_script( 'jquery.scrollex', get_template_directory_uri() . '/assets/js/jquery.scrollex.min.js', ['jquery'], false, true );
    wp_enqueue_script( 'browser', get_template_directory_uri() . '/assets/js/browser.min.js', false, false, true );
    wp_enqueue_script( 'breakpoints', get_template_directory_uri() . '/assets/js/breakpoints.min.js', false, false, true );
    wp_enqueue_script( 'util', get_template_directory_uri() . '/assets/js/util.js', false, false, true );
    wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/js/main.js', ['jquery.scrolly', 'jquery.scrollex', 'browser', 'breakpoints', 'util' ], false, true );
}

function forty_print_noscript_style() {
    printf('<noscript><link rel="stylesheet" href="%s" /></noscript>',  get_template_directory_uri() . '/assets/css/noscript.css');
}

function forty_add_menus() {
	$locations = array(
		'primary'  => __( 'Desktop Primary Menu Links', 'forty' ),
		'actions' => __( 'Desktop Primary Menu Actions', 'forty' ),
		'social'   => __( 'Social Menu', 'forty' ),
	);

	register_nav_menus( $locations );
}

function forty_add_menu_classes($atts, $item, $args) {
    // @TODO: Add special cases to check for to add 'primary' to buttons?
    if ($args->menu == 'actions') {
        $atts['class'] = 'button fit';
    }
    return $atts;
}

function forty_add_theme_settings($wpc) {
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

add_action( 'customize_register', 'forty_add_theme_settings' );
add_action( 'init', 'forty_add_menus' );
add_action( 'wp_enqueue_scripts', 'forty_enqueue_styles' );
add_action( 'wp_enqueue_scripts', 'forty_enqueue_scripts' );
add_action( 'wp_head', 'forty_print_noscript_style' );

add_filter( 'nav_menu_link_attributes', 'forty_add_menu_classes', 1, 3 );