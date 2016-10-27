import { Template } from 'meteor/templating';
// custom services
import { DbService } from '../../services/db.js';
// ui templates
import './pdfs.id.html';
import './pdfs.id.viewing.html';

/**
 * Route for serving individual PDF page
 */
FlowRouter.route('/pdfs/:pdfId', {
	name: 'pdfs.id.viewing',
	action: (params, queryParams) => {
		BlazeLayout.render('mainLayout', { content: 'pdfsId.viewing' });
		// BlazeLayout.render('mainLayout', { content: 'pdfsId' });
	}
});

Template.pdfsId.onCreated(function() {
	Meteor.subscribe('list.pdfs.id', ['hwtRx2SvHWMcYDHYj']);
});

Template.pdfsId.helpers({
	embedPdf() {
		let result = Upload.findOne('hwtRx2SvHWMcYDHYj');
		console.log(result);
	},
	testing() {
		return 'testing';
	}
});

Template.pdfsId.events({
	'click #save-response'(event) {
		let pdf = new Pdf();

		pdf.responseId = 1;
		pdf.admissionServices = event.target.form.admission.value;
		pdf.friendlinessOfDoctors = event.target.form.friendlinessd.value;
		pdf.friendlinessOfNurses = event.target.form.friendlinessn.value;
		pdf.friendlinessOfAlliedHealth = event.target.form.friendlinessa.value;
		pdf.cleanlinessOfAccommodation = event.target.form.cleanliness.value;
		pdf.qualityOfFoodDrinks = event.target.form.quality.value;
		pdf.dischargeServices = event.target.form.discharge.value;
		pdf.firstName = event.target.form.firstname.value;
		pdf.surName = event.target.form.surname.value;
		pdf.iStayInWard = parseInt(event.target.form.stay.value);
		pdf.compliment = event.target.form.compliment.value;
		pdf.complaint = event.target.form.complaint.value;
		pdf.provideMoreInfo = event.target.form.providemoreinfo.checked;
		pdf.attendPatientFocusGroup = event.target.form.attendpatientfocusgroup.checked;

		DbService.save(pdf, function saveResponse(err, result) {
			if (err) {
				alert('Something weng wrong, please try again');
			}

			console.log(result);
		});
	}
});
