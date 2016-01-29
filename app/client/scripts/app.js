if (Meteor.isClient) {

	Template.cont.helpers({
		fileIsUploaded: function () {
			return Session.get('fileIsUploaded');
		},
		fileIsReady: function() {
			return Session.get('fileIsReady');
		}
	});

	Template.fileUploader.helpers({
		fileIsUploading: function () {
			return Session.get('fileIsUploading')? 'isHidden': '';
		}
	});
	Template.fileUploader.events({
		'change input[type="file"]': function (e) {
			Session.set('fileIsUploading', true);
			//trigger uploads
				//if error
					//-> Session.set('fileIsUploading', false);
				//if success upload
					//-> Session.set('fileIsUploading', false);
					//-> Session.set('fileIsUploaded', true);
			//then trigger conversion process
				//if is converting
					//-> Session.set('fileIsReady', false);
				//if success converting
					//-> Session.set('fileIsReady', true);
					//-> Session.set('convertedNoteData', **noteDataFromConversion**);
				//if error converting
					//-> Alert('problem converting file');
					//-> Session.set('fileIsReady', false);
					//-> Session.set('fileIsUploading', false);
		}
	});

	Template.documentViewer.helpers({
		note: function () {
			return Session.get('convertedNoteData');
		},
		noteUploadDate: function ()  {
			return moment(Session.get('convertedNoteData').createdAt).fromNow();
		}
	});
	Template.documentViewer.rendered = function () {

		var thisNote = Session.get('convertedNoteData'), isPdfConverterStyledThis;
		if(thisNote.isPdf){
			isPdfConverterStyledThis = true;
		}
		else{
			isPdfConverterStyledThis = false;
		};


		//paging
		$('#paging input').focus(function() {
			$(this).select();
		});


		//fullscreen
		$('#fullScreen a').click(function() {
			var elem = document.getElementById("noteViewerCont");
			if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
				if (elem.requestFullscreen) {
					elem.requestFullscreen();
				} else if (elem.msRequestFullscreen) {
					elem.msRequestFullscreen();
				} else if (elem.mozRequestFullScreen) {
					elem.mozRequestFullScreen();
				} else if (elem.webkitRequestFullscreen) {
					elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				}
			}
			else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
			}
		});


		//zoom
		$('#zoomLvls a:first-child').click(function() {
			var currentZoom;
			if (isPdfConverterStyledThis) {
				currentZoom = $('#noteContainer').contents().find('#page-container').css('zoom');
			}
			else {
				currentZoom = $('#noteContainer').contents().find('.froala-view').css('zoom');
			};
			var newZoom = Number(currentZoom)+0.25;
			if (isPdfConverterStyledThis) {
				$('#noteContainer').contents().find('#page-container').attr('style', 'zoom:'+newZoom+';');
			}
			else {
				$('#noteContainer').contents().find('.froala-view').attr('style', 'zoom:'+newZoom+';');
			};
		});
		$('#zoomLvls a:last-child').click(function() {
			var currentZoom;
			if (isPdfConverterStyledThis) {
				currentZoom = $('#noteContainer').contents().find('#page-container').css('zoom');
			}
			else {
				currentZoom = $('#noteContainer').contents().find('.froala-view').css('zoom');
			};
			var newZoom = Number(currentZoom)-0.25;
			if (newZoom==0){return false};

			if (isPdfConverterStyledThis) {
				$('#noteContainer').contents().find('#page-container').attr('style', 'zoom:'+newZoom+';');
			}
			else {
				$('#noteContainer').contents().find('.froala-view').attr('style', 'zoom:'+newZoom+';');
			};
		});



		//prevent scrolling background body on complete scrolling of iframe
			//--> must include https://github.com/jquery/jquery-mousewheel in your scripts
		$('#noteContainer').on('mousewheel',function(event) {
			var evt = event || window.event;
			var $this = $(this);
			var thisItemHeight = $this.outerHeight();
			var maxScroll = $this[0].scrollHeight - thisItemHeight;
			if ($this.scrollTop()>(maxScroll-1) && (evt.deltaY<0)) {
				evt.preventDefault();
				return false;
			}
			else if ($this.scrollTop()<1  && (evt.deltaY>0)) {
				evt.preventDefault();
				return false;
			};
		});
	};


  //font stuff
  WebFontConfig = {
    google: { families: [ 'Open+Sans::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
};