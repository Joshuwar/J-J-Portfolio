<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<title><?php
			/*
			 * Print the <title> tag based on what is being viewed.
			 */
			global $page, $paged;
		
			wp_title( '|', true, 'right' );
		
			// Add the blog name.
			bloginfo( 'name' );
		
			// Add the blog description for the home/front page.
			$site_description = get_bloginfo( 'description', 'display' );
			if ( $site_description && ( is_home() || is_front_page() ) )
				echo " | $site_description";
		
			// Add a page number if necessary:
			if ( $paged >= 2 || $page >= 2 )
				echo ' | ' . sprintf( __( 'Page %s', 'twentyten' ), max( $paged, $page ) );
		?></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="<?php bloginfo( 'template_url' ); ?>/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="<?php bloginfo( 'template_url' ); ?>/css/j-base.css" />
		<link rel="stylesheet" type="text/css" href="<?php bloginfo( 'template_url' ); ?>/css/grid.css" />
		<link rel="stylesheet" type="text/css" href="<?php bloginfo( 'stylesheet_directory' ); ?>/css/stickyfooter.css" />
		<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
		<link href='http://fonts.googleapis.com/css?family=Crimson+Text:regular,regularitalic,600,600italic,bolditalic' rel='stylesheet' type='text/css' />
		<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css' />
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
		<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/images/favicon.ico" />
		<script type="text/javascript">
			document.documentElement.className = "js";
		</script>
		<?php wp_head(); ?>
	</head>
	<body>
		<div id="wrapper">
			<div id="header">
				<h1>J&amp;J</h1>
				<?php wp_nav_menu( array(
					'container'		 => 'false',
					'theme_location' => 'top_menu', 
					)
				); ?>
			</div>
			<div class="jbasewrap" id="portfolio">