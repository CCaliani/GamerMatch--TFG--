CREATE DATABASE  IF NOT EXISTS `gamermatch` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gamermatch`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gamermatch
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) NOT NULL,
  `texto` text NOT NULL,
  `puntuacion` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos`
--

DROP TABLE IF EXISTS `juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `plataforma` varchar(255) NOT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos`
--

LOCK TABLES `juegos` WRITE;
/*!40000 ALTER TABLE `juegos` DISABLE KEYS */;
/*!40000 ALTER TABLE `juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchs`
--

DROP TABLE IF EXISTS `matchs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario1Id` int NOT NULL,
  `usuario2Id` int NOT NULL,
  `juegoId` int NOT NULL,
  `estado` enum('activo','finalizado','cancelado') DEFAULT 'activo',
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchs`
--

LOCK TABLES `matchs` WRITE;
/*!40000 ALTER TABLE `matchs` DISABLE KEYS */;
INSERT INTO `matchs` VALUES (1,1,2,1,'finalizado','2025-05-16 07:38:51','2025-05-16 12:00:00','2025-05-16 07:38:51','2025-05-16 07:38:52'),(2,1,2,3,'activo','2025-05-29 15:21:11',NULL,'2025-05-29 15:21:11','2025-05-29 15:21:11'),(3,1,2,3,'activo','2025-06-04 08:12:27',NULL,'2025-06-04 08:12:27','2025-06-04 08:12:27'),(4,1,2,3,'activo','2025-06-04 08:23:15',NULL,'2025-06-04 08:23:15','2025-06-04 08:23:15'),(5,1,2,3,'activo','2025-06-04 08:55:50',NULL,'2025-06-04 08:55:50','2025-06-04 08:55:50'),(6,1,2,3,'activo','2025-06-04 10:04:07',NULL,'2025-06-04 10:04:07','2025-06-04 10:04:07');
/*!40000 ALTER TABLE `matchs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `matchId` int NOT NULL,
  `usuarioId` int NOT NULL,
  `texto` text NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (1,1,1,'¡Hola! ¿Listo para jugar?','2025-05-16 07:40:49','2025-05-16 07:40:49','2025-05-16 07:40:49');
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioId` int NOT NULL,
  `tipo` enum('solicitud_recibida','solicitud_aceptada','solicitud_rechazada','nuevo_match','nuevo_mensaje') NOT NULL,
  `mensaje` varchar(255) NOT NULL,
  `leida` tinyint(1) DEFAULT '0',
  `fecha` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
INSERT INTO `notificaciones` VALUES (1,2,'solicitud_recibida','Has recibido una nueva solicitud de amistad.',1,'2025-05-16 07:45:33','2025-05-16 07:45:33','2025-05-16 07:45:34');
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioEmisorId` int NOT NULL,
  `usuarioReceptorId` int NOT NULL,
  `estado` enum('pendiente','aceptada','rechazada') DEFAULT 'pendiente',
  `fecha` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudes`
--

LOCK TABLES `solicitudes` WRITE;
/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `edad` int NOT NULL,
  `idioma` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `plataformaFavorita` varchar(255) NOT NULL,
  `juegoFavorito` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `password` varchar(25) DEFAULT NULL,
  `clerkUserId` varchar(255) NOT NULL,
  `descripcion` text,
  `nivel` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clerkUserId` (`clerkUserId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Carlos',27,'Español','Europa','PlayStation','Fifa','ccalferran@gmail.com','https://randomuser.me/api/portraits/men/8.jpg','2025-05-15 10:17:15','2025-05-15 10:17:15','@Sevilla230697.','user_2x225UUuGms2zMk8trxpnNTJEI3','Me gusta jugaar competitivo, aunque la mayoría del tiempo lo hago solo para divertirme tranquilamente.','principiante'),(2,'Florecilladelcampo',28,'Español','Europa','PC','Call of Dutty','martarojasmrtn@gmail.com','https://randomuser.me/api/portraits/women/9.jpg','2025-05-29 20:19:48','2025-05-29 20:19:48','@Camiones05','user_2xAdb9gTDw0dat0VjCogxDyMv1D','Me encanta jugar en mi ratos libres.','experto'),(3,'darkwolf23',28,'Español','América del Sur','PC','Valorant','darkwolf23@gmail.com','https://randomuser.me/api/portraits/men/3.jpg','2023-04-21 14:22:00','2024-11-15 09:13:30','qP8@hJ7zWm!e','b17e3fd0-b5d1-4a2a-90f1-cba98e5598c1','Amante de los shooters tácticos. Juego en equipo es lo más importante. Siempre buscando mejorar cada día.','experto'),(4,'pixelqueen',33,'Inglés','Europa','PlayStation','FIFA','pixelqueen@hotmail.com','https://randomuser.me/api/portraits/women/4.jpg','2023-06-11 10:05:12','2025-01-10 16:45:00','Gp@2mLk8$zYq','a292b4d4-92c6-4e78-8095-e9d0c03d4f56','Huge fan of football and RPGs. Weekend gamer and casual streamer. Let’s score some goals!','avanzado'),(5,'shadowhunter',24,'Español','Asia','Móvil','Genshin Impact','shadowhunter@hotmail.com','https://randomuser.me/api/portraits/men/5.jpg','2023-08-03 08:15:44','2024-12-02 22:03:11','Z7#ldXq9!Kpm','abf2d53b-d6de-4fc1-b688-4f3df9c31b66','Explorador del mundo de Teyvat desde el primer día. Me encanta coleccionar personajes y hacer teorías locas.','intermedio'),(6,'noobinator',30,'Inglés','África','Xbox','Call of Duty','noobinator@gmail.com','https://randomuser.me/api/portraits/men/6.jpg','2022-12-15 18:40:22','2024-10-03 14:55:22','xT!90pLz^wEe','f1c8dc7c-f17c-478b-b13b-aaa32c58c96c','Competitive COD player since Black Ops II. Precision and teamwork are key to domination.','intermedio'),(7,'lunatica',26,'Español','Europa','PC','League of Legends','lunatica@gmail.com','https://randomuser.me/api/portraits/women/7.jpg','2023-03-27 11:00:00','2024-09-10 20:31:45','Wq@zN84!mjRf','ecc43f3f-d7f1-40e4-aee2-e9b3bdf1b110','Main support desde la temporada 7. Me encanta hacer ragequit al enemigo con puro control.','avanzado');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoraciones`
--

DROP TABLE IF EXISTS `valoraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoraciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `matchId` int NOT NULL,
  `usuarioValoradorId` int NOT NULL,
  `usuarioValoradoId` int NOT NULL,
  `puntuacion` int NOT NULL,
  `comentario` text,
  `fecha` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoraciones`
--

LOCK TABLES `valoraciones` WRITE;
/*!40000 ALTER TABLE `valoraciones` DISABLE KEYS */;
INSERT INTO `valoraciones` VALUES (1,1,1,2,5,'¡Gran compañero de juego!','2025-05-16 07:42:56','2025-05-16 07:42:56','2025-05-16 07:42:56');
/*!40000 ALTER TABLE `valoraciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-05  9:55:10
