				<?php get_header(); ?>				
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
				<div id="firstItem">
					<div class="textPane margintopsmall" id="mainTextPane">	
						<h2 id="<?php echo $post->post_name; ?>"><?php the_title(); ?></h2>

						<?php the_content(); ?>
						
						<?php  get_template_part( 'meta' ); ?>
						
					</div>
					<?php attachment_toolbox('portfolio-image', "Bongo bongo bongo"); ?>
					<div class="imageNav"></div>
				</div>

				<?php 
				endwhile;
				endif; ?>
				
				<?php get_footer(); ?>