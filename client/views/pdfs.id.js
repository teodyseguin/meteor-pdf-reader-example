import { DbService } from '../../imports/services/db.js';

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
