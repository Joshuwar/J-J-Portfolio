 				<?php $work_loop = new WP_query( 'post_type=any' ); ?>
				<?php if ( $work_loop->have_posts() ) : while ( $work_loop->have_posts() ) : $work_loop->the_post(); ?>
				<div class="portfolioItem">
					<span class="topics"><?php the_category(',',''); ?></span>
					<div class="textPane margintopsmall">	
						<h2 id="<?php echo $post->post_name; ?>"><?php the_title(); ?></h2>

						<?php the_content(); ?>
						
						<div class="meta">
							<div>
								<h6><a href="http://<?php get_custom_field('_url'); ?>">Launch Site</a></h6>
								<br/>
								<h6>J&amp;J worked with:</h6>
								<p><?php get_custom_field('_collaborators'); ?></p>
							</div>
							<div class="marginleft">
								<p><em><?php get_custom_field('_testimonial'); ?></em></p>
								<span>- <?php get_custom_field('_testimonial_name'); ?></span>
							</div>
						</div>
						<a href="#">
							<div class="hireUs">
								<p><?php get_custom_field('_hireus'); ?></p>
								<span></span>
							</div>
						</a>
						<div class="margintop itemNav">
							<a class="left" href="#"><span class="backToGrid">Back to Grid</span></a>
							
							<a class="left marginleft" href="#">
								<span class="nextItem">Next: 
									<span><em>Bell Pottinger Sans Frontiers</em></span>
									<span class="point"></span>
								</span>
							</a>
						</div>
					</div>
					
						<?php attachment_toolbox('portfolio-image', "Bongo bongo bongo"); ?>
					
					<div class="imageNav"></div>
				</div>
				<?php 
				endwhile;
				endif; ?>