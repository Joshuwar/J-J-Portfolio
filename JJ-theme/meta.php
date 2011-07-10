<?php if ($post->post_type == "portfolio_items") : // Do the portfolio meta (if appropriate) ?>
						<div class="meta">
							<?php
								$collaborators = get_post_meta($post->ID,'_collaborators',true);
								$testimonial = get_post_meta($post->ID,'_testimonial',true);
								$testimonial_name = get_post_meta($post->ID,'_testimonial_name',true);
							?>
							<div>
								<h6><a href="http://<?php get_custom_field('_url'); ?>">Launch Site</a></h6>
								<br/>
								<?php if($collaborators) :?>
								<h6>J&amp;J worked with:</h6>
								<p><?php echo $collaborators; ?></p>
								<?php endif; ?>
							</div>
							<div class="marginleft">
								<?php if($testimonial) :?>
								<h6>Testimonial</h6>
									<p><em><?php echo $testimonial; ?></em></p>
									<span>- <?php echo $testimonial_name; ?></span>
								<?php endif; ?>
							</div>
						</div>
						<a href="<?php echo get_permalink_by_name('super-contact'); ?>">
						</a>
						<?php endif; ?>
							
						