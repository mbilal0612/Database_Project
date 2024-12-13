-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 13, 2024 at 07:48 PM
-- Server version: 8.0.40-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.19

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
CREATE DATABASE IF NOT EXISTS `schooldb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `schooldb`;

-- --------------------------------------------------------

--
-- Table structure for table `academicyear`
--

CREATE TABLE `academicyear` (
  `START_YEAR` int NOT NULL,
  `AcademicDesc` varchar(16) COLLATE utf8mb4_general_ci NOT NULL,
  `DAYS` int NOT NULL DEFAULT '165',
  `FLAG` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academicyear`
--

INSERT INTO `academicyear` (`START_YEAR`, `AcademicDesc`, `DAYS`, `FLAG`) VALUES
(2023, '2023-2024', 165, 1),
(2024, '2024-2025', 109, 1),
(2025, '2025-2026', 165, 1);

-- --------------------------------------------------------

--
-- Table structure for table `assessment`
--

CREATE TABLE `assessment` (
  `ASSESSMENT_ID` int NOT NULL,
  `COURSE_ID` varchar(8) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FACULTY_ID` int DEFAULT NULL,
  `MAX_MARKS` int NOT NULL,
  `ASSESSMENT_DATE` date DEFAULT NULL,
  `ASSESSMENT_TYPE` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `STUDENT_ID` int NOT NULL,
  `P_DATE` date NOT NULL,
  `PRESENT` tinyint(1) NOT NULL,
  `ACADEMIC_YEAR` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `CLASS_ID` varchar(9) COLLATE utf8mb4_general_ci NOT NULL,
  `STRENGTH` int NOT NULL,
  `YEAR` int NOT NULL,
  `SECTION` varchar(2) COLLATE utf8mb4_general_ci NOT NULL,
  `START_YEAR` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`CLASS_ID`, `STRENGTH`, `YEAR`, `SECTION`, `START_YEAR`) VALUES
('09-B-2024', 30, 9, 'B', 2024),
('10-A-2024', 30, 10, 'A', 2024),
('10-B-2024', 30, 10, 'B', 2024),
('11-B-2025', 30, 11, 'B', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `class_course`
--

CREATE TABLE `class_course` (
  `CLASS_ID` varchar(9) COLLATE utf8mb4_general_ci NOT NULL,
  `COURSE_ID` varchar(8) COLLATE utf8mb4_general_ci NOT NULL,
  `START_TIME` datetime NOT NULL,
  `END_TIME` datetime NOT NULL,
  `FACULTY_ID` int NOT NULL,
  `DAY` varchar(8) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_teacher`
--

CREATE TABLE `class_teacher` (
  `CLASS_ID` varchar(9) COLLATE utf8mb4_general_ci NOT NULL,
  `FACULTY_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clo`
--

CREATE TABLE `clo` (
  `CLO_ID` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `CLO_NAME` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `CLO_DESC` varchar(1024) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `COURSE_ID` varchar(8) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `COURSE_ID` varchar(8) COLLATE utf8mb4_general_ci NOT NULL,
  `COURSE_NAME` varchar(128) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eca`
--

CREATE TABLE `eca` (
  `ECA_ID` int NOT NULL,
  `NAME` varchar(64) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_details`
--

CREATE TABLE `employee_details` (
  `EMPLOYEE_ID` int NOT NULL,
  `FULLTIME` tinyint(1) NOT NULL,
  `SALARY` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_qualification`
--

CREATE TABLE `faculty_qualification` (
  `FACULTY_ID` int NOT NULL,
  `QUALIFICATION_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `GENDER_ID` varchar(8) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genders`
--

INSERT INTO `genders` (`GENDER_ID`) VALUES
('Female'),
('Intersex'),
('Male');

-- --------------------------------------------------------

--
-- Table structure for table `guardian_details`
--

CREATE TABLE `guardian_details` (
  `GUARDIAN_ID` int NOT NULL,
  `OCCUPATION` varchar(128) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guardian_details`
--

INSERT INTO `guardian_details` (`GUARDIAN_ID`, `OCCUPATION`) VALUES
(11, 'Hitman');

-- --------------------------------------------------------

--
-- Table structure for table `nationalities`
--

CREATE TABLE `nationalities` (
  `NAT_ID` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `BLOCKED` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nationalities`
--

INSERT INTO `nationalities` (`NAT_ID`, `BLOCKED`) VALUES
('Afghan', 0),
('Albanian', 0),
('Algerian', 0),
('American', 0),
('Andorran', 0),
('Angolan', 0),
('Antiguans', 0),
('Argentinean', 0),
('Armenian', 0),
('Australian', 0),
('Austrian', 0),
('Azerbaijani', 0),
('Bahamian', 0),
('Bahraini', 0),
('Bangladeshi', 0),
('Barbadian', 0),
('Barbudans', 0),
('Batswana', 0),
('Belarusian', 0),
('Belgian', 0),
('Belizean', 0),
('Beninese', 0),
('Bhutanese', 0),
('Bolivian', 0),
('Bosnian', 0),
('Brazilian', 0),
('British', 0),
('Bruneian', 0),
('Bulgarian', 0),
('Burkinabe', 0),
('Burmese', 0),
('Burundian', 0),
('Cambodian', 0),
('Cameroonian', 0),
('Canadian', 0),
('Cape Verdean', 0),
('Central African', 0),
('Chadian', 0),
('Chilean', 0),
('Chinese', 0),
('Colombian', 0),
('Comoran', 0),
('Congolese', 0),
('Costa Rican', 0),
('Croatian', 0),
('Cuban', 0),
('Cypriot', 0),
('Czech', 0),
('Danish', 0),
('Djibouti', 0),
('Dominican', 0),
('Dutch', 0),
('East Timorese', 0),
('Ecuadorean', 0),
('Egyptian', 0),
('Emirian', 0),
('Equatorial Guinean', 0),
('Eritrean', 0),
('Estonian', 0),
('Ethiopian', 0),
('Fijian', 0),
('Filipino', 0),
('Finnish', 0),
('French', 0),
('Gabonese', 0),
('Gambian', 0),
('Georgian', 0),
('German', 0),
('Ghanaian', 0),
('Greek', 0),
('Grenadian', 0),
('Guatemalan', 0),
('Guinea-Bissauan', 0),
('Guinean', 0),
('Guyanese', 0),
('Haitian', 0),
('Herzegovinian', 0),
('Honduran', 0),
('Hungarian', 0),
('I-Kiribati', 0),
('Icelander', 0),
('Indian', 0),
('Indonesian', 0),
('Iranian', 0),
('Iraqi', 0),
('Irish', 0),
('Israeli', 0),
('Italian', 0),
('Ivorian', 0),
('Jamaican', 0),
('Japanese', 0),
('Jordanian', 0),
('Kazakhstani', 0),
('Kenyan', 0),
('Kittian and Nevisian', 0),
('Kuwaiti', 0),
('Kyrgyz', 0),
('Laotian', 0),
('Latvian', 0),
('Lebanese', 0),
('Liberian', 0),
('Libyan', 0),
('Liechtensteiner', 0),
('Lithuanian', 0),
('Luxembourger', 0),
('Macedonian', 0),
('Malagasy', 0),
('Malawian', 0),
('Malaysian', 0),
('Maldivan', 0),
('Malian', 0),
('Maltese', 0),
('Marshallese', 0),
('Mauritanian', 0),
('Mauritian', 0),
('Mexican', 0),
('Micronesian', 0),
('Moldovan', 0),
('Monacan', 0),
('Mongolian', 0),
('Moroccan', 0),
('Mosotho', 0),
('Motswana', 0),
('Mozambican', 0),
('Namibian', 0),
('Nauruan', 0),
('Nepalese', 0),
('New Zealander', 0),
('Nicaraguan', 0),
('Nigerian', 0),
('Nigerien', 0),
('North Korean', 0),
('Northern Irish', 0),
('Norwegian', 0),
('Omani', 0),
('Pakistani', 0),
('Palauan', 0),
('Palestenian', 0),
('Panamanian', 0),
('Papua New Guinean', 0),
('Paraguayan', 0),
('Peruvian', 0),
('Polish', 0),
('Portuguese', 0),
('Qatari', 0),
('Romanian', 0),
('Russian', 0),
('Rwandan', 0),
('Saint Lucian', 0),
('Salvadoran', 0),
('Samoan', 0),
('San Marinese', 0),
('Sao Tomean', 0),
('Saudi', 0),
('Scottish', 0),
('Senegalese', 0),
('Serbian', 0),
('Seychellois', 0),
('Sierra Leonean', 0),
('Singaporean', 0),
('Slovakian', 0),
('Slovenian', 0),
('Solomon Islander', 0),
('Somali', 0),
('South African', 0),
('South Korean', 0),
('Spanish', 0),
('Sri Lankan', 0),
('Sudanese', 0),
('Surinamer', 0),
('Swazi', 0),
('Swedish', 0),
('Swiss', 0),
('Syrian', 0),
('Taiwanese', 0),
('Tajik', 0),
('Tanzanian', 0),
('Thai', 0),
('Togolese', 0),
('Tongan', 0),
('Trinidadian or Tobagonian', 0),
('Tunisian', 0),
('Turkish', 0),
('Tuvaluan', 0),
('Ugandan', 0),
('Ukrainian', 0),
('Uruguayan', 0),
('Uzbekistani', 0),
('Venezuelan', 0),
('Vietnamese', 0),
('Welsh', 0),
('Yemenite', 0),
('Zambian', 0),
('Zimbabwean', 0);

-- --------------------------------------------------------

--
-- Table structure for table `qualification`
--

CREATE TABLE `qualification` (
  `QUALIFICATION_ID` int NOT NULL,
  `NAME` varchar(128) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `QUESTION_ID` int NOT NULL,
  `QUESTION_DESC` varchar(1024) COLLATE utf8mb4_general_ci NOT NULL,
  `QUESTION_TYPE` int DEFAULT NULL,
  `MAX_MARKS` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question_assessment`
--

CREATE TABLE `question_assessment` (
  `QUESTION_ID` int NOT NULL,
  `ASSESSMENT_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question_clo`
--

CREATE TABLE `question_clo` (
  `QUESTION_ID` int NOT NULL,
  `CLO_ID` varchar(12) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question_types`
--

CREATE TABLE `question_types` (
  `QUESTION_TYPE` int NOT NULL,
  `TYPE_NAME` varchar(32) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relation`
--

CREATE TABLE `relation` (
  `RELATION_ID` int NOT NULL,
  `RELATION_TYPE` varchar(64) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relation`
--

INSERT INTO `relation` (`RELATION_ID`, `RELATION_TYPE`) VALUES
(1, 'Mother'),
(2, 'Father'),
(3, 'Brother'),
(4, 'Sister'),
(5, 'Grandfather'),
(6, 'Grandmother'),
(7, 'Uncle');

-- --------------------------------------------------------

--
-- Table structure for table `religions`
--

CREATE TABLE `religions` (
  `RELIGION_ID` varchar(32) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `religions`
--

INSERT INTO `religions` (`RELIGION_ID`) VALUES
('Adventism'),
('Atheism'),
('Ayyavazhi'),
('Buddhism'),
('Christianity'),
('Cultism'),
('Hinduism'),
('Islam'),
('Judaism'),
('Sikhism'),
('Zoroastrianism');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `ROLE_ID` varchar(16) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`ROLE_ID`) VALUES
('ADMIN'),
('ALUMNI'),
('FACULTY'),
('GUARDIAN'),
('STAFF'),
('STUDENT');

-- --------------------------------------------------------

--
-- Table structure for table `std_asmnt`
--

CREATE TABLE `std_asmnt` (
  `STUDENT_ID` int NOT NULL,
  `ASSESSMENT_ID` int NOT NULL,
  `OBTAINED_MARKS` int NOT NULL,
  `SUBMISSION_DATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_academic_history`
--

CREATE TABLE `student_academic_history` (
  `STUDENT_ID` int NOT NULL,
  `CLASS_ID` varchar(9) COLLATE utf8mb4_general_ci NOT NULL,
  `ENROLLMENT_DATE` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_academic_history`
--

INSERT INTO `student_academic_history` (`STUDENT_ID`, `CLASS_ID`, `ENROLLMENT_DATE`) VALUES
(9, '10-A-2024', '2023-10-19 04:51:04');

-- --------------------------------------------------------

--
-- Table structure for table `student_eca`
--

CREATE TABLE `student_eca` (
  `STUDENT_ID` int NOT NULL,
  `ECA_ID` int NOT NULL,
  `ROLE` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_guardian`
--

CREATE TABLE `student_guardian` (
  `STUDENT_ID` int NOT NULL,
  `GUARDIAN_ID` int NOT NULL,
  `RELATION_ID` int DEFAULT NULL,
  `FLAG` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_guardian`
--

INSERT INTO `student_guardian` (`STUDENT_ID`, `GUARDIAN_ID`, `RELATION_ID`, `FLAG`) VALUES
(9, 11, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `TRANSACTION_ID` int NOT NULL,
  `STUDENT_ID` int DEFAULT NULL,
  `T_NAME` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `T_AMOUNT` int NOT NULL,
  `T_DATE` date NOT NULL,
  `T_FLAG` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`TRANSACTION_ID`, `STUDENT_ID`, `T_NAME`, `T_AMOUNT`, `T_DATE`, `T_FLAG`) VALUES
(2, 9, 'Grade 10 October Tuition Fee', 29300, '2023-10-19', 1),
(3, 9, 'Fall 2023 Student Activity Charges', 6000, '2023-10-19', 1),
(7, 9, 'School Bhatta Fall 2023', 3000, '2023-10-19', 1),
(8, 9, 'Fee Payment by Guardian of Student', -35000, '2023-10-19', 1),
(9, 9, 'School Bhatta Fall 2023', 3000, '2023-10-19', 1),
(10, 9, 'Fee Payment by Guardian of Student', -6300, '2023-10-19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `USER_ID` int NOT NULL,
  `CNIC` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FIRST_NAME` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `LAST_NAME` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `DOB` date NOT NULL,
  `GENDER` varchar(7) COLLATE utf8mb4_general_ci NOT NULL,
  `EMERGENCY_CONTACT` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `JOIN_DATE` date NOT NULL,
  `NATIONALITY` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `RELIGION` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `P_HASH` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `ROLE_ID` varchar(16) COLLATE utf8mb4_general_ci NOT NULL,
  `EMAIL_ADDRESS` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `BLOCK` tinyint(1) DEFAULT '0',
  `ADDRESS` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `PHONE` varchar(24) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`USER_ID`, `CNIC`, `FIRST_NAME`, `LAST_NAME`, `DOB`, `GENDER`, `EMERGENCY_CONTACT`, `JOIN_DATE`, `NATIONALITY`, `RELIGION`, `P_HASH`, `ROLE_ID`, `EMAIL_ADDRESS`, `BLOCK`, `ADDRESS`, `PHONE`) VALUES
(3, '42201-896130-2', 'Maaz', 'Karim', '2001-12-12', 'Male', '+92-323-8256184', '2008-08-08', 'Pakistani', 'Islam', '$2b$12$ELuayQuQI9NrQmzTNIMfgOqkEnA1B.UWwXdrCoCijqYX871WY74ay', 'FACULTY', 'random@continental.com', 0, 'ContinentalHotel', '+92-323-8225824'),
(4, '42201-896130-3', 'Musab', 'Iqbal', '2001-12-12', 'Male', '+92-323-8256184', '2008-08-08', 'Pakistani', 'Islam', '$2b$12$ELuayQuQI9NrQmzTNIMfgOqkEnA1B.UWwXdrCoCijqYX871WY74ay', 'STUDENT', 'random123@continental.com', 0, 'ContinentalHotel', '+92-324-8236824'),
(5, '42201-896120-3', 'Harry', 'Potter', '2001-12-12', 'Male', '+92-323-8254184', '2008-08-08', 'British', 'Athiest', '$2b$12$ELuayQuQI9NrQmzTNIMfgOqkEnA1B.UWwXdrCoCijqYX871WY74ay', 'STUDENT', 'random123@continental.com', 0, 'ContinentalHotel', '+92-324-8237824'),
(9, '42201-896130-1', 'John', 'Wick', '2001-12-12', 'Male', '+92-323-8257184', '2008-08-08', 'Pakistani', 'Islam', '$2b$12$ELuayQuQI9NrQmzTNIMfgOqkEnA1B.UWwXdrCoCijqYX871WY74ay', 'STUDENT', 'j.wick@continental.com', 0, 'ContinentalHotel', '+92-323-8225814'),
(11, '43201-896210-1', 'Nabeel', 'Mirza', '2001-12-12', 'Male', '+92-333-8227116', '2008-08-08', 'Pakistani', 'Islam', '$2b$12$ELuayQuQI9NrQmzTNIMfgOqkEnA1B.UWwXdrCoCijqYX871WY74ay', 'GUARDIAN', 'nabeelmirza79@gmail.com', 0, 'M97/4, Khayaban-e-Saadi, Phase 7, DHA', '+92-323-8227006');

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
  MODIFY `ASSESSMENT_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eca`
--
ALTER TABLE `eca`
  MODIFY `ECA_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `qualification`
--
ALTER TABLE `qualification`
  MODIFY `QUALIFICATION_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `QUESTION_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question_types`
--
ALTER TABLE `question_types`
  MODIFY `QUESTION_TYPE` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `relation`
--
ALTER TABLE `relation`
  MODIFY `RELATION_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `TRANSACTION_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `USER_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
