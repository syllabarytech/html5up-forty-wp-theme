<?php

namespace SyllabaryDotTech\Theme\Forty;

get_header();
?>
 
<!-- Main -->
    <div id="main" class="alt">

        <?php
			if ( have_posts() ) {
                while ( have_posts() ) {
                    the_post();
        ?>

            <section id="one">
                <div class="inner">
                    <header class="major">
                        <?php the_title('<h1>', '</h1>'); ?>
                    </header>
                    <?php the_content(); ?>
                </div>
            </section>

        <?php
                }
            }
        ?>

    </div>

<?php
get_footer();