<?php
/**
 * Plugin Name: LOAD MORE POSTS
 * Description: Chargement de la suite des Posts
 * Version: 0.1
 * Author: Quentin FAURE 2ADEV @ EEMI
 * Author URI: http://www.quentinfaure.com.
 */

 /**
  * Initialization. Add our script if needed on this page.
  */
 function pbd_alp_init()
 {
     global $wp_query;

    // Add code to index pages.
    if (!is_singular()) {
        // Queue JS and CSS
        wp_enqueue_script(
            'pbd-alp-load-posts',
            plugin_dir_url(__FILE__).'js/load-posts.js',
            array('jquery'),
            '1.0',
            true
        );

        wp_enqueue_style(
            'pbd-alp-style',
            plugin_dir_url(__FILE__).'css/style.css',
            false,
            '1.0',
            'all'
        );

        // What page are we on? And what is the pages limit?
        $max = $wp_query->max_num_pages;
        $paged = (get_query_var('paged') > 1) ? get_query_var('paged') : 1;

        // Add some parameters for the JS.
        wp_localize_script(
            'pbd-alp-load-posts',
            'pbd_alp',
            array(
                'startPage' => $paged,
                'maxPages' => $max,
                'nextLink' => next_posts($max, false),
            )
        );
    }
 }

 function page_size($query)
 {
     if (is_home()) {
         // Affiche seulement 5 post
     $query->set('posts_per_page', 5);

         return;
     }
 }

 add_action('pre_get_posts', 'page_size', 99);
 add_action('template_redirect', 'pbd_alp_init');
