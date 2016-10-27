// npm packages
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import pdfjsDist from 'pdfjs-dist';
import shelljs from 'shelljs/global';

class Path {
	listFiles(location, pdfOnly, callback) {
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

	createFolders(folders) {
		let self = this,
			uploadDirectory = path.resolve(process.env.HOMEPATH) + '/.uploads';

		if (!folders.length) {
			console.log('There are no folder names provided');
			return;
		}

		folders.forEach(function(folder) {
			self.listFiles(uploadDirectory, false, (result) => {
				if (!_.find(result, { name: folder })) {
					mkdir(uploadDirectory + '/' + folder);
				}
			});
		});
	}

	moveFiles(files, destination) {
		if (!files.length) {
			console.log('There are no files to move.');
			return;
		}

		files.forEach(function(file) {
			console.log('moving ' + file + ' to ' + destination);
			mv(file, destination);
		});
	}
}

export const PathService = new Path('PathService');
