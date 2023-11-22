const db = require("../config/db").connection;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const defaultPass = "12345678";

//Copied and Moved createAcademicYear from here to academicYearService. 
//Reference Commit : createdEnrollmentService, Finished academicYearService and Major Database changes

const createAdmin = (req, res) => {
	const obj = req.body;

	if (obj.CNIC) {
		//check for regex here
		// return res.status(400).json({message: "CNIC is required!"} )
	} else {
		return res.status(400).json({ message: "cnic is required !" });
	}
	if (!obj.firstName) {
		return res.status(400).json({ message: "firstName is required!" });
	}
	if (!obj.lastName) {
		return res.status(400).json({ message: "lastName is required!" });
	}
	if (!obj.hireDate) {
		return res.status(400).json({ message: "hireDate is required!" });
	}
	if (!obj.nationality) {
		return res.status(400).json({ message: "nationality is required!" });
	}
	if (!obj.salary) {
		return res.status(400).json({ message: "salary is required!" });
	}

	db.query(
		{
			sql: "INSERT INTO ?? (??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)",
			timeout: 40000, // 40s
			values: [
				"ADMIN",
				"CNIC",
				"FIRST_NAME",
				"LAST_NAME",
				"HIRE_DATE",
				"GENDER",
				"NATIONALITY",
				"RELIGION",
				"SALARY",
				obj.CNIC,
				obj.firstName,
				obj.lastName,
				obj.hireDate,
				obj.gender,
				obj.nationality,
				obj.religion,
				obj.salary,
			],
		},
		function (error, results, fields) {
			if (error) {
				//TODO: update error response properly
				return res.status(500).send(error);
			} else {
				//generate erp for the user
				db.query(
					{
						sql: "SELECT ?? FROM ?? WHERE ?? = ?",
						timeout: 40000,
						values: ["ADMIN_ID", "ADMIN", "CNIC", obj.CNIC],
					},
					(error1, results1, fields1) => {
						if (error1) {
							return res.status(500).send(error1);
						} else {
							bcrypt.hash(defaultPass, saltRounds, function (err, hash) {
								if (err) return res.status(500).send(err);
								else {
									// console.log(results1);
									// console.log(fields1);
									var userName = results1[0].ADMIN_ID;

									userName = "A" + userName;
									db.query(
										{
											sql: "INSERT INTO ?? (??,??,??) VALUES (?,?,?)",
											timeout: 40000,
											values: [
												"USERS",
												"USERNAME",
												"PASSWORD",
												"ADMIN_ID",
												userName,
												hash,
												results1[0].ADMIN_ID,
											],
										},
										(error, results, fields) => {
											if (error) return res.status(500).send(error);
											else {
												return res.status(200).json({
													message: "successfully created and added to users",
													username: userName,
													password: defaultPass,
													admin: {
														admin_ID: userName,
														CNIC: obj.CNIC,
														firstName: obj.firstName,
														lastName: obj.lastName,
														hireDate: obj.hireDate,
														gender: obj.gender,
														nationality: obj.nationality,
														religion: obj.religion,
														salary: obj.salary,
													},
												});
											}
										}
									);
								}
							});
						}
					}
				);
			}
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		}
	);

};

const assignClassTeacher = (req, res) => {

	var obj = req.body;

	if (!obj.id) {
		return res.status(400).json({ message: "MissingInputException: FacultyID is missing" });
	}

	if (!obj.classID) {
		return res.status(400).json({ message: "MissingInputException: ClassD is missing" });
	}

	db.query(
		{
			sql: "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
			values: ["USERS", "USER_ID", obj.id, "BLOCK", 0]
		}, (errors, results, fields) => {

			if (errors) {
				return res.status(500).json(
					{
						message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"
					}
				);
			} else {

				if (results.length == 0 || results.length > 1) {

					return res.status(500).json(
						{
							message: "DatabaseInconsistencyException: Zero or More users with the same id found, db is fucked?",
							EC: -1
						}
					);

				} else {

					db.query(
						{
							sql: "SELECT * FROM ?? WHERE ?? = ?",
							values: ["CLASS", "CLASS_ID", obj.classID]
						}, (errors, results, fields) => {

							if (errors) {
								return res.status(500).json(
									{
										message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"
									}
								);
							} else {

								if (results.length == 0 || results.length > 1) {

									return res.status(200).json(
										{
											message: "DatabaseInconsistencyException: Zero or More classes with the same id found, db is fucked?",
											EC: -1
										}
									);
								} else {

									console.log(3);

									db.query(
										{
											sql: "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
											values: ["CLASS_TEACHER", "CLASS_ID", obj.classID, "FACULTY_ID", obj.id]
										}, (errors, results, fields) => {

											if (errors) {
												return res.status(500).json(
													{
														message: "SQLException: Learn2SQL my habshi"
													}
												);
											} else {
												if (results.length != 0) {
	
													return res.status(200).json(
														{
															message: `Class [ClassID : ${obj.classID}]  already has the teacher [FacultyID : ${obj.id}] assigned as the class teacher`,
															EC: 2
														}
													);
												} else {
	
													console.log(4);
	
													db.query(
														{
															sql: "INSERT INTO ?? (?? ,??) VALUES (?, ?)",
															values: ["CLASS_TEACHER", "CLASS_ID", "FACULTY_ID", obj.classID, obj.id]
														}, (errors, results, fields) => {
	
															if (errors) {
																return res.status(200).json(
																	{
																		message: "SQLException: Learn2SQL my habshi",
																		EC: -1
																	}
																);
															}
	
															return res.status(200).json(
																{
																	message: `Successfully assigned teacher [${obj.id}] to class [${obj.classID}]!`,
																	EC: 1
																}
															);
														}
													)
												}
											}
										}
									)
								}
							}
						}
					)
				}
			}
		}
	)
}

module.exports = {
	createAdmin,
	assignClassTeacher
};
