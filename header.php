<?php

namespace SyllabaryDotTech\Theme\Forty;

?><html <?php language_attributes(); ?>>
	<head>
		<title><?php wp_title('&raquo;','true','right'); ?><?php bloginfo('name'); ?></title>
		<meta charset="<?php bloginfo('charset'); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <?php wp_head(); ?>
	</head>
	<body <?php body_class("is-preload"); ?>>

		<?php wp_body_open(); ?>

		<!-- Wrapper -->
			<div id="wrapper">

				<!-- Header -->
					<header id="header" class="alt">
						<a href="index.html" class="logo">
							<strong><?php echo get_theme_mod('logo_text_primary', 'Forty') ?></strong>
							<span><?php echo get_theme_mod('logo_text_secondary', 'By HTML5UP') ?></span>
						</a>
						<?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'actions' ) ) { ?>
							<nav>
								<a href="#menu">Menu</a>
							</nav>
				        <?php } ?>
					</header>

				<!-- Menu -->
					<?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'actions' ) ) { ?>
						<nav id="menu">
							<?php
								if ( has_nav_menu( 'primary' ) ) {
									wp_nav_menu(['menu' => 'primary', 'menu_class' => 'links', 'container' => false, 'fallback_cb' => false]);
								}

								if ( has_nav_menu( 'actions' ) ) {
									wp_nav_menu(['menu' => 'actions', 'menu_class' => 'actions stacked', 'container' => false, 'fallback_cb' => false]);
								}
							?>
						</nav>
					<?php } ?>
