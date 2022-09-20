<?php get_header() ?>
<div id="root">
  <!-- <lang-switcher></lang-switcher> -->
  <i id="show-switcher" type="button" class="bi bi-translate position-absolute"></i> 
  <ul class=" list-unstyled m-0 menu">
  <li>
    <input id="rad1" type="radio" name="rad" checked="checked" />
    <label for="rad1">
      <div class="pe-3 pb-3"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Adef_logo.svg" width="50" alt="ADEF logo">
    </div>
    </label>
    <div class="accslide">
      <div class="content">
        <render-page slug="home" :isheader="false">
          </page-render>
          
        </div>
      </div>
    </li>
    
    <li>
      <input id="rad2" type="radio" name="rad" />
    <label for="rad2">
      <div data-i18n="about"><?php echo __('About ADEF', 'adef') ?></div>
    </label>
    <div class="accslide">
      <div class="content">
        <render-page slug="about" :isheader="true">
          </page-render>
        </div>
      </div>
    </li>
    <li>
      <input id="rad3" type="radio" name="rad" />
      <label for="rad3">
        <div class="pe-3 pb-3" data-i18n="youngsters"><?php echo __('Youngsters', 'adef') ?></div>
      </label>
      <div class="accslide">
        <div class="content">
          <h1 class="px-4 my-3 d-inline-block bg-active text-white" data-i18n="youngsters"><?php echo __('Youngsters', 'adef') ?></h1>
          <fetya-list></fetya-list>
        </div>
      </div>
    </li>
    <li>
      <input id="rad4" type="radio" name="rad" />
      <label for="rad4">
        <div class="pe-3 pb-3" data-i18n="youth"><?php echo __('Youth', 'adef') ?>
      </div>
    </label>
    <div class="accslide">
      <div class="content">
        <h1 class="px-4 my-3 d-inline-block bg-active text-white"  data-i18n="youth"><?php echo __('Youth', 'adef') ?></h1>
        <shabab-list>
          </shabab-list>
      </div>
    </div>
  </li>
  <li>
    <input id="rad5" type="radio" name="rad" />
    <label for="rad5">
      <div  data-i18n="deca"><?php echo __('Deca', 'adef') ?></div>
    </label>
    <div class="accslide">
      <div class="content">
        <h1 class="px-4 my-3 d-inline-block bg-active text-white"  data-i18n="deca"><?php echo __('Deca', 'adef') ?></h1>
        <div id="spaces-container" class="w-90 m-auto">
          <deca-list></deca-list>
        </div>
      </div>
    </div>
  </li>
  <li>
    <input id="rad6" type="radio" name="rad" />
    <label for="rad6">
      <div data-i18n="platforms"><?php echo __('Platforms', 'adef') ?></div>
    </label>
    <div class="accslide">
      <div class="content">
        <h1 class="px-4 my-3 d-inline-block bg-active text-white" data-i18n="platforms"><?php echo __('Platforms', 'adef') ?></h1>
        <platform></platform>
      </div>
    </div>
  </li>
  <li>
    <input id="rad7" type="radio" name="rad" />
    <label for="rad7">
      <div data-i18n="news"><?php echo __('News', 'adef') ?></div>
    </label>
    <div class="accslide">
      <div class="content">
        <h1 class="px-4 my-3 d-inline-block bg-active text-white" data-i18n="news"><?php echo __('News', 'adef') ?></h1>
        <news-list></news-list>
      </div>
    </div>
  </li>
  <li>
    <input id="rad8" type="radio" name="rad" />
    <label for="rad8">
      <div data-i18n="contact"><?php echo __('Contact Us', 'adef') ?></div>
    </label>
    <div class="accslide">
      <div class="content">
        <render-page slug="contact" :isheader="true">
          </page-render>
      </div>
    </div>
  </li>
</ul>
</div>

<?php get_footer() ?>