				<br class="clearboth" />
			</div> <!-- close .jbasewrap -->
			<div class="push"></div>
		</div> <!-- close #wrapper -->
		<div class="footer">
			<div id="leftColumn" class="left">
				<h3>Recent Work</h3>
				<ul>
					<li>
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/logo.png">
						<h4>Jeroboams</h4>
						<p>J&J made a lovely wine site for Jeroboams En Primeur campaigns. It has been an incredible success.</p>
					</li>
					<li class="alternate">
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/logo.png">
						<h4>Ambit</h4>
						<p>J&J made a lovely wine site for Jeroboams En Primeur campaigns. It has been an incredible success.</p>
					</li>
					<li>
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/logo.png">
						<h4>Avox</h4>
						<p>J&J made a lovely wine site for Jeroboams En Primeur campaigns. It has been an incredible success.</p>
					</li>
				</ul>
			</div>
			<div id="middleColumn">
				<div id="top">
					<div>
						<?php $query = new WP_Query( 'pagename=footer-about' ); ?>
						<?php if ($query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>
						<h3><?php the_title(); ?></h3>
						<?php the_content(); ?>
						<?php 
						endwhile;
						endif;
						?>
					</div>
					<div class="rightCol">
						<?php $query = new WP_Query( 'pagename=footer-contact' ); ?>
						<?php if ($query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>
						<h3><?php the_title(); ?></h3>
						<?php the_content(); ?>
						<?php 
						endwhile;
						endif;
						?>
					</div>
				</div>
				<div id="bottom">
					<div id="twitter">
						<h3><a href="#">J&amp;J on Twitter</a></h3>
						<?php 
						tweet_blender_widget(array(
						    'unique_div_id' => 'tweets',
						    'sources' => '@jayfresh,@josh_u_war',
						    'refresh_rate' => 60,
						    'tweets_num' => 1,
						    'view_more_url' => 'http://twitter.com/'
						));
						?>					
					</div>
					<div class="rightCol" id="delicious">
						<h3><a href="#">J&amp;J Like This</a></h3>
						
						<?php
							$view = 0;
							$thing = RSSImport(
								$display = 15, 
								$feedurl = 'http://friendfeed.com/?auth=lhH22jyOlL6q0sxe&format=atom',
								$before_desc = '',
								$displaydescriptions = 1,
								$after_desc = '',
								$html = 0,
								$truncatedescchar = 200,
								$truncatedescstring = ' ... ',
								$truncatetitlechar = '', $truncatetitlestring = ' ... ',
								$before_date = ' <small>', $date = 0, $after_date = '</small>', $date_format = '',
								$before_creator = ' <small>', $creator = 0, $after_creator = '</small>',
								$start_items = '<ul>', $end_items = '</ul>',
								$start_item = '<li>', $end_item = '</li>',
								$target = '',
								$rel = '',
								$desc4title = 0,
								$charsetscan = 0, $debug = 0,
								$before_noitems = '<p>', $noitems = 'No items, feed is empty.', $after_noitems = '</p>',
								$before_error = '<p>',
								$error = 'Error: Feed has a error or is not valid',
								$after_error = '</p>',
								$paging = 0,
								$prev_paging_link = '&laquo; Previous', $next_paging_link = 'Next &raquo;',
								$prev_paging_title = 'more items', $next_paging_title = 'more items',
								$use_simplepie = 1,
								$view = 0
							);
							// now, take "You: " off title
							echo $thing;
						?>
						
					</div>
				</div>
			</div>
			<div id="rightColumn">
				<?php $query = new WP_Query( 'pagename=colophon' ); ?>
				<?php if ($query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>
				<h3><?php the_title(); ?></h3>
				<?php the_content(); ?>
				<?php 
				endwhile;
				endif;
				?>
			</div>
			<div id="copyright">
				&copy;2010-2011 J&J - privacy policy - terms & conditions
			</div>
			
			
			
        </div>
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/jquery-1.4.1.js"></script>
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/jquery.scrollTo.js"></script>
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/app_new.js"></script>
		<?php wp_footer(); ?>
	</body>
</html>