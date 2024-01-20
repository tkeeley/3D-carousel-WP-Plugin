<?php
/*
Plugin Name: 3D Photo Carousel Plugin
Plugin URI: https://cupocode.com
Description: Displays images from a custom post type for a 3d circular carousel
Version: 1.0
Author: Cup O Code
Author URI: https://cupocode.com
*/

// Register the custom post type
function carousel_post_type() {
  $labels = array(
    'name' => __( 'Carousel' ),
    'singular_name' => __( 'Carousel Item' ),
    'add_new' => __( 'Add New' ),
    'add_new_item' => __( 'Add New Carousel Item' ),
    'edit_item' => __( 'Edit Carousel Item' ),
    'new_item' => __( 'New Carousel Item' ),
    'view_item' => __( 'View Carousel Item' ),
    'search_items' => __( 'Search Carousel Items' ),
    'not_found' => __( 'No Carousel Items found' ),
    'not_found_in_trash' => __( 'No Carousel Items found in trash' ),
  );
  $args = array(
    'labels' => $labels,
    'public' => true,
    'has_archive' => true,
    'supports' => array( 'title', 'thumbnail' ),
    'menu_icon' => 'dashicons-images-alt2',
  );
  register_post_type( 'carousel', $args );
}
add_action( 'init', 'carousel_post_type' );

function carousel_enqueue_scripts() {
    //wp_enqueue_style( 'carousel-styles', plugin_dir_url( __FILE__ ) . 'carousel.css' );

    // Check if the current page has the [3d-carousel] shortcode or is the homepage
    if (has_shortcode(get_the_content(), '3d-carousel') || is_home()) {
        wp_enqueue_script( 'carousel-script', plugin_dir_url( __FILE__ ) . 'carousel.js', array( 'jquery' ), '1.0', true );
    }
}
add_action( 'wp_enqueue_scripts', 'carousel_enqueue_scripts' );

  

// Define the shortcode
function carousel_shortcode() {
  $query = new WP_Query( array(
    'post_type' => 'carousel',
    'posts_per_page' => -1,
  ) );
  $output = '<div id="carousel-container">';
  $output .= '<div id="spin-container">';
  while ( $query->have_posts() ) : $query->the_post();
    $image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' )[0];
    $output .= '<img src="' . $image_url . '" alt="' . get_the_title() . '">';
  endwhile;
  $output .= '</div>';
  $output .= '<div id="ground"></div>';
  $output .= '</div>';
  wp_reset_postdata();
  return $output;
}
add_shortcode( '3d-carousel', 'carousel_shortcode' );

// Add custom CSS to the admin page
function carousel_admin_head() {
  global $post_type, $pagenow;
  if ( $pagenow == 'edit.php' && $post_type == 'carousel' ) {
    ?>
    <style>
      .carousel-note {
        margin-top: 20px;
        padding: 10px;
        background-color: #f8f8f8;
        border: 1px solid #ddd;
        border-radius: 3px;
      }
    </style>
    <?php
  }
}
add_action( 'admin_head', 'carousel_admin_head' );

// Callback function to display the note on the main dashboard
function carousel_note_main_dashboard() {
  $current_screen = get_current_screen();
  if ( $current_screen->post_type === 'carousel' ) {
    $note = __( 'Add each photo as a new post and upload the photo as the "Featured Image". You can add this into a page using the shortcode [3d-carousel]', 'carousel-plugin' );
    echo '<div class="carousel-note"><p>' . $note . '</p></div>';
  }
}
add_action( 'all_admin_notices', 'carousel_note_main_dashboard' );


// Add JavaScript to move the note below the Add New button
function carousel_admin_footer() {
  global $post_type, $pagenow;
  if ( $pagenow == 'edit.php' && $post_type == 'carousel' ) {
    ?>
    <script>
      jQuery( document ).ready( function() {
        var note = jQuery( '.carousel-note' );
        jQuery( '.page-title-action' ).after( note );
      } );
    </script>
    <?php
  }
}
add_action( 'admin_footer', 'carousel_admin_footer' );

function enqueue_custom_styles() {
    wp_enqueue_style( 'custom-carousel-style' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_styles' );

function add_custom_styles() {
    echo "
    <style>
        #carousel-container, #spin-container {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin: auto;
            padding: 70px 0 70px;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            -webkit-transform: rotateX(-10deg);
            transform: rotateX(-10deg);
        }
        
        #carousel-container img {
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            position: absolute;
            left: 0;
            top: 0;
            width: auto !important;
            object-fit: contain;
            height: 100%;
            line-height: 200px;
            font-size: 50px;
            text-align: center;
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0005);
        }
        
        #carousel-container img:hover {
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0007);
        }
        
        #ground {
            width: 900px;
            height: 900px;
            position: absolute;
            top: 100%;
            left: 50%;
            -webkit-transform: translate(-50%,-50%) rotateX(90deg);
            transform: translate(-50%,-50%) rotateX(90deg);
            background: -webkit-radial-gradient(center center, farthest-side , #9993, transparent);
        }
        
        @-webkit-keyframes spin {
            from {
                -webkit-transform: rotateY(0deg);
                transform: rotateY(0deg);
            }
            to {
                -webkit-transform: rotateY(360deg);
                transform: rotateY(360deg);
            }
        }
        
        @keyframes spin {
            from {
                -webkit-transform: rotateY(0deg);
                transform: rotateY(0deg);
            }
            to {
                -webkit-transform: rotateY(360deg);
                transform: rotateY(360deg);
            }
        }
        
        @-webkit-keyframes spinRevert {
            from {
                -webkit-transform: rotateY(360deg);
                transform: rotateY(360deg);
            }
            to {
                -webkit-transform: rotateY(0deg);
                transform: rotateY(0deg);
            }
        }
        
        @keyframes spinRevert {
            from {
                -webkit-transform: rotateY(360deg);
                transform: rotateY(360deg);
            }
            to {
                -webkit-transform: rotateY(0deg);
                transform: rotateY(0deg);
            }
        }
        
        @media screen and (max-width: 600px) {
            #carousel-container, #spin-container {
                -webkit-transform: rotateX(-20deg);
                transform: rotateX(-20deg);
            }
        }
    </style>
    ";
}
add_action( 'wp_head', 'add_custom_styles' );
