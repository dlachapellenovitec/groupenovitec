# Dossier des images uploadées

Ce dossier contient les images hébergées localement pour le site.

## Comment utiliser

1. **Uploadez vos images ici** via FTP/SFTP ou en utilisant la commande :
   ```bash
   scp votre-image.jpg serveur:/chemin/vers/groupenovitec/public/images/
   ```

2. **Utilisez l'URL dans l'admin** :
   - Si votre domaine est `https://novitec.ca`
   - Et vous uploadez `mon-article.jpg`
   - L'URL sera : `https://novitec.ca/images/mon-article.jpg`

   En développement local :
   - URL : `http://localhost:3001/images/mon-article.jpg`

## Organisation recommandée

Créez des sous-dossiers pour organiser :
```
public/images/
├── blog/           # Images des articles de blog
├── team/           # Photos de l'équipe
├── clients/        # Logos clients
└── partners/       # Logos partenaires
```

Exemple d'URL :
- `https://novitec.ca/images/blog/article-cybersecurite.jpg`
- `https://novitec.ca/images/team/jean-dupont.jpg`

## Formats recommandés

- **JPG/JPEG** : Photos (taille réduite)
- **PNG** : Logos avec transparence
- **WebP** : Format moderne (meilleure compression)

## Taille recommandée

- **Blog** : 1200x630px (ratio 1.91:1)
- **Équipe** : 800x800px (carré)
- **Logos** : 400x400px (carré)
