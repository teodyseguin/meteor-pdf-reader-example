import { DbService } from '../../services/db.js';
import PdfViewer from '../../services/src/pdfviewer.js';
import './pdfs.id.html';
import './pdfs.id.viewing.html';

/**
 * Route for serving individual PDF page
 */
FlowRouter.route('/pdfs/:pdfId', {
	name: 'pdfs.id',
	action: (params, queryParams) => {
		// for viewing the uploaded pdf, we check for the
		// ?viewing=true if it's in the url, then we provide
		// the proper template for viewing
		if (queryParams.viewing) {
			// @TODO
			// 1. Need to load the PDF viewer here - x
			// 2. Need to use the pdfviewer.js to layout the pdf file
			BlazeLayout.render('mainLayout', { content: 'pdfsId.viewing' });

			// var staticHost = 'http://localhost:9000';

			// // normal case
			// var config1 = {
			//   pdfUrl: '/.uploads/sample.pdf',
			//   download: false,
			//   staticHost: staticHost,
			// };

			// new PdfViewer(config1).embed(document.getElementById('pdfviewertest'));

			return;
		}

		BlazeLayout.render('mainLayout', { content: 'pdfsId' });
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
