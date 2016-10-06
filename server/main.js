import { Meteor } from 'meteor/meteor';

// npm packages
import shelljs from 'shelljs/global';
import pdfjsDist from 'pdfjs-dist';
import fs from 'fs';

/**
 * On startup of the server, we need to create
 * 2 basic folders: .uploads/ and tmp/
 */
Meteor.startup(() => {
	UploadServer.init({
		tmpDir: '/.uploads/tmp',
		uploadDir: '/.uploads',
		checkCreateDirectories: true
	});

	// we also create a complete/ folder in which
	// we intend to copy all pdf's that are complete
	// scanned already
	createCompleteFolder();
});

/**
 * List of methods that can be called from the client side
 * The soul purpose of each of these methods are to provide
 * the list of pdf filenames and their total number, depending
 * on which folder they are currently in
 */
Meteor.methods({
	'pdfList'() {
		return listFiles('/.uploads/*.pdf', true, (result) => {
			return {
				files: result,
				count: result.length
			};
		});
	},
	'pdfComplete'() {
		return listFiles('/.uploads/complete/*.pdf', true, (result) => {
			return {
				files: result,
				count: result.length
			};
		});
	},
	'pdfInProgress'() {
		return listFiles('/.uploads/inprogress/*.pdf', true, (result) => {
			return {
				files: result,
				count: result.length
			};
		});
	}
});

function listFiles(location, pdfOnly, callback) {
	let files = [],
		counter = 0;

	ls(location).forEach((file, index, array) => {
		let obj = {};
		
		if (pdfOnly) {
			let data = new Uint8Array(fs.readFileSync(file));
		
			PDFJS.getDocument(data)
				.then(pdfDocument => {
					obj.count = pdfDocument.numPages;
				});
		}

		obj.name = file;
		obj.id = counter++;
		files.push(obj);
	});

	return callback(files);
}

function createCompleteFolder() {
	listFiles('/.uploads', false, (result) => {
		if (!result['complete']) {
			mkdir('/.uploads/complete');
		}
	});
}
