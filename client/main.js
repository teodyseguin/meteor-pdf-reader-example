import { Template } from 'meteor/templating';

import './main.html';

Template.uploader.events({
	'change input[type="file"]'(event, instance) {
	    let func = this,
	        files = event.currentTarget.files[0],
	        reader = new FileReader();

	    // reader.onload = function(fileLoadEvent) {
	    //   console.log(files);
	    //   console.log(reader.result);
	    //   Meteor.call('file-upload', files, reader.result);
	    // }

	    // reader.readAsBinaryString(files);
	}
});
