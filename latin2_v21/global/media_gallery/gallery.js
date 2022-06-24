// ----------------------------------------------------------------------
// -- COURSE SPECIFIC JS:
// ----------------------------------------------------------------------
// -- NOTE: Created for ASL2 V19
// -- ABOUT: Video Glossary Tool
// -- AUTHOR: Luis Sanchez - WDS
// ======================================================================

(function () {
  /* global $ */
  let alphabetFilter
  let filter
  let isFluid
  let playlists
  let sortBy
  let videos
  let zoom = 0

  $(document).ready(activate)

  // FUNCTIONS

  function activate () {
    $('#clearInput').click(clearInput)
    $('.clearAlphabetFilter').click(clearAlphabetFilter)
    $('#galleryMenuButton').click(openMenu)

    $('#input')
      .keyup(monitorInput)
      .focus(addFocused)
      .blur(removeFocused)

    $('#alphabetFilter')
      .keyup(monitorAlphabetFilter)
      .focus(addFocused)
      .blur(removeFocused)

    $('#menuOpen')
      .click(closeMenu)
      .find('.menuContainer').click(function (e) { e.stopPropagation() }).end()
      .find('.help').click(function () {
        closeMenu()
        showHelp()
      }).end()
      .find('.fluid').click(toggleFluid).end()

    $('#sortByTitle').click(sortByTitle)
    $('#sortByModule').click(sortByModule)

    $('#preview')
      .find('.close').click(closePreview).end()
      .find('.panel-heading, .panel-body').click(function (e) { e.stopPropagation() }).end()
      .click(closePreview)

    let showNextTime = $('#showNextTime')
    showNextTime.change(skipWelcome)

    $('#welcome')
      .click(closeWelcome)
      .find('.panel').click(function (e) { e.stopPropagation() }).end()
      .find('.close, .closeWelcome').click(closeWelcome).end()

    sortBy = localStorage['video_gallery_sortBy']
    if (!sortBy) sortBy = { type: 'title', asc: false }
    else sortBy = JSON.parse(sortBy)

    let welcome = localStorage.show_next_time
    welcome = !welcome || welcome !== 'false'

    if (welcome) {
      showNextTime.prop('checked', true)
      showHelp()
    }

    let size = localStorage['video_gallery_size']
    zoom = size ? ['s', 'm', 'l'].indexOf(size) : 0

    isFluid = localStorage.video_gallery_fluid
    isFluid = isFluid ? JSON.parse(isFluid) : false
    updateFluidStatus()

    setTimeout( function () {
      $.getJSON('video.json', function (data) {
        playlists = data.playlists
        videos = data.videos

        $('body')
          .removeClass('initial')
          .removeClass('hidden')
          .keyup(function (e) { e.stopPropagation() })

        filter = $('#input').val()
        alphabetFilter = $('#alphabetFilter').val()

        $('#size .btn').eq(zoom).addClass('active')
        sortVideos()
        updateFingerspell()
        buildPlaylist()
      })
    }, 200)
  }

  function addFocused () {
    $(this).parent().addClass('focused')
  }

  function buildList () {
    let ul = $('<ul class="list-unstyled mb-0"/>')

    // videos = videos.sort(function (a, b) { return a.word > b.word })
    let formattedFilter = alphabetFilter.toLowerCase()

    let list = videos.filter(function (video) { return video.word.toLowerCase().indexOf(formattedFilter) !== -1 })

    list.forEach(function (video) {
      let row = $('<div class="row" />').html([
        $('<div class="col-md-9 col-xs-10" />').html(video.word),
        $('<div class="col-md-3 col-xs-2 text-center" />').html(video.module)
      ])

      let a = $('<a />').attr({
          href: 'javascript:void(0)'
        })
        .data('gallery', video)
        .html(row)
        .click(loadPreview)

      ul.append($('<li />').html(a))
    })

    let div = $('.alphabet')

    if (!list.length) {
      div
        .addClass('noItems')
        .find('.searchTerm').html(alphabetFilter)
    }
    else if (div.hasClass('noItems')) div.removeClass('noItems')

    div.find('.list-contents').html(ul)
  }

  function buildPlaylist () {
    let ul = $('<ul class="list-unstyled mb-0"/>')

    playlists.forEach(function (playlist) {
      let row = $('<div class="row" />').html($('<div class="col-md-12" />').html(playlist.name))

      let a = $('<a />').attr({
          href: 'javascript:void(0)'
        })
        .data('gallery', playlist)
        .html(row)
        .click(loadPlaylistPreview)

      ul.append($('<li />').html(a))
    })

    $('.playlists').find('.list-contents').html(ul)
  }

  function clearAlphabetFilter () {
    $('#alphabetFilter').val('').focus()
    alphabetFilter = ''

    buildList()
  }

  function clearInput () {
    $('#input').val('').focus()
    filter = ''

    updateFingerspell()
  }

  function closeMenu () {
    $('#menuOpen').removeClass('open')
    document.removeEventListener('keydown', watchForCloseMenu)
  }

  function closePreview () {
    $('#preview').removeClass('open')
      .find('.panel-body').html('')

    document.removeEventListener('keydown', watchForClosePreview)
  }

  function closeWelcome () {
    $('#welcome').removeClass('open')
    document.removeEventListener('keydown', watchForCloseWelcome)
  }

  function loadPlaylistPreview () {
    let video = $(this).data('gallery')

    document.addEventListener('keydown', watchForClosePreview, false)

    let iframe

    if (video) {
      iframe = $('<iframe allowfullscreen />').attr({
        src: 'https://cdnapisec.kaltura.com/p/2061901/sp/206190100/embedIframeJs/uiconf_id/44679881/partner_id/2061901?iframeembed=true&playerId=&flashvars%5bplaylistAPI.kpl0Id%5d=' + video.id
      })
    } else iframe = $('<div class="alert alert-error" />').html(['Video ID is missing:', JSON.stringify(video.id)])

    $('#preview')
      .find('.panel-heading .title').html(video.name).end()
      .find('.panel-body').html(iframe).end()
      .addClass('open playlist')
      .delay(200)
      .find('.close').focus()
  }

  function loadPreview () {
    let dimensions = ['small', 'medium', 'large'][zoom]
    let video = $(this).data('gallery')

    document.addEventListener('keydown', watchForClosePreview, false)

    let iframe

    if (video.id) {
      iframe = $('<iframe allowfullscreen />').attr({
        src: 'https://cdnapisec.kaltura.com/p/2061901/sp/206190100/embedIframeJs/uiconf_id/35766781/partner_id/2061901?iframeembed=true&playerId=Kaltura&entry_id=' + video.id,
        class: dimensions
      })
    } else iframe = $('<div class="alert alert-error" />').html(['Video ID is missing:', JSON.stringify(video)])

    $('#preview')
      .find('.panel-heading .title').html(video.word).end()
      .find('.panel-body').html(iframe).end()
      .addClass('open')
      .delay(200)
      .find('.close').focus()
  }

  function monitorAlphabetFilter (e) {
    alphabetFilter = e.target.value
    buildList()
  }

  function monitorInput (e) {
    filter = e.target.value
    updateFingerspell()
  }

  function openMenu () {
    $('#menuOpen').addClass('open')
    document.addEventListener('keydown', watchForCloseMenu, false)
  }

  function removeFocused () {
    $(this).parent().removeClass('focused')
  }

  function showHelp () {
    $('#welcome').addClass('open')
    document.addEventListener('keydown', watchForCloseWelcome, false)
  }

  function skipWelcome () {
    let checked = $(this).prop('checked')

    if (checked) delete localStorage.show_next_time
    else localStorage.show_next_time = 'false'
  }

  function sortByModule () {
    sortBy = {
      type: 'module',
      asc: sortBy.type === 'module' ? !sortBy.asc : false
    }
    sortVideos()
  }

  function sortByTitle () {
    sortBy = {
      type: 'title',
      asc: sortBy.type === 'title' ? !sortBy.asc : false
    }
    sortVideos()
  }

  function sortVideos () {
    let d = sortBy.asc ? -1 : 1
    let sortingByTitle = sortBy.type === 'title'

    let type = sortingByTitle ? 'word' : 'module'
    let enabledID = sortingByTitle ? '#sortByTitle' : '#sortByModule'
    let disabledID = sortingByTitle ? '#sortByModule' : '#sortByTitle'

    $(disabledID).removeClass('sorting').removeClass('descending')
    $(enabledID).addClass('sorting')

    if (sortBy.asc) $(enabledID).removeClass('descending')
    else $(enabledID).addClass('descending')

    videos.sort(function (a, b) {
      return a[type].toUpperCase() > b[type].toUpperCase() ? d : d * -1
    })

    // console.log('sort by', sortBy)

    buildList()
    localStorage['video_gallery_sortBy'] = JSON.stringify(sortBy)
  }

  function toggleFluid () {
    isFluid = !isFluid
    localStorage.video_gallery_fluid = isFluid
    updateFluidStatus()
  }

  function updateFingerspell () {
    let phrase = filter.trim()

    let res = phrase.split('').map(function (letter) {
      if (letter === ' ') return $('<div class="col-xs-1 separator" />')

      let img = $('<img />').attr({
        src: '../resources/images/hands_notext/alphabet_' + letter.toLowerCase() + '_flvs.png'
      })

      let label = $('<span class="letter" />').html(letter.toUpperCase())

      return $('<div class="col-xs-2" />').html([img, label])
    })

    let div = $('#galleryTabs .fingerspelling')

    if (!res || !res.length) div.addClass('noItems')
    else if (div.hasClass('noItems')) div.removeClass('noItems')

    $('#galleryTabs .fingerspelling .row').html(res)
  }

  function updateFluidStatus () {
    $('#menuOpen .fluid .status').html(isFluid ? 'on' : 'off')

    if (isFluid) $('#main').addClass('fluid')
    else $('#main').removeClass('fluid')
  }

  function watchForCloseMenu (e) {
    console.log('watch for close')
    if (e.keyCode === 27) return closeMenu()
  }

  function watchForClosePreview (e) {
    console.log('watch for close')
    if (e.keyCode === 27) return closePreview()
  }

  function watchForCloseWelcome (e) {
    if (e.keyCode === 27) return closeWelcome()
  }
})()
