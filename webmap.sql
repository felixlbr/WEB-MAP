-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 08 jan. 2023 à 12:33
-- Version du serveur : 10.3.36-MariaDB-0+deb10u2
-- Version de PHP : 7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `webmap`
--

-- --------------------------------------------------------

--
-- Structure de la table `gares`
--

CREATE TABLE `gares` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `gares`
--

INSERT INTO `gares` (`id`, `libelle`, `position`) VALUES
(1, 'plaisir-grignon', 'plaisir'),
(2, 'plaisir-lesclays', 'plaisir'),
(3, 'versailles-chantier', 'versailles'),
(4, 'pont du Gargliano', 'paris'),
(5, 'montparnasse', 'paris');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `droit` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `libelle`, `droit`) VALUES
(1, 'admin', 'tout'),
(2, 'standard', 'limité');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  `home` varchar(100) DEFAULT NULL,
  `work` varchar(100) DEFAULT NULL,
  `roles` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `prenom`, `email`, `pwd`, `home`, `work`, `roles`) VALUES
(184, 'Franck', 'hugo@hugo', '1234444444', NULL, NULL, 2),
(186, 'test', 'test@test', 'testtest', 'Plaisir - Grignon', 'Pont du Garigliano - Hôpital Européen G. Pompidou', 2),
(187, 'Test', 'test@testt', 'testtest', NULL, NULL, 2),
(190, 'François', 'fr.peuch@gmail.com', 'Azertyuiop1', NULL, NULL, 2),
(194, 'Félix', 'felix@gmail', 'testtest', 'Saint-Quentin en Yvelines - Montigny-le-Bretonneux', '', 2),
(196, 'Test', 'test@t', 'testtest', NULL, NULL, 2),
(198, 'Test1', 'test1@gmail', 'Test1@gmail.com', NULL, NULL, 2),
(199, 'admin', 'admin@admin', 'adminadmin', NULL, NULL, 1),
(200, 'meriem', 'meriesklzqkddlss.em@gmail.com', 'meriemmeriem', 'Bibliothèque François Mitterrand', 'Pont du Garigliano - Hôpital Européen G. Pompidou', 2),
(201, 'jm', 'jm', '12345678', NULL, NULL, 2),
(202, 'jm', 'jm@gmail', 'testtest', 'Plaisir - Grignon', 'Château de Vincennes', 2),
(203, 'toto', 'toto@gmail.com', '12345678', NULL, NULL, 2),
(205, 'jerome', 'jerome@fessy', '05a671c66aefea124cc08b76ea6d30bb', NULL, NULL, 2),
(206, 'jules', 'jules@ferry', '05a671c66aefea124cc08b76ea6d30bb', NULL, NULL, 2),
(207, 'paul', 'paul@teo', 'cca7f8b9ad32803552f55cfc11936282', '', '', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `gares`
--
ALTER TABLE `gares`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `mail` (`email`),
  ADD KEY `roles` (`roles`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roles`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
