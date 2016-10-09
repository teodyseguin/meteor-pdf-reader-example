/**
 * DB is our custom class which we tend to abstract the
 * saving process logic.
 */
class DB {
	/**
	 * @param cls
	 * 	an object created using Class.created() via astronomy
	 * @param callback
	 * 	the messenger function to return the error encountered
	 * @return
	 * 	the return will either be the callback() containing an
	 * 	error mesage, or if all are good, will execute the .save()
	 */
	save(cls, callback) {
		cls.validate((err) => {
			if (err) {
				return callback(err);
			}

			cls.save();
		});
	}
}

export const DbService = new DB('DbService');
