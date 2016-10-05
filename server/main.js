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
		let all = listFiles('/.uploads/*.pdf');

		return {
			files: all,
			count: all.length
		};
	},
	'pdfComplete'() {
		let all = listFiles('/.uploads/complete/*.pdf');

		return {
			files: all,
			count: all.length
		};
	},
	'pdfInProgress'() {
		let all = listFiles('/.uploads/inprogress/*.pdf');

		return {
			files: all,
			count: all.length
		};
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
