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
		responseId: Number,
		admissionServices: String,
		friendlinessOfDoctors: String,
		friendlinessOfNurses: String,
		friendlinessOfAlliedHealth: String,
		cleanlinessOfAccommodation: String,
		qualityOfFoodDrinks: String,
		dischargeServices: String,
		firstName: String,
		surName: String,
		iStayInWard: Number,
		compliment: String,
		complaint: String,
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
