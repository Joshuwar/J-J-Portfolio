<?php if ($post->post_type == "portfolio_items") : // Do the portfolio meta (if appropriate) ?>
						<div class="meta">
							<div>
								<h6><a href="http://<?php get_custom_field('_url'); ?>">Launch Site</a></h6>
								<br/>
								<h6>J&amp;J worked with:</h6>
								<p><?php get_custom_field('_collaborators'); ?></p>
							</div>
							<div class="marginleft">
								<h6>Testimonial</h6>

									<p class="marginleft"><em><?php get_custom_field('_testimonial'); ?></em></p>
									<span>- <?php get_custom_field('_testimonial_name'); ?></span>

							</div>
						</div>
						<a href="#">
							<div class="hireUs">
								<p><?php get_custom_field('_hireus'); ?></p>
								<span></span>
							</div>
						</a>
						<?php endif; ?>
						<div class="margintop itemNav">
							<a class="left" href="#"><span class="backToGrid">Back to Grid</span></a>
							<?php 	
									$next_post = get_next_post();
									if ($next_post != "") :									
							 ?>
							<a class="left marginleft" href="<?php echo $next_post->guid; ?>">
								<span class="nextItem">Next: 
									<span><em><?php echo $next_post->post_title; ?></em></span>
									<span class="point"></span>
								</span>
							</a>
							<?php endif; ?>
						</div>
							
						