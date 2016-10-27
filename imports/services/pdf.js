const ocrSdkModule = require('../vendor/ocrsdk.js');

class Pdf {
	constructor(pdfPath, outputPath) {
		this.appId = 'zedocapp';
		this.password = 'KId2elpZyLDWiQaoTP7fSPF7';
		this.ocrServer = 'http://cloud.ocrsdk.com';
		this.ocrsdk = null;
		this.pdfPath = pdfPath;
		this.outputPath = outputPath;
		this.outputExt = '.xml';
		this.language = ['English'];
		this.response = {};
	}

	process(doc, callback) {
		let self = this;

		try {
			console.log('Processing PDF ...');

			self.ocrsdk = ocrSdkModule.create(self.appId, self.password);
			self.ocrsdk.serverUrl = self.ocrServer;

			if (self.appId.length == 0 || self.password.length == 0) {
				throw new Error('Please provide your application id and password');
			}

			if (self.pdfPath == '') {
				throw new Error('Please provide the path to your pdf file');
			}

			let settings = new ocrSdkModule.ProcessingSettings();
			settings.language = 'English'; // this.language.join();
			settings.exportFormat = 'xml';

			console.log('Uploading PDF...');
			self.ocrsdk.processImage(self.pdfPath, settings, uploadCompleted);
		}
		catch (err) {
			// console.log('Error: ' + err.message);
			return callback('Error: ' + err.message);
		}

		function uploadCompleted(err, taskData) {
			if (err) {
				// console.log('Error: ' + err.message);
				return callback('Error: ' + err.message);
			}

			console.log('Upload completed.');
			console.log('Task id = ' + taskData.id + ', status is ' + taskData.status);

			self.response.taskId = taskData.id;

			if (!self.ocrsdk.isTaskActive(taskData)) {
				// console.log('Unexpected task status ' + taskData.status);
				return callback('Unexpected task status ' + taskData.status);
			}

			self.ocrsdk.waitForCompletion(taskData.id, processingCompleted);
		}

		function processingCompleted(err, taskData) {
			if (err) {
				// console.log('Error: ' + err.message);
				return callback('Error: ' + err.message);
			}

			if (taskData.status != 'Completed') {
				console.log('Error processing the task.');
				self.response.status = taskData.status;

				if (taskData.error) {
					self.response.error = taskData.error;
					// console.log('Message: ' + taskData.error);
					return callback('Message: ' + taskData.error)
				}

				return;
			}

			self.response.status = taskData.status;
			console.log('Processing completed.');
			console.log('Downloading result to ' + self.outputPath + self.response.taskId + self.outputExt);

			self.ocrsdk.downloadResult(taskData.resultUrl.toString(), self.outputPath + self.response.taskId + self.outputExt, downloadCompleted);
		}

		function downloadCompleted(err) {
			if (err) {
				// console.log('Error: ' + error.message);
				return callback('Error: ' + error.message);
			}

			console.log('Done.');
			return callback(null, self.response);
		}
	}
}

PdfService = Pdf;
