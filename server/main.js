import { Meteor } from 'meteor/meteor';

// npm packages
import path from 'path';

Meteor.startup(() => {
	let absolutePath = path.join('../');

	UploadServer.init({
		tmpDir: Meteor.rootPath + '/.uploads/tmp',
		uploadDir: Meteor.rootPath + '/.uploads',
		checkCreateDirectories: true
	});
});
