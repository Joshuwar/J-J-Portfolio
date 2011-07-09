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

									<p><em><?php get_custom_field('_testimonial'); ?></em></p>
									<span>- <?php get_custom_field('_testimonial_name'); ?></span>

							</div>
						</div>
						<a href="<?php echo get_permalink_by_name('super-contact'); ?>">
						</a>
						<?php endif; ?>
							
						