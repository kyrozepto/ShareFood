-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Jun 2025 pada 19.47
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sharefood`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `donations`
--

CREATE TABLE `donations` (
  `donation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `location` text NOT NULL,
  `donation_status` enum('available','confirmed','completed','canceled') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `donation_picture` text DEFAULT NULL,
  `quantity_value` decimal(10,2) NOT NULL,
  `quantity_unit` enum('kg','g','liter','ml','pcs','pack') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `donations`
--

INSERT INTO `donations` (`donation_id`, `user_id`, `title`, `description`, `expiry_date`, `location`, `donation_status`, `created_at`, `donation_picture`, `quantity_value`, `quantity_unit`) VALUES
(1, 1, 'Canned Tuna - 5 cans', '5 unopened cans of tuna in good condition. Best before July 2025.', '2025-07-01', 'Jl. Merdeka No. 123, Jakarta', 'available', '2025-06-11 05:39:42', NULL, 0.00, 'kg'),
(2, 1, 'Roti dan makanan ringan', 'Beberapa roti dan makanan ringan yang seminggu lagi mendekati tanggal kadaluarsa. Masih sangat layak untuk di makan', NULL, 'BNI ATM UPN \"Veteran\" Jawa Timur', 'available', '2025-06-11 06:15:49', NULL, 0.00, 'kg'),
(3, 1, 'Mie Instan', 'Kadaluarsa dalam 1 bulan', NULL, 'ATM UPN Veteran Jawa Timur', 'completed', '2025-06-11 06:20:14', 'https://ik.imagekit.io/choandrew/satoru-gojo-from-jujutsu-kaisen_3840x2160_xtrafondos.com_VISZwuDuF.jpg', 0.00, 'kg'),
(6, 1, 'Beras', 'Beras masih bisa dikonsumsi dalam jangka waktu panjang', '2025-07-07', 'Indomaret Medokan Ayu', 'available', '2025-06-11 06:34:51', 'https://ik.imagekit.io/choandrew/satoru-gojo-from-jujutsu-kaisen_3840x2160_xtrafondos.com_L5MxSHOIk.jpg', 0.00, 'kg'),
(7, 7, 'Beras', 'Beras lebihan panen', '2025-09-10', 'Jl. Mojopahit, Wunut, Sidoarjo (Rumah Pagar Putih)', 'completed', '2025-06-11 23:35:39', 'https://ik.imagekit.io/choandrew/itachi-uchiha-red-crows-dark-atmosphere-desktop-wallpaper_zDowRhUeo.jpg', 0.00, 'kg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rate` float(2,1) NOT NULL CHECK (`rate` >= 1.0 and `rate` <= 5.0),
  `review` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `ratings`
--

INSERT INTO `ratings` (`rating_id`, `donation_id`, `user_id`, `rate`, `review`, `created_at`) VALUES
(1, 1, 2, 4.5, 'Very generous, the food was fresh and well-packed.', '2025-06-11 22:13:07'),
(2, 3, 1, 4.5, 'Very helpful.', '2025-06-11 22:39:44'),
(4, 7, 7, 5.0, 'very helpful', '2025-06-11 23:52:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `requests`
--

CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `requested_quantity` varchar(50) DEFAULT NULL,
  `pickup_time` time DEFAULT NULL,
  `note` text DEFAULT NULL,
  `request_status` enum('waiting','approved','rejected','completed','canceled') NOT NULL DEFAULT 'waiting',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `requests`
--

INSERT INTO `requests` (`request_id`, `donation_id`, `user_id`, `requested_quantity`, `pickup_time`, `note`, `request_status`, `created_at`) VALUES
(1, 1, 2, '2 pcs', '10:00:00', 'I might arrive 15 minutes late.', 'waiting', '2025-06-11 08:33:14'),
(7, 3, 1, '2 pack', '15:00:00', '-', 'approved', '2025-06-11 14:37:35'),
(8, 7, 7, '3 kg', '18:00:00', 'Saya ambil sore sekitar maghrib', 'waiting', '2025-06-11 23:40:14'),
(9, 7, 7, '3 kg', '18:00:00', 'Saya ambil sore sekitar maghrib', 'completed', '2025-06-11 23:40:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `profile_picture` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `user_type`, `phone`, `created_at`, `profile_picture`) VALUES
(1, 'Bahiskara', 'bahiskara@gmail.com', '$2a$12$D5BGRx44IEWJ5rQvbn83ceJ4CG0j4yftF32vGgSVTRVGC51ASFMoa', 'donor', '081234567890', '2025-06-11 00:59:41', ''),
(2, 'Bima', 'bima@gmail.com', '$2b$10$4ovTJ0Y530k9AfuxoXyaTOtL3s.OdcdoRGwyPxbBdJemy5slO7sY2', 'donor', '081234567890', '2025-06-11 03:02:48', ''),
(6, 'Indra', 'ikoindra@gmail.com', '$2b$10$UPwydlExWPWcjd3b185XP.teUSWbIw4PwPHT/99es08qGqsnIDJPq', 'donor', '081234672384', '2025-06-11 03:37:54', 'https://ik.imagekit.io/choandrew/boy-anime-drawing-illustration_525160-1161_M6huDQjJD.jpg'),
(7, 'Arya', 'arya@gmail.com', '$2b$10$6xrpqgc6f8pJ7/uJX/eYGevqUwKv02NH/7JJz5UEzc/mr1ShVUHyG', 'donor', '081237438457', '2025-06-11 23:27:48', 'https://ik.imagekit.io/choandrew/boy-anime-drawing-illustration_525160-1161_VJFAFyb-Z.jpg');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `donor_id` (`user_id`);

--
-- Indeks untuk tabel `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `donation_id` (`donation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `donation_id` (`donation_id`),
  ADD KEY `requester_id` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`donation_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`donation_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
