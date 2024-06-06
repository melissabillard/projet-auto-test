# Projet guidé - Automatisation des tests

## Participants 👥
- BILLARD Mélissa
- BRACCIALES-COMBAS Lola
- CARRILHO LAMEIRA Rita

## Objectifs
L’objectif est de mettre en place un processus de tests automatisés et d’intégration continue.

## API Pokémon ⚡
Webservice : [https://pokeapi.co/](https://pokeapi.co/)

## Technologie 
- Site Web en [React](https://fr.legacy.reactjs.org/)

## Présentation des Tests et Instructions d'Exécution

- [JEST](https://jestjs.io/fr/docs/getting-started)

### Exécution

1) Test standard : ```npm test```

![](./src/assets/docs/test-1.png)

2) Test avec coverage : ```npm run test:cov```

![](./src/assets/docs/test-2.png)

### Test unitaire

| Libellé            | Objectif du Test                                      | Valeur attendue                | Page                |
|--------------------|-------------------------------------------------------|--------------------------------|---------------------|
| Test ...           | ...                                                   | True                           | Home                |

### Test graphique

| Libellé            | Objectif du Test                                      | Valeur attendue                | Page                |
|--------------------|-------------------------------------------------------|--------------------------------|---------------------|
| Test ...           | ...                                                   | True                           | Home                |

### Test d'intégration

| Libellé            | Objectif du Test                                      | Valeur attendue                | Page                |
|--------------------|-------------------------------------------------------|--------------------------------|---------------------|
| Test ...           | ...                                                   | True                           | Home                |

## Intégration continue
Nous avons mis en place un pipeline d'intégration continue (CI) avec GitHub Actions, qui surveille les commits sur la branche principale (main), exécute automatiquement les tests, et fusionne le code sur la branche de production (release) si les tests réussissent, garantissant ainsi une base de code stable et prête pour le déploiement.

![](./src/assets/CI.png)

## Hébergement et cloud computing
- [Netlify](https://www.netlify.com/)

**Lien d'accès :** [https://jeu-pokemon.netlify.app/](https://jeu-pokemon.netlify.app/)

## Déploiement continu
Pour le déploiement continu, si aucune erreur n'est détectée dans le commit de la branche `release` envoyé à Netlify (deuxième vérification), alors le commit sera poussé en production.

![](./src/assets/CI.png)
![](./src/assets/CI.png)

