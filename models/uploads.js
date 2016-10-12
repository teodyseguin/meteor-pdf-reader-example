import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

Uploads = new Mongo.Collection('uploads');
Uploads.publicFields = {
	_id: 1,
	filename: 1,
	status: 1
};
Upload = Class.create({
	name: 'Upload',
	collection: Uploads,
	fields: {
		filename: String,
		status: {
			type: String,
			default: 'pending'
		}
	},
	secured: false
});
