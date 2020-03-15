<?php
/**
 * Plugin Name: Ironeko Featured Content
 * Description: Allows to set featured content metadata
 */

function featured_content_register_post_meta() {
    register_post_meta( '', 'featured', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'boolean',
    ) );
}
add_action( 'init', 'featured_content_register_post_meta' );

function featured_content_enqueue() {
    wp_enqueue_script(
        'myguten-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-components' )
    );

   wp_enqueue_style(
      'myguten-script',
      plugins_url( 'index.css', __FILE__ ),
      array()
   );
}
add_action( 'enqueue_block_editor_assets', 'featured_content_enqueue' );

// Register a REST route
add_action( 'rest_api_init', function () {
    //Path to meta query route
    register_rest_route( 'ironeko/v2', '/featured/', array(
            'methods' => 'GET',
            'callback' => 'custom_meta_query'
    ) );
});

// Do the actual query and return the data
function custom_meta_query(){
  $posts = [];
  $post_types = get_post_types();

  // foreach ($post_types as $type) {
  //   $args = array(
  //       'post_type'    => $type,
  //       'meta_key'   => 'featured',
  //       'meta_value' => true
  //   );
  //   $query = new WP_Query( $args );
  //   array_push($posts, ...$query);
  // }
  $args = array(
      'meta_key'   => 'featured',
      'meta_value' => true
  );
  $post = new WP_Query( $args );
  $args2 = array(
      'post_type'    => 'page',
      'meta_key'   => 'featured',
      'meta_value' => true
  );
  $page = new WP_Query( $args2 );
  $merged = array_merge($post, $page);
  
  return $post->posts;
}
