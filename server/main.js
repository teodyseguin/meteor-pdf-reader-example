import { Meteor } from 'meteor/meteor';

// npm packages
import shelljs from 'shelljs/global';

Meteor.startup(() => {
	UploadServer.init({
		tmpDir: '/.uploads/tmp',
		uploadDir: '/.uploads',
		checkCreateDirectories: true
	});

	createCompleteFolder();
});

Meteor.methods({
	'pdfList'() {
		return listFiles('/.uploads/complete/*.pdf').length + listFiles('/.uploads/inprogress/*.pdf').length + listFiles('/.uploads/*.pdf').length;
	},
	'pdfComplete'() {
		return listFiles('/.uploads/complete/*.pdf').length;
	},
	'pdfInProgress'() {
		return listFiles('/.uploads/inprogress/*.pdf').length;
	}
});

function listFiles(location) {
	let files = [];

	ls(location).forEach(file => {
		files.push(file);
	});

	return files;
}

function createCompleteFolder() {
	let files = listFiles('/.uploads');

	if (!files['complete']) {
		mkdir('/.uploads/complete');
	}
}
