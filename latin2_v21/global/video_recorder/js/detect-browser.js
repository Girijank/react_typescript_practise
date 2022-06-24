(function () {
  activate()

  function activate () {
    $(document).ready(function () {
      $('body').removeClass('hidden')
    });

    $.getScript('js/main.js', function () {
      // console.log('success', data)
    })
  }
})()
