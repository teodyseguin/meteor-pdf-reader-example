// meteor packages
import { Meteor } from 'meteor/meteor';
// custom module
import { DbService } from '../imports/services/db.js';
import { PathService } from '../imports/services/path.js';
// npm packages
import path from 'path';

/**
 * On startup of the server, we need to create
 * 2 basic folders: .uploads/ and tmp/
 */
Meteor.startup(() => {
	let uploadDirectory = path.resolve(process.env.HOMEPATH) + '/.uploads',
		completeDirectory = uploadDirectory + '/complete',
		inProgressDirectory = uploadDirectory + '/inprogress',
		tempUploadDirectory = uploadDirectory + '/tmp';

	UploadServer.init({
		tmpDir: tempUploadDirectory,
		uploadDir: uploadDirectory,
		checkCreateDirectories: true,
		finished: (fileInfo, formFields) => {
			let upload = new Upload();
			upload.filename = fileInfo.name;

			DbService.save(upload, function response(err, result) {
				if (err) {
					console.log('Something went wrong. Deleting ' + fileInfo.name);
					rm(uploadDirectory + fileInfo.name);
					console.log(err);
					return;
				}
			});
		}
	});

	// we create some folders here and they are the
	// - complete/
	// - inprogress/
	PathService.createFolders(['inprogress', 'complete']);
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

Meteor.methods({
	'getEnvironmentPath'() {
		return process.env.HOMEPATH;
	}
});

/**
 * @TODO
 * 
 * - After implementing this code (although this works)
 * it ourputs some weird code samples on the home page
 * which I really don't expect to happen. Need to figure
 * out how to remove it.
 */
Router.route('/file/:filename', function() {
    var self = this;
    var res = this.response;
    var filename = this.params.filename
    var path = Npm.require("path");
    var fs = Npm.require("fs");

    Meteor.call('getEnvironmentPath', (err, res) => {
    	let uploadDirectory = path.resolve(res) + '/.uploads';

    	fs.readFile(path.join(uploadDirectory, filename), function(err, fileContent) {
	        if(err) console.log(err);

	        self.response.statusCode = 200;
	        self.response.setHeader("Content-disposition", filename);
	        self.response.end(fileContent);
	    });
    });

}, { where: 'server' });
