// meteor packages
import { Meteor } from 'meteor/meteor';
// custom module
import { DbService } from '../imports/services/db.js';
import { PathService } from '../imports/services/path.js';

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
	PathService.createFolders();
});

Meteor.publish('list.pdfs', function(status) {
	return Upload.find(
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
