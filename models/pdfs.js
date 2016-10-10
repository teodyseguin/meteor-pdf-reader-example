import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

/**
 * For some reason, I still don't understand how this class
 * has been accessible on the template side.
 */
Pdfs = new Mongo.Collection('pdfs');
Pdf = Class.create({
	name: 'Pdf',
	collection: Pdfs,
	fields: {
		responseId: {
			type: Number,
			default: 0
		},
		admissionServices: {
			type: String,
			default: ''
		},
		friendlinessOfDoctors: {
			type: String,
			default: ''
		},
		friendlinessOfNurses: {
			type: String,
			default: ''
		},
		friendlinessOfAlliedHealth: {
			type: String,
			default: ''
		},
		cleanlinessOfAccommodation: {
			type: String,
			default: ''
		},
		qualityOfFoodDrinks: {
			type: String,
			default: ''
		},
		dischargeServices: {
			type: String,
			default: ''
		},
		firstName: {
			type: String,
			default: ''
		},
		surName: {
			type: String,
			default: ''
		},
		iStayInWard: {
			type: Number,
			default: 0
		},
		compliment: {
			type: String,
			default: ''
		},
		complaint: {
			type: String,
			default: ''
		},
		provideMoreInfo: {
			type: Boolean,
			default: false
		},
		attendPatientFocusGroup: {
			type: Boolean,
			default: false
		}
	},
	secured: false
});
