 				<?php $work_loop = new WP_query( 'post_type=any' ); ?>
				<?php if ( $work_loop->have_posts() ) : while ( $work_loop->have_posts() ) : $work_loop->the_post(); ?>
				<div class="portfolioItem">
					<span class="topics"><?php the_category(',',''); ?></span>
					<div class="textPane margintopsmall">	
						<h2 id="<?php echo $post->post_name; ?>"><a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

						<?php the_content(); ?>
						
						<?php  get_template_part( 'meta' ); ?>
					</div>
					
						<?php attachment_toolbox('portfolio-image', "Bongo bongo bongo"); ?>
					
					<div class="imageNav"></div>
				</div>
				<?php 
				endwhile;
				endif; ?>