const db = require("../config/db").connection;
const mailer = require("./mailer");
const bcrypt = require("bcrypt");
const privateKey = "NOONEcanCRACKthis";

const createTFAKey = (req, res) => {

    var obj = req.body;

    if (!obj.id) {
        res.status(400).json({ message: "MissingDataException: UserID is required." })
    }

    if (!obj.email) {
        res.status(400).json({ message: "MissingDataException: UserID is required." })
    }

    db.query(
        {
            sql: "SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?",
            values: [
                "EMAIL_ADDRESS", "users", "USER_ID", obj.id, "EMAIL_ADDRESS", obj.email
            ]
        }, (errors, results, fields) => {

            if (errors) {
                res.status(400).json({ message: "SQLException: Learn2SQL dog!" })
                console.log(errors);
            }

            if (results.length == 0) {
                res.status(200).json({ message: "The queried user does not exist!", EC: -1 })
            } else {

                var seq = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
                var email = results[0].EMAIL_ADDRESS;

                db.query(
                    {
                        sql: " SELECT * FROM ?? WHERE ?? = ?",
                        values: [
                            "TFA", "USER_ID", obj.id
                        ]
                    }, (errors, results, fields) => {

                        if (errors) {
                            res.status(400).json(
                                {
                                    message: "SQLException: Learn2SQL dog!"
                                }
                            )
                        }

                        if (results.length > 0) {
                            res.status(200).json({ message: "A 2FA Key has already been sent to this account's email!", EC: 2 })
                        } else {

                            db.query(
                                {
                                    sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
                                    values: ["TFA", "USER_ID", "TFAKEY", obj.id, seq]
                                }, (errors, results, fields) => {

                                    if (errors) {
                                        console.log(errors);
                                        res.status(400).json(
                                            {
                                                message: "SQLException: Learn2SQL dog!"
                                            }
                                        )
                                    }

                                    var mx = {
                                        from: "SchoolDB Team",
                                        to: email,
                                        subject: "SchoolDB Forgot Password 2FA Key",
                                        text: `Dear user,\r\n\r\nWe recieved word that you forgot your password! No worries, just enter the code ${seq} to authorize!.\r\n\r\n If you have not done this action, then please ignore this email. \r\n\r\nRegards,\r\nSchoolDB Team.`,
                                    };

                                    mailer.transporter.sendMail(mx, function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            return res.status(400).json(
                                                {
                                                    message: "Exception: SMTP Failure because no ENV_VARS added",
                                                    EC: -1
                                                }
                                            );
                                        }
                                        return res.status(200).json(
                                            {
                                                message:
                                                    `Successfully mailed 2FA Key to ${obj.email}`,
                                                EC: 1,
                                            }
                                        );
                                    })
                                }
                            )
                        }
                    }
                )
            }
        }
    )
}

const queryTFA = (req, res) => {

    var obj = req.body;

    if (!obj.id) {
        res.status(400).json({ message: "MissingDataException: UserID is required." })
    }

    if (!obj.email) {
        res.status(400).json({ message: "MissingDataException: UserID is required." })
    }

    if (!obj.tfa) {
        res.status(200).json({ message: "MissingDataException: 2FA Key is required!", EC: -1 })
    }

    if (!obj.password) {
        res.status(200).json({ message: "MissingDataException: 2FA Key is required!", EC: -1 })
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: ["TFA", "USER_ID", obj.id],
        }, (errors, results, fields) => {

            if (errors) {
                res.status(400).json({ message: "SQLException: Learn2SQL dog!" });
            }

            if(results.length == 0){
                res.status(400).json(
                    {
                        message: "You shouldn't really be here!"
                    }
                )
            }
            var rsvp = results;

            if (results[0].TFAKEY == obj.tfa) {

                if (errors) {
                    res.status(400).json(
                        {
                            message: "SQLException: Learn2SQL dog!"
                        }
                    )
                }

                db.query(
                    {
                        sql: "DELETE FROM ?? WHERE ?? = ?",
                        values: ["TFA", "USER_ID", obj.id]
                    }, (errors, results, fields) => {

                        if (errors) {
                            res.status(400).json(
                                {
                                    message: "SQLException: Learn2SQL dog!"
                                }
                            )
                        }

                        bcrypt.genSalt(12, function (err, salt) {

                            if (err) {
                                return res.status(500).json(
                                    {
                                        message: "SkillIssueException: Learn2Salt"
                                    }
                                );
                            }

                            bcrypt.hash(obj.password, salt, function (err, hash) {

                                if (err) {
                                    return res.status(500).json(
                                        {
                                            message: "SkillIssueException: Learn2Salt"
                                        }
                                    );
                                }

                                db.query(
                                    {
                                        sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
                                        values: ["users", "P_HASH", hash, "USER_ID", obj.id]
                                    }, (errors, results, fields) => {

                                        if (errors) {
                                            res.status(400).json(
                                                {
                                                    message: "SQLException: Learn2SQL dog!"
                                                }
                                            )
                                        }

                                        var mx = {
                                            from: "SchoolDB Team",
                                            to: obj.email,
                                            subject: "SchoolDB Successful Password Reset",
                                            text: `Dear user,\r\n\r\nYou have successfully changed your password! Your credentials are as follows: \r\nERP : ${obj.id}\r\nPassword : ${obj.password}\r\n\r\nRegards,\r\nSchoolDB Team.`,
                                        };

                                        mailer.transporter.sendMail(mx, function (err, result) {
                                            if (err) {
                                                console.log(err);
                                                return res.status(400).json(
                                                    {
                                                        message: "Exception: SMTP Failure because no ENV_VARS added",
                                                        EC: -1
                                                    }
                                                );
                                            }
                                            return res.status(200).json(
                                                {
                                                    message:
                                                        `Successfully changed password!`,
                                                    EC: 1,
                                                }
                                            );
                                        })
                                    }
                                )
                            }
                            )
                        }
                        )
                    }
                )

            } else {
                if (results[0].ATTEMPTS == 1) {

                    db.query(
                        {
                            sql: "DELETE FROM ?? WHERE ?? = ?",
                            values: ["TFA", "USER_ID", obj.id]
                        },(errors, results, fields) => {

                            if (errors) {
                                console.log(errors);
                                res.status(400).json(
                                    {
                                        message: "SQLException: Learn2SQL dog! [2]"
                                    }
                                )
                            }

                            res.status(200).json(
                                {
                                    message: `Incorrect Attempt! Please regenerate a new key!`,
                                    EC: -1
                                }
                            )

                        }
                    )

                } else {

                    db.query(
                        {
                            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
                            values: ["TFA", "ATTEMPTS", results[0].ATTEMPTS - 1, "USER_ID", obj.id]
                        }, (errors, results, fields) => {

                            if (errors) {
                                console.log(errors);
                                res.status(400).json(
                                    {
                                        message: "SQLException: Learn2SQL dog! [2]"
                                    }
                                )
                            }

                            res.status(200).json(
                                {
                                    message: `Incorrect Attempt! Remaining Attempts: ${rsvp[0].ATTEMPTS - 1}`,
                                    EC: 2
                                }
                            )
                        }
                    )
                }
            }

        }
    )
}

module.exports = {
    queryTFA,
    createTFAKey
}