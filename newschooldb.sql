-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2023 at 02:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schooldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `academicyear`
--

CREATE TABLE `academicyear` (
  `START_YEAR` int(11) NOT NULL,
  `AcademicDesc` varchar(16) NOT NULL,
  `DAYS` int(11) NOT NULL DEFAULT 165,
  `FLAG` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academicyear`
--

INSERT INTO `academicyear` VALUES(2023, '2023-2024', 165, 1);
INSERT INTO `academicyear` VALUES(2024, '2024-2025', 109, 1);
INSERT INTO `academicyear` VALUES(2025, '2025-2026', 165, 1);

-- --------------------------------------------------------

--
-- Table structure for table `assessment`
--

CREATE TABLE `assessment` (
  `ASSESSMENT_ID` int(11) NOT NULL,
  `COURSE_ID` varchar(8) DEFAULT NULL,
  `FACULTY_ID` int(11) DEFAULT NULL,
  `MAX_MARKS` int(11) NOT NULL,
  `ASSESSMENT_DATE` date DEFAULT NULL,
  `ASSESSMENT_TYPE` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `STUDENT_ID` int(11) NOT NULL,
  `P_DATE` date NOT NULL,
  `PRESENT` tinyint(1) NOT NULL,
  `ACADEMIC_YEAR` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `CLASS_ID` varchar(9) NOT NULL,
  `STRENGTH` int(11) NOT NULL,
  `YEAR` int(11) NOT NULL,
  `SECTION` varchar(2) NOT NULL,
  `START_YEAR` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` VALUES('09-B-2024', 30, 9, 'B', 2024);
INSERT INTO `class` VALUES('10-A-2024', 30, 10, 'A', 2024);
INSERT INTO `class` VALUES('10-B-2024', 30, 10, 'B', 2024);
INSERT INTO `class` VALUES('11-B-2025', 30, 11, 'B', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `class_course`
--

CREATE TABLE `class_course` (
  `CLASS_ID` varchar(9) NOT NULL,
  `COURSE_ID` varchar(8) NOT NULL,
  `START_TIME` datetime NOT NULL,
  `END_TIME` datetime NOT NULL,
  `FACULTY_ID` int(11) NOT NULL,
  `DAY` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_teacher`
--

CREATE TABLE `class_teacher` (
  `CLASS_ID` varchar(9) NOT NULL,
  `FACULTY_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clo`
--

CREATE TABLE `clo` (
  `CLO_ID` varchar(12) NOT NULL,
  `CLO_NAME` varchar(256) NOT NULL,
  `CLO_DESC` varchar(1024) DEFAULT NULL,
  `COURSE_ID` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `COURSE_ID` varchar(8) NOT NULL,
  `COURSE_NAME` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eca`
--

CREATE TABLE `eca` (
  `ECA_ID` int(11) NOT NULL,
  `NAME` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_details`
--

CREATE TABLE `employee_details` (
  `EMPLOYEE_ID` int(11) NOT NULL,
  `FULLTIME` tinyint(1) NOT NULL,
  `SALARY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_qualification`
--

CREATE TABLE `faculty_qualification` (
  `FACULTY_ID` int(11) NOT NULL,
  `QUALIFICATION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `GENDER_ID` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genders`
--

INSERT INTO `genders` VALUES('Female');
INSERT INTO `genders` VALUES('Intersex');
INSERT INTO `genders` VALUES('Male');

-- --------------------------------------------------------

--
-- Table structure for table `guardian_details`
--

CREATE TABLE `guardian_details` (
  `GUARDIAN_ID` int(11) NOT NULL,
  `OCCUPATION` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guardian_details`
--

INSERT INTO `guardian_details` VALUES(11, 'Hitman');

-- --------------------------------------------------------

--
-- Table structure for table `nationalities`
--

CREATE TABLE `nationalities` (
  `NAT_ID` varchar(128) NOT NULL,
  `BLOCKED` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nationalities`
--

INSERT INTO `nationalities` VALUES('Afghan', 0);
INSERT INTO `nationalities` VALUES('Albanian', 0);
INSERT INTO `nationalities` VALUES('Algerian', 0);
INSERT INTO `nationalities` VALUES('American', 0);
INSERT INTO `nationalities` VALUES('Andorran', 0);
INSERT INTO `nationalities` VALUES('Angolan', 0);
INSERT INTO `nationalities` VALUES('Antiguans', 0);
INSERT INTO `nationalities` VALUES('Argentinean', 0);
INSERT INTO `nationalities` VALUES('Armenian', 0);
INSERT INTO `nationalities` VALUES('Australian', 0);
INSERT INTO `nationalities` VALUES('Austrian', 0);
INSERT INTO `nationalities` VALUES('Azerbaijani', 0);
INSERT INTO `nationalities` VALUES('Bahamian', 0);
INSERT INTO `nationalities` VALUES('Bahraini', 0);
INSERT INTO `nationalities` VALUES('Bangladeshi', 0);
INSERT INTO `nationalities` VALUES('Barbadian', 0);
INSERT INTO `nationalities` VALUES('Barbudans', 0);
INSERT INTO `nationalities` VALUES('Batswana', 0);
INSERT INTO `nationalities` VALUES('Belarusian', 0);
INSERT INTO `nationalities` VALUES('Belgian', 0);
INSERT INTO `nationalities` VALUES('Belizean', 0);
INSERT INTO `nationalities` VALUES('Beninese', 0);
INSERT INTO `nationalities` VALUES('Bhutanese', 0);
INSERT INTO `nationalities` VALUES('Bolivian', 0);
INSERT INTO `nationalities` VALUES('Bosnian', 0);
INSERT INTO `nationalities` VALUES('Brazilian', 0);
INSERT INTO `nationalities` VALUES('British', 0);
INSERT INTO `nationalities` VALUES('Bruneian', 0);
INSERT INTO `nationalities` VALUES('Bulgarian', 0);
INSERT INTO `nationalities` VALUES('Burkinabe', 0);
INSERT INTO `nationalities` VALUES('Burmese', 0);
INSERT INTO `nationalities` VALUES('Burundian', 0);
INSERT INTO `nationalities` VALUES('Cambodian', 0);
INSERT INTO `nationalities` VALUES('Cameroonian', 0);
INSERT INTO `nationalities` VALUES('Canadian', 0);
INSERT INTO `nationalities` VALUES('Cape Verdean', 0);
INSERT INTO `nationalities` VALUES('Central African', 0);
INSERT INTO `nationalities` VALUES('Chadian', 0);
INSERT INTO `nationalities` VALUES('Chilean', 0);
INSERT INTO `nationalities` VALUES('Chinese', 0);
INSERT INTO `nationalities` VALUES('Colombian', 0);
INSERT INTO `nationalities` VALUES('Comoran', 0);
INSERT INTO `nationalities` VALUES('Congolese', 0);
INSERT INTO `nationalities` VALUES('Costa Rican', 0);
INSERT INTO `nationalities` VALUES('Croatian', 0);
INSERT INTO `nationalities` VALUES('Cuban', 0);
INSERT INTO `nationalities` VALUES('Cypriot', 0);
INSERT INTO `nationalities` VALUES('Czech', 0);
INSERT INTO `nationalities` VALUES('Danish', 0);
INSERT INTO `nationalities` VALUES('Djibouti', 0);
INSERT INTO `nationalities` VALUES('Dominican', 0);
INSERT INTO `nationalities` VALUES('Dutch', 0);
INSERT INTO `nationalities` VALUES('East Timorese', 0);
INSERT INTO `nationalities` VALUES('Ecuadorean', 0);
INSERT INTO `nationalities` VALUES('Egyptian', 0);
INSERT INTO `nationalities` VALUES('Emirian', 0);
INSERT INTO `nationalities` VALUES('Equatorial Guinean', 0);
INSERT INTO `nationalities` VALUES('Eritrean', 0);
INSERT INTO `nationalities` VALUES('Estonian', 0);
INSERT INTO `nationalities` VALUES('Ethiopian', 0);
INSERT INTO `nationalities` VALUES('Fijian', 0);
INSERT INTO `nationalities` VALUES('Filipino', 0);
INSERT INTO `nationalities` VALUES('Finnish', 0);
INSERT INTO `nationalities` VALUES('French', 0);
INSERT INTO `nationalities` VALUES('Gabonese', 0);
INSERT INTO `nationalities` VALUES('Gambian', 0);
INSERT INTO `nationalities` VALUES('Georgian', 0);
INSERT INTO `nationalities` VALUES('German', 0);
INSERT INTO `nationalities` VALUES('Ghanaian', 0);
INSERT INTO `nationalities` VALUES('Greek', 0);
INSERT INTO `nationalities` VALUES('Grenadian', 0);
INSERT INTO `nationalities` VALUES('Guatemalan', 0);
INSERT INTO `nationalities` VALUES('Guinea-Bissauan', 0);
INSERT INTO `nationalities` VALUES('Guinean', 0);
INSERT INTO `nationalities` VALUES('Guyanese', 0);
INSERT INTO `nationalities` VALUES('Haitian', 0);
INSERT INTO `nationalities` VALUES('Herzegovinian', 0);
INSERT INTO `nationalities` VALUES('Honduran', 0);
INSERT INTO `nationalities` VALUES('Hungarian', 0);
INSERT INTO `nationalities` VALUES('I-Kiribati', 0);
INSERT INTO `nationalities` VALUES('Icelander', 0);
INSERT INTO `nationalities` VALUES('Indian', 0);
INSERT INTO `nationalities` VALUES('Indonesian', 0);
INSERT INTO `nationalities` VALUES('Iranian', 0);
INSERT INTO `nationalities` VALUES('Iraqi', 0);
INSERT INTO `nationalities` VALUES('Irish', 0);
INSERT INTO `nationalities` VALUES('Israeli', 0);
INSERT INTO `nationalities` VALUES('Italian', 0);
INSERT INTO `nationalities` VALUES('Ivorian', 0);
INSERT INTO `nationalities` VALUES('Jamaican', 0);
INSERT INTO `nationalities` VALUES('Japanese', 0);
INSERT INTO `nationalities` VALUES('Jordanian', 0);
INSERT INTO `nationalities` VALUES('Kazakhstani', 0);
INSERT INTO `nationalities` VALUES('Kenyan', 0);
INSERT INTO `nationalities` VALUES('Kittian and Nevisian', 0);
INSERT INTO `nationalities` VALUES('Kuwaiti', 0);
INSERT INTO `nationalities` VALUES('Kyrgyz', 0);
INSERT INTO `nationalities` VALUES('Laotian', 0);
INSERT INTO `nationalities` VALUES('Latvian', 0);
INSERT INTO `nationalities` VALUES('Lebanese', 0);
INSERT INTO `nationalities` VALUES('Liberian', 0);
INSERT INTO `nationalities` VALUES('Libyan', 0);
INSERT INTO `nationalities` VALUES('Liechtensteiner', 0);
INSERT INTO `nationalities` VALUES('Lithuanian', 0);
INSERT INTO `nationalities` VALUES('Luxembourger', 0);
INSERT INTO `nationalities` VALUES('Macedonian', 0);
INSERT INTO `nationalities` VALUES('Malagasy', 0);
INSERT INTO `nationalities` VALUES('Malawian', 0);
INSERT INTO `nationalities` VALUES('Malaysian', 0);
INSERT INTO `nationalities` VALUES('Maldivan', 0);
INSERT INTO `nationalities` VALUES('Malian', 0);
INSERT INTO `nationalities` VALUES('Maltese', 0);
INSERT INTO `nationalities` VALUES('Marshallese', 0);
INSERT INTO `nationalities` VALUES('Mauritanian', 0);
INSERT INTO `nationalities` VALUES('Mauritian', 0);
INSERT INTO `nationalities` VALUES('Mexican', 0);
INSERT INTO `nationalities` VALUES('Micronesian', 0);
INSERT INTO `nationalities` VALUES('Moldovan', 0);
INSERT INTO `nationalities` VALUES('Monacan', 0);
INSERT INTO `nationalities` VALUES('Mongolian', 0);
INSERT INTO `nationalities` VALUES('Moroccan', 0);
INSERT INTO `nationalities` VALUES('Mosotho', 0);
INSERT INTO `nationalities` VALUES('Motswana', 0);
INSERT INTO `nationalities` VALUES('Mozambican', 0);
INSERT INTO `nationalities` VALUES('Namibian', 0);
INSERT INTO `nationalities` VALUES('Nauruan', 0);
INSERT INTO `nationalities` VALUES('Nepalese', 0);
INSERT INTO `nationalities` VALUES('New Zealander', 0);
INSERT INTO `nationalities` VALUES('Nicaraguan', 0);
INSERT INTO `nationalities` VALUES('Nigerian', 0);
INSERT INTO `nationalities` VALUES('Nigerien', 0);
INSERT INTO `nationalities` VALUES('North Korean', 0);
INSERT INTO `nationalities` VALUES('Northern Irish', 0);
INSERT INTO `nationalities` VALUES('Norwegian', 0);
INSERT INTO `nationalities` VALUES('Omani', 0);
INSERT INTO `nationalities` VALUES('Pakistani', 0);
INSERT INTO `nationalities` VALUES('Palauan', 0);
INSERT INTO `nationalities` VALUES('Palestenian', 0);
INSERT INTO `nationalities` VALUES('Panamanian', 0);
INSERT INTO `nationalities` VALUES('Papua New Guinean', 0);
INSERT INTO `nationalities` VALUES('Paraguayan', 0);
INSERT INTO `nationalities` VALUES('Peruvian', 0);
INSERT INTO `nationalities` VALUES('Polish', 0);
INSERT INTO `nationalities` VALUES('Portuguese', 0);
INSERT INTO `nationalities` VALUES('Qatari', 0);
INSERT INTO `nationalities` VALUES('Romanian', 0);
INSERT INTO `nationalities` VALUES('Russian', 0);
INSERT INTO `nationalities` VALUES('Rwandan', 0);
INSERT INTO `nationalities` VALUES('Saint Lucian', 0);
INSERT INTO `nationalities` VALUES('Salvadoran', 0);
INSERT INTO `nationalities` VALUES('Samoan', 0);
INSERT INTO `nationalities` VALUES('San Marinese', 0);
INSERT INTO `nationalities` VALUES('Sao Tomean', 0);
INSERT INTO `nationalities` VALUES('Saudi', 0);
INSERT INTO `nationalities` VALUES('Scottish', 0);
INSERT INTO `nationalities` VALUES('Senegalese', 0);
INSERT INTO `nationalities` VALUES('Serbian', 0);
INSERT INTO `nationalities` VALUES('Seychellois', 0);
INSERT INTO `nationalities` VALUES('Sierra Leonean', 0);
INSERT INTO `nationalities` VALUES('Singaporean', 0);
INSERT INTO `nationalities` VALUES('Slovakian', 0);
INSERT INTO `nationalities` VALUES('Slovenian', 0);
INSERT INTO `nationalities` VALUES('Solomon Islander', 0);
INSERT INTO `nationalities` VALUES('Somali', 0);
INSERT INTO `nationalities` VALUES('South African', 0);
INSERT INTO `nationalities` VALUES('South Korean', 0);
INSERT INTO `nationalities` VALUES('Spanish', 0);
INSERT INTO `nationalities` VALUES('Sri Lankan', 0);
INSERT INTO `nationalities` VALUES('Sudanese', 0);
INSERT INTO `nationalities` VALUES('Surinamer', 0);
INSERT INTO `nationalities` VALUES('Swazi', 0);
INSERT INTO `nationalities` VALUES('Swedish', 0);
INSERT INTO `nationalities` VALUES('Swiss', 0);
INSERT INTO `nationalities` VALUES('Syrian', 0);
INSERT INTO `nationalities` VALUES('Taiwanese', 0);
INSERT INTO `nationalities` VALUES('Tajik', 0);
INSERT INTO `nationalities` VALUES('Tanzanian', 0);
INSERT INTO `nationalities` VALUES('Thai', 0);
INSERT INTO `nationalities` VALUES('Togolese', 0);
INSERT INTO `nationalities` VALUES('Tongan', 0);
INSERT INTO `nationalities` VALUES('Trinidadian or Tobagonian', 0);
INSERT INTO `nationalities` VALUES('Tunisian', 0);
INSERT INTO `nationalities` VALUES('Turkish', 0);
INSERT INTO `nationalities` VALUES('Tuvaluan', 0);
INSERT INTO `nationalities` VALUES('Ugandan', 0);
INSERT INTO `nationalities` VALUES('Ukrainian', 0);
INSERT INTO `nationalities` VALUES('Uruguayan', 0);
INSERT INTO `nationalities` VALUES('Uzbekistani', 0);
INSERT INTO `nationalities` VALUES('Venezuelan', 0);
INSERT INTO `nationalities` VALUES('Vietnamese', 0);
INSERT INTO `nationalities` VALUES('Welsh', 0);
INSERT INTO `nationalities` VALUES('Yemenite', 0);
INSERT INTO `nationalities` VALUES('Zambian', 0);
INSERT INTO `nationalities` VALUES('Zimbabwean', 0);

-- --------------------------------------------------------

--
-- Table structure for table `qualification`
--

CREATE TABLE `qualification` (
  `QUALIFICATION_ID` int(11) NOT NULL,
  `NAME` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `QUESTION_ID` int(11) NOT NULL,
  `QUESTION_DESC` varchar(1024) NOT NULL,
  `QUESTION_TYPE` int(11) DEFAULT NULL,
  `MAX_MARKS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question_assessment`
--

CREATE TABLE `question_assessment` (
  `QUESTION_ID` int(11) NOT NULL,
  `ASSESSMENT_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question_clo`
--

CREATE TABLE `question_clo` (
  `QUESTION_ID` int(11) NOT NULL,
  `CLO_ID` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question_types`
--

CREATE TABLE `question_types` (
  `QUESTION_TYPE` int(11) NOT NULL,
  `TYPE_NAME` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relation`
--

CREATE TABLE `relation` (
  `RELATION_ID` int(11) NOT NULL,
  `RELATION_TYPE` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relation`
--

INSERT INTO `relation` VALUES(1, 'Mother');
INSERT INTO `relation` VALUES(2, 'Father');
INSERT INTO `relation` VALUES(3, 'Brother');
INSERT INTO `relation` VALUES(4, 'Sister');
INSERT INTO `relation` VALUES(5, 'Grandfather');
INSERT INTO `relation` VALUES(6, 'Grandmother');
INSERT INTO `relation` VALUES(7, 'Uncle');

-- --------------------------------------------------------

--
-- Table structure for table `religions`
--

CREATE TABLE `religions` (
  `RELIGION_ID` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `religions`
--

INSERT INTO `religions` VALUES('Adventism');
INSERT INTO `religions` VALUES('Atheism');
INSERT INTO `religions` VALUES('Ayyavazhi');
INSERT INTO `religions` VALUES('Buddhism');
INSERT INTO `religions` VALUES('Christianity');
INSERT INTO `religions` VALUES('Cultism');
INSERT INTO `religions` VALUES('Hinduism');
INSERT INTO `religions` VALUES('Islam');
INSERT INTO `religions` VALUES('Judaism');
INSERT INTO `religions` VALUES('Sikhism');
INSERT INTO `religions` VALUES('Zoroastrianism');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `ROLE_ID` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` VALUES('ADMIN');
INSERT INTO `roles` VALUES('ALUMNI');
INSERT INTO `roles` VALUES('FACULTY');
INSERT INTO `roles` VALUES('GUARDIAN');
INSERT INTO `roles` VALUES('STAFF');
INSERT INTO `roles` VALUES('STUDENT');

-- --------------------------------------------------------

--
-- Table structure for table `std_asmnt`
--

CREATE TABLE `std_asmnt` (
  `STUDENT_ID` int(11) NOT NULL,
  `ASSESSMENT_ID` int(11) NOT NULL,
  `OBTAINED_MARKS` int(11) NOT NULL,
  `SUBMISSION_DATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_academic_history`
--

CREATE TABLE `student_academic_history` (
  `STUDENT_ID` int(11) NOT NULL,
  `CLASS_ID` varchar(9) NOT NULL,
  `ENROLLMENT_DATE` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_academic_history`
--

INSERT INTO `student_academic_history` VALUES(9, '10-A-2024', '2023-10-19 04:51:04');

-- --------------------------------------------------------

--
-- Table structure for table `student_eca`
--

CREATE TABLE `student_eca` (
  `STUDENT_ID` int(11) NOT NULL,
  `ECA_ID` int(11) NOT NULL,
  `ROLE` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_guardian`
--

CREATE TABLE `student_guardian` (
  `STUDENT_ID` int(11) NOT NULL,
  `GUARDIAN_ID` int(11) NOT NULL,
  `RELATION_ID` int(11) DEFAULT NULL,
  `FLAG` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_guardian`
--

INSERT INTO `student_guardian` VALUES(9, 11, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `TRANSACTION_ID` int(11) NOT NULL,
  `STUDENT_ID` int(11) DEFAULT NULL,
  `T_NAME` varchar(128) DEFAULT NULL,
  `T_AMOUNT` int(11) NOT NULL,
  `T_DATE` date NOT NULL,
  `T_FLAG` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` VALUES(2, 9, 'Grade 10 October Tuition Fee', 29300, '2023-10-19', 1);
INSERT INTO `transaction` VALUES(3, 9, 'Fall 2023 Student Activity Charges', 6000, '2023-10-19', 1);
INSERT INTO `transaction` VALUES(7, 9, 'School Bhatta Fall 2023', 3000, '2023-10-19', 1);
INSERT INTO `transaction` VALUES(8, 9, 'Fee Payment by Guardian of Student', -35000, '2023-10-19', 1);
INSERT INTO `transaction` VALUES(9, 9, 'School Bhatta Fall 2023', 3000, '2023-10-19', 1);
INSERT INTO `transaction` VALUES(10, 9, 'Fee Payment by Guardian of Student', -6300, '2023-10-19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `USER_ID` int(11) NOT NULL,
  `CNIC` varchar(15) DEFAULT NULL,
  `FIRST_NAME` varchar(64) NOT NULL,
  `LAST_NAME` varchar(64) NOT NULL,
  `DOB` date NOT NULL,
  `GENDER` varchar(7) NOT NULL,
  `EMERGENCY_CONTACT` varchar(20) NOT NULL,
  `JOIN_DATE` date NOT NULL,
  `NATIONALITY` varchar(128) NOT NULL,
  `RELIGION` varchar(128) NOT NULL,
  `P_HASH` varchar(256) NOT NULL,
  `ROLE_ID` varchar(16) NOT NULL,
  `EMAIL_ADDRESS` varchar(256) NOT NULL,
  `BLOCK` tinyint(1) DEFAULT 0,
  `ADDRESS` varchar(256) DEFAULT NULL,
  `PHONE` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--
-- ! pass is STUDENT@4000
INSERT INTO `users` VALUES(9, '42201-896210-1', 'Muhammad', 'Bilal', '2001-12-12', 'Male', '+92-323-8227006', '2008-08-08', 'Pakistani', 'Islam', '$2b$12$ELuayQuQI9NrQmzTNIMfgOqkEnA1B.UWwXdrCoCijqYX871WY74ay', 'ADMIN', 'nabeelmirza79@gmail.com', 0, 'M97/4, Khayaban-e-Saadi, Phase 7, DHA', '+92-323-8227006');
INSERT INTO `users` VALUES(11, '42201-896130-1', 'John', 'Wick', '2001-12-12', 'Male', '+92-323-8257184', '2008-08-08', 'Pakistani', 'Islam', '$2b$12$ELuayQuQI9NrQmzTNIMfgOqkEnA1B.UWwXdrCoCijqYX871WY74ay', 'GUARDIAN', 'j.wick@continental.com', 0, 'ContinentalHotel', '+92-323-8225814');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academicyear`
--
ALTER TABLE `academicyear`
  ADD PRIMARY KEY (`START_YEAR`);

--
-- Indexes for table `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`ASSESSMENT_ID`),
  ADD KEY `COURSE_ID` (`COURSE_ID`),
  ADD KEY `assessment_ibfk_2` (`FACULTY_ID`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`STUDENT_ID`,`P_DATE`),
  ADD KEY `ACADEMIC_YEAR` (`ACADEMIC_YEAR`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`CLASS_ID`),
  ADD KEY `START_YEAR` (`START_YEAR`);

--
-- Indexes for table `class_course`
--
ALTER TABLE `class_course`
  ADD PRIMARY KEY (`COURSE_ID`,`FACULTY_ID`,`CLASS_ID`,`START_TIME`,`DAY`),
  ADD KEY `CLASS_ID` (`CLASS_ID`),
  ADD KEY `class_course_ibfk_3` (`FACULTY_ID`);

--
-- Indexes for table `class_teacher`
--
ALTER TABLE `class_teacher`
  ADD PRIMARY KEY (`CLASS_ID`,`FACULTY_ID`),
  ADD KEY `class_teacher_ibfk_2` (`FACULTY_ID`);

--
-- Indexes for table `clo`
--
ALTER TABLE `clo`
  ADD PRIMARY KEY (`CLO_ID`),
  ADD KEY `COURSE_ID` (`COURSE_ID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`COURSE_ID`);

--
-- Indexes for table `eca`
--
ALTER TABLE `eca`
  ADD PRIMARY KEY (`ECA_ID`);

--
-- Indexes for table `employee_details`
--
ALTER TABLE `employee_details`
  ADD KEY `EMPLOYEE_ID` (`EMPLOYEE_ID`);

--
-- Indexes for table `faculty_qualification`
--
ALTER TABLE `faculty_qualification`
  ADD PRIMARY KEY (`FACULTY_ID`,`QUALIFICATION_ID`),
  ADD KEY `QUALIFICATION_ID` (`QUALIFICATION_ID`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`GENDER_ID`);

--
-- Indexes for table `guardian_details`
--
ALTER TABLE `guardian_details`
  ADD KEY `GUARDIAN_ID` (`GUARDIAN_ID`);

--
-- Indexes for table `nationalities`
--
ALTER TABLE `nationalities`
  ADD PRIMARY KEY (`NAT_ID`);

--
-- Indexes for table `qualification`
--
ALTER TABLE `qualification`
  ADD PRIMARY KEY (`QUALIFICATION_ID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`QUESTION_ID`),
  ADD KEY `QUESTION_TYPE` (`QUESTION_TYPE`);

--
-- Indexes for table `question_assessment`
--
ALTER TABLE `question_assessment`
  ADD PRIMARY KEY (`QUESTION_ID`,`ASSESSMENT_ID`),
  ADD KEY `ASSESSMENT_ID` (`ASSESSMENT_ID`);

--
-- Indexes for table `question_clo`
--
ALTER TABLE `question_clo`
  ADD PRIMARY KEY (`QUESTION_ID`,`CLO_ID`),
  ADD KEY `CLO_ID` (`CLO_ID`);

--
-- Indexes for table `question_types`
--
ALTER TABLE `question_types`
  ADD PRIMARY KEY (`QUESTION_TYPE`);

--
-- Indexes for table `relation`
--
ALTER TABLE `relation`
  ADD PRIMARY KEY (`RELATION_ID`);

--
-- Indexes for table `religions`
--
ALTER TABLE `religions`
  ADD PRIMARY KEY (`RELIGION_ID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ROLE_ID`);

--
-- Indexes for table `std_asmnt`
--
ALTER TABLE `std_asmnt`
  ADD PRIMARY KEY (`STUDENT_ID`,`ASSESSMENT_ID`),
  ADD KEY `ASSESSMENT_ID` (`ASSESSMENT_ID`);

--
-- Indexes for table `student_academic_history`
--
ALTER TABLE `student_academic_history`
  ADD PRIMARY KEY (`STUDENT_ID`,`CLASS_ID`),
  ADD KEY `CLASS_ID` (`CLASS_ID`);

--
-- Indexes for table `student_eca`
--
ALTER TABLE `student_eca`
  ADD PRIMARY KEY (`STUDENT_ID`,`ECA_ID`),
  ADD KEY `ECA_ID` (`ECA_ID`);

--
-- Indexes for table `student_guardian`
--
ALTER TABLE `student_guardian`
  ADD PRIMARY KEY (`STUDENT_ID`,`GUARDIAN_ID`),
  ADD KEY `GUARDIAN_ID` (`GUARDIAN_ID`),
  ADD KEY `RELATION_ID` (`RELATION_ID`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`TRANSACTION_ID`),
  ADD KEY `STUDENT_ID` (`STUDENT_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`USER_ID`),
  ADD UNIQUE KEY `PHONE` (`PHONE`),
  ADD UNIQUE KEY `CNIC` (`CNIC`),
  ADD KEY `ROLE_ID` (`ROLE_ID`),
  ADD KEY `NATIONALITY` (`NATIONALITY`),
  ADD KEY `RELIGION` (`RELIGION`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessment`
--
ALTER TABLE `assessment`
  MODIFY `ASSESSMENT_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eca`
--
ALTER TABLE `eca`
  MODIFY `ECA_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `qualification`
--
ALTER TABLE `qualification`
  MODIFY `QUALIFICATION_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `QUESTION_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question_types`
--
ALTER TABLE `question_types`
  MODIFY `QUESTION_TYPE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `relation`
--
ALTER TABLE `relation`
  MODIFY `RELATION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `TRANSACTION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assessment`
--
ALTER TABLE `assessment`
  ADD CONSTRAINT `assessment_ibfk_1` FOREIGN KEY (`COURSE_ID`) REFERENCES `course` (`COURSE_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `assessment_ibfk_2` FOREIGN KEY (`FACULTY_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`STUDENT_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`ACADEMIC_YEAR`) REFERENCES `academicyear` (`START_YEAR`) ON DELETE CASCADE;

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`START_YEAR`) REFERENCES `academicyear` (`START_YEAR`) ON DELETE CASCADE;

--
-- Constraints for table `class_course`
--
ALTER TABLE `class_course`
  ADD CONSTRAINT `class_course_ibfk_1` FOREIGN KEY (`CLASS_ID`) REFERENCES `class` (`CLASS_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_course_ibfk_2` FOREIGN KEY (`COURSE_ID`) REFERENCES `course` (`COURSE_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_course_ibfk_3` FOREIGN KEY (`FACULTY_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE;

--
-- Constraints for table `class_teacher`
--
ALTER TABLE `class_teacher`
  ADD CONSTRAINT `class_teacher_ibfk_1` FOREIGN KEY (`CLASS_ID`) REFERENCES `class` (`CLASS_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_teacher_ibfk_2` FOREIGN KEY (`FACULTY_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE;

--
-- Constraints for table `clo`
--
ALTER TABLE `clo`
  ADD CONSTRAINT `clo_ibfk_1` FOREIGN KEY (`COURSE_ID`) REFERENCES `course` (`COURSE_ID`) ON DELETE CASCADE;

--
-- Constraints for table `employee_details`
--
ALTER TABLE `employee_details`
  ADD CONSTRAINT `employee_details_ibfk_1` FOREIGN KEY (`EMPLOYEE_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE;

--
-- Constraints for table `faculty_qualification`
--
ALTER TABLE `faculty_qualification`
  ADD CONSTRAINT `faculty_qualification_ibfk_1` FOREIGN KEY (`FACULTY_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `faculty_qualification_ibfk_2` FOREIGN KEY (`QUALIFICATION_ID`) REFERENCES `qualification` (`QUALIFICATION_ID`) ON DELETE CASCADE;

--
-- Constraints for table `guardian_details`
--
ALTER TABLE `guardian_details`
  ADD CONSTRAINT `guardian_details_ibfk_1` FOREIGN KEY (`GUARDIAN_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`QUESTION_TYPE`) REFERENCES `question_types` (`QUESTION_TYPE`) ON DELETE CASCADE;

--
-- Constraints for table `question_assessment`
--
ALTER TABLE `question_assessment`
  ADD CONSTRAINT `question_assessment_ibfk_1` FOREIGN KEY (`QUESTION_ID`) REFERENCES `question` (`QUESTION_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `question_assessment_ibfk_2` FOREIGN KEY (`ASSESSMENT_ID`) REFERENCES `assessment` (`ASSESSMENT_ID`) ON DELETE CASCADE;

--
-- Constraints for table `question_clo`
--
ALTER TABLE `question_clo`
  ADD CONSTRAINT `question_clo_ibfk_1` FOREIGN KEY (`QUESTION_ID`) REFERENCES `question` (`QUESTION_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `question_clo_ibfk_2` FOREIGN KEY (`CLO_ID`) REFERENCES `clo` (`CLO_ID`) ON DELETE CASCADE;

--
-- Constraints for table `std_asmnt`
--
ALTER TABLE `std_asmnt`
  ADD CONSTRAINT `std_asmnt_ibfk_1` FOREIGN KEY (`STUDENT_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `std_asmnt_ibfk_2` FOREIGN KEY (`ASSESSMENT_ID`) REFERENCES `assessment` (`ASSESSMENT_ID`) ON DELETE CASCADE;

--
-- Constraints for table `student_academic_history`
--
ALTER TABLE `student_academic_history`
  ADD CONSTRAINT `student_academic_history_ibfk_1` FOREIGN KEY (`STUDENT_ID`) REFERENCES `users` (`USER_ID`),
  ADD CONSTRAINT `student_academic_history_ibfk_2` FOREIGN KEY (`CLASS_ID`) REFERENCES `class` (`CLASS_ID`);

--
-- Constraints for table `student_eca`
--
ALTER TABLE `student_eca`
  ADD CONSTRAINT `student_eca_ibfk_1` FOREIGN KEY (`STUDENT_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_eca_ibfk_2` FOREIGN KEY (`ECA_ID`) REFERENCES `eca` (`ECA_ID`) ON DELETE CASCADE;

--
-- Constraints for table `student_guardian`
--
ALTER TABLE `student_guardian`
  ADD CONSTRAINT `student_guardian_ibfk_1` FOREIGN KEY (`STUDENT_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_guardian_ibfk_2` FOREIGN KEY (`GUARDIAN_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_guardian_ibfk_3` FOREIGN KEY (`RELATION_ID`) REFERENCES `relation` (`RELATION_ID`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`STUDENT_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`ROLE_ID`) REFERENCES `roles` (`ROLE_ID`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`NATIONALITY`) REFERENCES `nationalities` (`NAT_ID`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`RELIGION`) REFERENCES `religions` (`RELIGION_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
