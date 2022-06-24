// JavaScript Document

// For Module and Lesson Number removal by unLOck version 0.8

// start
function checkVariable(){
    // pass
}

function loadcss(url) {
   var head = document.getElementsByTagName('head')[0],
   link = document.createElement('link');
   link.type = 'text/css';
   link.rel = 'stylesheet';
   link.href = url;
   head.appendChild(link);
}

if(typeof gsVars !== 'undefined'){
    var tpl = gsVars.custom_tpl;
    var gsTheme = gsVars.custom_theme;
    if(typeof gsTheme !== 'undefined'){

        setTimeout(checkVariable,1000)
        if(typeof unlock !== 'undefined'){
            var unlockTheme = unlock.theme[gsTheme];
            var unlockUrl = newURL.substring(0, n)+settings['course_folder']+"/";
        }
    }
    var unlockRes = gsVars.custom_res;
}
if (typeof tpl !== 'undefined' && tpl.indexOf('maln_false') >= 0) {
    var selectors = ['lesson_number','lesson_num','breadcrumbs_lesson_num','breadcrumbs_module_num','mnumber',];
    selectors.forEach(function(value){
        var selector = '.' + value;
        $(document).ready(function() {
            $(selector).addClass('unlock').removeClass(value);
        });
    });
}


if(typeof gsTheme !== 'undefined'){

    
    if(typeof unlockTheme !== 'undefined'){
    for(i=0; i < unlockTheme.resources.resource.length; i++){
        var themePath = unlockUrl + unlockTheme.resources.resource[i];
        loadcss(themePath);
        }
    }
}
if(typeof unlockRes !== 'undefined'){
    unlockRes = JSON.parse(unlockRes);
    for(i=0;i < unlockRes.length; i++){
        loadcss(unlockRes[i]);
    }
}

// end