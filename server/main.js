// meteor packages
import { Meteor } from 'meteor/meteor';
// custom module
import { DbService } from '../imports/services/db.js';
import { PathService } from '../imports/services/path.js';
import '../imports/services/pdf.js';
// npm packages
import path from 'path';
import fs from 'fs';

let pdf = null;

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
			upload.path = uploadDirectory;

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

Meteor.publish('list.pdfs.id', function(id) {
	return Upload.findOne(
		{
			_id: id
		},
		{
			fields: Uploads.publicFields
		}
	);
});

// this goes inner
function x(doc, callback) {
	pdf.process(doc, function(err, result) {
		if (err) {
			return callback(err);
		}

		return callback(null, result);
	});
}

let wrappedGetPdfResponse = Meteor.wrapAsync(x);

Meteor.methods({
	'startPdfProcess'(pdfId) {
		let doc = Upload.findOne({ _id: pdfId }),
			file = doc.filename,
			fileToMove = path.resolve(process.env.HOMEPATH + '/.uploads/' + file),
			fileToProcess = path.resolve(process.env.HOMEPATH + '/.uploads/inprogress/' + file),
			outputFile = path.resolve(process.env.HOMEPATH + '/.uploads/complete/result-'),
			inProgressDirectory = path.resolve(process.env.HOMEPATH + '/.uploads/inprogress');
		
		pdf = new PdfService(fileToProcess, outputFile);
		PathService.moveFiles([fileToMove], inProgressDirectory);
		doc.status = 'inprogress';
		doc.save();

		// @TODO there is a problem if multiple call of this method was done
		// Future.task(pdf.process(doc));
		// pdf.process(doc, function(err, result) {
		// 	if console.log(err);
		// 		return;
		// 	}
		// });

		let result = wrappedGetPdfResponse(doc);
		
		if (result.status === 'Completed') {
			console.log('here in Complete');
			doc.status = 'complete';
			doc.save();
		}
	}
});

/**
 * @TODO
 * 
 * - After implementing this code (although this works)
 * it outputs some weird code samples on the home page
 * which I really don't expect to happen. Need to figure
 * out how to remove it.
 * - i'm gonna hide the weird output via css in the mean time
 * until i figure it out
 */
Router.route('/file/:filename', function routeCallback() {
    let self = this,
    	filename = self.params.filename,
    	uploadDirectory = path.resolve(process.env.HOMEPATH) + '/.uploads';

	fs.readFile(path.join(uploadDirectory, filename), (err, fileContent) => {
        if (err) {
        	console.log(err);
        }

        self.response.statusCode = 200;
        
        // This one, would lead the pdf file to be downloaded
        // self.response.setHeader("Content-disposition", filename);

        // While this one this one, will allow viewing of the file
        self.response.setHeader('Content-Type', 'application/pdf');
        self.response.end(fileContent);
    });
}, { where: 'server' });
