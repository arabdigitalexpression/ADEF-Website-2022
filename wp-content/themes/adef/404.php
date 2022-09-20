<?php
get_header();
?>

<main id="site-content vh-100">

	<div class="section-inner thin error404-content vh-100 d-flex justify-content-center align-items-center flex-column">
		<h1 class="entry-title" style="font-size: 10rem;" data-i18n="_404"><?php _e('404', 'adef'); ?></h1>
		<p class="lead" style="font-size: 2rem;letter-spacing:3px" data-i18n="not_found"><?php _e('Page Not Found', 'adef'); ?></p>

	</div><!-- .section-inner -->

</main><!-- #site-content -->

<?php
get_footer();
