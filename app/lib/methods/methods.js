Meteor.methods({
	methodName: function () {
		if (Meteor.isClient) {
			//code
		}
		else if(Meteor.isServer) {
			//code
		};
	}
});