<?php

require_once(__DIR__ . '/vendor/autoload.php');

new \Timber\Timber();
\Timber::$dirname = ['templates'];

new \SyllabaryDotTech\Theme\Forty\Forty();