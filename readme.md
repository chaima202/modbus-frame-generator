# Générateur de Trames Modbus

## Description

Ce projet permet de générer des trames **Modbus** dans différents formats (ASCII, RTU, TCP/IP) et de les sauvegarder dans une base de données MySQL. Il inclut une interface web simple permettant à l'utilisateur de saisir des informations sur la trame, comme l'adresse, la fonction et les données. Le projet utilise **Node.js**, **Express** pour le serveur backend, et **MySQL** pour stocker les trames.

## Fonctionnalités

- **Génération de trames Modbus** : Crée des trames au format ASCII, RTU ou TCP/IP selon les paramètres donnés.
- **Validation des entrées** : Vérifie la validité des champs de l'utilisateur (adresse, fonction, et données hexadécimales).
- **Sauvegarde des trames** : Envoie la trame générée à une base de données MySQL.
- **Affichage de l'historique** : Récupère et affiche toutes les trames sauvegardées dans la base de données.
- **Interface simple** : Facile à utiliser avec un design responsive pour différents types de périphériques.

## Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript
- **Backend** : Node.js, Express
- **Base de données** : MySQL
- **Autres** : Body-Parser pour traiter les données JSON dans les requêtes HTTP

## Installation

1. Clonez le repository :
   ```bash
   git clone https://github.com/votre-nom-utilisateur/generateur-trames-modbus.git
