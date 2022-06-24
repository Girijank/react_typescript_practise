// Customization settings
if(typeof(FLVS) != 'undefined') {
    FLVSanalyticsCode = FLVS.settings.ua_account;
}else{
    FLVSanalyticsCode = '';
}

var sptConfig = {
    version: 'cdn', // SPT location -- local, dev, or cdn
    pathToLocalSPT: 'http://localhost/SpeechPracticeTool/SpeechPracticeTool/',      // WITH trailing slash (/)
    
    //Settings
    recordButton: 'Dic',
    recordButtonActive: 'Stop',
    listenButton: 'Audi',
    listenButtonActive: 'Stop',
    practiceText: 'Practice saying',
    practiceButton: 'Begin',
    locale: 'la',

    //Styles
    buttonBorderColor: '#AC5036',
    buttonBackgroundColor: '#FFF',
    buttonTextColor: '#AC5036',
    buttonHoverBackgroundColor: '#AC5036',
    buttonHoverTextColor: '#FFF',
    textColor: '#000',
    saveIconColor: '#AC5036',

    //Google Analytics
    analyticsCode: FLVSanalyticsCode, // DON'T EDIT THIS... IT'S GRABBED FROM SETTINGS.JS

    openWindowText: 'Click to open the Speech Practice Tool and practice saying',
    openWindowButton: 'Open'
}


//=======================================//
//===== DO NOT EDIT BELOW THIS LINE =====//
//=======================================//

var params = '';
if(typeof sptConfig !== 'undefined') {
    params += '&sptConfig=' + encodeURIComponent(JSON.stringify(sptConfig));
}

var serverURL;
if(sptConfig.version === 'local'){
    serverURL = sptConfig.pathToLocalSPT;
}else if(sptConfig.version === 'dev'){
    serverURL = 'https://cdn.flvs.net/cdn/SpeechPracticeTool_dev/'
}else{
    serverURL = 'https://cdn.flvs.net/cdn/SpeechPracticeTool/';
}

function loadScript(url)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

$(document).ready(function () {
    loadScript(serverURL+'js/createSPT.js');
});