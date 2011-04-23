 				<?php $work_loop = new WP_query( 'category_name=work' ); ?>
				<?php if ( $work_loop->have_posts() ) : while ( $work_loop->have_posts() ) : $work_loop->the_post(); ?>
				<div class="portfolioItem">
					<div class="textPane margintopsmall">	
						<h2 id="<?php echo $post->post_name; ?>"><?php the_title(); ?></h2>

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
								<p><em>It's been a true delight to work with J&J. They are professional, fun, skilful and creative - a winning combination.</em></p>
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
					<div class="gallery">
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/woe.gif" class="portfolioImage" alt="main page" />
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/woe.gif" class="portfolioImage" alt="article page" />
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/woe.gif" class="portfolioImage" alt="book landing page" />
					</div>
					<div class="imageNav"></div>
				</div>
				<?php 
				endwhile;
				endif; ?>