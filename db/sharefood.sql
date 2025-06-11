-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Jun 2025 pada 19.35
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
  `id` int(11) NOT NULL,
  `donor_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `donation_details`
--

CREATE TABLE `donation_details` (
  `id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `food_name` varchar(100) NOT NULL,
  `quantity` varchar(50) NOT NULL,
  `expiry_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `donation_status`
--

CREATE TABLE `donation_status` (
  `id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `changed_at` datetime DEFAULT current_timestamp(),
  `changed_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `organizations`
--

CREATE TABLE `organizations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `org_name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `description` text DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `proofs`
--

CREATE TABLE `proofs` (
  `id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `org_id` int(11) NOT NULL,
  `photo_url` text NOT NULL,
  `confirmed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `status_name` enum('waiting','verified','completed','rejected') NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `statuses`
--

INSERT INTO `statuses` (`id`, `status_name`, `description`) VALUES
(1, 'waiting', 'Donation submitted, waiting for admin verification'),
(2, 'verified', 'Donation approved by admin'),
(3, 'completed', 'Donation confirmed received with photo proof'),
(4, 'rejected', 'Donation rejected by admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('donor','organization','admin') NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- Indeks untuk tabel `donation_details`
--
ALTER TABLE `donation_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`);

--
-- Indeks untuk tabel `donation_status`
--
ALTER TABLE `donation_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `changed_by` (`changed_by`);

--
-- Indeks untuk tabel `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `proofs`
--
ALTER TABLE `proofs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`),
  ADD KEY `org_id` (`org_id`);

--
-- Indeks untuk tabel `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `status_name` (`status_name`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `donation_details`
--
ALTER TABLE `donation_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `donation_status`
--
ALTER TABLE `donation_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `proofs`
--
ALTER TABLE `proofs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`);

--
-- Ketidakleluasaan untuk tabel `donation_details`
--
ALTER TABLE `donation_details`
  ADD CONSTRAINT `donation_details_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `donation_status`
--
ALTER TABLE `donation_status`
  ADD CONSTRAINT `donation_status_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `donation_status_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`),
  ADD CONSTRAINT `donation_status_ibfk_3` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `organizations`
--
ALTER TABLE `organizations`
  ADD CONSTRAINT `organizations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `proofs`
--
ALTER TABLE `proofs`
  ADD CONSTRAINT `proofs_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `proofs_ibfk_2` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
