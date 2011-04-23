				<?php get_header(); ?>

				<?php $query = new WP_Query( 'pagename=home-screen' ); ?>
				
				<?php if ($query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>
				<?php echo $the_post; ?>
				<div id="firstItem">
					<div class="textPane margintopsmall" id="mainTextPane">	
						<?php the_content(); ?>
					</div>
					
					
					<div class="gallery" id="thumbnailGallery"></div>
					<div class="imageNav"></div>
				</div>

				<?php 
				endwhile;
				endif;
				?>
				<?php get_template_part( 'workloop' ); ?>

				
				<?php get_footer(); ?>