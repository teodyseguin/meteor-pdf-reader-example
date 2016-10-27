import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

Uploads = new Mongo.Collection('uploads');
Uploads.publicFields = {
	_id: 1,
	filename: 1,
	path: 1,
	status: 1
};
Upload = Class.create({
	name: 'Upload',
	collection: Uploads,
	fields: {
		filename: String,
		path: String,
		status: {
			type: String,
			default: 'pending'
		},
		responseId: {
			type: String,
			default: '000'
		}
	},
	secured: false
});
