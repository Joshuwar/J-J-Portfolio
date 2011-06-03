 				<?php $work_loop = new WP_query( 
 						array(
							'post_type' => array('post', 'portfolio_items'),
							'category' => 'work'
						)
 					); 
 				 ?>
				<?php if ( $work_loop->have_posts() ) : while ( $work_loop->have_posts() ) : $work_loop->the_post(); ?>
				<div class="portfolioItem">
					<span class="topics"><?php the_category(',',''); ?></span>
					<div class="textPane margintopsmall">	
						<h2 id="<?php echo $post->post_name; ?>"><a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

						<?php the_content(); ?>
						
						<?php  get_template_part( 'meta' ); ?>
					</div>
					
						<?php attachment_toolbox('portfolio-image', "No Images Found"); ?>
					
					<div class="imageNav"></div>
				</div>
				<?php 
				endwhile;
				endif; ?>