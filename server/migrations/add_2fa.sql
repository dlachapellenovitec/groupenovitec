-- Migration pour ajouter la double authentification (2FA)
-- Exécuter ce fichier après avoir démarré la base de données

-- Ajouter les colonnes 2FA à la table admin
ALTER TABLE admin ADD COLUMN IF NOT EXISTS two_factor_secret TEXT;
ALTER TABLE admin ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT FALSE;

-- Afficher les colonnes pour vérification
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'admin';
