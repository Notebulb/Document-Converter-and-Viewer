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
					//-> Session.set('fileIsReady', false);
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
};