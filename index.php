<?php

namespace SyllabaryDotTech\Theme\Forty;

use Timber;
use Timber\PostQuery;

$context = Timber::context();
$context['posts'] = new PostQuery();

$templates = ['index.twig'];

if (is_front_page()) {
    array_unshift($templates, 'front-page.twig');
}

if (is_home()) {
    array_unshift($templates, 'home.twig');
}

Timber::render($templates, $context);
