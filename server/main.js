// meteor packages
import { Meteor } from 'meteor/meteor';

// npm packages
import shelljs from 'shelljs/global';
import pdfjsDist from 'pdfjs-dist';
import fs from 'fs';
import _ from 'lodash';

// custom module
import { DbService } from '../imports/services/db.js';

/**
 * On startup of the server, we need to create
 * 2 basic folders: .uploads/ and tmp/
 */
Meteor.startup(() => {
	UploadServer.init({
		tmpDir: '/.uploads/tmp',
		uploadDir: '/.uploads',
		checkCreateDirectories: true,
		finished: (fileInfo, formFields) => {
			let upload = new Upload();
			upload.filename = fileInfo.name;

			DbService.save(upload, function response(err, result) {
				if (err) {
					console.log('Something went wrong. Deleting ' + fileInfo.name);
					rm('/.uploads/' + fileInfo.name);
					console.log(err);
					return;
				}
			});
			// getTheRecordId();
			// renameTheUploadedFile();
		}
	});

	// we create some folders here and they are the
	// - complete/
	// - inprogress/
	createFolders();
});

Meteor.publish('list.pdfs', function(status) {
	return Uploads.find(
		{
			_id: { 
				$exists: true 
			},
			status: {
				$in: status
			}
		},
		{
			fields: Uploads.publicFields
		}
	);
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

function createFolders() {
	listFiles('/.uploads', false, (result) => {
		if (!_.find(result, { name: 'complete' })) {
			mkdir('/.uploads/complete');
		}

		if (!_.find(result, { name: 'inprogress' })) {
			mkdir('/.uploads/inprogress');
		}
	});
}
