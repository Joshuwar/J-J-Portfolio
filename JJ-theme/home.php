				<?php get_header(); ?>

				<?php $query = new WP_Query( 'pagename=home-screen' ); ?>
				
				<?php if ($query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>
				<?php echo $the_post; ?>
				
				<div class="gallery" id="thumbnailGallery"></div>
				
				<div class="textPane" id="mainTextPane">	
					<div id="root">
						<?php the_content(); ?>
					</div>
					 <?php 
					 	$categories = get_categories(); 
					 	foreach ($categories as $category) {
					 	 	$cat_slug = $category->slug;
					 	 	$cat_desc = $category->category_description; 
					 	 	if ($cat_desc != '') { ?>
					 	 		<div id="<?php echo($cat_slug); ?>" class="categoryContent">
					 	 			<?php echo($cat_desc); ?>
					 	 		</div>
					 	 		<?php
					 	 	}
					 	} ?>
				</div>
				
				<?php 
				endwhile;
				endif;
				?>
				<?php get_template_part( 'workloop' ); ?>

			
				<?php get_footer(); ?>