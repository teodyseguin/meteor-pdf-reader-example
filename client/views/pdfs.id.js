Template.pdfsId.events({
	'submit .response'() {
		Pdfs.insert({
			responseId: 1,
			admissionServices: '',
			friendlinessOfDoctors: '',
			friendlinessOfNurses: '',
			friendlinessOfAlliedHealth: '',
			cleanlinessOfAccommodation: '',
			qualityOfFoodDrinks: '',
			dischargeServices: '',
			firstName: '',
			surName: '',
			iStayInWard: 1,
			compliment: '',
			complaint: '',
			provideMoreInfo: false,
			attendPatientFocusGroup: false
		});

		return false;
	}
});
