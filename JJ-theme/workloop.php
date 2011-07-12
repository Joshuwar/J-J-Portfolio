 				<?php $work_loop = new WP_query( 
 						array(
							'post_type' => array('post', 'portfolio_items'),
							'category' => 'work'
						)
 					); 
 				 ?>
				<?php if ( $work_loop->have_posts() ) : while ( $work_loop->have_posts() ) : $work_loop->the_post(); ?>
				<div class="portfolioItem">
					<span class="categories"><?php 	foreach((get_the_category()) as $category) { 
												    echo $category->category_nicename;
												} ?></span>
					<div class="textPane">	
						<h1 id="<?php echo $post->post_name; ?>"><a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
						<?php $current_title = get_the_title(); 
								//echo 'current title 1:';
								//echo $current_title;
						
						?>


						<?php the_content(); ?>
						
						<?php  get_template_part( 'meta' ); ?>
					</div>
					<?php
					$size = 'portfolio-image';
					$images = get_children(array(
						'post_parent'    => get_the_ID(),
						'post_type'      => 'attachment',
						'numberposts'    => -1, // show all
						'post_status'    => null,
						'post_mime_type' => 'image',
						'order'          => 'ASC',
						'orderby'        => 'menu_order',
					));	
					if(count($images)>0) :
						echo '<div class="gallery">';
						foreach($images as $image) {
							
							// split thumbParams
							$params = get_post_meta($image->ID, '_thumbnailParams', true);
							$params = explode(',', $params);
							$leftOffset = $params[0];
							$topOffset = $params[1];
							$width = $params[2];
							
							// Other image meta
							$colour = get_post_meta($image->ID, '_thumbnailColour', true);
							$attimg  = wp_get_attachment_image_src($image->ID,$size);
							$attimgurl = $attimg[0];
							$atttitle = apply_filters('the_title',$image->post_title);
							
							$imgHtml = '<a name="'.$image->ID.'"><img ';
							if ($leftOffset) { 	$imgHtml .= "data-leftOffset='$leftOffset' ";} 
							if ($topOffset) { 	$imgHtml .= "data-topOffset='$topOffset' " ;} 
							if ($height) { 		$imgHtml .= "data-height='$height' ";} 
							if ($width) { 		$imgHtml .= "data-width='$width' ";}
							if ($colour) {		$imgHtml .= "data-colour='$colour'"; }
							$imgHtml .= 'class="portfolioImage" src="'.$attimgurl.'" alt="'.$attimgalt.'" title="'.$atttitle.'"/></a>';
							echo $imgHtml;	
						}
						echo '</div>'; ?>
					<div class="imageNav">
						<?php if (count($images) > 1) { ?>
						<span></span>
						<ul><?php
								foreach($images as $image) {
									$attimgalt = get_post_meta($image->ID, '_wp_attachment_image_alt', true);
									if ($attimgalt=='') {
										echo "<li><a rel='self' href='#".$image->ID."'>Image</a></li>";
									} else {
										echo "<li><a rel='self' href='#".$image->ID."'>$attimgalt</a></li>";
									}
								}
							}
						?></ul>
					</div>
					<?php else :
						echo "No Images Found";
					endif;
					?>
					<div class="nextTab">
						<?php
								$next_post = get_next_post(true);
								if ($next_post == "") {
									$cat = get_the_category();
									$catID = $cat[0]->cat_ID;
									$firstpost = new WP_query( 
				 						array(
											'post_type' => array('post', 'portfolio_items'),
											'cat' => $catID,
											'order' => 'ASC',
											'posts_per_page' => 1
										)
				 					); 
									if ( $firstpost->have_posts() ) : while ( $firstpost->have_posts() ) : $firstpost->the_post();
										$newtitle = get_the_title();
										if ($current_title == $newtitle) {
											// do nothing
											} else { ?>
											<a href="<?php the_permalink(); ?>" rel="bookmark">
												Next: <em><?php echo the_title(); ?></em>
											</a>	
											<?php 
											}
										endwhile;
										endif;
								} else { ?>
									<a class="left marginleft" href="<?php echo get_permalink($next_post->ID);?>">
							Next: 
								<span><em><?php echo $next_post->post_title; ?></em></span>
						</a> 
							<?php
								}
							?>
					</div>
					
				</div>
				<?php 
				endwhile;
				endif; ?>