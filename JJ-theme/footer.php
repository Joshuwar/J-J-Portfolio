				<br class="clearboth" />
			</div> <!-- close .jbasewrap -->
			<div class="push"></div>
		</div> <!-- close #wrapper -->
		<div class="footer">
			<div class="left column">
				<h3>Recent Work</h3>
				<?php 
				$count = 0;
				$work_loop = new WP_query( 'post_type=portfolio_items&category=work&posts_per_page=2' ); 
				if ( $work_loop->have_posts() ) : ?>
				<ul>
				 <?php while ( $work_loop->have_posts() ) : $work_loop->the_post(); ?>
					<li>
						<h4 id="<?php echo $post->post_name; ?>"><a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
						<?php the_excerpt(); ?>
					</li>
					<?php $count++;	?>
					<?php endwhile; ?>
				</ul>
				<?php endif; ?>
			</div>
			<div class="column left marginleft">
				<h3>Information</h3>					
				<?php $query = new WP_Query( 'pagename=footer-about' ); ?>
				<?php if ($query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>
				<?php the_content(); ?>
				<?php 
				endwhile;
				endif;
				?>
			</div>
			<div class="column left marginleft">
				<h3>On Twitter</h3>
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
			<div id="copyright">
				&copy;2010-2011 J&J - privacy policy - terms & conditions
			</div>
			
			
			
        </div>
        <script type="text/javascript">
        	window.hrefBase = "<?php bloginfo('url'); ?>";
        </script>
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/jquery-1.6.1.js"></script>
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/jquery.scrollTo.js"></script>
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/fragIDNav.js"></script>
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/portfolio.js"></script>
		<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/app.js"></script>
		<?php wp_footer(); ?>
	</body>
</html>