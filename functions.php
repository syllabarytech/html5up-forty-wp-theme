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
 
add_action( 'wp_enqueue_scripts', 'enqueue_styles' );
add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );
add_action( 'wp_head', 'print_noscript_style' );
