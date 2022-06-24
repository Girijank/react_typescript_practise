// ----------------------------------------------------------------------
// -- COURSE SPECIFIC JS:
// ----------------------------------------------------------------------
// -- NOTE: This is where you can add anything you need to do specifically to the course, it will load lastly.
// -- ABOUT: THis file will over-ride everything else, if you need to customize
// -- AUTHOR: Luis Sanchez - WDS
// ======================================================================
/* globals FLVS, oData */

(function () {
  let data
  let course = 'asl2'
  let labels
  let lastLabel
  let page = location.href.split('/').slice(-1)[0].replace('.htm', '')
  let slider

  if ($.ui) activate()
  else $(window).on("jqueryui_loaded", activate)

  // FUNCTIONS

  function activate() {
    let loc = window.location.href // returns the full URL

    window.asl = {createDialog: createDialog}

    if (/welcome_/.test(loc) || /glossary/.test(loc) || /toolbox/.test(loc)) $('body').addClass('navoff')

    initializeAccordions()
    initializeFlipcards()

    $('.aslreveal').each(initializeASLReveals)
    $('.familytree').each(initializeFamilyTree)
    $('#moduleObjectives').each(buildModuleObjectives)
    $('.carousel.activate-video').each(initializeActivateVideo)
    $('.carousel.text-reveal').each(initializeTextReveal)
    $('.carousel.vertical-slider').each(initializeVerticalSlider)

    $('.menu_links').find('.tool-box, .speech_tool').attr('target', '_blank')
    $('.carousel .il_question_mark')
      .before('<div class="instructions-container" tabindex="0" />')
      .click(showInstructions).click()

    $('#glossary .btn').click(function () {
      let letter = $(this).data('letter')
      if (!letter) return console.log('invalid letter')

      let pos = $('.' + letter).offset()
      if (pos) $('.external_container').scrollTop(pos.top)
    })

    $('.reviewblock .header .carousel-indicators li')
      .keyup(function (e) {
      if (e.keyCode === 13) $(this).click()
    }).attr('tabindex', 0).click(addIndicatorClassHandler)

    $('#terms > a').click(function () {
      console.log('scroll')
      $('.external_container').scrollTop(0)
    })

    // Reorganize links as determined by ASL team on 3/13/2019
    setTimeout(function () {
      let links = $('#menu_inner .menu_links')
      if (!links.length) return

      links = links[0].children

      let cornell = links[0]
      let print = links[2]
      let resources = links[4]
      let speech_tool = links[5]
      let objectives = links[6]

      $(objectives).insertAfter(cornell)
      $(print).insertAfter(speech_tool)
      $('a', resources).attr('target', '_blank')

      $('.tabs').each(function () {
        let block = $(this).find('.panel-block')

        if (!block.length) return
        $(this).find('.tryIt').insertAfter(block)
      })
    })
  }

  function activateVideo() {
    let carousel = $('.carousel.activate-video')
    let item = $(this).parents('.item')
    let index = item.index('.item', carousel)

    data[index] = true

    localStorage[`${course}_${page}`] = JSON.stringify(data)

    setTimeout(function () {
      console.log('video has been activated', index)
      item
        .addClass('activated')
        .find('iframe')
        .removeAttr('tabindex')
    }, 10000)
  }

  function addIndicatorClassHandler() {
    $(this).addClass('active').siblings().removeClass('active')
  }

  function buildModuleObjectives() {
    let module = FLVS.Sitemap.module[current_module]
    if (module.mID === undefined) return console.log('module not found')

    let moduleObjectives = oData.objectives.find(function (obj) {
      return obj.mID === module.mID
    })
    if (!moduleObjectives) return console.log('objectives not found')

    let html = moduleObjectives.lessons.map(function (lesson) {
      let list = lesson.items.map(function (item) {
        return '<li>' + item + '</li>'
      }).join('')
      let sitemapLesson = module.lesson.find(function (sitemapLesson) {
        return sitemapLesson.num === lesson.lessID
      })

      return '<h2 class="lowercase"><span class="lesson_number">' + lesson.lessID + '</span><span class="unlock lname"> ' + sitemapLesson.title + '</span></h2><ul>' + list + '</ul>'
    }).join('')

    $(this).html(html)
  }

  function createDialog(title, directions, btnname, container, firstCheck) {
    //	Default button name
    btnname = btnname || "Begin"
    container = container || $('#content')
    let index = $('.dialog').length

    let new_dialog = $('<div />').attr({
      class: "dialog",
      id: 'dialog_' + index,
      title: title
    }).html(directions)

    $(container).append(new_dialog)

    new_dialog.dialog({
      buttons: [{
        text: btnname,
        click: function () {
          $(this).dialog("close")

          if (container.attr('id') === "overlay") {
            container.fadeOut()
          }
        },
        keydown: function (e) {
          let elem = $(this)
          console.log(elem, elem.attr('tabindex'))
          if (e.keyCode !== 9) return

          if (container.hasClass('instructions-container')) setTimeout(() => {
            if (e.shiftKey) container.focus()
            else container.siblings('.il_question_mark').focus()
          }, 80)
        }
      }],

      draggable: false,
      resizable: false,
      close: function () {
        $(this).dialog('destroy').remove()
        $(this).trigger('NEW-BUTTON-CLOSED')
      },

      focus: function () {
        if (typeof firstCheck !== 'undefined' && firstCheck) {
          $("#menu_outer").focus()
          $('body > .wrapper').scrollTop(0)
        }
      },

      open: function () {
        $(this).trigger('NEW-BUTTON')
      },
      hide: {
        effect: 'fade',
        duration: 200
      },
      show: {
        effect: "fade",
        duration: 200
      }
    }).parent().appendTo(container)

    new_dialog.parent().addClass('dialog-css-position')

    return new_dialog
  }

  function goToNextLabel(e) {
    if (e.keyCode !== 9) return

    let index = labels.index(this)
    if ((e.shiftKey && index === 0) || (!e.shiftKey && index === lastLabel)) return

    e.preventDefault()

    let next = e.shiftKey ? index - 1 : index + 1
    labels.eq(next).focus()
  }

  function handleKeyboard(e) {
    e.stopPropagation()

    if (e.keyCode === 9 && !e.shiftKey) {
      e.preventDefault()
      labels[0].focus()
    }
  }

  function handleNumeric(e) {
    if (e.keyCode > 53 || e.keyCode < 49) return

    let index = Number(e.key) - 1
    labels.eq(index).click().focus()
  }

  function initializeAccordions() {
    let accordion = $('.myAccordion')
    if (!accordion.length) return

    accordion.next().keydown(function (e) {
      console.log(e, 'next key press')
    })

    $('.myTab', accordion)
      .click(selectMyTab)
      .keydown(expandMyTab)
      .find('.myHover')
      .attr('tabindex', 0)

    // FUNCTIONS //

    function expandMyTab(e) {
      if (e.keyCode === 13) $(this).click()
    }

    function selectMyTab() {
      $('.myTab', accordion).removeClass('tabSelect')
      $(this).addClass('tabSelect')
    }
  }

  function initializeActivateVideo() {
    let count = $(this).find('.item').length
    let carousel = $('.carousel.activate-video')

    carousel
      .on('slid.bs.carousel', function () {
        $(this).find('.item.active').removeAttr('tabindex')
      })
      .find('.pop')
      .click(activateVideo).end()
      .find('iframe')
      .attr('tabIndex', '-1').end()
      .find('.item')
      .removeAttr('tabindex').end()

    data = localStorage[`${course}_${page}`]

    data = data ? JSON.parse(data) : new Array(count).fill(false)
    if (data.length !== count) data = new Array(count).fill(false)

    data.forEach(function (isActivated, index) {
      if (isActivated) carousel.find('.item').eq(index).addClass('activated')
    })

    setTimeout(() => {
      carousel.fadeIn(600).removeClass('hidden')
    }, 500)
  }

  function initializeASLReveals() {
    $(this)
      .find('.reveal-container')
        .children('div').addClass('hidden').end()
        .find('a').click(showReveal).eq(0).click()

    function showReveal() {
      let { target } = $(this).data()
      let reveal = $(this).parents('.aslreveal')

      console.log('reveal', reveal)
      reveal
        .find('.reveal-container')
          .children('div').addClass('hidden').end()
          .find('a').removeClass('active').end()
          .find(target).removeClass('hidden')

      $(this).addClass('active')
    }
  }

  function initializeFamilyTree () {
    $(this)
      .find('.reveal-shadow')
      .children('.reveal-container')
        .children('div').addClass('hidden')

    $(this).find('.img-reveal-markers a').click(showReveal)
    $(this).find('.close-shadow').click(hideReveal)

    function hideReveal () {
      let reveal = $(this).parents('.familytree')

      reveal
        .find('.reveal-shadow')
        .children('.reveal-container')
        .children('div').addClass('hidden').end()

      reveal
        .find('.reveal-shadow').addClass('hidden')

      reveal.find('.img-reveal-markers').find('a.active').removeClass('active').focus()
    }

    function showReveal() {
      let { target } = $(this).data()
      let reveal = $(this).parents('.familytree')

      console.log(reveal)

      reveal
        .find('.reveal-shadow')
        .children('.reveal-container')
          .children('div').addClass('hidden').end()
          .find(target).removeClass('hidden')

      reveal
        .find('.reveal-shadow').removeClass('hidden')
        .find('.close-shadow').focus()

      $(this)
        .parents('.img-reveal-markers')
        .find('a').not(this).removeClass('active')

      $(this).addClass('active')
    }
  }

  function initializeFlipcards() {
    let container = $('.flip-container')

    if (!container.length) return

    container
      .keypress(function (e) {
        if (e.keyCode === 13 && $(this).hasClass('active')) $(this).toggleClass('hover')
      })
      .find('.front').click(function () {
      $(this).parents('.flip-container').addClass('hover').focus()
    }).end()
      .find('.back').click(function () {
      $(this).parents('.flip-container').removeClass('hover').focus()
    })
  }

  function initializeTextReveal() {
    let carousel = $('.carousel.text-reveal')

    carousel
      .on('slid.bs.carousel', function () {
        $(this).find('.item.active').removeAttr('tabindex')
      })
      .find('.flip-container').click(showWarning).end()
      .find('.flipper').click(function (e) { e.stopPropagation() }).end()
      .find('textarea').val('').keyup(monitorGlossing).end()
      .find('.reset').click(resetTextReveal)


    function monitorGlossing() {
      let val = $(this).val()
      let flip = $(this).parents('.item').find('.flip-container')

      if (!val) flip.removeClass('active')
      else flip.addClass('active')
    }

    function resetTextReveal() {
      carousel.carousel(0)
      carousel.find('textarea').val('').end()
    }

    function showWarning() {
      setTimeout(() => {
        $(this).parents('.item').find('textarea').focus()
      }, 200)
    }
  }

  function initializeVerticalSlider() {
    let carousel = $('.carousel.vertical-slider')
    labels = $('.options a', carousel)
    lastLabel = labels.length - 1
    slider = document.querySelector('.myRange')

    $(slider).on('change', updateSlider)

    labels
      .click(moveSlider)
      .keydown(goToNextLabel)
    labels[0].click()

    carousel
      .on('slid.bs.carousel', function () {
        $(this).find('.item.active').removeAttr('tabindex')
      })
      .keydown(handleNumeric)
      .find('.myRange').keydown(handleKeyboard).end()
      .find('button.btn').click(showFeedback).end()
      .find('.item').removeAttr('tabindex')

    let slides = $('.carousel-slider a', carousel).length
    if (slides !== 5) $('.options', carousel).addClass(`box-${slides}`)
  }

  function moveSlider() {
    let index = labels.index(this)
    slider.value = lastLabel - index
    labels.removeClass('active').eq(index).addClass('active')
  }

  function showFeedback() {
    let carousel = $('.carousel.vertical-slider')
    let buttons = carousel.find('.carousel-inner button')
    let index = buttons.index(this)

    let feedback = $('.feedback > div', carousel).eq(index)

    let title = feedback.attr('class')
    title = title.charAt(0).toUpperCase() + title.slice(1)

    createDialog(title, feedback.html(), 'OK', carousel)
  }

  function showInstructions() {
    let parent = $(this).parents('.carousel')
    let instructions = $('.instructions.hidden', parent).html()

    let firstCheck = parent.data('initialized') === undefined
    if (firstCheck) parent.data('initialized', true)

    createDialog("Instructions", instructions, "OK", parent.find('.instructions-container'), firstCheck)
  }

  function updateSlider() {
    labels.eq(lastLabel - this.value).click()
  }
})()

// ================================================
// initialize QUIZMO
// ================================================
let ngLibraryLocation = "//cdn.flvs.net/cdn/il_beta/ng_il/"
let ngDisableRemoteCss = true
$.getScript(ngLibraryLocation + 'launcher.js', function () {})


$(document).on('click','.list-decorative-checkbox li', function () {
  $(this).toggleClass('check');
});
