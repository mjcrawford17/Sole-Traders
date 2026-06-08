-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 20, 2026 at 12:32 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SoleTraders`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int NOT NULL,
  `trader_id` int DEFAULT NULL,
  `client_name` varchar(50) NOT NULL,
  `client_email` varchar(100) NOT NULL,
  `service_id` int DEFAULT NULL,
  `job_location` varchar(58) NOT NULL,
  `requested_date` date NOT NULL,
  `requested_start_time` time NOT NULL,
  `requested_end_time` time NOT NULL,
  `job_description` varchar(250) NOT NULL,
  `status` enum('accepted','rejected','pending') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `trader_id`, `client_name`, `client_email`, `service_id`, `job_location`, `requested_date`, `requested_start_time`, `requested_end_time`, `job_description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Rodger Stewart', 'rstew12@email.com', 2, 'Currie', '2026-02-19', '12:00:00', '13:00:00', '1 small blind needs fitted in my kitchen', 'accepted', '2026-02-07 15:51:55', '2026-02-07 18:18:48'),
(2, 25, 'Greta Thumb', 'gthumb@email.com', 5, 'Glasgow', '2026-02-20', '12:00:00', '13:00:00', 'Small garden not much work needed', 'pending', '2026-02-07 19:19:21', '2026-02-07 19:19:21'),
(3, 1, 'Dianne Herron', 'dmec@email.com', 2, 'Sighthill', '2026-02-26', '09:00:00', '10:00:00', 'Small blind for my kitchen', 'pending', '2026-02-09 17:04:00', '2026-02-13 11:31:49'),
(4, 1, 'Michael Crawford', 'mccccc1@email.com', 2, 'Sighthill', '2026-02-25', '14:00:00', '15:00:00', 'Small blind for mancave', 'accepted', '2026-02-09 17:06:35', '2026-02-11 21:43:08'),
(5, 1, 'Dianne Herron', 'dmec@email.com', 3, 'Sighthill', '2026-03-12', '13:00:00', '15:00:00', 'Curtain for my hall window', 'rejected', '2026-02-09 17:09:15', '2026-02-13 11:45:59'),
(6, 25, 'Danny Dryer', 'dryer@email.com', 5, 'Braehead', '2026-03-04', '10:00:00', '10:30:00', 'Small terraced lawn', 'pending', '2026-02-09 17:14:44', '2026-02-09 17:14:44'),
(7, 25, 'Arnold Palmer', 'palms@email.com', 5, 'Glasgow', '2026-02-23', '11:00:00', '12:00:00', 'Small house in central Glasgow', 'pending', '2026-02-09 17:26:46', '2026-02-09 17:26:46'),
(8, 25, 'Diane Low', 'dlow@email.com', 5, 'Braehead', '2026-04-01', '13:00:00', '13:30:00', 'Small house near Braehead', 'pending', '2026-02-09 17:28:00', '2026-02-09 17:28:00'),
(9, 25, 'Matthew Crawford', 'matty@email.com', 5, 'Glasgow', '2026-02-13', '13:30:00', '14:30:00', 'Small house near Ibrox', 'pending', '2026-02-09 17:30:02', '2026-02-09 17:30:02'),
(10, 1, 'Al Hamilton', 'alham@email.com', 4, 'Sighthill', '2026-03-25', '10:30:00', '11:30:00', 'Requested by Edi Interiors', 'pending', '2026-02-09 17:33:25', '2026-02-09 17:33:25'),
(11, 1, 'Daniel Dryer', 'dry123@email.com', 2, 'Meadows, Edinburgh', '2026-03-10', '14:00:00', '15:00:00', 'Small blind for living room', 'accepted', '2026-02-09 17:37:20', '2026-02-09 17:53:39'),
(12, 25, 'Michael Crawford', 'mike@email.com', 5, 'Shawlands', '2026-02-17', '13:30:00', '14:00:00', 'House outer Glasgow', 'pending', '2026-02-09 17:42:06', '2026-02-09 17:42:06'),
(13, 1, 'Mike Croft', 'mike@email.com', 3, 'Broomhouse', '2026-03-27', '15:00:00', '16:30:00', 'Large Patio Doors', 'pending', '2026-02-09 19:56:47', '2026-02-09 19:56:47'),
(14, 3, 'Sarah Collins', 'scollins@email.com', 8, 'Dromara', '2026-02-21', '08:00:00', '12:00:00', 'Need full house rewiring for new kitchen extension', 'accepted', '2026-02-10 10:15:30', '2026-02-10 14:22:15'),
(15, 3, 'Peter Davidson', 'pdavidson@email.com', 9, 'Dromore', '2026-02-28', '10:00:00', '12:00:00', 'Electrical safety certificate needed for house sale', 'pending', '2026-02-10 11:30:45', '2026-02-10 11:30:45'),
(16, 3, 'Karen Murphy', 'kmurphy@email.com', 10, 'Ballynahinch', '2026-03-05', '14:00:00', '16:00:00', 'Additional sockets needed in home office and living room', 'pending', '2026-02-11 09:20:18', '2026-02-11 09:20:18'),
(17, 4, 'John Patterson', 'jpatterson@email.com', 11, 'Lisburn', '2026-02-24', '10:00:00', '16:00:00', 'Master bedroom needs full repaint', 'accepted', '2026-02-10 13:45:22', '2026-02-10 16:30:10'),
(18, 4, 'Emma Wilson', 'ewilson@email.com', 12, 'Hillsborough', '2026-03-08', '09:00:00', '17:00:00', 'Front and side of house exterior painting', 'pending', '2026-02-11 14:25:35', '2026-02-11 14:25:35'),
(19, 5, 'Robert Hughes', 'rhughes@email.com', 13, 'Kinallen', '2026-02-18', '07:00:00', '09:00:00', 'Burst pipe in bathroom needs urgent repair', 'accepted', '2026-02-10 08:15:40', '2026-02-10 09:05:22'),
(20, 5, 'Linda McCarthy', 'lmccarthy@email.com', 14, 'Dromore', '2026-03-01', '10:00:00', '14:00:00', 'Complete bathroom refit including new suite', 'pending', '2026-02-11 10:40:15', '2026-02-11 10:40:15'),
(21, 5, 'Tom Anderson', 'tanderson@email.com', 15, 'Dromara', '2026-02-27', '08:00:00', '10:00:00', 'Annual boiler service and safety inspection', 'accepted', '2026-02-12 11:20:33', '2026-02-12 13:45:18'),
(22, 6, 'Claire Robertson', 'crobertson@email.com', 16, 'Sheffield', '2026-03-15', '11:00:00', '18:00:00', 'Bespoke kitchen cabinets for new build', 'pending', '2026-02-11 15:30:25', '2026-02-11 15:30:25'),
(23, 6, 'Mark Stevens', 'mstevens@email.com', 17, 'Rotherham', '2026-03-20', '12:00:00', '17:00:00', 'Three fitted wardrobes for bedrooms', 'pending', '2026-02-12 09:45:40', '2026-02-12 09:45:40'),
(24, 20, 'Hannah Price', 'hprice@email.com', 19, 'Rathfriland', '2026-02-22', '11:30:00', '16:30:00', 'Oak staircase installation for renovation project', 'accepted', '2026-02-10 16:20:15', '2026-02-11 10:15:30'),
(25, 20, 'David Foster', 'dfoster@email.com', 20, 'Newry', '2026-03-06', '12:00:00', '17:00:00', 'Laminate flooring throughout downstairs', 'pending', '2026-02-11 13:35:45', '2026-02-11 13:35:45'),
(26, 21, 'Sophie Turner', 'sturner@email.com', 21, 'Belfast', '2026-02-25', '08:00:00', '16:00:00', 'Full house interior painting and decorating', 'pending', '2026-02-11 11:50:22', '2026-02-11 11:50:22'),
(27, 21, 'Brian Kelly', 'bkelly@email.com', 22, 'Lisburn', '2026-03-03', '09:00:00', '13:00:00', 'Feature wall in living room with textured finish', 'accepted', '2026-02-12 10:25:18', '2026-02-12 14:40:35'),
(28, 22, 'Patricia Green', 'pgreen@email.com', 24, 'Craigavon', '2026-02-26', '09:00:00', '15:00:00', 'Complete garden redesign with new planting scheme', 'pending', '2026-02-11 12:15:40', '2026-02-11 12:15:40'),
(29, 22, 'Andrew Marshall', 'amarshall@email.com', 25, 'Portadown', '2026-03-11', '10:00:00', '11:30:00', 'Regular lawn maintenance service needed', 'pending', '2026-02-12 15:30:25', '2026-02-12 15:30:25'),
(30, 28, 'Rachel Bennett', 'rbennett@email.com', 37, 'Carlisle', '2026-03-07', '13:00:00', '17:00:00', 'Rewire garage and install new consumer unit', 'accepted', '2026-02-12 16:45:20', '2026-02-13 09:20:15'),
(31, 28, 'Steven Cooper', 'scooper@email.com', 38, 'Penrith', '2026-03-14', '14:00:00', '18:00:00', 'Garden security lighting installation', 'pending', '2026-02-13 08:30:45', '2026-02-13 08:30:45'),
(32, 25, 'Donald Duck', 'duckdon@email.com', 32, 'Braehead', '2026-03-26', '09:00:00', '12:00:00', 'Require assistance tidying my Garden', 'pending', '2026-02-13 22:06:19', '2026-02-13 22:06:19');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `profile_id` int NOT NULL,
  `trader_id` int NOT NULL,
  `trade_type` varchar(30) NOT NULL,
  `region_town` varchar(58) NOT NULL,
  `bio` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `availability_start_time` time NOT NULL,
  `availability_end_time` time NOT NULL,
  `availability_details` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`profile_id`, `trader_id`, `trade_type`, `region_town`, `bio`, `availability_start_time`, `availability_end_time`, `availability_details`, `created_at`, `updated_at`) VALUES
(1, 1, 'Curtain Fitter', 'Edinburgh', 'Finest Fitter in Scotland', '08:00:00', '19:00:00', '', '2026-01-20 00:18:37', '2026-02-09 22:38:29'),
(2, 2, 'Carpenter', 'Hillsborough', 'Crafting quality woodwork solutions for your home', '07:00:00', '18:00:00', '', '2026-01-20 19:09:49', '2026-02-13 10:22:19'),
(3, 3, 'Electrician', 'Dromara', 'I wire houses', '06:00:00', '20:00:00', '', '2026-01-21 23:03:20', '2026-02-09 22:38:29'),
(4, 4, 'Painter', 'Lisburn', 'Love decorating houses', '10:00:00', '19:00:00', '', '2026-01-21 23:03:20', '2026-02-09 22:38:29'),
(5, 5, 'Plumber', 'Kinallen', 'Sorting the pipes', '05:00:00', '15:00:00', '', '2026-01-21 23:03:20', '2026-02-09 22:38:29'),
(6, 6, 'Joiner', 'Sheffield', 'Joining things', '11:00:00', '23:00:00', '', '2026-01-21 23:03:20', '2026-02-09 22:38:29'),
(7, 19, 'Carpenter', 'Anahilt', 'Making wood work for you', '05:00:00', '20:00:00', '', '2026-02-04 00:17:36', '2026-02-13 10:22:00'),
(8, 20, 'Joiner', 'Rathfriland', 'Woodworking', '11:00:00', '18:30:00', '', '2026-02-04 00:18:38', '2026-02-09 22:38:29'),
(9, 21, 'Painter', 'Belfast', 'Painting a smile on your face', '07:00:00', '17:00:00', '', '2026-02-05 14:42:59', '2026-02-09 22:38:29'),
(10, 22, 'Gardener', 'Craigavon', 'I beg your pardon, I do promise you a rose garden', '08:00:00', '18:00:00', '', '2026-02-05 14:49:47', '2026-02-09 22:38:29'),
(11, 23, 'Joiner', 'Bangor', 'For all your woodwork and joining needs', '06:00:00', '15:30:00', '', '2026-02-06 23:24:37', '2026-02-09 22:38:29'),
(12, 24, 'Painter', 'Croydon', 'General Handyman', '06:00:00', '16:00:00', '', '2026-02-06 23:25:50', '2026-02-09 22:38:29'),
(13, 25, 'Gardener', 'Glasgow', 'Gardener and Sheep Shearer', '04:00:00', '16:00:00', '', '2026-02-06 23:28:15', '2026-02-09 22:38:29'),
(14, 26, 'Designer', 'Anahilt', 'Designing Luxury Homes', '07:45:00', '17:00:00', 'Not available Sundays', '2026-02-09 23:00:18', '2026-02-09 23:58:43'),
(15, 28, 'Electrician', 'Carlisle', 'The Spark in your life', '12:00:00', '20:30:00', '', '2026-02-12 17:33:08', '2026-02-13 10:20:19');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` int NOT NULL,
  `trader_id` int NOT NULL,
  `client_email` varchar(100) NOT NULL,
  `client_name` varchar(50) NOT NULL,
  `stars` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`rating_id`, `trader_id`, `client_email`, `client_name`, `stars`, `created_at`) VALUES
(1, 1, 'matt@email.com', 'Matthew Crawford', 5, '2026-02-09 15:17:40'),
(2, 25, 'matt@email.com', 'Matthew Crawford', 4, '2026-02-09 15:20:43'),
(6, 1, 'mjc127@email.com', 'Matt Crawfish', 3, '2026-02-09 15:40:16'),
(7, 6, 'matt@email.com', 'Matt Crawfish', 2, '2026-02-09 17:55:29'),
(8, 3, 'mjc127@email.com', 'Matt Crawfish', 4, '2026-02-09 17:55:53'),
(9, 1, 'mike@email.com', 'Mike Croft', 5, '2026-02-09 19:55:37'),
(10, 24, 'mjc127@email.com', 'Matt Crawfish', 3, '2026-02-10 00:06:11'),
(11, 28, 'matt@email.com', 'Matthew Crawfish', 4, '2026-02-13 10:20:35'),
(12, 3, 'sarahjohnson@email.com', 'Sarah Johnson', 1, '2026-02-10 14:23:15'),
(13, 3, 'jameswilson@email.com', 'James Wilson', 5, '2026-02-11 09:47:33'),
(14, 4, 'emmadavies@email.com', 'Emma Davies', 2, '2026-02-08 16:12:44'),
(15, 4, 'robertbrown@email.com', 'Robert Brown', 4, '2026-02-10 11:35:22'),
(16, 4, 'lisamartinez@email.com', 'Lisa Martinez', 5, '2026-02-12 13:58:09'),
(17, 5, 'oliversmith@email.com', 'Oliver Smith', 4, '2026-02-07 10:45:18'),
(18, 5, 'sophietaylor@email.com', 'Sophie Taylor', 1, '2026-02-09 15:22:47'),
(19, 5, 'danielwhite@email.com', 'Daniel White', 4, '2026-02-11 17:03:55'),
(20, 6, 'rachelgreen@email.com', 'Rachel Green', 3, '2026-02-10 12:18:26'),
(21, 6, 'michaelthompson@email.com', 'Michael Thompson', 4, '2026-02-12 16:42:31'),
(22, 17, 'hannahclark@email.com', 'Hannah Clark', 1, '2026-02-09 13:27:44'),
(23, 17, 'thomasanderson@email.com', 'Thomas Anderson', 5, '2026-02-10 18:55:12'),
(24, 17, 'amyroberts@email.com', 'Amy Roberts', 4, '2026-02-12 10:14:38'),
(25, 20, 'emilyparker@email.com', 'Emily Parker', 3, '2026-02-08 14:33:29'),
(26, 20, 'chrisevans@email.com', 'Chris Evans', 4, '2026-02-10 09:47:15'),
(27, 20, 'jessicalewis@email.com', 'Jessica Lewis', 5, '2026-02-11 16:28:42'),
(28, 21, 'paulharris@email.com', 'Paul Harris', 5, '2026-02-09 11:52:36'),
(29, 21, 'natalieking@email.com', 'Natalie King', 3, '2026-02-10 15:19:48'),
(30, 21, 'andrewwright@email.com', 'Andrew Wright', 3, '2026-02-12 12:05:23'),
(31, 22, 'victoriascott@email.com', 'Victoria Scott', 4, '2026-02-08 17:41:52'),
(32, 22, 'benjaminhall@email.com', 'Benjamin Hall', 5, '2026-02-10 13:26:14'),
(33, 22, 'charlottemoore@email.com', 'Charlotte Moore', 3, '2026-02-11 19:38:27'),
(34, 23, 'davidbaker@email.com', 'David Baker', 5, '2026-02-09 10:15:33'),
(35, 23, 'graceturner@email.com', 'Grace Turner', 4, '2026-02-10 16:44:29'),
(36, 23, 'ryanphillips@email.com', 'Ryan Phillips', 2, '2026-02-12 14:22:47'),
(37, 24, 'lucycampbell@email.com', 'Lucy Campbell', 3, '2026-02-11 11:37:18'),
(38, 24, 'stephenmitchell@email.com', 'Stephen Mitchell', 4, '2026-02-12 15:49:52'),
(39, 25, 'katieadams@email.com', 'Katie Adams', 3, '2026-02-10 14:08:41'),
(40, 25, 'markhughes@email.com', 'Mark Hughes', 4, '2026-02-11 18:53:25'),
(41, 26, 'laurabennett@email.com', 'Laura Bennett', 2, '2026-02-10 10:25:17'),
(42, 26, 'jackmorgan@email.com', 'Jack Morgan', 5, '2026-02-11 13:41:29'),
(43, 26, 'megancollins@email.com', 'Megan Collins', 4, '2026-02-12 17:16:43'),
(44, 28, 'alicecooper@email.com', 'Alice Cooper', 2, '2026-02-13 14:32:18'),
(45, 28, 'williamfoster@email.com', 'William Foster', 4, '2026-02-13 16:47:55');

-- --------------------------------------------------------

--
-- Table structure for table `service_listings`
--

CREATE TABLE `service_listings` (
  `service_id` int NOT NULL,
  `trader_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `pricing_type` enum('hourly','fixed') NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `service_listings`
--

INSERT INTO `service_listings` (`service_id`, `trader_id`, `title`, `description`, `pricing_type`, `base_price`, `created_at`, `updated_at`) VALUES
(2, 1, 'Roman Blinds Fitting', '1 Roman Blind fitted using fittings provided by the customer', 'fixed', 155.00, '2026-02-06 23:18:48', '2026-02-08 15:50:57'),
(3, 1, 'Curtain Fitting for Large Window', 'Anything that involves a large ladder', 'hourly', 105.00, '2026-02-06 23:19:46', '2026-02-11 21:35:44'),
(4, 1, 'Do Call Out on behalf of Local Design Studio', 'If they require someone to measure for blinds or curtains', 'fixed', 50.00, '2026-02-06 23:21:43', '2026-02-06 23:21:43'),
(5, 25, 'Mow Small Lawn', 'Nothing bigger than a estate lawn', 'fixed', 25.00, '2026-02-07 19:17:40', '2026-02-07 19:17:40'),
(7, 1, 'Remove Old Curtains', 'Take down old curtains and pole', 'fixed', 35.00, '2026-02-11 21:36:40', '2026-02-11 22:04:20'),
(8, 3, 'Full House Rewire', 'Complete electrical rewiring for residential properties', 'hourly', 65.00, '2026-02-08 10:15:30', '2026-02-08 10:15:30'),
(9, 3, 'Electrical Safety Inspection', 'Comprehensive electrical safety testing and certification', 'fixed', 125.00, '2026-02-08 10:20:15', '2026-02-08 10:20:15'),
(10, 3, 'Socket and Light Installation', 'Install new sockets, switches and light fixtures', 'fixed', 75.00, '2026-02-09 14:30:22', '2026-02-09 14:30:22'),
(11, 4, 'Interior Room Painting', 'Professional painting service for single rooms', 'fixed', 185.00, '2026-02-07 11:45:18', '2026-02-07 11:45:18'),
(12, 4, 'Exterior House Painting', 'Full exterior painting including preparation and weather protection', 'hourly', 45.00, '2026-02-07 11:50:33', '2026-02-07 11:50:33'),
(13, 5, 'Emergency Plumbing Call Out', 'Fast response for plumbing emergencies and pipe repairs', 'fixed', 85.00, '2026-02-08 09:22:44', '2026-02-08 09:22:44'),
(14, 5, 'Bathroom Installation', 'Complete bathroom fitting including toilets, sinks and showers', 'hourly', 55.00, '2026-02-08 09:25:17', '2026-02-08 09:25:17'),
(15, 5, 'Boiler Service', 'Annual boiler maintenance and safety check', 'fixed', 95.00, '2026-02-09 16:40:55', '2026-02-09 16:40:55'),
(16, 6, 'Custom Kitchen Cabinets', 'Bespoke kitchen cabinet design and installation', 'hourly', 65.00, '2026-02-07 14:18:29', '2026-02-07 14:18:29'),
(17, 6, 'Fitted Wardrobes', 'Made-to-measure wardrobe solutions for bedrooms', 'fixed', 850.00, '2026-02-07 14:22:45', '2026-02-07 14:22:45'),
(18, 6, 'Door Frame Installation', 'Install internal door frames and architraves', 'fixed', 95.00, '2026-02-08 13:35:22', '2026-02-08 13:35:22'),
(19, 20, 'Staircase Installation', 'Custom staircase design and fitting', 'hourly', 55.00, '2026-02-08 13:38:10', '2026-02-08 13:38:10'),
(20, 20, 'Wooden Flooring', 'Solid wood and laminate flooring installation', 'hourly', 45.00, '2026-02-09 10:45:37', '2026-02-09 10:45:37'),
(21, 21, 'Interior Decorating', 'Transform your space with professional painting and wallpapering', 'hourly', 35.00, '2026-02-09 12:20:15', '2026-02-09 12:20:15'),
(22, 21, 'Feature Wall Painting', 'Create stunning feature walls with specialist finishes', 'fixed', 125.00, '2026-02-09 12:25:33', '2026-02-09 12:25:33'),
(23, 21, 'Wallpaper Hanging', 'Expert wallpaper installation for any room', 'fixed', 95.00, '2026-02-10 08:15:44', '2026-02-10 08:15:44'),
(24, 22, 'Garden Design and Planting', 'Create beautiful gardens with professional planting schemes', 'hourly', 40.00, '2026-02-10 08:20:22', '2026-02-10 08:20:22'),
(25, 22, 'Lawn Care Service', 'Regular lawn maintenance including mowing and edging', 'fixed', 35.00, '2026-02-10 08:25:18', '2026-02-10 08:25:18'),
(26, 22, 'Hedge Trimming and Pruning', 'Professional hedge and shrub maintenance', 'fixed', 55.00, '2026-02-09 15:30:28', '2026-02-09 15:30:28'),
(27, 23, 'Bespoke Furniture Making', 'Custom furniture pieces crafted to your specifications', 'hourly', 55.00, '2026-02-09 15:35:40', '2026-02-09 15:35:40'),
(28, 23, 'Skirting Board Installation', 'Fit new skirting boards throughout your home', 'fixed', 85.00, '2026-02-10 11:42:15', '2026-02-10 11:42:15'),
(29, 24, 'General Handyman Services', 'All-round property maintenance and repairs', 'hourly', 35.00, '2026-02-10 11:45:28', '2026-02-10 11:45:28'),
(30, 24, 'Flat Pack Assembly', 'Professional furniture assembly service', 'fixed', 45.00, '2026-02-11 09:20:33', '2026-02-11 09:20:33'),
(31, 24, 'Small Repairs and Fixes', 'Quick fixes for household maintenance issues', 'fixed', 55.00, '2026-02-11 09:25:15', '2026-02-11 09:25:15'),
(32, 25, 'Garden Maintenance', 'Regular garden upkeep including weeding and seasonal care', 'hourly', 30.00, '2026-02-07 19:20:18', '2026-02-07 19:20:18'),
(33, 25, 'Tree and Shrub Pruning', 'Professional pruning to keep plants healthy', 'fixed', 65.00, '2026-02-07 19:25:35', '2026-02-07 19:25:35'),
(34, 26, 'Interior Design Consultation', 'Professional design advice for luxury home projects', 'hourly', 85.00, '2026-02-10 13:15:22', '2026-02-10 13:15:22'),
(35, 26, 'Full Room Design Package', 'Complete room design with mood boards and specifications', 'fixed', 450.00, '2026-02-10 13:20:45', '2026-02-10 13:20:45'),
(36, 26, 'Space Planning Service', 'Optimise your home layout with professional space planning', 'fixed', 250.00, '2026-02-10 13:25:18', '2026-02-10 13:25:18'),
(37, 28, 'Domestic Electrical Installation', 'All electrical work for homes including wiring and fittings', 'hourly', 60.00, '2026-02-12 14:30:25', '2026-02-12 14:30:25'),
(38, 28, 'Outdoor Lighting Installation', 'Garden and security lighting setup', 'fixed', 175.00, '2026-02-12 14:35:40', '2026-02-12 14:35:40'),
(39, 28, 'Electric Vehicle Charger Installation', 'Professional EV charging point installation', 'fixed', 395.00, '2026-02-12 14:40:15', '2026-02-12 14:40:15');



-- --------------------------------------------------------

--
-- Table structure for table `traders`
--

CREATE TABLE `traders` (
  `trader_id` int NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `traders`
--

INSERT INTO `traders` (`trader_id`, `full_name`, `username`, `email_address`, `password_hash`, `created_at`, `updated_at`) VALUES
(1, 'Matthew James Crawford', 'mcrawford36', 'mcrawford36@qub.ac.uk', '$2b$10$itDTlGNG/w1n6VK8a2otB.9clviU9Aq0e6uSeY8aek4qzrKrx5Yjq', '2026-01-17 17:47:40', '2026-02-04 14:53:12'),
(2, 'Michael Crawford', 'michaeltrades14', 'mike@email.com', '$2b$10$wtMFajk07JGSYJdv3QnIleuJ36PKiGwvKjllAbOj7IoPhD7Ny0cN6', '2026-01-20 19:09:26', '2026-01-20 19:09:26'),
(3, 'Leah Crawford', 'leah03', 'leah03@emails.com', '$2b$10$itDTlGNG/w1n6VK8a2otB.9clviU9Aq0e6uSeY8aek4qzrKrx5Yjq', '2026-01-21 23:00:24', '2026-01-21 23:00:24'),
(4, 'Dianne Crawford', 'dmec72', 'dmec72@myemail.com', '$2b$10$itDTlGNG/w1n6VK8a2otB.9clviU9Aq0e6uSeY8aek4qzrKrx5Yjq', '2026-01-21 23:00:24', '2026-01-21 23:00:24'),
(5, 'Jordan Poots', 'jp00ts', 'jp00t5@emailish.com', '$2b$10$itDTlGNG/w1n6VK8a2otB.9clviU9Aq0e6uSeY8aek4qzrKrx5Yjq', '2026-01-21 23:00:24', '2026-01-21 23:00:24'),
(6, 'Juno Chen', 'jchen57', 'jchen57@email.com', '$2b$10$itDTlGNG/w1n6VK8a2otB.9clviU9Aq0e6uSeY8aek4qzrKrx5Yjq', '2026-01-21 23:00:24', '2026-01-21 23:00:24'),
(17, 'Philip', 'Campbell', 'philcam@electrics.com', '$2b$10$8RCBVOrSh5IJskhFfHOCj.R.JjsmrnmsmdzwpD/c/uJw4GgI0atVy', '2026-02-02 16:54:23', '2026-02-02 16:54:23'),
(19, 'Jack Campbell', 'jcam', 'jackcam@electric.com', '$2b$10$TLx5gORUFKhpIejDUdNTvelG9lcYyt5L35JcIFDzQ8oYJbTvMSiMe', '2026-02-02 17:04:39', '2026-02-02 17:04:39'),
(20, 'Luke Young', 'lukey123', 'lyoung@email.com', '$2b$10$/u8/yErQUlkjHM999yUEueik9Lh4oV24i73pVphAg7gdN33qxZH06', '2026-02-03 23:31:38', '2026-02-03 23:31:38'),
(21, 'Carly Quinn', 'carlyquinn1305', 'carly@email.com', '$2b$10$JeQMEzbXuwt//nUiHo3eQu2hMBGZom07NqSb/G6FXbEK7XRrKnp6a', '2026-02-05 14:41:24', '2026-02-05 14:41:24'),
(22, 'Maria McCaughley', 'mazza', 'mazza@email.com', '$2b$10$hn35BLuXer7S1oZH3w6A4OCe99Zd6MObMciVrsqOMwlIlvg1ngB32', '2026-02-05 14:44:54', '2026-02-05 14:44:54'),
(23, 'Joshua Kidd', 'jkidd', 'jkidd@email.com', '$2b$10$hlcbp53oIZkvjRlQyIWDxemVXGwR4J1nf13iu1pR4YuoFDaq4FrqS', '2026-02-06 23:23:54', '2026-02-06 23:23:54'),
(24, 'Matt Colverd', 'mcolverd', 'mattc@email.com', '$2b$10$7lbYmv4ugOWFW0z3PTl3ieh6QcJLgSkJiGND8AlSW0PD7O7vb0cPG', '2026-02-06 23:25:18', '2026-02-06 23:25:18'),
(25, 'Laura Ralston', 'lrals', 'lrals@email.com', '$2b$10$QMvsCbNUHmzzp2PxI0Pk.eo9tPPOWBubvRdNcRsbgK6QMjuxHl0/C', '2026-02-06 23:27:48', '2026-02-06 23:27:48'),
(26, 'Trevor Wilson', 'trevdesigns', 'trev@email.com', '$2b$10$2PRKM2Og/3pB25kFnfG2LuB.okDBYvYPslSbkDEyh76/a3RdgujBC', '2026-02-09 14:32:32', '2026-02-09 14:35:52'),
(28, 'Bolu Julius', 'boluj', 'bolu@email.com', '$2b$12$Atk5NpP5Ygwr3JLU70r66e.XVwIsGDIE5Qume/EY.cHtlqsiXLa02', '2026-02-12 13:24:27', '2026-02-12 13:24:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `foreign_booking_trader` (`trader_id`),
  ADD KEY `foreign_booking_service` (`service_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`profile_id`),
  ADD UNIQUE KEY `index_trader_id` (`trader_id`),
  ADD KEY `foreign_traders_profiles` (`trader_id`),
  ADD KEY `index_trade_type` (`trade_type`),
  ADD KEY `index_region` (`region_town`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD UNIQUE KEY `index_trader_client` (`client_email`,`trader_id`),
  ADD KEY `foreign_rating_trader` (`trader_id`);

--
-- Indexes for table `service_listings`
--
ALTER TABLE `service_listings`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `foreign_service_trader` (`trader_id`);

--
-- Indexes for table `traders`
--
ALTER TABLE `traders`
  ADD PRIMARY KEY (`trader_id`),
  ADD UNIQUE KEY `index_email` (`email_address`),
  ADD UNIQUE KEY `index_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `profile_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `service_listings`
--
ALTER TABLE `service_listings`
  MODIFY `service_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `traders`
--
ALTER TABLE `traders`
  MODIFY `trader_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `foreign_booking_service` FOREIGN KEY (`service_id`) REFERENCES `service_listings` (`service_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_booking_trader` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`trader_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `foreign_traders_profiles` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`trader_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `foreign_rating_trader` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`trader_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `service_listings`
--
ALTER TABLE `service_listings`
  ADD CONSTRAINT `foreign_service_trader` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`trader_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
