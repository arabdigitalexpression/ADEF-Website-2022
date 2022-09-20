<?php
function add_styles()
{
  wp_enqueue_style(
    'main',
    get_template_directory_uri() . '/style.css'
  );
  // wp_style_add_data(
  //   'main',
  //   'rtl',
  //   'replace'
  // );
}
########################################################
######################## Scripts #######################
########################################################
function add_scripts()
{
  wp_enqueue_script(
    'popper',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'bootstrap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'vue',
    'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'vue-router',
    'https://unpkg.com/vue-router@4',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'main',
    get_template_directory_uri() . '/assets/js/main.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'space',
    get_template_directory_uri() . '/assets/js/components/Space.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'deca',
    get_template_directory_uri() . '/assets/js/components/Deca.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'platform',
    get_template_directory_uri() . '/assets/js/components/Platform.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'job',
    get_template_directory_uri() . '/assets/js/components/Job.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'blog',
    get_template_directory_uri() . '/assets/js/components/Blog.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'news',
    get_template_directory_uri() . '/assets/js/components/News.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'render-page',
    get_template_directory_uri() . '/assets/js/render-page.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'fetya',
    get_template_directory_uri() . '/assets/js/components/Fetya.js',
    array(),
    false,
    true
  );
   wp_enqueue_script(
    'shabab',
    get_template_directory_uri() . '/assets/js/components/Shabab.js',
    array(),
    false,
    true
  );
  wp_enqueue_script(
    'app',
    get_template_directory_uri() . '/assets/js/app.js',
    array(),
    false,
    true
  );
}
#####################################################
##################### Add Actions ###################
#####################################################
add_action('wp_enqueue_scripts', 'add_styles');
add_action('wp_enqueue_scripts', 'add_scripts');




function adef_register_nav_menu()
{
  register_nav_menus(array(
    'primary_menu' => 'Primary Menu',
  ));
}
add_action('init', 'adef_register_nav_menu');

function get_site_languages($request)
{
  if (empty(icl_get_languages())) {
    return new WP_Error('no_languages', 'There are no languages to display', array('status' => 404));
  }
  $response = new WP_REST_Response(icl_get_languages());
  $response->set_status(200);

  return $response;
}

add_action('rest_api_init', function () {
  register_rest_route('polylang/v1', '/languages', array(
    'methods'  => 'GET',
    'callback' => 'get_site_languages'
  ));
});

function get_current_language($request)
{
  if (empty(pll_the_languages(array("echo" => 1, "raw" => 1)))) {
    return new WP_Error('no_language', 'There are no language to display', array('status' => 404));
  }
  foreach (pll_the_languages(array("echo" => 1, "raw" => 1)) as  $value) {
    if ($value["current_lang"] == true) {
      $response = new WP_REST_Response($value);
      $response->set_status(200);
      return pll_the_languages(array("echo" => 1, "raw" => 1));
    }
  }
}

add_action('rest_api_init', function () {
  register_rest_route('polylang/v1', '/current_language', array(
    'methods'  => 'GET',
    'callback' => 'get_current_language'
  ));
});

// fallback language is English whatever the default language
add_filter('pll_preferred_language', 'my_language_fallback');

function my_language_fallback($slug)
{
  return $slug === false ? 'ar' : $slug;
}
