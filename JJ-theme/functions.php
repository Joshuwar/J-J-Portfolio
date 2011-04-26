<?php

// Thumbnail Images
add_theme_support( 'post-thumbnails' );
add_image_size( 'portfolio-image', 598, 3000, false ); 



// Page Excerpts
add_post_type_support( 'page', 'excerpt' );


// Menus
if ( function_exists( 'register_nav_menu' ) ) {
	register_nav_menu( 'top_menu', 'Top Menu' );
}


// Image Presentation for Portfolio Items
function attachment_toolbox($size = 'portfolio-image', $emptyMsg = 'EMPTY') {

	$images = get_children(array(
		'post_parent'    => get_the_ID(),
		'post_type'      => 'attachment',
		'numberposts'    => -1, // show all
		'post_status'    => null,
		'post_mime_type' => 'image',
		'order'          => 'ASC',
		'orderby'        => 'menu_order',
	));			
	
	$count = 0;
	$out = '<div class="gallery">';
	foreach($images as $image) {
		$attimg  = wp_get_attachment_image_src($image->ID,$size);
		$attimgurl = $attimg[0];
		$atturl   = wp_get_attachment_url($image->ID);
		$attlink  = get_attachment_link($image->ID);
		$postlink = get_permalink($image->post_parent);
		$atttitle = apply_filters('the_title',$image->post_title);
		$attcontent = $image->post_content;
		$imglink	= $image->guid;
		$attimgalt	= get_post_meta($image->ID, '_wp_attachment_image_alt', true);
		$out .= '<img class="portfolioImage" src="'.$attimgurl.'" alt="'.$attimgalt.'"/>';
		$count++;
		
	}
	$out .= '</div>';
	if($count>0) {	
		echo $out;

	} else {
		echo $emptyMsg;
	}
	return $count;
}



// custom fields for portfolio items 
$sp_boxes = array (	
	'portfolio_items' => array (
		'Portfolio Meta' => array (
			array( '_url', 'Site URL', 'A link for this project'),
			array( '_collaborators', 'Collaborators', 'People involved in this project'),
			array( '_testimonial', 'Testimonial', 'A client testimonial for this project'),
			array( '_testimonial_name', 'Testimonial Name', 'Who gave the testimonial?'),
			array( '_hireus', 'Hire Us', 'Text for the "Hire us" link'),
		)
	)	
);


// ************************************ create post type: Portfolio Items

if ( ! function_exists( 'post_type_portfolio_items' ) ) :

function post_type_portfolio_items() {

	register_post_type( 
		'portfolio_items',
		array( 
			'label' => __('Portfolio Items'), 
			'description' => __('Create a Portfolio Item.'), 
			'public' => true, 
			'show_ui' => true,
			'register_meta_box_cb' => 
                        'init_metaboxes_portfolio_items',
			'supports' => array (
				'title',
				'editor',
				'thumbnail',
				'excerpt',
				'author',
				'tags',
			),
			'taxonomies' => array (
				'category', 
				'post_tag'
			) 
		)
	);

}

endif;

add_action('init', 'post_type_portfolio_items');


// Do not edit past this point.

// Use the admin_menu action to define the custom boxes
//add_action( 'admin_menu', 'sp_add_custom_box' ); - not being used in place of the register_meta_box_cb above
function init_metaboxes_portfolio_items() {
	sp_add_custom_box('portfolio_items');
}

// Adds a custom section to the "advanced" Post and Page edit screens
function sp_add_custom_box($postType) {
	global $sp_boxes;
	$boxes = $sp_boxes[$postType];
	if ( function_exists( 'add_meta_box' ) ) {
		foreach ( array_keys( $boxes ) as $box_name ) {
			add_meta_box( $box_name, __( $box_name, 'sp' ), 'sp_post_custom_box', $postType, 'normal', 'high' );
		}
	}
}

// this handles the nonces for the meta boxes
if ( ! function_exists( 'sp_post_custom_box' ) ) :
function sp_post_custom_box ($obj, $box) {
	global $sp_boxes;
	$postType = $obj->post_type;
	$boxes = $sp_boxes[$postType];
	static $sp_nonce_flag = false;
	echo '<div style="width: 95%%; margin: 10px auto 10px auto; background-color: #F9F9F9; border: 1px solid #DFDFDF; -moz-border-radius: 5px; -webkit-border-radius: 5px; padding: 10px;">';
	// Run once
	if ( ! $sp_nonce_flag ) {
		echo_sp_nonce();
		$sp_nonce_flag = true;
	}
	// Generate box contents
	foreach ( $boxes[$box['id']] as $sp_box ) {
		echo field_html( $sp_box );
	}
	echo '</div>';
}
endif;

// this switch statement specifies different types of meta boxes
// you can add more types if you add a case and a corresponding function
// to handle it
if ( ! function_exists( 'field_html' ) ) :
function field_html ( $args ) {
	switch ( $args[3] ) {
		case 'textarea':
			return text_area( $args );
		case 'information_box':
			return information_box( $args );
		default:
			return text_field( $args );
	}
}
endif;

// this is the default information box meta box
if ( ! function_exists( 'information_box' ) ) :
function information_box ( $args ) {
	global $post;
	$intro = $args[4];
	//$description = $args[2];
	// adjust data
	//$args[2] = get_post_meta($post->ID, $args[0], true);
	//$args[1] = __($args[1], 'sp' );
	$label_format =
		'<span style="clear:both; line-height:1.6em;">'.$intro.'</span>';
		//'<div style="overflow:hidden;  margin-top:10px;">'.
		//'<div style="width:100px; float:left; padding-top:7px;"><label for="%1$s"><strong>%2$s</strong></label></div>'.
		//'<div style="width:500px; float:left;">'.
		//'<p style="clear:both">'.$description.'</p></div>'.
		//'</div>';
	return vsprintf( $label_format, $args );
}
endif;

// this is the default text field meta box
if ( ! function_exists( 'text_field' ) ) :
function text_field ( $args ) {
	global $post;
	$description = $args[2];
	// adjust data
	$args[2] = get_post_meta($post->ID, $args[0], true);
	$args[1] = __($args[1], 'sp' );
	$label_format =
		'<div style="overflow:hidden;  margin-top:10px;">'.
		'<div style="width:100px; float:left; padding-top:7px;"><label for="%1$s"><strong>%2$s</strong></label></div>'.
		'<div style="width:500px; float:left;"><input style="width: 80%%;" type="text" name="%1$s" value="%3$s" />'.
		'<p style="clear:both"><em>'.$description.'</em></p></div>'.
		'</div>';
	return vsprintf( $label_format, $args );
}
endif;

// this is the text area meta box
if ( ! function_exists( 'text_area' ) ) :
function text_area ( $args ) {
	global $post;
	$description = $args[2];
	// adjust data
	$args[2] = get_post_meta($post->ID, $args[0], true);
	$args[1] = __($args[1], 'sp' );
	$label_format =
		'<div style="overflow:hidden; margin-top:10px; ">'.
		'<div style="width:100px; float:left; padding-top:7px;"><label for="%1$s"><strong>%2$s</strong></label></div>'.
		'<div style="width:500px; float:left;"><textarea style="width: 90%%; height:200px;" name="%1$s">%3$s</textarea>'.
		'<p style="clear:both"><em>'.$description.'</em></p></div>'.
		'</div>';
	return vsprintf( $label_format, $args );
}
endif;

// this is the checkbox meta box
if ( ! function_exists( 'sp_checkbox' ) ) :
function sp_checkbox ( $args ) {
	global $post;
	$description = $args[2];
	// adjust data
	$args[2] = get_post_meta($post->ID, $args[0], true);
	$args[1] = __($args[1], 'sp' );
	$label_format =
		'<div style="width: 95%%; margin: 10px auto 10px auto; background-color: #F9F9F9; border: 1px solid #DFDFDF; -moz-border-radius: 5px; -webkit-border-radius: 5px; padding: 10px;">'.
		'<p><label for="%1$s"><strong>%2$s</strong></label></p>';
	$current_value = $args[2];
	$checked = ($current_value == "on") ? ' checked="checked"' : '';
	$label_format .= '<p><input type="checkbox" name="%1$s" '.$checked.' /></p>'.
		'<p><em>'.$description.'</em></p>'.
		'</div>';
	return vsprintf( $label_format, $args );
}
endif;

// this is the select meta box
if ( ! function_exists( 'sp_select_generic' ) ) :
function sp_select_generic ( $args, $types ) {
	global $post;
	$description = $args[2];
	// adjust data
	$args[2] = get_post_meta($post->ID, $args[0], true);
	$args[1] = __($args[1], 'sp' );
	$label_format =
		'<div style="overflow:hidden; margin-top:10px; ">'.
		'<div style="width:100px; float:left;"><label for="%1$s"><strong>%2$s</strong></label></div>'.
		'<div style="width:500px; float:left;">'.
		'<select name="%1$s" id="%1$s">';
	
	$current_value = $args[2];
	foreach($types as $value => $arr){
		$label = $arr['label'];
		// if this value is the current_value we'll mark it selected
		
		$selected = ($current_value == $value) ? ' selected="selected"' : '';
		
		// escape value	for quotes so they won't break the html
		$value = addslashes($value);
		
		$label_format .= '<option value="'.$value.'"'.$selected.'>'.$label.'</option>';
	}
		
	$label_format .= '</select>'.
		'<p><em>'.$description.'</em></p></div>'.
		'</div>';
	return vsprintf( $label_format, $args );
}
endif;

/* When the post is saved, saves our custom data */
if ( ! function_exists( 'sp_save_postdata' ) ) :
function sp_save_postdata($post_id, $post) {
	global $sp_boxes;
	$postType = $post->post_type;
	$boxes = $sp_boxes[$postType];
	// verify this came from the our screen and with proper authorization,
	// because save_post can be triggered at other times
	if ( ! wp_verify_nonce( $_POST['sp_nonce_name'], plugin_basename(__FILE__) ) ) {
		return $post->ID;
	}
	// Is the user allowed to edit the post or page?
	if ( 'page' == $_POST['post_type'] ) {
		if ( ! current_user_can( 'edit_page', $post->ID ))
			return $post->ID;
		} else {
		if ( ! current_user_can( 'edit_post', $post->ID ))
			return $post->ID;
		}
		// OK, we're authenticated: we need to find and save the data
		// We'll put it into an array to make it easier to loop though.
		// The data is already in $sp_boxes, but we need to flatten it out.
		foreach ( $boxes as $sp_box ) {
			foreach ( $sp_box as $sp_fields ) {
				$my_data[$sp_fields[0]] =  $_POST[$sp_fields[0]];
			}
		}
		// Add values of $my_data as custom fields
		// Let's cycle through the $my_data array!
		foreach ($my_data as $key => $value) {
			if ( 'revision' == $post->post_type  ) {
				// don't store custom data twice
				return;
			}
			// if $value is an array, make it a CSV (unlikely)
			$value = implode(',', (array)$value);
			if ( get_post_meta($post->ID, $key, FALSE) ) {
				// Custom field has a value.
				update_post_meta($post->ID, $key, $value);
			} else {
				// Custom field does not have a value.
				add_post_meta($post->ID, $key, $value);
		}
		if (!$value) {
			// delete blanks
			delete_post_meta($post->ID, $key);
		}
	}
}
endif;

if ( ! function_exists( 'echo_sp_nonce' ) ) :
function echo_sp_nonce () {
	// Use nonce for verification ... ONLY USE ONCE!
	echo sprintf(
		'<input type="hidden" name="%1$s" id="%1$s" value="%2$s" />',
		'sp_nonce_name',
		wp_create_nonce( plugin_basename(__FILE__) )
	);
}
endif;

// A simple function to get data stored in a custom field
if ( !function_exists('get_custom_field') ) {
	function get_custom_field($field) {
		global $post;
		$custom_field = get_post_meta($post->ID, $field, true);
		echo $custom_field;
	}
}

// Use the save_post action to do something with the data entered
// Save the custom fields
add_action( 'save_post', 'sp_save_postdata', 1, 2 );












?>