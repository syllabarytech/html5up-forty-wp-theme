<?php

namespace SyllabaryDotTech\Theme\Forty;

use Timber;
use Timber\PostQuery;

$context = Timber::context();
$context['posts'] = new PostQuery();

$templates = ['index.twig'];

if (is_front_page()) {
    $templates = ['front-page.twig', ...$templates];
}

if (is_home()) {
    $templates = ['home.twig', ...$templates];
}

Timber::render($templates, $context);
