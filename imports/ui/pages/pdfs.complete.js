import './pdfs.complete.html';

let complete = new ReactiveVar();

Meteor.call('pdfComplete', (err, res) => {
	complete.set(res);
});

Template.pdfsComplete.helpers({
	list: function() {
		return complete.get();
	}
});

FlowRouter.route('/pdfs/complete', {
	name: 'pdfs.complete',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsComplete' });
	}
});
