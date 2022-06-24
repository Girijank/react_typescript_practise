// ----------------------------------------------------------------------
// -- COURSE SPECIFIC JS:
// ----------------------------------------------------------------------
// -- NOTE: Created for ASL V18
// -- ABOUT: Quizmo Glossary Activator
// -- AUTHOR: Luis Sanchez - WDS
// ======================================================================

(function () {
  let counter = 0
  $(document).ready(activate)

  ////////// FUNCTIONS /////////////

  function activate () {
    if (counter > 10) return
    let html = $('.ng_il').html()

    if (html && html.substring(0, 4) !== '<img') glossary.setup()
    else setTimeout(activate, 600)
    counter++
  }
})()
