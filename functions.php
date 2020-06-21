<?php

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require $composer;
}

function enqueue_styles() {
    wp_enqueue_style( 'fontawesome', get_template_directory_uri() . '/assets/css/fontawesome-all.min.css', false );
    wp_enqueue_style( 'source-sans-pro', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300italic,600,600italic', false );
    wp_enqueue_style( 'style', get_template_directory_uri() . '/style.css', ['fontawesome', 'source-sans-pro'] );
}

function enqueue_scripts() {
    wp_enqueue_script( 'jquery', get_template_directory_uri() . '/assets/js/jquery.min.js', false, false, true );
    wp_enqueue_script( 'jquery.scrolly', get_template_directory_uri() . '/assets/js/jquery.scrolly.min.js', ['jquery'], false, true );
    wp_enqueue_script( 'jquery.scrollex', get_template_directory_uri() . '/assets/js/jquery.scrollex.min.js', ['jquery'], false, true );
    wp_enqueue_script( 'browser', get_template_directory_uri() . '/assets/js/browser.min.js', false, false, true );
    wp_enqueue_script( 'breakpoints', get_template_directory_uri() . '/assets/js/breakpoints.min.js', false, false, true );
    wp_enqueue_script( 'util', get_template_directory_uri() . '/assets/js/util.js', false, false, true );
    wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/js/main.js', ['jquery.scrolly', 'jquery.scrollex', 'browser', 'breakpoints', 'util' ], false, true );
}

function print_noscript_style() {
    printf('<noscript><link rel="stylesheet" href="%s" /></noscript>',  get_template_directory_uri() . '/assets/css/noscript.css');
}

function add_menus() {
	$locations = array(
		'primary'  => __( 'Desktop Primary Menu Links', 'forty' ),
		'actions' => __( 'Desktop Primary Menu Actions', 'forty' ),
		'social'   => __( 'Social Menu', 'forty' ),
	);

	register_nav_menus( $locations );
}

function add_menu_classes($atts, $item, $args) {
    // @TODO: Add special cases to check for to add 'primary' to buttons?
    if ($args->menu == 'actions') {
        $atts['class'] = 'button fit';
    }
    return $atts;
}

add_action( 'init', 'add_menus' );
add_filter( 'nav_menu_link_attributes', 'add_menu_classes', 1, 3 );
add_action( 'wp_enqueue_scripts', 'enqueue_styles' );
add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );
add_action( 'wp_head', 'print_noscript_style' );
