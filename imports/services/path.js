import shelljs from 'shelljs/global';
import pdfjsDist from 'pdfjs-dist';
import fs from 'fs';
import _ from 'lodash';

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

	createFolders() {
		this.listFiles('/.uploads', false, (result) => {
			if (!_.find(result, { name: 'complete' })) {
				mkdir('/.uploads/complete');
			}

			if (!_.find(result, { name: 'inprogress' })) {
				mkdir('/.uploads/inprogress');
			}
		});
	}
}

export const PathService = new Path('PathService');
