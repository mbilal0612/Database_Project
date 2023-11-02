const db = require("../config/db").connection;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "NOONEcanCRACKthis";
const mailer = require("./mailer");

const createUser = (req, res) => {

	var obj = req.body;

	if (!obj.firstName) {
		return res
			.status(400)
			.json({ message: "MissingInputException: firstName is required!" });
	}
	if (!obj.lastName) {
		return res
			.status(400)
			.json({ message: "MissingInputException: lastName is required!" });
	}
	if (!obj.CNIC) {
		return res
			.status(400)
			.json({ message: "MissingInputException: CNIC is required!" });
	}
	if (!obj.gender) {
		return res
			.status(400)
			.json({ message: "MissingInputException: Gender is required!" });
	}
	if (!obj.religion) {
		return res
			.status(400)
			.json({ message: "MissingInputException: religion is required!" });
	}
	if (!obj.nationality) {
		return res
			.status(400)
			.json({ message: "MissingInputException: nationality is required!" });
	}
	if (!obj.DOB) {
		return res
			.status(400)
			.json({ message: "MissingInputException: dateOfBirth is required!" });
	}
	if (!obj.joinDate) {
		return res
			.status(400)
			.json({ message: "MissingInputException: admissionDate is required!" });
	}
	if (!obj.emergencyContact) {
		return res.status(400).json({
			message: "MissingInputException: emergency contact is required!",
		});
	}
	if (!obj.email) {
		return res
			.status(400)
			.json({ message: "MissingInputException: email address is required!" });
	}
	if (!obj.roleID) {
		return res
			.status(400)
			.json({ message: "MissingInputException: roleID is required!" });
	}
	if (!obj.address) {
		return res
			.status(400)
			.json({ message: "MissingInputException: address is required!" });
	}
	if (!obj.phone) {
		return res
			.status(400)
			.json({ message: "MissingInputException: phone is required!" });
	}

	var randpass = obj.roleID + "@";
	var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
	randpass = randpass + seq;

	db.query(
		{
			sql: "SELECT * FROM ?? WHERE ?? = ? OR ?? = ?",
			values: ["USERS", "EMAIL_ADDRESS", obj.email, "CNIC", obj.CNIC],
		},
		(errors, results) => {
			if (errors) {
				return res.status(400).json({
					message: "SQLSkillIssue: Get good! [0]",
					data: errors,
				});
			}

			if (results.length > 0) {
				return res.status(400).json({
					message:
						"DuplicateUserException: A user with similar unique fields exists!",
				});
			}

			bcrypt.genSalt(12, function (err, salt) {
				if (err) {
					if (err)
						return res
							.status(500)
							.json({ message: "SkillIssueException: Learn2Salt" });
				}

				bcrypt.hash(randpass, salt, function (err, hash) {
					if (err) {
						if (err)
							return res
								.status(500)
								.json({ message: "SkillIssueException: Learn2Hash" });
					} else {
						if (obj.roleID === "GUARDIAN") {
							if (!obj.occupation) {
								return res.status(400).json({
									message:
										"MissingInputException: Occupation is missing for Guardian type.",
								});
							}
						}

						if (obj.roleID !== "GUARDIAN" || obj.roleID !== "STUDENT") {
							if (!obj.salary) {
								return res.status(400).json({
									message:
										"MissingInputException: Salary is missing for employee type.",
								});
							}
						}

						db.query(
							{
								sql: "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
								values: [
									"USERS",
									"CNIC",
									"FIRST_NAME",
									"LAST_NAME",
									"DOB",
									"GENDER",
									"EMERGENCY_CONTACT",
									"JOIN_DATE",
									"NATIONALITY",
									"RELIGION",
									"P_HASH",
									"ROLE_ID",
									"EMAIL_ADDRESS",
									"ADDRESS",
									"PHONE",
									obj.CNIC,
									obj.firstName,
									obj.lastName,
									obj.DOB,
									obj.gender,
									obj.emergencyContact,
									obj.joinDate,
									obj.nationality,
									obj.religion,
									hash,
									obj.roleID,
									obj.email,
									obj.address,
									obj.phone,
								],
							},
							(errors, results, fields) => {
								if (errors) {
									return res.status(400).json({
										message: "SQLSkillIssue: Get good!",
										data: errors,
									});
								}

								if (obj.roleID === "GUARDIAN") {
									db.query(
										{
											sql: "INSERT INTO ?? (??,??) VALUES ( (SELECT ?? FROM ?? WHERE ?? = ?), ?)",
											values: [
												"GUARDIAN_DETAILS",
												"GUARDIAN_ID",
												"OCCUPATION",
												"USER_ID",
												"USERS",
												"CNIC",
												obj.CNIC,
												obj.occupation,
											],
										},
										(errors, results, fields) => {
											if (errors) {
												return res.status(400).json({
													message: "SQLSkill_Issue: Get good!",
													data: errors,
												});
											}

											db.query(
												{
													sql: "SELECT ?? FROM ?? WHERE ?? = ?",
													values: [
														"USER_ID", "USERS", "EMAIL_ADDRESS", obj.email
													]
												}, (errors, results, fields) => {

													if (errors) {
														console.log(errors);
														return res.status(500).json({ message: "SQLSkill_Issue Exception: Get good nigga!" });
													}

													if (results.length == 0) {
														console.log(errors);
														return res.status(500).json({ message: "ConsistencyMismatchException: Fuckup in dataentry or SQL!" });
													}

													var mx = {
														from: "SchoolDB Team",
														to: obj.email,
														subject: "SchoolDB Registration",
														text: `Dear ${obj.firstName} ${obj.lastName} \r\n\r\nYour registration at SchoolDBMS is successful. Your credentials are as follows: \r\nERP : ${results[0].USER_ID}\r\nPassword : ${randpass}\r\n\r\nRegards,\r\nSchoolDB Team.`,
													};

													mailer.transporter.sendMail(mx, function (err, result) {
														if (err) {
															console.log(err);
															return res.status(400).send("noffins");
														}
														return res.status(200).json({
															message:
																"Successfully created Guardian. Password reset details have been sent to their email.",
														});
													})

												}
											)
										}
									);
								} else if (obj.roleID !== "STUDENT") {
									db.query(
										{
											sql: "INSERT INTO ?? (??,??,??) VALUES ( (SELECT ?? FROM ?? WHERE ?? = ?), ?,?)",
											values: [
												"EMPLOYEE_DETAILS",
												"EMPLOYEE_ID",
												"SALARY",
												"FULLTIME",
												"USER_ID",
												"USERS",
												"CNIC",
												obj.CNIC,
												obj.salary,
												obj.fulltime,
											],
										},
										(errors, results) => {
											if (errors) {
												return res.status(400).json({
													message: "SQLSkill_Issue: Get good! [3]",
													data: errors,
												});
											}

											db.query(
												{
													sql: "SELECT ?? FROM ?? WHERE ?? = ?",
													values: [
														"USER_ID", "USERS", "EMAIL_ADDRESS", obj.email
													]
												}, (errors, results, fields) => {

													if (errors) {
														console.log(errors);
														return res.status(500).json({ message: "SQLSkill_Issue Exception: Get good nigga!" });
													}

													if (results.length == 0) {
														console.log(errors);
														return res.status(500).json({ message: "ConsistencyMismatchException: Fuckup in dataentry or SQL!" });
													}

													var mx = {
														from: "SchoolDB Team",
														to: obj.email,
														subject: "SchoolDB Registration",
														text: `Dear ${obj.firstName} ${obj.lastName} \r\n\r\nYour registration at SchoolDBMS is successful. Your credentials are as follows: \r\nERP : ${results[0].USER_ID}\r\nPassword : ${randpass}\r\n\r\nRegards,\r\nSchoolDB Team.`,
													};

													mailer.transporter.sendMail(mx, function (err, result) {
														if (err) {
															console.log(err);
															return res.status(400).send("noffins");
														}
														return res.status(200).json({
															message:
																"Successfully created Employee. Password reset details have been sent to their email.",
														});
													})

												}
											)

										}
									);
								} else {

									db.query(
										{
											sql: "SELECT ?? FROM ?? WHERE ?? = ?",
											values: [
												"USER_ID", "USERS", "EMAIL_ADDRESS", obj.email
											]
										}, (errors, results, fields) => {

											if (errors) {
												console.log(errors);
												return res.status(500).json({ message: "SQLSkill_Issue Exception: Get good nigga!" });
											}

											if (results.length == 0) {
												console.log(errors);
												return res.status(500).json({ message: "ConsistencyMismatchException: Fuckup in dataentry or SQL!" });
											}

											var mx = {
												from: "SchoolDB Team",
												to: obj.email,
												subject: "SchoolDB Registration",
												text: `Dear ${obj.firstName} ${obj.lastName} \r\n\r\nYour registration at SchoolDBMS is successful. Your credentials are as follows: \r\nERP : ${results[0].USER_ID}\r\nPassword : ${randpass}\r\n\r\nRegards,\r\nSchoolDB Team.`,
											};

											mailer.transporter.sendMail(mx, function (err, result) {
												if (err) {
													console.log(err);
													return res.status(400).send("noffins");
												}
												return res.status(200).json({
													message:
														"Successfully created Student. Password reset details have been sent to their email.",
												});
											})

										}
									)

								}
							}
						);
					}
				});
			});
		}
	);
};

const changeUserPassword = (req, res) => {
	var obj = req.body;

	if (!obj.oldPassword) {
		return res
			.status(400)
			.json({ message: "MissingInputException: oldPassword is required!" });
	}

	if (!obj.newPassword) {
		return res
			.status(400)
			.json({ message: "MissingInputException: newPassword is required!" });
	}

	if (!obj.id) {
		return res
			.status(400)
			.json({ message: "MissingInputException: ID is required!" });
	}

	db.query(
		{
			sql: "SELECT ?? FROM ?? WHERE ?? = ?",
			values: ["P_HASH", "USERS", "USER_ID", obj.id],
		},
		(errors, results, fields) => {
			if (errors) {
				return res
					.status(500)
					.json({ message: "Skill_IssueException: Learn2SQL!" });
			}

			bcrypt.compare(
				obj.oldPassword,
				results[0].P_HASH,
				function (err, result) {
					if (err) {
						return res
							.status(500)
							.json({ message: "Skill_IssueException: Learn2Hash!" });
					}

					if (result) {
						bcrypt.hash(obj.newPassword, 12, function (err, result) {
							db.query(
								{
									sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
									values: ["USERS", "P_HASH", result, "USER_ID", obj.id],
								},
								(errors, results, fields) => {
									if (errors) {
										return res
											.status(400)
											.json({ message: "Skill_IssueException: Learn 2 SQL!" });
									}

									return res
										.status(200)
										.json({ message: "Successfully set new password1" });
								}
							);
						});
					} else {
						return res.status(400).json({
							message:
								"IncorrectDataException: Either the ID or the Password is Incorrect",
						});
					}
				}
			);
		}
	);
};

const queryLogin = (req, res) => {
	var obj = req.body;
	if (!obj.id) {
		return res.status(400).json({ message: "ID is required!" });
	}
	if (!obj.password) {
		return res.status(400).json({ message: "password is required!" });
	}

	db.query(
		{
			sql: "SELECT * FROM ?? WHERE ?? = ?",
			values: ["USERS", "USER_ID", obj.id],
		},
		(errors, results, fields) => {
			if (errors) {
				return res
					.status(400)
					.json({ message: "Skill_IssueException: Learn 2 SQL!" });
			}
			if (results.length === 0)
				return res.status(400).json({ message: "This ERP does not exist" });
			//   console.log(results);

			bcrypt.compare(obj.password, results[0].P_HASH, function (err, result) {
				if (result) {
					tok = jwt.sign({ id: obj.id, userType: results[0].ROLE_ID }, privateKey);
					return res.status(200).json({
						message: "Login Successful!",
						token: tok,
						userType: results[0].ROLE_ID,
					});
				}

				return res.status(400).json({ message: "Incorrect Password" });
			});
		}
	);
};

const developmentCreateUser = (req, res) => {
	
	var obj = req.body;

	if (!obj.firstName) {
		return res
			.status(400)
			.json({ message: "MissingInputException: firstName is required!" });
	}
	if (!obj.lastName) {
		return res
			.status(400)
			.json({ message: "MissingInputException: lastName is required!" });
	}
	if (!obj.CNIC) {
		return res
			.status(400)
			.json({ message: "MissingInputException: CNIC is required!" });
	}
	if (!obj.gender) {
		return res
			.status(400)
			.json({ message: "MissingInputException: Gender is required!" });
	}
	if (!obj.religion) {
		return res
			.status(400)
			.json({ message: "MissingInputException: religion is required!" });
	}
	if (!obj.nationality) {
		return res
			.status(400)
			.json({ message: "MissingInputException: nationality is required!" });
	}
	if (!obj.DOB) {
		return res
			.status(400)
			.json({ message: "MissingInputException: dateOfBirth is required!" });
	}
	if (!obj.joinDate) {
		return res
			.status(400)
			.json({ message: "MissingInputException: admissionDate is required!" });
	}
	if (!obj.emergencyContact) {
		return res.status(400).json({
			message: "MissingInputException: emergency contact is required!",
		});
	}
	if (!obj.email) {
		return res
			.status(400)
			.json({ message: "MissingInputException: email address is required!" });
	}
	if (!obj.roleID) {
		return res
			.status(400)
			.json({ message: "MissingInputException: roleID is required!" });
	}
	if (!obj.address) {
		return res
			.status(400)
			.json({ message: "MissingInputException: address is required!" });
	}
	if (!obj.phone) {
		return res
			.status(400)
			.json({ message: "MissingInputException: phone is required!" });
	}

	var randpass = obj.roleID + "@";
	var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
	randpass = randpass + seq;

	console.log(randpass);

	db.query(
		{
			sql: "SELECT * FROM ?? WHERE ?? = ? OR ?? = ?",
			values: ["USERS", "EMAIL_ADDRESS", obj.email, "CNIC", obj.CNIC],
		},
		(errors, results) => {
			if (errors) {
				return res.status(400).json({
					message: "SQLSkillIssue: Get good! [0]",
					data: errors,
				});
			}

			if (results.length > 0) {
				return res.status(400).json({
					message:
						"DuplicateUserException: A user with similar unique fields exists!",
				});
			}

			bcrypt.genSalt(12, function (err, salt) {
				if (err) {
					if (err)
						return res
							.status(500)
							.json({ message: "SkillIssueException: Learn2Salt" });
				}

				bcrypt.hash(randpass, salt, function (err, hash) {
					if (err) {
						if (err)
							return res
								.status(500)
								.json({ message: "SkillIssueException: Learn2Hash" });
					} else {
						if (obj.roleID === "GUARDIAN") {
							if (!obj.occupation) {
								return res.status(400).json({
									message:
										"MissingInputException: Occupation is missing for Guardian type.",
								});
							}
						}

						if (obj.roleID !== "GUARDIAN" || obj.roleID !== "STUDENT") {
							if (!obj.salary) {
								return res.status(400).json({
									message:
										"MissingInputException: Salary is missing for employee type.",
								});
							}
						}

						db.query(
							{
								sql: "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
								values: [
									"USERS",
									"CNIC",
									"FIRST_NAME",
									"LAST_NAME",
									"DOB",
									"GENDER",
									"EMERGENCY_CONTACT",
									"JOIN_DATE",
									"NATIONALITY",
									"RELIGION",
									"P_HASH",
									"ROLE_ID",
									"EMAIL_ADDRESS",
									"ADDRESS",
									"PHONE",
									obj.CNIC,
									obj.firstName,
									obj.lastName,
									obj.DOB,
									obj.gender,
									obj.emergencyContact,
									obj.joinDate,
									obj.nationality,
									obj.religion,
									hash,
									obj.roleID,
									obj.email,
									obj.address,
									obj.phone,
								],
							},
							(errors, results, fields) => {
								if (errors) {
									return res.status(400).json({
										message: "SQLSkillIssue: Get good!",
										data: errors,
									});
								}

								if (obj.roleID === "GUARDIAN") {
									db.query(
										{
											sql: "INSERT INTO ?? (??,??) VALUES ( (SELECT ?? FROM ?? WHERE ?? = ?), ?)",
											values: [
												"GUARDIAN_DETAILS",
												"GUARDIAN_ID",
												"OCCUPATION",
												"USER_ID",
												"USERS",
												"CNIC",
												obj.CNIC,
												obj.occupation,
											],
										},
										(errors, results, fields) => {
											if (errors) {
												return res.status(400).json({
													message: "SQLSkill_Issue: Get good!",
													data: errors,
												});
											}

											return res.status(200).json({
												message:
													"Successfully created Guardian. Password reset details have been sent to their email. (SMPT implement karna hai bhai)",
											});
										}
									);
								} else if (obj.roleID !== "STUDENT") {
									//If not Guardian and not Student then definitely employee

									db.query(
										{
											sql: "INSERT INTO ?? (??,??,??) VALUES ( (SELECT ?? FROM ?? WHERE ?? = ?), ?,?)",
											values: [
												"EMPLOYEE_DETAILS",
												"EMPLOYEE_ID",
												"SALARY",
												"FULLTIME",
												"USER_ID",
												"USERS",
												"CNIC",
												obj.CNIC,
												obj.salary,
												obj.fulltime,
											],
										},
										(errors, results) => {
											if (errors) {
												return res.status(400).json({
													message: "SQLSkill_Issue: Get good!",
													data: errors,
												});
											}
											return res.status(200).json({
												message:
													"Successfully created employee. Password reset details have been sent to their email. (SMPT implement karna hai bhai)",
											});
										}
									);
								} else {
									return res.status(200).json({
										message:
											"Successfully created user. Password reset details have been sent to their input email!",
									});
								}
							}
						);
					}
				});
			});
		}
	);
};

const developmentForcePasswordReset = (req, res) => {

	var obj = req.body;

	if(!obj.password){
		return res.status(400).json({message: "MissingDataException: Password is needed!"});
	}
	if(!obj.email){
		return res.status(400).json({message: "MissingDataException: Email is needed!"});
	}

	db.query(
		{
			sql: "SELECT * FROM ?? WHERE ?? = ?",
			values:[
				"USERS",
				"EMAIL_ADDRESS",
				obj.email
			]
		}, (errors, results, fields) => {

			if(errors){
				return res.status(500).json({message: "SQLSkill_IssueException: Get better at it my nigga!"});
			}

			if(results.length == 0){
				return res.status(401).json({message: "MissingDataException: Queried user DNE."});
			}

			bcrypt.genSalt(12, function(errors, salt){

				if(errors){
					return res.status(500).json({message: "Skill_IssueException: Learn2Salt"});
				}

				bcrypt.hash(obj.password, salt, function(errors, hash){

					if(errors){
						return res.status(500).json({message: "Skill_IssueException: Learn2Hash"});
					}

					db.query(
						{
							sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?;",
							values:[
								"USERS",
								"P_HASH",
								hash,
								"EMAIL_ADDRESS",
								obj.email
							]
						}, (errors, results, fields) =>{

							if(errors){
								return res.status(500).json({message: "SQLSkill_IssueException: Get better at it my nigga!"});
							}

							return res.status(200).json({message:"Password Changed Sarge!"});

						}
					)

				}
				)

			}
			)

		}
		)

};


module.exports = {
	createUser,
	changeUserPassword,
	queryLogin,
	developmentCreateUser,
	developmentForcePasswordReset
};
