				<?php get_header(); ?>
				
				<?php $firstitem = 1; // var to do the first post differently ?>
				
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
				<div <?php if ($firstitem == 1) : 
					echo 'id="firstItem"';
				else:
					echo 'class="portfolioItem"';
				endif;?>>
					<?php if($firstitem == 0) : ?><span class="topics">hello</span><?php endif; ?>
					<div class="textPane margintopsmall" <?php if ($firstitem == 1) : echo 'id="mainTextPane"'; endif;?>>	
						<h2 id="<?php echo $post->post_name; ?>"><?php the_title(); ?></h2>
						<?php // the_category(); ?>
						<?php // the_tags(); ?>
						<?php the_content(); ?>
						
						<div class="meta">
							<div>
								<h6><a href="#">Launch Site</a></h6>
								<br/>
								<h6>J&amp;J worked with:</h6>
								<p>Illustrator Dude</p>
							</div>
							<div class="marginleft">
								<h6>Testimonial</h6>
								<p><em>J&J were fantastic chaps to work with because they were simply incredible.</em></p>
								<span>- Chris Lloyd</span>
							</div>
						</div>
						<a href="#">
							<div class="hireUs">
								<?php the_excerpt(); ?>
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
					<?php if ($firstitem == 1) : ?>
					<div class="gallery" id="thumbnailGallery"></div>
					<?php else : ?>	
					<div class="gallery">
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/woe.gif" class="portfolioImage" alt="main page" />
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/woe.gif" class="portfolioImage" alt="article page" />
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/woe.gif" class="portfolioImage" alt="book landing page" />
					</div>
					<?php endif; ?>
					<div class="imageNav"></div>
				</div>
				<?php $firstitem = 0; ?>
				<?php 
				endwhile;
				endif; ?>
				
				<?php get_footer(); ?>